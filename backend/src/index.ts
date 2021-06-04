import express from "express";

const app = express();
const bodyParser = require("body-parser");
const routes = require("./routes");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use("/api", routes);

const server = app.listen(3001, () =>
  console.log("🚀 Server ready at: http://localhost:3001")
);
