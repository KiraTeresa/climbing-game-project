class Game {
  constructor() {
    this.background = new Background();
    this.player = new Player();
  }

  preload() {
    this.background.preload();
    this.player.preload();
  }

  play() {
    this.background.drawBackground();
    this.player.drawPlayer();
  }

  keyPressed() {
    this.player.keyPressed();
  }
}
