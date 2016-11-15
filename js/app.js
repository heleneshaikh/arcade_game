/* The enemy constructors takes in the X and Y positions and the speed at which it should move */
var Enemy = function (startX, startY, speed) {
    this.x = startX;
    this.y = startY;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

/* Returns a random number to indicate the speed at which the bugs have to move*/
var randomize = function () {
    return Math.random() * (200 - 130) + 130;
};

/* add the update and render functions to the enemy prototype */
Enemy.prototype = {
    update: function (dt) {
        this.x = this.x + this.speed * dt;
        if (this.x > 500) { //when bug leaves screen on the right, let him start again at the left
            this.x = -100;
        }
    },
    render: function () { //draw the spirit on the canvas
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

var initialX = 200; //where the player has to start
var initialY = 400; //where the player has to start
var maxLeft = 0; //where he hits the left wall
var maxRight = initialX * 2; //where he hits the right wall

/* the Player constructor used to create a new player and display its sprite */
var Player = function () {
    this.x = initialX;
    this.y = initialY;
    this.sprite = 'images/char-boy.png';
};

Player.prototype = {
    update: function (dt) {
        if (this.y < 0) { //if player hits water, he won and player is reset at start
            this.x = initialX;
            this.y = initialY;
            alert("You won!");
        }
        this.collision();
    },
    render: function () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    },
    handleInput: function (keyPressed) {
        /* Move the player left, right, top and bottom without it crossing the borders of the canvas */
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
                    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
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
    /* calculate whether the player hits an enemy. If so, the player returns at his initial position */
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
    /* The keyCodes and their values */
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    var pressedKey = allowedKeys[e.keyCode];
    player.handleInput(pressedKey);
});
