// player start position for x and y
var playerX = 200;
var playerY = 400;
// values possible for bugs to move around the canvas
var canvasX = [0, 100, 200, 300, 400];
var canvasY = [72, 154, 236]; //white tile positions
// keep score
var playerScore = 0;
// Enemies our player must avoid
var Enemy = function(speed) {
	// Variables applied to each of our instances go here,
	// we've provided one for you to get started
	// The image/sprite for our enemies, this uses
	// a helper we've provided to easily load images
	this.sprite = 'images/enemy-bug.png';
	this.x = -100; //it starts outside the canvas
	this.y = canvasY[Math.floor(Math.random() * canvasY.length)];
	this.speed = speed;
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	// You should multiply any movement by the dt parameter
	// which will ensure the game runs at the same speed for
	// all computers.
	this.x += this.speed * dt; //= this.x + (dt * 800 * Math.random());
	//reset enemies if gone all the way out the canvas to the right
	if (this.x > 500) {
		this.x = -100;
		this.y = canvasY[Math.floor(Math.random() * canvasY.length)];
	}
	// collision system
	if (this.x - playerX < 50 && this.x - playerX > 0 && this.y === playerY) {
		reset();
	}
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
	//the sprite for the player to load its image
	this.sprite = 'images/char-boy.png';
	this.x = playerX;
	this.y = playerY;
};
// update player coordinates
Player.prototype.update = function(dt) {
	this.x = playerX;
	this.y = playerY;
	//if won (made it to water), reset
	if (this.y === -10) {
		playerScore += 1;
		reset();
	}
};
// render player in the game at the given coordinates
Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// move the player according to user keypress and
// check for boundaries to reset if gone off the console
Player.prototype.handleInput = function(keypress) {
	if (keypress === 'left') {
		if (playerX === 0) {
			reset();
		} else {
			playerX -= 100;
		}
	}
	if (keypress === 'right') {
		if (playerX === 400) {
			reset();
		} else {
			playerX += 100;
		}
	}
	if (keypress === 'up') {
		if (playerY === -10) {
			reset();
		} else {
			playerY -= 82;
		}
	}
	if (keypress === 'down') {
		if (playerY === 400) {
			reset();
		} else {
			playerY += 82;
		}
	}
};
// reset player to starting position if won and write a message to html if lost
function reset() {
	if (playerY === -10) {
		playerX = 200;
		playerY = 400;
	} else {
		document.write("<h1>Game Over!</h1><h2>Score = " + playerScore + "</h2><h3>Refresh to play again.</h3>");
		playerX = 200;
		playerY = 400;
	}
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
//new Enemy is generated with a speed between 100 and 500
var allEnemies = [
	new Enemy(Math.floor(Math.random() * 401) + 100),
	new Enemy(Math.floor(Math.random() * 401) + 100),
	new Enemy(Math.floor(Math.random() * 401) + 100),
	new Enemy(Math.floor(Math.random() * 401) + 100),
	new Enemy(Math.floor(Math.random() * 401) + 100),
];
var player = new Player();
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