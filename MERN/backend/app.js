const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const env = require("./.env/env");

const User = require("./models/userModel");
const authRoutes = require("./routes/authRoutes")(User);
const userRoutes = require("./routes/userRoutes")(User);


const app = express();

mongoose
  .connect(
    "mongodb+srv://proc:" + 
    env.dbpw +
    "@proc.sfuco.mongodb.net/" +
    env.dbName +
    "?retryWrites=true&w=majority", 
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true
    }
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});


app.use("/api/test", (req, res)=>{res.send({'response': {'body': "test successful"}})})
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);


module.exports = app;
