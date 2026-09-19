import { useEffect, useState } from "react";
import "../../styles/profile.css";
import Aprofile from "./aprofile";
import { Navigate } from "react-router-dom";

type Profile = {
  fullName: string;
  username: string;
  password: string;
  major: string;
  bio: string;
  interests: string;
};

const emptyProfile: Profile = {
  fullName: "",
  username: "",
  password: "",
  major: "",
  bio: "",
  interests: "",
};

export default function Myprofile() {
  const [choice, setChoice] = useState<number>(0);
  // 0 = login|register page
  // 1 = register
  // 2 = login page
  // 3 = navigate to profile

  const [profile, setProfile] = useState<Profile>(emptyProfile);
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    const savedProfile = localStorage.getItem("sasebook-profile");

    if (savedProfile) {
      const parsed = JSON.parse(savedProfile) as Profile;
      setProfile(parsed);
      setHasProfile(true);
      setChoice(3);
    }
  }, []);

  const handleChange = (field: keyof Profile, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  //save, WIP
  const handleSave = () => {
    const trimmedProfile = {
      ...profile,
      fullName: profile.fullName.trim(),
      username: profile.username.trim(),
      password: profile.password.trim(),
      major: profile.major.trim(),
      bio: profile.bio.trim(),
      interests: profile.interests.trim(),
    };

    localStorage.setItem("sasebook-profile", JSON.stringify(trimmedProfile));
    setProfile(trimmedProfile);
    setHasProfile(true);
    setChoice(3);
  };

  //function called when finished with editg
  const handleEdit = () => {
    setHasProfile(false);
    setChoice(1);
  };

  //render based on the choice
  const renderChoice = () => {
    if (choice === 0) {
      return (
        <div className="auth-choice">
          <h2>Welcome</h2>
          <button className="profile-primary-button" onClick={() => setChoice(1)}>Create profile</button>
          <button className="profile-primary-button" onClick={() => setChoice(2)}>Login</button>
        </div>
      );
    }

    if (choice === 1) {
      return (
        <Aprofile
          profile={profile}
          hasProfile={hasProfile}
          onEdit={handleEdit}
          onChange={handleChange}
          onSave={handleSave}
        />
      );
    }

    if (choice === 2) {
      return (
        <div className="auth-choice">
          <h2>Login</h2>
          <p>Login page coming soon.</p>
          <button onClick={() => setChoice(0)}>Back</button>
        </div>
      );
    }

    if (choice === 3) {
      return (
        <Navigate to="/people"/>
      );
    }

    return null;
  };

  return (
    <div className="profile-page">
      <div className="profile-card">{renderChoice()}</div>
    </div>
  );
}

