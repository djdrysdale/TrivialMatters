var     express             = require("express"),
        router              = express.Router(),
        passport            = require("passport"),
        User                = require("../models/user.js");

// Landing Page
router.get("/", function(req, res){
    res.render("home");
});

// ****************
// Auth Routes
// ****************
router.get("/register", function(req, res){
    res.render("register");
});

router.post("/register", function(req, res){
    User.register(new User({username: req.body.username, admin:req.body.admin}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            console.log(err.message.length);
            req.flash("error", err.message);
            return res.render("register");
        } else {
            passport.authenticate("local")(req,res,function(){
                req.flash("success", "Welcome to Trivial Matters, " + user.username);
                res.redirect("/questions");
            });
        }
    });
    
});

// ****************
// Login Routes
// ****************

// Render the login form
router.get("/login", function(req, res){
    res.render("login");
});

// login logic
router.post("/login", passport.authenticate("local", {
        successRedirect: "/questions",
        failureRedirect: "/register"
    }),function(req, res){
    
});

// login logic
router.post("/login", passport.authenticate("local", {
        successRedirect: "/secret",
        failureRedirect: "/login"
    }),function(req, res){
    
});

router.get("/logout", function(req,res){
    req.logout();
    req.flash("success", "You have been logged out.");
    res.redirect("/");
});


router.get("*", function(req,res){
    res.send("Move along. Nothing to see here!");
});

module.exports = router;