function Topbar({ profile }) {
  const initials = profile?.name
    ? profile.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
    : "AI";

  return (
    <header className="topbar">

      {/* SEARCH */}
      <div className="search-box">
        <span>⌕</span>

        <input
          type="text"
          placeholder="Search jobs, companies, skills..."
        />
      </div>


      {/* RIGHT SIDE */}
      <div className="topbar-right">

        <div className="ai-top-status">
          <span className="status-dot"></span>
          AI agents ready
        </div>


        <button className="notification-button">
          ♧
        </button>


        <div className="topbar-profile">

          <div className="topbar-avatar">
            {initials}
          </div>

          <div className="topbar-user">

            <strong>
              {profile?.name || "Your Profile"}
            </strong>

            <span>
              Career workspace
            </span>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Topbar;