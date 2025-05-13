// Login.js
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
      where("password", "==", password) // 實務應加密
    );
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      onLogin(username); // 登入成功
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
