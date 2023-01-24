// >Importing express for server
const express = require("express");

// >Importing dotenv for safegaurding the port server
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");

const Router = require("./routes/route");

const cors = require("cors");

const app = express();
// meta functions
app.use(cors());
// app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(express.json());

const connectDB = require("./config/db");
dotenv.config();
const PORT = process.env.PORT || 8080;
app.use("/", Router);

app.listen(PORT, async () => {
  connectDB();

  console.log(`Server Runs in Port ${PORT}`);
});

// var bodyParser = require('body-parser');
