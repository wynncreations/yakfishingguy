const express   = require('express');
const router    = express.Router();
const passport  = require("passport");
const User      = require("../models/user");

router.get('/',(req,res) => {
  //console.log(req.currentUser);
  res.render('login')
});
//Login
router.post("/",(req,res)=>{
  passport.authenticate("local",{},()=>{

  });
});

router.get("/logout",(req,res)=>{
  req.logout();
  res.redirect("/");
});

module.exports = router;