const express = require("express");
const admin_route = express.Router();
const { isLogin, isLogout } = require("../middleware/adminAuth");

const {
  loginLoad,
  verifyLogin,
  loadDashboard,
  adminLogout,
  adminDashboard,
  newUserLoad,
  addUser,
  editUser,
  updateUser,
  deleteUser,
} = require("../controllers/adminController");

admin_route.get("/", isLogout, loginLoad);
admin_route.post("/", verifyLogin);
admin_route.get("/home", isLogin, loadDashboard);
admin_route.get("/logout", isLogin, adminLogout);
admin_route.get("/dashboard", isLogin, adminDashboard);
admin_route.get("/new-user", isLogin, newUserLoad);
admin_route.post("/new-user", addUser);
admin_route.get("/edit-user", isLogin, editUser);
admin_route.post("/edit-user", updateUser);
admin_route.get("/delete-user", deleteUser);

admin_route.get("/*hello", function (req, res) {
  if (req.path !== "/") {
    res.redirect("/admin");
  } else {
    res.send("Path Not Found");
  }
});

module.exports = admin_route;
