var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    User = require("./models/user"),
    flash = require("connect-flash");
    request = require("request");

var options = {
    useNewUrlParser: true
};

require("dotenv").config();
// mongoose.connect(process.env.DEVURL, options, (err, resp) => {
//   if(err) console.warn('There was an error connecting to the database:', err)
//   // mongoose.connection.db.dropDatabase();
// });

var indexRoute = require("./routes/index");
var loginRoute = require("./routes/login");
var authRoute = require("./routes/auth");
var userRoute = require("./routes/user");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(flash()); //include flash config so we can do some messages

//seedDB();
//Passort config
app.use(require("express-session")({
    secret: "omg yes please work!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

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
app.use('/login', loginRoute);
app.use('/auth', authRoute);
app.use('/user', userRoute);


//process.env.PORT
app.listen(process.env.PORT || 3000, function () {
    console.log("Loading the Yak on the car...Done");
});