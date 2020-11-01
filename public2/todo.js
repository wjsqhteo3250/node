const todoForm = document.querySelector(".js-todoForm"),
  toDoInput = todoForm.querySelector("input"),
  todoList = document.querySelector(".js-todoList");

const TODOS_LS = "todos";

let todos = [];

function deletTodo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  todoList.removeChild(li); 
  const cleanTodos = todos.filter(function (todo) {
    return todo.id !== parseInt(li.id);
  });
  todos = cleanTodos;
  saveTodos();
}

function saveTodos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(todos));
}

function paintTOdo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = todos.length + 1;
  delBtn.addEventListener("click", deletTodo);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newId;
  todoList.appendChild(li);
  const todoObj = {
    text: text,
    id: newId,
  };
  todos.push(todoObj);
  saveTodos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintTOdo(currentValue);
  toDoInput.value = "";
}

function loadTodos() {
  const loadedTodos = localStorage.getItem(TODOS_LS);
  if (loadedTodos !== null) {
    const parseTodos = JSON.parse(loadedTodos);
    parseTodos.forEach(function (ss) {
      paintTOdo(ss.text);
    });
  }
}

function init() {
  loadTodos();
  todoForm.addEventListener("submit", handleSubmit);
}

init();
