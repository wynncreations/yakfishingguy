const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const middleware = require("../middleware/");
const Auth = require('../models/auth')

router.get("/",(req,res)=>{
    res.render("blog");
});

router.get("/create",(req,res,next)=>{
    res.render("create");
});


module.exports = router;