"""Initialize the database connection and provide async context helpers."""

from core.config import get_settings
from typing import Any, AsyncIterator
import contextlib


from sqlalchemy.ext.asyncio import (
    AsyncConnection,
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)
from sqlalchemy.orm import DeclarativeBase


_settings = get_settings()
DATABASE_URL = _settings.database_url



class Base(DeclarativeBase):
    """Base class for all SQLAlchemy ORM models used by the application.
    """

    __mapper_args__ = {"eager_defaults": True}


class DatabaseSessionManager:
    """Helper responsible for creating and managing a single async SQLAlchemy engine.
    """

    def __init__(
        self, host: str, engine_kwargs: dict[str, Any] | None = None
    ) -> None:
        """Create an async SQLAlchemy engine and sessionmaker.
        """

        if engine_kwargs is None:
            engine_kwargs = {}

        self._engine = create_async_engine(host, **engine_kwargs)
        self._sessionmaker = async_sessionmaker(
            autocommit=False, bind=self._engine, expire_on_commit=False
        )

    async def close(self):
        if self._engine is None:
            raise Exception("DatabaseSessionManager is not initialized")
        try:
            await self._engine.dispose()
        except RuntimeError as e:
            if "Event loop is closed" in str(e):
                print("Database engine disposal skipped due to closed event loop.")
            else:
                raise

        self._engine = None
        self._sessionmaker = None

    @contextlib.asynccontextmanager
    async def connect(self) -> AsyncIterator[AsyncConnection]:
        if self._engine is None:
            raise Exception("DatabaseSessionManager is not initialized")

        async with self._engine.begin() as connection:
            try:
                yield connection
            except Exception:
                await connection.rollback()
                raise

    @contextlib.asynccontextmanager
    async def session(self) -> AsyncIterator[AsyncSession]:
        if self._sessionmaker is None:
            raise Exception("DatabaseSessionManager is not initialized")

        session = self._sessionmaker()
        try:
            yield session
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()


sessionmanager = DatabaseSessionManager(
    DATABASE_URL, {"echo": True, "pool_pre_ping": True}
)


async def get_db_session():
    """FastAPI dependency that yields an :class:`AsyncSession`.
    """

    async with sessionmanager.session() as session:
        yield session