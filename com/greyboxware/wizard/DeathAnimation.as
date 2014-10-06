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
	
	/*
		Class: DeathAnimation
		
			Wrapper class for the MovieClip animation that plays whenever an <Actor> dies. 
		DeathAnimations are created by an Actor in the die() function. Once created, DeathAnimations 
		play the animation defined by the linked MovieClip in flash. The animation loops a designated
		number of times, and then destroys the calling Actor through caller.destroy().
		
		See Also:
		
			- <Actor>
			- <Actor.die>
			- <Actor.destroy>
	*/
	public class DeathAnimation extends MovieClip {
		//+--------------------------------------
		//| PRIVATE VARS
		//+--------------------------------------
		private var _loops:uint; //number of times the animation will play
		private var _caller:Actor; //reference to the Actor that is dieing
		
		//+--------------------------------------
		//| CONSTRUCTOR
		//+--------------------------------------
		/*
			Group: Constructor
			
			Constructor: DeathAnimation
			
			Creates an instance of the DeathAnimation class. The death animation is assigned the global coordinates of the caller.
			It is up to the caller to reduce its alpha to 0% and set its state to DIEING. Once the created DeathAnimation has finished
			looping, the caller is destroyed.
			
			Parameters: 
			
				caller - The Actor who is dieing. caller.destroy() is called after the animation has finished playing.
				loops - the number of times the animation should play (default: 2)
			
			See Also:
				
				- <Actor.die>
				- <Actor.destroy>
		*/
		public function DeathAnimation(caller:Actor, loops:int = 2) {
			_loops = loops;
			_caller = caller;
			
			this.x = caller.x;
			this.y = caller.y;
		} //end constructor
		
		//+--------------------------------------
		//| PRIVATE FUNCTIONS
		//+--------------------------------------
		/*	
			Animation has finished looping. Called from the timeline after the animation completes playing the number of specified loops
		*/
		private function done():void {
			if (_caller != null) {
				_caller.destroy(this);
			} //end if
		} //end Destroy
	} //end class
} //end package