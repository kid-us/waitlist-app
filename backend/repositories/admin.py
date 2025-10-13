from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import IntegrityError
from math import ceil

from backend.models.waitlist import Waitlist
from backend.models.admin import Admin
from backend.schemas.waitlist import PaginationMeta
from backend.utils.password_utils import hash_password


class AdminRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def create_admin(self, email: str, password: str) -> Admin:
        """Create a new admin user."""
        try:
            hashed_password = hash_password(password)
            admin = Admin(email=email, password=hashed_password)
            self.session.add(admin)
            await self.session.commit()
            await self.session.refresh(admin)
            return admin
        except IntegrityError:
            await self.session.rollback()
            raise ValueError("Admin with this email already exists")

    async def get_admin_by_email(self, email: str) -> Admin | None:
        """Get admin by email."""
        query = select(Admin).where(Admin.email == email)
        result = await self.session.execute(query)
        return result.scalar_one_or_none()

    async def get_waitlist_paginated(self, page: int = 1, per_page: int = 10) -> tuple[list[Waitlist], PaginationMeta]:
        """Get paginated waitlist entries."""
        # Get total count
        total_query = select(func.count(Waitlist.id))
        total_result = await self.session.execute(total_query)
        total = total_result.scalar()

        # Calculate pagination
        total_pages = ceil(total / per_page) if total > 0 else 1
        offset = (page - 1) * per_page

        # Get paginated results
        query = select(Waitlist).order_by(Waitlist.created_at.desc()).offset(offset).limit(per_page)
        result = await self.session.execute(query)
        waitlist_entries = result.scalars().all()

        pagination = PaginationMeta(
            current_page=page,
            total_pages=total_pages,
            has_next=page < total_pages,
            has_prev=page > 1,
            per_page=per_page,
            total=total
        )

        return waitlist_entries, pagination