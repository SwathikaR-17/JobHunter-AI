function Dashboard({ profile, jobs, analyzeJobs }) {
  const topJob = jobs.length > 0 ? jobs[0] : null;

  const analyzed = jobs.length > 0;

  return (
    <main className="dashboard-page">

      {/* =========================
          HERO
      ========================== */}

      <section className="dashboard-hero premium-hero">

        <div className="hero-content">

          <p className="eyebrow">
            YOUR AI CAREER COMMAND CENTER
          </p>

          <h1>
            Your career,
            <br />
            <span>powered by AI.</span>
          </h1>

          <p className="hero-description">
            Discover opportunities, understand your fit,
            identify skill gaps and prepare for your next
            career move — all in one intelligent workspace.
          </p>

          <div className="hero-status">
            <span className="status-dot"></span>
            <span>5 AI agents working together</span>
          </div>

        </div>


        {/* AI NETWORK */}

        <div className="ai-network">

          <div className="network-orbit orbit-one"></div>
          <div className="network-orbit orbit-two"></div>

          <div className="network-core">
            <span>✦</span>
            <strong>AI</strong>
          </div>

          <div className="network-node node-top">
            <span>◈</span>
            <small>JOBS</small>
          </div>

          <div className="network-node node-right">
            <span>◎</span>
            <small>MATCH</small>
          </div>

          <div className="network-node node-bottom">
            <span>✦</span>
            <small>SKILLS</small>
          </div>

          <div className="network-node node-left">
            <span>↗</span>
            <small>APPLY</small>
          </div>

        </div>

      </section>


      {/* =========================
          CAREER PULSE
      ========================== */}

      <section className="dashboard-section career-pulse-section">

        <div className="dashboard-section-title">

          <div>
            <p className="section-eyebrow">
              CAREER PULSE
            </p>

            <h2>
              Your workspace is ready
            </h2>

            <p>
              A quick look at the current state of your
              career intelligence system.
            </p>
          </div>

        </div>


        <div className="career-pulse">

          <div className="pulse-item">
            <div className="pulse-icon">◉</div>

            <div>
              <span>PROFILE</span>
              <strong>Ready</strong>
            </div>

            <div className="pulse-check">✓</div>
          </div>


          <div className="pulse-line"></div>


          <div className="pulse-item">
            <div className="pulse-icon">◈</div>

            <div>
              <span>JOB SEARCH</span>
              <strong>
                {analyzed ? "Active" : "Ready"}
              </strong>
            </div>

            <div className="pulse-check">
              {analyzed ? "✓" : "○"}
            </div>
          </div>


          <div className="pulse-line"></div>


          <div className="pulse-item">
            <div className="pulse-icon">◎</div>

            <div>
              <span>MATCHING</span>
              <strong>
                {analyzed ? "Complete" : "Waiting"}
              </strong>
            </div>

            <div className="pulse-check">
              {analyzed ? "✓" : "○"}
            </div>
          </div>


          <div className="pulse-line"></div>


          <div className="pulse-item">
            <div className="pulse-icon">✦</div>

            <div>
              <span>SKILL INTELLIGENCE</span>
              <strong>
                {analyzed ? "Ready" : "Waiting"}
              </strong>
            </div>

            <div className="pulse-check">
              {analyzed ? "✓" : "○"}
            </div>
          </div>

        </div>

      </section>


      {/* =========================
          NEXT BEST MOVE
      ========================== */}

      <section className="dashboard-section">

        <div className="dashboard-section-title">

          <div>
            <p className="section-eyebrow">
              AI RECOMMENDATION
            </p>

            <h2>
              Your next best move
            </h2>

            <p>
              JobHunter AI recommends what deserves
              your attention next.
            </p>
          </div>

        </div>


        <div className="next-action-card premium-action-card">

          <div className="next-action-glow"></div>

          <div className="next-action-icon">
            ✦
          </div>


          <div className="next-action-content">

            {!analyzed ? (

              <>
                <span className="analysis-label">
                  START YOUR SEARCH
                </span>

                <h2>
                  Analyze your opportunities
                </h2>

                <p>
                  Let your AI agents analyze the available
                  opportunities against your profile and
                  identify where you fit best.
                </p>

                <button
                  className="analyze-button"
                  onClick={analyzeJobs}
                >
                  Analyze Jobs →
                </button>
              </>

            ) : (

              <>
                <span className="analysis-label">
                  SEARCH READY
                </span>

                <h2>
                  Your opportunities are ready to explore
                </h2>

                <p>
                  Your AI agents have analyzed the current
                  opportunities. Start with your strongest
                  match and explore the detailed analysis.
                </p>
              </>

            )}

          </div>

        </div>

      </section>


      {/* =========================
          TOP OPPORTUNITY
      ========================== */}

      {topJob && (

        <section className="dashboard-section">

          <div className="dashboard-section-title">

            <div>
              <p className="section-eyebrow">
                TOP OPPORTUNITY
              </p>

              <h2>
                Worth your attention
              </h2>

              <p>
                Your strongest opportunity from the
                current AI analysis.
              </p>
            </div>

          </div>


          <div className="dashboard-top-job premium-job-card">

            <div className="top-job-rank">
              #1
            </div>


            <div className="top-job-content">

              <div className="top-job-header">

                <div>

                  <p className="job-company">
                    {topJob.company}
                  </p>

                  <h3>
                    {topJob.title}
                  </h3>

                  <p className="job-meta">
                    📍{" "}
                    {topJob.location ||
                      "Location not specified"}
                  </p>

                </div>


                {/* MATCH RING */}

                <div className="match-ring">

                  <div className="match-ring-inner">

                    <strong>
                      {topJob.match_percentage}%
                    </strong>

                    <span>
                      MATCH
                    </span>

                  </div>

                </div>

              </div>


              <div className="top-job-divider"></div>


              <div className="top-job-details">

                <div>
                  <span>SKILL FIT</span>

                  <strong>
                    {topJob.skill_fit || 0}%
                  </strong>
                </div>


                <div>
                  <span>EXPERIENCE FIT</span>

                  <strong>
                    {topJob.experience_fit || 0}%
                  </strong>
                </div>


                <div>
                  <span>PROJECT FIT</span>

                  <strong>
                    {topJob.project_fit || 0}%
                  </strong>
                </div>

              </div>


              <div className="top-job-skills">

                {(topJob.exact_matches || []).length > 0 && (

                  <div>

                    <span className="top-job-label">
                      YOUR MATCHING SKILLS
                    </span>

                    <div className="job-skills">

                      {(topJob.exact_matches || [])
                        .slice(0, 4)
                        .map((skill, index) => (

                          <span
                            className="skill-tag matched"
                            key={index}
                          >
                            ✓ {skill}
                          </span>

                        ))}

                    </div>

                  </div>

                )}

              </div>

            </div>

          </div>

        </section>

      )}


      {/* =========================
          HOW THE AI WORKS
      ========================== */}

      <section className="dashboard-section workflow-section">

        <div className="dashboard-section-title">

          <div>
            <p className="section-eyebrow">
              HOW JOBHUNTER AI WORKS
            </p>

            <h2>
              One system. Multiple specialized agents.
            </h2>

            <p>
              Your profile flows through a coordinated
              AI pipeline to turn a resume into actionable
              career decisions.
            </p>
          </div>

        </div>


        <div className="agent-workflow">

          <div className="workflow-step">

            <div className="workflow-number">
              01
            </div>

            <div className="workflow-icon">
              ▤
            </div>

            <h3>
              Your Resume
            </h3>

            <p>
              Your career profile becomes the foundation
              for the system.
            </p>

          </div>


          <div className="workflow-connector">
            →
          </div>


          <div className="workflow-step">

            <div className="workflow-number">
              02
            </div>

            <div className="workflow-icon">
              ⌕
            </div>

            <h3>
              Discovery
            </h3>

            <p>
              Finds opportunities relevant to your goals.
            </p>

          </div>


          <div className="workflow-connector">
            →
          </div>


          <div className="workflow-step">

            <div className="workflow-number">
              03
            </div>

            <div className="workflow-icon">
              ◈
            </div>

            <h3>
              Intelligence
            </h3>

            <p>
              Understands requirements and job context.
            </p>

          </div>


          <div className="workflow-connector">
            →
          </div>


          <div className="workflow-step">

            <div className="workflow-number">
              04
            </div>

            <div className="workflow-icon">
              ◎
            </div>

            <h3>
              Matching
            </h3>

            <p>
              Measures how well each opportunity fits you.
            </p>

          </div>


          <div className="workflow-connector">
            →
          </div>


          <div className="workflow-step">

            <div className="workflow-number">
              05
            </div>

            <div className="workflow-icon">
              ✦
            </div>

            <h3>
              Skill Gaps
            </h3>

            <p>
              Identifies the skills that matter most.
            </p>

          </div>


          <div className="workflow-connector">
            →
          </div>


          <div className="workflow-step">

            <div className="workflow-number">
              06
            </div>

            <div className="workflow-icon">
              ↗
            </div>

            <h3>
              Application Prep
            </h3>

            <p>
              Helps turn insights into action.
            </p>

          </div>

        </div>

      </section>


      {/* =========================
          BRAND FOOTER
      ========================== */}

      <section className="dashboard-brand-bar">

        <div className="brand-decoration">
          ✦
        </div>

        <div>

          <h2>
            JOBHUNTER <span>AI</span>
          </h2>

          <p>
            Discover. Match. Improve. Apply.
          </p>

        </div>

        <div className="brand-decoration">
          ✦
        </div>

      </section>

    </main>
  );
}

export default Dashboard;