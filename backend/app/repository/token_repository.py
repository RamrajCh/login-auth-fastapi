from app.utils.database import SessionLocal, Token, User
from app.models.token import Token as JWTToken
from app.utils.security import is_token_expired

class TokenRepository:
    def create_token(self, username: str, token: str) -> JWTToken:
        with SessionLocal() as session:
            existing_token = session.query(Token).filter_by(user_name=username).first()
            if existing_token:
                if is_token_expired(existing_token.token):
                    existing_token.token = token
                    session.commit()
                    session.refresh(existing_token)
                return JWTToken(user_name=existing_token.user_name, token=existing_token.token)
            else:
                db_token = Token(user_name=username, token=token)
                session.add(db_token)
                session.commit()
                session.refresh(db_token)
                return JWTToken(user_name=db_token.user_name, token=db_token.token)

    def get_user_via_token(self, token:str):
        with SessionLocal() as session:
            token = session.query(Token).filter_by(token=token).first()
            return session.query(User). filter_by(user_name=token.user_name).first()