from app.database import SessionLocal
from app.models.candidate import CandidateProfile
from app.models.job import Job
from app.services.job_matcher import calculate_match


db = SessionLocal()

profile = db.query(CandidateProfile).filter(
    CandidateProfile.id == 1
).first()

job = db.query(Job).filter(
    Job.id == 9
).first()

result = calculate_match(profile, job)


print("\nJOB:")
print(job.title)
print(job.company)


print("\nMATCH RESULT:")
print(
    "Match percentage:",
    result["match_percentage"]
)

print(
    "Experience fit:",
    "Meets requirement"
    if result["experience_fit"] == 1
    else "Does not meet requirement"
)


print("\nExact matches:")

for skill in result["exact_matches"]:
    print(f"- {skill}")


print("\nSkill Evidence:")

for match in result["skill_evidence"]:

    if match["status"] == "proven":

        print(f"✓ {match['skill']}")
        print("  Status: Proven")
        print()

    elif match["status"] == "related":

        print(f"~ {match['skill']}")
        print("  Status: Related")
        print(f"  Similarity: {match['similarity']}")
        print(f"  Project: {match['evidence']}")
        print()

    elif match["status"] == "strongly_related":

        print(f"+ {match['skill']}")
        print("  Status: Strongly related")
        print(f"  Similarity: {match['similarity']}")
        print(f"  Project: {match['evidence']}")
        print()

    else:

        print(f"✗ {match['skill']}")
        print("  Status: No evidence")
        print()


print("\nMissing skills:")

for skill in result["missing_skills"]:
    print(f"- {skill}")


db.close()