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

// general values for positioning of the stats:
const DISPLAY_TOP = 0;
const DISPLAY_WIDTH = CANVAS_WIDTH / 4;
const DISPLAY_HEIGHT = 30;
const DISPLAY_TEXT_Y = DISPLAY_HEIGHT / 2;
const DISPLAY_TEXT_X = DISPLAY_WIDTH / 2;

// starting energy level of player:
const ENERGY = 10;

// number of quickdraws to be collected in level 1:
const NUM_QUICKDRAWS = 4;

// safety level to be reached in level 2:
const SAFETY = 8;

// general values for moving obstacles and background:
const GRAVITY = 0.1;
const BACKGROUND_SPEED = 2;

// images of objects:
let rockImg;
let quickDrawImg;
let platformImg;
let helmetImg;
let granolaBarImg;

// sounds:
let rockSound;
let safetyEquipmentSound;
let eatingSound;
let victorySound;
let gameOverSound;

// variable which stores current level:
// let currentLevel = 0;

// let platformCount = 0;
