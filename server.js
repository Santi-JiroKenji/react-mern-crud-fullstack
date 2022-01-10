const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
const students = require("./models/studentSchema");
const router = require("./routes/router");
const connectDB = require("./database/db");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");

// require("./database/db");
dotenv.config();
connectDB();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.json());

// app.get("/", (req, res) => {
//   res.json("server stated");
// });

app.use(cors());
app.use("/api/v1/students", router);

if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")))

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/client/build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Api running");
  });
}

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
