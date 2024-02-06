// Event listener - wait for the DOM to finish loading
// Get button elements and add listeners

let timerInterval;
let timer = 10;
let userName;

document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.getElementsByTagName("button");
    for (let button of buttons) {
        button.addEventListener("click", function () {
            if (this.getAttribute("data-type") === "submit") {
                verifyAnswer();
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }
        });
    }
    document.getElementById('user-submit').style.display = 'none';
    document.getElementById("answer-box").addEventListener("keydown", function (event) {
        let userAnswer = parseInt(document.getElementById("answer-box").value);
        if (isNaN(userAnswer)) {
            document.getElementById('feedback').innerHTML = `You must enter a number in the answer box`;
            document.getElementById('submit').classList.add('button-disabled');
        } else {
            document.getElementById('submit').classList.remove('button-disabled');
            document.getElementById('feedback').innerHTML = '';
        }
        if (event.key === "Enter") {
            verifyAnswer();
        }

    });
    document.getElementById("username").addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            userName = this.value ? this.value : "Player";
            document.getElementById('feedback').innerHTML = `OK, ${userName}! Let the game begin!`;
            setTimeout(() => {
                document.getElementById('feedback').innerHTML = '';
            }, 2000);
        }
    });
});
/**
 * This main game loop is called when script is loaded
 *and after the answer is processed.
 */

let calculatedAnswer;
function runGame(gameType) {
    clearInterval(timerInterval);
    timer = 10;

    document.getElementById("answer-box").value = "";
    document.getElementById("answer-box").focus();

    // num1 and num2 creates two random numbers between 1 and 25
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType === "addition") {
        dispAddQuestion(num1, num2);
    } else if (gameType === "multiply") {
        dispMultQuestion(num1, num2);
    } else if (gameType === "subtract") {
        dispSubQuestion(num1, num2);
    } else if (gameType === "division") {
        dispDivQuestion(num1, num2);
    } else {
        alert(`Something amiss: ${gameType}`);
        throw `Something amiss: ${gameType}. Aborting`;
    }
    timerInterval = setInterval(function () {
        // Time will decrease by one each second
        timer--;
        // This will display time left
        document.getElementById('timer').innerHTML = timer;
        //When timer reaches 0
        if (timer <= 0) {
            document.getElementById('feedback').innerHTML = `Your time is up!`;
            setTimeout(() => {
                document.getElementById('feedback').innerHTML = '';
            }, 1000);
            clearInterval(timerInterval);
            incrementWrongAnswer();
            // A new question will initiate
            runGame(gameType);
            // This will reset the timer
            timer = 10;
        }

    }, 1000);

}

/**
 * Checks the user answer and returns a verification or the correct answer.
 */
function verifyAnswer() {
    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let calculatedAnswer = calcAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];
    let userNameInput = document.getElementById("username");
    userName = userNameInput.value ? userNameInput.value : "Player";
    if (isNaN(userAnswer)) {
        document.getElementById('feedback').innerHTML = `You must enter a number in the answer box, ${userName}!`;
        document.getElementById('submit').classList.add('button-disabled');
    } else {
        document.getElementById('submit').classList.remove('button-disabled');
        if (isCorrect) {
            document.getElementById('feedback').innerHTML = `You submitted the correct answer, ${userName}!`;
            incrementScore();
        } else {
            document.getElementById('feedback').innerHTML = `Your answer is ${userAnswer}, ${userName}. The correct answer is ${calculatedAnswer[0]}!`;
            incrementWrongAnswer();
        }
        /** 
         * Displays the feedback to the user for 3 seconds
         */
        setTimeout(() => {
            document.getElementById('feedback').innerHTML = '';
            runGame(calculatedAnswer[1]);
        }, 3000);
        clearInterval(timerInterval);
        // This will reset the timer
        timer = 10;
    }


}

function calcAnswer() {

    /**
     * Gets operands and operator from DOM and retuns the answer
     */
    let operand1 = parseInt(document.getElementById('operand1').innerText);
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById('operator').innerText;

    if (operator === "+") {
        return [operand1 + operand2, "addition"];
    } else if (operator === "x") {
        return [operand1 * operand2, "multiply"];
    } else if (operator === "-") {
        return [operand1 - operand2, "subtract"];
    } else if (operator === "/") {
        return [operand1 / operand2, "division"];
    } else {
        alert(`operator not implemented)${operator}`);
        throw `operator not implemented ${operator}. Aborting`;
    }

}
/**
 * Get the current score from the DOM and increments it by 1.
 */

function incrementScore() {

    let prevScore = parseInt(document.getElementById("score").innerText);
    document.getElementById("score").innerText = ++prevScore;
    if (prevScore >= 20) {
        document.getElementById('feedback').innerHTML = `Congratulations! You reached  ${prevScore} points ${userName}!`;
        setTimeout(() => {
            document.getElementById('feedback').innerHTML = '';
            resetGame();
        }, 3000);
    }
}

// This function resets the game

function resetGame() {
    clearInterval(timerInterval);
    timer = 10;
    document.getElementById("score").innerText = 0;
    document.getElementById("wrong").innerText = 0;
    document.getElementById("answer-box").value = "";
    document.getElementById("answer-box").focus();

}
/**
 * Get the current tally of the incorrect answers from the DOM and increments it by 1.
 */

function incrementWrongAnswer() {
    let prevWrong = parseInt(document.getElementById("wrong").innerText);
    document.getElementById("wrong").innerText = ++prevWrong;
    if (prevWrong >= 5) {
        document.getElementById('feedback').innerHTML = `You lost ${userName}! Better luck next time!`;
        setTimeout(() => {
            resetGame();
            document.getElementById('feedback').innerHTML = '';
        }, 5000);
    }
}

function dispAddQuestion(operand1, operand2) {

    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "+";

}

function dispSubQuestion(operand1, operand2) {

    document.getElementById('operand1').textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById('operand2').textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById('operator').textContent = "-";

}

function dispMultQuestion(operand1, operand2) {

    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "x";

}
function dispDivQuestion(operand1, operand2) {
    operand1 = operand1 * operand2;

    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "/";


}