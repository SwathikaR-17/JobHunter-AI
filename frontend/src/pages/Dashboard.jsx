function Dashboard({ profile, jobs, analyzeJobs }) {
  const topMatch =
    jobs.length > 0
      ? jobs[0].match_percentage
      : 0;

  const skillGapCount =
    jobs.length > 0
      ? new Set(
          jobs.flatMap(
            (job) => job.missing_skills || []
          )
        ).size
      : 0;

  const topJobs = jobs;

  return (
    <main className="dashboard-page">

      {/* HERO */}
      <section className="dashboard-hero">

        <div>
          <p className="eyebrow">
            YOUR CAREER COMMAND CENTER
          </p>

          <h1>
            Welcome back,{" "}
            {profile.name.split(" ")[0]} 👋
          </h1>

          <p className="hero-description">
            Your AI agents are working together to
            find opportunities that fit you best.
          </p>
        </div>

        <button
          className="analyze-button"
          onClick={analyzeJobs}
        >
          ✦ Analyze Jobs
        </button>

      </section>


      {/* STATS */}
      <section className="dashboard-stats">

        <div className="dashboard-stat-card">

          <div className="stat-icon">
            ◈
          </div>

          <div>
            <p>JOBS ANALYZED</p>

            <h2>
              {jobs.length}
            </h2>

            <span>
              Opportunities in your search
            </span>
          </div>

        </div>


        <div className="dashboard-stat-card">

          <div className="stat-icon">
            ◎
          </div>

          <div>
            <p>TOP MATCH</p>

            <h2>
              {topMatch}%
            </h2>

            <span>
              Best current opportunity
            </span>
          </div>

        </div>


        <div className="dashboard-stat-card">

          <div className="stat-icon">
            ✦
          </div>

          <div>
            <p>SKILL GAPS</p>

            <h2>
              {skillGapCount}
            </h2>

            <span>
              Skills worth improving
            </span>
          </div>

        </div>

      </section>


      {/* JOBS SECTION */}
      <section className="dashboard-section">

        <div className="section-heading">

          <div>
            <p className="section-eyebrow">
              AI RECOMMENDATIONS
            </p>

            <h2>
              Recommended for you
            </h2>

            <p>
              Opportunities ranked using your skills,
              projects and experience.
            </p>
          </div>

          <button
            className="view-all-button"
            onClick={analyzeJobs}
          >
            Refresh matches ↻
          </button>

        </div>


        {/* EMPTY STATE */}
        {jobs.length === 0 && (

          <div className="empty-jobs">

            <div className="empty-icon">
              ✦
            </div>

            <h3>
              Your AI agents are ready
            </h3>

            <p>
              Run an analysis to discover jobs
              matched to your profile.
            </p>

            <button
              className="analyze-button"
              onClick={analyzeJobs}
            >
              Analyze my opportunities
            </button>

          </div>

        )}


        {/* JOB CARDS */}
        <div className="dashboard-jobs">

          {topJobs.map((job, index) => (

            <div
              className="dashboard-job-card"
              key={job.job_id}
            >

              <div className="job-rank">
                #{index + 1}
              </div>


              <div className="dashboard-job-main">

                <div className="dashboard-job-header">

                  <div>

                    <p className="job-company">
                      {job.company}
                    </p>

                    <h3>
                      {job.title}
                    </h3>

                  </div>


                  <div className="match-score">

                    <strong>
                      {job.match_percentage}%
                    </strong>

                    <span>
                      MATCH
                    </span>

                  </div>

                </div>


                {/* PROGRESS */}
                <div className="match-progress">

                  <div
                    className="match-progress-fill"
                    style={{
                      width: `${Math.min(
                        job.match_percentage,
                        100
                      )}%`,
                    }}
                  />

                </div>


                {/* SKILLS */}
                <div className="job-skills">

                  {(job.exact_matches || [])
                    .slice(0, 3)
                    .map((skill, skillIndex) => (

                      <span
                        className="skill-tag matched"
                        key={skillIndex}
                      >
                        ✓ {skill}
                      </span>

                    ))}


                  {(job.missing_skills || [])
                    .slice(0, 3)
                    .map((skill, skillIndex) => (

                      <span
                        className="skill-tag missing"
                        key={skillIndex}
                      >
                        + {skill}
                      </span>

                    ))}

                </div>


                {/* FOOTER */}
                <div className="dashboard-job-footer">

                  <span>
                    Skill fit:{" "}
                    <strong>
                      {job.skill_fit}%
                    </strong>
                  </span>

                  <button className="job-details-button">
                    View analysis →
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>


      {/* AI AGENTS */}
      <section className="dashboard-section">

        <div className="section-heading">

          <div>
            <p className="section-eyebrow">
              YOUR AI SYSTEM
            </p>

            <h2>
              Career agents
            </h2>

            <p>
              Multiple specialized agents work together
              to improve your job search.
            </p>
          </div>

        </div>


        <div className="agent-grid">

          <div className="agent-card">
            <span>01</span>
            <div>⌕</div>
            <h3>Job Discovery</h3>
            <p>
              Finds relevant opportunities from
              your available job sources.
            </p>
          </div>


          <div className="agent-card">
            <span>02</span>
            <div>◈</div>
            <h3>Job Intelligence</h3>
            <p>
              Understands job requirements,
              skills and experience.
            </p>
          </div>


          <div className="agent-card">
            <span>03</span>
            <div>◎</div>
            <h3>Matching Agent</h3>
            <p>
              Compares your profile against
              each opportunity.
            </p>
          </div>


          <div className="agent-card">
            <span>04</span>
            <div>✦</div>
            <h3>Skill Gap Agent</h3>
            <p>
              Identifies skills that could
              improve your career opportunities.
            </p>
          </div>


          <div className="agent-card">
            <span>05</span>
            <div>↗</div>
            <h3>Application Prep</h3>
            <p>
              Prepares useful keywords and
              interview topics for applications.
            </p>
          </div>

        </div>

      </section>

    </main>
  );
}

export default Dashboard;