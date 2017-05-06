var ClozeCard = require("./ClozeCard.js");

var mascot = new ClozeCard(
    "Hugo is the Charlotte Hornet's mascot?", "Hugo");

console.log("Cloze: " + mascot.cloze);
console.log("Partial: " + mascot.partial);
console.log("Full Text: " + mascot.text);