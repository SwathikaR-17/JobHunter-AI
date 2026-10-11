function Sidebar({ activePage, setActivePage }) {
  return (
    <aside className="sidebar">

      {/* LOGO */}
      <div className="sidebar-logo">
        <div className="logo-icon">J</div>

        <div className="logo-text">
          JobHunter <span>AI</span>
        </div>
      </div>


      {/* MAIN */}
      <div className="sidebar-section">

        <p className="sidebar-heading">
          MAIN
        </p>

        <button
          className={`nav-item ${
            activePage === "dashboard" ? "active" : ""
          }`}
          onClick={() => setActivePage("dashboard")}
        >
          <span className="nav-icon">⌂</span>
          <span>Home</span>
        </button>

      </div>


      {/* WORKSPACE */}
      <div className="sidebar-section">

        <p className="sidebar-heading">
          WORKSPACE
        </p>

        <button
          className={`nav-item ${
            activePage === "jobs" ? "active" : ""
          }`}
          onClick={() => setActivePage("jobs")}
        >
          <span className="nav-icon">◈</span>
          <span>Jobs</span>
        </button>


        <button
          className={`nav-item ${
            activePage === "matches" ? "active" : ""
          }`}
          onClick={() => setActivePage("matches")}
        >
          <span className="nav-icon">◎</span>
          <span>My Matches</span>
        </button>


        <button
          className={`nav-item ${
            activePage === "skills" ? "active" : ""
          }`}
          onClick={() => setActivePage("skills")}
        >
          <span className="nav-icon">✦</span>
          <span>Skill Gaps</span>
        </button>

      </div>


      {/* APPLICATIONS */}
      <div className="sidebar-section">

        <p className="sidebar-heading">
          APPLICATIONS
        </p>

        <button
          className={`nav-item ${
            activePage === "applications" ? "active" : ""
          }`}
          onClick={() => setActivePage("applications")}
        >
          <span className="nav-icon">▣</span>
          <span>Tracker</span>
        </button>


        <button
          className={`nav-item ${
            activePage === "saved" ? "active" : ""
          }`}
          onClick={() => setActivePage("saved")}
        >
          <span className="nav-icon">☆</span>
          <span>Saved Jobs</span>
        </button>


        <button
          className={`nav-item ${
            activePage === "interviews" ? "active" : ""
          }`}
          onClick={() => setActivePage("interviews")}
        >
          <span className="nav-icon">◉</span>
          <span>Interviews</span>
        </button>

      </div>


      {/* CAREER */}
      <div className="sidebar-section">

        <p className="sidebar-heading">
          CAREER
        </p>

        <button
          className={`nav-item ${
            activePage === "resume" ? "active" : ""
          }`}
          onClick={() => setActivePage("resume")}
        >
          <span className="nav-icon">▤</span>
          <span>Resume</span>
        </button>


        <button
          className={`nav-item ${
            activePage === "insights" ? "active" : ""
          }`}
          onClick={() => setActivePage("insights")}
        >
          <span className="nav-icon">✧</span>
          <span>Career Insights</span>
        </button>

      </div>


      {/* PROFILE */}
      <div className="sidebar-section">

        <p className="sidebar-heading">
          PROFILE
        </p>

        <button
          className={`nav-item ${
            activePage === "profile" ? "active" : ""
          }`}
          onClick={() => setActivePage("profile")}
        >
          <span className="nav-icon">◯</span>
          <span>My Profile</span>
        </button>


        <button
          className={`nav-item ${
            activePage === "settings" ? "active" : ""
          }`}
          onClick={() => setActivePage("settings")}
        >
          <span className="nav-icon">⚙</span>
          <span>Settings</span>
        </button>

      </div>


      {/* AI STATUS */}
      <div className="ai-agent-card">

        <div className="ai-agent-icon">
          ✦
        </div>

        <div>
          <p>AI Agents</p>

          <span>
            <span className="status-dot"></span>
            Online & ready
          </span>
        </div>

      </div>

    </aside>
  );
}

export default Sidebar;