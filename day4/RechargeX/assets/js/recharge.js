const phoneRegex = /^[6-9]\d{9}$/;
const rechargePlans = {
    airtel: [{ id: 101, price: 199, data: '2 GB/Day', validity: 28, name: 'Data Booster' }],
    jio: [{ id: 201, price: 239, data: '2 GB/Day', validity: 28, name: 'JioPhone' }],
    vi: [{ id: 301, price: 219, data: '1 GB/Day', validity: 28, name: 'Basic' }],
    bsnl: [{ id: 401, price: 99, data: '2 GB/Day', validity: 18, name: 'Budget' }]
};

const mobileInput = document.getElementById('rechargeMobile');
const operatorSelect = document.getElementById('rechargeOperator');
const circleSelect = document.getElementById('rechargeCircle');
const plansGrid = document.getElementById('rechargePlansGrid');
const confirmBtn = document.getElementById('openConfirmModal');
const modal = document.getElementById('confirmModal');

let rechargeData = { mobile: '', operator: '', circle: '', selectedPlan: null };

mobileInput.addEventListener('input', function() {
    this.value = this.value.replace(/\D/g, '');
    rechargeData.mobile = this.value;
    document.getElementById('summaryNumber').textContent = this.value || '—';
    updateButton();
});

operatorSelect.addEventListener('change', function() {
    rechargeData.operator = this.value;
    document.getElementById('summaryOperator').textContent = this.value.toUpperCase() || '—';
    if (this.value && rechargePlans[this.value]) {
        plansGrid.innerHTML = rechargePlans[this.value].map(p => `
            <button class="plan-card text-left p-4 rounded-xl bg-slate-900/60 border border-white/15 hover:border-amber-300" onclick="selectPlan(${p.id})">
                <div class="text-lg font-bold text-amber-400 mb-2">₹${p.price}</div>
                <p class="text-sm font-semibold mb-2">${p.name}</p>
                <p class="text-xs text-slate-400">${p.data} • ${p.validity} days</p>
            </button>
        `).join('');
    }
    updateButton();
});

circleSelect.addEventListener('change', function() {
    rechargeData.circle = this.value;
    document.getElementById('summaryCircle').textContent = this.options[this.selectedIndex].text || '—';
    updateButton();
});

window.selectPlan = function(id) {
    const plan = Object.values(rechargePlans).flat().find(p => p.id === id);
    rechargeData.selectedPlan = plan;
    document.getElementById('summaryPlan').textContent = `${plan.name} (${plan.data})`;
    document.getElementById('summaryPrice').textContent = `₹${plan.price}`;
    updateButton();
};

function updateButton() {
    const valid = phoneRegex.test(rechargeData.mobile) && rechargeData.operator && rechargeData.circle && rechargeData.selectedPlan;
    confirmBtn.disabled = !valid;
}

confirmBtn.addEventListener('click', () => {
    document.getElementById('modalNumber').textContent = rechargeData.mobile;
    document.getElementById('modalOperator').textContent = rechargeData.operator.toUpperCase();
    document.getElementById('modalAmount').textContent = `₹${rechargeData.selectedPlan.price}`;
    modal.classList.remove('hidden');
});

document.getElementById('closeModal').addEventListener('click', () => modal.classList.add('hidden'));
document.getElementById('cancelRecharge').addEventListener('click', () => modal.classList.add('hidden'));

document.getElementById('submitRecharge').addEventListener('click', function() {
    const history = JSON.parse(localStorage.getItem('rechargeHistory') || '[]');
    history.unshift({
        id: Date.now(), date: new Date().toISOString(), mobile: rechargeData.mobile,
        operator: rechargeData.operator, plan: rechargeData.selectedPlan.name,
        amount: rechargeData.selectedPlan.price, status: 'success'
    });
    localStorage.setItem('rechargeHistory', JSON.stringify(history));
    this.textContent = 'Success!';
    setTimeout(() => window.location.href = 'dashboard.html', 1500);
});
