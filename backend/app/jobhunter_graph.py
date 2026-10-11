from langgraph.graph import StateGraph, START, END

from app.agent_state import JobHunterState
from app.agents.job_discovery_agent import job_discovery_agent
from app.agents.job_intelligence_agent import job_intelligence_agent
from app.agents.matching_agent import matching_agent
from app.agents.skill_gap_agent import skill_gap_agent
from app.agents.application_prep_agent import application_prep_agent


builder = StateGraph(JobHunterState)


# Agents
builder.add_node(
    "job_discovery",
    job_discovery_agent
)

builder.add_node(
    "job_intelligence",
    job_intelligence_agent
)

builder.add_node(
    "matching",
    matching_agent
)

builder.add_node(
    "skill_gap",
    skill_gap_agent
)


# Workflow
builder.add_edge(
    START,
    "job_discovery"
)

builder.add_edge(
    "job_discovery",
    "job_intelligence"
)

builder.add_edge(
    "job_intelligence",
    "matching"
)

builder.add_edge(
    "matching",
    "skill_gap"
)

builder.add_edge(
    "skill_gap",
    "application_prep"
)

builder.add_edge(
    "application_prep",
    END
)

builder.add_node(
    "application_prep",
    application_prep_agent
)


jobhunter_graph = builder.compile()