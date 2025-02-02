import React, { useState } from "react";
import { db } from "../db";
import { TodoItem } from "../db/TodoItem";
import { TodoList } from "../db/TodoList";

interface Props {
  todoList: TodoList;
}

export function AddTodoItem({ todoList }: Props) {
  const [state, setState] = useState({
    title: ""
  });

  return (
    <div className="row add-item">
      <div className="narrow">
        <input type="checkbox" disabled />
      </div>
      <div className="todo-item-input">
        <input
          type="text"
          placeholder="Add todo item ..."
          value={state.title}
          onChange={ev =>
            setState(item => ({
              ...item,
              title: ev.target.value
            }))
          }
          onKeyUp={ev => {
            if (ev.key === "Enter") {
              db.todoItems.add({
                todoListId: todoList.id,
                realmId: todoList.realmId,
                title: state.title
              });
              setState({
                todoListId: todoList.id,
                title: ""
              } as TodoItem);
            }
          }}
        />
      </div>
    </div>
  );
}
