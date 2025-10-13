from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from core.db_conn import sessionmanager
from core.db_conn import Base
from routes import user, admin
from schemas.waitlist import ErrorResponse


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifespan context manager to handle startup and shutdown events."""
    if sessionmanager._engine is not None:
        async with sessionmanager._engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
        print("Database tables created successfully.")
    
    yield

    if sessionmanager._engine is not None:
        await sessionmanager.close()
        print("Database connection closed.")


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user.router, prefix="/api/v1/user", tags=["user"])
app.include_router(admin.router, prefix="/api/v1/admin", tags=["admin"])


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    """Handle 422 validation errors with consistent format."""
    return JSONResponse(
        status_code=422,
        content=ErrorResponse(
            status=422,
            error_code="VALIDATION_ERROR",
            message="Request validation failed"
        ).model_dump()
    )


@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    """Handle HTTP exceptions with consistent format."""
    if isinstance(exc.detail, dict) and "status" in exc.detail and "error_code" in exc.detail:
        return JSONResponse(status_code=exc.status_code, content=exc.detail, headers=exc.headers)

    return JSONResponse(
        status_code=exc.status_code,
        headers=exc.headers,
        content=ErrorResponse(
            status=exc.status_code,
            error_code="HTTP_ERROR",
            message=str(exc.detail)
        ).model_dump()
    )


@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception):
    """Catch-all handler to ensure consistent 500 error responses."""
    return JSONResponse(
        status_code=500,
        content=ErrorResponse(
            status=500,
            error_code="INTERNAL_SERVER_ERROR",
            message="An unexpected error occurred"
        ).model_dump()
    )