class Player {
  constructor() {
    this.name = null;
    this.index = null;
    this.positionX = 0;
    this.positionY = 0;
    this.rank = 0;
    this.score = 0;
    this.fuel = 185;

  }
  addPlayer() {
    var playerRef = "players/player" + player.index;
    if (this.index === 1) {
      this.positionX = width / 2 - 100;
    }
    else {
      this.positionX = width / 2 + 100;
    }
    database.ref(playerRef).set({
      'name': this.name,
      'positionX': this.positionX,
      'positionY': this.positionY,
      'rank': this.rank,
      'score': this.score,
      'fuel': this.fuel
    });
  }
  getCount() {
    var databaseRef = database.ref("playerCount");
    databaseRef.on("value", (data) => {
      playerCount = data.val();
    })

  }
  updateCount(count) {
    var databaseRef = database.ref("/");
    databaseRef.update({
      'playerCount': count
    });
  }
  update() {
    var playerRef = "players/player" + player.index;
    database.ref(playerRef).update({
      positionX: this.positionX,
      positionY: this.positionY,
      rank: this.rank,
      score: this.score,
      fuel: this.fuel
    })
  }
  static getPlayerInfo() {
    var playerInfoRef = database.ref('players');
    playerInfoRef.on('value', (data) => {
      allPlayers = data.val();
    })
  }
}
