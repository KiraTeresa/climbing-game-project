class SafetyEquipment {
  constructor() {
    this.height = 20;
    this.width = 10;
    this.top = -this.height;
    this.left = random(20, CANVAS_WIDTH - 20);
    this.speed = 5;
  }

  drawSafetyEquipment() {
    rect(this.left, this.top, this.width, this.height);
    this.top += this.speed;
  }
}
