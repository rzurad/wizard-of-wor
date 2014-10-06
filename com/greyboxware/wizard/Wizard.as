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
	import flash.geom.ColorTransform;
	
	/* 
		Class: Wizard
		
			The Wizard is the main boss of the game. The wizard only appears after the death of the Worluk, and only after some rounds. 
			It uses the base AI defined by the Enemy class with an idiot factor of 1%. The Wizard appears after the death of the Worluk,
			moves toward the nearest player while blindly fireing lasers in the direction it's facing. After the appear sound has finished playing,
			the wizard temporarily disappears from the dungone, and then reappears in a different cell. The timing of appearing and vanishing
			is dictacted by sound events.
			
			If the Wizard kills all the players on the board, he is destroyed and deemed to have escaped, ending the level. If the Wizard is killed,
			the level is ended.
		
		See Also: 
		
			- <Actor>
			- <Enemy>
	*/
	public class Wizard extends Enemy {
		//+--------------------------------------
		//| PRIVATE VARS
		//+--------------------------------------
		private var _sndChannel:SoundChannel; //internal sound channel
		private var _sndVanish:Sound; //sound played when the wizard disappears
		private var _sndEscaped:Sound; //sound played when the wizard escapes after killing all of the players
		private var _sleep:Boolean = false; //force think function to do nothing. ALso marks entity as invisible/invulnerable
		
		//+--------------------------------------
		//| PRIVATE EVENT HANDLERS
		//+--------------------------------------
		//after the appear sound is finished playing, vanish
		private function appearSound_soundComplete(event:Event):void {
			tryVanish();
		} //end appearSound_soundComplete
		
		//after the vanish sound is finished playing, warp to random location and appear
		private function vanishSound_soundComplete(event:Event):void {
			warp(_board.getCell(int(Math.random() * (Board.BOARD_HEIGHT * Board.BOARD_WIDTH))));
			appear();
		} //end vanishSound_soundComplete
		
		//+--------------------------------------
		//| CONSTRUCTOR
		//+--------------------------------------
		/*	
			Group: Constructor
			
			Constructor: Wizard
			
				Creates instance of Wizard Object. 
		*/
		public function Wizard() {
			_sndSpawn = new WizardAppear();
			_sndVanish = new WizardDisappear();
			_sndEscaped = new WizardEscape();
			super(false);
			_path = new Array();
			_points = 2500;
			_idiotFactor = 0.01;
			_sndFire = null;
			_speed = 3;
			_maxProjectileRange = 3;
			_projectileSpeed = 12;
		} //end constructor
		
		//+--------------------------------------
		//| PROTECTED FUNCTIONS
		//+--------------------------------------
		/*
			Group: Protected Functions
		
			Function: appear
			
				Overridden from Enemy. Make the Wizard visible and active. Play the spawn sound and set up the event listeners for SOUND_COMPLETE
						
			Parameters:
			
				override - if true, force the enemy to appear, even if the enemy is already visible [use on initial spawn to set variables]
				
			See Also:
			
				- <Enemy.appear>
		*/
		override protected function appear(override:Boolean = false):void {
			alpha = 100;
			_sleep = false;
			
			if (_sndChannel) {
				_sndChannel.removeEventListener(Event.SOUND_COMPLETE, vanishSound_soundComplete);
			} //end if
			
			_sndChannel = _sndSpawn.play(); 
			_sndChannel.addEventListener(Event.SOUND_COMPLETE, appearSound_soundComplete);
		} //end appear
		
		/*	
			Function: think
			
				Overridden from Enemy. Uses the same logic as <Enemy.think> except: Wizard kills himself if no
				players are on the board [Escaped], think function does nothing if _sleep is true. Wizard also tries
				to fire a projectile every time he enters a new Cell.
				
			Parameters:
			
				event - optional event parameter so that this can be tied to enterFrame events if desired.
							
			See Also:
			
				- <Enemy.think>
		*/
		override protected function think(event:Event = null):void {
			if (!Board.playing) {
				_sndChannel.stop();
				_sndChannel = _sndEscaped.play();
				destroy();
			} //end if
			
			if (_sleep) {
				return;
			} //end if
			
			var oldHome:Cell = _home;
			
			if (_pursuing && Math.random() < _idiotFactor) {
				_pursuing = false;
				setPath(false);
				directionToCell(_path.pop());
			} else if (_path.length == 0 && this.x == _home.x && this.y == _home.y) {
				_pursuing = setPath(true); 
				directionToCell(_path.pop());
			} //end if
			
			if (!move(_direction)) {
				_pursuing = setPath(true);
				directionToCell(_path.pop());
			} //end if
					
			if (!(oldHome === _home)) {
				directionToCell(_path.pop());
				fire();
			} else if (_pursuing && this.x == _home.x && this.y == _home.y) {
				setPath(true);
				directionToCell(_path.pop());
			} //end if
		} //end Think
		
		/*	
			Function: tryVanish
			
				Overridden from Enemy. Makes the wizard turn invisible and invulnerable. Plays the vanish sound and sets
				up event handlers for SOUND_COMLETE. Should technically be called "vanish" because there's nothing to try, but
				what the hell, let's go with it. Overridding is fun.
							
			See Also:
			
				- <Enemy.tryVanish>
		*/
		override protected function tryVanish():void {
			_home.removeOccupant(this);
			this.alpha = 0;
			_sleep = true;
			
			_sndChannel.removeEventListener(Event.SOUND_COMPLETE, appearSound_soundComplete);
			_sndChannel = _sndVanish.play();
			_sndChannel.addEventListener(Event.SOUND_COMPLETE, vanishSound_soundComplete);
		} //end tryVansih
		
		//+--------------------------------------
		//| PUBLIC FUNCTIONS
		//+--------------------------------------
		/*		
			Group: Public Functions
			
			Function: die
			
				Overridden from Actor. Stops the loop sound from playing.
				
			Parameters:
			
				loops - number of loops for the DeathAnimation to play (Default: 2)
				
			Post Condition:
			
				Actor's alpha is 0%. Actor's state is DIEING. DeathAnimation is spawned over this Actor.
				
			See Also:
			
				- <Actor.die>
		*/
		override public function die(loops:int = 2):void {
			stopThinking();
			_sndChannel.stop();
			super.die();
		} //end die
		
		//+--------------------------------------
		//| FUNCTIONS FOR MILESTONE 3 TESTING
		//+--------------------------------------
		override public function destroy(deathAnim:DeathAnimation = null):void {
			stopThinking();
			super.destroy(deathAnim);
		} //end destroy
		
		override public function startThinking():void {
			this.addEventListener("enterFrame", think);
		} //end startThinking
		
		
		override public function stopThinking():void {
			this.removeEventListener("enterFrame", think);
		} //end stopThinking
	} //end public class
} //end package