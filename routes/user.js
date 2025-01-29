const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

router.get("/signup", (req, res) => {
  res.render("users/signup.ejs");
});

router.post("/signup", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      req.flash("error", "All fields are required");
      return res.redirect("/signup");
    }

    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);

    req.login(registeredUser,(err)=>{
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to WonderLust!");
      res.redirect("/listings");
  
    })

  } catch (e) {
    req.flash("success", e.message);
    console.log(e.message);
    res.redirect("/signup");
  }
});

router.get("/login", (req, res) => {
  res.render("users/login.ejs");
});

router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  async (req, res) => {
    req.flash("success","Welcome to wonderLust,  Login Successfull");
    let redirectUrl = res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl);
  }
);

router.get("/logout",(req,res,next)=>{
  req.logOut((err)=>{
    if (err) {
      return next(err)
    }
    req.flash("success","you are logout");
    res.redirect("/listings");
  });
});

module.exports = router;
