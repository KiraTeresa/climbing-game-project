class Game {
  constructor() {
    this.background = new Background();
    this.player = new Player();
    this.rocks = [];
    this.safetyEquipment = [];
    this.platforms = [];
    this.platformPositionLeft = true;
    this.helmet = [];
    this.granolaBar = [];
    this.soundPlayed = false;
    this.bolts = [];
    this.quickDraw = [];
  }

  preload() {
    this.background.preload();
    this.player.preload();

    rockImg = loadImage("./assets/a44g_3gj6_201006.png");
    quickDrawImg = loadImage("./assets/quick-draw_415193651_adobe-stock.png");
    platformImg = loadImage("./assets/Pad_3_3.png");
    helmetImg = loadImage("./assets/helmet_vectorstock_22265240.png");
    granolaBarImg = loadImage("./assets/free-granola-bars-icons-vector.png");

    soundFormats("mp3", "ogg", "wav");
    rockSound = loadSound("./assets/audio/mixkit-hard-typewriter-hit-1364.wav");
    safetyEquipmentSound = loadSound(
      "./assets/audio/mixkit-quick-win-video-game-notification-269.wav"
    );
    eatingSound = loadSound(
      "./assets/audio/mixkit-chewing-something-crunchy-2244.wav"
    );
    victorySound = loadSound("./assets/audio/yodel.mp3");
    gameOverSound = loadSound(
      "./assets/audio/mixkit-slow-sad-trombone-fail-472.wav"
    );
  }

  play() {
    this.background.drawBackground();
    this.player.drawPlayer();

    if (
      this.player.energy > 0 &&
      this.player.safety < SAFETY &&
      this.background.moving
    ) {
      // Objects randomly falling from mountain top:
      this.rocksFalling();
      this.safetyEquipmentFalling();
      this.helmetFalling();
      this.granolaBarFalling();
      // Platforms appear every now and then:
      // this.platformAppearing();

      // Bolts showing:
      this.boltsShowing();
    }

    // Display energy and safety level of climber:
    this.displayEnergyLevel();
    this.displaySafetyLevel();

    // Show starting screen:
    if (
      this.player.energy > 0 &&
      this.player.safety < SAFETY &&
      !this.background.moving
    ) {
      this.startingScreen();
    }
  }

  keyPressed() {
    this.player.keyPressed();
    if (keyCode === ENTER && !this.background.moving) {
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
    if (frameCount % 30 === 0) {
      this.rocks.push(new Rock(rockImg));
    }

    // Draw rocks:
    this.rocks.forEach((rock) => {
      rock.drawRock();

      // Remove rock from array when no longer within canvas:
      if (rock.top >= CANVAS_HEIGHT) {
        this.removeFromArr(this.rocks, rock);
      }

      // Check if climber got hit by a rock and if she is not wearing a helmet:
      if (
        this.isColliding(this.player, rock) &&
        !rock.hitClimber &&
        !this.player.wearingHelmet
      ) {
        rockSound.play();
        this.player.timesHit++;
        this.player.energy -= 5;
        rock.hitClimber = true;
        // this.player.gotHit = true;
        // this.player.flickering = true;
        // this.player.frameCountAtHit = frameCount;
        console.log(this.player.timesHit);
        this.player.boomChakalaka();
      }
      // action on collision while wearing a helmet:
      else if (
        this.isColliding(this.player, rock) &&
        !rock.hitClimber &&
        this.player.wearingHelmet
      ) {
        rockSound.play();
        rock.hitClimber = true;
        this.player.wearingHelmet = false;
        this.player.safety -= 2; // less safety when helmet is no longer worn
        this.removeFromArr(this.helmet, this.helmet[0]);
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
        safetyEquipmentSound.play();
        this.player.safety++;
        this.removeFromArr(this.safetyEquipment, item);
        this.quickDraw.push(new SafetyEquipment(quickDrawImg));
        console.log(this.quickDraw);

        // Keep count of how many quick draws are on belt
        this.player.quickDrawsOnHarness++;
        console.log("Qick Draws collected: ", this.player.quickDrawsOnHarness);
      }

      if (this.safetyEquipment.top >= CANVAS_HEIGHT) {
        this.removeFromArr(this.safetyEquipment, item);
      }
    });
  }

  helmetFalling() {
    // Create new helmet every ten seconds if player is not already wearing one:
    if (frameCount % 600 === 0 && this.player.wearingHelmet === false) {
      this.helmet.push(new Helmet(helmetImg));
    }

    this.helmet.forEach((helmet) => {
      helmet.drawHelmet();

      if (this.player.wearingHelmet === true) {
        helmet.left = this.player.left + this.player.width / 2 - 27;
        helmet.top = this.player.top;
        helmet.speed = 0;
      }

      if (helmet.top >= CANVAS_HEIGHT) {
        this.removeFromArr(this.helmet, helmet);
      }

      if (
        this.isColliding(this.player, helmet) &&
        this.player.wearingHelmet === false
      ) {
        safetyEquipmentSound.play();
        this.player.wearingHelmet = true;
        this.player.safety += 2; // safety increases while wearing a helmet
      }
    });

    console.log("Is wearing helmet: ", this.player.wearingHelmet);
  }

  granolaBarFalling() {
    if (frameCount % 240 === 0) {
      this.granolaBar.push(new GranolaBar(granolaBarImg));
    }

    this.granolaBar.forEach((bar) => {
      bar.drawGranolaBar();

      if (
        this.isColliding(this.player, bar) &&
        this.player.energy <= ENERGY - bar.booster &&
        this.player.granolaBarsEaten < 2
      ) {
        eatingSound.play();
        this.player.energy += bar.booster;
        this.player.granolaBarsEaten++;
        this.removeFromArr(this.granolaBar, bar);
      }

      if (bar.top >= CANVAS_HEIGHT) {
        this.removeFromArr(this.granolaBar, bar);
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

  boltsShowing() {
    if (frameCount % 180 === 0) {
      this.bolts.push(new Bolt(quickDrawImg));
    }

    // Draw bolts:
    this.bolts.forEach((bolt) => {
      bolt.drawBolt();

      // Remove bolt from array when outside canvas:
      if (bolt.x >= CANVAS_HEIGHT) {
        this.removeFromArr(this.bolts, bolt);
      }

      // Check for collision with player
      // Make sure there are still quickdraws left on the harness
      // Make sure there isn't already a quickdraw attached to the bolt
      // Space key needs to be pressed:
      if (
        this.isColliding(this.player, bolt) &&
        !bolt.hasQuickDraw &&
        keyCode === SPACE &&
        this.player.quickDrawsOnHarness
      ) {
        this.placeQuickDraw(bolt);
      }
    });
  }

  placeQuickDraw(bolt) {
    // Bolt now has a quickdraw attached:
    bolt.hasQuickDraw = true;

    // Remove a quickdraw from the harness:
    this.quickDraw.shift();
    this.player.quickDrawsOnHarness--;

    // Safety goes up when quickdraw was placed in bolt:
    this.player.safety++;

    console.log(
      "Qick Draws after placement: ",
      this.player.quickDrawsOnHarness
    );
  }

  displayEnergyLevel() {
    // create red ellipse:
    push();
    fill("#C30E0E");
    rect(5, 5, ENERGY * 2, 30, 20, 20, 20, 20);
    pop();

    // create green ellipse:
    let radius = 20;
    push();
    fill("SeaGreen");
    rect(5, 5, this.player.energy * 2, 30, radius, radius, radius, radius); // rect(x, y, w, h, top-left radius, tr radius, br radius, bl radius)
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
    // create ellipse:
    rect(CANVAS_WIDTH - 105, 5, 100, 30, 20, 20, 20, 20);

    // set text with current safety level:
    textSize(16);
    textAlign(CENTER, CENTER);
    text(`Safety: ${this.player.safety}`, CANVAS_WIDTH - 55, 22);

    // show victory screen when player collected enough safety equipment:
    if (this.player.safety >= SAFETY) {
      this.victory();
    }
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
    pop();

    // play game over sound:
    if (!gameOverSound.isPlaying() && !this.soundPlayed) {
      gameOverSound.play();
      this.soundPlayed = true;
    }
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

    // play victory sound:
    if (!victorySound.isPlaying() && !this.soundPlayed) {
      victorySound.play();
      this.soundPlayed = true;
    }
  }

  restartGame() {
    this.background.moving = true;
    this.soundPlayed = false;

    // resetting stats:
    this.player.energy = ENERGY;
    this.player.safety = 0;
    this.player.wearingHelmet = false;
    this.player.quickDrawsOnHarness = 0;

    // clearing obstacle arrays:
    this.rocks = [];
    this.safetyEquipment = [];
    this.helmet = [];
    this.granolaBar = [];
    this.bolts = [];
    this.quickDraw = [];
  }

  startingScreen() {
    push();
    fill(169, 169, 169);
    rect(0, CANVAS_HEIGHT / 3, CANVAS_WIDTH, CANVAS_HEIGHT / 3);
    pop();

    // show welcome message:
    push();
    textSize(60);
    textAlign(CENTER, CENTER);
    text("Welcome!", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 30);
    pop();

    push();
    textSize(20);
    textAlign(CENTER, CENTER);
    text("To your multi-pitch climb", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 30);
    pop();

    // text to tart the game:
    push();
    textSize(14);
    textAlign(CENTER, BOTTOM);
    text(
      "Press Enter to start the game",
      CANVAS_WIDTH / 2,
      CANVAS_HEIGHT / 2 + 100
    );
    pop();
  }
}
