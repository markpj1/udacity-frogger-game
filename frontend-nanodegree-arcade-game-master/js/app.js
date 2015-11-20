// Enemies our player must avoid
var TILE_WIDTH = 101,
  TILE_HEIGHT = 83,
  counter = 0;

var Enemy = function(x, y, speed) {
  this.sprite = 'images/enemy-bug.png';
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.reset();
};

Enemy.prototype.update = function update(dt) {
  this.x += this.speed * (dt);
  this.reset();
  console.log('this.x', this.x, 'this.y', this.y); ////look at animation increments.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  //resets player image when collision within range of 30px.
  if (player.x >= this.x - 30 && player.x <= this.x + 30) {
    if (player.y >= this.y - 30 && player.y <= this.y + 30) {
      counter -= 100;
      player.reset();
      score(counter);
    }
  }
};

Enemy.prototype.reset = function() {
  if (this.x > 505) {
    this.x = -TILE_HEIGHT;
  }
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
  this.x = x;
  this.y = y;
  console.log(x);
  this.sprite = 'images/char-boy.png';
  //this.reset();
};

Player.prototype.update = function(dt) {};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.reset = function() {
  this.x = 202;
  this.y = 404;
};

Player.prototype.handleInput = function(key) {
  if (key === 'left') { //moves player.
    this.x -= 101;
  } else if (key === 'up') {
    this.y -= 82.5;
  } else if (key === 'right') {
    this.x += 101;
  } else if (key === 'down') {
    this.y += 82.5;
  }
  if (this.x < 0) { //creates borders
    this.x = 0;
  }
  if (this.x > 404) {
    this.x = 404;
  }
  if (this.y > 404) {
    this.y = 404;
  }
  if (this.y < 74) { //resets to start position.
    counter -= 100;
    this.x = 202;
    this.y = 404;
    score(counter); //go in water lose 100 points.
  }
  console.log('Y', this.y, 'X', this.x);
};

var Heart = function(x, y) {
  this.sprite = 'images/Heart.png';
  this.x = x;
  this.y = y;
  console.log(this);
};

Heart.prototype.update = function(dt) {};

Heart.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  if (player.x >= this.x - 30 && player.x <= this.x + 30) {
    if (player.y >= this.y - 30 && player.y <= this.y + 30) {
      allEnemies[0].speed += getRandomInt(2, 6) + 30;
      allEnemies[1].speed += getRandomInt(2, 6) + 30;
      allEnemies[2].speed += getRandomInt(2, 6) + 30;
      counter += 100;
      score(counter);
      this.reset();

      console.log('allEnemies array;', allEnemies);
    }
  }
};

Heart.prototype.reset = function() {
  this.x = getRandomInt(0, 4) * TILE_WIDTH;
  this.y = getRandomInt(1, 3) * TILE_HEIGHT;
  console.log('x', this.x, 'y', this.y);
};

//Pure function? keeps score.
function score(num) {
  var scoreId = document.getElementById('score');
  scoreId.innerHTML = 'Score: ' + num;
}

////creates 3 new Enemy objects inside allEnemies array. 
var allEnemies = [];
for (var i = 1; i <= 3; i++) {
  var speed = getRandomInt(1, 6) * 60;
  this.x = i - 125;
  this.y = i * 75;
  var enemy = new Enemy(x, y, speed);
  allEnemies.push(enemy);
}
//instantiation of player.
var player = new Player(202, 404);
var heart = new Heart(202, 166);

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  heart.render();
  player.render();
  player.handleInput(allowedKeys[e.keyCode]);
});