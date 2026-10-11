def skill_gap_agent(state):

    skill_gaps = []

    for job in state["matched_jobs"]:

        missing_skills = job["missing_skills"]

        high_priority = []
        medium_priority = []
        low_priority = []

        for skill in missing_skills:

            skill_lower = skill.lower()

            if skill_lower in [
                "python",
                "java",
                "machine learning",
                "sql",
                "aws",
                "cloud",
                "tensorflow",
                "pytorch",
                "langchain",
                "react",
                "reactjs",
                "spring boot",
                "springboot",
                "docker",
                "kubernetes"
            ]:
                high_priority.append(skill)

            elif skill_lower in [
                "microservices",
                "ci/cd",
                "devops",
                "data science",
                "rest api",
                "system design",
                "agile",
                "agile methodologies"
            ]:
                medium_priority.append(skill)

            else:
                low_priority.append(skill)

        priority_skills = (
            high_priority
            + medium_priority
            + low_priority
        )

        if not priority_skills:
            recommendation = "No major skill gaps detected."

        else:
            recommendation = (
                "Prioritize: "
                + ", ".join(priority_skills[:5])
            )

        skill_gaps.append({
            "job_id": job["job_id"],
            "title": job["title"],
            "company": job["company"],
            "missing_skills": missing_skills,
            "high_priority": high_priority,
            "medium_priority": medium_priority,
            "low_priority": low_priority,
            "recommendation": recommendation
        })

    return {
        "skill_gaps": skill_gaps
    }