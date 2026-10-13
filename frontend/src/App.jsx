import { useEffect, useState } from "react";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import SkillGaps from "./pages/SkillGaps";
import Matches from "./pages/Matches";
import Applications from "./pages/Applications";
import Resume from "./pages/Resume";
import Profile from "./pages/Profile";
import Insights from "./pages/Insights";
import JobAnalysis from "./pages/JobAnalysis";

import "./App.css";

function App() {
  const [profile, setProfile] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [skillGaps, setSkillGaps] = useState([]);
  const [activePage, setActivePage] = useState("dashboard");
  const [selectedJob, setSelectedJob] = useState(null);

  // Load profile
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/profile/1")
      .then((response) => response.json())
      .then((data) => {
        setProfile(data);
      })
      .catch((error) => {
        console.error("Profile loading failed:", error);
      });
  }, []);

  // Analyze jobs
  const analyzeJobs = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/jobs/analyze/1",
        {
          method: "POST",
        }
      );

      const data = await response.json();

      setJobs(data.jobs);
      setSkillGaps(data.skill_gaps);

      console.log("JOB ANALYSIS RESULT:", data);
    } catch (error) {
      console.error("Job analysis failed:", error);
    }
  };

  const openJobAnalysis = (job) => {
  setSelectedJob(job);
  setActivePage("job-analysis");
  };

  // Loading state
  if (!profile) {
    return (
      <div className="loading">
        Loading your career workspace...
      </div>
    );
  }

  return (
    <div className="app">

      {/* TOPBAR */}
      <Topbar profile={profile} />

      <div className="app-layout">

        {/* SIDEBAR */}
        <Sidebar
          activePage={activePage}
          setActivePage={setActivePage}
        />

        {/* PAGE CONTENT */}
        <main className="page-content">

          {activePage === "job-analysis" && (
            <JobAnalysis
              job={selectedJob}
              goBack={() => setActivePage("jobs")}
            />
          )}

          {/* DASHBOARD */}
          {activePage === "dashboard" && (
            <Dashboard
              profile={profile}
              jobs={jobs}
              analyzeJobs={analyzeJobs}
            />
          )}

          {/* JOBS */}
          {activePage === "jobs" && (
            <Jobs
              jobs={jobs}
              openJobAnalysis={openJobAnalysis}
            />
          )}

          {/* MY MATCHES */}
          {activePage === "matches" && (
            <Matches jobs={jobs} />
          )}

          {/* SKILL GAPS */}
          {activePage === "skills" && (
            <SkillGaps skillGaps={skillGaps} />
          )}

          {/* APPLICATIONS */}
          {activePage === "applications" && (
            <Applications />
          )}

          {/* RESUME */}
          {activePage === "resume" && (
            <Resume
              profile={profile}
              setProfile={setProfile}
            />
          )}

          {/* PROFILE */}
          {activePage === "profile" && (
            <Profile profile={profile} />
          )}

          {/* INSIGHTS */}
          {activePage === "insights" && (
            <Insights jobs={jobs} skillGaps={skillGaps} />
          )}

          {/* PLACEHOLDER */}
          {activePage !== "dashboard" &&
            activePage !== "jobs" &&
            activePage !== "matches" &&
            activePage !== "skills" &&
            activePage !== "applications" &&
            activePage !== "resume" &&
            activePage !== "profile" && 
            activePage !== "insights" && 
            activePage !== "job-analysis" && (    
              <div className="page-placeholder">
                <p className="eyebrow">JobHunter AI</p>
                <h1>{activePage}</h1>
                <p>This section is coming next.</p>
              </div>
            )}

        </main>
      </div>
    </div>
  );
}

export default App;