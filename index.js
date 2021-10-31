let inputTask = document.querySelector("#task");
let addButton = document.querySelector("#addBtn");
let addtask = document.querySelector(".tasks");
let idNo = 1;
// if data find in local storage this line will remove it 
let arrayOfTasks = [];

// so we do this 
if (localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}
getTasksFromLocal();
addButton.addEventListener("click", function() {
    if (inputTask.value !== "") {
        addTaskToArray(inputTask.value);
        inputTask.value = "";
    }
});
addtask.addEventListener("click", function(e) {
    if (e.target.id === "deleteBtn") {
        // Remove element from page 
        e.target.parentElement.remove();
        // Remove from local storage 
        delFromLocal(e.target.parentElement.getAttribute("id"));
    }
    // Task Element

    if (e.target.classList.contains("task")) {
        // Toggle Completed For The Task
        toggleStatusTaskWith(e.target.getAttribute("id"));
        // Toggle Done Class
        e.target.classList.toggle("done");
    }
});

function delFromLocal(delId) {
    // return all that id not delid 
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != delId);
    addTaskToLocal(arrayOfTasks);

}

function addTaskToArray(taskTitle) {
    const task = {
        id: idNo++,
        title: taskTitle,
        completed: false,
    };
    // push task to array of tasks 
    arrayOfTasks.push(task);
    // add task to webpage 
    addTaskToPage(arrayOfTasks);
    // add task to local storade
    addTaskToLocal(arrayOfTasks);

}

function addTaskToPage(arrayOfTasks) {
    addtask.innerHTML = "";
    arrayOfTasks.forEach(
        e => {
            let task = document.createElement("p");
            let deleteBtn = document.createElement("button");
            deleteBtn.classList.add("btnStyle");
            deleteBtn.id = "deleteBtn";
            deleteBtn.innerText = "Delete";
            task.id = e.id;
            task.classList.add("task");
            task.innerText = e.title;
            task.appendChild(deleteBtn);
            addtask.appendChild(task);
            if (task.completed) {
                task.className = "task done";
            }
        });

}

function addTaskToLocal(arrayOfTasks) {
    localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));

}

function getTasksFromLocal() {
    let data = localStorage.getItem("tasks");
    if (data) {
        let tasks = JSON.parse(data);
        addTaskToPage(tasks);
    }
}

function toggleStatusTaskWith(taskId) {
    for (let i = 0; i < arrayOfTasks.length; i++) {
        if (arrayOfTasks[i].id == taskId) {
            arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false);
        }
    }
    addTaskToLocal(arrayOfTasks);
}