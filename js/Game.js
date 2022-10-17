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
          camera.position.y = cars[index].position.y;
        }

        index = index + 1;

        //console.log(x, y);
      }

      this.handlePlayerControls();

      drawSprites();
    }
  }

  end() {
    
  }
}

