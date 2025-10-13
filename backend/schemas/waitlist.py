from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime


class WaitlistCreateRequest(BaseModel):
    email: EmailStr = Field(..., description="User's email address")


class WaitlistResponse(BaseModel):
    id: int
    email: str
    created_at: datetime
    status: str

    model_config = {"from_attributes": True}


class ErrorResponse(BaseModel):
    status: int
    error_code: str
    message: str


class PaginationMeta(BaseModel):
    current_page: int
    total_pages: int
    has_next: bool
    has_prev: bool
    per_page: int
    total: int


class PaginatedWaitlistResponse(BaseModel):
    data: list[WaitlistResponse]
    pagination: PaginationMeta