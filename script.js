document.addEventListener("DOMContentLoaded", function () {
    const addTask = document.getElementById('task-button');
    const taskTable = document.getElementById('task-table').getElementsByTagName('tbody')[0];

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
        checkboxCell.appendChild(checkbox);

        // Append the cells to the new row
        newRow.appendChild(taskCell);
        newRow.appendChild(checkboxCell);

        // Finally, append the new row to the table body
        taskTable.appendChild(newRow);

        // Set to save in local storage.
        saveTasksToLocalStorage();
    });

    function saveTasksToLocalStorage() {
        const taskRows = document.querySelectorAll('#task-table tbody tr');
        const tasks = [];

        taskRows.forEach(row => {
            const taskName = row.querySeelctor('td:first-child').textContent;
            tasks.push(taskName);
        });

        // Store all tasks as JSON in local storage
        localStorage.setItem('Tasks', JSON.stringify(tasks));
    }
})

// ? Add functionality where data is stored in local storage, but is refreshed at midnight each night to reset task manager. BUT potentially keep certain ones that will be there everyday? (like drinking water)