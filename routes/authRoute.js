const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/checkAuth");

const router = express.Router();

router.get("/login", forwardAuthenticated, (req, res) => res.render("login"));

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
  })
);


// ----------------------- Github Login Route ----------------------------------------

router.get ("/github",
  passport.authenticate("github", { 
    scope: ["user:email"]})
);

// Github callback route
router.get("/github/callback",
  passport.authenticate("github", { failureRedirect: "/auth/login"}),
  (req, res) => {
    res.redirect('/dashboard')
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/auth/login");
});

module.exports = router;
