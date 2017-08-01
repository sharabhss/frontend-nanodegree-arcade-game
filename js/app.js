"use strict";
// Object of players and enemies with their attributes available to use
var characters = {
	player: {
		boy: "images/char-boy.png",
		hornGirl: "images/char-horn-girl.png",
		catGirl: "images/char-cat-girl.png",
		pinkGirl: "images/char-pink-girl.png",
		princessGirl: "images/char-princess-girl.png",
		x: 200,
		y: 400,
		score: 0,
		lives: 5
	},
	enemy: {
		bug: "images/enemy-bug.png",
		x: [0, 100, 200, 300, 400],
		y: [72, 154, 236]
	},
	trophy: {
		gemBlue: "images/gem-blue.png",
		gemGreen: "images/gem-green.png",
		gemOrange: "images/gem-orange.png",
		heart: "images/Heart.png",
		key: "images/Key.png",
		rock: "images/Rock.png",
		selector: "images/Selector.png",
		star: "images/Star.png",
		keyCollected: 0
	}
};
// all y values for movement = [-10, 72, 154, 236, 318, 400]
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
	if (this.x - player.x < 50 && this.x - player.x > 0 && this.y === player.y) {
		if(player.lives === 0){
			player.reset();			
		} else {
			player.lives--;
			console.log(player.lives);
		}
	}
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(sprite) {
	this.score = characters.player.score;
	this.lives = characters.player.lives;
	//this.score = characters.player.score;
	//the sprite for the player to load its image
	this.sprite = sprite;
	this.x = characters.player.x;
	this.y = characters.player.y;
};
// update player coordinates
Player.prototype.update = function(dt) {
	//if won (made it to water), add 1 to score and reset
	if (this.y === -10) {
		player.score++;
		console.log(player.score);
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
	switch(keypress) {
		case 'left':
			if (this.x === 0) {
				this.x = 0;
			} else {
				this.x -= 100;
			}
			break;
		case 'right':
			if (this.x === 400) {
				this.x = 400;
			} else {
				this.x += 100;
			}
			break;
		case 'up':
			if (this.y === -10) {
				this.y = -10
			} else {
				this.y -= 82;
			}
			break;
		case 'down':
			if (this.y === 400) {
				this.y = 400;
			} else {
				this.y += 82;
			}
			break;
	}
};
// reset player to starting position if won or create a dialog with score and restart if lost
Player.prototype.reset = function() {
	// if player made it to the river, do this:
	if (this.y === -10) {
		//reset player to starting position
		this.x = 200;
		this.y = 400;
		//reset key to a new random tile
		key.x = characters.enemy.x[Math.floor(Math.random() * characters.enemy.x.length)];
		key.y = characters.enemy.y[Math.floor(Math.random() * characters.enemy.y.length)];
	} else {	
		confirm("Game Over!\nYour score = "+ player.score + "\nKeys Collected = " + key.keys + "\nRefresh the page or press OK to start again!");
		location.reload();
	}
};
//Key class
var Key = function(x,y){
	this.sprite = characters.trophy.key;
	this.x = x;
	this.y = y;
	this.keys = characters.trophy.keyCollected;
}
// render keys in the game at the given coordinates
Key.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Key.prototype.update = function() {
	this.checkCollisions();
}
// check collision of key with player and give +2 score
Key.prototype.checkCollisions = function() {
	if (this.x === player.x && this.y === player.y) {
		// the counter doesnt work! figure out a way to remove key once the collision occurs
		key.keys++;
		console.log(key.keys);
	}
};
//Heart class
var Heart = function(x,y){
	this.sprite = characters.trophy.heart;
	this.x = x;
	this.y = y;
}
// render keys in the game at the given coordinates
Heart.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Heart.prototype.update = function() {
	this.checkCollisions();
}
// check collision of key with player and give +2 score
Heart.prototype.checkCollisions = function() {
	if (this.x === player.x && this.y === player.y) {
		// figure out a way to remove the heart once the collision occurs
		player.lives--;
		console.log(player.lives);
	}
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
//new Enemy is generated with a speed between 100 and 600
var allEnemies = [];
//create 6 enemies and push them to the allEnemies array
for (var i = 0; i < 6; i++) {
	allEnemies.push(new Enemy(Math.floor(Math.random() * 501) + 100));
}
// new player is created with a sprite given
var player = new Player(characters.player.hornGirl);
// new key sprite is placed at random white (enemy) tile
var key = new Key(characters.enemy.x[Math.floor(Math.random() * characters.enemy.x.length)], (characters.enemy.y[Math.floor(Math.random() * characters.enemy.y.length)])+5);
// new heart sprite is placed at random white (enemy) tile
var heart = new Heart(characters.enemy.x[Math.floor(Math.random() * characters.enemy.x.length)], (characters.enemy.y[Math.floor(Math.random() * characters.enemy.y.length)])+10);
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