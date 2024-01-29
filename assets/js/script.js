// Event listener - wait for the DOM to finish loading
// Get button elements and add listeners

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

    document.getElementById("answer-box").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            verifyAnswer();
        } 
    });

    runGame("addition");

});

/**
 * This main game loop is called when script is loaded
 *and after the answer is processed.
 */

function runGame(gameType) {

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
    
}
/**
 * countdown elements
 */
    let count_down = 10
    let count_down_element = document.getElementById('countDown')
    count_down_element.innerHTML = count_down
/**
 * This function will start the timer with the next question - not properly implemented yet
 */
function runTimer(){
    let timerInterval = setInterval(() => {
        count_down -=100
        count_down_element.innerHTML = count_down

        if (count_down == -10) {
            alert(`Game Over! You scored ${user_score} points`)
            location.reload()
            
        }


    },1000)
}

/**
 * Checks the user answer and returns a verification or the correct answer.
 */
function verifyAnswer() {
    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let calculatedAnswer = calcAnswer();
    let userName = document.getElementById("username").value;
    let isCorrect = userAnswer === calculatedAnswer[0];

    if (isCorrect) {
       
        document.getElementById('feedback').innerHTML = `You submitted the correct answer ${userName}!`;
        incrementScore();
    } else {
        
        document.getElementById('feedback').innerHTML = `Your answer is ${userAnswer} ${userName}. The correct answer should be ${calculatedAnswer[0]}!`;
        incrementWrongAnswer();
    }
    /** 
     * Displays the feedback to the user for 3 seconds
     */
    setTimeout(()=>{
        document.getElementById('feedback').innerHTML = '';
        runGame(calculatedAnswer[1]);
    }, 3000);

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
}
/**
 * Get the current tally of the incorrect answers from the DOM and increments it by 1.
 */

function incrementWrongAnswer() {
    let prevScore = parseInt(document.getElementById("wrong").innerText);
    document.getElementById("wrong").innerText = ++prevScore;
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
