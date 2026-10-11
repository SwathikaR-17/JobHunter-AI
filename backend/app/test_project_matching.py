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


print("\nJOB:", job.title)
print("COMPANY:", job.company)


for project in profile.projects:

    print("\nPROJECT:")
    print(project)

    project_embedding = get_embedding(project)

    print("\nTop semantic matches:")

    results = []

    for skill in job.skills_required:

        skill_embedding = get_embedding(skill)

        similarity = cosine_similarity(
            project_embedding,
            skill_embedding
        )

        results.append((skill, similarity))

    results.sort(
        key=lambda x: x[1],
        reverse=True
    )

    for skill, similarity in results[:5]:

        print(
            f"{skill:<35} {similarity:.3f}"
        )


db.close()