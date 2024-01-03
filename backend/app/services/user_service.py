from app.models.users import Users
from app.models.token import Token
from app.repository import users_repository, token_repository, email_confirmation_repository
from app.utils.security import create_token, create_uuid
import bcrypt
from app.utils.send_email import send_confirmation_email
import requests
from dotenv import load_dotenv
import os

load_dotenv()

class UserService:
    def __init__(self):
        self.user_repository = users_repository.UserRepository()
        self.token_repository = token_repository.TokenRepository()
        self.email_confirmation_repository = email_confirmation_repository.EmailConfirmationRepository()

    def create_user(self, user:Users):
        user_validity = self.__is_user_valid(user)
        if(user_validity[0]):
            hashed_password = self.__get_hashed_password(user.password)
            user.password = hashed_password
            db_user = self.user_repository.create_user(user)
            token = create_token(data={"sub": db_user.user_name})
            self.token_repository.create_token(username=db_user.user_name, token=token)
            self.__send_confirmation_email(user)
            return {"username": db_user.user_name, "email": db_user.email, "token": token}
        elif (user_validity[1] == "user_name"):
            raise Exception(f"User with username {user.user_name} already exists.")
        elif (user_validity[1] == "email"):
            raise Exception(f"User with email {user.email} already exists.")

    def get_all_users(self):
        return self.user_repository.get_all_users()

    def send_confirmation_email(self, username):
        user = self.user_repository.get_user_by_username(username)
        if not user:
            raise Exception("Please provide valid username.")
        email_verifications = self.email_confirmation_repository.get_token_by_username(username)
        if not email_verifications :
            self.__send_confirmation_email(user)
        # send_confirmation_email(user, email_verifications.token)
        return True

    def confirm_email(self, token):
        user = self.email_confirmation_repository.verify_user_by_token(token)
        if not user:
            raise Exception("Please provide valid token as query parameter.")
        return user

    def verify_captcha(self,captcha_token):
        hcaptcha_secret_key = os.getenv("HCAPTCHA_SECRET_KEY")
        hcaptcha_verification_url = os.getenv("HCAPTCHA_BASE_URL")
        response = requests.post(
        hcaptcha_verification_url,
        data={
            "secret": hcaptcha_secret_key,
            "response": captcha_token,
        },)

        if response.status_code != 200 or not response.json()["success"]:
            raise Exception("hCaptcha verification failed")
        return
    
    def login_user(self, req_body):
        user = self.user_repository.get_user_by_username(req_body["user_name"])
        if not user:
            user = self.user_repository.get_user_by_email(req_body["user_name"])
            if not user:
                raise Exception("Invalid login credentials. Try again!!")
        verified_pw = self.__verify_password(req_body["password"], user.password)
        if verified_pw:
            if not user.is_verified:
                self.send_confirmation_email(user.user_name)
                raise Exception("The user is not verified. Please verify. Confirmation link is sent to email.")
            new_token = create_token(data={"sub": user.user_name})
            token = self.token_repository.create_token(username=user.user_name, token=new_token)
            return {"user_name": user.user_name, "token": token.token}
        else:
            raise Exception("Invalid login credentials. Try again!!")

    def __is_user_valid(self, user):
        if (self.user_repository.get_user_by_username(user.user_name)): return (False, 'user_name')
        elif (self.user_repository.get_user_by_email(user.email)): return (False, 'email')
        return (True, "")

    def __is_password_valid(self, password: str) -> bool:
        pass

    def __verify_password(self, plain_password: str, hashed_password: str) -> bool:
        return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))

    def __get_hashed_password(self, password:str) -> str:
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
        return hashed_password.decode('utf-8')

    def __send_confirmation_email(self, user:Users):
        token = create_uuid()
        self.email_confirmation_repository.create_token(username=user.user_name, token=token)
        # send_confirmation_email(user, token)
        return