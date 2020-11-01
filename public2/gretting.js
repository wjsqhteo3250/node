const form = document.querySelector(".js-nameForm");
const input = form.querySelector("input");
const greetings = document.querySelector(".greetings");
const userName = document.querySelector('#userName');
const editName = document.querySelector('#editName');

const USER_LS = "GAGA";
const SHOW = "showing";

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleNameSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  paintName(currentValue);
  saveName(currentValue);
}

function paintName(text) {
  form.classList.remove(SHOW);
  greetings.classList.add(SHOW);
  userName.innerText = `Hello ${text}`;
}

function askForName() {
  form.classList.add(SHOW);
  greetings.classList.remove(SHOW);
  form.addEventListener("submit", handleNameSubmit);
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintName(currentUser);
  }
}
editName.addEventListener('click', ()=>{input.value=""; localStorage.removeItem(USER_LS); askForName();})

function init() {
  loadName();
}

init();
