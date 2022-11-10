var canvas;
var backgroundImage;
var bgImg;
var database;
let trackImg, car1Img, car2Img
var form, player;
var playerCount;
var gameState;
let allPlayers = [];
var car1, car2, cars;
var powercoinImage, fuelImage, obstacle1Image, obstacle2Image;
let powerCoins, fuels, obstacles;
let obstacle1, obstacle2


function preload() {
  backgroundImage = loadImage("./assets/background.png");
  trackImg = loadImage('./assets/track.jpg')
  car1Img = loadImage('./assets/car1.png')
  car2Img = loadImage('./assets/car2.png');
  powercoinImage = loadImage('./assets/goldcoin.png')
  fuelImg = loadImage('./assets/fuel.png')
  obstacle1Image = loadImage('./assets/obstacle1.png')
  obstacle2Image = loadImage('./assets/obstacle2.png')
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();

}

function draw() {
  background(backgroundImage);
  if (playerCount == 2) {
    game.update(1);
  }

  if (gameState == 1) {
    game.play();
  }

  if(gameState == 2){
    game.end();
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
