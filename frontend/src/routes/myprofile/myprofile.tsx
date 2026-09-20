import { useEffect, useState } from "react";
import "../../styles/myprofile.css";
import Aprofile from "./aprofile";

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
  const [profile, setProfile] = useState<Profile>(emptyProfile);
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    const savedProfile = localStorage.getItem("sasebook-profile");

    if (savedProfile) {
      const parsed = JSON.parse(savedProfile) as Profile;
      setProfile(parsed);
      setHasProfile(true);
    }
  }, []);

  const handleChange = (field: keyof Profile, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

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
  };

  const handleEdit = () => {
    setHasProfile(false);
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <Aprofile
          profile={profile}
          hasProfile={hasProfile}
          onEdit={handleEdit}
          onChange={handleChange}
          onSave={handleSave}
        />
      </div>
    </div>
  );
}

