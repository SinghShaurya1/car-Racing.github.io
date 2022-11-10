class Form {
  constructor() {
    this.input = createInput("").attribute("placeholder", "Enter your name");
    this.playButton = createButton("Play");
    this.titleImg = createImg("./assets/title.png", "game title");
    this.greeting = createElement("h2");
  }

  hide() {
    this.greeting.hide();
    this.playButton.hide();
    this.input.hide();
  }
  setElementsPosition() {
    this.titleImg.position(160, 160);
    this.input.position(width / 2 - 100, height / 2 - 80);
    this.playButton.position(width / 2 - 80, height / 2 - 20);
    this.greeting.position(width / 2 - 600, height / 2 - 100);
  }

  setElementsStyle() {
    this.titleImg.class('gameTitle');
    this.input.class('customInput');
    this.playButton.class('customButton');
    this.greeting.class('greeting');
  }

  display() {
    this.setElementsPosition();
    this.setElementsStyle();
    this.handleMousePressed();
  }

  handleMousePressed() {
    this.playButton.mousePressed(() => {
      //console.log("Mouse is pressed....");
      this.input.hide();
      this.playButton.hide();
      var name = this.input.value();
      var msg = "Hello " + name + ". Welcome to the game. waiting for other players to join...";
      this.greeting.html(msg);
      player.name = name;
      playerCount = playerCount + 1;
      player.index = playerCount
      player.addPlayer();
      player.updateCount(playerCount);
    });
  }
}
