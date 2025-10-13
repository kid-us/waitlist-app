from typing import Annotated

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from backend.utils.auth_utils import verify_token

security = HTTPBearer()


def RequiresAdmin(credentials: Annotated[HTTPAuthorizationCredentials, Depends(security)]) -> dict:
    """Dependency to require admin role from JWT token."""
    payload = verify_token(credentials.credentials)
    role = payload.get("role")
    if role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Insufficient permissions",
        )
    return payload