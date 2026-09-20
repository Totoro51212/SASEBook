import { useState } from "react";

type Credentials = {
  username: string;
  password: string;
};

type LoginProps = {
  onLogin: (credentials: Credentials) => boolean;
  onBack?: () => void;
};

export default function Login({ onLogin, onBack }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    const credentials = { username, password };
    const isValid = onLogin(credentials);
    setMessage(isValid ? "Login successful (WIP)" : "Incorrect username or password.");
  };

  return (
    <>
      {onBack && (
        <button
          type="button"
          className="profile-back-button"
          onClick={onBack}
        >
          ← Back
        </button>
      )}

      <div className="profile-header-row">
        <div>
          <p className="profile-label">Welcome</p>
          <h1 className="profile-name">Login to your profile</h1>
        </div>
      </div>

      <div className="profile-form-grid">
        <label className="profile-field profile-field-full">
          <span>Username</span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="ricecooker123"
            className="profile-input"
          />
        </label>

        <label className="profile-field profile-field-full">
          <span>Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="profile-input"
          />
        </label>
      </div>

      <div className="profile-button-row">
        <button
          type="button"
          className="profile-primary-button"
          style={{ width: "200px" }}
          onClick={handleSubmit}
        >
          Login
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

      {message && (
        <p className="profile-info-label" style={{ marginTop: "1rem" }}>
          {message}
        </p>
      )}
    </>
  );
}