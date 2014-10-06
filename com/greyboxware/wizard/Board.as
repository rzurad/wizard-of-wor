/*
 *  Copyright 2010 Richard Zurad (http://www.greyboxware.com)
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
package com.greyboxware.wizard {
	import flash.display.MovieClip;
	import flash.utils.Dictionary;
	import flash.media.Sound;
	import com.greyboxware.wizard.Enums.*;
	
	/* 
		Class: Board
		
			Class that represents the current level; the scene graph. The Board maintains the cells, entity positions, portals, players, as well as providing
			functions for pathfinding and collision detection.
		
		See Also: 
		
			- <Actor>
			- <Cell>
			- <Projectile>
	*/
	public class Board extends MovieClip {
		//+--------------------------------------
		//| PRIVATE VARS
		//+--------------------------------------
		private var _entities:Array; //every actor on the board
		private var _players:Array; //players on the board
		private var _cells:Array; //every cell on the board, left to right [2d array in 1d]
		private var _isPortalOpen:Boolean; //is the portal traversable
		private var _sndPortal:Sound = new PortalTrigger(); //the sound played when a portal is closed [traversed]
		
		//+--------------------------------------
		//| PUBLIC CONSTANTS
		//+--------------------------------------
		/*
			Group: Public Constants
		
			Constants: Board Dimensions [default 11x6]
			
				BOARD_WIDTH - the width of the board in cells
				BOARD_HEIGHT - the height of the board in cells
		*/
		public static const BOARD_WIDTH:int = 11;
		public static const BOARD_HEIGHT:int = 6;
		
		//+--------------------------------------
		//| PUBLIC PROPERTIES
		//+--------------------------------------
		/* 
			Group: Public Properties

			Property: playing
			
				Value is true if there is a player currently spawned on the board
			
		*/
		public static var playing:Boolean = false;
		
		/*
			Property: noVanish
			
				If value is true, overrides the ability for enemies to disappear when not in sight of the player; enemies will never
				disappear [cloak, vanish, however you want to phrase it].
				
			Note:
				
				Has no effect on the <Wizard>
		*/
		public static var noVanish:Boolean = false;
		
		/*
			Property: count
			
				Returns the number of cells that are on the board [default 11x6] *READ ONLY*
				
			See Also:
			
				- <Cell>
		*/
		public function get count():int {
			return _cells.length;	
		} //end return count
		
		/*
			Property: isPortalOpen
			
				If true, then the portal is open and traversable. *READ ONLY*
		*/
		public function get isPortalOpen():Boolean {
			return _isPortalOpen;
		} //end isPortalOpen get
		
		//+--------------------------------------
		//| PUBLIC FUNCTIONS
		//+--------------------------------------
		/*
			Group: Public Functions
		
			Function: addEntity
			
				Adds an entity to the board and draws it.
				
			Parameters:
			
				entity - the entity to add to the board. Can be any object that inherites from MovieClip
				
			See Also:
			
				- <Board.removeEntity>
		*/
		public function addEntity(entity:MovieClip):void {
			_entities.push(entity);
			this.addChild(entity);
			
			if (entity is Player) {
				_players.push(Player(entity));
				playing = true;
			} //end if
		} //end AddActor
		
		/*
			Function: evaluateCollisions
			
				Examines every entity on the board and looks for collisions. Collisions are detected between 
				Players and all other entities except other players, and between Projectiles and all other entities.
				A Projectile's bounding box is checked against other entity bounding boxes. Collisions between Actors
				are checked against their hitboxes. When a valid collision is detected between two Actors (and Enemy
				and a Player), the player is instructed to die. When a valid collision is detected between a projectile
				and an actor, the actor and projectile are instructed to die, and the owner of the projectile is awarded
				points for killing the actor.
				
			See Also:
			
				- <Actor>
				- <Actor.die>
				- <Enemy>
				- <Player>
				- <Projectile>
				- <Projectile.die>
		*/
		public function evaluateCollisions() {
			for each (var entity in _entities) {
				if (entity is Player || entity is Projectile) {
					//it is possible for a sprite to be in two cells at once (actor.home tells us what cell the ORIGIN is in)
					//use opposite corners of the sprite's bounding box to determine which cells this sprite overlap
					//this leaves potential for missed collisions: example. player sprite contained in dungeonIndex 2, enemy sprite on the very edge of cell 1. Enemy home is 1, enemy sprite overlaps cells 1 and 2
					//	this can be ignored as it's only noticeable for about 1 or 2 frames, and for normal enemies/players, the hit boxes don't collide. Only enemeys with large hitboxes (worluk) would be noticeable
					var cornerOffsetX:int = int(entity.width / 2);
					var cornerOffsetY:int = int(entity.height / 2);
					var topLeft:Cell = getCellByCoords(entity.x - cornerOffsetX, entity.y - cornerOffsetY);
					var bottomRight:Cell = getCellByCoords(entity.x + cornerOffsetX, entity.y + cornerOffsetY);
					var siblings:Array;
					
					if (topLeft.index != bottomRight.index) {
						//sprite overlaps two cells
						siblings = topLeft.occupants.concat(bottomRight.occupants);
					} else {
						//sprite only occupies home
						siblings = topLeft.occupants;
					} //end if
					
					//siblings include myself, so if I'm the only one, don't bother
					if (siblings.length == 1) {
						continue;
					} //end if
					
					for (var j:int = 0; j < siblings.length; j++) {
						//make sure to exclude... myself
						if (!(siblings[j] === entity)) {
							if (entity is Projectile && !(siblings[j] is Projectile) && siblings[j].hitTestObject(entity)) {
								//projectiles check the entire bounding box of the actor and the projectile
								//projectile is colliding with an actor. actor needs to die and remove the projectile
								if (siblings[j].state != ActorState.DIEING) {
									siblings[j].die();
									entity.die(siblings[j]); //this causes the projectile's owner to get points for killing the dude.
									//projectiles die IMMEDIATELY! Actor objects don't die on the die call, but die after the death animation plays. Because of this
									//the above two lines work. if you switch them, you will get null reference exceptions
								} else {
									//just kill the projectile
									entity.die();
								} //end if
							//actors only check against other actors, and check against the hitbox... kind of a naming misnomer, then... :/
							} else if (entity is Player && !(siblings[j] is Projectile) && !(siblings[j] is Player) && siblings[j].hitbox_mc.hitTestObject(entity.hitbox_mc) && entity.state != ActorState.DIEING  && siblings[j].state != ActorState.DIEING) {
								//player is colliding with an enemy, so the player needs to die
								entity.die();
							} //end if
						} //end if
					} //end for
				} //end if
			} //end for
		} //end evaluateCollisions
		
		/*
			Function: findPath
			
				Find path uses a breadth-first search to find the shortest path between the start cell and the target cell.
				The serach will use portals if the shortest path involves traversing an open portal. If no target cell is
				supplied as an argument, the path returned will be the shortest between the start cell, and the nearest player.
				
			Parameters:
			
				start - the cell to start searching from
				target - [OPTIONAL] the destination cell
				
			Returns:
			
				An array that contains the cells that make up the shortest path from start to target, with index 0 being the next cell
				in the path to traverse from start, and the last index being the target cell. Returns null if no path could be found.
				
			See Also:
			
				- <Enemy.think>
				- <Enemy.setPath>
		*/
		public function findPath(start:Cell, target:Cell = null):Array {
			if (target != null && start === target) {
				return new Array();
			} //end if
			
			var pending:Array = new Array(); //discovered
			var visited:Array = new Array();
			var parents:Dictionary = new Dictionary(); //for backtracking
			var found:Boolean = false;
			var current:Cell;
			
			pending.push(start);
			
			//a simple bfs
			while (pending.length != 0 && !found) {
				current = pending.shift(); //dequeue
				
				if ((target == null && current.hasPlayer()) || (target != null && current === target)) {
					found = true;
					continue; //could have used break, but whatever
				} else {
					visited.push(current);
				} //end if
				
				//discover neighbors
				for (var i:int = 0; i < 4; i++) {
					var adjacent:Cell = current.getNeighbor(Math.pow(2, i));
					
					if (adjacent != null && pending.indexOf(adjacent) == -1 && visited.indexOf(adjacent) == -1) {
						pending.push(adjacent);
						parents[adjacent.index] = current.index;
					} //end if
				} //end for
			} //end while
			
			if (!found) {
				return null;
			} //end if
			
			var path:Array = new Array();
			
			//backtrack to find the path
			while (!(current === start)) {
				path.push(current);
				_cells[parents[current.index]]
				current = _cells[parents[current.index]];
			} 
			
			return path;
		} //end findPath
		
		/*
			Function: getCellByCoords
			
				Takes the given world coordinates and determines what cell maps to that point.
				
			Parameters:
			
				x - x world coord
				y - y world coord
				
			Returns:
			
				The cell that maps to the given x, y point.
		*/
		public function getCellByCoords(x:int, y:int):Cell {
			//use the coordinates and the origin of the first cell (shifted top left) to deduce the index of the cell that occupies the given coordinates
			return _cells[int((x - (_cells[0].x - 16)) / 36) + (BOARD_WIDTH * int((y - (_cells[0].y - 16)) / 36))];
		} //end GetCellByCoords
		
		/*
			Function: getCell
			
				Returns the cell with the given cellIndex
				
			Parameters:
			
				index - The index of the cell you're looking for
				
			Returns:
			
				The cell at the given index
		*/
		public function getCell(index:int):Cell {
			return _cells[index];
		} //end GetCell
		
		/*
			Function: init
			
				Initializes the board with fresh cell objects and a clean scene graph using the specified dungeon configuration.
				The dungeon configuration is an array of integers that represents the dungeon layout. Each int represents the
				configuration number for the given cell (See <Cell>). Dungeon layouts are defined as cells read from left to right, 
				top to bottom, but only the first 6 cells of the board. The right side of the board is a mirror image of the left side,
				so only the left side needs to be defined (See <Cell.invert>).
				
			Parameters:
			
				dungeon - an array of integers that represents the specified dungeon layout. 
				
			Post Condition:
			
				The board has been initialized and a new scene graph has been created.
		*/
		public function init(dungeon:Array):void {
			_cells = new Array();
			_entities = new Array();
			_players = new Array();
			
			exit_mc.gotoAndStop("Open");
			_isPortalOpen = true;
			
			var cell:Cell; //the current cell we're spawning
			var dungeonIndex:int = 0; //what cell in the dungeon array we're talking about
			var vector:int = 1; //the direction we're walking down the dungeon array (1: forward | -1: backward)
			var count:int = 0;  //how many cells have we spawned
			var yOffset:int = 0; //self-explanitory
			
			//loop through the dungeon array, moving back and forth to spawn each cell
			//NOTE: I hacked this out in about 5 minutes. I realize now that this is a stupid way to do this; walking back and forth through the dungeon arr.
			//	I should have created the cell and its compliment at the same time, thus only iterating
			//	through the dungeon arr once. Meh... this is already done and it already works. I don't feel like 
			//	rewriting something that is already tested and works. Plus, considering where and when this function is
			//	utilized, I don't really give any shits about efficiency here. Maybe I'll re-write it later.
			while (dungeonIndex < dungeon.length) {
				//create the cell and adjust its position
				cell = new Cell(dungeon[dungeonIndex], this);
				cell.x = (count % BOARD_WIDTH) * 36;
				cell.y = yOffset;
				
				//if we're moving backwards, we're spawning the mirror cells
				if (vector < 0) {
					cell.invert();
				} //end if
				
				//determine where to go next
				if ((dungeonIndex + vector) % BOARD_HEIGHT == 0 && vector > 0) {
					//moving forward and the next cell starts the next row
					vector *= -1; //change direction
					dungeonIndex += vector; //go to the next cell
				} else if (dungeonIndex % BOARD_HEIGHT == 0 && vector < 0) {
					//moving backward and this cell is the beginning of the row
					vector *= -1; //change direction
					dungeonIndex += BOARD_HEIGHT; //skip to the next row
					yOffset += 36; //adjust y
				} else {
					//otherwise just go to the next cell in the direction we're heading
					dungeonIndex += vector;
				} //end if
				
				cell.index = _cells.push(cell) - 1; //add this cell to the board and set its index (array index, hence -1)
				this.addChild(cell); //draw this cell
				count++;
			} //end while
		} //end Init
		
		/*
			Function: removeEntity
			
				Removes a given entity from the viewstate. No functions are called on the passed object (such as die or destroy). 
				It is simply removed from the viewstate.
				
			Parameters:
			
				entity - The entity to remove from the board
		*/
		public function removeEntity(entity:MovieClip):void {
			for (var i:int = 0; i < _entities.length; i++) {
				if (_entities[i] === entity) {
					_entities.splice(i, 1);
					this.removeChild(entity);
					
					if (entity is Player) {
						_players.splice(_players.indexOf(entity), 1);
						playing = _players.length != 0;
					} //end if
					
					break;
				} //end if
			} //end for
		} //end RemoveActor
		
		/*
			Function: spawnActor
			
				Spawns the given actor at a random cell index. Actor is added to the viewstate and is drawn.
				
			Parameters:
			
				actor - the actor object to spawn
		*/
		public function spawnActor(actor:Actor):void {
			//TODO: Some kind of smart-randomizing function to spawn NPC enemies and prevent spawn-killing players
			spawnActorIndex(actor, int(Math.random() * _cells.length));
		} //end SpawnActor
		
		/*
			Function: spawnActorIndex
			
				Spawns the given actor at the given index. Actor is added to the viewstate and is drawn.
				
			Parameters:
			
				actor - the actor object to spawn
				index - the index of the cell that the actor is being spawned in
		*/
		public function spawnActorIndex(actor:Actor, index:int):void {
			actor.board = this;
			actor.warp(_cells[index]);
			addEntity(actor);
			
			if (actor is Enemy) {
				Enemy(actor).startThinking();
			} //end if
		} //end SpawnActor
		
		
		/*
			Function: togglePortal
			
				Toggles the portal state between open and closed. If the portal switches to closed, a sound is played.
				
			Post Condition:
			
				The portal will be in the opposite state
		*/
		public function togglePortal():void {
			//flip stuff (just change config, don't trigger a refresh on the cells!)
			_cells[Portal.LEFT_PORTAL].config = _cells[Portal.LEFT_PORTAL].config ^ Direction.LEFT;
			_cells[Portal.RIGHT_PORTAL].config = _cells[Portal.RIGHT_PORTAL].config ^ Direction.RIGHT;
			exit_mc.gotoAndStop((exit_mc.currentFrame ^ 2) + 1);
			_isPortalOpen = !_isPortalOpen;
			
			if (!_isPortalOpen) {
				_sndPortal.play(); //only play the sound of the portal is closing
			} //end if
		} //end ToggleExit
	} //end class
} //end package