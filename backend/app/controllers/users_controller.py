from fastapi import APIRouter, Depends, Query, Form
from fastapi.responses import JSONResponse
from app.services.user_service import UserService
from app.models.users import Users

router = APIRouter()
user_service = UserService()

@router.post("/signup/")
def signup(user: Users, service: UserService = Depends()) -> dict:
    try:
        reg_user = service.create_user(user)
        return JSONResponse(content=reg_user, status_code=200)
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=400)

@router.post("/signin/")
def signin(req_body: dict, service: UserService = Depends()) -> dict:
    try:
        user = service.login_user(req_body)
        return JSONResponse(content=user, status_code=200)
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=400)
    

@router.post("/send-confirm-email/{username:str}")
def send_confirm_email(username:str, service: UserService = Depends()) -> dict:
    try:
        sent = service.send_confirmation_email(username)
        return JSONResponse(content={"success": "Confirmation email sent."}, status_code=200)
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=400) 

@router.post("/confirm-email")
def confirm_email(verify: str = Query(..., description="Token to verify user and email"),
    service: UserService=Depends()) -> dict:
    if not verify:
        return JSONResponse(content={"error": "Please provide token as query parameter."}, status_code=400)
    try:
        user = service.confirm_email(verify)
        return JSONResponse(content={
            "user_name": user.user_name,
            "is_verified": True
            }, status_code=200)
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=400)

@router.get("/users/", response_model=list[Users])
def get_all_users(service: UserService=Depends()):
    return user_service.get_all_users()


@router.post("/verify-captcha/")
def verify_captcha(captcha_token: dict, service: UserService = Depends()):
    try:
        service.verify_captcha(captcha_token["token"])
        return JSONResponse(content={"success": "Hcaptcha Verified"}, status_code=200)
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=400)