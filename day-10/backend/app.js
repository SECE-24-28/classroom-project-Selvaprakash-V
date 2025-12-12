const express = require("express");
const app = express();
const port=3000;
app.use(express.json());

const planRoute=require("./src/routes/planRoute");
app.use("/plans", planRoute);

app.listen(port, () => {
  console.log("Server running on port 3000");
});
