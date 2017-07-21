var     express             = require("express"),
        router              = express.Router(),
        Question            = require("../models/question.js");
        
// Quiz Home
router.get("/", function(req,res){

        Question.findOneRandom(function(err, randomQuestion){
            if(err){
                req.flash("error",err.message);
            } else {
                res.render("play/play", {randomQuestion:randomQuestion});
            }
        });

});

router.post("/", function(req,res){
    Question.findById(req.body.questionID, function(err, foundQuestion){
        req.body.response = req.body.response.toLowerCase();
        if(err) {
            req.flash("error",err);
        } else {
            if(foundQuestion.answer.indexOf(req.body.response) > -1){
                req.flash("success", "That is the correct answer!");
                res.redirect("/play" );
            } else {
                req.flash("error", "That response was incorrect. The correct answer is " + foundQuestion.answer[0] + ".");
                res.redirect("/play" );
            }
        }
    });
});


module.exports = router;