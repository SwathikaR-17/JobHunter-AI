function Profile({ profile }) {
  return (
    <main className="profile-page">

      <div className="page-title">
        <p className="eyebrow">YOUR CAREER PROFILE</p>

        <h1>My Profile</h1>

        <p>
          Your profile information used by the JobHunter AI agents.
        </p>
      </div>

      <section className="profile-header-card">

        <div className="profile-avatar">
          {profile?.name
            ?.split(" ")
            .map((word) => word[0])
            .join("")
            .slice(0, 2)}
        </div>

        <div>
          <h2>{profile?.name}</h2>
          <p>{profile?.email}</p>
          <span>
            {profile?.experience_level || "Fresher"}
          </span>
        </div>

      </section>


      <section className="profile-grid">

        <div className="profile-card">
          <span>SKILLS</span>

          <div className="profile-tags">
            {(profile?.skills || []).map((skill, index) => (
              <span key={index}>
                {skill}
              </span>
            ))}
          </div>
        </div>


        <div className="profile-card">
          <span>PREFERRED ROLES</span>

          <div className="profile-tags">
            {(profile?.preferred_roles || []).map(
              (role, index) => (
                <span key={index}>
                  {role}
                </span>
              )
            )}
          </div>
        </div>


        <div className="profile-card">
          <span>EDUCATION</span>

          {(profile?.education || []).map(
            (education, index) => (
              <p key={index}>
                {education}
              </p>
            )
          )}
        </div>


        <div className="profile-card">
          <span>CERTIFICATIONS</span>

          {(profile?.certifications || []).map(
            (certification, index) => (
              <p key={index}>
                {certification}
              </p>
            )
          )}
        </div>


        <div className="profile-card full-width">
          <span>PROJECTS</span>

          {(profile?.projects || []).map(
            (project, index) => (
              <p key={index}>
                {project}
              </p>
            )
          )}
        </div>


        <div className="profile-card full-width">
          <span>EXPERIENCE</span>

          {(profile?.experience || []).map(
            (experience, index) => (
              <p key={index}>
                {experience}
              </p>
            )
          )}
        </div>

      </section>

    </main>
  );
}

export default Profile;