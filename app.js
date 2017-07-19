var express 	            = require("express"),
    app                     = express(),
	passport                = require("passport"),
	bodyParser	            = require("body-parser"),
	methodOverride          = require("method-override"),
	flash                   = require("connect-flash"),
	mongoose	            = require("mongoose"),
	User                    = require("./models/user"),
	Question                = require("./models/question"),
	LocalStrategy           = require("passport-local"),
	passportLocalMongoose   = require("passport-local-mongoose");
	
	
var questionRoutes          = require("./routes/questions.js"),
    indexRoutes             = require("./routes/index.js"),
    playRoutes              = require("./routes/play.js");

// Configuration
mongoose.connect("mongodb://localhost/trivia");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(flash());


// Passport Configuration
app.use(require("express-session")({
    secret: "PurpleMonkeyDishwasher",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// app configuration
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

app.use("/questions", questionRoutes);
app.use("/play", playRoutes);
app.use("/", indexRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is running."); 
});


