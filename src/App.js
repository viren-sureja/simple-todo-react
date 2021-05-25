import { useState, useRef, useEffect } from 'react';
import uuidv4 from 'uuid/v4';

import './App.css';
import TodoList from './components/TodoList';

function App() {
	const [todos, setTodos] = useState([
		{ id: '1', name: 'todo 1', completed: false },
		{ id: '2', name: 'todo 2', completed: false },
	]);

	const LOCAL_STORAGE_KEY = 'itssecretkey';

	const todoNameRef = useRef();

	useEffect(() => {
		const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
		if (storedTodos) setTodos(storedTodos);
	}, []);

	useEffect(() => {
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
	}, [todos]);

	const handleAddTodo = e => {
		const name = todoNameRef.current.value;
		if (name === '') return;

		setTodos(prevTodos => {
			return [
				...prevTodos,
				{ name: name, id: uuidv4(), completed: false },
			];
		});
		todoNameRef.current.value = null;
	};

	const toggleTodo = id => {
		const newTodos = [...todos];
		const todo = newTodos.find(todo => todo.id === id);
		todo.completed = !todo.completed;
		setTodos(newTodos);
	};

	const handleClearTodos = () => {
		const newTodos = [...todos];
		const todo = newTodos.filter(todo => todo.completed === true);
		setTodos(todo);
	};

	return (
		// this is called fragment.
		<>
			<TodoList todos={todos} toggleTodo={toggleTodo} />
			<input ref={todoNameRef} type="text" />
			<button onClick={handleAddTodo}>Add Todo</button>
			<button onClick={handleClearTodos}>Clear Completed Todos</button>
			<div>{todos.filter(todo => !todo.completed).length} left todo</div>
		</>
	);
}

export default App;
