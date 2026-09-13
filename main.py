from pathlib import Path

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
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

frontend_path = Path(__file__).parent / "frontend" / "dist"

app.mount(
    "/",
    StaticFiles(directory=frontend_path, html=True),
    name="frontend",
)