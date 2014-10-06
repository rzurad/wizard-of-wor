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
package com.greyboxware.wizard.Enums {
	/*
		Enum: Direction
		
			class doubling as an enum for the possible directions that define the major logic of the game
		
		RIGHT - the right side of the canvas (x + n): 2^0
		LEFT - the left side of the canvas (x - n): 2^1
		DOWN - the bottom of the canvas (y + n): 2^3
		UP - the top of the canvas (y - n): 2^4
		
		See Also:
		
			- <Cell.config>
			- <Actor.move>
	*/
	public final class Direction {
		//static wall weights (also an easy way to refer to a wall direction (like a shitty enum. I'm all for multipurpose...)
		public static const RIGHT:int = 1;
		public static const LEFT:int = 2;
		public static const DOWN:int = 4;
		public static const UP:int = 8;
	} //end Direction
} //end package