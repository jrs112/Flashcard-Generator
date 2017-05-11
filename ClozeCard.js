function ClozeCard(text, clozeDeletion) {

  if (!(this instanceof ClozeCard)) {
    return new ClozeCard(text, clozeDeletion);
  }
  var clozeArea = clozeRemove(text, clozeDeletion);
  this.partial = getPartial(text, clozeArea);
  this.cloze = text.slice(clozeArea[0], clozeArea[1]);
  function getPartial(text, clozeArea) {
    var start = text.slice(0, clozeArea[0]);
    var end = text.slice(clozeArea[1], text.length);
    return start + "..." + end;
  }
  function clozeRemove(text, clozeDeletion) {
    var start = text.indexOf(clozeDeletion);
    if (start !== -1) {
      return [start, start + clozeDeletion.length];
    }
    throw new Error("Cloze deletion not found in input text.");
  }
}
ClozeCard.prototype.displayCard = function displayCard() {
  return this.partial.replace(/\.\.\./, "'" + this.cloze + "'");
};

module.exports = ClozeCard;