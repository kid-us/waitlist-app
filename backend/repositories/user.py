from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import IntegrityError

from backend.models.waitlist import Waitlist


class UserRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def create_waitlist_entry(self, email: str) -> Waitlist:
        """Create a new waitlist entry if email doesn't exist."""
        try:
            waitlist_entry = Waitlist(email=email)
            self.session.add(waitlist_entry)
            await self.session.commit()
            await self.session.refresh(waitlist_entry)
            return waitlist_entry
        except IntegrityError:
            await self.session.rollback()
            raise ValueError("Email already exists in waitlist")