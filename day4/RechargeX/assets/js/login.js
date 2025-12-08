const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('loginEmail');
const passwordInput = document.getElementById('loginPassword');
const emailError = document.getElementById('loginEmailError');
const passwordError = document.getElementById('loginPasswordError');
const loginError = document.getElementById('loginError');

emailInput.addEventListener('input', function() {
    const email = this.value.trim();
    if (email && !emailRegex.test(email)) {
        emailError.classList.remove('hidden');
        this.classList.add('border-rose-500');
    } else {
        emailError.classList.add('hidden');
        this.classList.remove('border-rose-500');
    }
});

passwordInput.addEventListener('input', function() {
    const password = this.value;
    if (password && password.length < 6) {
        passwordError.classList.remove('hidden');
        this.classList.add('border-rose-500');
    } else {
        passwordError.classList.add('hidden');
        this.classList.remove('border-rose-500');
    }
});

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    loginError.classList.add('hidden');
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    let isValid = true;

    if (!email || !emailRegex.test(email)) {
        emailError.classList.remove('hidden');
        isValid = false;
    }
    if (!password || password.length < 6) {
        passwordError.classList.remove('hidden');
        isValid = false;
    }

    if (isValid) {
        const userData = { email, name: email.split('@')[0], loginTime: new Date().toISOString(), isLoggedIn: true };
        localStorage.setItem('rechargeXUser', JSON.stringify(userData));
        this.querySelector('button').textContent = 'Logging in...';
        this.querySelector('button').disabled = true;
        setTimeout(() => window.location.href = 'dashboard.html', 1000);
    } else {
        loginError.classList.remove('hidden');
    }
});

window.addEventListener('DOMContentLoaded', function() {
    const user = localStorage.getItem('rechargeXUser');
    if (user && JSON.parse(user).isLoggedIn) window.location.href = 'dashboard.html';
});
