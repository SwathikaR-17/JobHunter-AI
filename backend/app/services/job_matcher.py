import math

from app.database import SessionLocal
from app.models.embedding import TextEmbedding


def cosine_similarity(a, b):

    dot_product = sum(
        x * y for x, y in zip(a, b)
    )

    magnitude_a = math.sqrt(
        sum(x * x for x in a)
    )

    magnitude_b = math.sqrt(
        sum(x * x for x in b)
    )

    if magnitude_a == 0 or magnitude_b == 0:
        return 0

    return dot_product / (
        magnitude_a * magnitude_b
    )


def calculate_match(profile, job):

    db = SessionLocal()

    try:

        # --------------------------------
        # 1. EXACT SKILL MATCHING
        # --------------------------------

        candidate_skills = {
            skill.lower()
            for skill in (profile.skills or [])
        }

        job_skills = {
            skill.lower()
            for skill in (job.skills_required or [])
        }

        exact_matches = candidate_skills.intersection(
            job_skills
        )

        # --------------------------------
        # 2. GET PROJECT EMBEDDINGS
        # --------------------------------

        project_embeddings = db.query(
            TextEmbedding
        ).filter(
            TextEmbedding.text_type == "project",
            TextEmbedding.reference_id == profile.id
        ).all()

        # --------------------------------
        # 3. GET JOB-SKILL EMBEDDINGS
        # --------------------------------

        job_embeddings = db.query(
            TextEmbedding
        ).filter(
            TextEmbedding.text_type == "job_skill",
            TextEmbedding.reference_id == job.id
        ).all()

        # --------------------------------
        # 4. BUILD SKILL EVIDENCE
        # --------------------------------

        skill_evidence = []

        for job_embedding in job_embeddings:

            skill = job_embedding.text
            skill_lower = skill.lower()

            # Exact match
            if skill_lower in exact_matches:

                skill_evidence.append({
                    "skill": skill,
                    "status": "proven",
                    "similarity": 1.0,
                    "evidence": "Explicitly listed in candidate skills"
                })

                continue

            # Find best matching project
            best_similarity = 0
            best_project = None

            for project_embedding in project_embeddings:

                similarity = cosine_similarity(
                    job_embedding.embedding,
                    project_embedding.embedding
                )

                if similarity > best_similarity:

                    best_similarity = similarity
                    best_project = project_embedding.text

            # Classify evidence
            if best_similarity >= 0.65:

                status = "strongly_related"

            elif best_similarity >= 0.55:

                status = "related"

            else:

                status = "missing"

            skill_evidence.append({
                "skill": skill,
                "status": status,
                "similarity": round(
                    best_similarity,
                    3
                ),
                "evidence": best_project
            })
        # --------------------------------
        # 5. EXPERIENCE FIT
        # --------------------------------

        candidate_experience = (
            profile.experience_level or "fresher"
        ).lower()

        job_experience = (
            job.experience_required or ""
        ).lower()

        if candidate_experience == "fresher":

            if "2-5" in job_experience:
                experience_fit = 0

            elif "5-10" in job_experience:
                experience_fit = 0

            elif "10+" in job_experience:
                experience_fit = 0

            else:
                experience_fit = 1

        else:

            experience_fit = 1
        # --------------------------------
        # 5. CALCULATE SKILL SCORE
        # --------------------------------

        skill_scores = []

        for item in skill_evidence:

            if item["status"] == "proven":

                score = 1.0

            elif item["status"] == "strongly_related":

                score = 0.7

            elif item["status"] == "related":

                score = 0.4

            else:

                score = 0.0

            skill_scores.append(score)

        if skill_scores:

            match_percentage = (
                sum(skill_scores)
                / len(skill_scores)
            ) * 100

        else:

            match_percentage = 0
        # --------------------------------
        # 6. PROJECT RELEVANCE
        # --------------------------------

        related_scores = []

        for item in skill_evidence:

            if item["status"] == "strongly_related":
                related_scores.append(item["similarity"])

            elif item["status"] == "related":
                related_scores.append(item["similarity"])


        if related_scores:

            project_relevance = (
                sum(related_scores)
                / len(related_scores)
            )

        else:

            project_relevance = 0
        # --------------------------------
        # 6. MISSING SKILLS
        # --------------------------------

        missing_skills = sorted([
            item["skill"].lower()
            for item in skill_evidence
            if item["status"] == "missing"
        ])
        # --------------------------------
        # 7. FINAL MATCH SCORE
        # --------------------------------

        skill_fit = match_percentage / 100

        final_score = (
            (skill_fit * 0.60)
            + (experience_fit * 0.25)
            + (project_relevance * 0.15)
        )

        final_match_percentage = final_score * 100

        # --------------------------------
        # 7. RETURN RESULT
        # --------------------------------

        return {
            "match_percentage": round(
                match_percentage,
                2
            ),

            "exact_matches": sorted(
                exact_matches
            ),
            
            "experience_fit": experience_fit,

            "skill_scores": skill_scores,

            "skill_evidence": skill_evidence,

            "skill_fit": round(match_percentage, 2),

            "project_relevance": round(
                project_relevance * 100,
                2
            ),
            
            "match_percentage": round(
                final_match_percentage,
                2
            ),

            "missing_skills": missing_skills
        }

    finally:

        db.close()