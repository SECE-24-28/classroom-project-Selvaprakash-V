const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[6-9]\d{9}$/;
const registerForm = document.getElementById('registerForm');
const nameInput = document.getElementById('registerName');
const emailInput = document.getElementById('registerEmail');
const phoneInput = document.getElementById('registerPhone');
const passwordInput = document.getElementById('registerPassword');
const confirmPasswordInput = document.getElementById('registerPasswordConfirm');

nameInput.addEventListener('input', function() {
    const name = this.value.trim();
    document.getElementById('registerNameError').classList.toggle('hidden', !name || name.length >= 3);
});

emailInput.addEventListener('input', function() {
    const email = this.value.trim();
    document.getElementById('registerEmailError').classList.toggle('hidden', !email || emailRegex.test(email));
});

phoneInput.addEventListener('input', function() {
    this.value = this.value.replace(/\D/g, '');
    document.getElementById('registerPhoneError').classList.toggle('hidden', !this.value || phoneRegex.test(this.value));
});

passwordInput.addEventListener('input', function() {
    document.getElementById('registerPasswordError').classList.toggle('hidden', !this.value || this.value.length >= 6);
    if (confirmPasswordInput.value) checkPasswordMatch();
});

confirmPasswordInput.addEventListener('input', checkPasswordMatch);

function checkPasswordMatch() {
    const match = passwordInput.value === confirmPasswordInput.value;
    document.getElementById('registerPasswordConfirmError').classList.toggle('hidden', match);
}

registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('rechargeXUsers') || '[]');
    const email = emailInput.value.trim();
    
    if (users.some(u => u.email === email)) {
        document.getElementById('registerError').classList.remove('hidden');
        return;
    }

    const newUser = {
        name: nameInput.value.trim(),
        email,
        phone: phoneInput.value,
        password: passwordInput.value,
        registrationDate: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('rechargeXUsers', JSON.stringify(users));
    document.getElementById('registerSuccess').classList.remove('hidden');
    this.querySelector('button').textContent = 'Created!';
    this.querySelector('button').disabled = true;
    setTimeout(() => window.location.href = 'login.html', 2000);
});
