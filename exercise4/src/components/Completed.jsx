import React from 'react';
import { useState } from "react";
import { useTodoList } from "../context/TodoContext";

function Completed() {

    const { todos } = useTodoList();

  const todoList = () => {
    return todos.filter((todo) => todo?.complete);
  }

  return (
    <div>
      <ul>
        {todoList().map((todo, i) => (
            <li key={i}>
                {todo.text}
            </li>
        ))}
      </ul>
    </div>
  );
}

export default Completed;
