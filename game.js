/// <reference path="micro_engine.d.ts" />

function update() {

    rect(0,0,160,120,0); // clear the screen

    text(1,1,5,"Micro Engine");

    for (var c = 0; c < 8; c+=1) {
        rect(1,7+c,72-c*2,1,c);
    }
}