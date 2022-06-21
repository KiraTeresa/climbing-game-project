class SafetyEquipment {
  constructor(img) {
    this.height = 40;
    this.width = 20;
    this.top = -this.height;
    this.left = random(20, CANVAS_WIDTH - 20);
    this.speed = 3;
    this.img = img;
  }

  drawSafetyEquipment() {
    // rect(this.left, this.top, this.width, this.height);
    image(this.img, this.left, this.top, this.width, this.height);
    this.top += this.speed;
    this.speed += GRAVITY;
  }
}
