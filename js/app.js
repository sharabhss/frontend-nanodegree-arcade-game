"use strict";
// Object of players and enemies with their attributes available to use
var characters = {
	player: {
		boy: "images/char-boy.png",
		hornGirl: "images/char-horn-girl.png",
		catGirl: "images/char-cat-girl.png",
		x: 200,
		y: 400,
		score: 0
	},
	enemy: {
		bug: "images/enemy-bug.png",
		x: [0, 100, 200, 300, 400],
		y: [72, 154, 236]
	}
};
// Enemies our player must avoid
var Enemy = function(speed) {
	// Variables applied to each of our instances go here,
	// we've provided one for you to get started
	// The image/sprite for our enemies, this uses
	// a helper we've provided to easily load images
	this.sprite = characters.enemy.bug;
	this.x = -100; //it starts outside the canvas
	this.y = characters.enemy.y[Math.floor(Math.random() * characters.enemy.y.length)]; //random starting Y tile from option array
	this.speed = speed;
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	// You should multiply any movement by the dt parameter
	// which will ensure the game runs at the same speed for
	// all computers.
	this.x += this.speed * dt;
	//reset enemies if gone all the way out the canvas to the right
	if (this.x > 500) {
		this.x = -100;
		this.y = characters.enemy.y[Math.floor(Math.random() * characters.enemy.y.length)];
	}
	this.checkCollisions();
};
// collision system
Enemy.prototype.checkCollisions = function(){
	if (this.x - player.x < 70 && this.x - player.x > 0 && this.y === player.y) {
		player.reset();
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
	this.score = characters.player.score;
	//this.score = characters.player.score;
	//the sprite for the player to load its image
	this.sprite = characters.player.hornGirl;
	this.x = characters.player.x;
	this.y = characters.player.y;
};
// update player coordinates
Player.prototype.update = function(dt) {
	//if won (made it to water), add 1 to score and reset
	if (this.y === -10) {
		player.score++;
		this.reset();
	}
};
// render player in the game at the given coordinates
Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// move the player according to user keypress and
// check for boundaries and stop player on tile if trying to go off canvas
Player.prototype.handleInput = function(keypress) {
	if (keypress === 'left') {
		if (this.x === 0) {
			this.x = 0;
		} else {
			this.x -= 100;
		}
	}
	if (keypress === 'right') {
		if (this.x === 400) {
			this.x = 400;
		} else {
			this.x += 100;
		}
	}
	if (keypress === 'up') {
		if (this.y === -10) {
			this.y = -10
		} else {
			this.y -= 82;
		}
	}
	if (keypress === 'down') {
		if (this.y === 400) {
			this.y = 400;
		} else {
			this.y += 82;
		}
	}
};
// reset player to starting position if won or create a dialog with score and restart if lost
Player.prototype.reset = function() {
	if (this.y === -10) {
		this.x = 200;
		this.y = 400;
	} else {	
		confirm("Game Over!\nYour score = "+ player.score + "\nRefresh the page or press OK to start again!");
		location.reload();
	}
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
//new Enemy is generated with a speed between 100 and 600
var allEnemies = [
	new Enemy(Math.floor(Math.random() * 501) + 100),
	new Enemy(Math.floor(Math.random() * 501) + 100),
	new Enemy(Math.floor(Math.random() * 501) + 100),
	new Enemy(Math.floor(Math.random() * 501) + 100),
	new Enemy(Math.floor(Math.random() * 501) + 100),
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
});