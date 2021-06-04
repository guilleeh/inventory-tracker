import express from "express";

const app = express();
const bodyParser = require("body-parser");
const routes = require("./routes");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use("/api", routes);

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () =>
  console.log(`🚀 Server ready at port ${PORT}`)
);
