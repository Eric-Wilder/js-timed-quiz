var highScore = [];

function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }

    this.questionIndex++;
}

Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}


function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}


function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

       
    }
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};


document.addEventListener('DOMContentLoaded', () => {
    const timeLeftDisplay = document.querySelector('#time-left')
    timeLeft = 30

    function countDown() {
        setInterval(function(){
            if(timeLeft <= 0 ) {
                clearInterval(timeLeft = 0)
            }
            
            timeLeftDisplay.innerHTML = timeLeft
            timeLeft -= 1
        }, 1000)
    }
    countDown();
    
});

function showScores(highScore) {
    var gameOverHTML = "<h1>Score</h1>";
    gameOverHTML += "<h2 id='score'> Your score is: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
    index = 0;
    highScore[index] = quiz.score;
    index++;
    for (i = 0; i < highScore.length; i++) {
        var highest = 0
        if (highScore[i] > highest) {
            highest = highScore[i];
        }
    }
    gameOverHTML += "<h2 id='score'> High score: " + highest + "</h2>";
};

var questions = [
    new Question("Where is the best place to post JavaScript?", ["Start of body tag", "End of body tag","In the header", "In the footer"], "End of body tag"),
    new Question("How to you call a function?", ["callFunction;", "callFunction[];", "callFunction{};", "callFunction();"], "callFunction();"),
    new Question("Which symbol(s) is asssociated with an array?", [";", "()","[]", "{}"], "[]"),
 ];

var quiz = new Quiz(questions);

populate();