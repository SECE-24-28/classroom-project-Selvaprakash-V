const { plans } = require("../models/planModel");


exports.createPlan = (req, res) => {
  const newPlan = {
    id: plans.length + 1,
    provider: req.body.provider,
    planName: req.body.planName,
    price:req.body.price,
    date:req.body.date,
    validity:req.body.validity,
    addOns:req.body.addOns
  };

  plans.push(newPlan);
  res.status(201).json(newPlan);
};

// READ ALL
exports.getAllPlans = (req, res) => {
  res.json(plans);
};

// READ ONE
exports.getPlanById = (req, res) => {
  const plan = plans.find((p) => p.id == req.params.id);

  if (!plan) return res.status(404).json({ message: "plan not found" });

  res.json(plan);
};

// UPDATE
exports.updatePlan = (req, res) => {
  const plan = plans.find((p) => p.id == req.params.id);

  if (!plan) return res.status(404).json({ message: "plan not found" });

  plan.planName = req.body.planName;
  plan.price = req.body.price;

  res.json({ message: "plan updated", plan });
};

// DELETE
exports.deletePlans = (req, res) => {
  const index = plans.findIndex((p) => p.id == req.params.id);

  if (index === -1)
    return res.status(404).json({ message: "plan not found" });

  plans.splice(index, 1);

  res.json({ message: "plan deleted" });
};