const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 800;

const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const ENTER = 13;

const ENERGY_RECT_WIDTH = 20;

const ENERGY = 50;
const SAFETY = 5;

// images of objects:
let rockImg;
let quickDrawImg;
let platformImg;
let helmetImg;
let granolaBarImg;

// sounds:
let rockSound;
let quickDrawSound;
let eatingSound;
let victorySound;

const GRAVITY = 0.1;

let platformCount = 0;
