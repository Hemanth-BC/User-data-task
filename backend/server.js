const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./router/userRoute.js");
const cors = require("cors");
const path = require("path");

dotenv.config();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("connected successfully");
    app.listen(process.env.PORT, (err) => {
      if (err) console.log(err);
      console.log("running successfully at", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log("error", error);
  });

app.get("/favicon.ico", (req, res) => res.status(204).end());
app.use(userRoute);
