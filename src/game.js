class Game {
  constructor() {
    this.background = new Background();
    this.player = new Player();
    this.soundPlayed = false;
    this.screenShown = "Start";
    this.displays;
    this.currentLevel = 0;
    this.boltsWithRope = 0;

    // randomized objects:
    this.rocks = [];
    this.safetyEquipment = [];
    this.helmet = [];
    this.granolaBar = [];
    this.bolts = [];
    this.quickDraw = [];
  }

  preload() {
    this.background.preload();
    this.player.preload();

    // Images:
    rockImg = loadImage("./assets/graphics/a44g_3gj6_201006.png");
    quickDrawImg = loadImage(
      "./assets/graphics/quick-draw_415193651_adobe-stock.png"
    );
    helmetImg = loadImage("./assets/graphics/helmet_vectorstock_22265240.png");
    granolaBarImg = loadImage(
      "./assets/graphics/free-granola-bars-icons-vector.png"
    );
    startImg = loadImage(
      "./assets/graphics/massimiliano-morosinotto-3i5PHVp1Fkw-unsplash.jpg"
    );
    victoryImg = loadImage(
      "./assets/graphics/jody-confer-EIyu-OL-cFA-unsplash.jpg"
    );
    tiredImg = loadImage(
      "./assets/graphics/david-clode-d8N22qmJEt4-unsplash.jpg"
    );
    arrowLeftImg = loadImage(
      "./assets/graphics/vecteezy_keyboard-keys-with-flat-design-style_arrow-left.png"
    );
    arrowRightImg = loadImage(
      "./assets/graphics/vecteezy_keyboard-keys-with-flat-design-style_arrow-right.png"
    );
    enterImg = loadImage(
      "./assets/graphics/vecteezy_keyboard-keys-with-flat-design-style_enter.png"
    );
    spaceImg = loadImage(
      "./assets/graphics/vecteezy_keyboard-keys-with-flat-design-style_space.png"
    );
    // platformImg = loadImage("./assets/Pad_3_3.png");

    // Sounds:
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
    this.rope();
    this.player.drawPlayer();

    this.displayStats();
    this.showScreen();

    this.fallingObjects();

    // Ensure safety cannot be less than zero:
    if (this.player.safety < 0) {
      this.player.safety = 0;
    }

    this.nextLevel();
    this.endGame();
  }

  keyPressed() {
    this.player.keyPressed();
    if (keyCode === ENTER && this.screenShown) {
      if (
        this.screenShown === "Start" ||
        this.screenShown === "Tired" ||
        this.screenShown === "GameOver" ||
        this.screenShown === "Victory"
      ) {
        this.screenShown = "Level1";
        this.resettingStats();
      } else if (this.screenShown === "Level1") {
        // start level 1
        this.restartGame();
      } else if (this.screenShown === "Level2") {
        // start level 2
        this.background.moving = true;
        this.currentLevel = 2;
        this.player.granolaBarsEaten = 0;
        this.screenShown = "";
      }
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

  fallingObjects() {
    if (
      this.player.energy > 0 &&
      this.player.safety < SAFETY &&
      this.background.moving
    ) {
      this.rocksFalling();
      this.safetyEquipmentFalling();
      this.helmetFalling();
      this.granolaBarFalling();
      // Platforms appear every now and then:
      // this.platformAppearing();

      // Bolts will be added when player reaches level 2:
      if (this.currentLevel === 2) {
        this.boltsShowing();
      }
    }
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
        this.player.energy -= 5;
        rock.hitClimber = true;
        this.player.recoverFromHit();
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
      if (this.currentLevel === 1 && this.quickDraw.length !== NUM_QUICKDRAWS) {
        this.safetyEquipment.push(new SafetyEquipment(quickDrawImg));
      } else if (this.currentLevel === 2) {
        this.safetyEquipment.push(new SafetyEquipment(quickDrawImg));
      }
    }

    // Draw safety equipment, remove from array when no longer within canvas OR collected by player:
    this.safetyEquipment.forEach((item) => {
      item.drawSafetyEquipment();

      if (this.isColliding(this.player, item)) {
        safetyEquipmentSound.play();
        this.removeFromArr(this.safetyEquipment, item);
        this.quickDraw.push(new SafetyEquipment(quickDrawImg));

        // collecting quickdraws only increases player safety when in level 1:
        if (this.currentLevel === 1) {
          this.player.safety++;
        }

        // Keep count of how many quick draws are on the harness:
        this.player.quickDrawsOnHarness++;
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

  boltsShowing() {
    if (frameCount % 180 === 0) {
      this.bolts.push(new Bolt(quickDrawImg));
    }

    // Draw bolts:
    this.bolts.forEach((bolt) => {
      bolt.drawBolt();

      // Remove bolt from array when outside canvas:
      if (bolt.top >= CANVAS_HEIGHT) {
        // decrease player safety when bolt is leaving the canvas without a quickdraw attached to it:
        if (bolt.hasQuickDraw === false && this.player.safety > 0) {
          this.player.safety--;
        } else if (bolt.hasQuickDraw) {
          this.boltsWithRope--;
        }
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
        safetyEquipmentSound.play();
        this.placeQuickDraw(bolt);
        this.boltsWithRope++;
      }

      // Make the rope go through quickdraw inbetween bottom and player:
      this.connectRope(bolt);
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
  }

  rope() {
    push();
    strokeWeight(3);
    stroke("#1478B0");
    // level 1 is top rope --> rope comes from the top and is attached to player
    if (this.currentLevel === 1) {
      line(
        CANVAS_WIDTH / 2,
        0,
        this.player.left + this.player.width / 2,
        this.player.top + this.player.height / 2
      );
    }
    // level 2 is lead climbing --> rope comes from the bottom and is attached to player
    else if (this.boltsWithRope === 0 && this.currentLevel === 2) {
      line(
        CANVAS_WIDTH / 2,
        CANVAS_HEIGHT,
        this.player.left + this.player.width / 2,
        this.player.top + this.player.height / 2
      );
    }
    pop();
  }

  connectRope(bolt) {
    this.ropeInQuickDraw = this.bolts.filter((element) => {
      element.hasQuickDraw === true;
    });

    push();
    strokeWeight(3);
    stroke("#1478B0");
    if (bolt.hasQuickDraw) {
      line(
        CANVAS_WIDTH / 2,
        CANVAS_HEIGHT,
        bolt.left + bolt.width / 2,
        bolt.top + bolt.height * 4
      );
      line(
        bolt.left + bolt.width / 2,
        bolt.top + bolt.height * 4,
        this.player.left + this.player.width / 2,
        this.player.top + this.player.height / 2
      );
    }
    pop();
  }

  nextLevel() {
    if (
      this.currentLevel === 1 &&
      this.player.quickDrawsOnHarness >= NUM_QUICKDRAWS &&
      this.player.wearingHelmet
    ) {
      this.background.moving = false;
      this.screenShown = "Level2";
    }
  }

  displayStats() {
    if (this.currentLevel === 1) {
      this.displays = new Stats(
        this.player.energy,
        "Super Save",
        this.player.quickDrawsOnHarness,
        this.currentLevel
      );
    } else if (this.currentLevel === 2) {
      this.displays = new Stats(
        this.player.energy,
        this.player.safety,
        this.player.quickDrawsOnHarness,
        this.currentLevel
      );
    } else {
      this.displays = new Stats(
        this.player.energy,
        this.player.safety,
        this.player.quickDrawsOnHarness,
        this.currentLevel
      );
    }
    this.displays.drawStats();
  }

  removeFromArr(arr, obstacle) {
    arr.splice(arr.indexOf(obstacle), 1);
  }

  gameOver(screen) {
    this.background.moving = false;
    this.screenShown = screen;

    // play game over sound:
    if (!gameOverSound.isPlaying() && !this.soundPlayed) {
      gameOverSound.play();
      this.soundPlayed = true;
    }
  }

  victory() {
    this.background.moving = false;
    this.screenShown = "Victory";

    // play victory sound:
    if (!victorySound.isPlaying() && !this.soundPlayed) {
      victorySound.play();
      this.soundPlayed = true;
    }
  }

  endGame() {
    if (this.background.moving) {
      if (this.player.energy <= 0) {
        this.gameOver("Tired");
      } else if (this.currentLevel === 2) {
        if (this.player.safety >= SAFETY) {
          this.victory();
        } else if (this.player.safety === 0) {
          this.gameOver("GameOver");
        }
      }
    }
  }

  resettingStats() {
    // resetting stats:
    this.player.energy = ENERGY;
    this.player.safety = 0;
    this.player.wearingHelmet = false;
    this.player.quickDrawsOnHarness = 0;
    this.player.granolaBarsEaten = 0;
    this.currentLevel = 1;
    this.boltsWithRope = 0;
  }

  restartGame() {
    this.background.moving = true;
    this.soundPlayed = false;

    // clearing obstacle arrays:
    this.rocks = [];
    this.safetyEquipment = [];
    this.helmet = [];
    this.granolaBar = [];
    this.bolts = [];
    this.quickDraw = [];

    // clearing the screen:
    this.screenShown = "";
  }

  showScreen() {
    this.screen = new Screen(this.screenShown);
    this.screen.drawScreen();
  }
}
