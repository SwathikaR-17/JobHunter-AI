import { useState } from "react";

function Resume({ profile, setProfile }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const uploadResume = async () => {
    if (!file) {
      setMessage("Please select a PDF first.");
      return;
    }

    setUploading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/profile/resume",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Upload failed");
      }

      // Update the main profile in App.jsx
      setProfile(data.profile);

      setMessage(
        "Resume analyzed and your career profile has been updated! ✓"
      );
    } catch (error) {
      console.error("Resume upload failed:", error);
      setMessage(error.message);
    } finally {
      setUploading(false);
    }
  };

  const skills = profile?.skills || [];
  const projects = profile?.projects || [];
  const education = profile?.education || [];
  const certifications = profile?.certifications || [];
  const experience = profile?.experience || [];
  const preferredRoles = profile?.preferred_roles || [];
  const preferredLocations = profile?.preferred_locations || [];

  return (
    <main className="resume-page">

      {/* HEADER */}

      <div className="page-title">
        <p className="eyebrow">RESUME INTELLIGENCE</p>

        <h1>
          Understand your career profile
        </h1>

        <p>
          JobHunter AI analyzes your resume and turns it into
          structured career intelligence for your AI agents.
        </p>
      </div>


      {/* UPLOAD */}

      <section className="resume-upload-card">

        <div className="resume-icon">
          ▤
        </div>

        <h2>
          {file ? "Resume selected" : "Upload your resume"}
        </h2>

        <p>
          Upload a PDF to update the profile your AI agents
          use for job matching and skill analysis.
        </p>

        <label className="resume-upload-button">

          {file ? file.name : "Choose PDF"}

          <input
            type="file"
            accept=".pdf"
            hidden
            onChange={(e) => {
              setFile(e.target.files[0]);
              setMessage("");
            }}
          />

        </label>

        {file && (
          <button
            className="resume-analyze-button"
            onClick={uploadResume}
            disabled={uploading}
          >
            {uploading
              ? "Analyzing resume..."
              : "✦ Analyze Resume"}
          </button>
        )}

        {message && (
          <p className="resume-message">
            {message}
          </p>
        )}

      </section>


      {/* PROFILE INTELLIGENCE */}

      {profile && (
        <>

          {/* PROFILE OVERVIEW */}

          <section className="resume-result-card">

            <div className="resume-result-header">

              <div>
                <p className="eyebrow">
                  PROFILE INTELLIGENCE
                </p>

                <h2>
                  Here's what JobHunter AI understands about you
                </h2>
              </div>

              <span className="resume-success-badge">
                ✓ Profile ready
              </span>

            </div>


            <div className="resume-result-grid">

              <div className="resume-result-item">
                <span>NAME</span>
                <strong>
                  {profile.name || "Not detected"}
                </strong>
              </div>

              <div className="resume-result-item">
                <span>EXPERIENCE LEVEL</span>
                <strong>
                  {profile.experience_level || "Not detected"}
                </strong>
              </div>

              <div className="resume-result-item">
                <span>SKILLS</span>
                <strong>
                  {skills.length}
                </strong>
              </div>

              <div className="resume-result-item">
                <span>PROJECTS</span>
                <strong>
                  {projects.length}
                </strong>
              </div>

            </div>

          </section>


          {/* SKILL INTELLIGENCE */}

          <section className="resume-result-card">

            <div className="section-heading">

              <p className="eyebrow">
                SKILL INTELLIGENCE
              </p>

              <h2>
                Your current technical toolkit
              </h2>

              <p>
                These are the skills JobHunter AI extracted from
                your resume and will use when matching jobs.
              </p>

            </div>

            <div className="resume-result-tags">

              {skills.length > 0 ? (
                skills.map((skill, index) => (
                  <span key={index}>
                    {skill}
                  </span>
                ))
              ) : (
                <p>No skills detected.</p>
              )}

            </div>

          </section>


          {/* CAREER DIRECTION */}

          <section className="resume-result-card">

            <div className="section-heading">

              <p className="eyebrow">
                CAREER DIRECTION
              </p>

              <h2>
                Where your profile is heading
              </h2>

              <p>
                These preferences help the Job Discovery and
                Matching agents understand what opportunities
                are relevant to you.
              </p>

            </div>


            <div className="analysis-skills-grid">

              <div className="analysis-section-card">

                <span className="analysis-label">
                  TARGET ROLES
                </span>

                <div className="job-skills">

                  {preferredRoles.length > 0 ? (
                    preferredRoles.map((role, index) => (
                      <span
                        className="skill-tag matched"
                        key={index}
                      >
                        {role}
                      </span>
                    ))
                  ) : (
                    <p>
                      No preferred roles detected yet.
                    </p>
                  )}

                </div>

              </div>


              <div className="analysis-section-card">

                <span className="analysis-label">
                  PREFERRED LOCATIONS
                </span>

                <div className="job-skills">

                  {preferredLocations.length > 0 ? (
                    preferredLocations.map(
                      (location, index) => (
                        <span
                          className="skill-tag matched"
                          key={index}
                        >
                          {location}
                        </span>
                      )
                    )
                  ) : (
                    <p>
                      No preferred locations detected yet.
                    </p>
                  )}

                </div>

              </div>

            </div>

          </section>


          {/* PROJECT INTELLIGENCE */}

          <section className="resume-result-card">

            <div className="section-heading">

              <p className="eyebrow">
                PROJECT INTELLIGENCE
              </p>

              <h2>
                What you've actually built
              </h2>

              <p>
                Projects provide important evidence of your
                practical skills and will contribute to job
                matching.
              </p>

            </div>


            <div className="resume-result-list">

              {projects.length > 0 ? (
                projects.map((project, index) => (
                  <div key={index}>
                    {project}
                  </div>
                ))
              ) : (
                <p>
                  No projects detected.
                </p>
              )}

            </div>

          </section>


          {/* EDUCATION + EXPERIENCE */}

          <section className="analysis-skills-grid">

            <div className="analysis-section-card">

              <span className="analysis-label">
                EDUCATION
              </span>

              <div className="resume-result-list">

                {education.length > 0 ? (
                  education.map((item, index) => (
                    <div key={index}>
                      {item}
                    </div>
                  ))
                ) : (
                  <p>
                    No education details detected.
                  </p>
                )}

              </div>

            </div>


            <div className="analysis-section-card">

              <span className="analysis-label">
                EXPERIENCE
              </span>

              <div className="resume-result-list">

                {experience.length > 0 ? (
                  experience.map((item, index) => (
                    <div key={index}>
                      {item}
                    </div>
                  ))
                ) : (
                  <p>
                    No experience details detected.
                  </p>
                )}

              </div>

            </div>

          </section>


          {/* CERTIFICATIONS */}

          <section className="resume-result-card">

            <div className="section-heading">

              <p className="eyebrow">
                CREDENTIALS
              </p>

              <h2>
                Certifications
              </h2>

            </div>

            <div className="resume-result-tags">

              {certifications.length > 0 ? (
                certifications.map(
                  (certification, index) => (
                    <span key={index}>
                      {certification}
                    </span>
                  )
                )
              ) : (
                <p>
                  No certifications detected.
                </p>
              )}

            </div>

          </section>


          {/* AGENT CONNECTION */}

          <section className="ai-analysis-card">

            <div className="ai-analysis-icon">
              ✦
            </div>

            <div>

              <span className="analysis-label">
                AI AGENT CONNECTION
              </span>

              <h2>
                Your profile is now the brain of JobHunter AI
              </h2>

              <p>
                This profile will be used by the Job Discovery,
                Job Intelligence, Matching and Skill Gap agents
                to understand which opportunities fit you and
                where you need to improve.
              </p>

            </div>

          </section>

        </>
      )}

    </main>
  );
}

export default Resume;