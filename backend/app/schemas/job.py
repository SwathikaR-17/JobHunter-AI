from pydantic import BaseModel
from typing import List, Optional


class JobCreate(BaseModel):
    title: str
    company: str
    location: Optional[str] = None

    description: Optional[str] = None

    skills_required: List[str] = []
    experience_required: Optional[str] = None

    job_url: Optional[str] = None
    source: Optional[str] = None

    posted_date: Optional[str] = None