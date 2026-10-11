from sqlalchemy import Column, Integer, String, Text, JSON
from app.database import Base


class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String, nullable=False)
    company = Column(String, nullable=False)
    location = Column(String)

    description = Column(Text)

    skills_required = Column(JSON)
    experience_required = Column(String)

    job_url = Column(String)
    source = Column(String)

    posted_date = Column(String)