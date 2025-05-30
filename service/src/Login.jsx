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
      alert("帳號或密碼錯誤");
    }
  };

  return (
    <div>
      <h2>登入</h2>
      <input
        placeholder="帳號"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="密碼"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>登入</button>
    </div>
  );
}

export default Login;