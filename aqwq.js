function switchForm(form) {
    document.getElementById('authForm').style.display = form === 'auth' ? 'block' : 'none';
    document.getElementById('registerForm').style.display = form === 'register' ? 'block' : 'none';
    showMessage('');
  }
  
  function getUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]');
  }
  
  function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
  }
  
  function login() {
    const login = document.getElementById('loginAuth').value.trim();
    const password = document.getElementById('passwordAuth').value;
  
    const users = getUsers();
    const user = users.find(u => u.login === login && u.password === password);
    if (user) {
      showMessage(`Добро пожаловать, ${user.name}! (роль: ${user.role})`, 'green');
    } else {
      showMessage('Неверный логин или пароль.');
    }
  }
  
  function register() {
    const login = document.getElementById('loginReg').value.trim();
    const name = document.getElementById('nameReg').value.trim();
    const pass1 = document.getElementById('passwordReg1').value;
    const pass2 = document.getElementById('passwordReg2').value;
  
    const loginRegex = /^[a-zA-Z]+$/;
    const nameRegex = /^[А-Яа-яЁё\s]+$/;
    const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+=\-{}\[\]:;"'<>,.?/\\|`~]+$/;
  
    if (!loginRegex.test(login)) return showMessage('Логин должен содержать только латинские буквы.');
    if (!nameRegex.test(name)) return showMessage('ФИО должно содержать только русские буквы.');
    if (!passwordRegex.test(pass1)) return showMessage('Пароль содержит недопустимые символы.');
    if (pass1 !== pass2) return showMessage('Пароли не совпадают.');
  
    const users = getUsers();
    if (users.some(u => u.login === login)) {
      return showMessage('Пользователь с таким логином уже существует.');
    }
  
    users.push({ login, name, password: pass1, role: 'Пользователь' });
    saveUsers(users);
    showMessage('Регистрация успешна. Войдите в систему.', 'green');
    switchForm('auth');
  }
  
  function showMessage(msg, color = 'red') {
    const message = document.getElementById('message');
    message.style.color = color;
    message.textContent = msg;
  }
  