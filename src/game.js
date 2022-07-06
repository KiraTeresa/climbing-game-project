class Game {
  constructor() {
    this.background = new Background();
    this.player = new Player();
    this.soundPlayed = false;
    this.screenShown = "Start";
    this.displays;
    this.currentLevel = 0;
    // this.topo = new Topo(); // disabled because it slows down the game to much

    // randomized objects:
    this.rocks = [];
    this.safetyEquipment = [];
    // this.platforms = [];
    // this.platformPositionLeft = true;
    this.helmet = [];
    this.granolaBar = [];
    this.bolts = [];
    this.quickDraw = [];
  }

  preload() {
    this.background.preload();
    this.player.preload();
    // this.topo.preload();

    // Images of the obstacles:
    rockImg = loadImage("./assets/graphics/a44g_3gj6_201006.png");
    quickDrawImg = loadImage(
      "./assets/graphics/quick-draw_415193651_adobe-stock.png"
    );
    // platformImg = loadImage("./assets/Pad_3_3.png");
    helmetImg = loadImage("./assets/graphics/helmet_vectorstock_22265240.png");
    granolaBarImg = loadImage(
      "./assets/graphics/free-granola-bars-icons-vector.png"
    );

    // Images of the keys:
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
    this.player.drawPlayer();
    // this.topo.drawTopo();
    this.displayStats();

    this.fallingObjects();

    // Ensure safety cannot be less than zero:
    if (this.player.safety < 0) {
      this.player.safety = 0;
    }

    this.nextLevel();
    this.endGame();

    // Display energy and safety level of climber as well as the game level:
    // this.displayEnergyLevel();
    // this.displaySafetyLevel();
    // this.displayLevel();
    // this.displayNumOfQuickdrawsOnHarness();

    // Shows level instructions or starting-/gameover-/victory screen:
    // this.screen.drawScreen();
    this.showScreen();
    // if (this.screenShown) {
    //   console.log(this.screenShown);
    // }
  }

  keyPressed() {
    this.player.keyPressed();
    if (keyCode === ENTER && this.screenShown) {
      if (
        this.screenShown === "Start" ||
        this.screenShown === "GameOver" ||
        this.screenShown === "Victory"
      ) {
        this.screenShown = "Level1";
        this.currentLevel = 1;
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
      // Objects randomly falling from mountain top:
      this.rocksFalling();
      this.safetyEquipmentFalling();
      this.helmetFalling();
      this.granolaBarFalling();
      // Platforms appear every now and then:
      // this.platformAppearing();

      // Bolts will be added when player reaches level 2:
      if (this.currentLevel === 2) {
        // Bolts showing:
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
      this.safetyEquipment.push(new SafetyEquipment(quickDrawImg));
    }

    // Draw safety equipment, remove from array when no longer within canvas OR collected by player:
    this.safetyEquipment.forEach((item) => {
      item.drawSafetyEquipment();

      if (this.isColliding(this.player, item)) {
        safetyEquipmentSound.play();
        this.removeFromArr(this.safetyEquipment, item);
        this.quickDraw.push(new SafetyEquipment(quickDrawImg));
        console.log(this.quickDraw);

        // collecting quickdraws only increases player safety when in level 1:
        if (this.currentLevel === 1) {
          this.player.safety++;
        }

        // Keep count of how many quick draws are on the harness:
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
      if (bolt.top >= CANVAS_HEIGHT) {
        // decrease player safety when bolt is leaving the canvas without a quickdraw attached to it:
        if (bolt.hasQuickDraw === false && this.player.safety > 0) {
          this.player.safety--;
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

  // displayEnergyLevel() {
  //   // // create red rect:
  //   // push();
  //   // fill("#C30E0E");
  //   // rect(0, DISPLAY_TOP, DISPLAY_WIDTH, DISPLAY_HEIGHT);
  //   // pop();

  //   // // create green rect:
  //   // push();
  //   // fill("SeaGreen");
  //   // rect(
  //   //   0,
  //   //   DISPLAY_TOP,
  //   //   (DISPLAY_WIDTH / ENERGY) * this.player.energy,
  //   //   DISPLAY_HEIGHT
  //   // ); // rect(x, y, w, h, top-left radius, tr radius, br radius, bl radius)
  //   // pop();

  //   // set text with current energy level:
  //   if (this.player.energy > 0) {
  //     // textSize(16);
  //     // textAlign(CENTER, CENTER);
  //     // text(`Energy: ${this.player.energy}`, DISPLAY_TEXT_X, DISPLAY_TEXT_Y);
  //   }

  //   // show game over screen when no more energy left:
  //   else {
  //     // push();
  //     // textSize(15);
  //     // textAlign(CENTER, CENTER);
  //     // text(`Too tired`, DISPLAY_TEXT_X, DISPLAY_TEXT_Y);
  //     // pop();
  //     this.gameOver();
  //   }
  // }

  // displaySafetyLevel() {
  //   // // create rect:
  //   // rect(DISPLAY_WIDTH, DISPLAY_TOP, DISPLAY_WIDTH, DISPLAY_HEIGHT);

  //   // // set text with current safety level:
  //   // textSize(16);
  //   // textAlign(CENTER, CENTER);
  //   // text(`Safety: ${this.player.safety}`, DISPLAY_WIDTH * 1.5, DISPLAY_TEXT_Y);

  // }

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

  // displayNumOfQuickdrawsOnHarness() {
  //   // create rect:
  //   if (
  //     currentLevel === 1 &&
  //     this.player.quickDrawsOnHarness >= NUM_QUICKDRAWS
  //   ) {
  //     push();
  //     fill("SeaGreen");
  //     rect(DISPLAY_WIDTH * 2, DISPLAY_TOP, DISPLAY_WIDTH, DISPLAY_HEIGHT);
  //     pop();
  //   } else if (currentLevel === 2) {
  //     if (this.player.quickDrawsOnHarness > 0) {
  //       push();
  //       fill("SeaGreen");
  //       rect(DISPLAY_WIDTH * 2, DISPLAY_TOP, DISPLAY_WIDTH, DISPLAY_HEIGHT);
  //       pop();
  //     } else {
  //       push();
  //       fill("#C30E0E");
  //       rect(DISPLAY_WIDTH * 2, DISPLAY_TOP, DISPLAY_WIDTH, DISPLAY_HEIGHT);
  //       pop();
  //     }
  //   } else {
  //     rect(DISPLAY_WIDTH * 2, DISPLAY_TOP, DISPLAY_WIDTH, DISPLAY_HEIGHT);
  //   }

  //   // set text with number of quickdraws on harness:
  //   textSize(16);
  //   textAlign(CENTER, CENTER);
  //   text(
  //     `Quickdraws: ${this.player.quickDrawsOnHarness}`,
  //     DISPLAY_WIDTH * 2.5,
  //     DISPLAY_TEXT_Y
  //   );
  // }

  // displayLevel() {
  //   // create rect:
  //   rect(DISPLAY_WIDTH * 3, DISPLAY_TOP, DISPLAY_WIDTH, DISPLAY_HEIGHT);

  //   // set text with current level:
  //   // if (currentLevel === 1) {
  //   //   push();
  //   //   textSize(16);
  //   //   textStyle(BOLD);
  //   //   fill(0, 102, 153);
  //   //   text(`Level: ${currentLevel}`, DISPLAY_WIDTH * 3.5, DISPLAY_TEXT_Y);
  //   //   pop();
  //   // } else if (currentLevel === 2) {
  //   //   push();
  //   //   textSize(16);
  //   //   textStyle(BOLD);
  //   //   fill(205, 92, 92);
  //   //   text(`Level: ${currentLevel}`, DISPLAY_WIDTH * 3.5, DISPLAY_TEXT_Y);
  //   //   pop();
  //   // } else {
  //   push();
  //   textSize(16);
  //   textStyle(BOLD);
  //   text(`Level: ${currentLevel}`, DISPLAY_WIDTH * 3.5, DISPLAY_TEXT_Y);
  //   pop();
  //   // }
  // }

  displayStats() {
    this.displays = new Stats(
      this.player.energy,
      this.player.safety,
      this.player.quickDrawsOnHarness,
      this.currentLevel
    );
    this.displays.drawStats();
  }

  removeFromArr(arr, obstacle) {
    arr.splice(arr.indexOf(obstacle), 1);
  }

  gameOver() {
    this.background.moving = false;
    this.screenShown = "GameOver";

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
        this.gameOver();
      } else if (this.currentLevel === 2) {
        if (this.player.safety >= SAFETY) {
          this.victory();
        } else if (this.player.safety === 0) {
          this.gameOver();
        }
      }
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
    this.player.granolaBarsEaten = 0;
    this.currentLevel = 1;

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

  // gameOverScreen() {
  //   push();
  //   fill(169, 169, 169);
  //   rect(0, CANVAS_HEIGHT / 3, CANVAS_WIDTH, CANVAS_HEIGHT / 3);
  //   pop();

  //   // show Game Over message:
  //   push();
  //   textSize(60);
  //   textAlign(CENTER, CENTER);
  //   text("GAME OVER", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 30);
  //   pop();

  //   push();
  //   textSize(20);
  //   textAlign(CENTER, CENTER);
  //   text(
  //     "No more energy to climb, better take a rest!",
  //     CANVAS_WIDTH / 2,
  //     CANVAS_HEIGHT / 2 + 30
  //   );
  //   pop();

  //   // text to restart the game:
  //   push();
  //   textSize(14);
  //   textAlign(CENTER, BOTTOM);
  //   text(
  //     "Press Enter to restart the game",
  //     CANVAS_WIDTH / 2,
  //     CANVAS_HEIGHT / 2 + 100
  //   );
  //   pop();
  // }

  // victoryScreen() {
  //   // show victory screen:
  //   push();
  //   fill(169, 169, 169);
  //   rect(0, (CANVAS_HEIGHT / 3) * 2, CANVAS_WIDTH, CANVAS_HEIGHT / 2 - 30);
  //   pop();

  //   // show victory message:
  //   push();
  //   textSize(60);
  //   textAlign(CENTER, CENTER);
  //   text("Great Job!", CANVAS_WIDTH / 2, (CANVAS_HEIGHT / 3) * 2.5 - 30);
  //   pop();

  //   push();
  //   textSize(20);
  //   textAlign(CENTER, CENTER);
  //   text(
  //     "Did it even challenge you in any way?",
  //     CANVAS_WIDTH / 2,
  //     (CANVAS_HEIGHT / 3) * 2.5 + 30
  //   );
  //   pop();

  //   // text to continue climbing:
  //   push();
  //   textSize(14);
  //   textAlign(CENTER, BOTTOM);
  //   text(
  //     "Press Enter to climb the next mountain",
  //     CANVAS_WIDTH / 2,
  //     (CANVAS_HEIGHT / 3) * 2.5 + 100
  //   );
  //   pop();
  // }

  // startingScreen() {
  //   push();
  //   fill(169, 169, 169);
  //   rect(0, CANVAS_HEIGHT / 3, CANVAS_WIDTH, CANVAS_HEIGHT / 3);
  //   pop();

  //   // show welcome message:
  //   push();
  //   textSize(60);
  //   textAlign(CENTER, CENTER);
  //   text("Ready to climb?", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 30);
  //   pop();

  //   push();
  //   textSize(20);
  //   textAlign(CENTER, CENTER);
  //   text(
  //     "Look at the Topo for the rules of the game",
  //     CANVAS_WIDTH / 2,
  //     CANVAS_HEIGHT / 2 + 30
  //   );
  //   pop();

  //   // text to start the game:
  //   push();
  //   textSize(14);
  //   textAlign(CENTER, BOTTOM);
  //   text(
  //     "Press Enter to start the game",
  //     CANVAS_WIDTH / 2,
  //     CANVAS_HEIGHT / 2 + 100
  //   );
  //   pop();
  // }

  // screenLevel1() {
  //   // create rect:
  //   push();
  //   fill(169, 169, 169);
  //   rect(0, CANVAS_HEIGHT / 3, CANVAS_WIDTH, CANVAS_HEIGHT / 3);
  //   pop();

  //   // show name of level:
  //   push();
  //   textSize(30);
  //   textAlign(CENTER, TOP);
  //   text("Level 1 - Top Rope", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 115);
  //   pop();

  //   // show rules of level 1:
  //   push();
  //   textSize(18);
  //   textAlign(CENTER, CENTER);
  //   text(
  //     "You start climbing top rope, which means your safety is always high.",
  //     CANVAS_WIDTH / 2,
  //     CANVAS_HEIGHT / 2 - 50
  //   );
  //   text(
  //     "But beware the rocks, they will cost energy!",
  //     CANVAS_WIDTH / 2,
  //     CANVAS_HEIGHT / 2 - 30
  //   );
  //   text(
  //     "So better avoid getting to tired in order to keep climbing!",
  //     CANVAS_WIDTH / 2,
  //     CANVAS_HEIGHT / 2 - 10
  //   );
  //   pop();

  //   // show keys:
  //   image(arrowLeftImg, CANVAS_WIDTH / 8, CANVAS_HEIGHT / 2 + 30, 60, 50);
  //   image(
  //     arrowRightImg,
  //     (CANVAS_WIDTH / 8) * 1.8,
  //     CANVAS_HEIGHT / 2 + 30,
  //     60,
  //     50
  //   );

  //   push();
  //   textSize(24);
  //   textAlign(CENTER, CENTER);
  //   text("to move left/right", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 55);
  //   pop();

  //   // text to tart the game:
  //   push();
  //   textSize(14);
  //   textAlign(CENTER, BOTTOM);
  //   text(
  //     "Press Enter to start climbing top rope",
  //     CANVAS_WIDTH / 2,
  //     CANVAS_HEIGHT / 2 + 120
  //   );
  //   pop();
  // }

  // screenLevel2() {
  //   // create rect:
  //   push();
  //   fill(169, 169, 169);
  //   rect(0, CANVAS_HEIGHT / 3, CANVAS_WIDTH, CANVAS_HEIGHT / 3);
  //   pop();

  //   // show name of level:
  //   push();
  //   textSize(30);
  //   textAlign(CENTER, TOP);
  //   text("Level 2 - Lead Climbing", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 115);
  //   pop();

  //   // show rules of level 1:
  //   push();
  //   textSize(18);
  //   textAlign(CENTER, CENTER);
  //   text(
  //     "Now that you've collected enough quickdraws,",
  //     CANVAS_WIDTH / 2,
  //     CANVAS_HEIGHT / 2 - 50
  //   );

  //   text(
  //     " you can start testing your abilities in lead climbing!",
  //     CANVAS_WIDTH / 2,
  //     CANVAS_HEIGHT / 2 - 30
  //   );

  //   text(
  //     "Place quickdraws in the bolts to increase safety.",
  //     CANVAS_WIDTH / 2,
  //     CANVAS_HEIGHT / 2 - 10
  //   );

  //   text(
  //     "Missing a bolt means reducing your safety!",
  //     CANVAS_WIDTH / 2,
  //     CANVAS_HEIGHT / 2 + 10
  //   );
  //   pop();

  //   // show key:
  //   image(spaceImg, CANVAS_WIDTH / 12, CANVAS_HEIGHT / 2 + 30, 240, 50);

  //   push();
  //   textSize(24);
  //   textAlign(LEFT, CENTER);
  //   text(
  //     "to place quickdraw in bolt",
  //     CANVAS_WIDTH / 2,
  //     CANVAS_HEIGHT / 2 + 55
  //   );
  //   pop();

  //   // text to tart the game:
  //   push();
  //   textSize(14);
  //   textAlign(CENTER, BOTTOM);
  //   text(
  //     "Press Enter to start lead climbing",
  //     CANVAS_WIDTH / 2,
  //     CANVAS_HEIGHT / 2 + 120
  //   );
  //   pop();
  // }

  showScreen() {
    this.screen = new Screen(this.screenShown);
    this.screen.drawScreen();
    // switch (this.screenShown) {
    //   case "Start":
    //     this.screen.startingScreen();
    //     break;
    //   case "Level1":
    //     this.screen.screenLevel1();
    //     break;
    //   case "Level2":
    //     this.screen.screenLevel2();
    //     break;
    //   case "GameOver":
    //     this.screen.gameOverScreen();
    //     break;
    //   case "Victory":
    //     this.screen.victoryScreen();
    //     break;
    //   // default:
    //   //   this.startingScreen();
    //   //   break;
    // }
  }
}
