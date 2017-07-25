var     express                 = require("express"),
        router                  = express.Router(),
        middleware              = require("../middleware"),
        Question                = require("../models/question.js");

//index route
router.get("/", middleware.isLoggedIn, function(req,res){
    
    Question.find({}, function(err, allQuestions){
    	if(err){
    		req.flash("error", err.message);
    	} else {
    		res.render("questions/index", {questions:allQuestions});
    	}
    });
});


//New route
router.get("/new", middleware.isLoggedIn, function(req,res){
    res.render("questions/new");
});

//Create route
router.post("/", function(req, res){

    var count = 0;
    req.body.question.answer.forEach(function(answer){
        req.body.question.answer[count] = answer.toLowerCase();
        count++;
    });
	Question.create(req.body.question, function(err, newQuestion){
		if(err){
		    req.flash("error",err.message);
			res.render("questions/new");
		} else {
		    newQuestion.author.id = req.user.id;
		    newQuestion.author.username = req.user.username;
		    newQuestion.save();
		    req.flash("success","Your question has been added.");
			res.redirect("questions");
		}
	});
});

router.get("/category/:category", middleware.isLoggedIn, function(req,res){
    
    Question.find({category: req.params.category}, function(err, filteredQuestions){
        if(err){
            req.flash("error", err.message);
        } else {
            res.render("questions/index", {questions:filteredQuestions});
        }
    });
});


//Show route
router.get("/:id", middleware.isLoggedIn, function(req, res){
	Question.findById(req.params.id, function(err, foundQuestion){
		if(err){
			req.flash("error","You need to be logged in to do that.");
			req.redirect("back");
		} else {

			res.render("questions/show", {question: foundQuestion});
		}
	});
});



//Edit Route
router.get("/:id/edit", middleware.isLoggedIn, function(req, res){
    Question.findById(req.params.id, function(err, foundQuestion){
        if(err){
            req.flash("error","You need to be logged in to do that.");
            res.redirect("back");
        } else {
            res.render("questions/edit", {question: foundQuestion});
        }
    });
});

//Update Route

router.put("/:id", middleware.isLoggedIn, function(req, res){
    
        var count = 0;
        req.body.question.answer.forEach(function(answer){
            req.body.question.answer[count] = req.body.question.answer[count].toLowerCase();
            count++;
        });
    Question.findByIdAndUpdate(req.params.id, req.body.question, function(err, updatedQuestion){
        if(err){
            req.flash("error", "You need to be logged in to do that.");
            res.redirect("back");
        } else {
            req.flash("success","Question updated.");
            res.redirect("/questions");
        }
    });
}); 

//Destroy route
router.delete("/:id", middleware.isLoggedIn, function(req, res){
    Question.findByIdAndRemove(req.params.id, function(err, deletedQuestion){
        if(err){
            req.flash("error","You need to be logged in to do that.");
        } else {
            req.flash("success","Question deleted.");
            res.redirect("/questions");
        }
    });
});


module.exports = router;