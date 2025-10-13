"""Admin creation utilities."""

from backend.repositories.admin import AdminRepository
from backend.schemas.admin import AdminCreateRequest, AdminResponse


async def create_admin_util(repo: AdminRepository, request: AdminCreateRequest) -> AdminResponse:
    """Create a new admin user.

    Args:
        repo: Admin repository instance
        request: Admin creation request with email and password

    Returns:
        AdminResponse: Created admin data

    Raises:
        ValueError: If admin with email already exists
    """
    admin = await repo.create_admin(request.email, request.password)
    return AdminResponse.model_validate(admin)