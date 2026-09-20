type Profile = {
  fullName: string;
  username: string;
  password: string;
  major: string;
  bio: string;
  interests: string;
};

type AprofileProps = {
  profile: Profile;
  hasProfile: boolean;
  onEdit: () => void;
  onChange: (field: keyof Profile, value: string) => void;
  onSave: () => void;
};

export default function Editprofile({
  profile,
  hasProfile,
  onEdit,
  onChange,
  onSave,
}: AprofileProps) {
  return (
    <>
      {hasProfile ? (
        <>
          <div className="profile-header-row">
            <div>
              <p className="profile-label">Profile</p>
              <h1 className="profile-name">{profile.fullName || "Your Name"}</h1>
            </div>
            <button className="profile-secondary-button" onClick={onEdit}>
              Edit Profile
            </button>
          </div>

          <div className="profile-info-grid">
            <div className="profile-info-box">
              <span className="profile-info-label">Username</span>
              <strong>@{profile.username || "yourusername"}</strong>
            </div>
            <div className="profile-info-box">
              <span className="profile-info-label">Major</span>
              <strong>{profile.major || "Not set"}</strong>
            </div>
          </div>

          <div className="profile-bio-box">
            <span className="profile-info-label">Bio</span>
            <p className="profile-bio-text">{profile.bio || "Add a short bio about yourself."}</p>
          </div>

          <div className="profile-bio-box">
            <span className="profile-info-label">Interests</span>
            <p className="profile-bio-text">{profile.interests || "Tell people what you care about."}</p>
          </div>
        </>
      ) : (
        <>
          <div className="profile-header-row">
            <div>
              <p className="profile-label">Welcome</p>
              <h1 className="profile-name">Create your profile</h1>
            </div>
          </div>

          <div className="profile-form-grid">
            <label className="profile-field">
              <span>Full Name</span>
              <input
                type="text"
                value={profile.fullName}
                onChange={(e) => onChange("fullName", e.target.value)}
                placeholder="Jsut a rice cooker"
                className="profile-input"
              />
            </label>

            <label className="profile-field">
              <span>Username</span>
              <input
                type="text"
                value={profile.username}
                onChange={(e) => onChange("username", e.target.value)}
                placeholder="ricecooker123"
                className="profile-input"
              />
            </label>

            <label className="profile-field">
              <span>Major</span>
              <input
                type="text"
                value={profile.major}
                onChange={(e) => onChange("major", e.target.value)}
                placeholder="Computer Science"
                className="profile-input"
              />
            </label>

            <label className="profile-field">
              <span>Interests</span>
              <input
                type="text"
                value={profile.interests}
                onChange={(e) => onChange("interests", e.target.value)}
                placeholder="Rice, Cooking, Computers"
                className="profile-input"
              />
            </label>

            <label className="profile-field profile-field-full">
              <span>Bio</span>
              <textarea
                value={profile.bio}
                onChange={(e) => onChange("bio", e.target.value)}
                placeholder="Write a short introduction about yourself..."
                className="profile-input profile-textarea"
              />
            </label>
          </div>

          <button className="profile-primary-button" onClick={onSave}>
            Save profile
          </button>
        </>
      )}
    </>
  );
}

