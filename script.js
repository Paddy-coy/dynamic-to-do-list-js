document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Load existing tasks from localStorage
    function loadTasks() {
        if (tasks.length > 0) {
            tasks.forEach(task => addTask(task, false)); // false indicates not to save to localStorage again
        }
    }

    // Function to add a task
    function addTask(taskText, save = true) {
        // Trim the input value
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
        
        removeButton.onclick = () => {
            li.remove();
            if (save) {
                tasks = tasks.filter(task => task !== trimmedTaskText);
                updateLocalStorage();
            }
        };

        // Append button to the list item and list item to the task list
        li.appendChild(removeButton);
        taskList.appendChild(li);

        // Save to local storage if specified
        if (save) {
            tasks.push(trimmedTaskText);
            updateLocalStorage();
        }

        // Clear the input field
        taskInput.value = '';
    }

    // Update local storage with current tasks
    function updateLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Event listeners
    addButton.addEventListener('click', () => addTask(taskInput.value));
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask(taskInput.value);
        }
    });

    // Load tasks on page load
    loadTasks();
});
