class Task {
    constructor(title, category) {
        this.title = title;
        this.category = category;
        this.completed = false;
    }

    toggleCompletion() {
        this.completed = !this.completed;
    }
}

class ToDoList {
    constructor() {
        this.tasks = [];
        this.categories = {};
    }

    addTask(title, category) {
        const task = new Task(title, category);
        this.tasks.push(task);
        if (!this.categories[category]) {
            this.categories[category] = [];
        }
        this.categories[category].push(task);
        this.renderTasks();
    }

    removeTask(title) {
        this.tasks = this.tasks.filter(task => task.title !== title);
        for (const category in this.categories) {
            this.categories[category] = this.categories[category].filter(task => task.title !== title);
        }
        this.renderTasks();
    }

    toggleTaskCompletion(title) {
        const task = this.tasks.find(task => task.title === title);
        if (task) {
            task.toggleCompletion();
            this.renderTasks();
        }
    }

    renderTasks() {
        const todoListDiv = document.getElementById('todoList');
        todoListDiv.innerHTML = '';

        for (const category in this.categories) {
            const categoryDiv = document.createElement('div');
            categoryDiv.classList.add('category');
            const categoryHeader = document.createElement('h3');
            categoryHeader.textContent = category;
            categoryDiv.appendChild(categoryHeader);

            this.categories[category].forEach(task => {
                const taskDiv = document.createElement('div');
                taskDiv.classList.add('task');
                if (task.completed) taskDiv.classList.add('completed');

                taskDiv.innerHTML = `
                    <span>${task.title}</span>
                    <div>
                        <button onclick="todoList.toggleTaskCompletion('${task.title}')">
                            ${task.completed ? 'Undo' : 'Complete'}
                        </button>
                        <button onclick="todoList.removeTask('${task.title}')">Delete</button>
                    </div>
                `;

                categoryDiv.appendChild(taskDiv);
            });

            todoListDiv.appendChild(categoryDiv);
        }
    }
}

const todoList = new ToDoList();

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const categoryInput = document.getElementById('categoryInput');
    const taskTitle = taskInput.value.trim();
    const category = categoryInput.value;

    if (taskTitle) {
        todoList.addTask(taskTitle, category);
        taskInput.value = ''; // Clear the input field
    } else {
        alert('Please enter a task!');
    }
}
