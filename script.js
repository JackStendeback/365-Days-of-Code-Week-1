document.addEventListener("DOMContentLoaded", function () {
    const addTask = document.getElementById('task-button');
    const deleteTask = document.getElementById('delete-button')
    const taskTable = document.getElementById('task-table').getElementsByTagName('tbody')[0];
    const TASKS_KEY = 'Tasks';

    addTask.addEventListener('click', function () {
        // Creating a new table row upon clicking.
        const newRow = document.createElement('tr');

        // Creating two table data cells for each added row.
        const taskCell = document.createElement('td');
        const checkboxCell = document.createElement('td');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('inputs');

        // Making the taskCell editable(BIG MOVES!)
        taskCell.contentEditable = true;
        

        // Adding content to the table data cells
        taskCell.textContent = 'New Task';
        checkbox.setAttribute('for', 'task-input'); // This is for accessibility fixing from lighthouse recommendation in dev tools.
        checkboxCell.appendChild(checkbox);

        // Append the cells to the new row
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

    // * gSTUDY THIS! Basically if a name was changed, it saves the new name in local storage from the table 'tasks'
    taskTable.addEventListener('input', function () {
        saveTasksToLocalStorage();
    });

    function saveTasksToLocalStorage() {
        const taskRows = document.querySelectorAll('#task-table tbody tr');
        const tasks = [];

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
        const storedTasks = JSON.parse(localStorage.getItem(TASKS_KEY));

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

// ? Add functionality where data is stored in local storage, but is refreshed at midnight each night to reset task manager. BUT potentially keep certain ones that will be there everyday? (like drinking water)
// ? If checkbox = 'checked', then delete button deletes them.