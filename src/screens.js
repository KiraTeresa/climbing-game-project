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

  createRect(top) {
    push();
    fill(169, 169, 169);
    rect(0, top, CANVAS_WIDTH, CANVAS_HEIGHT / 3);
    pop();
  }

  createLevelHeader(headerText) {
    // Level header:
    push();
    textSize(30);
    textAlign(CENTER, TOP);
    text(headerText, CANVAS_WIDTH / 2, (CANVAS_HEIGHT / 3) * 2.5 - 115);
    pop();
  }

  createLevelRules(line1, line2, line3, line4) {
    // level rules:
    push();
    textSize(18);
    textAlign(CENTER, CENTER);
    text(line1, CANVAS_WIDTH / 2, (CANVAS_HEIGHT / 3) * 2.5 - 50);
    text(line2, CANVAS_WIDTH / 2, (CANVAS_HEIGHT / 3) * 2.5 - 30);
    text(line3, CANVAS_WIDTH / 2, (CANVAS_HEIGHT / 3) * 2.5 - 10);
    text(line4, CANVAS_WIDTH / 2, (CANVAS_HEIGHT / 3) * 2.5 + 10);
    pop();
  }

  keysToUse(img1, img2, decribeFunction) {
    let textLeft;

    if (img2) {
      image(img1, CANVAS_WIDTH / 8, (CANVAS_HEIGHT / 3) * 2.5 + 30, 60, 50);
      image(
        img2,
        (CANVAS_WIDTH / 8) * 1.8,
        (CANVAS_HEIGHT / 3) * 2.5 + 30,
        60,
        50
      );
      textLeft = CENTER;
    } else {
      image(img1, CANVAS_WIDTH / 12, (CANVAS_HEIGHT / 3) * 2.5 + 30, 240, 50);
      textLeft = LEFT;
    }

    push();
    textSize(24);
    textAlign(textLeft, CENTER);
    text(decribeFunction, CANVAS_WIDTH / 2, (CANVAS_HEIGHT / 3) * 2.5 + 55);
    pop();
  }

  reStartText(someText, yAxis) {
    push();
    textSize(14);
    textAlign(CENTER, BOTTOM);
    text(someText, CANVAS_WIDTH / 2, yAxis);
    pop();
  }

  startingScreen() {
    // rect:
    // this.createRect(CANVAS_HEIGHT / 3);
    image(startImg, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // show welcome message:
    push();
    textSize(60);
    textAlign(CENTER, CENTER);
    text("Ready to climb?", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 70);
    pop();

    // push();
    // textSize(20);
    // textAlign(CENTER, CENTER);
    // text(
    //   "Look at the Topo for the rules of the game",
    //   CANVAS_WIDTH / 2,
    //   CANVAS_HEIGHT / 2 + 30
    // );
    // pop();

    // text to start the game:
    this.reStartText("Press Enter to start the game", CANVAS_HEIGHT / 2 + 120);
    // push();
    // textSize(14);
    // textAlign(CENTER, BOTTOM);
    // text(
    //   "Press Enter to start the game",
    //   CANVAS_WIDTH / 2,
    //   CANVAS_HEIGHT / 2 + 100
    // );
    // pop();
  }

  screenLevel1() {
    // rect:
    image(startImg, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    this.createRect((CANVAS_HEIGHT / 3) * 2);

    // header text:
    this.createLevelHeader("Level 1 - Top Rope");

    // show rules of level 1:
    this.createLevelRules(
      "You start climbing top rope, which means your safety is always high.",
      "But beware the rocks, they will cost energy!",
      "So better avoid getting to tired in order to keep climbing!",
      "Wear a helmet and collect enough quickdraws to get to the top."
    );

    // important keys in level 1:
    this.keysToUse(arrowLeftImg, arrowRightImg, "to move left/right");

    // text to start level 1:
    this.reStartText(
      "Press Enter to start climbing top rope",
      CANVAS_HEIGHT - 20
    );
    // show name of level:
    // push();
    // textSize(30);
    // textAlign(CENTER, TOP);
    // text("Level 1 - Top Rope", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 115);
    // pop();

    // show rules of level 1:
    // push();
    // textSize(18);
    // textAlign(CENTER, CENTER);
    // text(
    //   "You start climbing top rope, which means your safety is always high.",
    //   CANVAS_WIDTH / 2,
    //   CANVAS_HEIGHT / 2 - 50
    // );
    // text(
    //   "But beware the rocks, they will cost energy!",
    //   CANVAS_WIDTH / 2,
    //   CANVAS_HEIGHT / 2 - 30
    // );
    // text(
    //   "So better avoid getting to tired in order to keep climbing!",
    //   CANVAS_WIDTH / 2,
    //   CANVAS_HEIGHT / 2 - 10
    // );
    // pop();

    // show keys:
    // image(arrowLeftImg, CANVAS_WIDTH / 8, CANVAS_HEIGHT / 2 + 30, 60, 50);
    // image(
    //   arrowRightImg,
    //   (CANVAS_WIDTH / 8) * 1.8,
    //   CANVAS_HEIGHT / 2 + 30,
    //   60,
    //   50
    // );

    // push();
    // textSize(24);
    // textAlign(CENTER, CENTER);
    // text("to move left/right", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 55);
    // pop();

    // text to tart the game:
    // push();
    // textSize(14);
    // textAlign(CENTER, BOTTOM);
    // text(
    //   "Press Enter to start climbing top rope",
    //   CANVAS_WIDTH / 2,
    //   CANVAS_HEIGHT / 2 + 120
    // );
    // pop();
  }

  screenLevel2() {
    // rect:
    this.createRect((CANVAS_HEIGHT / 3) * 2);

    // header text:
    this.createLevelHeader("Level 2 - Lead Climbing");

    // show rules of level 2:
    this.createLevelRules(
      "Now that you've collected enough quickdraws,",
      "you can start testing your abilities in lead climbing!",
      "Place quickdraws in the bolts to increase safety.",
      "Missing a bolt means reducing your safety!"
    );

    // important keys in level 2:
    this.keysToUse(spaceImg, "", "to place quickdraw in bolt");

    // text to continue:
    this.reStartText("Press Enter to start lead climbing", CANVAS_HEIGHT - 20);
    // show name of level:
    // push();
    // textSize(30);
    // textAlign(CENTER, TOP);
    // text("Level 2 - Lead Climbing", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 115);
    // pop();

    // show rules of level 2:
    // push();
    // textSize(18);
    // textAlign(CENTER, CENTER);
    // text(
    //   "Now that you've collected enough quickdraws,",
    //   CANVAS_WIDTH / 2,
    //   CANVAS_HEIGHT / 2 - 50
    // );

    // text(
    //   "you can start testing your abilities in lead climbing!",
    //   CANVAS_WIDTH / 2,
    //   CANVAS_HEIGHT / 2 - 30
    // );

    // text(
    //   "Place quickdraws in the bolts to increase safety.",
    //   CANVAS_WIDTH / 2,
    //   CANVAS_HEIGHT / 2 - 10
    // );

    // text(
    //   "Missing a bolt means reducing your safety!",
    //   CANVAS_WIDTH / 2,
    //   CANVAS_HEIGHT / 2 + 10
    // );
    // pop();

    // show key:
    // image(spaceImg, CANVAS_WIDTH / 12, CANVAS_HEIGHT / 2 + 30, 240, 50);

    // push();
    // textSize(24);
    // textAlign(LEFT, CENTER);
    // text(
    //   "to place quickdraw in bolt",
    //   CANVAS_WIDTH / 2,
    //   CANVAS_HEIGHT / 2 + 55
    // );
    // pop();

    // text to tart the game:
    // push();
    // textSize(14);
    // textAlign(CENTER, BOTTOM);
    // text(
    //   "Press Enter to start lead climbing",
    //   CANVAS_WIDTH / 2,
    //   CANVAS_HEIGHT / 2 + 120
    // );
    // pop();
  }

  gameOverScreen() {
    // rect:
    this.createRect(CANVAS_HEIGHT / 3);

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
    this.reStartText("Press Enter to restart the game");
    // push();
    // textSize(14);
    // textAlign(CENTER, BOTTOM);
    // text(
    //   "Press Enter to restart the game",
    //   CANVAS_WIDTH / 2,
    //   CANVAS_HEIGHT / 2 + 100
    // );
    // pop();
  }

  victoryScreen() {
    // rect:
    // this.createRect((CANVAS_HEIGHT / 3) * 2);
    image(victoryImg, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // show victory message:
    push();
    textSize(60);
    fill("#FAF0E6");
    textAlign(CENTER, CENTER);
    text("Great Job!", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 4);
    pop();

    push();
    textSize(20);
    fill("#FAF0E6");
    textAlign(CENTER, CENTER);
    text(
      "You're a real mountain goat!",
      CANVAS_WIDTH / 2,
      CANVAS_HEIGHT / 4 + 50
    );
    pop();

    // text to continue climbing:
    push();
    textSize(14);
    fill("#FAF0E6");
    textAlign(CENTER, BOTTOM);
    text(
      "Press Enter to climb the next mountain",
      CANVAS_WIDTH / 2,
      (CANVAS_HEIGHT / 3) * 2.5 + 120
    );
    pop();
  }
}
