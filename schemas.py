from pydantic import BaseModel
from datetime import datetime

class BlogCreate(BaseModel):
    title: str
    content: str
    author: str
    published: str

class BlogResponse(BaseModel):
    id: int
    title: str
    content: str
    author: str
    published: str
    date_created: datetime
    class Config():
        orm_mode = True

