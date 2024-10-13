document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Load existing tasks from localStorage
    function loadTasks() {
        tasks.forEach(task => addTask(task, false)); // Load tasks without saving them again
    }

    // Function to add a task
    function addTask(taskText, save = true) {
        // Retrieve and trim the input value
        const trimmedTaskText = taskText.trim();

        // Check if the taskText is empty
        if (trimmedTaskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create a new list item
        const li = document.createElement('li');
        li.textContent = trimmedTaskText;

        // Create remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';
        
        // Assign onclick event to remove button
        removeButton.onclick = () => {
            li.remove(); // Remove the list item from the DOM
            if (save) {
                tasks = tasks.filter(task => task !== trimmedTaskText); // Update tasks array
                updateLocalStorage(); // Update local storage
            }
        };

        // Append button to the list item and list item to the task list
        li.appendChild(removeButton);
        taskList.appendChild(li);

        // Save to local storage if specified
        if (save) {
            tasks.push(trimmedTaskText); // Add task to tasks array
            updateLocalStorage(); // Save to local storage
        }

        // Clear the input field
        taskInput.value = '';
    }

    // Update local storage with current tasks
    function updateLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks)); // Save tasks to local storage
    }

    // Event listeners
    addButton.addEventListener('click', () => addTask(taskInput.value)); // Add task on button click
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask(taskInput.value); // Add task on Enter key press
        }
    });

    // Load tasks on page load
    loadTasks();
});
