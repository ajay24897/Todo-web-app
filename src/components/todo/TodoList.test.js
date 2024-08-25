import { render, screen } from "@testing-library/react";
import TodoList from "./TodoList";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

let completedTodoAction = jest.fn();
let todoAction = jest.fn();
let isDarkMode = false;

describe("todolist", () => {
  test("check no pending and no completed task", () => {
    let todos = [];
    let completedTodos = [];
    render(
      <TodoList
        todoAction={todoAction}
        todos={todos}
        completedTodos={completedTodos}
        isDarkMode={isDarkMode}
        completedTodoAction={completedTodoAction}
      />
    );
    expect(
      screen.getByRole("heading", {
        name: "Pending (0)",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Completed (0)",
      })
    ).toBeInTheDocument();
  });

  test("check 2 pending and 0 completed", () => {
    let todos = ["go to gym", "complete project"];
    let completedTodos = [];
    render(
      <TodoList
        todoAction={todoAction}
        todos={todos}
        completedTodos={completedTodos}
        isDarkMode={isDarkMode}
        completedTodoAction={completedTodoAction}
      />
    );
    expect(
      screen.getByRole("heading", {
        name: "Pending (2)",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Completed (0)",
      })
    ).toBeInTheDocument();
  });

  test("check 2 completed and 0 pending", () => {
    let completedTodos = ["go to gym", "complete project"];
    let todos = [];
    render(
      <TodoList
        todoAction={todoAction}
        todos={todos}
        completedTodos={completedTodos}
        isDarkMode={isDarkMode}
        completedTodoAction={completedTodoAction}
      />
    );
    expect(
      screen.getByRole("heading", {
        name: "Pending (0)",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Completed (2)",
      })
    ).toBeInTheDocument();
  });

  test("1 pending task and  mark completed", async () => {
    let todos = ["go to gym"];
    let completedTodos = [];
    userEvent.setup();
    render(
      <TodoList
        todoAction={todoAction}
        todos={todos}
        completedTodos={completedTodos}
        isDarkMode={isDarkMode}
        completedTodoAction={completedTodoAction}
      />
    );
    expect(
      screen.getByRole("heading", {
        name: "Pending (1)",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Completed (0)",
      })
    ).toBeInTheDocument();

    const rightIcon = screen.getByTestId("right-icon 0");

    await act(async () => await userEvent.click(rightIcon));
    expect(todoAction).toBeCalledWith("completed", 0);
  });

  test("check 1 pending task and click edit", async () => {
    let todos = ["go to gym"];
    let completedTodos = [];
    userEvent.setup();
    render(
      <TodoList
        todoAction={todoAction}
        todos={todos}
        completedTodos={completedTodos}
        isDarkMode={isDarkMode}
        completedTodoAction={completedTodoAction}
      />
    );
    expect(
      screen.getByRole("heading", {
        name: "Pending (1)",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Completed (0)",
      })
    ).toBeInTheDocument();

    const rightIcon = screen.getByTestId("edit-icon 0");

    await act(async () => await userEvent.click(rightIcon));
    expect(todoAction).toBeCalledWith("edit", 0);
  });

  test("1 pending task and click delete", async () => {
    let todos = ["go to gym"];
    let completedTodos = [];
    userEvent.setup();
    render(
      <TodoList
        todoAction={todoAction}
        todos={todos}
        completedTodos={completedTodos}
        isDarkMode={isDarkMode}
        completedTodoAction={completedTodoAction}
      />
    );
    expect(
      screen.getByRole("heading", {
        name: "Pending (1)",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Completed (0)",
      })
    ).toBeInTheDocument();

    const rightIcon = screen.getByTestId("delete-icon 0");

    await act(async () => await userEvent.click(rightIcon));
    expect(todoAction).toBeCalledWith("delete", 0);
  });

  test("check 1 pending task and click edit ok", async () => {
    let todos = ["go to gym"];
    let completedTodos = [];
    userEvent.setup();
    render(
      <TodoList
        todoAction={todoAction}
        todos={todos}
        completedTodos={completedTodos}
        isDarkMode={isDarkMode}
        completedTodoAction={completedTodoAction}
      />
    );
    expect(
      screen.getByRole("heading", {
        name: "Pending (1)",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Completed (0)",
      })
    ).toBeInTheDocument();

    const rightIcon = screen.getByTestId("edit-icon 0");

    await act(async () => await userEvent.click(rightIcon));
    expect(todoAction).toBeCalledWith("edit", 0);
  });

  test("1 pending task and click delete ok", async () => {
    let todos = ["go to gym", "deded"];
    let completedTodos = ["go to gymS"];
    userEvent.setup();
    render(
      <TodoList
        todoAction={todoAction}
        todos={todos}
        completedTodos={completedTodos}
        isDarkMode={isDarkMode}
        completedTodoAction={completedTodoAction}
      />
    );
    expect(
      screen.getByRole("heading", {
        name: "Pending (2)",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Completed (1)",
      })
    ).toBeInTheDocument();

    const delete0 = screen.getByTestId("delete-icon 0");
    const delete1 = screen.getByTestId("delete-icon 1");
    const delete3 = screen.getByTestId("delete-completed-icon 0");

    await userEvent.click(delete0);
    expect(todoAction).toBeCalledWith("delete", 0);

    await userEvent.click(delete1);
    expect(todoAction).toBeCalledWith("delete", 1);

    await userEvent.click(delete3);
    expect(completedTodoAction).toBeCalledWith("delete", 0);
  });

  test("toggle arrow for pending", async () => {
    let todos = ["go to gym", "deded"];
    let completedTodos = ["go to gymS"];
    userEvent.setup();
    render(
      <TodoList
        todoAction={todoAction}
        todos={todos}
        completedTodos={completedTodos}
        isDarkMode={isDarkMode}
        completedTodoAction={completedTodoAction}
      />
    );
    expect(screen.getByText("deded")).toBeInTheDocument();
    const arrowIcon = screen.getByTestId("arrow-pending");
    await userEvent.click(arrowIcon);
    expect(screen.queryByText("deded")).not.toBeInTheDocument();
  });

  test("arrow-completed", async () => {
    let todos = ["go to gym", "deded"];
    let completedTodos = ["go to gymS"];
    userEvent.setup();
    render(
      <TodoList
        todoAction={todoAction}
        todos={todos}
        completedTodos={completedTodos}
        isDarkMode={isDarkMode}
        completedTodoAction={completedTodoAction}
      />
    );
    expect(screen.getByText("go to gymS")).toBeInTheDocument();
    const arrowIcon = screen.getByTestId("arrow-completed");
    await userEvent.click(arrowIcon);
    expect(screen.queryByText("go to gymS")).not.toBeInTheDocument();

    await userEvent.click(arrowIcon);
    expect(screen.getByText("go to gymS")).toBeInTheDocument();
  });
});
