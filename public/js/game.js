// var score = 0;
// var questionCount = 0;

// $(document).ready(function() {
    
// });

// var doQuiz = {
    
//     checkAnswer: function() {
//         console.log(randomQuestion);
//         event.preventDefault();
//         var playerResponse = $("#response").val();
//         console.log(playerResponse);
//         $("#answer").val("");
//     }
    
// };



// var quizController = {
    
//     initializeQuiz: function() {
//         var score = 0, askedCount = 0;
//     },
    
//     getQuestion: function() {
        
//     },
    
//     // getQuestion: function() {
//     //     Question.findOneRandom(function(err, randomQuestion){
//     //         if(err){
//     //             req.flash("error",err.message);
//     //         } else {
//     //             $("#question".val(randomQuestion.question));
//     //         }
//     // },
    
//     getAnswer: function() {
//         event.preventDefault();
//         $("#answerButton").prop("disabled", true);
//         playerResponse = $("#answer").val().toLowerCase();
//         $("#answer#").val("");
//         quizController.checkAnswer(playerResponse);
//     },
    
//     checkAnswer: function(playerResponse) {
//         if ($.inArray(playerResponse, correctAnswer)) {
//             quizController.handleCorrectResponse();
//         } else {
//             quizController.handleIncorrectResponse();
//         }
//     },
    
//     handleCorrectResponse: function() {
//         correctAnswer++;
//         alert("Correct!");
//     }
    
// }