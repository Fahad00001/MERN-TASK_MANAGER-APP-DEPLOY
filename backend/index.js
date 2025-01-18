const express = require("express");

const app = express();
require("dotenv").config();

require("./Models/db");
const PORT = process.env.PORT || 8080;
const TaskRouter = require("./Routes/TaskRouter");
const bodyParser = require("body-parser");
const cors = require("cors");

app.get("/", (req, res) => {
  res.send("hello from server");
});

app.use(cors());
// middleware
app.use(bodyParser.json());
app.use("/tasks", TaskRouter);

app.listen(PORT, () => {
    console.log(`server is running on PORT ${PORT}`);
});
