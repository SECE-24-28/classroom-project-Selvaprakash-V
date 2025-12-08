const allPlans = [
    { id: 1, operator: 'airtel', price: 199, data: '2 GB/Day', validity: 28, speed: '4G', popular: true, name: 'Data Booster' },
    { id: 2, operator: 'airtel', price: 299, data: '1.5 GB/Day', validity: 56, speed: '4G', name: 'Long Duration' },
    { id: 3, operator: 'airtel', price: 479, data: '2 GB/Day', validity: 56, speed: '4G', popular: true, name: 'Premium' },
    { id: 4, operator: 'jio', price: 239, data: '2 GB/Day', validity: 28, speed: '4G', popular: true, name: 'JioPhone' },
    { id: 5, operator: 'jio', price: 349, data: '2 GB/Day', validity: 56, speed: '5G', name: '5G Unlimited' },
    { id: 6, operator: 'jio', price: 666, data: '1.5 GB/Day', validity: 84, speed: '5G', popular: true, name: '5G Annual' },
    { id: 7, operator: 'vi', price: 219, data: '1 GB/Day', validity: 28, speed: '4G', name: 'Basic' },
    { id: 8, operator: 'vi', price: 379, data: '2 GB/Day', validity: 56, speed: '4G', popular: true, name: 'Value Pack' },
    { id: 9, operator: 'bsnl', price: 99, data: '2 GB/Day', validity: 18, speed: '4G', name: 'Budget' },
    { id: 10, operator: 'bsnl', price: 187, data: '2 GB/Day', validity: 28, speed: '4G', popular: true, name: 'Value' }
];

const operatorSelect = document.getElementById('operatorSelect');
const priceFilter = document.getElementById('priceFilter');
const priceValue = document.getElementById('priceValue');
const resetBtn = document.getElementById('resetPlans');
const plansGrid = document.getElementById('plansGrid');
const plansCount = document.getElementById('plansCount');

let currentFilters = { operator: 'airtel', maxPrice: 2000 };

priceFilter.addEventListener('input', function() {
    priceValue.textContent = '₹' + this.value;
    currentFilters.maxPrice = parseInt(this.value);
    filterPlans();
});

operatorSelect.addEventListener('change', function() {
    currentFilters.operator = this.value;
    filterPlans();
});

resetBtn.addEventListener('click', function() {
    operatorSelect.value = 'airtel';
    priceFilter.value = 2000;
    priceValue.textContent = '₹2000';
    currentFilters = { operator: 'airtel', maxPrice: 2000 };
    filterPlans();
});

function filterPlans() {
    const filtered = allPlans.filter(p => p.operator === currentFilters.operator && p.price <= currentFilters.maxPrice);
    plansGrid.innerHTML = filtered.map(p => `
        <div class="bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 rounded-2xl p-6 hover:border-amber-300/50 transition">
            <div class="flex justify-between mb-4">
                <span class="text-2xl font-bold text-amber-400">₹${p.price}</span>
                ${p.popular ? '<span class="text-xs px-3 py-1 rounded-full bg-amber-500/20 text-amber-200">Popular</span>' : ''}
            </div>
            <h3 class="text-lg font-semibold mb-3">${p.name}</h3>
            <p class="text-sm text-slate-300 mb-4">📱 ${p.data} • ⏱️ ${p.validity}d • 🎯 ${p.speed}</p>
            <button class="w-full px-4 py-2 rounded-lg bg-amber-500/20 text-amber-200 border border-amber-500/30 hover:bg-amber-500/30" onclick="selectPlan(${p.id})">Select</button>
        </div>
    `).join('');
    plansCount.textContent = `${filtered.length} plan${filtered.length !== 1 ? 's' : ''}`;
}

window.selectPlan = function(id) {
    const plan = allPlans.find(p => p.id === id);
    localStorage.setItem('selectedPlan', JSON.stringify(plan));
    setTimeout(() => window.location.href = 'recharge.html', 500);
};

filterPlans();
