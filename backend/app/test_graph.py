from app.jobhunter_graph import jobhunter_graph


initial_state = {
    "candidate_id": 1,
    "jobs": [],
    "analyzed_jobs": [],
    "matched_jobs": [],
    "skill_gaps": [],
    "recommendations": []
}


result = jobhunter_graph.invoke(initial_state)


print("\n==============================")
print("JOBHUNTER GRAPH TEST")
print("==============================")


print(
    "\nJobs discovered:",
    len(result["jobs"])
)

print(
    "Jobs analyzed:",
    len(result["analyzed_jobs"])
)

print(
    "Jobs matched:",
    len(result["matched_jobs"])
)

print(
    "Skill gaps generated:",
    len(result["skill_gaps"])
)


print("\nTop 5 Matches + Skill Gaps:")

for job in result["matched_jobs"][:5]:

    print(
        f"\n{job['title']} — {job['company']}"
    )

    print(
        f"  Match: {job['match_percentage']}%"
    )

    print(
        f"  Missing skills: "
        f"{', '.join(job['missing_skills']) if job['missing_skills'] else 'None'}"
    )


print("\nTop 5 Recommendations:")

for gap in result["skill_gaps"][:5]:

    print(
        f"\n{gap['title']} — {gap['company']}"
    )

    print(
        f"  → {gap['recommendation']}"
    )

print("\nApplication Preparation:")

for recommendation in result["recommendations"][:5]:

    print(
        f"\n{recommendation['title']} — "
        f"{recommendation['company']}"
    )

    print(
        "  Resume keywords:",
        ", ".join(recommendation["resume_keywords"])
    )

    print(
        "  Interview topics:",
        ", ".join(recommendation["interview_topics"])
    )

    print(
        "  Strategy:",
        recommendation["application_strategy"]
    )