class Screen {
  constructor(screenShown) {
    this.screenShown = screenShown;
  }

  drawScreen() {
    switch (this.screenShown) {
      case "Start":
        this.startingScreen();
        break;
      case "Level1":
        this.screenLevel1();
        break;
      case "Level2":
        this.screenLevel2();
        break;
      case "GameOver":
        this.gameOverScreen();
        break;
      case "Victory":
        this.victoryScreen();
        break;
      // default:
      //   this.startingScreen();
      //   break;
    }
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
    text("Ready to climb?", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 30);
    pop();

    push();
    textSize(20);
    textAlign(CENTER, CENTER);
    text(
      "Look at the Topo for the rules of the game",
      CANVAS_WIDTH / 2,
      CANVAS_HEIGHT / 2 + 30
    );
    pop();

    // text to start the game:
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

  screenLevel1() {
    // create rect:
    push();
    fill(169, 169, 169);
    rect(0, CANVAS_HEIGHT / 3, CANVAS_WIDTH, CANVAS_HEIGHT / 3);
    pop();

    // show name of level:
    push();
    textSize(30);
    textAlign(CENTER, TOP);
    text("Level 1 - Top Rope", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 115);
    pop();

    // show rules of level 1:
    push();
    textSize(18);
    textAlign(CENTER, CENTER);
    text(
      "You start climbing top rope, which means your safety is always high.",
      CANVAS_WIDTH / 2,
      CANVAS_HEIGHT / 2 - 50
    );
    text(
      "But beware the rocks, they will cost energy!",
      CANVAS_WIDTH / 2,
      CANVAS_HEIGHT / 2 - 30
    );
    text(
      "So better avoid getting to tired in order to keep climbing!",
      CANVAS_WIDTH / 2,
      CANVAS_HEIGHT / 2 - 10
    );
    pop();

    // show keys:
    image(arrowLeftImg, CANVAS_WIDTH / 8, CANVAS_HEIGHT / 2 + 30, 60, 50);
    image(
      arrowRightImg,
      (CANVAS_WIDTH / 8) * 1.8,
      CANVAS_HEIGHT / 2 + 30,
      60,
      50
    );

    push();
    textSize(24);
    textAlign(CENTER, CENTER);
    text("to move left/right", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 55);
    pop();

    // text to tart the game:
    push();
    textSize(14);
    textAlign(CENTER, BOTTOM);
    text(
      "Press Enter to start climbing top rope",
      CANVAS_WIDTH / 2,
      CANVAS_HEIGHT / 2 + 120
    );
    pop();
  }

  screenLevel2() {
    // create rect:
    push();
    fill(169, 169, 169);
    rect(0, CANVAS_HEIGHT / 3, CANVAS_WIDTH, CANVAS_HEIGHT / 3);
    pop();

    // show name of level:
    push();
    textSize(30);
    textAlign(CENTER, TOP);
    text("Level 2 - Lead Climbing", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 115);
    pop();

    // show rules of level 1:
    push();
    textSize(18);
    textAlign(CENTER, CENTER);
    text(
      "Now that you've collected enough quickdraws,",
      CANVAS_WIDTH / 2,
      CANVAS_HEIGHT / 2 - 50
    );

    text(
      " you can start testing your abilities in lead climbing!",
      CANVAS_WIDTH / 2,
      CANVAS_HEIGHT / 2 - 30
    );

    text(
      "Place quickdraws in the bolts to increase safety.",
      CANVAS_WIDTH / 2,
      CANVAS_HEIGHT / 2 - 10
    );

    text(
      "Missing a bolt means reducing your safety!",
      CANVAS_WIDTH / 2,
      CANVAS_HEIGHT / 2 + 10
    );
    pop();

    // show key:
    image(spaceImg, CANVAS_WIDTH / 12, CANVAS_HEIGHT / 2 + 30, 240, 50);

    push();
    textSize(24);
    textAlign(LEFT, CENTER);
    text(
      "to place quickdraw in bolt",
      CANVAS_WIDTH / 2,
      CANVAS_HEIGHT / 2 + 55
    );
    pop();

    // text to tart the game:
    push();
    textSize(14);
    textAlign(CENTER, BOTTOM);
    text(
      "Press Enter to start lead climbing",
      CANVAS_WIDTH / 2,
      CANVAS_HEIGHT / 2 + 120
    );
    pop();
  }

  gameOverScreen() {
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

  victoryScreen() {
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
}
