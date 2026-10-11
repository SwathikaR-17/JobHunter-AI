from fastapi import APIRouter, UploadFile, File, Depends
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

    # Save parsed profile to PostgreSQL
    new_profile = CandidateProfile(
        name=profile["name"],
        email=profile["email"],
        education=profile["education"],
        skills=profile["skills"],
        projects=profile["projects"],
        experience=profile["experience"],
        languages=profile["languages"],
        certifications=profile["certifications"],
        preferred_roles=profile["preferred_roles"],
        preferred_locations=profile["preferred_locations"],
        experience_level=profile["experience_level"]
    )

    db.add(new_profile)
    db.commit()
    db.refresh(new_profile)

    return {
        "message": "Resume parsed and profile saved successfully",
        "profile_id": new_profile.id,
        "profile": profile
    }