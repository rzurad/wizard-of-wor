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
	import flash.geom.ColorTransform;
	import flash.geom.Point;
	import flash.media.Sound;
	import com.greyboxware.wizard.Enums.*;
	
	/* 
		Class: Actor
		
			Base class for the Actor object. Actors represent every character on the board; players and enemies. 
			
			Every Actor instance should be linked to a MovieClip object inside of Flash that acts as the sprite and animation for the Actor. 
			These sprite Movieclips should start their timeline *stopped* with a sequence of frames from Frame 1 to Frame x (Labelled "Walk") that 
			represent the walk animation of the sprite. Frame x should then loop back to Frame 1. If needed, Frame x + 1 begins the 
			"Shoot" sequence, which is *played* until Frame y. Frame y should then gotoAndStop on Frame 1.
			
			Every corresponding sprite movie clip should also have an invisible movie clip named "hitbox_mc". hitbox_mc (obviously) represents the
			hitbox of the Actor that is used in collision detection with other Actors.
		
		See Also: 
		
			- <Projectile>
			- <DeathAnimation>
			- <Player>
			- <Enemy>
			- <Board>
			- <Board.evaluateCollisions>
	*/
	public class Actor extends MovieClip {
		//+--------------------------------------
		//| PROTECTED VARS
		//+--------------------------------------
		protected var _home:Cell; //reference to the cell this actor is currently in
		protected var _viewpoint:int; //current direction of movement
		protected var _speed:uint; //pixels per frame
		protected var _state:int; //state of the actor 
		protected var _board:Board; //board that spawned this actor
		protected var _liveRound:Boolean = false; //true if actor has a projectile in play. players can only fire one shot at a time
		protected var _points:int = 0; //how many points an actor recieves for killing me
		protected var _score:int = 0; //how actor's score
		protected var _projectileSpeed:int; //how fast does this Actor's projectiles move
		protected var _maxProjectileRange:int = 99; //maximum range of this actor's projectiles
		protected var _projectile:Projectile; //a reference to the most recently fired projectile
		
		//sound
		protected var _sndFire:Sound;
		protected var _sndDie:Sound;
		protected var _sndSpawn:Sound;
		
		//+--------------------------------------
		//| CONSTANTS
		//+--------------------------------------
		/*
			Group: Public Constants
		
			Constant: DEFAULT_ACTOR_SPEED
			Default speed for an actor object (pixels per frame). Used as default parameter in <Actor.Actor> Constructor
		*/
		public static const DEFAULT_ACTOR_SPEED:int = 3;
		
		//+--------------------------------------
		//| PROPERTIES
		//+--------------------------------------
		/*
			Group: Properties
			
			Property: board
			
				Reference to the Board object that created this Actor. *SET ONLY*
				
			Post Condition:
			
				This Actor no longer occupies any <Cell>
				
			See Also:
			
				- <Board>
		*/
		public function set board(board:Board):void {
			if (_board != null) {
				_board.removeEntity(this);
			} //end if
			
			_board = board;
			
			if (_home != null) {
				_home.removeOccupant(this);
			} //end if
			
			_home = null;
		} //end SetBoard
		
		/*
			Property: cellIndex
			
				The index number of the Cell this Actor occupies. *READ ONLY*
				
			Returns:
			
				The index number of the Cell this Actor occupies.
				
			See Also:
			
				- <Cell.index>
				- <Board>
		*/
		//returns home.dungeonIndex
		public function get cellIndex():int {
			return _home.index;
		} //end GetCellIndex
		
		/*
			Property: points
			
				The points value assigned to this Actor. *READ ONLY*
				
			Returns:
			
				The number of points the killer is to receiving for killing this actor
		*/
		public function get points():int {
			return _points;
		} //end Points
		
		/*
			Property: projectileSpeed
			
				The speed (pixels per frame) of this Actor's Projectiles
				
			Returns
			
				The speed of this Actor's projectiles
			
			See Also:
			
				- <Projectile>
		*/
		public function get projectileSpeed():int {
			return _projectileSpeed;
		} //end get projectileSpeed
		
		/*
			Property: score
			
				The current score of the player. Points are added to the score using the set property (someActor.score = 300; //adds 300 points to the actor's score)
				
			Returns:
			
				The number of points the killer is to receiving for killing this actor
		*/
		public function set score(added:int):void {
			_score += added;
		} //end set score
		
		public function get score():int {
			return _score;
		} //end get score
		
		/*
			Property: state
			
				The current state of the object. *READ ONLY*
				
			Returns:
			
				The current state of the Actor object
				
			See Also:
			
				- <ActorState>
		*/
		public function get state():int {
			return _state;
		} //end GetState
		
		//+--------------------------------------
		//| PROTECTED FUNCTIONS
		//+--------------------------------------
		/*
			Group: Protected Functions
		
			Function: update
			
				Actually moves the actor in the given direction and advances the animation. 
				Movement is determined by _speed (pixels per frame) and the parameter direction.
				The animation is advanced one frame
			
			Precondition:
			
				Parameter direction is a valid direction for this Actor to move. Direction should
				be validated by the move function.
				
			Parameters:
			
				direction - the direction to move. An integer defined by the <Direction> "enum"
				
			See Also:
			
				- <Actor.move>
		*/
		protected function update(direction:int):void {
			switch (direction) {
				case Direction.LEFT:
					this.scaleX = -1;
					this.rotation = 0;
					this.x = this.x - _speed;
					break;
				case Direction.DOWN: 
					this.scaleX = -1;
					this.rotation = -90;
					this.y = this.y + _speed;
					break;
				case Direction.UP:
					this.scaleX = 1;
					this.rotation = -90;
					this.y = this.y - _speed;
					break;
				case Direction.RIGHT:
					this.scaleX = 1;
					this.rotation = 0;
					this.x = this.x + _speed;
					break;
				default: trace("No. Fuck You."); break;
			} //end switch
			
			this.nextFrame();
		} //end update
		
		//+--------------------------------------
		//| CONSTRUCTOR
		//+--------------------------------------
		/*
			Group: Constructor
			
			Constructor: Actor
			
				Creates an instance of the Actor object.
			
			Parameters: 
			
				speed - speed of the actor (pixels per frame); defaults to DEFAULT_ACTOR_SPEED constant
		*/
		//Constructor for creating an Actor object
		public function Actor(speed:int = DEFAULT_ACTOR_SPEED) {
			_viewpoint = Direction.RIGHT; //default facing right;
			_speed = speed;
			_state = ActorState.NORMAL;
			_sndDie = new ActorDie();
			_projectileSpeed = 12;
		} //end Constructor
		
		//+--------------------------------------
		//| PUBLIC FUNCTIONS
		//+--------------------------------------
		/*	
			Group: Public Functions
					
			Function: destroy
			
				Removes this Actor object from the Board. Without external references to this object, this object will be garbage collected.
				
				Note that it is possible to just call this function without playing the DeathAnimation first. In this case, the Actor object will
				simply disappear from the board.
				
			Parameters:
			
				deathAnim - DeathAnimation object that called this function.
				
			Post Condition:
			
				Unless there are references to this Actor outside of the <Board>, this object and the <DeathAnimation> will be garbage collected
		*/
		public function destroy(deathAnim:DeathAnimation = null):void {
			_home.removeOccupant(this);
			
			if (deathAnim != null) {
				_board.removeChild(deathAnim);
			} //end if
			
			_board.removeEntity(this);
			_board.radar.remove(_home);
		} //end Destroy
		
		/*			
			Function: die
			
				Triggers the Actor to start Dieing. State of the Actor is set to DIEING, preventing the actor from moving
				or firing projectiles. Alpha is set to 0% and a <DeathAnimation> is created on this Actor's coordinates. Upon
				completion of the DeathAnimation's looping animation, this Actor is destroyed
				
				Note that since the Actor is still spawned on the board, it can still have collisions acted upon it. This
				prevents projectiles from traveling through the death cloud, and the collision detection function will prevent
				this actor from essentially re-DIEING.
				
			Parameters:
			
				loops - number of loops for the DeathAnimation to play (Default: 2)
				
			Post Condition:
			
				Actor's alpha is 0%. Actor's state is DIEING. DeathAnimation is spawned over this Actor.
				
			See Also:
			
				- <Board.evaluateCollisions>
				- <Actor.destroy>
		*/
		public function die(loops:int = 3):void {
			killProjectile();
			SoundManager.playInterruptable(_sndDie);
			_state = ActorState.DIEING;
			this.alpha = 0;
			
			var deathAnim:DeathAnimation = new DeathAnimation(this, loops);
			_board.addChild(deathAnim);
		} //end Die
		
		/*
			Function: fire
			
				Triggers the actor to fire a projectile in the direction that it's facing. Unless overridden, an actor may only
				have one projectile on the board at any given time, thus this function won't do anything at all if there is already
				a projectile in play for this Actor. Also, only Actors in the NORMAL state can fire projectiles. The color of the projectile
				is determined by the getProjectileTransform function.
				
				Note if the Actor is too close to and facing a wall, a projectile will *not* be created, and the function will return
				without doing anything.
				
			Post Condition:
			
				If the Actor is in a NORMAL state and does not have a projectile in play before this function is called, then the 
				Actor will be in the FIRING state and the "Shoot" animation will be playing. A projectile will be created on the board
				and will be travelling in the direction that the Actor is facing.
				
			See Also:
			
				- <Actor.getProjectileTransform>
				- <Projectile>
				- <ActorState>
		*/
		public function fire():void {
			//prevent more than one shot at a time
			if (_state != ActorState.NORMAL || _liveRound) {
				return;
			} //end if
			
			var laser:Projectile = new Projectile(this);
			var lScalar:Point; //used in determining where to spawn the projectile
			
			//figure out where to spawn the projectile
			switch (_viewpoint) {
				case Direction.LEFT: lScalar = new Point(-1, 0); break;
				case Direction.RIGHT: lScalar = new Point(1, 0); break;
				case Direction.UP: lScalar = new Point(0, -1); laser.rotation = 90; break;
				case Direction.DOWN: lScalar = new Point(0, 1); laser.rotation = 90; break;
			} //end switch
			
			//this makes things easy (believe it or not). projectile is spawned half the Actor's size and half the projectile's size
			//	in front of the actor (plus/minus a few pixels for corrections)
			//TODO: spawning lasers while looking up and down is off by a few pixels
			laser.x = this.x + (lScalar.x * ((this.width / 2) + ((laser.width + 2) / 2) + 3) + (lScalar.y * 2));
			laser.y = this.y + (lScalar.y * ((this.height / 2) + ((laser.height + 2) / 2) + 3) + (lScalar.x * 1));
			
			//if it spawned in a wall, then we don't care about the sprite because it's just going to die anyway
			//don't even bother having the board draw the sprite, and just let the object be garbage collected on function return.
			var laserCell:Cell = _board.getCellByCoords(laser.x, laser.y);
			
			//given the default width of the projectile, we're assuming anything 9 pixels past the origin of the current cell in any direction
			//	where there is a wall means the projectile will spawn inside a wall, and should therefore not spawn at all.
			if (laserCell != null && ((_home.config & _viewpoint) == _viewpoint || (Math.abs(this.x - _home.x) > 9 || Math.abs(this.y - _home.y) > 9))) {
				//not in a wall, so let's do this
				laser.home = laserCell;
				
				//find projectile threshold. just keep traversing until we hit a wall	
				var range:int = _maxProjectileRange;
				
				while (laserCell.hasNeighbor(_viewpoint) && range > 0) {
					var nextCell:Cell = laserCell.getNeighbor(_viewpoint); //is she hot?
					
					//fix a possible infinite loop when there are no walls on the portal row.
					if (nextCell.index == Portal.LEFT_PORTAL && laserCell.index == Portal.RIGHT_PORTAL || nextCell.index == Portal.RIGHT_PORTAL && laserCell.index == Portal.LEFT_PORTAL) {
						break;
					} //end if
					
					laserCell = nextCell;
					range--;
				} //end while
				
				//tell the laser where to stop
				laser.threshold = new Point(laserCell.x + (9 * lScalar.x), laserCell.y + (9 * lScalar.y));
				laser.scalar = lScalar;
				laser.viewpoint = _viewpoint;
				
				laser.transform.colorTransform = getProjectileTransform();
				
				_liveRound = true;
				_projectile = laser;
				_board.addEntity(laser);
				laser.begin();
				
				if (this is Player) {
					_state = ActorState.FIRING;
					this.gotoAndPlay("Shoot");
				} //end if
				
				if (_sndFire) {
					SoundManager.playInterruptable(_sndFire);
				} //end if
			} //end if
		} //end fire
		
		/*
			Function: getProjectileTransform
			
				Returns the colorTransform of projectiles that this Actor fires. Function can be overridden
				in subclasses to return a ColorTransform object of any given color. This function is also used
				to determine the color of this actor's Radar blip.
				
			Returns: 
			
				ColorTransform object that can be applied to a projectile object's colorTransform property.
				
			See Also:
			
				- <Actor.fire>
				- <Radar>
		*/
		public function getProjectileTransform():ColorTransform {
			return new ColorTransform(0, 0, 0, 1, 237, 73, 0, 0); //default to the orange/red color
		} //end SetColor
		
		/*
			Function: killProjectile
			
				Tells this Actor that a fired projectile has been removed from play. The projectile is removed from the board
				and the Actor is allowed to fire again.
				
			Parameters:
			
				projectile - The projectile object being removed from play
			
			Post Condition:
			
				The given projectile is removed from play and the actor is allowed to fire another projectile
				
			See Also:
			
				- <Projectile>
				- <Actor.fire>
		*/
		public function killProjectile(projectile:Projectile = null):void {
			if (projectile == null && _projectile == null) {
				return;
			} //end if
			
			_liveRound = false;
			projectile = (projectile == null) ? _projectile : projectile; //either use the argument object or this Actor's object (they really should be the same thing)
			_board.removeEntity(projectile);
			_projectile = null;
		} //end KillProjectile
		
		/*
			Function: move
			
				Moves the actor in the specified direction, if possible. Actors can only be moved if they are in a NORMAL state. Also
				note that if the move is invalid, the actor will move towards the center of the current cell. If the move is invalid 
				and the Actor is currently at the origin of the home cell, the Actor will simply not move. This function is responsible
				for updating the Radar if a new cell is entered.
				
			Parameters:
			
				direction - the direction to move. an integer from the Direction enum.
				
			Returns:
			
				A boolean indicating whether or not the Actor has moved.
				
			See Also:
			
				- <ActorState>
				- <Actor.update>
				- <Direction>
				- <Radar>
		*/
		public function move(direction:int):Boolean {
			//only move in a normal state
			if (_state != ActorState.NORMAL) {
				return false;
			} //end if
				
			//am I at the origin?
			if (_home.x == this.x && this.y == _home.y) {
				//can I move the direction I want to go?
				if (_home.hasNeighbor(direction)) {
					//sure can, so do it!
					var newCell:Cell = _home.getNeighbor(direction);
					
					//warp through portals at the origin. by warping from origin to origin, and not cell edge to origin,
					//this prevents agents from being halfway "through" a portal while another agent actually triggers the portal
					if (_home.index == Portal.LEFT_PORTAL && newCell.index == Portal.RIGHT_PORTAL || _home.index == Portal.RIGHT_PORTAL && newCell.index == Portal.LEFT_PORTAL) {
						warp(newCell);
						_board.togglePortal();
					} else {
						_viewpoint = direction;
						update(direction);
					} //end if
				} else {
					return false;
				} //end if
			} else {
				//am I facing the direction I want to go?
				if (direction == _viewpoint) {
					update(direction);
					
					//if I moved off the cell, make sure to update the cell occupants and my home
					//don't care to find x or y direction, just use simple all-encompassing distance formula (woo woo!)
					if (Point.distance(new Point(this.x, this.y), new Point(_home.x, _home.y)) >= 18) {
						var oldCell:Cell = _home;
						
						_home.removeOccupant(this);
						_home = _home.getNeighbor(direction);
						_home.addOccupant(this);
						
						_board.radar.update(this, oldCell);
					} //end if
				} else {
					//not facing the direction I want to move
					if ((this.y - _home.y != 0 && direction > Direction.LEFT) || (this.x - _home.x != 0 && direction <= Direction.LEFT)) {
						//just inverting my current direction
						_viewpoint = direction;
					} else {
						//i actually want to change axis, so I need to get to the origin first (face the origin)
						_viewpoint = _viewpoint <= Direction.LEFT ? (this.x - _home.x > 0 ? Direction.LEFT : Direction.RIGHT) : (this.y - _home.y > 0 ? Direction.UP : Direction.DOWN);
					} //end if

					update(_viewpoint);
				} //end if
			} //end if
			
			return true;
		} //end Move
		
		/*
			Function: warp
			
				Warps this Actor to a new cell. Does not change Actor's viewpoint or orientation. Radar is updated through this function.
				
			Parameters:
			
				cell - the cell object that the actor is warping to.
				
			See Also:
			
				- <Board.togglePortal>
				- <Cell>
				- <Radar>
		*/
		public function warp(cell:Cell):void {
			var oldCell:Cell;
			
			if (_home != null) {
				_home.removeOccupant(this);
				oldCell = _home;
			} //end if
			
			_home = cell;
			_home.addOccupant(this);
			
			this.x = _home.x;
			this.y = _home.y;
			
			//update the radar, but only reset the previous cell if there is... you know... actually a previous cell
			_board.radar.update(this, oldCell);
		} //end Warp
	} //end Actor class
} //end package