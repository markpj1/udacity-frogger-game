// Enemies our player must avoid
var Enemy = function(x, y, speed) {
  this.sprite = 'images/enemy-bug.png';
  this.x = x;
  this.y = y;
  this.speed = speed;
  //console.log('this:', this) ////look at enemy object.
  this.reset();

};


Enemy.prototype.update = function update(dt) {
  this.x += this.speed * (dt);
  this.reset();
  //console.log('this.x', this.x, 'this.y', this.y); ////look at animation increments.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  //resets player image when collision within range of 30px.
  if (player.x >= this.x - 30 && player.x <= this.x + 30) {
    if (player.y >= this.y - 30 && player.y <= this.y + 30) {
      player.reset();
    }
  }
}

Enemy.prototype.reset = function() {
    if (this.x > 505) {
      this.x = -101;      
    }        
  }
  // Now write your own player class
  // This class requires an update(), render() and
  // a handleInput() method.
var Player = function(x, y) {
  this.x = x;
  this.y = y;
  console.log(x);
  this.sprite = 'images/char-boy.png';  
  //this.reset();
}

Player.prototype.update = function(dt) {
  this.x * (dt);
  this.y * (dt);
  //this.reset();
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);  
}

Player.prototype.reset = function() {
  this.x = 202;
  this.y = 404;
}

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
  if (this.y < -8.5) { //resets to start position.
    this.x = 202;
    this.y = 404;
  }
  console.log('Y',this.y, 'X', this.x);
};

var Heart = function (x, y) {
  this.sprite = 'images/Heart.png';  
  this.x = x;
  this.y = y;
  console.log(this);
}

Heart.prototype.update = function(dt) {
  this.x * (dt);
  this.y * (dt);  
}

Heart.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  if (player.x >= this.x - 30 && player.x <= this.x + 30) {
    if (player.y >= this.y - 30 && player.y <= this.y + 30) {
      heart.reset();      
        enemy.x = enemy.speed * 1000;
        console.log(enemy.speed);                        
    }
  }  
}

Heart.prototype.reset = function() {
  this.x = getRandomInt(0, 4) * 101;
  this.y = getRandomInt(1, 3) * 83;
  console.log('x',this.x,'y', this.y)
}







////creates 4 new Enemy objects 
var allEnemies = [];
for (var i = 1; i <= 3; i++) {
  var speed = getRandomInt(1, 6) * 60;;
  this.x = i - 125;
  this.y = i * 75;
  var enemy = new Enemy(x, y, speed);
  allEnemies.push(enemy);
}
//instantiation of player.
var player = new Player(202, 404);
var heart = new Heart(202, 83*2);
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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
