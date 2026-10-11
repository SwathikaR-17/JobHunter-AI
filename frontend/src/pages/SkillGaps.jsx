function SkillGaps({ skillGaps }) {
  const allHigh = [
    ...new Set(
      skillGaps.flatMap((gap) => gap.high_priority || [])
    ),
  ];

  const allMedium = [
    ...new Set(
      skillGaps.flatMap((gap) => gap.medium_priority || [])
    ),
  ];

  return (
    <main className="skill-page">

      <div className="page-title">
        <p className="eyebrow">CAREER INTELLIGENCE</p>
        <h1>Your Skill Gaps</h1>
        <p>
          Skills that could improve your opportunities.
        </p>
      </div>


      <section className="skill-summary">

        <div className="skill-summary-card">
          <span>HIGH PRIORITY</span>
          <strong>{allHigh.length}</strong>
          <p>Skills to focus on first</p>
        </div>

        <div className="skill-summary-card">
          <span>MEDIUM PRIORITY</span>
          <strong>{allMedium.length}</strong>
          <p>Useful supporting skills</p>
        </div>

      </section>


      <section className="skill-section">

        <div className="section-heading">
          <div>
            <p className="section-eyebrow">
              PRIORITIZED BY AI
            </p>

            <h2>Skills holding you back</h2>

            <p>
              Skills that could unlock more opportunities.
            </p>
          </div>
        </div>


        {/* HIGH PRIORITY */}

        {allHigh.length > 0 && (
          <div className="skill-priority-group">

            <div className="priority-heading">
              <div>
                <span className="priority-label high-label">
                  HIGH PRIORITY
                </span>

                <h3>{allHigh.length} skills</h3>
              </div>
            </div>


            <div className="skill-list">

              {allHigh.map((skill, index) => (
                <div
                  className="gap-card high"
                  key={index}
                >
                  <div>
                    <h3>{skill}</h3>
                  </div>

                  <span className="gap-arrow">
                    →
                  </span>
                </div>
              ))}

            </div>

          </div>
        )}


        {/* MEDIUM PRIORITY */}

        {allMedium.length > 0 && (
          <div className="skill-priority-group">

            <div className="priority-heading">
              <div>
                <span className="priority-label medium-label">
                  MEDIUM PRIORITY
                </span>

                <h3>{allMedium.length} skills</h3>
              </div>
            </div>


            <div className="skill-list">

              {allMedium.map((skill, index) => (
                <div
                  className="gap-card medium"
                  key={index}
                >
                  <div>
                    <h3>{skill}</h3>
                  </div>

                  <span className="gap-arrow">
                    →
                  </span>
                </div>
              ))}

            </div>

          </div>
        )}

      </section>

    </main>
  );
}

export default SkillGaps;