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
	import flash.events.Event;
	import com.greyboxware.wizard.Enums.*;
	import flash.media.SoundChannel;
	
	/* 
		Class: Enemy
		
			Base class for an Enemy. Definitions and properties for generic enemy AI, movement, etc. Note that the base definition 
			for the Enemy class defines the AI for the Garwor and Thorwor.
			
			The key to enemy's is in the think function. Everytime the think function is called, the enemy agent decides the next course
			of action to take: continue moving, change paths, fire at the player, turn invisible, etc. The default behaviour of enemys is
			to persue the nearest player by taking the shortest path to that player (breadth-first search). To provide an element of randomness
			and to prevent camping by the player, the enemy has a chance on every think call to abandon the pursuit of the player and instead
			move to a random cell. This chance is called the idiot factor (you'd have to be an idiot to stop pursuing the player if you already
			know where he is). An agent will not pursue the player again until it has reached its random destination.
			
			By default, enemy agents will open fire on a player if the agent is able to traverse two cells  while still being in sight of the player.
		
		See Also: 
		
			- <Actor>
			- <Garwor>
			- <Thorwor>
			- <Board.findPath>
	*/
	public class Enemy extends Actor {
		//+--------------------------------------
		//| PROTECTED VARS
		//+--------------------------------------
		protected var _target:Cell; //the target cell the enemy is moving to
		protected var _path:Array; //the path to get to the target cell
		protected var _idiotFactor:Number; //factor used to determine the chance of abandoning the persuit of the player
		protected var _direction:int; //the direction this enemy is trying to move (akin to keyboard input)
		protected var _pursuing:Boolean; //am I pursuing the player, or wandering around like an idiot
		protected var _canVanish:*; //true = I can turn invisible; false = I can NOT turn invisible right now; undefined = I can NEVER turn invisible
		protected var _playerWasInView:Boolean; //last cell change, was the player in my viewpoint?
		
		//+--------------------------------------
		//| PROTECTED FUNCTIONS
		//+--------------------------------------
		/*
			Group: Protected Functions
		
			Function: appear
			
				If the enemy is currently invisible: makes this enemy appear on screen, playing the spawn sound
						
			Parameters:
			
				override - if true, force the enemy to appear, even if the enemy is already visible [use on initial spawn to set variables]
				
			See Also:
			
				- <Enemy.playerInView>
				- <Enemy.tryVanish>
		*/
		protected function appear(override:Boolean = false):void {
			if (this.alpha == 0 || override) {
				this.alpha = 100;
				
				if (_sndSpawn) {
					SoundManager.playInterruptable(_sndSpawn, spawnSound_soundComplete);
				} //end if
				
				if (_canVanish != undefined && !Board.noVanish) {
					_canVanish = false;
				} //end if
			} //end if
		} //end appear
		
		/*	
			Function: directionToCell
			
				From the origin of the current cell, set the direction to head to the next cell. Fixes conditions where _path may become invalid
				due to other agents (_path includes a portal jump, but another agent already went through and closed the portal) by simply finding
				a new path to _target.
				
				Note: There is still a possibility of an agent becoming stuck: if two agents are both in a portal cell, about to go through the portal
				yet one agent is a slightly ahead of the other, the first agent will go through the portal, but the other one will be stuck since the portal
				just closed. This condition can be fixed by checking the result of the move function. if move returns false, the actor did not move, and is stuck
				and a new path should be recalculated.
						
			Parameters:
			
				next - the next cell to go to. Should be a valid adjacent cell.
				
			See Also:
			
				- <Enemy.think>
				- <Actor.move>
				- <Board.findPath>
		*/
		protected function directionToCell(next:Cell):void {
			if (next == null) {
				return;
			} //end if
			
			//i don't like this. there's got to be a better way.
			if (_home.index == Portal.LEFT_PORTAL && next.index == Portal.RIGHT_PORTAL) {
				//left portal going to right
				if (!_board.isPortalOpen) {
					//another agent went through the portal before we could. path is no longer valid
					_path = _board.findPath(_home, _target);
					directionToCell(_path.pop()); //woo woo recursion
				} else {
					_direction = Direction.LEFT;
				} //end if
			} else if (_home.index == Portal.RIGHT_PORTAL && next.index == Portal.LEFT_PORTAL) {
				//right portal going to left.
				if (!_board.isPortalOpen) {
					//same as above. agent stole our portal path
					_path = _board.findPath(_home, _target);
					directionToCell(_path.pop());
				} else {
					_direction = Direction.RIGHT;
				} //end if
			} else if (next.index < _home.index) {
				if (_home.index - next.index == 1) {
					_direction = Direction.LEFT;
				} else {
					_direction = Direction.UP;
				} //end if
			} else {
				if (next.index - _home.index == 1) {
					_direction = Direction.RIGHT;
				} else {
					_direction = Direction.DOWN;
				} //end if
			} //end if
		} //end changeDirection
		
		/*	
			Function: playerInView
			
				From this agent's viewpoint, can it see a player. Used to determine if the agent should fire on the player.
				Currently, enemys do not care if there is a friendly blocking the view of the player. They will kill friendlies
				to get to the player. Not sure if I'll keep this for the final release. I kind of like it, though, as it robs 
				the player of points.
				
			Returns:
			
				true if the agent can see a player
				
			See Also:
			
				- <Enemy.think>
				- <Actor.fire>
		*/
		protected function playerInView():Boolean {
			var currCell:Cell = _home;
			
			//just keep checking along the viewpoint if any of the cells contain a player.
			while (currCell.hasNeighbor(_viewpoint)) {
				var nextCell:Cell = currCell.getNeighbor(_viewpoint);
					
				//fix a possible infinite loop when there are no walls on the portal row.
				if (nextCell.index == Portal.LEFT_PORTAL && currCell.index == Portal.RIGHT_PORTAL || nextCell.index == Portal.RIGHT_PORTAL && currCell.index == Portal.LEFT_PORTAL) {
					break;
				} //end if
				
				if (nextCell.hasPlayer()) {
					return true;
				} //end if
				
				currCell = nextCell;
			} //end while	
			
			return false;
		} //end playerInView
		
		
		/*	
			Function: setPath
			
				Sets the path of this agent to a target. Path can either be set as the path to the nearest player or a path to a random cell.
				If the path is searching for the nearest player, but does not find one (no players in play), then path is set to a random cell.
				
			Parameters:
			
				findPlayer - boolean denoting whether or not the target is going to be the nearest player or some random cell
				
			Returns:
			
				true if the path target is a player.
				
			See Also:
			
				- <Board.findPath>
		*/
		protected function setPath(findPlayer:Boolean = true):Boolean {
			if (!findPlayer) {
				//not looking for player, just pick a random cell
				_target = _home;
				
				//make sure the target is not my current cell
				while (_target.index == _home.index) {
					_target = _board.getCell(int(Math.random() * _board.count));
				} //end while
				
				_path = _board.findPath(_home, _target);
				
				return false;
			} else {
				//try and get a path to the nearest player
				_path = _board.findPath(_home);
				
				if (_path == null) {
					//no path found, do it again but with some randomnessness...ness...ness...                ness...
					setPath(false);
					
					return false;
				} //end if
				
				return true;
			} //end if
		} //end getPath
		
		
		/*	
			Function: think
			
				Function that makes the agent evaluate the current situation and make a decision on what to do next. 
				Should be called every frame, or clocktick, heartbeat, or whatever.
				
			Parameters:
			
				event - optional event parameter so that this can be tied to enterFrame events if desired.
							
			See Also:
			
				- <Enemy.setPath>
				- <Enemy.playerInView>
				- <Enemy.directionToCell>
		*/
		protected function think(event:Event = null):void {
			var oldHome:Cell = _home; //home before i thought
			
			if (_pursuing && Math.random() < _idiotFactor) {
				//I'm an idiot and am going to abandon my path to the player
				_pursuing = false;
				setPath(false);
				directionToCell(_path.pop());
			} else if (_path.length == 0 && this.x == _home.x && this.y == _home.y) {
				//I'm at my destination, so find a new one
				_pursuing = setPath(true); //try and find a player to harass
				directionToCell(_path.pop());
			} //end if
			
			//try to move. if the agent is stuck, calculate a new path and start following it
			//this fixes the following somewhat common scenario:
			//	- Two agents occupy the same Portal cell, one slightly ahead of the other
			//	- Both agents want to go through the portal
			//	- Agent One goes through the portal and disables it
			//	- Agent Two does not get updated that the portal has closed because they only
			//		check upon entering a cell
			//	- Agent Two continues to try and go through the portal, but does not because it is closed, and therefore
			//		does not move.
			//	- Agent Two continues to try and go through the Portal, and will continue until either the Portal
			//		opens, or until the idiotFactor kicks in.
			if (!move(_direction)) {
				//I didn't move. I must be stuck, so find a new path to get unstuck
				_pursuing = setPath(true); //getting stuck doesn't happen too often, so just try and find the player again
				directionToCell(_path.pop());
			} //end if
					
			if (!(oldHome === _home)) {
				//I've changed cells.
				directionToCell(_path.pop());
				
				var playerNowVisible:Boolean = playerInView();
				
				//if I could see the player when I entered this cell and I can still see the player after leaving this cell, then fire zee missiles!
				if (playerNowVisible && _playerWasInView) {
					fire();
				} //end if
				
				_playerWasInView = playerNowVisible;
			} else if (_pursuing && this.x == _home.x && this.y == _home.y) {
				//if we're pursuing, we want to actively pursue, so every time I'm at the origin of a cell, find out where the player is now
				//and continue pursuing.
				setPath(true);
				directionToCell(_path.pop());
			} //end if
			
			tryVanish(); //turn invisible if possible
		} //end Think
	
		/*	
			Function: tryVanish
			
				Try and make the agent disappear if possible. Agents can disappear only if they are not in the same hallway as a player and a player
				is in play.
							
			See Also:
			
				- <Enemy.appear>
				- <Enemy.think>
		*/
		protected function tryVanish():void {
			if (_canVanish && Board.playing) {
				//see if I can see the player, set the alpha occurdingly
				var currCell:Cell = _home;
					
				//for each direction (UP DOWN LEFT RIGHT)
				for (var i:int = 0; i < 4; i++) {
					var curdir:int = Math.pow(2, i);
					currCell = _home;
						
					while (currCell.hasNeighbor(curdir)) {
						currCell = currCell.getNeighbor(curdir);
						
						if (currCell.hasPlayer()) {
							appear();
							return;
						} //end if
					} //end while
				} //end for
				
				this.alpha = 0;
			} else if (_canVanish && !Board.playing) {
				this.alpha = 100;
			} //end if
		} //end tryVanish
		
		//+--------------------------------------
		//| PROTECTED EVENT HANDLERS
		//+--------------------------------------
		/*	
			Group: Protected Event Handlers
			
			Function: spawnSound_soundComplete
			
				Called every time the spawn sound has finished playing. Sets the _canVanish property accordingly.
				Enemys are not allowed to vanish when they are making noise.
							
			See Also:
			
				- <Enemy.appear>
				- <Enemy.tryVanish>
		*/
		protected function spawnSound_soundComplete(event:Event):void {
			if (_canVanish != undefined && !Board.noVanish) {
				_canVanish = true;
			} //end if
		} //end spawnSound_soundComplete
		
		//+--------------------------------------
		//| CONSTRUCTOR
		//+--------------------------------------
		/*	
			Group: Constructor
			
			Constructor: Enemy
			
				Creates an Enemy object with some default property values.
							
			Parameters:
			
				vanishable - if true, then this enemy has the ability to turn invisible when not in the same hallway as the player.
		*/
		public function Enemy(vanishable:Boolean = false) {
			_pursuing = true;
			_playerWasInView = false;
			_sndFire = new EnemyFire();
			_projectileSpeed = 8;
			
			if (vanishable) {
				_canVanish = !Board.noVanish;
			} //end if 
			
			appear(true);
		} //end constructor

		//+--------------------------------------
		//| FUNCTIONS FOR MILESTONE 3 TESTING
		//+--------------------------------------
		public function startThinking():void {
			trace("ENEMY: startThinking function not implemented");
		} //end startThinking
		
		
		public function stopThinking():void {
			trace("ENEMY: stopThinking function not implemented");
		} //end stopThinking
	} 
}