def job_intelligence_agent(state):

    analyzed_jobs = []

    for job in state["jobs"]:

        analyzed_job = {
            "id": job["id"],
            "title": job["title"],
            "company": job["company"],
            "location": job["location"],
            "skills_required": job["skills_required"] or [],
            "experience_required": job["experience_required"],
            "job_url": job["job_url"],
            "source": job["source"]
        }

        analyzed_jobs.append(analyzed_job)

    return {
        "analyzed_jobs": analyzed_jobs
    }