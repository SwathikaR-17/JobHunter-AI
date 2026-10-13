function Jobs({ jobs, openJobAnalysis }) {
  return (
    <main className="jobs-page">

      {/* PAGE HEADER */}

      <div className="jobs-hero">

        <div>
          <p className="eyebrow">
            AI OPPORTUNITY ENGINE
          </p>

          <h1>
            Find your next
            <span> opportunity.</span>
          </h1>

          <p className="jobs-description">
            Opportunities ranked by how well they align
            with your skills, experience and projects.
          </p>
        </div>

        <div className="jobs-intelligence-badge">
          <span className="status-dot"></span>

          <div>
            <strong>AI matching active</strong>
            <small>Your profile is being used</small>
          </div>
        </div>

      </div>


      {/* JOB SUMMARY */}

      <div className="jobs-summary">

        <div>
          <span>OPPORTUNITIES</span>
          <strong>{jobs.length}</strong>
        </div>

        <div>
          <span>RANKED BY</span>
          <strong>AI MATCH</strong>
        </div>

        <button className="jobs-sort-button">
          ✦ Best matches
        </button>

      </div>


      {/* JOB LIST */}

      <div className="all-jobs">

        {jobs.length === 0 ? (

          <div className="jobs-empty">

            <div className="jobs-empty-icon">
              ◈
            </div>

            <h2>
              No opportunities yet
            </h2>

            <p>
              Run the AI job analysis from your Home
              dashboard to discover matching opportunities.
            </p>

          </div>

        ) : (

          jobs.map((job, index) => {

            const match = job.match_percentage || 0;

            return (
              <div
                className="full-job-card premium-full-job"
                key={job.job_id}
              >

                {/* RANK */}

                <div className="job-card-rank">
                  #{String(index + 1).padStart(2, "0")}
                </div>


                {/* MAIN CONTENT */}

                <div className="full-job-main">

                  <div className="job-card-top">

                    <div>

                      <p className="job-company">
                        {job.company}
                      </p>

                      <h3>
                        {job.title}
                      </h3>

                      <p className="job-meta">
                        📍{" "}
                        {job.location ||
                          "Location not specified"}
                      </p>

                    </div>


                    {/* MATCH */}

                    <div className="job-match-display">

                      <strong>
                        {match}%
                      </strong>

                      <span>
                        MATCH
                      </span>

                    </div>

                  </div>


                  {/* MATCH BAR */}

                  <div className="job-match-bar">

                    <div
                      style={{
                        width: `${match}%`
                      }}
                    />

                  </div>


                  {/* METRICS */}

                  <div className="job-fit-metrics">

                    <div>
                      <span>SKILL FIT</span>
                      <strong>
                        {job.skill_fit || 0}%
                      </strong>
                    </div>

                    <div>
                      <span>EXPERIENCE FIT</span>
                      <strong>
                        {job.experience_fit || 0}%
                      </strong>
                    </div>

                    <div>
                      <span>PROJECT FIT</span>
                      <strong>
                        {job.project_fit || 0}%
                      </strong>
                    </div>

                  </div>


                  {/* SKILLS */}

                  <div className="job-card-skills">

                    <span className="job-card-label">
                      PROFILE ALIGNMENT
                    </span>

                    <div className="job-skills">

                      {(job.exact_matches || [])
                        .slice(0, 5)
                        .map((skill, i) => (

                          <span
                            className="skill-tag matched"
                            key={`match-${i}`}
                          >
                            ✓ {skill}
                          </span>

                        ))}

                      {(job.missing_skills || [])
                        .slice(0, 3)
                        .map((skill, i) => (

                          <span
                            className="skill-tag missing"
                            key={`missing-${i}`}
                          >
                            + {skill}
                          </span>

                        ))}

                    </div>

                  </div>


                  {/* ACTION */}

                  <div className="job-card-footer">

                    <span>
                      AI-analyzed opportunity
                    </span>

                    <button
                      onClick={() => {
                        console.log(
                          "VIEW ANALYSIS CLICKED",
                          job
                        );

                        openJobAnalysis(job);
                      }}
                    >
                      View AI analysis →
                    </button>

                  </div>

                </div>

              </div>
            );

          })

        )}

      </div>

    </main>
  );
}

export default Jobs;