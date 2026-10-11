from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine, Base
from app.models.candidate import CandidateProfile
from app.models.job import Job
from app.routes.profile import router as profile_router
from app.routes.resume import router as resume_router
from app.routes.jobs import router as jobs_router
from app.models.embedding import TextEmbedding

Base.metadata.create_all(bind=engine)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(profile_router, prefix="/api")
app.include_router(resume_router, prefix="/api")
app.include_router(jobs_router, prefix="/api")