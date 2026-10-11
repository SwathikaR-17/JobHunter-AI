function Jobs({ jobs }) {
  return (
    <main className="jobs-page">

      <div className="page-title">
        <p className="eyebrow">OPPORTUNITIES</p>
        <h1>Find your next opportunity</h1>
        <p>Jobs ranked by your AI matching system.</p>
      </div>

      <div className="jobs-page-header">
        <h2>{jobs.length} opportunities found</h2>
        <button>✦ Best matches</button>
      </div>

      <div className="all-jobs">

        {jobs.map((job) => (
          <div className="full-job-card" key={job.job_id}>

            <div className="full-job-main">

              <p className="job-company">
                {job.company}
              </p>

              <h3>{job.title}</h3>

              <p className="job-meta">
                📍 {job.location || "Location not specified"}
              </p>

              <div className="job-skills">
                {(job.exact_matches || []).map((skill, i) => (
                  <span className="skill-tag matched" key={i}>
                    ✓ {skill}
                  </span>
                ))}

                {(job.missing_skills || []).slice(0, 5).map((skill, i) => (
                  <span className="skill-tag missing" key={i}>
                    + {skill}
                  </span>
                ))}
              </div>

            </div>

            <div className="full-job-match">
              <strong>{job.match_percentage}%</strong>
              <span>MATCH</span>

              <button>
                View analysis →
              </button>
            </div>

          </div>
        ))}

      </div>

    </main>
  );
}

export default Jobs;