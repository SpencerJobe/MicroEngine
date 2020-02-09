
// ********************************************************************
var BLOCK_SIZE = 8;
var BLOCK_WIDTH = 16;
var BLOCK_HEIGHT = 4;
var BLOCK_Y_OFFSET = 32;
var BLOCK_X_OFFSET = 8;
var BLOCKS_PER_ROW = 9;

var PLAYFIELD_LEFT = 8;
var PLAYFIELD_TOP = 16;
var PLAYFIELD_RIGHT = 152;
var PLAYFIELD_BOTTOM = 120; 

var gRowColorIndex = 1;

var Block = function (gridX,gridY,colorIndex) {
    this.x = BLOCK_X_OFFSET + (gridX * BLOCK_WIDTH);
    this.y = BLOCK_Y_OFFSET + (gridY * BLOCK_HEIGHT);
    this.width = BLOCK_WIDTH;
    this.height = BLOCK_HEIGHT;
    this.colorIndex = colorIndex;
    this.destroyed = false;
};
Block.prototype.render = function() {
    var x = this.x;
    var y = this.y;
    var w = this.width;
    var h = this.height;

    if (!this.destroyed) {
        rect(x,y,w,h,0);
        rect(x,y,w-1,h-1,this.colorIndex);
        plot(x,y+1,7);
        plot(x+1,y,7);
        
        
    }
};
Block.prototype.collided = function (ball) {
    return overlap(this.x,this.y,this.width,this.height,
        ball.x,ball.y,ball.size,ball.size);
};
// ********************************************************************
var BlockList = function (level) {
    
    var height = level <= 6 ? level : 6;
    var rowColor = 1 + level % 7;
    this.blocks = [];
    this.height = height;
    this.nextLevelBlockCount =  BLOCKS_PER_ROW;
    

    for (var gridY = 0; gridY < height; gridY += 1) {

        for (var gridX = 0; gridX < BLOCKS_PER_ROW; gridX += 1) {
                
            this.blocks.push(new Block(gridX,gridY,rowColor))
        }
    }
};
BlockList.prototype.render = function () {
    this.blocks.map(function(block,index){
        block.render();
    });
};
BlockList.prototype.update = function () {
    var updatedList = [];
    this.blocks.map(function(block){
        !block.destroyed ? updatedList.push(block) : 0;
    });
    this.blocks = updatedList;
};
BlockList.prototype.ballCollided = function (ball) {
    var block = null;
    for (var i = 0; i < this.blocks.length; i += 1) {
        block = this.blocks[i];
        if (block.collided(ball)) {
            block.destroyed = true;
            return block;
        }
    }
    return undefined;
};

// ********************************************************************
var Paddle = function () {
    this.x = 70;
    this.y = 110;
    this.height = 4;
    this.width = 28;
    this.speed = 2.6;
};
Paddle.prototype.move = function () {
    this.x += this.speed * (held(1) - held(3));
    if (this.x > PLAYFIELD_RIGHT-this.width) {
        this.x = PLAYFIELD_RIGHT-this.width;
    } else if (this.x < PLAYFIELD_LEFT) {
        this.x = PLAYFIELD_LEFT;
    }
};
Paddle.prototype.render = function () {

    rect(this.x,this.y+1,this.width,this.height-2,3);
    rect(this.x+4,this.y,this.width-8,this.height-2,3);
    rect(this.x+8,this.y-1,this.width-16,this.height-2,3);
    rect(this.x+12,this.y-2,this.width-24,this.height-2,3);
};

// ********************************************************************
var Ball = function () {
    this.x = 80-4;
    this.y = 100;
    this.size = 4;
    this.gridX = Math.round(this.x/BLOCK_SIZE);
    this.gridY = Math.round(this.y/BLOCK_SIZE);
    this.xVelo = 0;
    this.yVelo = -0.5;
    this.speed = 0.8;
    this.combo = 1;
}; 
Ball.prototype.reflect = function (gameObject) {
    
    var cx = this.x + this.size/2;
    var cy = this.y + this.size/2;
    var tx = gameObject.x + gameObject.width/2;
    var ty = gameObject.y + gameObject.height/2;

    this.xVelo = (cx < tx) ? -this.speed : this.speed;
    this.yVelo = (cy < ty) ? -this.speed : this.speed;

    this.xVelo *= (1 + rand(5)/10)
    this.yVelo *= (1 + rand(5)/10)

};
Ball.prototype.move = function (blockList,paddle) {
    
    var block = blockList.ballCollided(this);
    
    this.x += this.xVelo;
    this.y += this.yVelo;
    
    if (block) {
        gScore += 10 * this.combo;
        this.reflect(block);
        this.combo += 1;
        play(0,8,4,false,["C6","C5","C4","C3"]);
        

    } else if (overlap(this.x,this.y,this.size,this.size, 
        paddle.x, paddle.y, paddle.width,paddle.height)) {
        this.combo = 1;
        this.reflect(paddle)
        play(0,6,3,false,["E3"]);
    }

    if (this.x >= PLAYFIELD_RIGHT-this.size || this.x <= PLAYFIELD_LEFT) {
        this.xVelo *= -1;
        play(1,6,3,false,["C3"]);
    }

    if (this.y <= PLAYFIELD_TOP) {
        this.yVelo *= -1;
        play(2,6,3,false,["C3"]);
    }


};
Ball.prototype.render = function () {
    rect(this.x,this.y,this.size,this.size,7);
};
// ********************************************************************




var GAME_STATES = {
    MENU : "game_state_menu",
    PLAYING: "game_state_playing",
    NEXT_LEVEL: "game_state_next_level",
    PAUSED: "game_state_paused",
    GAMEOVER: "game_state_game_over",
    WIN:"game_state_win"
};

var gCurrentGameState = GAME_STATES.MENU;
var gGameStates = {};
var gBlockList;
var gPaddle;
var gBall;
var gScore = 0;
var gLevel = 0;

function InitializeGame() {
    gCurrentGameState = GAME_STATES.PLAYING;
    clear();
    gLevel += 1;
    gBlockList = new BlockList(gLevel);
    gPaddle = new Paddle();
    gBall = new Ball();
}
 
//MENU SCREEN
gGameStates[GAME_STATES.MENU] = function gameState_MenuScreen ( ) {
    rect(0,0,160,120,0);
    rect(20,20,120,80,6); //Clear

    text(52,23,1+rand(2),"Breakout v2");
    text(24,60,7,"Press 'X' to Start");



    if (pressed(5)) {
        InitializeGame();
    }
};


//PLAYING STATE
gGameStates[GAME_STATES.PLAYING] = function gameState_PlayingScreen () {


    rect(0,0,160,120,0); //clear screen
    rect(0,0,8,120,6);
    rect(0,0,160,16,6);
    rect(8,4,160-16,8,0);
    text(9,5,2,"LVL:" + gLevel + " SCORE:" + gScore);
    rect(PLAYFIELD_RIGHT,0,8,120,6);
    gBlockList.render();
    gPaddle.render();
    gPaddle.move();
    gBall.render();
    gBall.move(gBlockList,gPaddle);
    gBlockList.update();


    if (gBall.y > PLAYFIELD_BOTTOM) {
        gCurrentGameState = GAME_STATES.GAMEOVER;
    }

    if (gBlockList.blocks.length === 0) {
        gCurrentGameState = GAME_STATES.NEXT_LEVEL;
    }

};


//Next Level Screen
gGameStates[GAME_STATES.NEXT_LEVEL] = function gameState_NextLevel () {
    rect(0,0,160,120,0);
    text(32,1,2,"LEVEL " + gLevel + " COMPLETE");
    text(42,23,rand(8),"Get ready!");
    text(55,42,2,"SCORE");
    text(55,52,2, gScore);
    text(25,100,7, "PRESS X TO CONTINUE");

    if (pressed(5)) {
        gCurrentGameState = GAME_STATES.PLAYING;
        clear();
        gLevel += 1;
        gBlockList = new BlockList(gLevel);
        gPaddle = new Paddle();
        gBall = new Ball();
    }
};


//Game Over Screen
gGameStates[GAME_STATES.GAMEOVER] = function gameState_GameOverScreen () {
    rect(0,0,160,120,0);
    text(50,1,1,"game over!");
    text(16,17,1,"Better luck next time!");

    text(50,32,2,"SCORE: " + gScore);
    text(50,42,2,"LEVEL: " + gLevel);

    text(12,100,7, "PRESS X TO CONTINUE");
    if (pressed(5)) {
        gCurrentGameState = GAME_STATES.MENU;
        clear();
        gLevel = 0;
        gScore = 0;
    }
};



function update() {

    gGameStates[gCurrentGameState]();
}