from app.utils.database import SessionLocal, EmailVerification, User
from app.models.email_verifications import EmailVerificationModel

class EmailConfirmationRepository:
    def create_token(self, username: str, token: str) -> EmailVerificationModel:
        db_email_verifications = EmailVerification(username=username, token=token)
        with SessionLocal() as session:
            session.add(db_email_verifications)
            session.commit()
            session.refresh(db_email_verifications)
        return EmailVerificationModel(username=db_email_verifications.username, token=db_email_verifications.token)

    def verify_user_by_token(self, token:str):
        with SessionLocal() as session:
            verification = session.query(EmailVerification).filter(EmailVerification.token == token).first()
            if verification:
                user = session.query(User).filter(User.user_name == verification.username).first()
                if user:
                    user.is_verified = True
                    session.delete(verification)
                    session.commit()
                    session.refresh(user)
                    return user
            return None

    def get_token_by_username(self, username:str):
        with SessionLocal() as session:
            return session.query(EmailVerification).filter(EmailVerification.username == username).first()
            