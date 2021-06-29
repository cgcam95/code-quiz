var startGameBtn = document.getElementById("start-button");
var introContainer = document.getElementById("intro");
var questionContainer = document.getElementById("question-container");
var currentIndex = 0;
var questionDisplay = document.getElementById("question");
var answerButtonEl = document.getElementById("answer-button");
var popup = document.getElementById("popup");
var timerEl = document.getElementById("countDown");
var GameEndEL = document.getElementById("game-end");
var finalScore = document.getElementById("final-score-is");
var submitBtnEl = document.getElementById("submit-button");
var nameOfPlayerEl = document.getElementById("player-name");


var questions = [
    {
    question: "what color is the sky?",
    answers: [
        {   text: "Blue", correct: true},
        {   text: "Purple", correct: false},
        {   text: "Green", correct: false},
        {   text: "Yellow", correct: false},
    ],
},

{
    question: "How many States are in the United States?",
    answers: [
        {   text: "3", correct: false},
        {   text: "365", correct: false},
        {   text: "80", correct: false},
        {   text: "50", correct: true},
    ],
}, 
{
    question: "What temperature does water boil?",
    answers: [
        {   text: "100", correct: false},
        {   text: "850", correct: false},
        {   text: "212", correct: true},
        {   text: "90", correct: false},
    ],
},    
{
    question: "what temperature does water freeze?",
    answers: [
        {   text: "32", correct: true},
        {   text: "60", correct: false},
        {   text: "-50", correct: false},
        {   text: "20", correct: false},
    ],
},    
{
    question: "What is the largest animal in the world?",
    answers: [
        {   text: "Elephant", correct: false},
        {   text: "Blue Whale", correct: true},
        {   text: "Monkey", correct: false},
        {   text: "Rat", correct: false},
    ],
},
];

var startGame = function() {
    console.log("function works");
    introContainer.classList.add("hide");
    questionContainer.classList.remove("hide")
    questionDisplay.textContent = questions[currentIndex].question;
    createAnswer();
    countDown();
};

var createAnswer = function(){
    answerButtonEl.innerHTML = "";
    for(var i = 0; i<questions[currentIndex].answers.length; i++){
        ansButton = document.createElement("Button");
        ansButton.classList.add("#btn");
        ansButton.textContent = questions[currentIndex].answers[i].text;
        if(questions[currentIndex].answers[i].correct){
            ansButton.setAttribute("id", "true");
        }
        ansButton.addEventListener("click", nextQuestion);
        answerButtonEl.append(ansButton);
    }
}

var nextQuestion = function(){
    if(this.getAttribute("id") === "true") {
        popup.classList.remove("hide")
        popup.textContent = "Correct"
    } else {
        popup.classList.remove("hide")
        popup.textContent = "Incorrect"
        timeLeft = timeLeft - 15;
    }
    currentIndex++;
    if (currentIndex < questions.length) {
        questionDisplay.textContent = questions[currentIndex].question;
        createAnswer();
    } else {
        gameEnd();
    }
};
var timeLeft = questions.length * 15
var timeInterval;

var countDown = function () {
    timeInterval = setInterval(function () {
        if (timeLeft > 1) {
            timerEl.textContent = "Time:" + timeLeft;
            timeLeft--;
        } else if (timeLeft === 1) {
            timerEl.textContent = "Time:" + timeLeft;
            timeLeft--;
        } else {
            timerEl.textContent = "Time: 0"
            alert("Time is up!");
            clearInterval(timeInterval);
            gameEnd();
        }

    }, 1000);
};

var gameEnd = function () {
    console.log("This is the end of the game!")
    score = timeLeft;
    clearInterval(timeInterval);
    questionContainer.classList.add("hide")
    GameEndEL.classList.remove("hide")
    finalScore.textContent = "Your Score is " + score;
    console.log(score)
};

var saveScore = function (event) {
    console.log("submit btn works")
    event.preventDefault();
    totalScore = JSON.parse(localStorage.getItem("totalScore")) || [];
    var playerName = document.getElementById("player-name").value;
    var newScore = {
        playerName: playerName,
        score: score
    };

    if (playerName === "") {
        alert("Name cannot be blank")
    } else {
        totalScore.push(newScore)
        localStorage.setItem("totalScore", JSON.stringify(totalScore))
    }
};

submitBtnEl.addEventListener("click", saveScore);
startGameBtn.addEventListener("click", startGame)