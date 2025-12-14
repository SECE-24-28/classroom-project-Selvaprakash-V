const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");
const app = express();
const port = 3000;
const planRoutes = require("./src/routes/planRoute");
const userRoutes=require("./src/routes/userRoute");
const transactionRoutes = require("./src/routes/transactionRoutes");

connectDB();
app.use(cors());
app.use(express.json());

app.use("/plans", planRoutes);
app.use("/users", userRoutes);
app.use("/transactions", transactionRoutes);

app.listen(port, () => {
  console.log(`App2 listening at http://localhost:${port}`);
});

module.exports = app;