class Game {
  constructor() {
    this.resetButton = createButton("Reset Game");
    this.leaderBoardTitle = createElement("h2");
    this.leader1 = createElement("h2");
    this.leader2 = createElement("h2");
  }

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    });

  }

  update(state) {
    database.ref('/').update({
      'gameState': state
    });
  }

  start() {

    player = new Player();
    player.getCount();

    form = new Form();
    form.display();

    car1 = createSprite(width / 2 - 50, height - 100);
    car1.addImage("car1", car1Img);
    car1.scale = 0.07;

    car2 = createSprite(width / 2 + 50, height - 100);
    car2.addImage("car2", car2Img);
    car2.scale = 0.07;

    cars = [car1, car2];

    powerCoins = new Group();
    fuels = new Group();
    obstacles = new Group();

    var obstaclesPositions = [
      { x: width / 2 + 250, y: height - 800, image: obstacle2Image },
      { x: width / 2 - 250, y: height - 1600, image: obstacle2Image },
      { x: width / 2 - 40, y: height - 1900, image: obstacle1Image },
      { x: width / 2 + 180, y: height - 2400, image: obstacle1Image },
      { x: width / 2, y: height - 3300, image: obstacle1Image },
      { x: width / 2 - 180, y: height - 2800, image: obstacle2Image },
      { x: width / 2 + 250, y: height - 3500, image: obstacle1Image },
      { x: width / 2 - 150, y: height - 3800, image: obstacle2Image },
      { x: width / 2, y: height - 4400, image: obstacle1Image },
      { x: width / 2 + 180, y: height - 4800, image: obstacle2Image },
      { x: width / 2 - 250, y: height - 5200, image: obstacle2Image },
      { x: width / 2 + 250, y: height - 5700, image: obstacle1Image },
    ]

    this.addSprites(powerCoins, 18, powercoinImage, 0.08);
    this.addSprites(fuels, 5, fuelImg, 0.02);
    this.addSprites(obstacles, obstaclesPositions.length, obstacle1Image, 0.04, obstaclesPositions);
  }

  addSprites(spriteGroup, numberOfSprites, spritesImage, scale, positions = []) {
    for (var i = 0; i < numberOfSprites; i++) {
      var x, y;
      if (positions.length > 0) {
        x = positions[i].x;
        y = positions[i].y;
        spritesImage = positions[i].image
      }
      else {
        x = random(width / 2 + 150, width / 2 - 150);
        y = random(-height * 4.5, height - 400);
      }
      var sprite = createSprite(x, y);
      sprite.addImage("sprite", spritesImage);
      sprite.scale = scale;
      spriteGroup.add(sprite);
    }

  }

  handelElement() {
    form.hide()
    form.titleImg.position(40, 50);
    form.titleImg.class('gameTitleAfterEffect');

    this.resetButton.position(width / 2 + 250, 100);
    this.resetButton.class("resetButton");

    this.leaderBoardTitle.html("Leader Board");
    this.leaderBoardTitle.class("resetText");
    this.leaderBoardTitle.position(width / 3 - 60, 40);

    this.leader1.class("leadersText");
    this.leader1.position(width / 3 - 50, 80)

    this.leader2.class("leadersText");
    this.leader2.position(width / 3 - 50, 130)

  }

  handleResetButton() {
    this.resetButton.mousePressed(() => {
      database.ref("/").set({
        playerCount: 0,
        gameState: 0,
        players: {}
      });
      window.location.reload();
    });
  }

  handlePlayerControls() {
    if (keyIsDown(UP_ARROW)) {
      player.positionY = player.positionY - 10;
      player.update();
    }

    if (keyIsDown(LEFT_ARROW) && player.positionX > width / 3 - 50) {
      player.positionX = player.positionX - 10;
      player.update();
    }

    if (keyIsDown(RIGHT_ARROW) && player.positionX < width / 2 + 300) {
      player.positionX = player.positionX + 10;
      player.update();
    }

  }

  play() {
    this.handelElement();
    this.handleResetButton();
    Player.getPlayerInfo();
    if (allPlayers !== undefined) {
      image(trackImg, 0, -height * 5, width, height * 6);
      var index = 0;
      for (var plr in allPlayers) {

        var x = allPlayers[plr].positionX;
        var y = allPlayers[plr].positionY;

        cars[index].position.x = x;
        cars[index].position.y = y;


        if ((index + 1) == player.index) {
          stroke(10);
          fill("red");
          ellipse(x, y, 60, 60);
          this.handlePowerCoins(player.index);
          this.handleFuels(player.index);
          this.handleObstacleCollision(player.index);
          camera.position.y = cars[index].position.y;
        }

        index = index + 1;

        //console.log(x, y);
      }

      this.handlePlayerControls();
     
      this.showFuelBar()

      var finishLine = height * 6 -1000;
      if((player.positionY * -1) > finishLine){
        console.log("crossed finish line...")
        gameState = 2;
        player.rank += 1;
        player.update();
        this.showRank();
      }

      drawSprites();
    }
  }

  showLeaderBoard() {
    var leader1, leader2;
    var players = Object.values(allPlayers);




    if ((players[0].rank === 0 && players[1].rank === 0) || players[0].rank === 1) {
      leader1 = players[0].rank + "&emsp;" + players[0].name + "&emsp;" + players[0].score;
      leader2 = players[1].rank + "&emsp;" + players[1].name + "&emsp;" + players[1].score;
    }
    if (players[1].rank === 1) {
      leader1 = players[1].rank + "&emsp;" + players[1].name + "&emsp;" + players[1].score;
      leader2 = players[0].rank + "&emsp;" + players[0].name + "&emsp;" + players[0].score;
    }

    this.leader1.html(leader1);
    this.leader2.html(leader2);
  }

  handlePowerCoins(index) {
    cars[index - 1].overlap(powerCoins, function (collector, collected) {
      player.score = player.score + 20;
      player.update();
      collected.remove();
    });
  }
  handleFuels(index) {
    cars[index - 1].overlap(fuels, function (collector, collected) {
      player.fuel = player.fuel + 10;
      player.update();
      collected.remove();
    });
  }
  handleObstacleCollision(index){
    if(cars[index - 1].collide(obstacles)){
      gameState = 2;
      player.fuel = 0;
      player.update();
    }
  }
  gameOver(){
    swal({
      title: `Game Over`,
      text: "Oops you lost the race....!!",
      imageUrl: "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "Thanks for Playing"
    })
  }
  showFuelBar(){
    push();
    image(fuelImage, 230, height - player.positionY, 20, 20);
    fill("white");
    rect(200, height - player.positionY, 185, 20 );
    fill ("red");
    rect(200, height - player.positionY, player.fuel, 20 );
    pop();
  }

  showRank(){
    swal({
      title: `Awsome! Rank ${player.rank}`,
      text: "You successfully reached the finishing line",
      imageUrl:"https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
      imageSize: "100x100",
      confirmButtonText: "OK"
      
    })
  }
  end() {
   if(player.fuel == 0){
      this.gameOver();
   }
  }

}
