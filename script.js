document.addEventListener("DOMContentLoaded", () => {
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    // Load tasks from Local Storage on initial load
    loadTasks();

    // Add task function
    function addTask(taskText, save = true) {
        if (taskText.trim() === "") {
            alert("Please enter a task.");
            return;
        }

        const li = document.createElement("li");
        li.textContent = taskText;

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.className = "remove-btn";
        removeButton.onclick = function() {
            taskList.removeChild(li);
            removeTaskFromLocalStorage(taskText);
        };

        li.appendChild(removeButton);
        taskList.appendChild(li);

        if (save) {
            saveTaskToLocalStorage(taskText);
        }

        taskInput.value = ""; // Clear the input field
    }

    // Save task to Local Storage
    function saveTaskToLocalStorage(taskText) {
        const tasks = getTasksFromLocalStorage();
        tasks.push(taskText);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Remove task from Local Storage
    function removeTaskFromLocalStorage(taskText) {
        let tasks = getTasksFromLocalStorage();
        tasks = tasks.filter(task => task !== taskText);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Load tasks from Local Storage
    function loadTasks() {
        const tasks = getTasksFromLocalStorage();
        tasks.forEach(task => addTask(task, false)); // Add each task without saving it again
    }

    // Get tasks from Local Storage
    function getTasksFromLocalStorage() {
        return JSON.parse(localStorage.getItem("tasks") || "[]");
    }

    // Event listeners
    addButton.addEventListener("click", () => {
        const taskText = taskInput.value;
        addTask(taskText);
    });

    taskInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            const taskText = taskInput.value;
            addTask(taskText);
        }
    });
});
