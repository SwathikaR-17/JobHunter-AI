from app.database import SessionLocal
from app.models.job import Job


def job_discovery_agent(state):

    db = SessionLocal()

    try:

        jobs = db.query(Job).all()

        job_data = []

        for job in jobs:

            job_data.append({
                "id": job.id,
                "title": job.title,
                "company": job.company,
                "location": job.location,
                "description": job.description,
                "skills_required": job.skills_required,
                "experience_required": job.experience_required,
                "job_url": job.job_url,
                "source": job.source,
                "posted_date": job.posted_date
            })

        return {
            "jobs": job_data
        }

    finally:

        db.close()