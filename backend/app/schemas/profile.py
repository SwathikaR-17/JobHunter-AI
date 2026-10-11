from pydantic import BaseModel
from typing import List, Optional


class ProfileCreate(BaseModel):
    name: str
    email: str

    education: Optional[List[str]] = []
    skills: Optional[List[str]] = []
    projects: Optional[List[str]] = []
    experience: Optional[List[str]] = []

    languages: Optional[List[str]] = []
    certifications: Optional[List[str]] = []

    preferred_roles: Optional[List[str]] = []
    preferred_locations: Optional[List[str]] = []

    experience_level: Optional[str] = "fresher"