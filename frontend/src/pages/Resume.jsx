import { useState } from "react";

function Resume() {
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

      setMessage("Resume uploaded and analyzed successfully! ✓");
    } catch (error) {
      console.error("Resume upload failed:", error);
      setMessage(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <main className="resume-page">

      <div className="page-title">
        <p className="eyebrow">CAREER PROFILE</p>

        <h1>Your Resume</h1>

        <p>
          Upload your resume and let your AI agents understand your profile.
        </p>
      </div>

      <section className="resume-upload-card">

        <div className="resume-icon">
          ▤
        </div>

        <h2>Upload your resume</h2>

        <p>
          Upload a PDF and our AI will extract your skills,
          projects, education and experience.
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

      <section className="resume-features">

        <div className="resume-feature-card">
          <span>01</span>
          <h3>Profile extraction</h3>
          <p>
            Extract skills, education, projects and experience.
          </p>
        </div>

        <div className="resume-feature-card">
          <span>02</span>
          <h3>AI matching</h3>
          <p>
            Use your profile to find relevant opportunities.
          </p>
        </div>

        <div className="resume-feature-card">
          <span>03</span>
          <h3>Skill intelligence</h3>
          <p>
            Identify skills that could improve your career options.
          </p>
        </div>

      </section>

    </main>
  );
}

export default Resume;