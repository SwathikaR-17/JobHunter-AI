from sqlalchemy import Column, Integer, String, JSON
from app.database import Base


class CandidateProfile(Base):
    __tablename__ = "candidate_profiles"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)
    email = Column(String, nullable=False)

    education = Column(JSON)
    skills = Column(JSON)
    projects = Column(JSON)
    experience = Column(JSON)

    languages = Column(JSON)
    certifications = Column(JSON)

    preferred_roles = Column(JSON)
    preferred_locations = Column(JSON)

    experience_level = Column(String)