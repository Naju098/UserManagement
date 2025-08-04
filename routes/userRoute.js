const express = require("express");
const user_route = express.Router();
const auth = require("../middleware/auth");

const {
  insertUser,
  loadRegister,
  loginLoad,
  verifyLogin,
  loadHome,
  userLogout,
} = require("../controllers/userController");


user_route.get("/register", auth.isLogout, loadRegister);
user_route.post("/register",auth.isLogout, insertUser);
user_route.get("/login", auth.isLogout, loginLoad);
user_route.post("/login",auth.isLogout, verifyLogin);
user_route.get('/home', auth.isLogin, loadHome);
user_route.get("/", auth.isLogout, loginLoad);
user_route.get("/logout", auth.isLogin, userLogout);

module.exports = user_route;
