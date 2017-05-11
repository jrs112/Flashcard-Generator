var ClozeCard = require("./ClozeCard.js");
var cardInfo = require("./cloze.json");
var inquirer = require("inquirer");

startGame();

function startGame() {
  var currentCard;
  var cardArray = [];
  var initialScore = 0;
  var initialIndex = 0;
  for (var i = 0; i < cardInfo.length; i++) {
    currentCard = new ClozeCard(cardInfo[i].partial, cardInfo[i].cloze);
    cardArray.push(currentCard);
  }
  startRound(initialScore, cardArray, initialIndex);
}

function endGame(score) {
  console.log("Game Over!");
  console.log("Your score is:", score);
  inquirer.prompt([{
    type: "input",
    name: "text",
    message: "Play again?"
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
    promptUser(cardArray, currentIndex, currentScore);
  }
  else {
    endGame(currentScore);
  }
}

function promptUser(cardArray, currentIndex, currentScore) {
  var card = cardArray[currentIndex];
  inquirer.prompt([{
    type: "input",
    name: "text",
    message: card.partial + "\nAnswer:"
  }]).then(function(answer) {
    if (answer.text.trim().toLowerCase() === card.cloze.trim().toLowerCase()) {
      currentScore++;
      console.log("You are correct!");
    }
    else {
      console.log("Incorrect!");
      console.log(card.displayCard());
    }
    currentIndex++;
    console.log("-----------");
    startRound(currentScore, cardArray, currentIndex);
  });
}