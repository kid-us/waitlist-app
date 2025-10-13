"""Password hashing utilities using bcrypt.
"""

from __future__ import annotations


import bcrypt


def hash_password(plain_password: str, *, rounds: int = 12) -> str:
	"""Hash a plaintext password using bcrypt.

	Args:
		plain_password: The user's plaintext password.
		rounds: bcrypt cost factor (number of rounds). Higher is slower but more secure.
    
	Returns:
		A bcrypt hash string (e.g., starting with "$2b$") suitable for storage.

	Raises:
		ValueError: If the provided password is empty.
	"""
	if not isinstance(plain_password, str):
		raise TypeError("plain_password must be a string")
	if plain_password == "":
		raise ValueError("plain_password cannot be empty")

	password_bytes = plain_password.encode("utf-8")

	salt = bcrypt.gensalt(rounds)
	hashed = bcrypt.hashpw(password_bytes, salt)

	return hashed.decode("utf-8")


def verify_password(plain_password: str, hashed_password: str) -> bool:
	"""Verify a plaintext password against a stored bcrypt hash.

	Args:
		plain_password: The user's plaintext password to check.
		hashed_password: The stored bcrypt hash string to verify against.

	Returns:
		True if the password matches the hash; False otherwise.
	"""
	if not isinstance(plain_password, str) or not isinstance(hashed_password, str):
		return False
	if hashed_password == "" or plain_password == "":
		return False

	try:
		return bcrypt.checkpw(
			plain_password.encode("utf-8"), hashed_password.encode("utf-8")
		)
	except ValueError:
		return False


__all__ = ["hash_password", "verify_password"]

