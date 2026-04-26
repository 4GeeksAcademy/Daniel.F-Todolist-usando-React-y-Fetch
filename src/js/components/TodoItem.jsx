import { useState } from "react";

export default function TodoItem({ task, deleteTask, updateTask }) {
  const [editValue, setEditValue] = useState(task.label);

  return (
<li className="todo-item">
  <input
    value={editValue}
    onChange={(e) => setEditValue(e.target.value)}
    onBlur={() => updateTask(task.id, editValue)}
  />

  <button
    className="delete-btn"
    onClick={() => deleteTask(task.id)}
  >
    ✕
  </button>
</li>
  );
}