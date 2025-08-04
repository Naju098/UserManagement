const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://127.0.0.1:27017/user_management" // connecting mongo shell to user_management db
);

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const config = require("./config/config.js");
const auth = require("./middleware/auth.js");
const path = require("path");
const expresslayout = require("express-ejs-layouts");
const nocache = require("nocache");
app.set("views", "./views");


app.use(
  session({
    name: "najuma.sid",
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(nocache());
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.use(expresslayout);
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

//for user routes
const userRoute = require("./routes/userRoute.js");
app.use("/", userRoute);

//for admin routes
const adminRoute = require("./routes/adminRoute");
app.use("/admin", adminRoute);

app.listen(3005, () => {
  console.log("server is running on port 3005...");
});
