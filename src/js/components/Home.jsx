import React from "react";
import { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";

export default function Home() {  // Ya aquí estoy haciendo la exportación del Home.
	const [tasks, setTasks] = useState([]);
	const [loading, setLoading] = useState(true);
	const [creating, setCreating] = useState(false);

	const username = "DannyCanario";

	//create your first component
	// GET tareas
	const getTasks = async () => {
		setLoading(true);
		try {
			const res = await fetch(`https://playground.4geeks.com/todo/users/${username}`);
			const data = await res.json();
			setTasks(data.todos || []);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	// Crear usuario
	const createUser = async () => {
		try {
			await fetch(`https://playground.4geeks.com/todo/users/${username}`, {
				method: "POST"
			});
		} catch (error) {
			console.log(error);
		}
	};

	// POST tarea
	const createTask = async (label) => {
		if (!label.trim()) return;

		setCreating(true);

		try {
			await fetch(`https://playground.4geeks.com/todo/todos/${username}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					label,
					is_done: false
				})
			});

			await getTasks();
		} catch (error) {
			console.log(error);
		} finally {
			setCreating(false);
		}
	};

	// DELETE
	const deleteTask = async (id) => {
		try {
			await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
				method: "DELETE"
			});

			await getTasks();
		} catch (error) {
			console.log(error);
		}
	};

	// PUT* (Modificado de Path a Put)
	const updateTask = async (taskId, newLabel) => {

		const updatedTodos = todos.map(todo =>
			todo.id === taskId
				? { ...todo, label: newLabel }
				: todo
		);

		try {
			const response = await fetch(
				"https://playground.4geeks.com/todo/todos/YOUR_USERNAME",
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(updatedTodos)
				}
			);

			if (!response.ok) {
				throw new Error("Error updating task");
			}

			setTodos(updatedTodos);

		} catch (error) {
			console.error(error);
		}
	};

	// BORRAR TODO
	const clearTasks = async () => {
		try {
			await fetch(`https://playground.4geeks.com/todo/users/${username}`, {
				method: "DELETE"
			});

			setTasks([]);
		} catch (error) {
			console.log(error);
		}
	};

	// INIT
	useEffect(() => {
		const init = async () => {
			await createUser();
			await getTasks();
		};
		init();
	}, []);

	return (
		<div className="app-container">
			<div className="todo-card">

				<h1 className="title">REMEMBER</h1>

				<TodoForm createTask={createTask} creating={creating} />

				{loading ? (
					<div className="d-flex justify-content-center mt-3">
						<div className="spinner-border"></div>
					</div>
				) : (
					<ul className="todo-list">
						{tasks.map((task) => (
							<TodoItem
								key={todo.id}
								task={todo}
								removeTask={removeTask}
								updateTask={updateTask}
							/>
						))}
					</ul>
				)}

				<button className="clear-btn" onClick={clearTasks}>
					Clear all
				</button>

			</div>
		</div>
	);
}