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
		Enum: ActorState
		
			class doubling as an enum for the possible states that an Actor object can have.
		
		NORMAL - Actor is in a normal state and can move, fire, think, etc
		FIRING - Actor is playing the "Shoot" animation
		DIEING - Actor is in the process of dieing (DeathAnimation is playing)
	*/									
	public final class ActorState {
		public static const NORMAL:int = 0;
		public static const FIRING:int = 1;
		public static const DIEING:int = 2;
	} //end class
} //end package