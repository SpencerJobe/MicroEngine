/// <reference path="micro_engine.d.ts" />

var gAudioVoices = {
    0: "sine",
    1: "sawtooth",
    2: "square",
    3: "triangle",
    4: "noise"
};

var gMusicNotes = [
    "-","A1","Bb1","B1",
    "C2","Db2","D2","Eb2","E2","F2","Gb2","G2","Ab2","A2","Bb2","B2",
    "C3","Db3","D3","Eb3","E3","F3","Gb3","G3","Ab3","A3","Bb3","B3",
    "C4","Db4","D4","Eb4","E4","F4","Gb4","G4","Ab4","A4","Bb4","B4",
    "C5","Db5","D5","Eb5","E5","F5","Gb5","G5","Ab5","A5","Bb5","B5",
    "C6","Db6","D6","Eb6","E6","F6","Gb6","G6","Ab6","A6","Bb6","B6",
    "C7","Db7","D7","Eb7","E7","F7","Gb7","G7","Ab7","A7","Bb7","B7"
];

var gNotes = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var gSpeed = 4;
var gVoice = 0;
var gLoop = true;
var gVolume = 20;

function renderNotes() {

    for (var i = 0; i < 16; i += 1) {
        text(1,12+(i*6),0,i);
        text(16,12+(i*6),0,gMusicNotes[gNotes[i]]);
        
    }
}

function renderOptions() {

    text(40,12,0," Speed:" + gSpeed);
    text(40,24,0," Voice:" + gAudioVoices[gVoice]);
    text(40,36,0,"  Loop:" + gLoop);
    text(40,48,0,"Volume:" + gVolume + "/100");
}   

var gCursor = 1;
var gColumn = 0;
var gNoteChangeDelay = 0;

function updateCursor() {
    
    if (pressed(4)) {
        gColumn = (gColumn == 0) ? 1 : 0;
        gCursor = 0;
    }
    gCursor += pressed(2) - pressed(0);

    if (gColumn == 0) {
        rect(0, (12+(gCursor*6)),34,5,5);
        //move cursor
        
        if (gCursor < 0) {
            gCursor = 15;
        } else if (gCursor > 15) {
            gCursor = 0;
        }
        gNoteChangeDelay += 1;
        if (gNoteChangeDelay > 6) {
            //update note
            gNotes[gCursor] += held(1) - held(3);
            if (gNotes[gCursor] >= gMusicNotes.length) {
                gNotes[gCursor] = 0;
            } else if (gNotes[gCursor] < 0) {
                gNotes[gCursor] = gMusicNotes.length-1;
            }
            gNoteChangeDelay = 0;
        }
    } else {
        rect(40, 12+(gCursor*12),100,5,5);

        if (pressed(1)) {
            switch(gCursor) {
                case 0 : gSpeed += (gSpeed < 32); break;
                case 1 : gVoice += (gVoice < 4); break;
                case 2 : gLoop = !gLoop; break;
                case 3 : gVolume += (gVolume < 100); break;
            }
        } else if (pressed(3)) {
            switch(gCursor) {
                case 0 : gSpeed -= (gSpeed > 0); break;
                case 1 : gVoice -= (gVoice > 0); break;
                case 2 : gLoop = !gLoop; break;
                case 3 : gVolume -= (gVolume > 0); break;
            }
        }


        if (gCursor < 0) {
            gCursor = 3;
        } else if (gCursor > 3) {
            gCursor = 0;
        }
    }
}

function getSoundTrack() {
    var track = [];
    for (var i =0; i < gNotes.length; i += 1) {
        track.push(gMusicNotes[gNotes[i]]);
    }
    return track;
}

function updateSoundPlayer() {

    if (pressed(5)) {
        stop(0);
        play(0,gSpeed,gVoice,(gVolume/100),gLoop,getSoundTrack());
    }

    if (pressed(6)) {
        stop(0);
    }
}

function update() {

    rect(0,0,160,120,7); // clear the screen
    rect(0,0,160,7,6);
    text(1,1,7,"Micro Engine SFX");
    rect(153,0,7,7,1);
    text(154,1,7,"X");

    updateCursor();
    renderNotes();
    renderOptions();
    updateSoundPlayer();
}