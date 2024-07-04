document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const pendingTasks = document.getElementById('pendingTasks');
    const completedTasks = document.getElementById('completedTasks');

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addTask(taskInput.value);
        taskInput.value = '';
    });

    function addTask(task) {
        const taskItem = createTaskElement(task);
        pendingTasks.appendChild(taskItem);
    }

    function createTaskElement(task) {
        const li = document.createElement('li');
        li.textContent = task;

        const actions = document.createElement('div');
        actions.className = 'task-actions';

        const editButton = document.createElement('button');
        editButton.className = 'edit';
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => editTask(li));

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete';
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteTask(li));

        const completeButton = document.createElement('button');
        completeButton.className = 'complete';
        completeButton.textContent = 'Complete';
        completeButton.addEventListener('click', () => completeTask(li));

        actions.appendChild(editButton);
        actions.appendChild(deleteButton);
        actions.appendChild(completeButton);

        li.appendChild(actions);

        return li;
    }

    function editTask(taskItem) {
        const newTask = prompt('Edit task:', taskItem.firstChild.textContent);
        if (newTask !== null && newTask.trim() !== '') {
            taskItem.firstChild.textContent = newTask;
        }
    }

    function deleteTask(taskItem) {
        taskItem.remove();
    }

    function completeTask(taskItem) {
        taskItem.classList.add('completed');
        completedTasks.appendChild(taskItem);
    }
});
