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
    });
})