from fastapi import APIRouter, Depends
from schemas import BlogCreate, BlogResponse
from db.models import DbBlog
from db.database import get_db
from sqlalchemy.orm import Session
from db import db_blog


router = APIRouter(prefix='/blogs', tags=['blog'])

@router.post('/', response_model=BlogResponse)
def create_blog(blog: BlogCreate, db: Session = Depends(get_db)):
    return db_blog.create_blog(db, blog)

@router.get('/')
def get_all_blogs():
    return "blogs"

@router.put('/{id}')
def update_blog():
    return "blog created"

@router.delete('/{id}')
def delete_blog():
    return "blog created"
