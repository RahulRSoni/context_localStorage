import { createContext, useContext } from 'react';

export const TodoContext = createContext({
	todo: [
		{
			id: 1,
			title: 'todo message',
			completed: false,
		},
	],
	addTodo: (todo) => {},
	updateTodo: (id, todo) => {},
	deleteTodo: (id) => {},
	toggleComplete: (id) => {},
});

export const TodoProvider = TodoContext.Provider;

export default useTodo = () => {
	return useContext(TodoContext);
};
