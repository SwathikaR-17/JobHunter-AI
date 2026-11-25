# JobHunter-AI 🚀

### An AI-Powered Job Discovery, Matching & Application Preparation Platform

JobHunter-AI is an intelligent job assistance platform designed to help candidates discover relevant opportunities, understand how well their skills align with job requirements, identify skill gaps, and prepare more effectively for applications.

The platform combines **Gemini-powered resume parsing, semantic embeddings, weighted job matching, and a LangGraph-orchestrated multi-agent workflow** to provide a more personalized job search experience.

---

## ✨ Key Features

### 1. AI-Powered Resume Parsing

- Upload resumes in PDF format.
- Extract candidate information using Google's Gemini API.
- Identify skills, education, projects, experience, certifications and languages.
- Convert unstructured resume content into structured candidate profiles using Pydantic schemas.

### 2. Intelligent Job Discovery

- Retrieve and store job opportunities.
- Organize job information, including title, company, location, required skills and experience.
- Maintain structured job records for subsequent analysis.

### 3. Semantic Job Matching

- Compare candidate skills with job requirements.
- Generate semantic embeddings using Google's Gemini Embedding API.
- Use cosine similarity to identify relevant skills demonstrated through candidate projects.
- Distinguish between proven, strongly related, related and missing skills.
- Calculate a weighted job-match score.

**Job matching formula:**

The current matching implementation combines three factors:

| Matching factor   | Weight |
| ----------------- | -----: |
| Skill fit         |    60% |
| Experience fit    |    25% |
| Project relevance |    15% |

This helps evaluate candidates beyond exact keyword matching.

### 4. Multi-Agent Workflow

JobHunter-AI uses LangGraph to coordinate five specialized agents:

| Agent                  | Responsibility                                                              |
| ---------------------- | --------------------------------------------------------------------------- |
| Job Discovery Agent    | Retrieves available jobs                                                    |
| Job Intelligence Agent | Processes and organizes job information                                     |
| Matching Agent         | Evaluates candidate-job compatibility                                       |
| Skill Gap Agent        | Identifies and prioritizes missing skills                                   |
| Application Prep Agent | Generates resume keywords, interview topics and application recommendations |

The agents operate through a shared workflow state, allowing information to pass sequentially between stages.

### 5. Skill Gap Analysis

- Identify skills missing from job requirements.
- Categorize missing skills into high, medium and low priority.
- Generate recommendations to help candidates prioritize their learning.

### 6. Application Preparation

- Generate relevant resume keywords.
- Suggest interview preparation topics.
- Provide application strategies based on matching results and identified skill gaps.

### 7. Candidate Profile Management

- Create candidate profiles.
- Retrieve existing profiles.
- Update candidate information.
- Delete profiles.

---

## 🏗️ System Architecture

JobHunter-AI follows a modular full-stack architecture, combining a React frontend, FastAPI backend, PostgreSQL database and AI-powered processing components.

The backend separates API handling, resume processing, job matching and multi-agent orchestration into dedicated modules.

### Architecture Diagram

```mermaid
flowchart TB
    U(["👤 Candidate"])

    subgraph FRONTEND["Frontend Layer"]
        UI["React 19 + Vite"]
        DASH["Dashboard · Jobs · Matches"]
        PROFILE["Profile · Resume · Applications"]
        UI --> DASH
        UI --> PROFILE
    end

    subgraph BACKEND["Backend Layer — FastAPI"]
        API["REST API"]

        subgraph ROUTES["API Routes"]
            PR["Profile Routes"]
            RR["Resume Routes"]
            JR["Job Routes"]
        end

        API --> PR
        API --> RR
        API --> JR
    end

    subgraph AI["AI Processing Layer"]
        PDF["PDF Text Extraction"]
        GEM["Gemini API<br/>Structured Resume Parsing"]
        EMB["Gemini Embeddings"]
        MATCH["Job Matching Engine<br/>Weighted Scoring + Semantic Similarity"]

        subgraph AGENTS["LangGraph Multi-Agent Workflow"]
            JD["Job Discovery"]
            JI["Job Intelligence"]
            MA["Matching"]
            SG["Skill Gap Analysis"]
            AP["Application Preparation"]

            JD --> JI --> MA --> SG --> AP
        end
    end

    subgraph DATA["Data Layer"]
        DB[("PostgreSQL")]
        ORM["SQLAlchemy ORM"]
    end

    U --> UI
    UI <-->|"HTTP / REST"| API

    RR --> PDF --> GEM
    GEM --> PR

    JR --> JD
    MA --> MATCH
    EMB --> MATCH

    PR --> ORM
    JR --> ORM
    JD --> ORM
    MATCH --> ORM
    ORM <--> DB

    AP --> API

    classDef frontend fill:#dbeafe,stroke:#2563eb,color:#1e3a8a
    classDef backend fill:#dcfce7,stroke:#16a34a,color:#14532d
    classDef ai fill:#f3e8ff,stroke:#9333ea,color:#581c87
    classDef data fill:#fef3c7,stroke:#d97706,color:#78350f

    class UI,DASH,PROFILE frontend
    class API,PR,RR,JR backend
    class PDF,GEM,EMB,MATCH,JD,JI,MA,SG,AP ai
    class DB,ORM data
```

### Core Processing Workflows

**1. Resume Processing**
- Candidates upload their resumes in PDF format.
- Resume text is extracted using PDF processing utilities.
- Google's Gemini API converts the extracted information into structured candidate data.
- The parsed information is validated and stored in the candidate profile.

**2. Intelligent Job Matching**
- Job information is retrieved from the database.
- Candidate skills and experience are compared against job requirements.
- Semantic embeddings help identify relevant skills demonstrated through projects.
- A weighted scoring mechanism calculates the overall job-match percentage.

**3. Multi-Agent Orchestration**

LangGraph coordinates five specialized agents through a sequential workflow:

| Agent | Responsibility |
|---|---|
| Job Discovery | Retrieves available job opportunities |
| Job Intelligence | Processes and organizes job information |
| Matching | Evaluates candidate-job compatibility |
| Skill Gap | Identifies and prioritizes missing skills |
| Application Prep | Generates resume keywords and interview preparation recommendations |

Each agent contributes to a shared workflow state, enabling information to flow from job discovery through application preparation.

### Architectural Highlights

- **Modular backend:** Separate routes, services, models and schemas.
- **AI-powered extraction:** Gemini-based resume parsing and structured data generation.
- **Semantic intelligence:** Embedding-based project and skill relevance analysis.
- **Multi-agent orchestration:** LangGraph coordinates specialized job assistance agents.
- **Persistent storage:** PostgreSQL manages candidate, job and embedding data.

---

## 🧠 Job Matching Workflow

The matching engine evaluates job requirements against candidate skills and project experience.

**Step 1: Exact Skill Matching**

Compare the candidate's explicitly listed skills with the skills required by a job.

**Step 2: Project Embedding Retrieval**

Retrieve stored embeddings representing candidate projects and job-required skills.

**Step 3: Semantic Similarity**

Calculate cosine similarity between project embeddings and job-skill embeddings.

**Step 4: Skill Evidence Classification**

Classify each required skill based on available evidence:

| Similarity / evidence | Classification   |
| --------------------- | ---------------- |
| Explicit skill match  | Proven           |
| Similarity ≥ 0.65     | Strongly Related |
| Similarity ≥ 0.55     | Related          |
| Similarity below 0.55 | Missing          |

**Step 5: Weighted Scoring**

Combine skill fit, experience fit and project relevance to produce the final job-match percentage.

**Step 6: Recommendations**

Identify missing skills, prioritize learning requirements and generate application preparation recommendations.

---

## 🛠️ Tech Stack

| Component           | Technologies         |
| ------------------- | -------------------- |
| Frontend            | React 19, Vite       |
| Backend             | Python, FastAPI      |
| Database            | PostgreSQL           |
| ORM                 | SQLAlchemy           |
| AI / LLM            | Google Gemini API    |
| Embeddings          | Gemini Embedding API |
| Agent Orchestration | LangGraph            |
| Resume Processing   | PyPDF                |
| Data Validation     | Pydantic             |
| API Server          | Uvicorn              |

---

## 📂 Project Structure

```text
JobHunter-AI/
│
├── backend/
│   ├── app/
│   │   ├── agents/
│   │   │   ├── application_prep_agent.py
│   │   │   ├── job_discovery_agent.py
│   │   │   ├── job_intelligence_agent.py
│   │   │   ├── matching_agent.py
│   │   │   └── skill_gap_agent.py
│   │   │
│   │   ├── models/
│   │   │   ├── candidate.py
│   │   │   ├── embedding.py
│   │   │   └── job.py
│   │   │
│   │   ├── routes/
│   │   │   ├── jobs.py
│   │   │   ├── profile.py
│   │   │   └── resume.py
│   │   │
│   │   ├── schemas/
│   │   │   ├── job.py
│   │   │   └── profile.py
│   │   │
│   │   ├── services/
│   │   │   ├── embedding_service.py
│   │   │   ├── job_discovery.py
│   │   │   ├── job_matcher.py
│   │   │   └── resume_parser.py
│   │   │
│   │   ├── agent_state.py
│   │   ├── database.py
│   │   ├── jobhunter_graph.py
│   │   └── main.py
│   │
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

## ⚙️ Installation & Setup

### Prerequisites

- Python 3.11+
- Node.js and npm
- PostgreSQL
- Google Gemini API key

### 1. Clone the Repository

```bash
git clone https://github.com/SwathikaR-17/JobHunter-AI.git

cd JobHunter-AI
```

### 2. Backend Setup

```bash
cd backend

python -m venv .venv
```

Activate the virtual environment.

Windows PowerShell:

```powershell
.venv\Scripts\Activate.ps1
```

Install dependencies:

```bash
pip install -r requirements.txt
pip install langgraph
```

The LangGraph dependency should also be added to `requirements.txt` before relying on a fresh installation.

### 3. Database Configuration

Create a PostgreSQL database for the application.

Create a `.env` file inside the `backend` directory:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/jobhunter_ai

GEMINI_API_KEY=your_gemini_api_key
```

Replace the placeholders with your PostgreSQL credentials and Gemini API key.

### 4. Start the Backend

From the `backend` directory:

```bash
uvicorn app.main:app --reload
```

The FastAPI backend will be available at:

```text
http://127.0.0.1:8000
```

Interactive API documentation:

```text
http://127.0.0.1:8000/docs
```

### 5. Frontend Setup

Open another terminal:

```bash
cd frontend

npm install

npm run dev
```

Open the local URL displayed by Vite in your browser.

---

## 🔌 API Endpoints

The backend currently exposes the following API routes:

| Method | Endpoint                           | Description                |
| ------ | ---------------------------------- | -------------------------- |
| POST   | `/api/profile`                     | Create candidate profile   |
| GET    | `/api/profile/{profile_id}`        | Retrieve candidate profile |
| PUT    | `/api/profile/{profile_id}`        | Update candidate profile   |
| DELETE | `/api/profile/{profile_id}`        | Delete candidate profile   |
| POST   | `/api/profile/resume`              | Upload and parse resume    |
| POST   | `/api/jobs`                        | Create a job               |
| GET    | `/api/jobs`                        | Retrieve available jobs    |
| POST   | `/api/jobs/fetch`                  | Fetch and store jobs       |
| POST   | `/api/jobs/analyze/{candidate_id}` | Run job analysis workflow  |

For detailed request and response schemas, use the FastAPI Swagger documentation at `/docs`.

---

## 🔮 Future Enhancements

- Expand job discovery across multiple job platforms.
- Improve personalized job recommendations.
- Integrate more advanced LLM-powered job analysis.
- Enhance resume tailoring for individual job descriptions.
- Add application tracking and progress monitoring.
- Improve skill development recommendations.
- Add authentication and multi-user support.

---

## 🔐 Security

- Store API keys and database credentials in environment variables.
- Never commit `.env` files or secret credentials.
- Configure appropriate CORS origins before deployment.

---

## 👩‍💻 Author

**Swathi**

Computer Science Engineering | AI & Machine Learning

GitHub: [@SwathikaR-17](https://github.com/SwathikaR-17)

---

*JobHunter-AI — Making job discovery and application preparation more intelligent.*
