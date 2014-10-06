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
	import flash.events.Event;
	import flash.geom.Point;
	
	/* 
		Class: Projectile
		
			Represents a projectile (a laser, by default). All Actors have the ability to fire projectiles
			
			Projectile are given a starting place and a direction by their Actor creator. Projectiles travel from the point of origin
			in the given direction until they pass a point on the canvas (the threshold). If a Projectile is deemed to have either collided with
			an Actor or moved past the threshold point, the Projectile is killed (removed from the board).
			
			It is important to note that collisions that occur with projectiles are actually tested against the bounding boxes of both the
			Projectile and the Actor, rather than the hitbox_mc. This is intentional, as it allows for less of a chance for a projectile to 
			"jump over" an Actor and miss the collision. This can happen if the Actor sprite and the projectile are moving towards each other 
			at speeds that would make the next movement calculate for each pass each other without ever overlapping. Care should be taken to
			avoid this condition, as all entity movements are not calculated in advance and collisions are done *a posteriori* per frame.
		
		See Also: 
		
			- <Actor>
			- <Actor.fire>
			- <Board.evaluateCollisions>
	*/
	public class Projectile extends MovieClip {
		//+--------------------------------------
		//| PRIVATE VARS
		//+--------------------------------------
		private var _owner:Actor; //reference to the Actor that fired this Projectile
		private var _speed:int; //speed of the projectile (pixels per frame)
		private var _home:Cell; //the current cell that the Projectile occupies
		private var _threshold:Point; //the point on the canvas which kills the Projectile
		private var _scalar:Point; //helps with the movement functions
		private var _viewpoint:int; //direction projectile is moving
		
		//+--------------------------------------
		//| PROPERTIES
		//+--------------------------------------
		/*
			Group: Properties
					
			Property: home
			
				Sets the cell that this Projectile currently occupies. *SET ONLY*
				
			Post Condition: 
			
				The Projectile is added as an occupant of the cell
				
			See Also:
				
				- <Cell.addOccupant>
		*/
		public function set home(cell:Cell):void {
			if (_home != null) {
				_home.removeOccupant(this);
			} //end if
			
			_home = cell;
			_home.addOccupant(this);
		} //end SetCell
		
		/*
			Property: scalar
			
				Movement scalar. Helps move function determine where to move to. A zero causes the projectile to not be moved
				along that axis, and a 1 or -1 determines the direction of movement relevant to world coordinates. *SET ONLY*
				
			See Also:
				
				- <Projectile.move>
		*/
		public function set scalar(scalar:Point):void {
			_scalar = scalar;
		} //end scalar
		
		/*
			Property: threshold
			
				A Point on the canvas which kills the projectile once it moves beyond it. *SET ONLY*
				
			See Also:
			
				- <Actor.fire>
		*/
		public function set threshold(threshold:Point):void {
			_threshold = threshold;
		} //end threshold
		
		/*
			Property: viewpoint
			
				The direction the projectile is moving. An integer defined by Direction enum. *SET ONLY*
				
			See Also:
			
				- <Direction>
				- <Actor.fire>
		*/
		public function set viewpoint(direction:int):void {
			_viewpoint = direction;
		} //end viewpoing
		
		//+--------------------------------------
		//| CONSTRUCTOR
		//+--------------------------------------
		/*
			Group: Constructor
			
			Function: Projectile
			
				Creates a new instance of a Projectile object.
				
			Parameters:
			
				actor - the Actor that fired this projectile
				
			See Also:
			
				- <Actor.fire>
		*/
		public function Projectile(actor:Actor) {
			_owner = actor;
			_speed = actor.projectileSpeed;
		} //end Constructor
		
		//+--------------------------------------
		//| PUBLIC FUNCTIONS
		//+--------------------------------------
		/*
			Group: Public Functions
			
			Function: begin
			
				Adds enterFrame event listener to the projectile, causing it to move accordingly
				
			Precondition:
				
				It is assumed that all properties of the Projectile are set accordingly (viewpoint, scalar, colorTransform, etc.)
				
			Post Condition:
			
				The Projectile will move in the specified direction and the code-defined speed every frame.
				
			See Also:
			
				- <Projectile.viewpoint>
				- <Projectile.scalar>
				- <Projectile.threshold>
				- <Actor.fire>
		*/
		public function begin():void {
			this.addEventListener("enterFrame", move);	
		} //end Start
		
		
		/*
			Function: die
			
				Removes Projectile from play and allows the creating Actor to fire another projectile. If the 
				
			See Also:
			
				- <Actor.fire>
		*/
		public function die(dead:Actor = null):void {
			this.removeEventListener("enterFrame", move);
			
			if (_home != null) {
				_home.removeOccupant(this);
			} //end if
			
			if (dead != null) {
				_owner.score = dead.points;
			} //end if
			
			_owner.killProjectile(this);
		} //end Die
		
		/*
			Function: move
			
				Moves the Projectile according to the objects properties. Called on "enterFrame" event after the begin() function has been called.
				if the projectile moves into a cell wall, the projectile is destoyed.
				
			Parameters:
			
				enterFrameEvent - Event object passed by enterFrame event. Has no relevance to this function.
				
			See Also:
			
				- <Projectile.begin>
				- <Projectile.die>
		*/
		public function move(enterFrameEvent:Event):void {
			//booleans indication Projectile's position regarding the threshold
			var oldtruths:Array = new Array((_threshold.x - this.x) >= 0, (_threshold.y - this.y) >= 0);
			
			this.x = this.x + (_scalar.x * _speed);
			this.y = this.y + (_scalar.y * _speed);
			
			//have I moved past the threshold?
			if (((_threshold.x - this.x) >= 0) != oldtruths[0] || (((_threshold.y - this.y) >= 0) != oldtruths[1])) {
				//past the threshold. time to die
				die();
				return;
			} //end if
						
			//entering a new cell?
			if (Point.distance(new Point(this.x, this.y), new Point(_home.x, _home.y)) >= 18) {				
				_home.removeOccupant(this);
				_home = _home.getNeighbor(_viewpoint);
				
				//for portals (open portal doesn't warp projectiles, they just fall off the board, allowing home to be null in that case)
				//TODO: Maybe allow projectiles to warp through portals properly. This is not in the original game, but might make an interesting mechanic
				if (_home == null) {
					die();
					return;
				} //end if
				
				_home.addOccupant(this);
			} //end if
		} //end Move
	} //end class Projectile
} //end package