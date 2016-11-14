var Enemy = function (startX, startY, speed) {
    this.x = startX;
    this.y = startY;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype = {
    update: function (dt) {
        // this.x = this.x + this.speed * dt;
    },
    render: function () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

var initialX = 202;
var initialY = 400;
var Player = function () {
    this.x = initialX;
    this.y = initialY;
    this.sprite = 'images/char-boy.png';
};

Player.prototype = {
    update: function (dt) {

    },
    render: function () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    },
    handleInput: function (keyPressed) {
      switch (keyPressed) {
          case 'left':
              this.x = this.x - 100;
              break;
          case 'up':
              this.y = this.y - 100;
              break;
          case 'right':
              this.x = this.x + 100;
              break;
          case 'down':
              this.y = this.y + 100;
              break;
      }
    }
};

var enemyOne = new Enemy(0, 65);
var enemyTwo = new Enemy(0, 145);
var enemyThree = new Enemy(0, 230);
var allEnemies = [enemyOne, enemyTwo, enemyThree];
var player = new Player();

document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left', //key codes
        38: 'up',
        39: 'right',
        40: 'down'
    };
    var pressedKey = allowedKeys[e.keyCode];
    player.handleInput(pressedKey);
});