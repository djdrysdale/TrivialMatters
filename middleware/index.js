var middlewareObj               = {},
    Question                    = require("../models/question"),
    User                        = require("../models/user");
    
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You need to be logged in to do that.");
    res.redirect("/login");
};

middlewareObj.checkQuestionOwnership= function(req, res, next){
    // is the user logged in at all?
    if(req.isAuthenticated()){

        Question.findById(req.params.id, function(err, foundQuestion){
           if(err){
               req.flash("error","Question not found.");
               res.redirect("/");
           } else {
                // may the user edit the question?
                if(currentUser.admin || foundQuestion.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error","You do not have permission to do that.");
                    res.redirect("back");
                }
           }
        });
    } else {
        req.flash("error","You must be logged in to do that.");
        res.redirect("back");
    }
};

module.exports = middlewareObj;