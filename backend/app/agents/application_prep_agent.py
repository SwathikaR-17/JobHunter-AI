def application_prep_agent(state):

    recommendations = []

    for gap in state["skill_gaps"]:

        high_priority = gap["high_priority"]
        medium_priority = gap["medium_priority"]

        resume_keywords = (
            high_priority
            + medium_priority
        )[:8]

        interview_topics = (
            high_priority
            + medium_priority
        )[:5]

        recommendations.append({
            "job_id": gap["job_id"],
            "title": gap["title"],
            "company": gap["company"],

            "resume_keywords": resume_keywords,

            "interview_topics": interview_topics,

            "application_strategy": (
                "Highlight your strongest matching skills and "
                "projects first. Be prepared to discuss the "
                "identified skill gaps honestly."
            )
        })

    return {
        "recommendations": recommendations
    }