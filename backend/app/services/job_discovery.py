import os
import requests
from dotenv import load_dotenv


load_dotenv()


def fetch_jobs(
    title="Software Engineer",
    location="Hyderabad, India",
    time_frame="7d",
    limit=20
):

    api_key = os.getenv("FANTASTIC_JOBS_API_KEY")

    url = "https://data.fantastic.jobs/v1/active-ats"

    headers = {
        "Authorization": f"Bearer {api_key}"
    }

    params = {
        "time_frame": time_frame,
        "limit": limit,
        "title": title,
        "location": location
    }

    response = requests.get(
        url,
        headers=headers,
        params=params
    )

    response.raise_for_status()

    return response.json()

def normalize_job(job):

    return {
        "title": job.get("title"),
        "company": job.get("organization"),

        "location": (
            job.get("locations_derived", [None])[0]
            if job.get("locations_derived")
            else None
        ),

        "description": job.get("ai_core_responsibilities"),

        "skills_required": job.get("ai_key_skills", []),

        "experience_required": job.get("ai_experience_level"),

        "job_url": job.get("url"),

        "source": "Fantastic.jobs",

        "posted_date": job.get("date_posted")
    }