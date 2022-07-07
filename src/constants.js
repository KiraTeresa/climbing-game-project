const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 800;

// key codes:
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const ENTER = 13;
const SPACE = 32;

// key images:
let arrowLeftImg;
let arrowRightImg;
let enterImg;
let spaceImg;

// starting energy level of player:
const ENERGY = 30;

// number of quickdraws to be collected in level 1:
const NUM_QUICKDRAWS = 8;

// safety level to be reached in level 2:
const SAFETY = 18;

// general values for moving obstacles and background:
const GRAVITY = 0.1;
const BACKGROUND_SPEED = 2;

// images:
let rockImg;
let quickDrawImg;
let platformImg;
let helmetImg;
let granolaBarImg;
let startImg;
let victoryImg;
let tiredImg;

// sounds:
let rockSound;
let safetyEquipmentSound;
let eatingSound;
let victorySound;
let gameOverSound;
