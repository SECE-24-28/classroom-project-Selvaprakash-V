const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");

router.post("/", transactionController.createTransaction);
router.get("/", transactionController.getAllTransactions);
router.get("/user/:userId", transactionController.getTransactionsByUser);
router.get("/:id", transactionController.getTransactionById);
router.put("/:id", transactionController.updateTransactionStatus);
router.delete("/:id", transactionController.deleteTransaction);

module.exports = router;

