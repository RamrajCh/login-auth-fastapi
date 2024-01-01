from app.utils.database import SessionLocal, User
from app.models.users import Users

class UserRepository:
    def create_user(self, user: Users):
        db_user = User(**user.dict())
        with SessionLocal() as session:
            session.add(db_user)
            session.commit()
            session.refresh(db_user)
            return db_user

    def get_all_users(self):
        with SessionLocal() as session:
            return session.query(User).all()

    def get_user_by_username(self, username:str):
        with SessionLocal() as session:
            return session.query(User).filter(User.user_name == username).first()

    def get_user_by_email(self, email:str):
        with SessionLocal() as session:
            return session.query(User).filter(User.email == email).first()
