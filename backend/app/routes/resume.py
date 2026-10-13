from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
from pypdf import PdfReader
import io

from app.database import SessionLocal
from app.models.candidate import CandidateProfile
from app.services.resume_parser import parse_resume


router = APIRouter()


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


@router.post("/profile/resume")
async def upload_resume(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):

    contents = await file.read()

    reader = PdfReader(io.BytesIO(contents))

    resume_text = ""

    for page in reader.pages:
        page_text = page.extract_text()

        if page_text:
            resume_text += page_text + "\n"

    # Gemini parses the resume
    profile = parse_resume(resume_text)

    # Find existing profile
    existing_profile = (
        db.query(CandidateProfile)
        .filter(CandidateProfile.id == 1)
        .first()
    )

    if not existing_profile:
        raise HTTPException(
            status_code=404,
            detail="Candidate profile not found."
        )

    # Update existing profile
    existing_profile.name = profile["name"]
    existing_profile.email = profile["email"]
    existing_profile.education = profile["education"]
    existing_profile.skills = profile["skills"]
    existing_profile.projects = profile["projects"]
    existing_profile.experience = profile["experience"]
    existing_profile.languages = profile["languages"]
    existing_profile.certifications = profile["certifications"]
    existing_profile.preferred_roles = profile["preferred_roles"]
    existing_profile.preferred_locations = profile["preferred_locations"]
    existing_profile.experience_level = profile["experience_level"]

    db.commit()
    db.refresh(existing_profile)

    return {
        "message": "Resume parsed and profile updated successfully",
        "profile_id": existing_profile.id,
        "profile": profile
    }