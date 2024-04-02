import React, { useState } from 'react'
import './App.css'

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

function App() {
  const [newItem, setNewItem] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([])
  
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setTodos(currentTodos => {
      return [
        ...currentTodos, 
        { id: crypto.randomUUID(), title: newItem, completed: false }, 
        ]  
    })
    setNewItem("")
  }
  
  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return {...todo, completed}
        }
        return todo;
      })
    })
  }

  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="new-item-form">
        <div className='form-row'>
          <label htmlFor="item">New item</label>
          <input 
          value={newItem} 
          onChange={e => setNewItem(e.target.value)} 
          type="text" 
          id="item" 
          />

        </div>
        <button className="btn">Add</button>
      </form>
      <h1 className="header">Todo List</h1>
      <ul className="list">
        {todos.length === 0 && "None"}
        {todos.map(todo => {
          return (
          <li key={todo.id}>
          <label>
            <input type="checkbox" checked={todo.completed} onChange={e => toggleTodo(todo.id, e.target.checked)}/>
            {todo.title}
          </label>
          <button onClick={() => deleteTodo(todo.id)} className='btn'>Delete</button>
        </li>
          )
        })}
      </ul>
    </>
  )
}

export default App
