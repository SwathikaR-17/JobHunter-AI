function Matches({ jobs }) {
  const sortedJobs = [...jobs]
    .sort((a, b) => b.match_percentage - a.match_percentage)
    .slice(0, 3);

  return (
    <main className="matches-page">

      <div className="page-title">
        <p className="eyebrow">AI MATCHING</p>
        <h1>Your Best Matches</h1>
        <p>
          See why these opportunities fit your profile.
        </p>
      </div>

      <div className="matches-intro">
        <div>
          <span>AI ANALYSIS</span>
          <h2>Why these jobs fit you</h2>
          <p>
            Our matching agent compares your skills,
            projects and experience against each role.
          </p>
        </div>

        <div className="matches-count">
          <strong>{sortedJobs.length}</strong>
          <span>TOP MATCHES</span>
        </div>
      </div>

      <section className="match-analysis-list">

        {sortedJobs.map((job, index) => (
          <div className="match-analysis-card" key={job.job_id}>

            <div className="match-analysis-header">

              <div>
                <span className="match-rank">
                  #{index + 1} BEST MATCH
                </span>

                <p className="job-company">
                  {job.company}
                </p>

                <h2>{job.title}</h2>

                <p className="job-meta">
                  📍 {job.location || "Location not specified"}
                </p>
              </div>

              <div className="match-score-large">
                <strong>
                  {job.match_percentage}%
                </strong>

                <span>OVERALL MATCH</span>
              </div>

            </div>


            <div className="match-breakdown">

              <div className="match-metric">
                <span>SKILL FIT</span>
                <strong>
                  {job.skill_fit || 0}%
                </strong>

                <div className="metric-bar">
                  <div
                    style={{
                      width: `${job.skill_fit || 0}%`,
                    }}
                  />
                </div>
              </div>


              <div className="match-metric">
                <span>EXPERIENCE FIT</span>
                <strong>
                  {job.experience_fit || 0}%
                </strong>

                <div className="metric-bar">
                  <div
                    style={{
                      width: `${job.experience_fit || 0}%`,
                    }}
                  />
                </div>
              </div>


              <div className="match-metric">
                <span>PROJECT FIT</span>
                <strong>
                  {job.project_fit || 0}%
                </strong>

                <div className="metric-bar">
                  <div
                    style={{
                      width: `${job.project_fit || 0}%`,
                    }}
                  />
                </div>
              </div>

            </div>


            <div className="match-skills-section">

              <div>
                <span className="analysis-label">
                  ✓ YOUR STRENGTHS
                </span>

                <div className="job-skills">
                  {(job.exact_matches || [])
                    .slice(0, 5)
                    .map((skill, i) => (
                      <span
                        className="skill-tag matched"
                        key={i}
                      >
                        ✓ {skill}
                      </span>
                    ))}
                </div>
              </div>


              <div>
                <span className="analysis-label">
                  + SKILLS TO DEVELOP
                </span>

                <div className="job-skills">
                  {(job.missing_skills || [])
                    .slice(0, 5)
                    .map((skill, i) => (
                      <span
                        className="skill-tag missing"
                        key={i}
                      >
                        + {skill}
                      </span>
                    ))}
                </div>
              </div>

            </div>


            <div className="match-recommendation">

              <div>
                <span>AI RECOMMENDATION</span>

                <p>
                  {job.match_percentage >= 40
                    ? "Strong opportunity for your current profile."
                    : job.match_percentage >= 20
                    ? "Worth considering while improving your skill gaps."
                    : "Low current fit. Consider this after strengthening your skills."}
                </p>
              </div>

              <button>
                View full analysis →
              </button>

            </div>

          </div>
        ))}

      </section>

    </main>
  );
}

export default Matches;