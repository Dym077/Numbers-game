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
                alert(`You clicked ${gameType}`);
            }
        });
    }
});

/**
 * This main game loop is called when script is loaded
 *and after the answer is processed.
 */
// num1 and num2 creates two random numbers between 1 and 25
function runGame() {
    let num1 = Math.floor(Math.random() * 25 ) + 1;
    let num2 = Math.floor(Math.random() * 25 ) + 1;
}

function verifyAnswer() {

}

function calcAnswer() {

}

function incrementScore() {

}

function incrementWrongAnswer() {

}

function dispAddQuestion() {

}

function dispSubQuestion() {

}

function dispMultQuestion() {

}
function dispDivQuestion() {

}