function JobAnalysis({ job, goBack }) {
  if (!job) {
    return (
      <main className="job-analysis-page">

        <h2>No job selected</h2>

        <button
          className="back-button"
          onClick={goBack}
        >
          ← Back to Jobs
        </button>

      </main>
    );
  }

  const match = job.match_percentage || 0;
  const skillFit = job.skill_fit || 0;
  const experienceFit = job.experience_fit || 0;
  const projectFit = job.project_fit || 0;

  const fitLabel =
    match >= 70
      ? "Strong fit"
      : match >= 40
      ? "Potential fit"
      : "Low fit";

  const fitDescription =
    match >= 70
      ? "Your profile aligns strongly with this opportunity."
      : match >= 40
      ? "You have meaningful alignment, with some areas to strengthen."
      : "This role has limited alignment with your current profile.";

  return (
    <main className="job-analysis-page">

      {/* BACK */}

      <button
        className="back-button"
        onClick={goBack}
      >
        ← Back to Jobs
      </button>


      {/* HEADER */}

      <section className="analysis-header">

        <div className="analysis-header-info">

          <p className="eyebrow">
            AI JOB ANALYSIS
          </p>

          <p className="job-company">
            {job.company}
          </p>

          <h1>
            {job.title}
          </h1>

          <p className="job-meta">
            📍 {job.location || "Location not specified"}
          </p>

        </div>


        {/* MATCH SCORE */}

        <div className="analysis-score-card">

          <div
            className="analysis-score-ring"
            style={{
              background: `conic-gradient(
                #ff4fa3 ${match * 3.6}deg,
                rgba(255,255,255,0.07) ${match * 3.6}deg
              )`
            }}
          >

            <div className="analysis-score-inner">

              <strong>
                {match}%
              </strong>

              <span>
                MATCH
              </span>

            </div>

          </div>

          <div className="analysis-score-text">

            <strong>
              {fitLabel}
            </strong>

            <span>
              {fitDescription}
            </span>

          </div>

        </div>

      </section>


      {/* MATCH BREAKDOWN */}

      <section className="analysis-breakdown">

        <div className="analysis-breakdown-header">

          <div>
            <p className="analysis-label">
              MATCH BREAKDOWN
            </p>

            <h2>
              Why this role matches you
            </h2>
          </div>

          <span className="analysis-breakdown-note">
            AI PROFILE ANALYSIS
          </span>

        </div>


        <div className="analysis-metrics">

          <div className="analysis-metric">

            <div className="analysis-metric-top">

              <span>
                SKILL FIT
              </span>

              <strong>
                {skillFit}%
              </strong>

            </div>

            <div className="analysis-progress">
              <div
                style={{
                  width: `${skillFit}%`
                }}
              />
            </div>

            <small>
              How closely your skills match the role.
            </small>

          </div>


          <div className="analysis-metric">

            <div className="analysis-metric-top">

              <span>
                EXPERIENCE FIT
              </span>

              <strong>
                {experienceFit}%
              </strong>

            </div>

            <div className="analysis-progress">
              <div
                style={{
                  width: `${experienceFit}%`
                }}
              />
            </div>

            <small>
              Alignment with the role's experience expectations.
            </small>

          </div>


          <div className="analysis-metric">

            <div className="analysis-metric-top">

              <span>
                PROJECT FIT
              </span>

              <strong>
                {projectFit}%
              </strong>

            </div>

            <div className="analysis-progress">
              <div
                style={{
                  width: `${projectFit}%`
                }}
              />
            </div>

            <small>
              Relevance of your projects to this opportunity.
            </small>

          </div>

        </div>

      </section>


      {/* STRENGTHS + GAPS */}

      <section className="analysis-skills-grid">


        {/* STRENGTHS */}

        <div className="analysis-section-card">

          <span className="analysis-label strengths-label">
            ✓ YOUR STRENGTHS
          </span>

          <h2>
            Skills you already have
          </h2>

          <p className="analysis-card-description">
            These skills from your profile directly align
            with this opportunity.
          </p>

          <div className="job-skills">

            {(job.exact_matches || []).length > 0 ? (

              job.exact_matches.map((skill, index) => (

                <span
                  className="skill-tag matched"
                  key={index}
                >
                  ✓ {skill}
                </span>

              ))

            ) : (

              <p className="empty-analysis-text">
                No strong skill matches identified yet.
              </p>

            )}

          </div>

        </div>


        {/* GAPS */}

        <div className="analysis-section-card">

          <span className="analysis-label gaps-label">
            + SKILL GAPS
          </span>

          <h2>
            What you may need to strengthen
          </h2>

          <p className="analysis-card-description">
            These skills could improve your fit for this role.
          </p>

          <div className="job-skills">

            {(job.missing_skills || []).length > 0 ? (

              job.missing_skills.map((skill, index) => (

                <span
                  className="skill-tag missing"
                  key={index}
                >
                  + {skill}
                </span>

              ))

            ) : (

              <p className="empty-analysis-text">
                No major skill gaps identified.
              </p>

            )}

          </div>

        </div>

      </section>


      {/* AI RECOMMENDATION */}

      <section className="ai-analysis-card">

        <div className="ai-analysis-icon">
          ✦
        </div>

        <div className="ai-analysis-content">

          <span className="analysis-label">
            AI RECOMMENDATION
          </span>

          <h2>
            Should you apply?
          </h2>

          <p>
            {match >= 70
              ? "Yes. This is a strong opportunity for your current profile and should be one of your higher-priority applications."
              : match >= 40
              ? "Consider applying. You have meaningful alignment, while the identified skill gaps give you clear areas to improve."
              : "This probably shouldn't be a top priority right now. Consider strengthening the identified skills before prioritizing this opportunity."}
          </p>

        </div>

      </section>


      {/* ACTIONS */}

      <div className="analysis-actions">

        <button className="save-job-button">
          ☆ Save Job
        </button>

        <button className="apply-job-button">
          Apply →
        </button>

      </div>

    </main>
  );
}

export default JobAnalysis;