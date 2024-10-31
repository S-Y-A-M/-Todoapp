import logo from './logo.svg';
import './App.css'




import React, { useState, useEffect } from 'react';

function TodoInput({ addTodo }) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); 

    if (inputValue.trim() !== '') {
      addTodo(inputValue);
      setInputValue('');
    }
  };

  

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={inputValue} onChange={handleChange} 
 placeholder="Add 
 a task" />
      <button type="submit">Add</button>
    </form>
  );
}

function TodoItem({ todo, toggleComplete, deleteTodo, editTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);
  
  const 
 handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit 
 = () => {
    editTodo(todo.id, editedText);
    setIsEditing(false);
  };

  return (
    <li>
      {isEditing ? (
        <input type="text" value={editedText} onChange={(e) => setEditedText(e.target.value)}  
 />
      ) : (
        <>
          <input type="checkbox" 
 checked={todo.completed} onChange={() => toggleComplete(todo.id)} />
          <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</span>
        </>
      )}
      <button onClick={isEditing  
 ? handleSaveEdit : handleEdit}>
        {isEditing ? 'Save' : 'Edit'}
      </button>
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </li>
  );
}

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Fetch todos from local storage or API if needed
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    // Save todos to local storage   

    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
  

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text: text,
      completed: false,
    };
    setTodos([...todos,  
 newTodo]);
  };

  const toggleComplete = (id) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const deleteTodo = (id)=> {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id, newText) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))); 

  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <TodoInput addTodo={addTodo} />
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            
          />
        ))}
      </ul>
      <button onClick={clearCompleted}>Clear Completed</button>
    </div>
  );
  
}



export default TodoList;