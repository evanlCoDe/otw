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
    alert("儲存成功");
  };

  const vote = async () => {
    const updated = { ...task, votes: task.votes + 1 };
    setTask(updated);
    await updateDoc(doc(db, "tasks", id), { votes: updated.votes });
  };

  if (!task) return <p>載入中...</p>;

  const editable = task.creator === user;

  return (
    <div>
      <h2>任務詳情</h2>
      <p><strong>建立者：</strong>{task.creator}</p>
      <button onClick={vote}>👍 投票 ({task.votes})</button>

      {editable ? (
        <>
          <input value={task.text} onChange={(e) => handleChange("text", e.target.value)} placeholder="標題" />
          <input value={task.address} onChange={(e) => handleChange("address", e.target.value)} placeholder="地址" />
          <input value={task.mapLink} onChange={(e) => handleChange("mapLink", e.target.value)} placeholder="Google 地圖連結" />
          <textarea value={task.description} onChange={(e) => handleChange("description", e.target.value)} placeholder="描述" />
          <textarea value={task.images.join("\n")} onChange={(e) => handleChange("images", e.target.value.split("\n"))} placeholder="圖片連結，每行一個" />
          <button onClick={save}>儲存</button>
        </>
      ) : (
        <>
          <p><strong>標題：</strong>{task.text}</p>
          <p><strong>地址：</strong>{task.address}</p>
          <p><strong>地圖：</strong><a href={task.mapLink} target="_blank" rel="noreferrer">查看地圖</a></p>
          <p><strong>描述：</strong>{task.description}</p>
        </>
      )}

      <div>
        <strong>圖片預覽：</strong>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {task.images.map((url, index) => (
            <img key={index} src={url} alt={`img-${index}`} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TaskDetail;