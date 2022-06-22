const game = new Game();

function setup() {
  const canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  canvas.parent("canvas");
  // background("SeaGreen");
}

function preload() {
  game.preload();
}

function draw() {
  game.play();
}

function keyPressed() {
  game.keyPressed();
}
