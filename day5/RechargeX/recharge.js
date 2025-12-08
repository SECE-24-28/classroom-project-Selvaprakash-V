
function getPlans() {
    fetch('https://6932771ce5a9e342d26f4026.mockapi.io/recharge/plans')
        .then(response => response.json())
        .then(data => {
            console.log('Plans received:', data);
            showPlans(data);
        })
        .catch(error => {
            console.log('Error:', error);
            
        });
}

function showPlans(plans) {
    let container = document.getElementById('plansContainer');
    container.innerHTML = '';
    
    for (let i = 0; i < plans.length; i++) {
        let plan = plans[i];
        
        let card = document.createElement('div');
        card.className = 'bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 border border-orange-500 hover:shadow-lg hover:shadow-orange-500 transition';
        
        card.innerHTML = `
            <h3 class="text-2xl font-bold text-orange-500 mb-2">₹${plan.Price}</h3>
            <p class="text-gray-400 text-lg font-semibold mb-6">${plan.PlanName}</p>
            
            <p class="text-white mb-2"><strong>Validity:</strong> ${plan.Validity} Days</p>
            <p class="text-gray-300 mb-2"><strong>Data:</strong> ${plan.Data} GB</p>
            <p class="text-gray-300 mb-6"><strong>Add-ons:</strong> ${plan.AddOns}</p>
            
            <button class="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition rechargeBtn">
                Recharge Now
            </button>
        `;
        
        container.appendChild(card);
    }
    
    let buttons = document.querySelectorAll('.rechargeBtn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            showSuccessModal();
        });
    });
}

function showSuccessModal() {
    let modal = document.getElementById('successModal');
    modal.classList.remove('hidden');
}

function closeSuccessModal() {
    let modal = document.getElementById('successModal');
    modal.classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded');
    getPlans();
});
