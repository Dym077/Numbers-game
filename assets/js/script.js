// Event listener - wait for the DOM to finish loading
// Get button elements and add listeners

document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "submit") {
                alert("You clicked submit!");
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }
        });
    }

    runGame("addition");

});

/**
 * This main game loop is called when script is loaded
 *and after the answer is processed.
 */

function runGame(gameType) {
    // num1 and num2 creates two random numbers between 1 and 25
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType === "addition") {
        dispAddQuestion(num1, num2);
    } else {
        alert(`Something amiss: ${gameType}`);
        throw `Something amiss: ${gameType}. Aborting`;
    }

}

function verifyAnswer() {

}

function calcAnswer() {
    let operand1 = parseInt(document.getElementById('operand1').innertext);
    let operand2 = parseInt(document.getElementById('operand2').innertext);
    let operator = document.getElementById('operand2').innertext;

    if (operator === "+") {
        return [operand1 + operand2, "addition"];
    } else {
        alert(`operator not implemented)${operator}`);
        throw `operator not implemented ${operator}. Aborting`;
    }
    }

}

function incrementScore() {

}

function incrementWrongAnswer() {

}

function dispAddQuestion() {
    
    document.getElementById('operand1').textcontent = operand1;
    document.getElementById('operand2').textcontent = operand2;
    document.getElementById('operator').textcontent = "+";

}

function dispSubQuestion() {

}

function dispMultQuestion() {

}
function dispDivQuestion() {

}