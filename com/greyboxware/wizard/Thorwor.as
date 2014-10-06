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
		Class: Thorwor
		
			Thorwors are the third enemy encountered (the red guys). Thorwors use the default AI defined by the Enemy class with a 1.5% idiot factor.
		
		See Also: 
		
			- <Actor>
			- <Enemy>
	*/
	public class Thorwor extends Enemy {
		//+--------------------------------------
		//| CONSTRUCTOR
		//+--------------------------------------
		/*	
			Group: Constructor
			
			Constructor: Thorwor
			
				Creates instance of Thorwor Object. 
		*/
		public function Thorwor() {
			_sndSpawn = new ThorworVisible();
			super(true);
			_path = new Array();
			_points = 500;
			_speed = 3;
			_idiotFactor = 0.015;
		} //end constructor
		
		//+--------------------------------------
		//| FUNCTIONS FOR MILESTONE 3 TESTING
		//+--------------------------------------
		override public function die(loops:int = 2):void {
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