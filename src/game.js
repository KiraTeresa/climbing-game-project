class Game {
  constructor() {
    this.background = new Background();
  }

  preload() {
    this.background.preload();
  }

  play() {
    this.background.drawBackground();
  }
}
