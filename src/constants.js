const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 800;

// key codes:
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const ENTER = 13;
const SPACE = 32;

// general values for positioning of the stats:
const ENERGY_RECT_WIDTH = 20;
const DISPLAY_TOP = 5;
const DISPLAY_TEXT_TOP = 22;

// starting energy level of player:
const ENERGY = 50;

// number of quickdraws to be collected in level 1:
const NUM_QUICKDRAWS = 4;

// safety level to be reached in level 2:
const SAFETY = 10;

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

let platformCount = 0;
