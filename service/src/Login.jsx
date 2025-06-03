// Login.jsx
import { useState } from "react";
import { db } from "./firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const q = query(
      collection(db, "users"),
      where("username", "==", username),
      where("password", "==", password)
    );
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      onLogin(username);
    } else {
      alert("Incorrect account id or password");
    }
  };

  return (
  <div
    className="container-fluid min-vh-100 d-flex justify-content-center align-items-center"
    style={{ background: "#f8f9fa" }}
  >
    <div className="card p-4 shadow" style={{ minWidth: "350px" }}>
      <h2 className="mb-4 text-center">Login</h2>
      <div className="mb-3">
        <input
          className="form-control"
          placeholder="Account ID"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="btn btn-primary w-100" onClick={handleLogin}>
        Login
      </button>
    </div>
  </div>
);
}

export default Login;