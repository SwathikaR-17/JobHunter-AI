from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.candidate import CandidateProfile
from app.schemas.profile import ProfileCreate


router = APIRouter()


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()

#post operation to create a new profile
@router.post("/profile")
def create_profile(profile: ProfileCreate, db: Session = Depends(get_db)):

    new_profile = CandidateProfile(
        name=profile.name,
        email=profile.email,
        education=profile.education,
        skills=profile.skills,
        projects=profile.projects,
        preferred_roles=profile.preferred_roles,
        preferred_locations=profile.preferred_locations,
        experience_level=profile.experience_level
    )

    db.add(new_profile)
    db.commit()
    db.refresh(new_profile)

    return {
        "message": "Profile created successfully",
        "profile_id": new_profile.id
    }

#get operation to retrieve profile by id
@router.get("/profile/{profile_id}")
def get_profile(profile_id: int, db: Session = Depends(get_db)):

    profile = db.query(CandidateProfile).filter(
        CandidateProfile.id == profile_id
    ).first()

    if not profile:
        return {"message": "Profile not found"}

    return profile

#put operation to update profile
@router.put("/profile/{profile_id}")
def update_profile(
    profile_id: int,
    profile: ProfileCreate,
    db: Session = Depends(get_db)
):

    existing_profile = db.query(CandidateProfile).filter(
        CandidateProfile.id == profile_id
    ).first()

    if not existing_profile:
        return {"message": "Profile not found"}

    existing_profile.name = profile.name
    existing_profile.email = profile.email
    existing_profile.education = profile.education
    existing_profile.skills = profile.skills
    existing_profile.projects = profile.projects
    existing_profile.preferred_roles = profile.preferred_roles
    existing_profile.preferred_locations = profile.preferred_locations
    existing_profile.experience_level = profile.experience_level

    db.commit()
    db.refresh(existing_profile)

    return {
        "message": "Profile updated successfully",
        "profile_id": existing_profile.id
    }

#delete operation to delete profile
@router.delete("/profile/{profile_id}")
def delete_profile(profile_id: int, db: Session = Depends(get_db)):

    profile = db.query(CandidateProfile).filter(
        CandidateProfile.id == profile_id
    ).first()

    if not profile:
        return {"message": "Profile not found"}

    db.delete(profile)
    db.commit()

    return {
        "message": "Profile deleted successfully",
        "profile_id": profile_id
    }