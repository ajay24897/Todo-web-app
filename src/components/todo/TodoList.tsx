import { MdOutlineModeEdit } from "react-icons/md";
import { AiOutlineCheck } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";

import {
  COMPLETED,
  DELETE,
  EDIT,
  NO_COMPLETED_TODO_FOUND,
  NO_TODO_FOUND,
} from "../../constants";
import { StyledTodoList } from "./styled";

interface Iprops {
  todos: string[];
  completedTodos: string[];
  isDarkMode: Boolean;
  todoAction: (action: string, index: number) => void;
  completedTodoAction: (action: string, index: number) => void;
}

const TodoList = ({
  todos,
  todoAction,
  isDarkMode,
  completedTodos,
  completedTodoAction,
}: Iprops) => {
  return (
    <>
      <div>
        <h4 className="heading">Pending</h4>
        <StyledTodoList className="todo-list" isDarkMode={isDarkMode}>
          {todos?.length > 0 ? (
            todos.map((todo, index) => {
              return (
                <div className="single-todo" key={index}>
                  <div className="todo-text">
                    <p>{index + 1}.&nbsp; </p> <p>{todo}</p>
                  </div>
                  <div className="todo-action">
                    <AiOutlineCheck
                      className={COMPLETED}
                      size={30}
                      onClick={() => todoAction(COMPLETED, index)}
                    />
                    <MdOutlineModeEdit
                      className={EDIT}
                      size={30}
                      onClick={() => todoAction(EDIT, index)}
                    />
                    <RiDeleteBinLine
                      className={DELETE}
                      size={30}
                      onClick={() => todoAction(DELETE, index)}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <h4 className="no-todo">{NO_TODO_FOUND}</h4>
          )}
        </StyledTodoList>
      </div>
      <div>
        <h4 className="heading">Completed</h4>
        <StyledTodoList isDarkMode={isDarkMode} className="todo-list">
          {completedTodos?.length > 0 ? (
            completedTodos.map((todo, index) => {
              return (
                <div className="single-todo" key={index}>
                  <div className="todo-text">
                    <p>{index + 1}.&nbsp; </p> <p>{todo}</p>
                  </div>
                  <div className="todo-action">
                    <AiOutlineCheck className="hidden" size={30} />
                    <MdOutlineModeEdit className="hidden" size={30} />
                    <RiDeleteBinLine
                      className={DELETE}
                      size={30}
                      onClick={() => completedTodoAction(DELETE, index)}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <h4 className="no-todo">{NO_COMPLETED_TODO_FOUND}</h4>
          )}
        </StyledTodoList>
      </div>
    </>
  );
};
export default TodoList;
