var game                = {},        
    Question            = require("../models/question.js");


game.getQuestion = function(){
    Question.findOneRandom(function(err, randomQuestion){
        if(!err) {
            return randomQuestion;
        } else {
            console.log(err);
        }
    });
};




module.exports = router;