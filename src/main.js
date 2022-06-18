const game = new Game();

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  background("SeaGreen");
}

function preload() {
  game.preload();
}

function draw() {
  game.play();
}
