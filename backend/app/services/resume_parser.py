import os

from dotenv import load_dotenv
from google import genai
from google.genai import types

from app.schemas.profile import ProfileCreate


load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def parse_resume(resume_text: str):

    prompt = f"""
You are a resume parsing AI.

Extract the candidate's information from the resume below.

IMPORTANT RULES:
- Do not invent information.
- If information is not present, return an empty list or empty string.
- Keep each skill as a separate item.
- Keep each project as a separate item.
- Keep each experience entry as a separate item.
- Put spoken languages such as English, Telugu, Hindi, etc. ONLY in "languages".
- Put certificates/certifications ONLY in "certifications".
- Do NOT put languages or certifications inside "skills".
- "experience_level" must be exactly one of:
  "fresher", "intern", "entry-level", "experienced".
- If the candidate is a student with no professional full-time experience, use "fresher".
- Do not infer preferred roles or locations unless explicitly stated in the resume.
- Extract all technical skills explicitly mentioned anywhere in the resume.
- Include programming languages, frameworks, libraries, databases, tools,
  platforms, AI/ML concepts, cloud technologies, and development technologies.
- Extract technologies mentioned inside project descriptions as skills too.
- Do not restrict skills to a dedicated "Skills" section.
- For example, if a project mentions Streamlit, MQTT, IoT, AI,
  machine learning, recommendation systems, etc., include those as skills.
- Keep each skill as a separate item.
Resume:

{resume_text}
"""

    response = client.models.generate_content(
        model="gemini-3-flash-preview",
        contents=prompt,
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            response_schema=ProfileCreate
        )
    )

    return response.parsed.model_dump()