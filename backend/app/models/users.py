from pydantic import BaseModel
from typing import Optional

class Users(BaseModel):
	user_name: str
	email: str
	password: str
	is_verified: bool = False
	is_admin: bool = False