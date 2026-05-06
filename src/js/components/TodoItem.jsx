import { useState } from "react";

export default function TodoItem({ task, deleteTask, updateTask }) {
  const [editValue, setEditValue] = useState(task.label);

  return (
<li className="todo-item">
<input
	type="text"
	defaultValue={task.label}
	onKeyDown={(e) => handleKeyDown(e, task.id)}
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