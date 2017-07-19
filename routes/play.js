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

module.exports = router;