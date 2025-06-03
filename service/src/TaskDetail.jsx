// TaskDetail.jsx
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "./firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

function TaskDetail({ user }) {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const load = async () => {
      const docRef = doc(db, "tasks", id);
      const snap = await getDoc(docRef);
      setTask({ id: snap.id, ...snap.data() });
    };
    load();
  }, [id]);

  const handleChange = (field, value) => {
    setTask((prev) => ({ ...prev, [field]: value }));
  };

  const save = async () => {
    const { id, ...data } = task;
    await updateDoc(doc(db, "tasks", id), data);
    alert("Saved successfully");
  };

  const vote = async () => {
    const updated = { ...task, votes: task.votes + 1 };
    setTask(updated);
    await updateDoc(doc(db, "tasks", id), { votes: updated.votes });
  };

  if (!task) return <p>Loading...</p>;

  const editable = task.creator === user;
  
return (
  <div className="container py-4">
    <div className="card shadow p-4 mx-auto" style={{ maxWidth: 600 }}>
      <h2 className="mb-3 text-center">Task details</h2>
      <p><strong>Creator：</strong>{task.creator}</p>
      <button className="btn btn-outline-primary mb-3" onClick={vote}>
        👍 Vote <span className="badge bg-primary ms-2">{task.votes}</span>
      </button>

      {editable ? (
          <>
    {/* ...other input fields... */}
    <div className="mb-3">
      <label className="form-label">Image links</label>
      {task.images.map((url, idx) => (
        <div className="input-group mb-2" key={idx}>
          <input
            type="text"
            className="form-control"
            value={url}
            onChange={e => {
              const newImages = [...task.images];
              newImages[idx] = e.target.value;
              handleChange("images", newImages);
            }}
            placeholder={`Image link #${idx + 1}`}
          />
          <button
            className="btn btn-outline-danger"
            type="button"
            onClick={() => {
              const newImages = task.images.filter((_, i) => i !== idx);
              handleChange("images", newImages);
            }}
            tabIndex={-1}
          >
            <i className="bi bi-trash"></i> Delete
          </button>
        </div>
      ))}
      <button
        className="btn btn-outline-primary w-100"
        type="button"
        onClick={() => handleChange("images", [...task.images, ""])}
      >
        <i className="bi bi-plus"></i> Add Link
      </button>
    </div>
    {/* ...rest of editable fields... */}
    <button className="btn btn-success w-100" onClick={save}>Save</button>
  </>
) : (
        <>
          <p><strong>Task name：</strong>{task.text}</p>
          <p><strong>Address：</strong>{task.address}</p>
          <p>
            <strong>Map：</strong>
            {task.mapLink && (
              task.mapLink.includes("<iframe")
                ? <div className="my-2" dangerouslySetInnerHTML={{ __html: task.mapLink }} />
                : <div className="my-2">
                    <iframe
                      src={task.mapLink}
                      width="100%"
                      height="300"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Google Map"
                    ></iframe>
                    <a href={task.mapLink} target="_blank" rel="noopener noreferrer">View Map</a>
                  </div>
            )}
          </p>
          <p><strong>Description：</strong>{task.description}</p>
        </>
      )}

      <div className="mt-4">
        <strong>Picture preview：</strong>
        <div className="d-flex gap-2 flex-wrap mt-2">
          {task.images.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`img-${index}`}
              className="rounded border"
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);
}

export default TaskDetail;