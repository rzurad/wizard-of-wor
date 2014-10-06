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
	import flash.geom.ColorTransform;
	
	/* 
		Class: Player
		
			Class for the Player. The Player is just like every other Actor, except keyboard/mouse/whatever inputs are tied to the move and fire functions.
			The MovieClip that maps to the instantiated Player object contains the sprites for both players (assuming I ever get around to implementing a
			second player). Specifying which player is being spawned will make the appropriate sprite visible.
		
		See Also: 
		
			- <Actor>
	*/
	public class Player extends Actor {	
		//+--------------------------------------
		//| CLASS CONSTANTS
		//+--------------------------------------
		/*
			Group: Class Constants
			
			Constants: Player Numbers
			
			PLAYER_ONE - Designates first player sprite
			PLAYER_TWO - Designates second player sprite
		*/
		public static const PLAYER_ONE:int = 0; //I know... weird, isn't it?
		public static const PLAYER_TWO:int = 1;
		
		//+--------------------------------------
		//| CONSTRUCTOR
		//+--------------------------------------
		/*	
			Group: Constructor
			
			Constructor: Garwor
			
				Creates instance of Player Object. 
				
			Parameters:
			
				number - the player number used to determine which sprite to draw. Defaults to PLAYER_ONE.
		*/
		public function Player(number:int = PLAYER_ONE) {
			super();
			
			//hide the animation of player 1 (drawn on the layer above the animation of player 2)
			if (number == PLAYER_TWO) {
				//"trick" flash into removing the mask without actually removing it
				this.mask_mc.scaleX = 0;
				this.mask_mc.scaleY = 0;
			} //end if
			
			_sndFire = new PlayerFire();
			_sndDie = new PlayerDie();
			_sndSpawn = new PlayerSpawn();
		} //end Constructor
		
		//+--------------------------------------
		//| PUBLIC FUNCTIONS
		//+--------------------------------------
		/*	
			Group: Public Functions
			
			Function: die
			
				Override die function to make the animation longer by default.
				
			Parameters:
			
				animLoops - number of times the DeathAnimation loop plays. Defaults to 8.
							
			See Also:
			
				- <Actor.die>
				- <DeathAnimation>
		*/
		public override function die(animLoops:int = 8):void {
			super.die(animLoops); //DeathAnimation is longer for players
		} //end Die
		
		/*
			
			Function: getProjectileTransform
			
				Override projectile transform to return the color of the projectile based on
				which player sprite is being drawn for this object.
				
			Returns:
			
				If the player sprite is PLAYER_ONE, a yellow colortransform object is returned. 
				If the player sprite is PLAYER_TWO, a red colortransform object is returned.
							
			See Also:
			
				- <Actor.getProjectileTransform>
		*/
		public override function getProjectileTransform():ColorTransform {
			if (this.mask_mc.scaleX != 0) {
				//player 1 laser color
				return new ColorTransform(0, 0, 0, 1, 207, 206, 0, 0);
			} else {
				//player 2 laser color
				return new ColorTransform(0, 0, 0, 1, 91, 147, 251, 0);
			} //end if
		} //end SetProjectileTransform		
		
		/*
			
			Function: respawn
			
				Respawns the player at the specified cellindex. 
				
			Note:
			
				If respawn is called while the Player is playing the DeathAnimation and Dieing, then
				the player will be respawned, but when the deathanimation finishes, the Player will turn
				invisible, yet still respond to move and fire inputs, and will not die. I call this the
				Invisible-God-Mode-Bug.
							
			See Also:
			
				- <Actor.warp>
				- <Board.spawnActor>
		*/
		public function respawn(index:int):void {
			_state = ActorState.NORMAL;
			_liveRound = false;
			_board.spawnActorIndex(this, index);
			this.alpha = 100;
			SoundManager.play(_sndSpawn);
		} //end respawn
	} //end Player class
} //end package