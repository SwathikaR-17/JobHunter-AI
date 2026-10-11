from app.database import SessionLocal
from app.models.candidate import CandidateProfile
from app.models.job import Job
from app.services.job_matcher import calculate_match


def matching_agent(state):

    db = SessionLocal()

    try:

        profile = db.query(CandidateProfile).filter(
            CandidateProfile.id == state["candidate_id"]
        ).first()

        matched_jobs = []

        for analyzed_job in state["analyzed_jobs"]:

            job = db.query(Job).filter(
                Job.id == analyzed_job["id"]
            ).first()

            if not job:
                continue

            result = calculate_match(
                profile,
                job
            )

            matched_jobs.append({
                "job_id": job.id,
                "title": job.title,
                "company": job.company,
                "match_percentage": result["match_percentage"],
                "skill_fit": result["skill_fit"],
                "experience_fit": result["experience_fit"],
                "exact_matches": result["exact_matches"],
                "missing_skills": result["missing_skills"],
                "skill_evidence": result["skill_evidence"]
            })

        matched_jobs.sort(
            key=lambda x: x["match_percentage"],
            reverse=True
        )

        return {
            "matched_jobs": matched_jobs
        }

    finally:

        db.close()