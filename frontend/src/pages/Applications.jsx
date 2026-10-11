function Applications() {
  const applications = [];

  const counts = {
    total: applications.length,
    applied: applications.filter((a) => a.status === "Applied").length,
    interview: applications.filter((a) => a.status === "Interview").length,
    saved: applications.filter((a) => a.status === "Saved").length,
  };

  return (
    <main className="applications-page">

      <div className="page-title">
        <p className="eyebrow">APPLICATION MANAGEMENT</p>

        <h1>Application Tracker</h1>

        <p>
          Keep track of every opportunity in your job search.
        </p>
      </div>


      {/* STATS */}

      <section className="application-stats">

        <div>
          <span>TOTAL</span>
          <strong>{counts.total}</strong>
        </div>

        <div>
          <span>APPLIED</span>
          <strong>{counts.applied}</strong>
        </div>

        <div>
          <span>INTERVIEWS</span>
          <strong>{counts.interview}</strong>
        </div>

        <div>
          <span>SAVED</span>
          <strong>{counts.saved}</strong>
        </div>

      </section>


      {/* APPLICATIONS */}

      <section className="application-section">

        <div className="section-heading">

          <div>
            <p className="section-eyebrow">
              YOUR PIPELINE
            </p>

            <h2>Applications</h2>
          </div>

          <button className="add-application-button">
            + Add application
          </button>

        </div>


        {applications.length === 0 ? (

          <div className="empty-applications">

            <div className="empty-icon">
              ▣
            </div>

            <h3>No applications yet</h3>

            <p>
              Applications you choose to track will appear here.
            </p>

            <button className="add-application-button">
              + Add your first application
            </button>

          </div>

        ) : (

          <div className="application-list">

            {applications.map((application) => (

              <div
                className="application-card"
                key={application.id}
              >

                <div className="application-main">

                  <p className="job-company">
                    {application.company}
                  </p>

                  <h3>
                    {application.role}
                  </h3>

                  <span className="application-date">
                    Applied {application.date}
                  </span>

                </div>


                <div className="application-match">

                  <strong>
                    {application.match}%
                  </strong>

                  <span>MATCH</span>

                </div>


                <div
                  className={`application-status ${application.status
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  {application.status}
                </div>


                <button className="application-action">
                  View →
                </button>

              </div>

            ))}

          </div>

        )}

      </section>

    </main>
  );
}

export default Applications;