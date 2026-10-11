from app.database import SessionLocal
from app.models.candidate import CandidateProfile
from app.models.job import Job
from app.services.job_matcher import calculate_match


db = SessionLocal()

profile = db.query(CandidateProfile).filter(
    CandidateProfile.id == 1
).first()

jobs = db.query(Job).all()


results = []

for job in jobs:

    result = calculate_match(profile, job)

    results.append({
        "job": job,
        "result": result
    })


# Sort by final match score
results.sort(
    key=lambda x: x["result"]["match_percentage"],
    reverse=True
)


print("\n==============================")
print("JOB MATCHING RESULTS")
print("==============================\n")


for item in results:

    job = item["job"]
    result = item["result"]

    print(
        f"{job.id}. {job.title} — {job.company}"
    )

    print(
        f"   Match: {result['match_percentage']}%"
    )

    print(
        f"   Skill fit: {result['skill_fit']}%"
    )

    print(
        f"   Experience: "
        f"{'Meets requirement' if result['experience_fit'] == 1 else 'Does not meet requirement'}"
    )

    print(
        f"   Exact matches: "
        f"{', '.join(result['exact_matches']) if result['exact_matches'] else 'None'}"
    )

    print()


db.close()