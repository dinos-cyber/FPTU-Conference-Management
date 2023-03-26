import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoute from "./route/web";
import connectDB from "./config/connectDB";
import bodyParser from "body-parser";
// import router from "./route/web";
import path from "path";

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// configViewEngine(app);
connectDB();
initWebRoute(app);

// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json


app.listen(port, () => {
  console.log(`Express app running at http://localhost/${port} ✅`);
});
