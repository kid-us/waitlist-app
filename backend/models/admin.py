from __future__ import annotations

from datetime import datetime, timezone

from sqlalchemy import String, DateTime
from sqlalchemy.orm import Mapped, mapped_column

from backend.core.db_conn import Base


class Admin(Base):
    """Admin user model.

    Columns:
    - id: integer primary key
    - email: unique email address
    - password: hashed password
    - created_at: timestamp with utc timezone, defaults to now()
    """

    __tablename__ = "admin"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    email: Mapped[str] = mapped_column(String(55), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(500), nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=datetime.now(tz=timezone.utc), nullable=False
    )

    def __repr__(self) -> str:
        return f"<Admin id={self.id} email={self.email!r}>"