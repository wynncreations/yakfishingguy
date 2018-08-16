var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    User = require("./models/user"),
    flash = require("connect-flash");

var options = {
    useNewUrlParser: true
};

    require("dotenv").config();
//mongoose.connect(process.env.DEVURL, options, function () {
//     //mongoose.connection.db.dropDatabase();
 //});

var indexRoute = require("./routes/index");

app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + "/public"));

app.use(flash()); //include flash config so we can do     some messages

//seedDB();
//Passort config
app.use(require("express-session")({
    secret: "omg yes please work!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
//passport.use(new LocalStrategy(User.authenticate()));
//passport.serializeUser(User.serializeUser());
//passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
    //console.log(req.user);
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

/*
    Tell app which routes we can use.
*/

app.use(indexRoute);

app.listen(process.env.PORT, function () {
    console.log("Loading the Yak on the car...Done");
});