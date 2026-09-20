import { useEffect, useState } from "react";
import "../../styles/profile.css";
import Editprofile from "./editprofile";
import { Navigate } from "react-router-dom";
import Login from "./login";
import type { Profile } from "../../types";
export type { Profile } from "../../types";
import { supabase } from "../../lib/supabase-client";

//credential type declaration
export type Credentials = {
  username: string;
  password: string;
};

//default
const emptyProfile: Profile<string> = {
  name: "",
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
  id: 0,
  initials: "",
  type: "Student",
  chapterShort: "",
  year: "",
  location: "",
  chapterVisibility: "everyone",
};

type MyprofileProps = {
  profileData: Profile[];
};

//conditional box component for different options
export default function Myprofile({ profileData }: MyprofileProps) {
  const [choice, setChoice] = useState<number>(0);
  // 0 = login|register page
  // 1 = register
  // 2 = login page
  // 3 = navigate to profile

  const [profile, setProfile] = useState<Profile<string>>(emptyProfile);
  const [hasProfile, setHasProfile] = useState(false);
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [choice]);

  //if profile is saved in browser, send them to their profile
  useEffect(() => {
    const savedProfile = localStorage.getItem("sasebook-profile");

    if (!savedProfile || profileData.length === 0) {
      return;
    }

    try {
      const parsed = JSON.parse(savedProfile) as Profile<string>;
      const localUsername = parsed.username?.trim().toLowerCase();
      const matchingProfile = profileData.find((candidate) => {
        return candidate.username?.trim().toLowerCase() === localUsername;
      });

      if (matchingProfile) {
        setProfile({
          ...parsed,
          id: matchingProfile.id,
          username: matchingProfile.username ?? parsed.username,
        });
        setHasProfile(true);
      }
    } catch {
      localStorage.removeItem("sasebook-profile");
    }
  }, [profileData]);

  const handleChange = (field: keyof Profile<string>, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogin = async (credentials: Credentials) => {
    const savedProfileRaw = localStorage.getItem("sasebook-profile");

    if (!savedProfileRaw) {
      return false;
    }

    try {
      const savedProfile = JSON.parse(savedProfileRaw) as Profile<string>;
      const normalizedUsername = credentials.username.trim().toLowerCase();
      const savedUsername = (savedProfile.username ?? "").trim().toLowerCase();
      const matchesSavedProfile =
        normalizedUsername === savedUsername &&
        credentials.password === savedProfile.password;

      const matchedProfile = profileData.find(
        (candidate) =>
          candidate.username?.trim().toLowerCase() === normalizedUsername
      );

      if (matchesSavedProfile && matchedProfile) {
        const matchedProfileData: Profile<string> = {
          ...savedProfile,
          ...matchedProfile,
          name: matchedProfile.name ?? savedProfile.name,
          firstName: matchedProfile.name?.split(" ")[0] ?? savedProfile.firstName,
          lastName: matchedProfile.name?.split(" ").slice(1).join(" ") ?? savedProfile.lastName,
          major: matchedProfile.major ?? savedProfile.major,
          interests: matchedProfile.interests ?? savedProfile.interests,
          username: matchedProfile.username ?? savedProfile.username,
          password: savedProfile.password,
          id: matchedProfile.id,
        };

        localStorage.setItem(
          "sasebook-profile",
          JSON.stringify(matchedProfileData)
        );
        setProfile(matchedProfileData);
        setHasProfile(true);
        setChoice(3);
        return true;
      }

      return false;
    } catch {
      return false;
    }
  };

  const handleSave = async (trimmedProfile: Profile<string>) => {
    setSaveError("");

    const existingProfile = profileData.find((candidate) => {
      if (trimmedProfile.id && candidate.id === trimmedProfile.id) {
        return true;
      }

      return candidate.username?.trim().toLowerCase() === trimmedProfile.username?.trim().toLowerCase();
    });

    const profileRow = {
      name: trimmedProfile.name ?? `${trimmedProfile.firstName ?? ""} ${trimmedProfile.lastName ?? ""}`.trim(),
      username: trimmedProfile.username ?? "",
      major: trimmedProfile.major,
      graduation_year: trimmedProfile.graduation_year ?? null,
      interests: trimmedProfile.interests,
      chapter_id: trimmedProfile.chapter_id ?? null,
    };

    const result = existingProfile
      ? await supabase.from("profiles").update(profileRow).eq("id", existingProfile.id).select().single()
      : await supabase.from("profiles").insert(profileRow).select().single();

    if (result.error) {
      setSaveError(result.error.message);
      return;
    }

    if (!result.data) {
      setSaveError("The profile was saved, but no profile record was returned.");
      return;
    }

    const savedProfile = {
      ...trimmedProfile,
      id: result.data.id,
      username: result.data.username,
    };
    localStorage.setItem("sasebook-profile", JSON.stringify(savedProfile));
    setProfile(savedProfile);
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
          {hasProfile && (
            <button
              className="profile-primary-button"
              style={{ width: "200px" }}
              onClick={() => setChoice(3)}
            >
              My Profile
            </button>
          )}
          <button
            className="profile-primary-button"
            style={{ width: "200px" }}
            onClick={() => setChoice(2)}
          >
            Login
          </button>
          <button
            className="profile-primary-button"
            style={{ width: "200px" }}
            onClick={() => setChoice(1)}
          >
            Create profile
          </button>
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
          onBack={() => {
            window.scrollTo(0, 0);
            setChoice(hasProfile ? 3 : 0);
          }}
        />
      );
    }

    if (choice === 2) {
      return (
        <Login
          onLogin={handleLogin}
          onBack={() => {
            window.scrollTo(0, 0);
            setChoice(0);
          }}
        />
      );
    }

    if (choice === 3) {
      return (
        <Navigate to={profile.id ? `/people/${profile.id}` : "/people"}/>
      );
    }

    return null;
  };

  return (
    <div className="profile-page">
      <div className="profile-card">{renderChoice()}</div>
      {saveError && <p className="profile-info-label">{saveError}</p>}
    </div>
  );
}
