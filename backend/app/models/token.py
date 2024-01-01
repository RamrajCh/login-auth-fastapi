from pydantic import BaseModel

class Token(BaseModel):
    user_name: str
    token: str