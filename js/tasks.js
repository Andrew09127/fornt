document.addEventListener('DOMContentLoaded', function() {
    let currentTab = 'current';
    const dropdownTrigger = document.querySelector('.tasks-dropdown-trigger');
    const dropdownMenu = document.querySelector('.tasks-dropdown-menu');
    const dynamicCounter = document.getElementById('dynamic-counter');
    const addTaskBtn = document.getElementById('add-task-button');

    // Инициализация интерфейса
    updateInterface(currentTab);

    // Обработчик клика по триггеру
    dropdownTrigger.addEventListener('click', function(e) {
        e.stopPropagation();
        dropdownMenu.classList.toggle('show');
        this.classList.toggle('active');
    });
    
    // Обработчики для пунктов меню
    document.querySelectorAll('.tasks-dropdown-item').forEach(item => {
        item.addEventListener('click', function() {
            currentTab = this.getAttribute('data-tab');
            updateInterface(currentTab);
            dropdownMenu.classList.remove('show');
            dropdownTrigger.classList.remove('active');
            loadTasks(currentTab);
        });
    });
    
    // Закрытие меню при клике вне его
    document.addEventListener('click', function() {
        dropdownMenu.classList.remove('show');
        dropdownTrigger.classList.remove('active');
    });
    
    function updateInterface(tabType) {
        // Обновляем текст триггера
        dropdownTrigger.querySelector('span').textContent = 
            tabType === 'current' ? 'Текущие задачи' :
            tabType === 'pending' ? 'Отложенные задачи' : 'Выполненные задачи';
        
        // Управление блоком счетчика
        if (tabType === 'completed') {
            dynamicCounter.style.display = 'none';
        } else {
            dynamicCounter.style.display = 'block';
            dynamicCounter.className = `task-counter-box ${tabType}`;
            dynamicCounter.querySelector('h3').textContent = 
                tabType === 'current' ? 'Текущие задачи' : 'Отложенные задачи';
        }
        
        // Кнопка добавления (только для текущих задач)
        addTaskBtn.style.display = tabType === 'current' ? 'flex' : 'none';
    }
    
    function loadTasks(type) {
        console.log(`Загружаем задачи типа: ${type}`);
        // Здесь будет ваша логика загрузки задач
        // После загрузки данных вызываем:
        // updateInterface(currentTab);
    }
});



// работа с кнопкой добавь задачи
// Добавляем в конец обработчика DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // ... предыдущий код остается без изменений ...

    const addTaskBtn = document.getElementById('add-task-button');
    const tasksGrid = document.querySelector('.tasks-grid');

    addTaskBtn.addEventListener('click', function() {
        if (currentTab !== 'current') return; // Двойная проверка
        
        // Создаем модальное окно для ввода данных
        const modal = document.createElement('div');
        modal.className = 'task-creation-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>Создать новую задачу</h3>
                <form id="task-form">
                    <div class="form-group">
                        <label>Название:</label>
                        <input type="text" id="task-title" required>
                    </div>
                    <div class="form-group">
                        <label>Ответственный:</label>
                        <select id="task-assignee" required>
                            <option value="">Выберите...</option>
                            <!-- Сюда можно добавить динамически пользователей -->
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Плановая дата решения:</label>
                        <input type="date" id="task-due-date" required>
                    </div>
                    <div class="form-group">
                        <label>Приоритет:</label>
                        <select id="task-priority" required>
                            <option value="low">Низкий</option>
                            <option value="medium">Средний</option>
                            <option value="high">Высокий</option>
                        </select>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="cancel-btn">Отмена</button>
                        <button type="submit">Создать</button>
                    </div>
                </form>
            </div>
        `;

        document.body.appendChild(modal);

        // Обработчики для модального окна
        modal.querySelector('.cancel-btn').addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        modal.querySelector('#task-form').addEventListener('submit', (e) => {
            e.preventDefault();
            createNewTask({
                title: document.getElementById('task-title').value,
                assignee: document.getElementById('task-assignee').value,
                dueDate: document.getElementById('task-due-date').value,
                priority: document.getElementById('task-priority').value
            });
            document.body.removeChild(modal);
        });
    });

    function createNewTask(taskData) {
        // Автоматически добавляем дату создания
        taskData.createdAt = new Date().toISOString().split('T')[0];
        
        // Создаем HTML для новой задачи
        const taskCard = document.createElement('div');
        taskCard.className = `task-card ${taskData.priority}-priority`;
        taskCard.innerHTML = `
            <div class="task-title">${taskData.title}</div>
            <div class="task-meta">
                <span>Создана: ${taskData.createdAt}</span>
                <span>Срок: ${taskData.dueDate}</span>
            </div>
            <div class="task-assignee">
                <img src="./images/avatar-placeholder.png" alt="Аватар">
                <span>${taskData.assignee}</span>
            </div>
            <div class="task-priority-badge">${getPriorityLabel(taskData.priority)}</div>
        `;

        tasksGrid.prepend(taskCard);
        currentTasksCount++;
        updateInterface(currentTab);
    }

    function getPriorityLabel(priority) {
        const labels = {
            low: 'Низкий',
            medium: 'Средний',
            high: 'Высокий'
        };
        return labels[priority] || '';
    }
});
document.addEventListener('DOMContentLoaded', function() {
    let currentTab = 'current';
    let currentTasksCount = 0;
    let pendingTasksCount = 0;

    // Элементы интерфейса
    const dropdownTrigger = document.querySelector('.tasks-dropdown-trigger');
    const dropdownMenu = document.querySelector('.tasks-dropdown-menu');
    const dynamicCounter = document.getElementById('dynamic-counter');
    const addTaskBtn = document.getElementById('add-task-button');
    const tasksGrid = document.querySelector('.tasks-grid');
    const modal = document.getElementById('task-creation-modal');
    const closeModal = document.querySelector('.close-modal');
    const taskForm = document.getElementById('new-task-form');

    // Инициализация интерфейса
    updateInterface(currentTab);

    // Обработчики для меню задач
    dropdownTrigger.addEventListener('click', function(e) {
        e.stopPropagation();
        dropdownMenu.classList.toggle('show');
        this.classList.toggle('active');
    });
    
    document.querySelectorAll('.tasks-dropdown-item').forEach(item => {
        item.addEventListener('click', function() {
            currentTab = this.getAttribute('data-tab');
            updateInterface(currentTab);
            dropdownMenu.classList.remove('show');
            dropdownTrigger.classList.remove('active');
        });
    });
    
    document.addEventListener('click', function() {
        dropdownMenu.classList.remove('show');
        dropdownTrigger.classList.remove('active');
    });

    // Обработчики для модального окна
    addTaskBtn.addEventListener('click', function() {
        if (currentTab === 'current') {
            modal.style.display = 'block';
            document.getElementById('task-due-date').valueAsDate = new Date();
        }
    });

    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    taskForm.addEventListener('submit', function(e) {
        e.preventDefault();
        createNewTask({
            title: document.getElementById('task-name').value,
            assignee: document.getElementById('task-assignee').value,
            assigneeName: document.getElementById('task-assignee').options[document.getElementById('task-assignee').selectedIndex].text,
            dueDate: document.getElementById('task-due-date').value,
            priority: document.getElementById('task-priority').value,
            createdAt: new Date().toLocaleDateString()
        });
        modal.style.display = 'none';
        taskForm.reset();
    });

    function updateInterface(tabType) {
        // Обновление интерфейса (ваш существующий код)
        // ...
    }

    function createNewTask(taskData) {
        const taskCard = document.createElement('div');
        taskCard.className = `task-card ${taskData.priority}-priority`;
        taskCard.innerHTML = `
            <div class="task-title">${taskData.title}</div>
            <div class="task-meta">
                <span>Создана: ${taskData.createdAt}</span>
                <span>Срок: ${taskData.dueDate}</span>
            </div>
            <div class="task-assignee">
                <img src="./images/avatar-placeholder.png" alt="Аватар">
                <span>${taskData.assigneeName}</span>
            </div>
        `;
        tasksGrid.prepend(taskCard);
        currentTasksCount++;
        updateInterface(currentTab);
    }
});
