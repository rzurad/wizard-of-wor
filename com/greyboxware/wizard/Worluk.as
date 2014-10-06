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
	import flash.media.Sound;
	import flash.media.SoundChannel;
	import com.greyboxware.wizard.Enums.*;
	
	/* 
		Class: Worluk
		
			The Worluk is the miniboss. The Worluk is encountered after all normal enemies have been eliminated (Max of 6 of each: Burwor, Garwor, Thorwor).
			The Worluk AI is based off of the Burwor AI in that the Worluk does not actively pursue the player nor care about finding the player. The Worluk
			simply wanders the dungeon aimlessly until it traverses a portal, at which point, it escapes and is destroyed. Worluks do not shoot projectiles,
			and the sprite does not rotate in order to suggest that it is flying.
		
		See Also: 
		
			- <Actor>
			- <Enemy>
	*/
	public class Worluk extends Enemy {
		//+--------------------------------------
		//| PRIVATE VARS
		//+--------------------------------------
		private var _sndLoop:Sound; //sound that is played while the Worluk is alive [NORMAL state]
		private var _sndLoopChannel:SoundChannel; //sound channel for the loop sound
	
		//+--------------------------------------
		//| PROTECTED FUNCTIONS
		//+--------------------------------------
		/*	
			Group: Protected Functions
			
			Function: think
			
				Overridden from Enemy Class.
				Worluks wander the map aimlessly, not looking for anything or acting upon anything and with no
				idiot factor. Worluks wander until they traverse through a portal, at which point they are destroyed
				because they have escaped. Worluks will only kill the player if they just-so-happen to be in the way of
				wherever the Worluk is going.
				
			Parameters:
			
				event - optional event parameter so that this can be tied to enterFrame events if desired.
							
			See Also:
			
				- <Enemy.setPath>
				- <Enemy.playerInView>
				- <Enemy.directionToCell>
				- <Burwor.think>
		*/
		override protected function think(event:Event = null):void {
			var oldHome:Cell = _home;
				
			if (_path.length == 0 && this.x == _home.x && this.y == _home.y) {
				//find a new path and start following it
				setPath(false); 
				directionToCell(_path.pop());
			} //end if
			
			if (!move(_direction)) {
				setPath(false); 
				directionToCell(_path.pop());
			} //end if
			
			if ((_home.index == Portal.LEFT_PORTAL && oldHome.index == Portal.RIGHT_PORTAL) || (_home.index == Portal.RIGHT_PORTAL && oldHome.index == Portal.LEFT_PORTAL)) {
				//escaped
				destroy();
				return;
			} //end if
			
			//if the agent has moved to a new cell, figure out where to go next.
			if (!(_home === oldHome)) {
				directionToCell(_path.pop());
			} //end if
		} //end Think
		
		/*
			Function: update
			
				Overridden from Actor class. Changed so that the sprite never rotates, giving the 
				illusion of flight.
			
			Precondition:
			
				Parameter direction is a valid direction for this Actor to move. Direction should
				be validated by the move function.
				
			Parameters:
			
				direction - the direction to move. An integer defined by the <Direction> "enum"
				
			See Also:
			
				- <Actor.update>
		*/
		override protected function update(direction:int):void {
			switch (direction) {
				case Direction.LEFT:
					this.x = this.x - _speed;
					break;
				case Direction.DOWN: 
					this.y = this.y + _speed;
					break;
				case Direction.UP:
					this.y = this.y - _speed;
					break;
				case Direction.RIGHT:
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
			
			Constructor: Worluk
			
				Creates instance of Worluk Object. 
		*/
		public function Worluk() {
			_path = new Array();
			_points = 1000;
			_speed = 9;
			
			_sndDie = new WorlukDie();
			_sndLoop = new WorlukLoop();
			_sndLoopChannel = _sndLoop.play(0, 99999);
		} //end constructor
		
		//+--------------------------------------
		//| PUBLIC FUNCTIONS
		//+--------------------------------------
		/*	
			Group: Public Functions
					
			Function: destroy
			
				Overridden from Actor to ensure loop sound is stopped.
				
			Parameters:
			
				deathAnim - DeathAnimation object that called this function.
				
			Post Condition:
			
				Unless there are references to this Actor outside of the <Board>, this object and the <DeathAnimation> will be garbage collected
		*/
		override public function destroy(deathAnim:DeathAnimation = null):void {
			stopThinking(); //TODO: Remove for post milestone 3
			_sndLoopChannel.stop();
			super.destroy(deathAnim);
		} //end destroy
		
		/*			
			Function: die
			
				Overridden from Actor. Stops the loop sound from playing and plays an uninterruptable death sound.
				
			Parameters:
			
				loops - number of loops for the DeathAnimation to play (Default: 2)
				
			Post Condition:
			
				Actor's alpha is 0%. Actor's state is DIEING. DeathAnimation is spawned over this Actor.
				
			See Also:
			
				- <Actor.die>
		*/
		override public function die(loops:int = 2):void {
			stopThinking(); //TODO: Remove for post milestone 3
			
			_sndLoopChannel.stop();
			SoundManager.play(_sndDie);
			_state = ActorState.DIEING;
			this.alpha = 0;
			
			var deathAnim:DeathAnimation = new DeathAnimation(this, loops);
			_board.addChild(deathAnim);
		} //end die		
		
		//+--------------------------------------
		//| FUNCTIONS FOR MILESTONE 3 TESTING
		//+--------------------------------------
		public override function startThinking():void {
			this.addEventListener("enterFrame", think);
		} //end startThinking
		
		
		public override function stopThinking():void {
			this.removeEventListener("enterFrame", think);
		} //end stopThinking
	} //end class
} //end package