from fastapi import APIRouter, Depends, status, HTTPException
from schemas import BlogCreate, BlogResponse
from db.models import DbBlog
from db.database import get_db
from sqlalchemy.orm import Session
from db import db_blog

router = APIRouter(prefix='/blogs', tags=['blog'])

@router.post('/', response_model=BlogResponse, status_code=status.HTTP_201_CREATED)
def create_blog(blog: BlogCreate, db: Session = Depends(get_db)):
    return db_blog.create_blog(db, blog)

@router.get('/')
def get_all_blogs(db: Session = Depends(get_db)):
    return db.query(DbBlog).all()

@router.get('/{id}')
def get_blog(id: int, db: Session = Depends(get_db)):
    db_blog = db.query(DbBlog).filter(DbBlog.id == id).first()
    if not db_blog:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Blog with id {id} not found")
    return db_blog

@router.put('/{id}', response_model=BlogResponse)
def update_blog(id: int,  blog: BlogCreate, db: Session = Depends(get_db)):
    db_blog = db.query(DbBlog).filter(DbBlog.id == id).first()
    if db_blog:
        db_blog.title = blog.title
        db_blog.content = blog.content
        db_blog.author = blog.author
        db_blog.published = blog.published
        db.commit()
        return db_blog
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Blog with id {id} not found")

@router.delete('/{id}')
def delete_todo(id: int, db: Session = Depends(get_db)):
    db_blog = db.query(DbBlog).filter(DbBlog.id == id).first()
    if db_blog:
        db.delete(db_blog)    
        db.commit()    
        return "Blog deleted successfully"
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Blog with id {id} not found")

