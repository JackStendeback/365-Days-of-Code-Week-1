document.addEventListener("DOMContentLoaded", function () {
    // Get references to the add and delete buttons and the task table
    const addTask = document.getElementById('task-button');
    const deleteTask = document.getElementById('delete-button')
    const taskTable = document.getElementById('task-table').getElementsByTagName('tbody')[0];
    const TASKS_KEY = 'Tasks';

    // Add an event listener to the add task button
    addTask.addEventListener('click', function () {
        // Create a new table row when the add task button is clicked
        const newRow = document.createElement('tr');

        // Create two cells for the new row: one for the task name and one for the checkbox
        const taskCell = document.createElement('td');
        const checkboxCell = document.createElement('td');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('inputs');

        // Making the taskCell editable so user can enter a task name.(BIG MOVES!)
        taskCell.contentEditable = true;
        

        // Set initial content of the cells.
        taskCell.textContent = 'New Task';
        checkbox.setAttribute('for', 'task-input'); // This is for accessibility fixing from lighthouse recommendation in dev tools.
        checkboxCell.appendChild(checkbox);

        // Add the cells to the new row
        newRow.appendChild(taskCell);
        newRow.appendChild(checkboxCell);

        // Finally, append the new row to the table body
        taskTable.appendChild(newRow);

        taskCell.focus();

        // Set to save in local storage.
        saveTasksToLocalStorage();
    });

    // Easy to implement delete task function!
    deleteTask.addEventListener('click', function () {
        const taskRows = document.querySelectorAll('#task-table tbody tr');

        taskRows.forEach(row => {
            const checkbox = row.querySelector('input[type="checkbox"]');
            if (checkbox.checked) {
                row.remove();
            }
        });

        // Save the updated tasks to local storage after deletion
        saveTasksToLocalStorage();
    });

    // * STUDY THIS! Basically if a name was changed, it saves the new name in local storage from the table 'tasks'
    taskTable.addEventListener('input', function () {
        saveTasksToLocalStorage();
    });

    function saveTasksToLocalStorage() {
        const taskRows = document.querySelectorAll('#task-table tbody tr');
        const tasks = [];

        // For each row, check if the checkbox is checked
        taskRows.forEach(row => {
            const taskName = row.querySelector('td:first-child').textContent;
            tasks.push(taskName);
        });

        // Store all tasks as JSON in local storage
        localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    }

    // Now we need to load the tasks from local storage on page load.
    loadTasksFromLocalStorage();
    
    function loadTasksFromLocalStorage() {
        let storedTasks;
        try {
            storedTasks = JSON.parse(localStorage.getItem(TASKS_KEY));
}          catch (error) {
            console.error('Error parsing tasks from local storage', error);
}

        // We need to make it so it doesnt copy EVERY task again on refresh. (Its doubling the tasks currently)
        if (storedTasks) {
            // This line makes it so the task creation doesn't create unwanted appends.
            taskTable.innerHTML = '';

            storedTasks.forEach(task => {
                const newRow = document.createElement('tr');
                const taskCell = document.createElement('td');
                const checkboxCell = document.createElement('td');
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.classList.add('inputs');

                taskCell.contentEditable = true;
                taskCell.textContent = task;

                checkboxCell.appendChild(checkbox);

                newRow.appendChild(taskCell);
                newRow.appendChild(checkboxCell);

                taskTable.appendChild(newRow);
            });
        }
    }
});