import { MdOutlineModeEdit } from "react-icons/md";
import { AiOutlineCheck } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";

import {
  COMPLETED,
  DELETE,
  EDIT,
  NO_COMPLETED_TODO_FOUND,
  NO_TODO_FOUND,
} from "../../constants/string";
import { StyledArrowCnt, StyledArrowIcon, StyledTodoList } from "./styled";
import { useState } from "react";

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
  const [isToogledPending, setIsToogledPending] = useState<Boolean>(true);
  const [isToogledCompleted, setIsToogledCompleted] = useState<Boolean>(true);

  const renderPendingList = () => {
    return (
      <div data-aos="fade-down">
        <div className="heading">
          <h4>Pending ({todos.length})</h4>
          <StyledArrowCnt
            isToogled={isToogledPending}
            onClick={() => {
              setIsToogledPending(!isToogledPending);
            }}
            data-testid="arrow-pending"
          >
            <StyledArrowIcon isDarkMode={isDarkMode} />
          </StyledArrowCnt>
        </div>
        <StyledTodoList className="todo-list" isDarkMode={isDarkMode}>
          {isToogledPending ? (
            todos?.length > 0 ? (
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
                        data-testid={"right-icon " + index}
                        onClick={() => todoAction(COMPLETED, index)}
                      />
                      <MdOutlineModeEdit
                        className={EDIT}
                        data-testid={"edit-icon " + index}
                        size={30}
                        onClick={() => todoAction(EDIT, index)}
                      />
                      <RiDeleteBinLine
                        className={DELETE}
                        data-testid={"delete-icon " + index}
                        size={30}
                        onClick={() => todoAction(DELETE, index)}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <h4 className="no-todo">{NO_TODO_FOUND}</h4>
            )
          ) : null}
        </StyledTodoList>
      </div>
    );
  };

  const renderCompletedList = () => {
    return (
      <div data-aos="fade-down">
        <div className="heading" data-aos="fade-down">
          <h4>Completed ({completedTodos.length})</h4>
          <StyledArrowCnt
            isToogled={isToogledCompleted}
            onClick={() => {
              setIsToogledCompleted(!isToogledCompleted);
            }}
            data-testid="arrow-completed"
          >
            <StyledArrowIcon isDarkMode={isDarkMode} />
          </StyledArrowCnt>
        </div>

        <StyledTodoList isDarkMode={isDarkMode} className="todo-list">
          {isToogledCompleted ? (
            completedTodos?.length > 0 ? (
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
                        data-testid={"delete-completed-icon " + index}
                        onClick={() => completedTodoAction(DELETE, index)}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <h4 className="no-todo">{NO_COMPLETED_TODO_FOUND}</h4>
            )
          ) : null}
        </StyledTodoList>
      </div>
    );
  };

  return (
    <>
      {renderPendingList()}
      {renderCompletedList()}
    </>
  );
};
export default TodoList;
