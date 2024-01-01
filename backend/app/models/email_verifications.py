from pydantic import BaseModel

class EmailVerificationModel(BaseModel):
    username: str
    token: str