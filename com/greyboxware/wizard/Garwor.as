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
	import flash.geom.ColorTransform;
	
	/* 
		Class: Garwor
		
			Garwors are the second enemy encountered (the yellow guys). Garwors use the default AI defined by the Enemy class with a 3% idiot factor.
		
		See Also: 
		
			- <Actor>
			- <Enemy>
	*/
	public class Garwor extends Enemy {
		//+--------------------------------------
		//| CONSTRUCTOR
		//+--------------------------------------
		/*	
			Group: Constructor
			
			Constructor: Garwor
			
				Creates instance of Garwor Object. 
		*/
		public function Garwor() {
			_sndSpawn = new GarworVisible();
			super(true);
			_path = new Array();
			_points = 200;
			_speed = 3;
			_idiotFactor = 0.03;
		} //end constructor
		
		//+--------------------------------------
		//| PUBLIC FUNCTIONS
		//+--------------------------------------
		/*	
			Group: Public Functions
			
			Function: getProjectileTransform
			
				Override projectile transform to return the yellow color of the Garwor.
				
			Returns:
			
				a color transform object with the blue color a 100% alpha.
							
			See Also:
			
				- <Actor.getProjectileTransform>
		*/
		public override function getProjectileTransform():ColorTransform {
			return new ColorTransform(0, 0, 0, 1, 207, 206, 0, 0); //default to the orange/red color
		} //end SetColor
		
		//+--------------------------------------
		//| FUNCTIONS FOR MILESTONE 3 TESTING
		//+--------------------------------------
		public override function die(loops:int = 2):void {
			stopThinking();
			super.die();
		} //end die
		
		public override function startThinking():void {
			this.addEventListener("enterFrame", think);
		} //end startThinking
		
		
		public override function stopThinking():void {
			this.removeEventListener("enterFrame", think);
		} //end stopThinking
	} //end public class
} //end package