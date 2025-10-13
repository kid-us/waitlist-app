from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.ext.asyncio import AsyncSession

from core.db_conn import get_db_session
from schemas.waitlist import WaitlistCreateRequest, WaitlistResponse, ErrorResponse
from repositories.user import UserRepository
from utils.email_utils import send_welcome_email

router = APIRouter()


@router.post("/waitlist", response_model=WaitlistResponse, responses={400: {"model": ErrorResponse}})
async def join_waitlist(
    request: WaitlistCreateRequest,
    background_tasks: BackgroundTasks,
    session: AsyncSession = Depends(get_db_session)
):
    """Join the waitlist with email validation."""
    repo = UserRepository(session)
    try:
        waitlist_entry = await repo.create_waitlist_entry(request.email)
        waitlist_entry.message = "Successfully added to waitlist"
        background_tasks.add_task(send_welcome_email, request.email)
        return WaitlistResponse.model_validate(waitlist_entry)
    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=ErrorResponse(
                status=400,
                error_code="DUPLICATE_EMAIL",
                message=str(e)
            ).model_dump()
        )