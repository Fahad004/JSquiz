// Muhammad Fahad    JavaScript comment
// Project 4
// Due Date: Nov 7
// Submission Date: Nov 7

// Define contents as a global variable.
var contents;

function readSingleFile(event) {

    // Obtain the single uploaded file.

    var f = event.target.files[0];

    if (f) {

        var r = new FileReader();

        r.onload = function (e) {

            contents = e.target.result;

        }

        r.readAsText(f);

    }

    else {

        alert("Failed to load file");

    }

}

// Click event handler for all riddles.

function showAnswer(event) {

    var spanTag = event.target;

    var answerId = "a" + spanTag.id.charAt(1);

    var answer = document.getElementById(answerId);

    answer.style.display = "block"

}

function computeScore() {

    var correctAnswers = {};
    correctAnswers = JSON.parse(contents);
    var right_index = [];
    var wrong_answers = [];
    var numCorrect = 0;

    for (let i = 1; i <= 5; i++) {

        for (let j = 1; j <= 3; j++) {

            var rb = document.getElementById("" + i + j);
            console.log(rb);
            if (rb.checked == true && rb.value == correctAnswers[i - 1].answer) {
                right_index.push(i - 1);
                numCorrect++;
            }
            else if (rb.checked == true && rb.value != correctAnswers[i - 1].answer) {
                wrong_answers.push(rb.value);
            }
        }
    }
    var output = document.getElementById("output");
    var questions = document.getElementById("questions");
    questions.style.display = "none";
    output.style.display = "block";
    let disp = "Total Number of Correct Answers Given - " + numCorrect;
    disp += "<br><br>Correct Answer Key - <br>";
    for (let i = 0; i < 5; i++) {
        disp += correctAnswers[i].answer + "<br>";
    }
    disp += "<br><br>Your Correct Answers - <br>";
    for (let i = 0; i < right_index.length; i++) {
        disp += "<img src='right.png' /> " + correctAnswers[right_index[i]].answer + "<br>";
    }
    disp += "<br><br>Wrong Answers Given - <br>";
    for (let i = 0; i < wrong_answers.length; i++) {
        disp += "<img src='wrong.png' /> " + wrong_answers[i] + "<br>";
    }
    document.getElementById("numcorrect").innerHTML = disp;
}

// Attach event handlers

function init() {
    // Upload file synchronously.
    document.getElementById("file").
    addEventListener("change", readSingleFile,false);
    var span1 = document.getElementById("r1");
    span1.addEventListener("click", showAnswer);
    var span2 = document.getElementById("r2");
    span2.addEventListener("click", showAnswer);
    var span3 = document.getElementById("r3");
    span3.addEventListener("click", showAnswer);
    var span4 = document.getElementById("r4");
    span4.addEventListener("click", showAnswer);
    var span5 = document.getElementById("r5");
    span5.addEventListener("click", showAnswer);
    var button = document.getElementById("btn1");
    button.onclick = computeScore;
}

// Invoke init method
window.addEventListener("load", init);