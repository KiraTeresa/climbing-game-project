class Game {
  constructor() {
    this.background = new Background();
    this.player = new Player();
  }

  preload() {
    this.background.preload();
  }

  play() {
    this.player.drawPlayer();
    // this.background.drawBackground();
  }
}
