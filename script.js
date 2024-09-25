document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const dueDateInput = document.getElementById('dueDateInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Load tasks from localStorage
    loadTasks();

    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        const dueDate = dueDateInput.value;
        if (taskText) {
            addTask(taskText, dueDate);
            taskInput.value = '';
            dueDateInput.value = '';
        }
    });

    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('deleteBtn')) {
            deleteTask(e.target.parentElement.dataset.id);
        } else if (e.target.tagName === 'LI') {
            toggleTaskCompletion(e.target.dataset.id);
        }
    });

    function addTask(text, dueDate) {
        const taskId = Date.now();
        const task = { id: taskId, text, completed: false, dueDate };
        const tasks = getTasks();
        tasks.push(task);
        saveTasks(tasks);
        renderTask(task);
    }

    function deleteTask(id) {
        const tasks = getTasks().filter(task => task.id != id);
        saveTasks(tasks);
        renderTasks(tasks);
    }

    function toggleTaskCompletion(id) {
        const tasks = getTasks().map(task => {
            if (task.id == id) {
                task.completed = !task.completed;
            }
            return task;
        });
        saveTasks(tasks);
        renderTasks(tasks);
    }

    function loadTasks() {
        const tasks = getTasks();
        renderTasks(tasks);
    }

    function getTasks() {
        return JSON.parse(localStorage.getItem('tasks')) || [];
    }

    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTasks(tasks) {
        taskList.innerHTML = '';
        tasks.forEach(renderTask);
    }

    function renderTask(task) {
        const li = document.createElement('li');
        li.textContent = task.text;
        li.dataset.id = task.id;
        if (task.completed) li.classList.add('completed');

        const dueDateSpan = document.createElement('span');
        dueDateSpan.className = 'due-date';
        dueDateSpan.textContent = task.dueDate ? `Due: ${task.dueDate}` : '';
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('deleteBtn');

        li.appendChild(dueDateSpan);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    }
});
