from app.utils.database import SessionLocal, Token
from app.models.token import Token as JWTToken

class TokenRepository:
    def create_token(self, username: str, token: str) -> JWTToken:
        db_token = Token(user_name=username, token=token)
        with SessionLocal() as session:
            session.add(db_token)
            session.commit()
            session.refresh(db_token)
        return JWTToken(user_name=db_token.user_name, token=db_token.token)