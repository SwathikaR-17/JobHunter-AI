function Insights({ jobs, skillGaps }) {
  const topMatch =
    jobs.length > 0
      ? jobs[0].match_percentage
      : 0;

  const highPriority = [
    ...new Set(
      skillGaps.flatMap(
        (gap) => gap.high_priority || []
      )
    ),
  ];

  return (
    <main className="insights-page">

      <div className="page-title">
        <p className="eyebrow">AI CAREER INTELLIGENCE</p>

        <h1>Career Insights</h1>

        <p>
          Understand how your profile is performing
          and where to focus next.
        </p>
      </div>


      <section className="insight-overview">

        <div className="insight-card">
          <span>TOP JOB MATCH</span>
          <strong>{topMatch}%</strong>
          <p>Your strongest current opportunity</p>
        </div>

        <div className="insight-card">
          <span>HIGH PRIORITY SKILLS</span>
          <strong>{highPriority.length}</strong>
          <p>Skills worth learning next</p>
        </div>

        <div className="insight-card">
          <span>JOBS ANALYZED</span>
          <strong>{jobs.length}</strong>
          <p>Opportunities evaluated by AI</p>
        </div>

      </section>


      <section className="insights-section">

        <div className="section-heading">
          <div>
            <p className="section-eyebrow">
              AI RECOMMENDATION
            </p>

            <h2>What you should focus on</h2>
          </div>
        </div>


        <div className="insight-recommendation">

          <div className="insight-number">
            01
          </div>

          <div>
            <h3>Strengthen your highest-impact skills</h3>

            <p>
              Focus on the skills appearing most frequently
              across the opportunities you're being matched with.
            </p>

            <div className="profile-tags">
              {highPriority.slice(0, 6).map(
                (skill, index) => (
                  <span key={index}>
                    {skill}
                  </span>
                )
              )}
            </div>
          </div>

        </div>


        <div className="insight-recommendation">

          <div className="insight-number">
            02
          </div>

          <div>
            <h3>Prioritize stronger-fit opportunities</h3>

            <p>
              Your AI matching system ranks opportunities
              using your current skills, projects and experience.
            </p>
          </div>

        </div>


        <div className="insight-recommendation">

          <div className="insight-number">
            03
          </div>

          <div>
            <h3>Use your projects as evidence</h3>

            <p>
              Projects can help demonstrate practical
              experience when you don't yet have extensive
              professional experience.
            </p>
          </div>

        </div>

      </section>

    </main>
  );
}

export default Insights;