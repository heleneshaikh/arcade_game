var Enemy = function (startX, startY, speed) {
    this.x = startX;
    this.y = startY;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

var randomize = function () {
    return Math.random() * (150 - 80) + 80;
};

Enemy.prototype = {
    update: function (dt) {
        this.x = this.x + this.speed * dt;
        if (this.x > 500) {
            this.x = -100;
        }

    },
    render: function () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

var initialX = 200;
var initialY = 400;
var maxLeft = 0;
var maxRight = initialX * 2;

var Player = function () {
    this.x = initialX;
    this.y = initialY;
    this.sprite = 'images/char-boy.png';
};

Player.prototype = {
    update: function (dt) {
        player.collision();
    },
    render: function () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    },
    handleInput: function (keyPressed) {
        switch (keyPressed) {
            case 'left':
                if (this.x == maxLeft) {
                    this.x = maxLeft;
                } else {
                    this.x = this.x - 100;
                }
                break;
            case 'up':
                if (this.y < 10) {
                    this.y = -50;
                } else {
                    this.y = this.y - 90;
                }
                break;
            case 'right':
                if (this.x == maxRight) {
                    this.x = maxRight;
                } else {
                    this.x = this.x + 100;
                }
                break;
            case 'down':
                if (this.y == initialY) {
                    this.y = initialY;
                } else {
                    this.y = this.y + 90;
                }
                break;
        }
    },
    collision: function () {
        for (var i = 0; i < allEnemies.length; i++) {
            if (allEnemies[i].x < this.x + 50 &&
                allEnemies[i].x + 50 > this.x &&
                allEnemies[i].y < this.y + 60 &&
                40 + allEnemies[i].y > this.y) {
                this.x = initialX;
                this.y = initialY;
            }
        }
    }
};

var enemyOne = new Enemy(0, 65, randomize());
var enemyTwo = new Enemy(0, 145, randomize());
var enemyThree = new Enemy(0, 230, randomize());
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