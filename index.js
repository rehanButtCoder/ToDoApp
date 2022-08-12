let submit = document.getElementById("submit-btn");
let newTask = document.getElementById("input");
let list = document.getElementById("list");

window.onload = function () {
  let taskList = getLocalStorage();
  let x = getLastKey();
  for (let i = 0; i <= x; i++) {
    if (taskList[i] != undefined) createTask(taskList[i]);
  }
};

function getLastKey() {
  let taskList = getLocalStorage();
  let x = Math.max(...Object.keys(taskList));
  return x;
}

function createTask(input) {
  let row = createRow();
  list.appendChild(row);

  let taskCol = createTaskCol();
  row.appendChild(taskCol);

  let task = createTaskArea(input);
  taskCol.appendChild(task);

  let btnsDiv = createButtonsDiv();
  row.appendChild(btnsDiv);

  let editBtn = createEditButton();
  btnsDiv.appendChild(editBtn);

  let deleteBtn = createDeleteButton();
  btnsDiv.appendChild(deleteBtn);

  let completeBtn = createCompleteButton();
  btnsDiv.appendChild(completeBtn);
}

function getLocalStorage() {
  let taskList = { ...localStorage };
  return taskList;
}

function checkInputMatch(input) {
  let task = getLocalStorage();
  for (let i = 0; i < Object.keys(task).length; i++) {
    if (input === task[i]) {
      console.log("match found " + task[i]);
      return true;
    }
  }
}

function inputCheck(input) {
  if (input === "" || input.trim() === "" || checkInputMatch(input)) {
    alert("Please enter a valid task");
    input.focus();
    return false;
  } else {
    return true;
  }
}

function createRow() {
  let row = document.createElement("div");
  row.className = "row";
  list.appendChild(row);
  return row;
}

function createTaskCol() {
  let taskCol = document.createElement("div");
  taskCol.className = "col-9";
  return taskCol;
}

function createTaskArea(task) {
  let li = document.createElement("li");
  li.innerHTML = task;
  li.setAttribute("readonly", true);
  return li;
}

function createButtonsDiv() {
  let btns = document.createElement("div");
  btns.className = "col-3";
  return btns;
}

function createDeleteButton() {
  let deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "Delete";
  deleteBtn.className = "btn";
  deleteBtn.setAttribute("contenteditable", false);

  deleteBtn.onclick = function () {
    let task = this.parentNode.parentNode.firstChild.firstChild;
    let taskText = task.innerHTML;
    let taskList = getLocalStorage();
    let x = getLastKey();
    for (let i = 0; i <= x; i++) {
      if (taskText === taskList[i]) {
        console.log("deleting " + taskList[i]);
        localStorage.removeItem(i);
      }
      this.parentNode.parentNode.remove();
    }
  };
  return deleteBtn;
}

function createEditButton() {
  let editBtn = document.createElement("button");
  editBtn.innerHTML = "Edit";
  editBtn.className = "btn";

  editBtn.onclick = function () {
    let task = this.parentNode.parentNode.firstChild.firstChild;
    let currTask = task.innerHTML;
    task.setAttribute("contenteditable", true);
    task.focus();
    
  };
  return editBtn;
}

function createCompleteButton() {
  let completeBtn = document.createElement("button");
  completeBtn.innerHTML = "Complete";
  completeBtn.className = "btn";
  completeBtn.setAttribute("contenteditable", false);
  return completeBtn;
}

submit.onclick = function (e) {
  e.preventDefault();
  let taskList = getLocalStorage();

  if (inputCheck(newTask.value)) {
    let key = 0;
    while (taskList[key] != undefined) {
      key++;
    }

    localStorage.setItem(key, input.value);
    createTask(newTask.value);
    newTask.value = "";
  }
};
