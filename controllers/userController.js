const bcrypt = require("bcrypt");
const User = require("../models/userModel.js");
const randomstring = require("randomstring");
const config = require("../config/config.js");

const securePassword = async (password) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  } catch (error) {
    console.log(error.message);
  }
};

const loadRegister = async (req, res) => {
  try {
    if (req.session.user_id) {
      return res.redirect("/home");
    }
    res.render("users/registration");
  } catch (error) {
    console.log(error.message);
  }
};

const insertUser = async (req, res) => {
  try {
    const spassword = await securePassword(req.body.password);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: spassword,
      is_admin: 0,
      is_verified: true,
    });

    const userData = await user.save();
    if (userData) {
      res.render("users/login", {
        message: "Your registration was successful. You can now log in.",
      });
    } else {
      res.render("users/registration", {
        message: "Your Registration has been failed.",
      });
    }
  } catch (error) {
    console.log(error);
    res.render("users/registration", {
      message: "Your Registration has been failed.",
    });
  }
};



//login
const loginLoad = async (req, res) => {
  try {
    if (req.session.user_id) {
      return res.redirect("/home");
    }
    res.render("users/login");
  } catch (error) {
    console.log(error.message);
  }
};

const verifyLogin = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const userData = await User.findOne({ email: email });

    if (userData) {
      const passwordMatch = await bcrypt.compare(password, userData.password);
      if (!userData.is_verified) {
        return res.render("users/login", {
          message:
            "Your account is not verified. Please wait for admin approval.",
        });
      }

      if (passwordMatch) {
        req.session.user_id = userData._id;
        res.redirect("/home");
      } else {
        res.render("users/login", { message: "Invalid Username and Password" });
      }

    } else {
      res.render("users/login", { message: "Invalid username and password" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const loadHome = async (req, res) => {
  try {
    
    const userData = await User.findById(req.session.user_id);

    res.render("users/home", { user: userData });
  } catch (error) {
    console.log(error.message);
    res.redirect('/login')
  }
};

const userLogout = async (req, res) => {
  try {
    req.session.user_id = null;
    if (!req.session.admin_id) {
      res.clearCookie('linto.sid');
    }
    res.redirect("/");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  insertUser,
  loginLoad,
  verifyLogin,
  loadHome,
  userLogout,
  loadRegister,
};
