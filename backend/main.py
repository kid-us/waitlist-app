from fastapi import FastAPI, Request, HTTPException
from fastapi.exceptions import RequestValidationError
from contextlib import asynccontextmanager

from backend.core.db_conn import sessionmanager
from backend.core.db_conn import Base
from backend.routes import user, admin
from backend.schemas.waitlist import ErrorResponse


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

app.include_router(user.router, prefix="/api/v1/user", tags=["user"])
app.include_router(admin.router, prefix="/api/v1/admin", tags=["admin"])


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    """Handle 422 validation errors with consistent format."""
    return ErrorResponse(
        status=422,
        error_code="VALIDATION_ERROR",
        message="Request validation failed"
    ).model_dump()


@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    """Handle HTTP exceptions with consistent format."""
    if isinstance(exc.detail, dict) and "status" in exc.detail and "error_code" in exc.detail:
        return exc.detail
    
    return ErrorResponse(
        status=exc.status_code,
        error_code="HTTP_ERROR",
        message=str(exc.detail)
    ).model_dump()