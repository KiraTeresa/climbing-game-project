class Stats {
  constructor(energy, safety, quickdraws, currentLevel) {
    this.top = 0;
    this.width = CANVAS_WIDTH / 4;
    this.height = 30;
    this.textY = this.height / 2;
    this.energy = energy;
    this.safety = safety;
    this.quickdraws = quickdraws;
    this.currentLevel = currentLevel;
  }

  drawStats() {
    this.levelDisplay();
    this.quickdrawsDisplay();
    this.safetyDisplay();
    this.energyDisplay();
  }

  createRect(left, color, width) {
    if (!color) {
      rect(left, this.top, width, this.height);
    } else {
      push();
      fill(`${color}`);
      rect(left, this.top, width, this.height);
      pop();
    }
  }

  createText(typeOfStat, value, textX) {
    push();
    textSize(16);
    textAlign(CENTER, CENTER);
    text(`${typeOfStat}: ${value}`, textX, this.textY);
    pop();
  }

  energyDisplay() {
    // rect:
    const left = 0;
    this.createRect(left, "#C30E0E", this.width); // red rect
    this.createRect(left, "SeaGreen", (this.width / ENERGY) * this.energy); // green rect
    // text:
    if (this.energy > 0) {
      this.createText("Energy", this.energy, this.width * 0.5);
    } else {
      this.createText("Too tired", "", this.width * 0.5);
    }
  }

  safetyDisplay() {
    // rect:
    const left = this.width;
    this.createRect(left, "", this.width);
    // text:
    this.createText("Safety", this.safety, this.width * 1.5);
  }

  quickdrawsDisplay() {
    // rect:
    const left = this.width * 2;
    if (this.currentLevel === 1 && this.quickdraws >= NUM_QUICKDRAWS) {
      this.createRect(left, "SeaGreen", this.width);
    } else if (this.currentLevel === 2) {
      if (this.quickdraws > 0) {
        this.createRect(left, "SeaGreen", this.width);
      } else {
        this.createRect(left, "#C30E0E", this.width);
      }
    } else {
      this.createRect(left, "", this.width);
    }
    // text:
    this.createText("Quickdraws", this.quickdraws, this.width * 2.5);
  }

  levelDisplay() {
    // rect:
    const left = this.width * 3;
    this.createRect(left, "", this.width);
    // text:
    this.createText("Level", this.currentLevel, this.width * 3.5);
  }
}
