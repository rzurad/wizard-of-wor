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
	import com.greyboxware.wizard.Enums.*;
	
	/*
		Class: Cell
		
			Every board is broken into Cells. Cells are essentially the nodes of the scenegraph. Cells are (by default) 36x36 pixel boxes. Each cell has
			a potential for four different entrances/exits that lead to a neighboring cell. Every cell is given a configuration number that represents its
			wall configuration; which exits are traversable. The config is determined by the first four bits of the binary representation of an integer:
			2^3 (UP), 2^2 (DOWN), 2^1 (LEFT), 2^0 (RIGHT). A 1 denotes a valid path in that direction, and a 0 denotes that the path is blocked by a wall
			in that direction. In the corresponding Cell MovieClip, the config number is mapped to the frame that represents the cell being drawn with
			the given config.
			
			Cell objects contain functions for updating entities that are currently in the cell (an entity is declared as an occupant of a cell if its
			origin is inside the cell object's bounding box). Entities are responsible for informing cells of their position.
		
		See Also:
		
			- <Board.init>
	*/
	public class Cell extends MovieClip {
		//+--------------------------------------
		//| PRIVATE VARIABLES
		//+--------------------------------------
		private var _occupants:Array; //a list of every actor currently in this cell
		private var _board:Board; //a reference to the board this cell is a part of
		
		//+--------------------------------------
		//| PUBLIC PROPERTIES
		//+--------------------------------------
		/*	
			Group: Public Properties
			
			Property: config
			
				The integer representing the wall config of this cell.
				
			See Also:
			
				- <Cell.invert>
		*/
		public var config:int;
		
		/*			
			Property: index
			
				The id of this cell in the board's cell array.
		*/
		public var index:int; //id of this cell in the board's dungeon array
		
		/*			
			Property: occupants
			
				List of all entities that currently occupy this cell.
				
			Note:
				
				The GET returns a refrence, so callers do have the ability to modify the contents.
		*/
		public function get occupants():Array {
			return _occupants;
		} //end GetOccupants
		
		//+--------------------------------------
		//| PRIVATE FUNCTIONS
		//+--------------------------------------
		//Recalculate the Config and jump to the appropriate frame.
		private function refresh():void {
			this.gotoAndStop(config);
		} //end UpdateConfig
		
		//+--------------------------------------
		//| CONSTRUCTOR
		//+--------------------------------------
		/*	
			Group: Constructor
			
			Constructor: Cell
			
				Creates a cell object with the given config, and assigns it to the given board object
				
			See Also:
			
				- <Board.init>
		*/
		public function Cell(initConfig:int, board:Board) {
			_board = board;
			_occupants = new Array();
			config = initConfig;
			this.gotoAndStop(config);
		} //end Constructo
		
		//+--------------------------------------
		//| PUBLIC FUNCTIONS
		//+--------------------------------------
		/*	
			Group: Public Functions
			
			Function: addOccupant
			
				Adds the given object as an occupant of this cell.
				
			See Also:
			
				- <Actor.move>
				- <Projectile>
		*/
		public function addOccupant(occupant:Object):void {
			_occupants.push(occupant);
		} //end AddOccupant
		
		/*	

			Function: getNeighbor
			
				Takes the given direction and returns a reference to the neighboring Cell.
				
			Pre Condition:
			
				The given direction is a valid direction [1, 2, 4, 8]
				
			Returns:
			
				A reference to the neighboring cell in the given direction. Returns null if there is no cell
				in the given direction.
				
			See Also:
			
				- <Direction>
		*/
		public function getNeighbor(direction:int):Cell {
			if (hasNeighbor(direction)) {
				switch (direction) {
					case Direction.UP: return _board.getCell(index - 11); break;
					case Direction.DOWN: return _board.getCell(index + 11); break;
					case Direction.LEFT: //special case for portal
						if (index != Portal.LEFT_PORTAL) {
							return _board.getCell(index - 1); 
						} else {
							return _board.getCell(Portal.RIGHT_PORTAL);
						} //end if
						
						break;
					case Direction.RIGHT: //special case for portal
						if (index != Portal.RIGHT_PORTAL) {
							return _board.getCell(index + 1);
						} else {
							return _board.getCell(Portal.LEFT_PORTAL);
						} //end if
						
						break;
					default: return null;
				} //end switch
			} //end if
			
			return null;
		} //end GetNeighbor
		
		/*	

			Function: hasNeighbor
			
				Returns true if the cell has a neighboring cell in the given direction.
				
			Pre Condition:
			
				The given direction is a valid direction [1, 2, 4, 8]
				
			Returns:
			
				True if this cell has a cell in the given direction.
				
			See Also:
			
				- <Direction>
				- <Cell.getNeighbor>
		*/
		public function hasNeighbor(direction:int):Boolean {
			if ((config & direction) == direction) {
				return true;
			} //end if
			
			return false;
		} //end HasNeighbor
		
		/*	

			Function: hasPlayer
			
				Returns true if this cell contains a Player object as an occupant.
				
			Returns:
			
				True if this cell contains a Player object as an occupant.
				
			See Also:
			
				- <Player>
		*/
		public function hasPlayer():Boolean {
			for (var i:int = 0; i < _occupants.length; i++) {
				if (_occupants[i] is Player && Player(_occupants[i]).state != ActorState.DIEING) {
					return true;
				} //end if
			} //end for
			
			return false;
		} //end hasPlayer

		/*	

			Function: invert
			
				Flips this cells wall configuration horizontally. Only LEFT and RIGHT are affected.
				
			See Also:
			
				- <Board.init>
		*/
		public function invert():void {
			//horizontal inversion only matters if left and right are different
			if ((config & 3) == Direction.LEFT || (config & 3) == Direction.RIGHT) {
				//force the last two bits to 0, flip
				config = (config & 0xFC) + ((config & 0x03) ^ 3);
				refresh();
			} //end if
		} //end InvertHorizontal
		
		/*	

			Function: isOccupied
			
				Returns true if this cell has one or more occupants.
				
			Returns:
			
				True if this cell has one or more occupants.
				
			See Also:
			
				- <Cell.addOccupant>
				- <Cell.removeOccupant>
		*/
		public function isOccupied():Boolean {
			return _occupants.length != 0;
		} //end IsOccupied
		
		/*	

			Function: removeOccupant
			
				Removes the given object as an occupant of this cell. Does nothing if the given object
				is not an occupant of this cell.
				
			See Also:
			
				- <Cell.addOccupant>
		*/
		//Removes and occupant Actor object from this cell
		public function removeOccupant(evictee:Object):void {
			//Let's not use indexOf, because this way I don't have to worry about that potential pesky -1 splice argument... :/
			for (var i:int = 0; i < _occupants.length; i++) {
				if (_occupants[i] === evictee) {
					_occupants.splice(i, 1);
					break;
				} //end if
			} //end for
		} //end RemoveOccupant
	} //end Cell class
} //end package