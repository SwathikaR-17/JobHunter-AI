from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.job import Job
from app.schemas.job import JobCreate
from app.services.job_discovery import fetch_jobs, normalize_job
from app.jobhunter_graph import jobhunter_graph


router = APIRouter()


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


@router.post("/jobs")
def create_job(
    job: JobCreate,
    db: Session = Depends(get_db)
):

    new_job = Job(
        title=job.title,
        company=job.company,
        location=job.location,
        description=job.description,
        skills_required=job.skills_required,
        experience_required=job.experience_required,
        job_url=job.job_url,
        source=job.source,
        posted_date=job.posted_date
    )

    db.add(new_job)
    db.commit()
    db.refresh(new_job)

    return {
        "message": "Job created successfully",
        "job_id": new_job.id
    }

@router.get("/jobs")
def get_jobs(db: Session = Depends(get_db)):

    jobs = db.query(Job).all()

    return jobs

@router.post("/jobs/fetch")
def fetch_and_save_jobs(db: Session = Depends(get_db)):

    jobs = fetch_jobs(
        title="Software Engineer",
        location="Hyderabad, India",
        time_frame="7d",
        limit=10
    )

    saved_jobs = []

    for job in jobs:

        normalized = normalize_job(job)

        new_job = Job(
            title=normalized["title"],
            company=normalized["company"],
            location=normalized["location"],
            description=normalized["description"],
            skills_required=normalized["skills_required"],
            experience_required=normalized["experience_required"],
            job_url=normalized["job_url"],
            source=normalized["source"],
            posted_date=normalized["posted_date"]
        )

        db.add(new_job)
        saved_jobs.append(normalized["title"])

    db.commit()

    return {
        "message": "Jobs fetched and saved successfully",
        "count": len(saved_jobs),
        "jobs": saved_jobs
    }

@router.post("/jobs/analyze/{candidate_id}")
def analyze_jobs(candidate_id: int):

    initial_state = {
        "candidate_id": candidate_id,
        "jobs": [],
        "analyzed_jobs": [],
        "matched_jobs": [],
        "skill_gaps": [],
        "recommendations": []
    }

    result = jobhunter_graph.invoke(initial_state)

    return {
        "jobs": result["matched_jobs"],
        "skill_gaps": result["skill_gaps"],
        "recommendations": result["recommendations"]
    }