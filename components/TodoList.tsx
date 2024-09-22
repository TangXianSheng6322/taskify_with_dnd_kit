import React from "react";
import "./styles.css";
import { Todo } from "../model";
import SingleTodo from "./SingleTodo";
import { DndContext } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export const TodoList = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
}: Props) => {
  return (
    <div className="container">
      <div className="todos">
        <span className="todos_heading">Active Tasks</span>
        <SortableContext items={todos} strategy={verticalListSortingStrategy}>
          {todos.map((todo) => (
            <SingleTodo
              id={todo.id}
              todo={todo}
              todos={todos}
              key={todo.id}
              setTodos={setTodos}
            />
          ))}
        </SortableContext>
      </div>
      <div className="todos remove">
        <span className="todos_heading">Completed Tasks</span>
        <SortableContext
          items={completedTodos}
          strategy={verticalListSortingStrategy}
        >
          {todos.map((todo) => (
            <SingleTodo
              todo={todo}
              todos={completedTodos}
              key={todo.id}
              id={todo.id}
              setTodos={setCompletedTodos}
            />
          ))}{" "}
        </SortableContext>
      </div>
    </div>
  );
};
