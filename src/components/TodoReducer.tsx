import React, { useState, useReducer } from "react";

type TodoState = { id: number; completed: boolean; text: string; };

type TodoAction = { type: "ADD_TODO"} | { type: "TOGGLE_TODO" } | {type: "DELETE_TODO"};

const todoReducer = (state: TodoState[], action: TodoAction): TodoState[] => {
    switch (action.type) {
        case "ADD_TODO":
            return [...state, {id: Date.now(), text: action.text, completed: false}];
        case "TOGGLE_TODO":
            return [...state.map(todo => (todo.id === action.id ? {...todo, completed: !todo.completed} : todo))];
        case "DELETE_TODO":
            return state.filter(todo => todo.id !== action.id);
        default:
            return state;
    }
};

const TodoList: React.FC = () => {
    const [todos, dispatch] = useReducer(todoReducer, []);
    const [text, setText] = useState("");

    const handleAdd = () => {
        dispatch({ type: "ADD_TODO", text });
        setText("");
    };

    return (
        <>
            <div>
                <h1>Todo List</h1>
                <input type="text" value={text} onChange={e => setText(e.target.value)} />
                <button onClick={handleAdd}>Add</button>
                <ul>
                <h2>All Todos</h2>
                    {todos.map(todo => (
                        <li key={todo.id}>
                            <label>
                                <input type="checkbox" checked={todo.completed} onChange={e => dispatch({ type: "TOGGLE_TODO", id:  todo.id})} />
                            </label>
                            {todo.text}
                            <button onClick={() => dispatch({ type: "DELETE_TODO", id: todo.id})} >Delete</button>
                        </li>
                        
                    ))}
                {todos.length === 0 && "None"}
                </ul>
            </div>
        </>
    )
};
console.log(TodoList);

export default TodoList;
