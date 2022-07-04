class Topo {
  constuctor() {
    // this.topo;
  }

  preload() {
    this.arrowLeft = loadImage(
      "./assets/graphics/vecteezy_keyboard-keys-with-flat-design-style_arrow-left.png"
    );
    this.arrowRight = loadImage(
      "./assets/graphics/vecteezy_keyboard-keys-with-flat-design-style_arrow-right.png"
    );
    this.enter = loadImage(
      "./assets/graphics/vecteezy_keyboard-keys-with-flat-design-style_enter.png"
    );
    this.space = loadImage(
      "./assets/graphics/vecteezy_keyboard-keys-with-flat-design-style_space.png"
    );
  }

  drawTopo() {
    // Display Topo:
    this.topo = createDiv(`<h2>This is the Topo</h2>`);
    this.topo.position(150, 150);

    // Display rules:
    this.rulesLevel1();
    this.rulesLevel2();
  }

  rulesLevel1() {
    // Display rules for level 1:
    this.instructionsL1 = createDiv(
      `<h3>Level 1</h3><p>You start climbing top rope, which means your safety is always high.<br>But beware the rocks, they will cost energy!<br>So better avoid getting to tired in order to keep climbing!</p><h4>Goal:</h4><p>Collect ${NUM_QUICKDRAWS} quickdraws and wear a helmet to complete this level.</p>`
    );
    this.instructionsL1.position(1400, 150);

    // Highlight the text when currently in level 1:
    if (currentLevel === 1) {
      this.instructionsL1.style("color", "seagreen");
    }
  }

  rulesLevel2() {
    // Display rules for Level 2:
    this.instructionsL2 = createDiv(
      `<h3>Level 2</h3><p>Now that you've collected enough quickdraws,<br>you can start testing your abilities in lead climbing!<br>Place your quickdraws in the bolts.<br>Missing a bolt means reducing your safety!<h4>Goal:</h4><p>Reache a safety level of ${SAFETY} in order to win the game.</p></h4></p>`
    );
    this.instructionsL2.position(1400, 400);

    // Highlight the test when currently in level 2:
    if (currentLevel === 2) {
      this.instructionsL2.style("color", "seagreen");
    }
  }
}
