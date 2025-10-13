from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Annotated

from core.db_conn import get_db_session
from schemas.waitlist import PaginatedWaitlistResponse, WaitlistResponse, ErrorResponse
from schemas.admin import AdminLoginRequest
from repositories.admin import AdminRepository
from utils.password_utils import verify_password
from utils.auth_utils import create_access_token
from deps.auth import RequiresAdmin

router = APIRouter(tags=["admin"], prefix="/api/v1/admin")


@router.post("/login")
async def login_admin(request: AdminLoginRequest, session: AsyncSession = Depends(get_db_session)):
    """Authenticate admin and return JWT token."""
    repo = AdminRepository(session)
    admin = await repo.get_admin_by_email(request.email)

    if not admin or not verify_password(request.password, admin.password):
        raise HTTPException(
            status_code=401,
            detail=ErrorResponse(
                status=401,
                error_code="INVALID_CREDENTIALS",
                message="Invalid email or password"
            ).model_dump()
        )

    # Create JWT token with admin role
    token_data = {"sub": admin.email, "role": "admin"}
    access_token = create_access_token(token_data)

    return {"access_token": access_token, "token_type": "bearer", "message": "Login successful"}


@router.get("/waitlist", response_model=PaginatedWaitlistResponse, dependencies=[Depends(RequiresAdmin)])
async def get_waitlist(
    session: AsyncSession = Depends(get_db_session),
    page: Annotated[int, Query(ge=1)] = 1,
    per_page: Annotated[int, Query(ge=1, le=100)] = 10
):
    """Get paginated waitlist entries."""
    repo = AdminRepository(session)
    waitlist_entries, pagination = await repo.get_waitlist_paginated(page, per_page)

    data = [WaitlistResponse.model_validate(entry) for entry in waitlist_entries]

    return PaginatedWaitlistResponse(
        message="Waitlist fetched successfully",
        data=data,
        pagination=pagination
    )