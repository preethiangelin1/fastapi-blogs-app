from datetime import datetime, timezone

from db.database import Base
from sqlalchemy import Column, DateTime
from sqlalchemy.sql.sqltypes import Integer, String


class DbBlog(Base):

    __tablename__ = "blogs"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    content = Column(String)
    author = Column(String)
    published = Column(String)
    date_created = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc)
    )