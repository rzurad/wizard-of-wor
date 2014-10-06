/** Root Timeline. Frame 1 */
//+--------------------------------------
//| TESTBED CODE FOR MILESTONE 3
//+--------------------------------------
import com.greyboxware.wizard.*;
import com.greyboxware.wizard.Enums.*;

const PLAYER_MOVE_SPEED:int = 3;

var arrowKeyDown:int = -1; //arrow key that is pressed (-1 for no key pressed)
var level:int;
var isCtrlDown:Boolean = false;
var dungeon:Array;
var worriorDungeons_used:Array = new Array();
var worlordDungeons_used:Array = new Array();
var player_mc:Player;

var worriorDungeons:Array = new Array();
worriorDungeons.push(new Array(5, 3, 3, 7, 7, 3, 13, 3, 7, 10, 13, 3, 11, 7, 14, 5, 11, 7, 5, 10, 13, 14, 5, 15, 12, 5, 10, 13, 14, 12, 9, 11, 3, 10, 9, 11));
worriorDungeons.push(new Array(5, 6, 5, 3, 7, 3, 12, 13, 15, 3, 15, 3, 11, 14, 13, 6, 9, 7, 5, 14, 9, 14, 5, 11, 12, 13, 7, 15, 11, 7, 9, 11, 10, 9, 3, 11));
worriorDungeons.push(new Array(5, 3, 3, 6, 5, 7, 12, 5, 3, 11, 14, 12, 11, 14, 5, 7, 11, 15, 5, 14, 12, 13, 3, 11, 12, 13, 15, 15, 3, 7, 9, 11, 10, 9, 3, 11));
worriorDungeons.push(new Array(5, 6, 5, 3, 7, 3, 12, 13, 10, 5, 15, 3, 11, 15, 7, 14, 13, 3, 5, 14, 12, 12, 13, 7, 12, 12, 13, 15, 10, 12, 9, 11, 10, 9, 3, 11));
worriorDungeons.push(new Array(5, 3, 6, 5, 3, 7, 13, 3, 15, 15, 7, 15, 11, 7, 10, 12, 12, 12, 5, 10, 5, 14, 13, 15, 13, 3, 10, 13, 14, 12, 9, 3, 3, 10, 9, 11));
worriorDungeons.push(new Array(5, 7, 7, 7, 7, 7, 12, 12, 12, 12, 12, 12, 11, 15, 14, 9, 14, 12, 5, 14, 9, 7, 15, 15, 12, 13, 6, 13, 10, 12, 9, 10, 9, 11, 3, 11));
worriorDungeons.push(new Array(5, 3, 7, 7, 3, 7, 12, 5, 11, 14, 5, 11, 11, 14, 5, 15, 15, 3, 5, 11, 14, 12, 9, 7, 13, 3, 14, 13, 7, 11, 9, 3, 11, 10, 9, 3));
worriorDungeons.push(new Array(5, 6, 5, 3, 7, 3, 12, 9, 14, 5, 11, 7, 11, 3, 14, 9, 6, 12, 5, 7, 11, 3, 14, 12, 12, 13, 7, 7, 15, 11, 9, 10, 9, 10, 9, 3));
worriorDungeons.push(new Array(5, 3, 6, 5, 3, 7, 12, 5, 15, 11, 3, 15, 15, 10, 13, 3, 6, 12, 13, 3, 14, 5, 11, 15, 12, 5, 11, 15, 6, 12, 9, 11, 3, 10, 9, 11));
worriorDungeons.push(new Array(5, 3, 6, 5, 3, 7, 12, 5, 11, 15, 3, 15, 11, 14, 5, 15, 6, 12, 5, 11, 14, 12, 12, 12, 13, 3, 15, 10, 13, 15, 9, 3, 11, 3, 10, 8));
worriorDungeons.push(new Array(5, 3, 6, 5, 7, 3, 13, 3, 14, 12, 9, 7, 11, 6, 13, 15, 7, 11, 5, 11, 10, 12, 13, 3, 13, 3, 7, 15, 15, 3, 9, 3, 11, 10, 9, 3));
worriorDungeons.push(new Array(5, 3, 6, 5, 3, 7, 13, 3, 11, 14, 5, 11, 11, 7, 7, 15, 15, 7, 5, 10, 12, 12, 12, 12, 13, 3, 15, 14, 9, 15, 9, 3, 10, 9, 3, 11));
worriorDungeons.push(new Array(5, 3, 6, 5, 3, 7, 13, 3, 11, 15, 6, 12, 11, 7, 3, 14, 13, 15, 5, 11, 6, 13, 10, 12, 13, 3, 14, 13, 7, 11, 9, 3, 11, 10, 9, 3));

var worlordDungeons:Array = new Array();
worlordDungeons.push(new Array(5, 7, 3, 7, 7, 7, 13, 14, 5, 11, 10, 12, 15, 10, 12, 5, 7, 15, 13, 7, 11, 10, 13, 15, 13, 14, 5, 7, 15, 15, 9, 11, 11, 11, 11, 11));
worlordDungeons.push(new Array(5, 3, 7, 7, 3, 7, 13, 6, 9, 15, 7, 11, 15, 15, 7, 11, 15, 7, 13, 15, 15, 6, 9, 15, 13, 14, 13, 15, 6, 12, 9, 11, 11, 11, 11, 11));
worlordDungeons.push(new Array(5, 7, 7, 7, 3, 7, 13, 10, 9, 15, 6, 12, 15, 6, 5, 10, 9, 15, 12, 9, 15, 6, 5, 15, 13, 6, 13, 15, 15, 15, 9, 11, 11, 11, 11, 11));
worlordDungeons.push(new Array(5, 3, 7, 7, 7, 7, 13, 6, 9, 15, 10, 12, 15, 15, 7, 14, 5, 15, 13, 15, 10, 13, 11, 15, 13, 10, 5, 15, 6, 12, 9, 3, 11, 11, 11, 11));
worlordDungeons.push(new Array(5, 7, 7, 7, 7, 7, 12, 13, 14, 12, 13, 15, 14, 12, 13, 14, 12, 12, 13, 14, 12, 13, 14, 12, 13, 15, 14, 12, 13, 15, 9, 11, 11, 11, 11, 11));
worlordDungeons.push(new Array(5, 7, 7, 7, 7, 7, 12, 9, 15, 10, 13, 15, 15, 6, 13, 7, 14, 12, 13, 11, 14, 9, 14, 12, 12, 5, 15, 6, 13, 15, 9, 11, 11, 11, 11, 11));
worlordDungeons.push(new Array(5, 7, 7, 7, 3, 7, 13, 15, 15, 10, 5, 15, 15, 15, 10, 5, 15, 15, 13, 10, 5, 15, 10, 12, 13, 7, 15, 10, 5, 15, 9, 11, 11, 3, 11, 11));
worlordDungeons.push(new Array(5, 3, 7, 7, 7, 7, 13, 6, 9, 15, 10, 12, 15, 15, 6, 12, 5, 15, 13, 15, 10, 12, 9, 15, 13, 10, 5, 15, 6, 12, 9, 3, 11, 11, 11, 11));
worlordDungeons.push(new Array(5, 3, 7, 7, 7, 3, 13, 7, 11, 14, 13, 3, 14, 13, 7, 11, 15, 7, 12, 13, 11, 7, 15, 11, 13, 11, 7, 14, 13, 3, 9, 3, 11, 11, 11, 3));

var arenaDungeon:Array = new Array(5, 3, 7, 7, 3, 7, 13, 3, 10, 13, 7, 15, 15, 3, 7, 15, 15, 15, 13, 6, 9, 15, 11, 11, 12, 13, 7, 15, 7, 3, 9, 10, 9, 10, 9, 3);
var pitDungeon:Array = new Array(5, 7, 7, 7, 7, 7, 13, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 13, 15, 15, 15, 15, 15, 13, 15, 15, 15, 15, 15, 9, 11, 11, 11, 11, 11);

function startGame():void {
    level = 1;
    player_mc = new Player(Player.PLAYER_ONE);
    startRound();
} //end startGame

function startRound():void {
    if (worriorDungeons.length == 0) {
        worriorDungeons = worriorDungeons_used;
        worriorDungeons_used = new Array();
    } //end if
    
    if (worlordDungeons.length == 0) {
        worlordDungeons = worlordDungeons_used;
        worlordDungeons_used = new Array();
    } //end if
    
    //TODO: 
    switch (level) {
        case 3: dungeon = arenaDungeon; break;
        case 13: dungeon = pitDungeon; break;
        default:
            var index:int;
            var dungeonList:Array;
            
            if (level < 8) {
                index = Math.random() * worriorDungeons.length;
                dungeon = worriorDungeons[index];
                worriorDungeons.splice(index, 1);
                worriorDungeons_used.push(dungeon);
            } else {
                index = Math.random() * worlordDungeons.length;
                dungeon = worlordDungeons[index];
                worlordDungeons.splice(index, 1);
                worlordDungeons_used.push(dungeon);
            } //end if
    
            break;
    } //end switch
    
    board_mc.init(dungeon);
    
    stage.addEventListener(Event.ENTER_FRAME, gameLoop);
    stage.addEventListener(KeyboardEvent.KEY_DOWN, keyDownHandler);
    stage.addEventListener(KeyboardEvent.KEY_UP, keyUpHandler);
    
    //spawn six burwors. init the timer for controlling thinks
} //end startRound

function gameLoop(enterFrameEvent:Event):void {
    processKeyboardInput();
    board_mc.evaluateCollisions();
} //end keyDownHandler

//strictly using Keyboard Events for player movement causes a delay.
//  multiple key presses are not processed until some time after the inital key press event.
//  So we're simply going to use keyboard events to watch for changes in which keys are being pressed
//  and track their states seperately
function keyDownHandler(keyEvent:KeyboardEvent):void {
    if (keyEvent.keyCode == Keyboard.CONTROL && !isCtrlDown) {
        isCtrlDown = true;
        player_mc.fire();
    } else if (keyEvent.keyCode <= Keyboard.DOWN && keyEvent.keyCode >= Keyboard.LEFT) {
        arrowKeyDown = keyEvent.keyCode;
    } //end if
} //end keyDownHandler

function keyUpHandler(keyEvent:KeyboardEvent):void {
    if (keyEvent.keyCode == arrowKeyDown) {
        arrowKeyDown = -1;
    } else if (keyEvent.keyCode == Keyboard.CONTROL) {
        isCtrlDown = false;
    } //end if
} //end keyUpHandler

function processKeyboardInput():void {
    //act on all keys that are in the key stack as pressed.
    //now that I'm thinking about it, there should only be two keys that are being pressed at the same time
    //  an arrow key and ctrl.
    
    //now that I think about it, maybe implement some kind of stack so that if you're holding down left
    // and then hold down right while continuing to hold down left, you'll go right until you release right.
    // if left is still held down, you'll go back to moving left.
    switch (arrowKeyDown) {
        case Keyboard.LEFT:
             player_mc.move(Direction.LEFT);
             break;
        case Keyboard.DOWN: 
             player_mc.move(Direction.DOWN);
             break;
        case Keyboard.UP: 
             player_mc.move(Direction.UP);
             break;
        case Keyboard.RIGHT: 
             player_mc.move(Direction.RIGHT);
             break;
        default: break;
    } //end switch
} //end processKeyboardInput

startGame();
stop();



