import { useState } from "react";
import "../../styles/profile.css";
import Editprofile from "./editprofile";
import { Navigate } from "react-router-dom";
import Login from "./login";
import type { DatabaseProfile, Profile } from "../../types";
export type { Profile } from "../../types";

//credential type declaration
export type Credentials = {
  username: string;
  password: string;
};

//default
const emptyProfile: Profile<string> = {
  fullName: "",
  firstName: "",
  lastName: "",
  username: "",
  password: "",
  major: "",
  bio: "",
  affiliation: "",
  interests: "",
  position: "",
  saseChapter: "",
  skills: [],
};

type EditableProfile = Profile<string> & Required<Pick<Profile<string>,
  "fullName" | "firstName" | "lastName" | "username" | "password" |
  "affiliation" | "position" | "saseChapter"
>>;

type MyprofileProps = {
  profileData: DatabaseProfile[];
};

//conditional box component for different options
export default function Myprofile({ profileData }: MyprofileProps) {
  const [choice, setChoice] = useState<number>(0);
  // 0 = login|register page
  // 1 = register
  // 2 = login page
  // 3 = navigate to profile

  const [profile, setProfile] = useState<EditableProfile>(() => {
    const databaseProfile = profileData[0];

    return {
      ...emptyProfile,
      ...(databaseProfile
        ? {
            fullName: databaseProfile.name,
            firstName: databaseProfile.name.split(" ")[0] ?? "",
            lastName: databaseProfile.name.split(" ").slice(1).join(" "),
            major: databaseProfile.major ?? "",
            interests: databaseProfile.interests ?? "",
          }
        : {}),
    } as EditableProfile;
  });
  const [hasProfile, setHasProfile] = useState(false);

  //if profile is save3d in browser, send them to their profile
  /*useEffect(() => {
    const savedProfile = localStorage.getItem("sasebook-profile");

    if (savedProfile) {
      const parsed = JSON.parse(savedProfile) as Profile;
      setProfile(parsed);
      setHasProfile(true);
      setChoice(3);
    }
  }, []);*/

  const handleChange = (field: keyof EditableProfile, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogin = (credentials: Credentials) => {
    const savedProfileRaw = localStorage.getItem("sasebook-profile");

    if (!savedProfileRaw) {
      return false;
    }

    try {
      const savedProfile = JSON.parse(savedProfileRaw) as EditableProfile;
      const normalizedUsername = credentials.username.trim().toLowerCase();
      const savedUsername = (savedProfile.username ?? "").trim().toLowerCase();
      const matchesSavedProfile =
        normalizedUsername === savedUsername &&
        credentials.password === savedProfile.password;

      // WIP: placeholder database verification
      const matchesDatabase =
        matchesSavedProfile &&
        (savedUsername === "ricecooker123" || savedUsername === "saseleader");

      if (matchesDatabase) {
        setProfile(savedProfile);
        setHasProfile(true);
        setChoice(3);
        return true;
      }

      return false;
    } catch {
      return false;
    }
  };

  const isProfileComplete = (currentProfile: EditableProfile) => {
    const requiredFields = [
      currentProfile.firstName.trim(),
      currentProfile.lastName.trim(),
      currentProfile.username.trim(),
      currentProfile.password.trim(),
      currentProfile.major.trim(),
      currentProfile.bio.trim(),
      currentProfile.affiliation.trim(),
      currentProfile.interests.trim(),
    ];

    if (!requiredFields.every(Boolean)) {
      return false;
    }

    if (currentProfile.affiliation === "Officer") {
      return Boolean(currentProfile.position.trim() && currentProfile.saseChapter.trim());
    }

    if (currentProfile.affiliation === "Student" || currentProfile.affiliation === "Chapter") {
      return Boolean(currentProfile.saseChapter.trim());
    }

    return true;
  };

  //save, WIP
  const handleSave = () => {
    if (!isProfileComplete(profile)) {
      return;
    }

    const trimmedProfile = {
      ...profile,
      fullName: `${profile.firstName} ${profile.lastName}`.trim(),
      firstName: profile.firstName.trim(),
      lastName: profile.lastName.trim(),
      username: profile.username.trim(),
      password: profile.password.trim(),
      major: profile.major.trim(),
      bio: profile.bio.trim(),
      affiliation: profile.affiliation.trim(),
      interests: profile.interests.trim(),
      position: profile.position.trim(),
      saseChapter: profile.saseChapter.trim(),
    };

    localStorage.setItem("sasebook-profile", JSON.stringify(trimmedProfile));
    setProfile(trimmedProfile);
    setHasProfile(true);
    setChoice(3);
  };

  //function called when finished with editing
  const handleEdit = () => {
    setHasProfile(false);
    setChoice(1);
  };

  //render based on the choice
  const renderChoice = () => {
    if (choice === 0) {
      return (
        <div className="auth-choice">
          <div className="profile-header-row">
            <div>
              <p className="profile-label">Welcome</p>
              <h1 className="profile-name">Login/Register</h1>
            </div>
          </div>
          <button className="profile-primary-button" onClick={() => setChoice(2)}>Login</button>
          <button className="profile-primary-button" onClick={() => setChoice(1)}>Create profile</button>
        </div>
      );
    }

    if (choice === 1) {
      return (
        <Editprofile
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
        <Login onLogin={handleLogin} />
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
