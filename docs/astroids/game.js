/// <reference path="micro_engine.d.ts" />

// ****************************************************
// Player Ship

  var gPlayer;

  var PlayerShip = function () {
    this.x = 80;
    this.y = 100;
    this.sprite = [
      [0,6,0,2,2,0,6,0],
      [0,6,0,2,2,0,6,0],
      [0,6,2,7,7,2,6,0],
      [0,2,2,7,7,2,2,0],
      [0,2,2,2,2,2,2,0],
      [2,5,6,2,2,6,5,2],
      [2,2,6,2,2,6,2,2],
      [2,0,1,0,0,1,0,2]
    ];
    this.health = 100;
    this.points = 0;
  };

  PlayerShip.prototype.update = function () {

    this.x += 2 * (held(1) - held(3));
    this.x = this.x < 4 ? 4 : this.x;
    this.x = this.x > 156 ? 156 : this.x;

    this.y += 2 * (held(2) - held(0));
    this.y = this.y < 10 ? 10 : this.y;
    this.y = this.y > 110 ? 110 : this.y;



    if (pressed(4)) {
      createMissle(this.x+4,this.y-5,-2,2,7);
      play(0,40,2,0.3,false,["C5","B5","Bb5","A5"])
    }
  };

  PlayerShip.prototype.render = function () {
    text(0,0,1,"HEALTH:" + this.health);
    text(90,0,2,this.points);
    draw(this.x,this.y,this.sprite);
  };

  PlayerShip.prototype.collided = function (astroid) {
    
    if (overlap(this.x,this.y,8,8,astroid.x,astroid.y,astroid.width,astroid.height)) {
      this.health -= 1;
      astroid.destroyed = true;
      play(1,14,4,0.5,false,["C7","C6","C5","C4","C3"]);
    }
  }
// ****************************************************




// ****************************************************
//Missles

var gMissleList = [];

function updateMissles() {
  var newList = [];
  var missle;
  for (var i = 0; i < gMissleList.length; i += 1) {
    missle = gMissleList[i];
    missle.update();
    checkAstroidsCollided(missle);
    if(! missle.destroyed) {
      newList.push(missle);
    }
  }
  gMissleList = newList;
}

function renderMissles() {
  for (var i = 0; i < gMissleList.length; i += 1) {
    gMissleList[i].render();
  }
}

function createMissle(x,y,speed,size,color) {

  gMissleList.push(new Missle(x,y,speed,size,color));
}

var Missle = function (x,y,speed,size,color) {
  this.x = x;
  this.y = y;
  this.speed = speed || -1;
  this.size = size || 2;
  this.color = color || 7;
  this.destroyed = false;
};

Missle.prototype.update = function () {
  this.y += this.speed;
};

Missle.prototype.render = function () {

  rect(this.x,this.y,this.size,this.size,this.color);
};


// ****************************************************




// ****************************************************
//Astroids

var gAstroidList = [];

function updateAstroids(player) {
  var newList = [];
  var astroid;
  for (var i = 0; i < gAstroidList.length; i += 1) {
    astroid = gAstroidList[i];
    astroid.update();
    player.collided(astroid);
    if (astroid.destroyed || astroid.y > 120) {
      astroid.reset();
    }
  }
}


function checkAstroidsCollided(missle) {
  var astroid;
  for (var i = 0; i < gAstroidList.length; i += 1) {
    astroid = gAstroidList[i];
    
    if (overlap(
      astroid.x,astroid.y,astroid.width,astroid.height,
      missle.x,missle.y,missle.height,missle.width
    )) {
        
      missle.destroyed = true;
      astroid.reset();
      gPlayer.points += astroid.width * astroid.height;
      play(1,20,4,0.5,false,["C7","C6","C5","C4","C3"]);

    }
    
  }
}

function renderAstroids() {
  for (var i = 0; i < gAstroidList.length; i += 1) {
    gAstroidList[i].render();
  }
}

function createAstroids(count) {
  for (var x = 0; x < count; x += 1) {
    gAstroidList.push(new Astroid());
  }
}

var Astroid = function () {
  this.x = 2 + rand(114);
  this.y = - 40;
  this.speed = 0.5 + rand(2);
  this.width = 4 + rand(10);
  this.height = 4 + rand(10);
  this.destroyed = false;
};

Astroid.prototype.reset = function () {
  this.x =  2 + rand(114);
  this.y = - 40;
  this.speed = 0.5 + rand(2);
  this.width = 4 + rand(10);
  this.height = 4 + rand(10);
  this.destroyed = false;
};

Astroid.prototype.update = function () {
  this.y += this.speed;
};

Astroid.prototype.render = function () {

  rect(this.x,this.y,this.width,this.height,3);
};


// ****************************************************



var gPlayer;

function ready() {

  gPlayer = new PlayerShip();
  createAstroids(5);
}

function update() { 
  
  rect(0,0,160,120,0);

  gPlayer.update();
  updateMissles();
  updateAstroids(gPlayer);

  renderMissles();
  renderAstroids();
  gPlayer.render();
}
