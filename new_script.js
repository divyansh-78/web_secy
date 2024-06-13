document.addEventListener('DOMContentLoaded', () => {
    const authSection = document.getElementById('auth-section');
    const profileSection = document.getElementById('profile-section');
    const taskSection = document.getElementById('task-section');
    const loginForm = document.getElementById('login-form');
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');
    const navLogin = document.getElementById('nav-login');
    const navProfile = document.getElementById('nav-profile');
    const navTasks = document.getElementById('nav-tasks');
    
    const storedUser = localStorage.getItem('user');
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    if (storedUser) {
        const user = JSON.parse(storedUser);
        showProfile(user);
    }

    function showProfile(user) {
        document.getElementById('profile-email').textContent = user.email;
        authSection.style.display = 'none';
        profileSection.style.display = 'block';
        taskSection.style.display = 'block';
        navLogin.style.display = 'none';
        navProfile.style.display = 'block';
        navTasks.style.display = 'block';
        renderTasks();
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.textContent = task.text;
            if (task.completed) {
                li.classList.add('completed');
            }
            li.addEventListener('click', () => {
                tasks[index].completed = !tasks[index].completed;
                localStorage.setItem('tasks', JSON.stringify(tasks));
                renderTasks();
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', (event) => {
                event.stopPropagation();
                tasks.splice(index, 1);
                localStorage.setItem('tasks', JSON.stringify(tasks));
                renderTasks();
            });

            li.appendChild(deleteButton);
            taskList.appendChild(li);
        });
    }

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (email && password) {
            const user = { email };
            localStorage.setItem('user', JSON.stringify(user));
            showProfile(user);
        }
    });

    taskForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const taskInput = document.getElementById('task-input').value;
        tasks.push({ text: taskInput, completed: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
        taskForm.reset();
    });

    document.getElementById('logout').addEventListener('click', () => {
        localStorage.removeItem('user');
        authSection.style.display = 'block';
        profileSection.style.display = 'none';
        taskSection.style.display = 'none';
        navLogin.style.display = 'block';
        navProfile.style.display = 'none';
        navTasks.style.display = 'none';
    });

    navLogin.addEventListener('click', () => {
        authSection.style.display = 'block';
        profileSection.style.display = 'none';
        taskSection.style.display = 'none';
    });

    navProfile.addEventListener('click', () => {
        authSection.style.display = 'none';
        profileSection.style.display = 'block';
        taskSection.style.display = 'none';
    });

    navTasks.addEventListener('click', () => {
        authSection.style.display = 'none';
        profileSection.style.display = 'none';
        taskSection.style.display = 'block';
    });
});
