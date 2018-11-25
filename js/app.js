// Enemies our player must avoid
let Enemy = function (y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.y = y; // {1,2,3}
    this.reset = () => {
      this.x = -101*Math.floor(Math.random() * 20); // {-101-101*5}
      this.speed = Math.random()*300 + 100;
    }
    this.reset(speed);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x < 5*101) {
      this.x += this.speed * dt;
    } else {
      this.reset()
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y*83);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (sprite) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = sprite || 'images/char-princess-girl.png';
    this.update = function(dt) {
    }
    this.reset = () => {
      this.x = 101*2;
      this.y = 5;
    }
    this.reset();

    this.handleInput = function(key) {
      if(key == 'left' && this.x - 101 >= 0) {
        this.x -= 101;
      } else if (key == 'up' && this.y - 1 >= 0) {
        this.y -= 1;
      } else if (key == 'right' && this.x + 101 < 101*5) {
        this.x += 101;
      } else if (key == 'down' && this.y + 1 <= 5) {
        this.y += 1;
      }
    }
};
Player.prototype = Enemy.prototype; // Re-use of 'render' function
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let allEnemies = [];
const numOfEnemiesPerLane = 2;
for(let i = 0; i < numOfEnemiesPerLane; i++) {
  allEnemies.push(new Enemy(1, Math.random()*300 + 100));
  allEnemies.push(new Enemy(2, Math.random()*300 + 100));
  allEnemies.push(new Enemy(3, Math.random()*300 + 100));
}
player = new Player();

function resetEntities() {
  player.reset();
  allEnemies.forEach(function(enemy) {
    enemy.reset(Math.random()*300 + 100);
  });
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

    player.handleInput(allowedKeys[e.keyCode]);
});
