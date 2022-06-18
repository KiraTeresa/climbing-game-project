class Game {
  constructor() {
    this.background = new Background();
    this.player = new Player();
    this.rocks = [];
  }

  preload() {
    this.background.preload();
    this.player.preload();
  }

  play() {
    this.background.drawBackground();
    this.player.drawPlayer();

    // Draw a rock every second:
    if (frameCount % 60 === 0) {
      this.rocks.push(new Rock());
      console.log(this.rocks);
    }

    this.rocks.forEach((rock) => {
      //   rock.preload();
      rock.drawRock();

      // Remove rock from array when no longer within canvas:
      if (rock.top >= CANVAS_HEIGHT) {
        this.rocks.splice(this.rocks.indexOf(rock), 1);
      }
    });

    // Check if climber got hit by a rock:
    this.rocks.forEach((rock) => {
      if (this.isColliding(this.player, rock) && !rock.hitClimber) {
        this.player.timesHit++;
        rock.hitClimber = true;
      }
    });
    console.log(this.player.timesHit);
  }

  keyPressed() {
    this.player.keyPressed();
  }

  isColliding(player, obstacle) {
    const playerBottom = player.top + player.height;
    const obstacleTop = obstacle.top;

    const playerTop = player.top;
    const obstacleBottom = obstacle.top + obstacle.height;

    const playerLeft = player.left;
    const obstacleRight = obstacle.left + obstacle.width;

    const playerRight = player.left + player.width;
    const obstacleLeft = obstacle.left;

    return (
      playerBottom > obstacleTop &&
      playerTop < obstacleBottom &&
      playerLeft < obstacleRight &&
      playerRight > obstacleLeft
    );
  }
}
