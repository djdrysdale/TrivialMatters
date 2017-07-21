var initialize                  = {},
    Question                    = require("../models/question");

initialize.start = function() {

    score = 0;
    questionsAsked = 0;
    questionTracker = [];
    
    Question.find({},function(err,questionList){
        if(err){
            console.log(err);
        } else {
            questionList.forEach(function(question){
                questionTracker.push(0);
            });
        }
        console.log(questionTracker);
        console.log(questionsAsked);
    });
};  

module.exports = initialize;