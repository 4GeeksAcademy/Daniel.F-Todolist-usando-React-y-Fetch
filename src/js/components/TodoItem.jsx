import React, { useState } from "react";

const TodoItem = ({ task, removeTask, updateTask }) => {

    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(task.label);

    const handleKeyDown = async (e) => {

        if (e.key === "Enter") {

            if (editValue.trim() === "") return;

            await updateTask(task.id, editValue);

            setIsEditing(false);
        }

        if (e.key === "Escape") {
            setIsEditing(false);
            setEditValue(task.label);
        }
    };

    return (

        <li className="list-group-item d-flex justify-content-between align-items-center">

            {
                isEditing ? (

                    <input
                        type="text"
                        className="form-control"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoFocus
                    />

                ) : (

                    <span
                        style={{ cursor: "pointer" }}
                        onDoubleClick={() => setIsEditing(true)}
                    >
                        {task.label}
                    </span>

                )
            }

            <button
                className="btn btn-danger ms-2"
                onClick={() => removeTask(task.id)}
            >
                X
            </button>

        </li>
    );
};

export default TodoItem;