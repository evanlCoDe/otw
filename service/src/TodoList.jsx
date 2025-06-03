
// TodoList.jsx
import { db } from "./firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function TodoList({ user }) {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "tasks"), (snapshot) => {
      setTasks(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  const addTask = async () => {
    if (text.trim()) {
      await addDoc(collection(db, "tasks"), {
        text,
        address: "",
        mapLink: "",
        description: "",
        images: [],
        votes: 0,
        creator: user
      });
      setText("");
    }
  };

  const removeTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
  };


  return (
    <div className="container mt-4">
      <h2 className="mb-4">Tasks</h2>
      <div className="input-group mb-3">
        <input
          className="form-control"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter new task"
        />
        <button className="btn btn-primary" onClick={addTask}>
          New task
        </button>
      </div>
      <ul className="list-group">
        {tasks.map((task) => (
          <li className="list-group-item d-flex justify-content-between align-items-center" key={task.id}>
            <span
              onClick={() => navigate(`/task/${task.id}`)}
              style={{ cursor: "pointer", textDecoration: "underline" }}
            >
              {task.text}
            </span>
            <button className="btn btn-danger btn-sm" onClick={() => removeTask(task.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;