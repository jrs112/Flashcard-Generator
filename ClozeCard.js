var ClozeFlash = function(text, cloze) {
    this.text = text;
    this.cloze = cloze;
    this.partial = this.text.replace(this.cloze, ".....");
}

module.exports = ClozeFlash;