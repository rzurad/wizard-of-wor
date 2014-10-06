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
		Class: Burwor
		
			Burwors are the first enemy encountered (the blue guys). Burwors are stupid; they simply wanter around aimlessly and never pursue the player,
			however, the Burwors will shoot at players if the opportunity arises. 
		
		See Also: 
		
			- <Actor>
			- <Enemy>
	*/
	public class Burwor extends Enemy {
		//+--------------------------------------
		//| PROTECTED FUNCTIONS
		//+--------------------------------------
		/*	
			Function: think
			
				Function that makes the agent evaluate the current situation and make a decision on what to do next. 
				Burwors simply wander the map aimlessly and never pursue the player. Burwors will, however, fire the
				at the player using the same descretion as default Enemys.
				
			Parameters:
			
				event - optional event parameter so that this can be tied to enterFrame events if desired.
							
			See Also:
			
				- <Enemy.setPath>
				- <Enemy.playerInView>
				- <Enemy.directionToCell>
		*/
		override protected function think(event:Event = null):void {
			var oldHome:Cell = _home;
			
			//before moving, check if the agent at destination OR if the agent is an idiot
			if ((_path.length == 0 && this.x == _home.x && this.y == _home.y) || Math.random() < _idiotFactor) {
				//find a new path and start following it
				setPath(false); 
				directionToCell(_path.pop());
			} //end if
			
			//try and move. if stuck, recalculate
			if (!move(_direction)) {
				setPath(false); 
				directionToCell(_path.pop());
			} //end if
			
			//if the agent has moved to a new cell, figure out where to go next.
			if (!(_home === oldHome)) {
				directionToCell(_path.pop());
				
				//fire at player?
				var playerNowVisible:Boolean = playerInView();
				
				if (playerNowVisible && _playerWasInView) {
					fire();
				} //end if
				
				_playerWasInView = playerNowVisible;
			} //end if
		} //end Think
		
		//+--------------------------------------
		//| CONSTRUCTOR
		//+--------------------------------------
		/*	
			Constructor: Burwor
			
				Creates instance of Burwor Object. 
		*/
		public function Burwor() {
			_path = new Array();
			_points = 100;
			_speed = 3;
			_idiotFactor = 0.01; //Burwor's can have a low idiotFactor, since they wander around aimlessly anyway.
		} //end constructor
		
		//+--------------------------------------
		//| PUBLIC FUNCTIONS
		//+--------------------------------------
		/*	
			Function: getProjectileTransform
			
				Override projectile transform to return the blue color of the Burwor.
				
			Returns:
			
				a color transform object with the blue color a 100% alpha.
							
			See Also:
			
				- <Actor.getProjectileTransform>
		*/
		override public function getProjectileTransform():ColorTransform {
			return new ColorTransform(0, 0, 0, 1, 91, 147, 243, 0); //default to the orange/red color
		} //end SetColor
		
		//+--------------------------------------
		//| FUNCTIONS FOR MILESTONE 3 TESTING
		//+--------------------------------------
		override public function die(loops:int = 2):void {
			stopThinking();
			super.die();
		} //end die
		
		override public function startThinking():void {
			this.addEventListener("enterFrame", think);
		} //end startThinking
		
		
		override public function stopThinking():void {
			this.removeEventListener("enterFrame", think);
		} //end stopThinking
	} //end public class
} //end package