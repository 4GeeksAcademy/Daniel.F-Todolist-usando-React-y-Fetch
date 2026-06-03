import React from "react";

const TodoItem = ({ task, deleteTask, updateTask }) => {

    return (

        <li className="list-group-item d-flex justify-content-between align-items-center">

            <div>

                <input
                    type="checkbox"
                    checked={task.is_done}
                    onChange={() => updateTask(task)}
                    className="me-2"
                />

                <span
                    style={{
                        textDecoration: task.is_done ? "line-through" : "none"
                    }}
                >
                    {task.label}
                </span>

            </div>

            <button
                className="btn btn-danger"
                onClick={() => deleteTask(task.id)}
            >
                X
            </button>

        </li>
    );
};

export default TodoItem;