from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.controllers import users_controller


app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(
    router=users_controller.router,
    prefix="/api",
    tags=["users"],
)
