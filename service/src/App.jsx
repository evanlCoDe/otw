// App.js
import { useState } from "react";
import Login from "./Login";
import TodoList from "./TodoList";

function App() {
  const [user, setUser] = useState(null);

  return user ? (
    <TodoList />
  ) : (
    <Login onLogin={(username) => setUser(username)} />
  );
}

export default App;
