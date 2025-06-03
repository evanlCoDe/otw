// App.js
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import TodoList from "./TodoList";
import TaskDetail from "./TaskDetail";

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      {user ? (
        <Routes>
          <Route path="/" element={<TodoList user={user}/>} />
          <Route path="/task/:id" element={<TaskDetail user={user}/>} />
        </Routes>
      ) : (
        <Login onLogin={(username) => setUser(username)} />
      )}
    </Router>
  );
}

export default App;
