var BasicCard = require("./BasicCard.js");
var cardInfo = require("./basic.json");
var inquirer = require("inquirer");

startGame();

function startGame() {
    var currentCard;
    var cardArray = [];
    var initialScore = 0;
    var initialIndex = 0;
    for (var i = 0; i < cardInfo.length; i++) {
        currentCard = new BasicCard(cardInfo[i].front, cardInfo[i].back);
        cardArray.push(currentCard);
  }

    startRound(initialScore, cardArray, initialIndex);
}


function endGame(score) {
  console.log("Game Over!");
  console.log("Your score is: " + score);
  inquirer.prompt([{
    type: "input",
    name: "text",
    message: "Do you want to play again?"
  }]).then(function(answer) {
    if (answer.text.charAt(0).toLowerCase() === "y") {
      startGame();
    }
    else {
      console.log("Thank you for playing!");
    }
  });
}

function startRound(currentScore, cardArray, currentIndex) {
  if (currentIndex < cardArray.length) {
    askUser(cardArray, currentIndex, currentScore);
  }
  else {
    endGame(currentScore);
  }
}

function askUser(cardArray, currentIndex, currentScore) {
  var card = cardArray[currentIndex];
  inquirer.prompt([{
    type: "input",
    name: "text",
    message: card.front + "\nAnswer:"
  }]).then(function(answer) {
    if (answer.text.trim().toLowerCase() === card.back.trim().toLowerCase()) {
      currentScore++;
      console.log("You are correct!");
    }
    else {
      console.log("Incorrect! The correct answer is '" + card.back + "'.");
    }
    currentIndex++;
    console.log("--------");
    startRound(currentScore, cardArray, currentIndex);
  });
}