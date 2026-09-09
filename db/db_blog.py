from sqlalchemy.orm.session import Session
from schemas import BlogCreate
from db.models import DbBlog

def create_blog(db: Session, request: BlogCreate):
    new_blog = DbBlog(
        title=request.title,
        content=request.content,
        author=request.author,
        published=request.published
    )

    db.add(new_blog)
    db.commit()
    db.refresh(new_blog)

    return new_blog