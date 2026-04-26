import { useState } from "react";


export default function TodoForm({ createTask, creating }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    createTask(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="New task..."
      />

      <button type="submit">
        {creating ? "creating..." : "Add"}
      </button>
    </form>
  );
}