from app.database import SessionLocal
from app.models.candidate import CandidateProfile
from app.models.job import Job
from app.services.embedding_service import save_embedding


db = SessionLocal()


# --------------------------------
# GET CANDIDATE PROFILE
# --------------------------------

profile = db.query(CandidateProfile).filter(
    CandidateProfile.id == 1
).first()


# --------------------------------
# STORE PROJECT EMBEDDINGS
# --------------------------------

for project in profile.projects or []:

    save_embedding(
        text=project,
        text_type="project",
        reference_id=profile.id
    )


# --------------------------------
# GET ALL JOBS
# --------------------------------

jobs = db.query(Job).all()


# --------------------------------
# STORE JOB-SKILL EMBEDDINGS
# --------------------------------

for job in jobs:

    print(f"\nProcessing job {job.id}: {job.title}")

    for skill in job.skills_required or []:

        save_embedding(
            text=skill,
            text_type="job_skill",
            reference_id=job.id
        )


db.close()


print("\nAll job embeddings stored successfully.")