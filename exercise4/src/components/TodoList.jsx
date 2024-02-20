import React from 'react';
import { useState } from "react";
import { useTodoList } from "../context/TodoContext";

function TodoList() {
  
  const { todos, setTodos } = useTodoList();

  const [newTodo, setNewTodo] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);
  const [editedText, setEditedText] = useState('');

  const handleAddTodo = () => {
    if (newTodo.length) {
      setTodos([...todos, { id: Date.now(), text: newTodo }]);
      setNewTodo('');
    }
  };

  const onDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const onEdit = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setEditingTodo(todoToEdit);
    setEditedText(todoToEdit.text);
  };

  const onUpdate = () => {
    if (editingTodo && editedText.length) {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === editingTodo.id ? { ...todo, text: editedText } : todo
        )
      );
      setEditingTodo(null);
      setEditedText('');
    }
  };

  const complete = (id) => {
    setTodos((prev) => {
      return prev.map((todo) =>
        todo.id === id ? { ...todo, complete: true } : todo
      )
    });
  }

  const todoList = () => {
    return todos.filter((todo) => !todo?.complete);
  }

  return (
    <div>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      <ul>
        {todoList().map((todo) => (
          <li key={todo.id}>
            {editingTodo && editingTodo.id === todo.id ? (
              <>
                <input
                  type="text"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                />
                <button onClick={() => onUpdate()}>Save</button>
              </>
            ) : (
              <>
                {todo.text}
                <button onClick={() => onEdit(todo.id)}>Edit</button>
                <button onClick={() => onDelete(todo.id)}>Delete</button>
                <button onClick={() => complete(todo.id)}>Complete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
