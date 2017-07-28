var     express             = require("express"),
        router              = express.Router(),
        async               = require('async'),
        Question            = require("../models/question.js");
        
var score = 0;
var questionCount = 0;
var questions = new Array;

getQuestions(function(err, quiz){
    questionCount = 0;
    if(err) {
        console.log(err);
    } else {
        questions = quiz;
    }
});
        
// Quiz Home

router.get("/", function(req, res){

    if(questionCount <= questions.length){
        res.render("play/play", {count:questionCount,playerScore:score,randomQuestion:questions[questionCount]});
    } else {
        var playerScore = score;
        initQuiz();
        res.render("play/finish", {playerScore:playerScore});
    }
});

router.post("/", function(req,res){
    
    questionCount++;
    Question.findById(req.body.questionID, function(err, foundQuestion){
        req.body.response = req.body.response.toLowerCase();
        
        if(err) {
            req.flash("error",err);
        } else {

            if(foundQuestion.answer.indexOf(req.body.response) > -1){
                setScore();
                req.flash("success", "That is the correct answer!");
                res.redirect("/play" );
            } else {
                req.flash("error", "That response was incorrect. The correct answer is " + foundQuestion.answer[0] + ".");
                res.redirect("/play" );
            }
        }
    });
});

// router.post("/", function(req,res){
    
//     questionCount++;
//     Question.findById(req.body.questionID, function(err, foundQuestion){
//         req.body.response = req.body.response.toLowerCase();
        
//         if(err) {
//             req.flash("error",err);
//         } else {
//             if(foundQuestion.answer.indexOf(req.body.response) > -1){
//                 setScore();
//                 req.flash("success", "That is the correct answer!");
//                 res.redirect("/play" );
//             } else {
//                 req.flash("error", "That response was incorrect. The correct answer is " + foundQuestion.answer[0] + ".");
//                 res.redirect("/play" );
//             }
//         }
//     });
// });


// router.get("/q/", function(req,res){
    
//     getQuestions(function(err, quiz) {
//         if(err){
//             req.flash("error", err.message);
//             res.redirect("back");
//         }
//         console.log(quiz);
//         res.render("play/play2", {quiz:quiz});
//     });
// });


function getQuestions(cb) {
    
    var quiz = new Array();
    
    const dummyArray = new Array(10);
    
    async.eachSeries(dummyArray, function(ignored, done){
        Question.findOneRandom(function(err, randomQuestion){
            if(err){
                done(err);
            } else {
                if(!containsObject(randomQuestion, quiz)) {
                    quiz.push(randomQuestion);
                } else {
                    
                }
                
                done();
            } 
        });
    }, function(err) {
        if(err) return cb(err);
        cb(null, quiz);
    });
}


function containsObject(obj, list){
    for (var i = 0; i < list.length; i++){
        if (list[i].question === obj.question) {
            return true;
        }
    }
    return false;
}


function setScore(){
    score++;
}

function initQuiz(){
    score = 0;
    questionCount = 0;
    questions = new Array;
    getQuestions(function(err, quiz){
    questionCount = 0;
    
    if(err) {
        console.log(err);
    } else {
        questions = quiz;
    }
});
    
}

module.exports = router;