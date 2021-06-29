var scoreDisplayEl = document.getElementById("score-display");
var deleteScoreEl = document.getElementById("delete-score")
var backBtnEL = document.getElementById("back-btn")
var scoreLink = document.getElementById("score-link")


var removeScore = function () {
    localStorage.clear();
}
deleteScoreEl.addEventListener("click", removeScore)


var getData = function () {
    var stats = JSON.parse(localStorage.getItem("totalScore"));

    if (stats === null) {
        return;
    }
    for (var i = 0; stats.length; i++) {
        stats[i];
        var scoreEl = document.createElement("p")
        scoreEl.textContent = stats[i].playerName + " " + stats[i].score;
        scoreDisplayEl.append(scoreEl);

    }
};
getData();

