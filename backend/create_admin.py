"""Script to create an admin user."""

import asyncio
import sys
import os
from pathlib import Path

project_root = Path(__file__).parent
sys.path.insert(0, str(project_root))

from backend.core.db_conn import sessionmanager, Base
from backend.repositories.admin import AdminRepository
from backend.utils.admin_utils import create_admin_util
from backend.schemas.admin import AdminCreateRequest


async def create_tables():
    """Create all database tables."""
    async with sessionmanager._engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


async def create_admin(email: str, password: str):
    """Create an admin user."""
    async with sessionmanager.session() as session:
        repo = AdminRepository(session)
        request = AdminCreateRequest(email=email, password=password)

        try:
            admin = await create_admin_util(repo, request)
            print(f"Admin created successfully: {admin.email} (ID: {admin.id})")
            return True
        except ValueError as e:
            print(f"Error: {e}")
            return False


async def main():
    """Main function to handle command line arguments."""
    if len(sys.argv) != 3:
        print("Usage: python create_admin.py <email> <password>")
        sys.exit(1)

    email = sys.argv[1]
    password = sys.argv[2]

    if not os.getenv("DATABASE_URL"):
        print("Error: DATABASE_URL environment variable is required")
        sys.exit(1)

    print("Creating database tables...")
    await create_tables()
    print("Tables created successfully.")

    success = await create_admin(email, password)
    sys.exit(0 if success else 1)


if __name__ == "__main__":
    asyncio.run(main())