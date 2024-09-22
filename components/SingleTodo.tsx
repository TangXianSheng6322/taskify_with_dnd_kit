import React from "react";
import { useState } from "react";
import { FaEdit, FaCheck } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Todo } from "../model";
import { useRef } from "react";
import { useEffect } from "react";
import "./styles.css";
import { useSortable } from "@dnd-kit/sortable";

type Props = {
  id: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const SingleTodo = ({ id, todo, todos, setTodos }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = { transition, transform };
  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();

    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // inputRef.current?.focus();
    inputRef.current?.select();
  }, [edit]);

  return (
    <form
      className="todos_single"
      onSubmit={(e) => handleEdit(e, todo.id)}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
    >
      {" "}
      {edit ? (
        <input
          ref={inputRef}
          value={editTodo}
          onChange={(e) => setEditTodo(e.target.value)}
          className="todos_single--text"
        />
      ) : todo.isDone ? (
        <s className="todos_single--text">{todo.todo}</s>
      ) : (
        <span className="todos_single--text">{todo.todo}</span>
      )}
      <div>
        <span
          className="icon"
          onClick={() => {
            if (!edit && !todo.isDone) {
              setEdit(!edit);
            }
          }}
        >
          <FaEdit />
        </span>
        <span className="icon">
          <FaCheck onClick={() => handleDone(todo.id)} />
        </span>
        <span className="icon" onClick={() => handleDelete(todo.id)}>
          <MdDelete />
        </span>
      </div>
    </form>
  );
};

export default SingleTodo;
