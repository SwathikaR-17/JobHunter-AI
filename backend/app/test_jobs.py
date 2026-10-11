from app.services.job_discovery import fetch_jobs, normalize_job


jobs = fetch_jobs(
    title="Software Engineer",
    location="Hyderabad, India",
    time_frame="7d",
    limit=5
)

print("Jobs found:", len(jobs))

job = jobs[0]

normalized = normalize_job(job)

print("\nNORMALIZED JOB:\n")

for key, value in normalized.items():
    print(f"{key}: {value}")