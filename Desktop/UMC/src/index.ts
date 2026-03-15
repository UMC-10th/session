interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

let todos: Todo[] = [];
let nextId: number = 1;

const todoInput = document.getElementById("todo-input") as HTMLInputElement;
const addBtn = document.getElementById("add-btn") as HTMLButtonElement;
const todoList = document.getElementById("todo-list") as HTMLUListElement;
const doneList = document.getElementById("done-list") as HTMLUListElement;

function render(): void {
  todoList.innerHTML = "";
  doneList.innerHTML = "";

  todos.forEach((todo) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = todo.text;

    const btn = document.createElement("button");

    if (todo.completed) {
      li.classList.add("done");
      btn.textContent = "삭제";
      btn.classList.add("delete-btn");
      btn.addEventListener("click", () => deleteTodo(todo.id));
      li.appendChild(span);
      li.appendChild(btn);
      doneList.appendChild(li);
    } else {
      btn.textContent = "완료";
      btn.addEventListener("click", () => completeTodo(todo.id));
      li.appendChild(span);
      li.appendChild(btn);
      todoList.appendChild(li);
    }
  });
}

function addTodo(): void {
  const text = todoInput.value.trim();
  if (!text) return;

  const todo: Todo = {
    id: nextId++,
    text,
    completed: false,
  };

  todos.push(todo);
  todoInput.value = "";
  render();
}

function completeTodo(id: number): void {
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todo.completed = true;
    render();
  }
}

function deleteTodo(id: number): void {
  todos = todos.filter((t) => t.id !== id);
  render();
}

addBtn.addEventListener("click", addTodo);

todoInput.addEventListener("keypress", (e: KeyboardEvent) => {
  if (e.key === "Enter") {
    addTodo();
  }
});
