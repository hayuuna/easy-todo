const todoList = document.querySelector('.todo-list');
const todoInput = document.querySelector('.todo-input');
const todoForm = document.querySelector('.todo-form');

let todo = [];

const TODO_KEY = 'todo';

function paintTodo(newTodoObj) {
  const li = document.createElement('li');
  li.classList.add('todo-list-item');
  li.id = newTodoObj.id;
  li.done = newTodoObj.done;

  const div = document.createElement('div');
  div.classList.add('list-wrap');

  const label = document.createElement('label');
  label.classList.add('checkbox-label');
  label.addEventListener('click', completedTodo);

  const p = document.createElement('p');
  p.classList.add('todo-text');
  p.innerText = newTodoObj.text;

  const button = document.createElement('button');
  button.classList.add('todo-delete');
  button.innerText = 'X';
  button.addEventListener('click', deleteTodo);

  div.append(label, p);
  li.append(div, button);
  todoList.appendChild(li);

  if (newTodoObj.done) {
    p.classList.add('completed-todo');
    label.classList.add('checked');
    label.innerText = '✓';
  } else {
    label.innerText = '';
  }
}

function handleSubmitTodo(event) {
  event.preventDefault();
  const newTodo = todoInput.value;
  todoInput.value = '';

  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
    done: false,
  };

  todo.push(newTodoObj);
  paintTodo(newTodoObj);
  localStorage.setItem(TODO_KEY, JSON.stringify(todo));
}

todoForm.addEventListener('submit', handleSubmitTodo);

const savedTodo = localStorage.getItem(TODO_KEY);

if (savedTodo) {
  const parsedTodo = JSON.parse(savedTodo);
  todo = parsedTodo;
  todo.forEach((item) => {
    paintTodo(item);
  });
}

function deleteTodo(event) {
  const li = event.target.parentElement;
  li.remove();
  todo = todo.filter((item) => item.id !== parseInt(li.id));

  localStorage.setItem(TODO_KEY, JSON.stringify(todo));
}

function completedTodo(event) {
  const checkbox = event.target;
  const div = event.target.parentElement;
  const li = div.parentElement;

  let currentState = !li.done;
  li.done = currentState;

  const todoId = parseInt(li.id);
  const todoIndex = todo.findIndex((item) => item.id === todoId);
  if (todoIndex !== -1) {
    todo[todoIndex].done = currentState;
    localStorage.setItem(TODO_KEY, JSON.stringify(todo));
  }

  const p = div.querySelector('p');
  if (currentState) {
    p.classList.add('completed-todo');
    checkbox.classList.add('checked');
    checkbox.innerText = '✓';
  } else {
    p.classList.remove('completed-todo');
    checkbox.classList.remove('checked');
    checkbox.innerText = '';
  }
}
