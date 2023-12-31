from pydantic import BaseModel

class Users(BaseModel):
	user_name: str
	email: str
	password: str
	is_verified: bool
	is_admin: bool