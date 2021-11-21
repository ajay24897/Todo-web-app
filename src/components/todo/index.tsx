import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { IoIosAdd } from "react-icons/io";

import TodoList from "./TodoList";
import { COMPLETED, DELETE, EDIT, TOASTMSG } from "../../constants/string";
import { capitalizeFirstLetter } from "../../commonFunctions";
import { StyleAddIcon, StyledInput } from "./styled";

import "react-toastify/dist/ReactToastify.css";
import "./todo.scss";

interface Iprops {
  isDarkMode: Boolean;
}

const Todo = ({ isDarkMode }: Iprops) => {
  const [todos, setTodos] = useState<string[]>([]);
  const [completedTodos, setcompletedTodos] = useState<string[]>([]);

  const [todoInput, setTodoInput] = useState<string>("");
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editId, setEditId] = useState<number>(-1);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();

    const localTodos = localStorage.getItem("todos");
    const localCompletedTodos = localStorage.getItem("completedTodos");

    if (localTodos) setTodos(JSON.parse(localTodos));
    if (localCompletedTodos) setcompletedTodos(JSON.parse(localCompletedTodos));
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("completedTodos", JSON.stringify(completedTodos));
  }, [completedTodos]);

  const handelInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    setTodoInput(capitalizeFirstLetter(value));
  };

  const hadelAddClick = () => {
    if (todoInput?.length > 0) {
      if (isEdit && editId >= 0) {
        let newTodo = [...todos];
        newTodo[editId] = todoInput;
        setTodos([...newTodo]);
        setIsEdit(false);
        openToast(TOASTMSG.EDITED);
      } else {
        setTodos([...todos, todoInput.trim()]);
        openToast(TOASTMSG.ADDED);
      }
      setTodoInput("");
      inputRef.current?.focus();
    }
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.charCode === 13) {
      hadelAddClick();
    }
  };

  const todoAction = (action: string, index: number) => {
    if (action === COMPLETED) {
      let completedTodo = [...todos].filter((item: string, id: number) => {
        return id === index;
      });

      let updatedTodo = [...todos].filter((item: string, id: number) => {
        return id !== index;
      });
      setTodos([...updatedTodo]);
      setcompletedTodos([...completedTodo, ...completedTodos]);
      openToast(TOASTMSG.COMPLETED);
    } else if (action === DELETE) {
      let updatedTodo = [...todos].filter((item: string, id: number) => {
        return id !== index;
      });
      setTodos([...updatedTodo]);
      openToast(TOASTMSG.DELETED);
    } else if (action === EDIT) {
      setIsEdit(true);
      inputRef.current?.focus();
      setEditId(index);
      setTodoInput(todos[index]);
    }
  };

  const completedTodoAction = (action: string, index: number) => {
    if (action === DELETE) {
      let completedTodo = [...completedTodos].filter(
        (item: string, id: number) => {
          return id !== index;
        }
      );
      setcompletedTodos([...completedTodo]);
      openToast(TOASTMSG.REMOVED);
    }
  };

  const openToast = (msg: string) => {
    if (isDarkMode) toast.dark(msg);
    else toast(msg);
  };

  return (
    <div className="main-cnt">
      <div className="todo-input-cnt" data-aos="fade-down">
        <StyledInput
          isDarkMode={isDarkMode}
          value={todoInput}
          className="todo-input"
          placeholder="Enter Todo"
          onChange={handelInput}
          onKeyPress={onKeyPress}
          ref={inputRef}
        />
        <StyleAddIcon
          isDarkMode={isDarkMode}
          className="add-icon"
          onClick={() => hadelAddClick()}
        >
          <IoIosAdd size="50" />
        </StyleAddIcon>
      </div>
      <TodoList
        isDarkMode={isDarkMode}
        todos={todos}
        todoAction={todoAction}
        completedTodos={completedTodos}
        completedTodoAction={completedTodoAction}
      />
      <ToastContainer
        position="bottom-center"
        closeButton={true}
        autoClose={2000}
        limit={3}
      />
    </div>
  );
};
export default Todo;
