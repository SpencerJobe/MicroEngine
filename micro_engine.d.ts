// Intellisense for the MicroEngine
// micro_engine.d.ts 
// ------------------------------------------------------------------
//
// This file was intended to be used with VSCode. Put this 
// file next to your game.js file and put the line comment below
// in your game.js file to get intellisense for MicroEngine commands.
//
//  note the tripple slash on line 2.
//    _________________________________________________________
//    | 0001: //game.js
//    | 0002: /// <reference path="micro_engine.d.ts" />
//    | 0003: 
//    
// ------------------------------------------------------------------


/** Called by MicroEngine about 60 times a second.
 *  This function must be present in the game.js file
 */
declare function update() :void;


/** Loads a JavaScript file at the provided path.  
 * Once all files have been included, the `ready()` function 
 * will be called.
 *  @param {string} path path of script file to be included.
 */
declare function include(path:string): void;


/** This function is called after all included scripts have
 *  loaded but before the first call to `update()`
 */
declare function ready(): void;


/** Plots a pixel of a given color to the screen
 * @param {number} x x-coordinate of the pixel
 * @param {number} y y-cordinate of the pixel
 * @param {number} color Color index that defines the color of the pixel
 */
declare function plot (x:number, y:number, color:number) : void;


/** Draws a rectangle of a given color to the screen
 * @param {number} x x-coordinate of the upper-left corner of the rectangle
 * @param {number} y y-coordinate of the upper-left corner of the rectangle
 * @param {number} w width in pixels of the rectangle
 * @param {number} h height in pixels of the rectangle
 * @param {number} color color index representing the color of the rectangle
 */
declare function rect(x:number, y:number, w:number, h:number, color:number): void;


/** Draws a sprite to the provided x,y coordinate.
 * @param {number} x x-coordinate of the upper-left corner of the sprite
 * @param {number} y y-coordinate of the upper-left corner of the sprite
 * @param {Array} spriteArray 2D array of numbers representing color indexes of each pixel of the sprite
 */
declare function draw(x:number, y:number,spriteArray:Array):void


/** Draws a sprite to the provided x,y coordinate
 * @param {number} x x-coordinate of the upper-left corner of the sprite
 * @param {number} y y-coordinate of the upper-left corner of the sprite
 * @param {Array} spriteArray 2D array of numbers representing color indexes of each pixel of the sprite
 * @param {number} optMaskColor (Optional) color index that defines a color index to be treated as transparent  
 */
declare function draw(x:number, y:number,spriteArray:Array,optMaskColor:number):void;


/** Draws text to the screen at the provided x,y coordinate in the provided color
 * @param {number} x start position of the message on the x-axis
 * @param {number} y start position of the message on the y-axis
 * @param {number} color color index that defines the color of the text
 * @param {string} message string representing the text to be displayed
 */
declare function text(x:number, y:number, color:number, message:string): void;


/** Plays a sound wave based at a specified frequency for a specified length of time
 * @param {number} length length in seconds that the sound will play. Value can be a decimal less than one. 
 * @param {number} hertz frequency in hertz of the sound to be played
 * @param {number} wave  index of sound wave type. (0-sine 1-saw 2-square 3-triangle)
 */
declare function play(length:number,hertz:number,wave:number) : void;


/** Returns true if the target button is being held down.  
 * ```  
 * -Button Indexes-
 *     0  up       4  C button  
 *     1  left     5  X button  
 *     2  down     6  F button  
 *     3  right  
 * ```
 * @param {number} buttonIndex index of the button to be checked
 */
declare function held(buttonIndex:number): boolean;


/** Returns true if the target button was pressed  
 * ```  
 * -Button Indexes-
 *     0  up       4  C button  
 *     1  left     5  X button  
 *     2  down     6  F button  
 *     3  right  
 * ```
 * @param {number} buttonIndex index of the button to be checked
 */
declare function pressed(buttonIndex:number): boolean;


/** Returns true if the target button was released.  
 * ```  
 * -Button Indexes-
 *     0  up       4  C button  
 *     1  left     5  X button  
 *     2  down     6  F button  
 *     3  right  
 * ```
 * @param {number} buttonIndex index of the button to be checked
 */
declare function released(buttonIndex:number): boolean;


/** Clears the button states so that held, pressed, and released will
 *  all return false until states are reset on the next update 
 * 
 * 
 */
declare function clear():void;


/** Returns the distance between the two provided points
 * @param {number} x1 x coordinate of point 1
 * @param {number} y1 y coordinate of point 1
 * @param {number} x2 x coordinate of point 2
 * @param {number} y2 y coordinate of point 2
 */
declare function dist(x1:number, y1:number, x2:number, y2:number): number


/** Returns true if the provided point (px,py) is inside the provided rectangle 
 * @param {number} px x coordinate of point to test
 * @param {number} py y coordinate of point to text
 * @param {number} rx x coordinate of the upper-left corner of the rectangle
 * @param {number} ry y coordinate of the upper-left corner of the rectangle
 * @param {number} rw width in pixels of the rectangle
 * @param {number} rh height in pixel of the rectangle
 */
declare function inside(px:number, py:number, rx:number, ry:number, rw:number, rh:number): boolean;


/** Returns true if the provided rectangles overlap
 * @param {number} x1 x coordinate of the upper-left corner of rectangle 1
 * @param {number} y1 y coordinate of the upper-left corner of rectangle 1
 * @param {number} w1 width in pixels of rectangle 1
 * @param {number} h1 height in pixels of rectangle 1 
 * @param {number} x2 x coordinate of the upper-left corner of rectangle 2
 * @param {number} y2 y coordinate of the upper-left corner of rectangle 2
 * @param {number} w2 width in pixels of rectangle 2
 * @param {number} h2 height in pixels of rectangle 2 
 */
declare function overlap(x1:number, y1:number, w1:number, h1:number, x2:number, y2:number, w2:number, h2:number): boolean;


/** Returns a random integer from [0 - range).  
 * _Example_: rand(8) will return a number 0 thru 7.
 *
 * @param {number} range the max integer range from which a number is randomly selected
 */
declare function rand(range:number): number


/** Imports and runs a script file
 * @param {string} path path of script file to include
 */
declare function include(path:string):void;
