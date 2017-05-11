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
    // This lets the user just type in "y" to continue.
    // Will also work for "yes" or "yeah" or any answer begining with "y"
    if (answer.text.charAt(0).toLowerCase() === "y") {
      // Restarts the game from scratch if desired
      startGame();
    }
    else {
      // Otherwise the game ends here since we aren't calling any other functions
      console.log("Thanks for playing!");
      console.log("Goodbye!");
    }
  });
}

function startRound(currentScore, cardArray, currentIndex) {
  if (currentIndex < cardArray.length) {
    askUser(cardArray, currentIndex, currentScore);
  }
  // Otherwise end the game
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