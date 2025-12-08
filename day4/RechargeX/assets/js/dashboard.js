function loadUserData() {
    const user = localStorage.getItem('rechargeXUser');
    if (!user) return window.location.href = 'login.html';
    const userData = JSON.parse(user);
    document.querySelector('h1').textContent = `Welcome, ${userData.name}`;
    document.getElementById('dashboardName').textContent = userData.name;
    document.getElementById('dashboardEmail').textContent = userData.email;
}

function loadHistory() {
    const history = JSON.parse(localStorage.getItem('rechargeHistory') || '[]');
    const table = document.getElementById('rechargeHistory');
    if (history.length === 0) {
        table.innerHTML = '<tr><td colspan="6" class="px-6 py-8 text-center text-slate-400">No history yet</td></tr>';
        return;
    }
    table.innerHTML = history.slice(0, 10).map(item => {
        const date = new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        return `
            <tr class="hover:bg-white/5">
                <td class="px-6 py-4 text-sm">${date}</td>
                <td class="px-6 py-4 text-sm font-semibold">${item.mobile}</td>
                <td class="px-6 py-4 text-sm"><span class="badge-warning">${item.operator.toUpperCase()}</span></td>
                <td class="px-6 py-4 text-sm">${item.plan}</td>
                <td class="px-6 py-4 text-sm font-semibold text-amber-400">₹${item.amount}</td>
                <td class="px-6 py-4 text-sm"><span class="badge-success">${item.status}</span></td>
            </tr>
        `;
    }).join('');
}

function updateStats() {
    const history = JSON.parse(localStorage.getItem('rechargeHistory') || '[]');
    const total = history.reduce((sum, item) => sum + item.amount, 0);
    document.querySelector('.text-emerald-400').textContent = `₹${Math.floor(total * 0.05)}`;
    document.querySelector('.text-sky-400').textContent = history.length;
    document.querySelector('.text-amber-400').textContent = `₹${Math.floor(total * 0.02)}`;
}

function logout() {
    if (confirm('Logout?')) {
        const user = JSON.parse(localStorage.getItem('rechargeXUser'));
        user.isLoggedIn = false;
        localStorage.setItem('rechargeXUser', JSON.stringify(user));
        window.location.href = 'index.html';
    }
}

document.getElementById('logoutBtn').addEventListener('click', logout);
document.getElementById('logoutBtn2').addEventListener('click', logout);

window.addEventListener('DOMContentLoaded', () => {
    loadUserData();
    loadHistory();
    updateStats();
});
