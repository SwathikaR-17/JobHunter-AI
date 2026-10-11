from typing import TypedDict, List


class JobHunterState(TypedDict):

    candidate_id: int

    jobs: List[dict]

    analyzed_jobs: List[dict]

    matched_jobs: List[dict]

    skill_gaps: List[dict]

    recommendations: List[dict]