// global entity variables
let allEnemies = [];
let player;
const playerSpeed = 500;

// Enemies our player must avoid
let Enemy = function (y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.y = y; // {1,2,3}*83
    this.reset(speed);
};

// this function assigns the initial enemy position and speed
Enemy.prototype.reset = function() {
  this.x = -101*Math.floor(Math.random() * 10); // {-101*10~-101}
  this.speed = Math.random()*300 + 100;
}
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
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (sprite = 'images/char-princess-girl.png') {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = sprite;
    this.reset = () => {
      this.x = 101*2;
      this.x2 = 101*2;
      this.y = 5*83;
      this.y2 = 5*83;
    }
    this.reset();


    // the player methods of 'update', 'reset', 'handleInput' are not defined
    // in the prototype link because there will be only one player instance
    // and no gain is obtained by define them in the prototype link.
    this.update = function(dt) {
      // check if the player collides the enemy
      for (enemy of allEnemies) {
        if(enemy.y == this.y && this.x - 80 < enemy.x && enemy.x < this.x + 80) {
          // collision occurs!
          this.reset();
        }
      }
      // check if the player reaches the water
      if(this.y == 0) {
        setTimeout(() => {
          this.reset();
          alert('You win!');
        }, 0);
      }
      // move the player
      const move = playerSpeed * dt;
      const dx = this.x2 - this.x;
      const dy = this.y2 - this.y;

      if(dx > 0) {
        this.x += (dx < move ? dx : move);
      } else {
        this.x -= (-dx < move ? -dx : move);
      }
      if(dy > 0) {
        this.y += (dy < move ? dy : move);
      } else {
        this.y -= (-dy < move ? -dy : move);
      }
    }

    this.handleInput = function(key) {
      if(key == 'left' && this.x2 - 101 >= 0) {
        this.x2 -= 101;
      } else if (key == 'up' && this.y2 - 83 >= 0) {
        this.y2 -= 83;
      } else if (key == 'right' && this.x2 + 101 < 101*5) {
        this.x2 += 101;
      } else if (key == 'down' && this.y2 + 83 <= 5*83) {
        this.y2 += 83;
      }
    }
};

 // In order to re-use of 'render' function, link it!
Player.prototype = Enemy.prototype;
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// this function is called from the 'reset()' function in 'engine.js' file
function intantiateEntities(level = 2) {
  for(let i = 0; i < level; i++) {
    allEnemies.push(new Enemy(1*83, Math.random()*300 + 100));
    allEnemies.push(new Enemy(2*83, Math.random()*300 + 100));
    allEnemies.push(new Enemy(3*83, Math.random()*300 + 100));
  }
  player = new Player();
}
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        'ArrowLeft': 'left',
        'ArrowUp': 'up',
        'ArrowRight': 'right',
        'ArrowDown': 'down'
    };
    // KeyboardEvent.keyCode is now removed from the Web standard.
    // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
    // So, I replace the template code with that using KeyboardEvent.code.
    player.handleInput(allowedKeys[e.code]);
});
