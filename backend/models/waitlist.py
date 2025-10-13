from __future__ import annotations

from enum import Enum
from datetime import datetime, timezone

from sqlalchemy import String, Enum as SAEnum, DateTime
from sqlalchemy.orm import Mapped, mapped_column


from backend.core.db_conn import Base


class Status(Enum):
    pending = "pending"
    approved = "approved"
    rejected = "rejected"


class Waitlist(Base):
    """Waitlist entry model.

    Columns:
    - id: integer primary key
    - email: unique email address
    - created_at: timestamp with utc timezone, defaults to now()
    - status: enum (pending/approved/rejected), defaults to pending
    """

    __tablename__ = "waitlist"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    email: Mapped[str] = mapped_column(String(55), unique=True, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.now(tz=timezone.utc), nullable=False)
    status: Mapped[Status] = mapped_column(
        SAEnum(Status, name="waitlist_status", native_enum=False),
        nullable=False,
        default=Status.pending,
    )

    def __repr__(self) -> str:
        return f"<Waitlist id={self.id} email={self.email!r} status={self.status.value!r}>"
