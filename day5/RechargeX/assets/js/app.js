// RechargeX front-end interactions (vanilla JS)

const fallbackCatalog = {
  airtel: [
    { id: "airtel-199", amount: 199, data: "1.5GB/day", validity: "28 days", description: "Unlimited calls + 100 SMS/day" },
    { id: "airtel-239", amount: 239, data: "1.5GB/day", validity: "28 days", description: "Bundled with Wynk Music" },
    { id: "airtel-299", amount: 299, data: "2GB/day", validity: "28 days", description: "OTT mini pack + calls" }
  ],
  jio: [
    { id: "jio-199", amount: 199, data: "1.5GB/day", validity: "23 days", description: "JioTV + JioCinema access" },
    { id: "jio-399", amount: 399, data: "2GB/day", validity: "28 days", description: "Disney+ Hotstar mobile" }
  ],
  vi: [
    { id: "vi-239", amount: 239, data: "1.5GB/day", validity: "28 days", description: "Binge all night + weekend rollover" },
    { id: "vi-299", amount: 299, data: "2GB/day", validity: "28 days", description: "Data heavy + calls" }
  ],
  bsnl: [
    { id: "bsnl-99", amount: 99, data: "1GB/day", validity: "18 days", description: "Budget voice + data" },
    { id: "bsnl-239", amount: 239, data: "2GB/day", validity: "30 days", description: "Monthly classic pack" }
  ]
};

let planCatalog = { ...fallbackCatalog };
let plansLoaded = false;
let plansPromise = null;

const select = (id) => document.getElementById(id);
const isValidEmail = (value) => /\S+@\S+\.\S+/.test(value.trim());
const isValidPhone = (value) => /^\d{10}$/.test(value.trim());
const isValidPassword = (value) => value.trim().length >= 6;

const normalizePlan = (plan) => {
  const amount = Number(plan.amount ?? plan.Price ?? plan.price ?? plan.Amount ?? 0);
  const data = plan.data ?? plan.Data ?? "1GB/day";
  const validity = plan.validity ?? plan.Validity ?? "28 days";
  const description = plan.description ?? plan.desc ?? "Talktime + data";
  const planName = plan.planName ?? plan.PlanName ?? plan.name ?? description;
  const addOns = plan.addOns ?? plan.AddOns ?? plan.addons ?? "—";
  const operator = (plan.operator || plan.Operator || plan.op || "airtel").toString().toLowerCase();
  return {
    id: plan.id || plan.Id || `${operator}-${Math.random().toString(36).slice(2, 7)}`,
    amount: amount || 0,
    data,
    validity,
    description,
    planName,
    addOns,
    operator
  };
};

const groupPlans = (plans) => {
  const grouped = {};
  plans.forEach((p) => {
    const normalized = normalizePlan(p);
    const key = normalized.operator || "airtel";
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(normalized);
  });
  return grouped;
};

async function fetchPlansFromApi() {
  if (plansLoaded) return planCatalog;
  if (plansPromise) return plansPromise;
  const url = "https://6932771ce5a9e342d26f4026.mockapi.io/recharge/plans";
  plansPromise = fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const grouped = groupPlans(Array.isArray(data) ? data : []);
      planCatalog = Object.keys(grouped).length ? grouped : fallbackCatalog;
      plansLoaded = true;
      return planCatalog;
    })
    .catch((err) => {
      console.warn("Plan API failed, using fallback", err);
      plansLoaded = true;
      planCatalog = { ...fallbackCatalog };
      return planCatalog;
    });
  return plansPromise;
}

const ensurePlansLoaded = (cb) => {
  fetchPlansFromApi().then(cb).catch(cb);
};

function renderPlanCards(plans, container, options = {}) {
  const { selectable = false, selectedId = null, onSelect = () => {} } = options;
  container.innerHTML = "";

  if (!plans.length) {
    container.innerHTML = `<div class="empty">No plans in this range yet.</div>`;
    return;
  }

  plans.forEach((plan) => {
    const card = document.createElement("div");
    const isActive = selectable && selectedId === plan.id;
    card.className = `plan-card ${isActive ? "active" : ""}`;
    card.innerHTML = `
      <div class="flex items-start justify-between">
        <div>
          <p class="text-sm text-slate-300">${plan.validity}</p>
          <p class="text-xl font-semibold text-white">₹${plan.amount}</p>
        </div>
        <span class="badge">${plan.data}</span>
      </div>
      <p class="text-sm text-slate-200 mt-2 font-semibold">${plan.planName || "Plan"}</p>
      <p class="text-sm text-slate-300">${plan.description}</p>
      <p class="text-xs text-slate-400 mt-2">Add-ons: <span class="text-slate-200">${plan.addOns || "—"}</span></p>
      ${selectable ? "<button class=\"choose\">Select</button>" : "<div class=\"mt-3 text-xs text-amber-200\">Data + voice combo</div>"}
    `;
    if (selectable) {
      card.addEventListener("click", () => onSelect(plan));
      const btn = card.querySelector(".choose");
      btn?.addEventListener("click", (e) => {
        e.stopPropagation();
        onSelect(plan);
      });
    }
    container.appendChild(card);
  });
}

function initPlansPage() {
  const root = select("plansPage");
  if (!root) return;
  const operatorSelect = select("operatorSelect");
  const priceFilter = select("priceFilter");
  const priceValue = select("priceValue");
  const plansGrid = select("plansGrid");
  const plansCount = select("plansCount");
  const resetBtn = select("resetPlans");
  const randomBtn = select("randomPlan");

  const updatePriceLabel = () => {
    priceValue.textContent = `₹${priceFilter.value}`;
  };

  const updatePlans = () => {
    const op = operatorSelect.value;
    const maxPrice = Number(priceFilter.value);
    const filtered = (planCatalog[op] || []).filter((p) => p.amount <= maxPrice);
    plansCount.textContent = `${filtered.length} plan${filtered.length === 1 ? "" : "s"}`;
    renderPlanCards(filtered, plansGrid);
  };

  const wireEvents = () => {
    operatorSelect.addEventListener("change", updatePlans);
    priceFilter.addEventListener("input", () => {
      updatePriceLabel();
      updatePlans();
    });
    resetBtn?.addEventListener("click", () => {
      operatorSelect.value = "airtel";
      priceFilter.value = 2000;
      updatePriceLabel();
      updatePlans();
    });
  };

  updatePriceLabel();
  wireEvents();
  ensurePlansLoaded(updatePlans);
}

function initRechargePage() {
  const root = select("rechargePage");
  if (!root) return;

  const mobile = select("rechargeMobile");
  const operator = select("rechargeOperator");
  const circle = select("rechargeCircle");
  const plansGrid = select("rechargePlansGrid");
  const formStatus = select("formStatus");
  const mobileError = select("mobileError");
  const openModalBtn = select("openConfirmModal");
  const clearBtn = select("clearRecharge");
  const selectedPlanHint = select("selectedPlanHint");
  const summary = {
    number: select("summaryNumber"),
    operator: select("summaryOperator"),
    circle: select("summaryCircle"),
    plan: select("summaryPlan")
  };
  const modal = select("confirmModal");
  const confirmDetails = select("confirmDetails");
  const closeModalBtn = select("closeModal");
  const cancelRechargeBtn = select("cancelRecharge");
  const confirmRechargeBtn = select("confirmRecharge");
  const successMessage = select("successMessage");

  let selectedPlan = null;

  const updateSummary = () => {
    summary.number.textContent = mobile.value || "—";
    summary.operator.textContent = operator.options[operator.selectedIndex].text;
    summary.circle.textContent = circle.options[circle.selectedIndex].text;
    summary.plan.textContent = selectedPlan ? `₹${selectedPlan.amount} • ${selectedPlan.data}` : "Select a plan";
  };

  const validateMobile = () => {
    const ok = isValidPhone(mobile.value);
    mobileError.classList.toggle("hidden", ok);
    formStatus.textContent = ok ? "Ready for selection" : "Awaiting input";
    return ok;
  };

  const updatePlans = () => {
    const op = operator.value;
    selectedPlan = null;
    openModalBtn.disabled = true;
    renderPlanCards(planCatalog[op] || [], plansGrid, {
      selectable: true,
      selectedId: null,
      onSelect: (plan) => {
        selectedPlan = plan;
        selectedPlanHint.textContent = `Selected ₹${plan.amount} • ${plan.data} (${plan.validity})`;
        openModalBtn.disabled = !validateMobile();
        renderPlanCards(planCatalog[op] || [], plansGrid, {
          selectable: true,
          selectedId: selectedPlan.id,
          onSelect: (p) => {
            selectedPlan = p;
            selectedPlanHint.textContent = `Selected ₹${p.amount} • ${p.data} (${p.validity})`;
            openModalBtn.disabled = !validateMobile();
            updateSummary();
          }
        });
        updateSummary();
      }
    });
    selectedPlanHint.textContent = "Select a plan to proceed.";
    updateSummary();
  };

  const resetForm = () => {
    mobile.value = "";
    operator.value = "airtel";
    circle.value = "delhi";
    selectedPlan = null;
    openModalBtn.disabled = true;
    successMessage.classList.add("hidden");
    updatePlans();
    validateMobile();
    updateSummary();
  };

  const openModal = () => {
    if (!validateMobile() || !selectedPlan) return;
    confirmDetails.innerHTML = `
      <div class="flex items-center justify-between"><span>Number</span><span>${mobile.value}</span></div>
      <div class="flex items-center justify-between"><span>Operator</span><span>${operator.value.toUpperCase()}</span></div>
      <div class="flex items-center justify-between"><span>Circle</span><span>${circle.options[circle.selectedIndex].text}</span></div>
      <div class="flex items-center justify-between font-semibold"><span>Plan</span><span>₹${selectedPlan.amount} • ${selectedPlan.data}</span></div>
      <p class="text-xs text-slate-300 pt-2">This is a mock confirmation. No payment is processed.</p>
    `;
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  };

  const closeModal = () => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  };

  const wireEvents = () => {
    mobile.addEventListener("input", () => {
      validateMobile();
      openModalBtn.disabled = !selectedPlan || !isValidPhone(mobile.value);
      updateSummary();
    });
    operator.addEventListener("change", updatePlans);
    circle.addEventListener("change", updateSummary);
    openModalBtn.addEventListener("click", openModal);
    clearBtn.addEventListener("click", resetForm);
    closeModalBtn?.addEventListener("click", closeModal);
    cancelRechargeBtn?.addEventListener("click", closeModal);
    modal?.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
    confirmRechargeBtn?.addEventListener("click", () => {
      successMessage.classList.remove("hidden");
      setTimeout(() => {
        closeModal();
        resetForm();
      }, 900);
    });
  };

  wireEvents();
  ensurePlansLoaded(() => {
    updatePlans();
    resetForm();
  });
}

function initRegisterForm() {
  const form = select("registerForm");
  if (!form) return;
  const nameInput = select("registerName");
  const emailInput = select("registerEmail");
  const phoneInput = select("registerPhone");
  const passInput = select("registerPassword");
  const passConfirmInput = select("registerPasswordConfirm");
  const successText = select("registerSuccess");
  const errorText = select("registerError");

  const errorMap = {
    registerNameError: (val) => val.trim().length >= 3,
    registerEmailError: isValidEmail,
    registerPhoneError: isValidPhone,
    registerPasswordError: isValidPassword,
    registerPasswordConfirmError: (val) => val === passInput.value && isValidPassword(val)
  };

  const showError = (id, show) => {
    const el = select(id);
    if (el) el.classList.toggle("hidden", !show);
  };

  const validateAll = () => {
    const validations = [
      { id: "registerNameError", ok: errorMap.registerNameError(nameInput.value) },
      { id: "registerEmailError", ok: errorMap.registerEmailError(emailInput.value) },
      { id: "registerPhoneError", ok: errorMap.registerPhoneError(phoneInput.value) },
      { id: "registerPasswordError", ok: errorMap.registerPasswordError(passInput.value) },
      { id: "registerPasswordConfirmError", ok: errorMap.registerPasswordConfirmError(passConfirmInput.value) }
    ];
    validations.forEach((item) => showError(item.id, !item.ok));
    return validations.every((v) => v.ok);
  };

  [nameInput, emailInput, phoneInput, passInput, passConfirmInput].forEach((input) => {
    input?.addEventListener("input", () => {
      validateAll();
      successText.classList.add("hidden");
      errorText.classList.add("hidden");
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validateAll()) return;
    successText.classList.remove("hidden");
    errorText.classList.add("hidden");
    setTimeout(() => {
      window.location.href = "recharge.html";
    }, 500);
  });
}

function initLoginForm() {
  const form = select("loginForm");
  if (!form) return;
  const emailInput = select("loginEmail");
  const passInput = select("loginPassword");
  const emailError = select("loginEmailError");
  const passError = select("loginPasswordError");
  const errorText = select("loginError");

  const validate = () => {
    const emailOk = isValidEmail(emailInput.value);
    const passOk = isValidPassword(passInput.value);
    emailError.classList.toggle("hidden", emailOk);
    passError.classList.toggle("hidden", passOk);
    return emailOk && passOk;
  };

  [emailInput, passInput].forEach((input) => {
    input?.addEventListener("input", () => {
      validate();
      errorText.classList.add("hidden");
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validate()) return;
    window.location.href = "recharge.html";
  });
}

function initApp() {
  initPlansPage();
  initRechargePage();
  initRegisterForm();
  initLoginForm();
}

document.addEventListener("DOMContentLoaded", initApp);
