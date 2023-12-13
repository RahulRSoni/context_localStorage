import TodoItem from './Components/TodoItem.jsx';
import TodoForm from './Components/TodoForm.jsx';
import { TodoProvider } from './context/index.js';
import { useEffect, useState } from 'react';

function App() {
	const [todos, setTodo] = useState([]);

	const addTodo = (todo) => {
		setTodo((prev) => [{ id: Date.now(), ...todo }, ...prev]);
	};

	const updateTodo = (id, todo) => {
		setTodo((prev) =>
			prev.map((prevTodo) => {
				prevTodo.id === id ? todo : prevTodo;
			}),
		);
	};
	const deleteTodo = (id) => {
		setTodo((prev) => {
			prev.filter((todo) => todo.id !== id);
		});
	};

	useEffect(() => {
		const todos = JSON.parse(localStorage.getItem('todos'));
		if (todos && todos.length > 0) {
			setTodo(todos);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify('todos'));
	}, [todos]);

	const toggleComplete = (id) => {
		setTodo((prev) => {
			prev.map((prevTodo) => {
				prevTodo.id === id
					? { ...prevTodo, completed: !prevTodo.completed }
					: prevTodo;
			});
		});
	};
	return (
		<TodoProvider
			value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
			<div className='bg-[#172842] min-h-screen py-8'>
				<div className='w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white'>
					<h1 className='text-2xl font-bold text-center mb-8 mt-2'>
						Manage Your Todo's
					</h1>
					<div className='mb-4'>
						<TodoForm />
					</div>
					<div className='flex flex-wrap gap-y-3'>
						{todos.map((todo) => (
							<div
								key={todo.id}
								className='w-full'>
								<TodoItem todo={todo} />
							</div>
						))}
					</div>
				</div>
			</div>
		</TodoProvider>
	);
}

export default App;
