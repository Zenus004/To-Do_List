document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('task-list');
    const newTaskInput = document.getElementById('new-task');
    const prioritySelect = document.getElementById('priority');
    const addTaskButton = document.getElementById('add-task');

    addTaskButton.addEventListener('click', () => {
        const taskText = newTaskInput.value.trim();
        const taskPriority = prioritySelect.value;

        if (taskText !== '' && taskPriority !== 'select') {
            addTask(taskText, taskPriority);
            newTaskInput.value = '';
            prioritySelect.value = 'select';
        }
    });

    function addTask(text, priority) {
        const taskItem = document.createElement('li');
        taskItem.classList.add(priority);

        const taskText = document.createElement('span');
        taskText.textContent = text;
        taskText.classList.add('task-text');

        const icons = document.createElement('div');
        icons.classList.add('task-icons');

        const completeIcon = document.createElement('i');
        completeIcon.classList.add('fas', 'fa-check');
        completeIcon.addEventListener('click', () => {
            taskItem.classList.toggle('completed');
            taskItem.classList.toggle(priority);
            taskList.appendChild(taskItem);
        });

        const editIcon = document.createElement('i');
        editIcon.classList.add('fas', 'fa-pencil-alt');
        editIcon.addEventListener('click', () => {
            const newText = document.createElement('input');
            newText.type = 'text';
            newText.value = text;
            newText.classList.add('edit-input');
            taskItem.replaceChild(newText, taskText);

            newText.addEventListener('blur', () => {
                if (newText.value.trim() !== '') {
                    taskText.textContent = newText.value.trim();
                    taskItem.replaceChild(taskText, newText);
                }
            });

            newText.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    newText.blur();
                }
            });

            newText.focus();
        });

        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('fas', 'fa-trash');
        deleteIcon.addEventListener('click', () => {
            taskItem.classList.add('deleting');
            taskItem.addEventListener('animationend', () => {
                taskItem.remove();
            });
        });

        icons.appendChild(completeIcon);
        icons.appendChild(editIcon);
        icons.appendChild(deleteIcon);

        taskItem.appendChild(taskText);
        taskItem.appendChild(icons);

        taskList.appendChild(taskItem);
        sortTasks();
    }

    function sortTasks() {
        const tasks = Array.from(taskList.children);
        tasks.sort((a, b) => {
            const priorities = ['high', 'medium', 'low'];
            return priorities.indexOf(a.classList[0]) - priorities.indexOf(b.classList[0]);
        });
        tasks.forEach(task => taskList.appendChild(task));
    }
});