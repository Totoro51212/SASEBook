import { useState, type ChangeEvent } from "react";


type Profile = {
  fullName: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  major: string;
  bio: string;
  affiliation: string;
  interests: string;
  position: string;
  saseChapter: string;
};

type AprofileProps = {
  profile: Profile;
  hasProfile: boolean;
  onEdit: () => void;
  onChange: (field: keyof Profile, value: string) => void;
  onSave: () => void;
  onBack?: () => void;
};

export default function Editprofile({
  profile,
  onChange,
  onSave,
  onBack,
}: AprofileProps) 

{
  const [showInvalidState, setShowInvalidState] = useState(false);

  const isProfileComplete = () => {
    const requiredFields = [
      profile.firstName.trim(),
      profile.lastName.trim(),
      profile.username.trim(),
      profile.password.trim(),
      profile.major.trim(),
      profile.bio.trim(),
      profile.affiliation.trim(),
      profile.interests.trim(),
    ];

    if (!requiredFields.every(Boolean)) {
      return false;
    }

    if (profile.affiliation === "Officer") {
      return Boolean(profile.position.trim() && profile.saseChapter.trim());
    }

    if (profile.affiliation === "Student" || profile.affiliation === "Chapter") {
      return Boolean(profile.saseChapter.trim());
    }

    return true;
  };

  const handleSaveClick = () => {
    if (!isProfileComplete()) {
      setShowInvalidState(true);
      window.setTimeout(() => setShowInvalidState(false), 420);
      return;
    }

    onSave();
  };

  return (
    <>
      <div className="profile-header-row">
        <div>
          <p className="profile-label">Welcome</p>
          <h1 className="profile-name">Customize your profile</h1>
        </div>
        <PfpButton />
      </div>
          
          <div className="profile-form-grid">
            <label className="profile-field">
              <span>First Name</span>
              <input
                type="text"
                value={profile.firstName}
                onChange={(e) => onChange("firstName", e.target.value)}
                placeholder="Rice"
                className="profile-input"
              />
            </label>

            <label className="profile-field">
              <span>Last Name</span>
              <input
                type="text"
                value={profile.lastName}
                onChange={(e) => onChange("lastName", e.target.value)}
                placeholder="Cooker"
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
              <span>Password</span>
              <input
                type="text"
                value={profile.password}
                onChange={(e) => onChange("password", e.target.value)}
                placeholder="Enter a password"
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

          <div className="profile-checkbox-group">
            <span className="profile-checkbox-label">I am a ...</span>
            <div className="profile-checkbox-row" aria-label="Profile type">
              {[
                "Student",
                "Officer",
                "Chapter",
                "Sponsor/Recruiter",
                "Miscellaneous"
              ].map((tag) => (
                <label key={tag} className="profile-checkbox-item">
                  <input
                    type="radio"
                    name="profile-type"
                    value={tag}
                    checked={profile.affiliation === tag}
                    onChange={(event) => onChange("affiliation", event.target.value)}
                  />
                  <span>{tag}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="profile-form-grid">

            <label className="profile-field profile-field-full">
                <span>SASE Chapter</span>
                <input
                  type="text"
                  value={profile.saseChapter}
                  onChange={(e) => onChange("saseChapter", e.target.value)}
                  placeholder="University"
                  className="profile-input"
                />
              </label>

          {profile.affiliation === "Officer" && (
            <>
              <label className="profile-field profile-field-full">
                <span>Position</span>
                <input
                  type="text"
                  value={profile.position}
                  onChange={(e) => onChange("position", e.target.value)}
                  placeholder="Position"
                  className="profile-input"
                />
              </label>
              </>
          )}

          </div>


          <div className="profile-button-row">
            <button
              type="button"
              className={`profile-primary-button ${showInvalidState ? "profile-primary-button-invalid" : ""}`}
              style={{ width: "200px" }}
              onClick={handleSaveClick}
            >
              Save profile
            </button>
            {onBack && (
              <button
                type="button"
                className="profile-secondary-button"
                style={{ width: "200px" }}
                onClick={onBack}
              >
                Back
              </button>
            )}
          </div>
    </>
  );
}



export function PfpButton() {
  const [file, setFile] = useState<string | null>(null);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
        console.log(e.target.files);
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(URL.createObjectURL(selectedFile));
    }
    }

    return (
        <label className="pfp-circle">
          {file ? (
              <img src={file} alt="Uploaded preview" />
          ) : (
              <span>+</span>
          )}
          <input type="file" onChange={handleChange} />
        </label>
    );
}