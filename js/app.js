var Enemy = function(startX, startY, speed) {
    this.x = startX;
    this.y = startY;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype = {
    update : function(dt) { // You should multiply any movement by the dt parameter which will ensure the game runs at the same speed for all computers.

    },
    render: function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

var Player = function(startX, startY, speed) {
    this.x = startX;
    this.y = startY;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
};

Player.prototype = {
    update: function(dt) {

    },
    render: function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    },
    handleInput : function() {

    }

};

var enemyOne = new Enemy(0, 65);
var enemyTwo = new Enemy(0, 145);
var enemyThree = new Enemy(0, 230);
var allEnemies = [enemyOne, enemyTwo, enemyThree];
var player = new Player(202, 400);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});