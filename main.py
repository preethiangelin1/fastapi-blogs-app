from fastapi import FastAPI
from router import blog
from db import models
from db.database import engine


app = FastAPI()

app.include_router(blog.router)

models.Base.metadata.create_all(engine)

