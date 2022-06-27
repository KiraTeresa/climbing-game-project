class Game {
  constructor() {
    this.background = new Background();
    this.player = new Player();
    this.rocks = [];
    this.safetyEquipment = [];
    this.platforms = [];
    this.platformPositionLeft = true;
  }

  preload() {
    this.background.preload();
    this.player.preload();
    rockImg = loadImage("./assets/a44g_3gj6_201006.png");
    quickDrawImg = loadImage("./assets/quick-draw_415193651_adobe-stock.png");
    platformImg = loadImage("./assets/Pad_3_3.png");
    helmetImg = loadImage("./assets/helmet_vectorstock_22265240.png");
  }

  play() {
    this.background.drawBackground();
    this.player.drawPlayer();

    if (this.player.energy > 0 && this.player.safety < 10) {
      // Rocks and safety equipment randomly falling from mountain top:
      this.rocksFalling();
      this.safetyEquipmentFalling();
      // Platforms appear every now and then:
      this.platformAppearing();
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

    const playerLeft = player.left + 20;
    const obstacleRight = obstacle.left + obstacle.width;

    const playerRight = player.left + player.width - 20;
    const obstacleLeft = obstacle.left;

    return (
      playerBottom > obstacleTop &&
      playerTop < obstacleBottom &&
      playerLeft < obstacleRight &&
      playerRight > obstacleLeft &&
      player.canGetHit
    );
  }

  rocksFalling() {
    // Create a rock every second:
    if (frameCount % 60 === 0) {
      this.rocks.push(new Rock(rockImg));
    }

    // Draw rocks:
    this.rocks.forEach((rock) => {
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
        // this.player.gotHit = true;
        // this.player.flickering = true;
        // this.player.frameCountAtHit = frameCount;
        console.log(this.player.timesHit);
        this.player.boomChakalaka();
      }
    });
  }

  safetyEquipmentFalling() {
    // Create new safety equipment every three seconds:
    if (frameCount % 180 === 0) {
      this.safetyEquipment.push(new SafetyEquipment(quickDrawImg));
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

  platformAppearing() {
    // Create new platform every 6 seconds
    if (frameCount % 300 === 0) {
      this.platforms.push(
        new Platform(platformImg, helmetImg, this.platformPositionLeft)
      );
      this.platformPositionLeft = !this.platformPositionLeft;
      platformCount++;
      console.log("PlatformCount: ", platformCount);
    }

    this.platforms.forEach((platform) => {
      // draw every element of the platform array
      platform.drawPlatform();

      // remove all platform elements which have left the canvas
      if (platform.top > CANVAS_HEIGHT) {
        this.removeFromArr(this.platforms, platform);
      }

      // Collision check with platform:
      if (
        this.isColliding(this.player, platform) &&
        !platform.hitClimber &&
        !platform.platformHasHelmet
      ) {
        this.player.energy -= 10;
        platform.hitClimber = true;
        this.player.boomChakalaka();
      }
      //
    });
  }

  displayEnergyLevel() {
    // create red ellipse:
    push();
    fill("#C30E0E");
    rect(5, 5, 100, 30, 20, 20, 20, 20);
    pop();

    // create green ellipse:
    // let radius = this.player.energy * 0.2;
    let radius = 20;
    push();
    fill("SeaGreen");
    rect(5, 5, this.player.energy, 30, radius, radius, radius, radius); // rect(x, y, w, h, top-left radius, tr radius, br radius, bl radius)
    pop();

    // set text with current energy level:
    if (this.player.energy > 0) {
      textSize(16);
      textAlign(CENTER, CENTER);
      text(`Energy: ${this.player.energy}`, 55, 22);
    }
    // show game over screen when no more energy left:
    else {
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

    // show victory screen when player collected enough safety equipment:
    if (this.player.safety === 10) {
      this.victory();
    }
  }

  removeFromArr(arr, obstacle) {
    arr.splice(arr.indexOf(obstacle), 1);
  }

  gameOver() {
    this.background.moving = false;
    this.player.flickering = false;

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
    pop();
  }

  victory() {
    this.background.moving = false;

    // show victory screen:
    push();
    fill(169, 169, 169);
    rect(0, (CANVAS_HEIGHT / 3) * 2, CANVAS_WIDTH, CANVAS_HEIGHT / 2 - 30);
    pop();

    // show victory message:
    push();
    textSize(60);
    textAlign(CENTER, CENTER);
    text("Great Job!", CANVAS_WIDTH / 2, (CANVAS_HEIGHT / 3) * 2.5 - 30);
    pop();

    push();
    textSize(20);
    textAlign(CENTER, CENTER);
    text(
      "Did it even challenge you in any way?",
      CANVAS_WIDTH / 2,
      (CANVAS_HEIGHT / 3) * 2.5 + 30
    );
    pop();

    // text to continue climbing:
    push();
    textSize(14);
    textAlign(CENTER, BOTTOM);
    text(
      "Press Enter to climb the next mountain",
      CANVAS_WIDTH / 2,
      (CANVAS_HEIGHT / 3) * 2.5 + 100
    );
    pop();
  }

  restartGame() {
    this.player.energy = ENERGY;
    this.player.safety = 0;
    this.background.moving = true;
  }
}
