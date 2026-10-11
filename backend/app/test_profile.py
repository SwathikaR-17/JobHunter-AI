from app.database import SessionLocal
from app.models.candidate import CandidateProfile


db = SessionLocal()

profile = db.query(CandidateProfile).filter(
    CandidateProfile.id == 1
).first()


print("\nSKILLS:")
for item in profile.skills:
    print("-", item)


print("\nPROJECTS:")
for item in profile.projects:
    print("-", item)


print("\nEXPERIENCE:")
for item in profile.experience:
    print("-", item)


print("\nCERTIFICATIONS:")
for item in profile.certifications:
    print("-", item)


db.close()