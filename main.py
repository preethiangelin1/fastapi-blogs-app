from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from router import blog
from db import models
from db.database import engine

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(blog.router)
models.Base.metadata.create_all(engine)
