class Game {
  constructor() {
    this.background = new Background();
    this.player = new Player();
    this.rocks = [];
    this.safetyEquipment = [];
  }

  preload() {
    this.background.preload();
    this.player.preload();
  }

  play() {
    this.background.drawBackground();
    this.player.drawPlayer();

    // Rocks and safety equipment randomly falling from mountain top:
    if (this.player.energy > 0) {
      this.rocksFalling();
      this.safetyEquipmentFalling();
    }

    // Display energy and safety level of climber:
    this.displayEnergyLevel();
    this.displaySafetyLevel();
  }

  keyPressed() {
    this.player.keyPressed();
    if (keyCode === ENTER) {
      this.restartGame();
    }
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

  rocksFalling() {
    // Create a rock every second:
    if (frameCount % 60 === 0) {
      this.rocks.push(new Rock());
      console.log(this.rocks);
    }

    // Draw rocks:
    this.rocks.forEach((rock) => {
      //   rock.preload();
      rock.drawRock();

      // Remove rock from array when no longer within canvas:
      if (rock.top >= CANVAS_HEIGHT) {
        this.removeFromArr(this.rocks, rock);
      }

      // Check if climber got hit by a rock:
      if (this.isColliding(this.player, rock) && !rock.hitClimber) {
        this.player.timesHit++;
        this.player.energy -= 5;
        rock.hitClimber = true;
      }
    });
    console.log(this.player.timesHit);
  }

  safetyEquipmentFalling() {
    // Create new safety equipment every three seconds:
    if (frameCount % 180 === 0) {
      this.safetyEquipment.push(new SafetyEquipment());
      console.log(this.safetyEquipment);
    }

    // Draw safety equipment, remove from array when no longer within canvas OR collected by player:
    this.safetyEquipment.forEach((item) => {
      item.drawSafetyEquipment();

      if (this.isColliding(this.player, item)) {
        this.player.safety++;
        this.removeFromArr(this.safetyEquipment, item);
      }

      if (this.safetyEquipment.top >= CANVAS_HEIGHT) {
        // this.safetyEquipment.splice(this.safetyEquipment.indexOf(item), 1);
        this.removeFromArr(this.safetyEquipment, item);
      }
    });
  }

  displayEnergyLevel() {
    // create ellipse:
    rect(5, 5, 100, 30, 20, 20, 20, 20);
    push();
    if (this.player.energy > 25) {
      fill("SeaGreen");
    } else {
      fill("#C30E0E");
    }
    // let radius = this.player.energy * 0.2;
    let radius = 20;
    rect(5, 5, this.player.energy, 30, radius, radius, radius, radius); // rect(x, y, w, h, top-left radius, tr radius, br radius, bl radius)
    pop();

    // set text with current energy level:
    if (this.player.energy > 0) {
      textSize(16);
      textAlign(CENTER, CENTER);
      text(`Energy: ${this.player.energy}`, 55, 22);
    } else {
      push();
      textSize(15);
      textAlign(CENTER, CENTER);
      text(`Too tired`, 55, 22);
      pop();
      this.gameOver();
    }
  }

  displaySafetyLevel() {
    // create rect:
    rect(CANVAS_WIDTH - 105, 5, 100, 30, 20, 20, 20, 20);

    // set text with current safety level:
    textSize(16);
    textAlign(CENTER, CENTER);
    text(`Safety: ${this.player.safety}`, CANVAS_WIDTH - 55, 22);
  }

  removeFromArr(arr, obstacle) {
    arr.splice(arr.indexOf(obstacle), 1);
  }

  gameOver() {
    this.background.moving = false;
    push();
    fill(169, 169, 169);
    rect(0, CANVAS_HEIGHT / 3, CANVAS_WIDTH, CANVAS_HEIGHT / 3);
    pop();

    // show Game Over message:
    push();
    textSize(60);
    textAlign(CENTER, CENTER);
    text("GAME OVER", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 30);
    pop();

    push();
    textSize(20);
    textAlign(CENTER, CENTER);
    text(
      "No more energy to climb, better take a rest!",
      CANVAS_WIDTH / 2,
      CANVAS_HEIGHT / 2 + 30
    );
    pop();

    // text to restart the game:
    push();
    textSize(14);
    textAlign(CENTER, BOTTOM);
    text(
      "Press Enter to restart the game",
      CANVAS_WIDTH / 2,
      CANVAS_HEIGHT / 2 + 100
    );
  }

  restartGame() {
    this.player.energy = ENERGY;
    this.background.moving = true;
  }
}
