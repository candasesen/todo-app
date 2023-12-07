import React, { useState } from "react";

const EnoughToday = () => {
	return (
		<h1 style={{ textAlign: "center", fontSize: "10rem", color: "red" }}>
			Önce elindekileri bitir!
		</h1>
	);
};

const TodoList = ({ todos, deleteTodo, toggleComplete }) => {
	return (
		<table>
			<thead>
				<tr>
					<th>Yapılacaklar</th>
					<th>Oluşturma Tarihi</th>
					<th>İşlemler</th>
				</tr>
			</thead>
			<tbody>
				{todos.map((todo) => (
					<tr key={todo.id}>
						<td>{todo.task}</td>
						<td>
							{new Date(todo.createdAt).toLocaleDateString(
								"tr-TR"
							)}
						</td>
						<td>
							<button onClick={() => toggleComplete(todo.id)}>
								{todo.completed ? "İptal" : "Tamamla"}
							</button>
						</td>
						<td>
							<button onClick={() => deleteTodo(todo.id)}>
								Sil
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

const TodoForm = ({ addTodo }) => {
	const [task, setTask] = useState("");

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			if (task.trim() !== "") {
				addTodo(task);
				setTask("");
			}
		}
	};

	return (
		<div>
			<input
				type="text"
				value={task}
				onChange={(e) => setTask(e.target.value)}
				onKeyPress={handleKeyPress}
				placeholder="Yapılacak iş..."
			/>
			<button
				onClick={() => {
					if (task.trim() !== "") {
						addTodo(task);
						setTask("");
					}
				}}
			>
				Ekle
			</button>
		</div>
	);
};

const App = () => {
	const [todos, setTodos] = useState([]);

	const addTodo = (task) => {
		const newTodo = {
			id: todos.length + 1,
			task: task,
			completed: false,
			createdAt: Date.now(),
		};
		setTodos([...todos, newTodo]);
	};

	const deleteTodo = (id) => {
		const updatedTodos = todos.filter((todo) => todo.id !== id);
		setTodos(updatedTodos);
	};

	const toggleComplete = (id) => {
		const updatedTodos = todos.map((todo) =>
			todo.id === id ? { ...todo, completed: !todo.completed } : todo
		);
		setTodos(updatedTodos);
	};

	return (
		<div border="2">
			{todos.length >= 4 ? (
				<EnoughToday />
			) : (
				<>
					<h1>Todo App</h1>
					<TodoForm addTodo={addTodo} />
					<TodoList
						todos={todos}
						deleteTodo={deleteTodo}
						toggleComplete={toggleComplete}
					/>
				</>
			)}
		</div>
	);
};

export default App;
