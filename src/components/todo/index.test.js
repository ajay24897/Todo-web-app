import { act, render, screen } from "@testing-library/react";
import useEvent, { userEvent } from "@testing-library/user-event";
import Todo from "./index";

beforeEach(() => {
  localStorage.clear();
});

test("check input present and no todo entered", () => {
  render(<Todo />);
  let input = screen.getByPlaceholderText("Enter Todo");
  expect(input).toBeInTheDocument();
  expect(
    screen.getByRole("heading", {
      name: "Pending (0)",
    })
  ).toBeInTheDocument(); // 0 Pending todo
  expect(
    screen.getByRole("heading", {
      name: "Completed (0)",
    })
  ).toBeInTheDocument(); // 0 Completed todo
});

test("add todo and submit button", async () => {
  useEvent.setup();
  render(<Todo />);
  let input = screen.getByPlaceholderText("Enter Todo");
  let addIcon = screen.getByTestId("add-icon");
  await userEvent.type(input, "Go for walk");
  await act(() => userEvent.click(addIcon));
  expect(screen.getByText(/go for walk/i)).toBeInTheDocument();
  expect(input.value).toBe("");
});

test("add todo and press enter button", async () => {
  useEvent.setup();
  render(<Todo />);
  let input = screen.getByPlaceholderText("Enter Todo");
  await userEvent.type(input, "Go for dinner");
  await act(async () => await userEvent.keyboard("{Enter}"));
  expect(screen.getByText(/go for dinner/i)).toBeInTheDocument();
  expect(input.value).toBe("");
  expect(
    screen.getByRole("heading", {
      name: "Pending (1)",
    })
  ).toBeInTheDocument();
});

test("add two task using enter button", async () => {
  useEvent.setup();
  render(<Todo />);
  let input = screen.getByPlaceholderText("Enter Todo");
  await userEvent.type(input, "Go for dinner");
  await act(async () => {
    await userEvent.keyboard("{Enter}");
  });
  await userEvent.type(input, "Go for lunch");
  await act(async () => {
    await userEvent.keyboard("{Enter}");
  });
  expect(screen.getByText(/go for dinner/i)).toBeInTheDocument();
  expect(screen.getByText(/go for lunch/i)).toBeInTheDocument();

  expect(input.value).toBe("");
  expect(
    screen.getByRole("heading", {
      name: "Pending (2)",
    })
  ).toBeInTheDocument(); // to pendig tasks added
});

test("add two task using pressing button", async () => {
  useEvent.setup();
  render(<Todo />);
  let input = screen.getByPlaceholderText("Enter Todo");
  await userEvent.type(input, "Go for dinner");
  await act(async () => {
    await userEvent.keyboard("{Enter}");
  });
  await userEvent.type(input, "Go for lunch");
  await act(async () => {
    await userEvent.keyboard("{Enter}");
  });
  expect(screen.getByText(/go for dinner/i)).toBeInTheDocument();
  expect(screen.getByText(/go for lunch/i)).toBeInTheDocument();

  expect(input.value).toBe("");
  expect(
    screen.getByRole("heading", {
      name: "Pending (2)",
    })
  ).toBeInTheDocument();
});

test("add two task  and delete one ask from pending list", async () => {
  useEvent.setup();
  render(<Todo />);
  let input = screen.getByPlaceholderText("Enter Todo");
  await userEvent.type(input, "Go for dinner");
  await act(async () => {
    await userEvent.keyboard("{Enter}");
  });
  await userEvent.type(input, "Go for lunch");
  await act(async () => {
    await userEvent.keyboard("{Enter}");
  });

  const delete0 = screen.getByTestId("delete-icon 0");
  await act(async () => {
    await userEvent.click(delete0);
  });

  expect(
    screen.getByRole("heading", {
      name: "Pending (1)",
    })
  ).toBeInTheDocument();
});

test("on edit buuton press kinput should be focus and input value shoud be same as selected one", async () => {
  useEvent.setup();
  render(<Todo />);
  let input = screen.getByPlaceholderText("Enter Todo");
  await userEvent.type(input, "Go for dinner");
  await act(async () => {
    await userEvent.keyboard("{Enter}");
  });
  await userEvent.type(input, "Go for lunch");
  await act(async () => {
    await userEvent.keyboard("{Enter}");
  });

  const edit0 = screen.getByTestId("edit-icon 0");
  await act(async () => {
    await userEvent.click(edit0);
  });

  expect(input).toHaveFocus();
  expect(input.value).toBe("Go for dinner");
});

test("add todo twice and delete one of them", async () => {
  useEvent.setup();
  render(<Todo />);
  let input = screen.getByPlaceholderText("Enter Todo");
  await userEvent.type(input, "Go for dinner");
  await act(async () => {
    await userEvent.keyboard("{Enter}");
  });
  await userEvent.type(input, "Go for lunch");
  await act(async () => {
    await userEvent.keyboard("{Enter}");
  });

  const delete0 = screen.getByTestId("delete-icon 0");
  await act(async () => {
    await userEvent.click(delete0);
  });

  expect(
    screen.getByRole("heading", {
      name: "Pending (1)",
    })
  ).toBeInTheDocument();
});

test("mark complete", async () => {
  useEvent.setup();
  render(<Todo />);
  let input = screen.getByPlaceholderText("Enter Todo");
  await userEvent.type(input, "Go for dinner");
  await act(async () => {
    await userEvent.keyboard("{Enter}");
  });
  await userEvent.type(input, "Go for lunch");
  await act(async () => {
    await userEvent.keyboard("{Enter}");
  });
  expect(
    screen.getByRole("heading", {
      name: "Pending (2)",
    })
  ).toBeInTheDocument();
  const right0 = screen.getByTestId("right-icon 0");
  await act(async () => {
    await userEvent.click(right0);
  });
  expect(
    screen.getByRole("heading", {
      name: "Pending (1)",
    })
  ).toBeInTheDocument();

  expect(
    screen.getByRole("heading", {
      name: "Completed (1)",
    })
  ).toBeInTheDocument();
});

test("delete todo", async () => {
  useEvent.setup();
  render(<Todo />);
  let input = screen.getByPlaceholderText("Enter Todo");
  await userEvent.type(input, "Go for dinner");
  await act(async () => {
    await userEvent.keyboard("{Enter}");
  });
  await userEvent.type(input, "Go for lunch");
  await act(async () => {
    await userEvent.keyboard("{Enter}");
  });
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

  const right0 = screen.getByTestId("right-icon 0");
  await act(async () => {
    await userEvent.click(right0);
  });

  expect(
    screen.getByRole("heading", {
      name: "Completed (1)",
    })
  ).toBeInTheDocument();

  const completed = screen.getByTestId("delete-completed-icon 0");
  await act(async () => {
    await userEvent.click(completed);
  });

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
});

test("edit todo and submit", async () => {
  useEvent.setup();
  render(<Todo />);
  let input = screen.getByPlaceholderText("Enter Todo");
  await userEvent.type(input, "Go for dinner");
  await act(async () => {
    await userEvent.keyboard("{Enter}");
  });
  await userEvent.type(input, "Go for lunch");
  await act(async () => {
    await userEvent.keyboard("{Enter}");
  });

  const edit0 = screen.getByTestId("edit-icon 0");
  await act(async () => {
    await userEvent.click(edit0);
  });

  expect(input).toHaveFocus();
  expect(input.value).toBe("Go for dinner");

  await userEvent.type(input, "Go for dance");

  await act(async () => {
    await userEvent.keyboard("{Enter}");
  });

  expect(screen.getByText(/go for dance/i)).toBeInTheDocument();
});
