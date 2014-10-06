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
	
	/* 
		Class: Radar
		
			The Radar is... just that... a radar screen. It is a grid of RadarBlip MovieClips that change color depending on actors that occupy a given cell on the board (with each
			RadarBlip mapping to a Cell on the board. Only Burwors, Garwors, and Thorwors appear on the radar screen. The color of the blip is determined by the actor's projectile 
			transform
			
			Actors are responsible for updating their radar position when needed. Radar does not simply query every cell on the board and draw all the actors every frame, nor does
			it iterate through the list of entities and update the positions. By forcing the responsiblity on actors, who already know when they're entering a new cell, Radar is
			not any kind of processing burden. It was considered to use a purely event-based model for managing the Radar, however I decided from the get-go that I didn't want the
			gameplay logic to be event-driven. Why? Because I like to make things interesting :) plus there's slightly less processing going on with this method compared to events
			bubbling up and down.
		
		See Also: 
		
			- <Actor>
			- <Actor.getProjectileTransform>
			- <Board>
	*/
	public class Radar extends MovieClip {
		//+--------------------------------------
		//| PRIVATE VARS
		//+--------------------------------------
		private var _grid:Array; //the grid of the radar. Mimic's the board's array of cells (only with RadarBlips)
		
		//+--------------------------------------
		//| PRIVATE CONSTANTS
		//+--------------------------------------
		private const BLACK_TRANSFORM:ColorTransform = new ColorTransform(0, 0, 0, 1, 0, 0, 0, 0); //Transform to return a blip to Black (unoccupied)
		
		//+--------------------------------------
		//| CONSRUCTOR
		//+--------------------------------------
		/*
			Group: Constructor
					
			Constructor: Radar
			
				Initializes and draws the radar grid
				
		*/
		public function Radar() {
			_grid = new Array();
			
			//just run a loop for the number of cells and spawn the RadarBlips
			var yscalar:int = -1;
			for (var i:int = 0; i < Board.BOARD_WIDTH * Board.BOARD_HEIGHT; i++) {
				if (i % Board.BOARD_WIDTH == 0) {
					yscalar++;
				} //end if
				
				var blip:RadarBlip = new RadarBlip();
				blip.x = (i % Board.BOARD_WIDTH) * 14;
				blip.y = 10 * yscalar;
				
				_grid.push(blip);
				this.addChild(blip);
			} //end for
		} //end constructor
		
		//+--------------------------------------
		//| PUBLIC FUNCTIONS
		//+--------------------------------------
		/*
			Group: Public Functions
					
			Function: remove
			
				Signals that an actor has removed itself from the given cell. If the cell is still occupied by other actors, then the blip switches to one
				of the other occupant's colors
				
			Parameters:
			
				cell - the cell who's losing an actor
				
			See Also:
				
				- <Actor.move>
				- <Actor.getProjectileTransform>
		*/
		public function remove(cell:Cell):void {
			//see if there's any more occupants in the cell we care about, set the color occordingly
			for (var i:int = 0; i < cell.occupants.length; i++) {
				if (cell.occupants[i] is Burwor || cell.occupants[i] is Garwor || cell.occupants[i] is Thorwor) { //i hear python makes this easier... :/
					_grid[cell.index].transform.colorTransform = cell.occupants[i].getProjectileTransform();
					return;
				} //end if
			} //end for
			
			//otherwise just set it to black
			_grid[cell.index].transform.colorTransform = BLACK_TRANSFORM;
		} //end clean
		
		/*			
			Function: reset
			
				Resets all of the RadarBlips to black.
		*/
		public function reset():void {
			for (var i:int = 0; i < _grid.length; i++) {
				_grid[i].transform.colorTransform = BLACK_TRANSFORM;
			} //end for
		} //end reset
		
		/*
			Function: update
			
				Signals that an actor has moved into a new cell. The old cell is to be updated as well as the new cell.
				
			Parameters:
			
				actor - the actor who moved into the new cell
				oldCell - the cell the passed actor left.
				
			See Also:
				
				- <Actor.move>
				- <Actor.getProjectileTransform>
		*/
		public function update(actor:Actor, oldCell:Cell = null):void {
			if (actor is Burwor || actor is Garwor || actor is Thorwor) {
				_grid[actor.cellIndex].transform.colorTransform = actor.getProjectileTransform();
								
				//oldCell doesn't have to be given (ex: on enemy spawn)
				if (oldCell != null) {
					remove(oldCell);
				} //end if
			} //end if
		} //end update
	} //end class
} //end package