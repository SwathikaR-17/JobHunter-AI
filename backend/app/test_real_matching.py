import os
import math

from dotenv import load_dotenv
from google import genai

from app.database import SessionLocal
from app.models.candidate import CandidateProfile
from app.models.job import Job


load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def get_embedding(text):

    result = client.models.embed_content(
        model="gemini-embedding-001",
        contents=text
    )

    return result.embeddings[0].values


def cosine_similarity(a, b):

    dot_product = sum(x * y for x, y in zip(a, b))

    magnitude_a = math.sqrt(sum(x * x for x in a))
    magnitude_b = math.sqrt(sum(x * x for x in b))

    return dot_product / (magnitude_a * magnitude_b)


db = SessionLocal()

profile = db.query(CandidateProfile).filter(
    CandidateProfile.id == 1
).first()

job = db.query(Job).filter(
    Job.id == 9
).first()


candidate_text = " ".join(
    (profile.skills or [])
    + (profile.projects or [])
    + (profile.certifications or [])
)


candidate_embedding = get_embedding(candidate_text)


print("\nJOB:", job.title)
print("COMPANY:", job.company)

print("\nSemantic similarity for each required skill:\n")


for skill in job.skills_required:

    skill_embedding = get_embedding(skill)

    similarity = cosine_similarity(
        candidate_embedding,
        skill_embedding
    )

    print(
        f"{skill:<35} {similarity:.3f}"
    )


db.close()