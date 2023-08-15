import { useEffect, useReducer } from 'react';
import { todoReducer } from './todoReducer';

const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || [];
}

export const useTodo = () => {

    const [todos, dispatchTodo] = useReducer(todoReducer, [], init);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos])


    const handleNewTodo = (newTodo) => {
        dispatchTodo({
            type: '[TODO] Add Todo',
            payload: newTodo
        });
    }

    const handleDelete = (id) => {

        const action = {
            type: '[TODO] Delete Todo',
            payload: id
        };

        dispatchTodo(action);
    }

    const handleToggleTodo = (id) => {
        dispatchTodo({
            type: '[TODO] Toggle Todo',
            payload: id
        });
    }

    const todosCount = todos.length;
    const pendingTodosCount = todos.filter(todo => !todo.done).length;
    const completedTodosCount = todosCount - pendingTodosCount;

    return {
        todos,
        todosCount,
        pendingTodosCount,
        completedTodosCount,
        handleNewTodo,
        handleDelete,
        handleToggleTodo
    };
}
