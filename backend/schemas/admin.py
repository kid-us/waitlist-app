from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime


class AdminCreateRequest(BaseModel):
    email: EmailStr = Field(..., description="Admin's email address")
    password: str = Field(..., min_length=8, description="Admin's password")


class AdminResponse(BaseModel):
    id: int
    email: str
    created_at: datetime

    model_config = {"from_attributes": True}


class AdminLoginRequest(BaseModel):
    email: EmailStr = Field(..., description="Admin's email address")
    password: str = Field(..., description="Admin's password")