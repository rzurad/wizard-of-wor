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
	import flash.media.Sound;
	import flash.media.SoundChannel;
	import flash.media.SoundTransform;
	import flash.events.Event;
	
	/* 
		Class: SoundManager
		
			The SoundManager provides static functions for controlling and playing sounds in the game. To mimic the original Bally Astrocade
			game which could only play one sound clip at a time, SoundManager provides a static function to mimic this. Also contains a wrapper
			for simply playing a normal sound with SOUND_COMPLETE callback functions.
			
			TODO: static functions for controlling global SoundTransform.
		
		See Also: 
		
			- <Actor>
			- <Actor.getProjectileTransform>
			- <Board>
	*/
	public class SoundManager {
		//+--------------------------------------
		//| PRIVATE VARS
		//+--------------------------------------
		private static var _interruptChannel:SoundChannel = new SoundChannel(); //the channel that gets interrupted to mimic the bally astrocade
		
		//+--------------------------------------
		//| PUBLIC STATIC FUNCTIONS
		//+--------------------------------------
		/*
			Group: Public Static Functions
					
			Function: playInterruptable
			
				Plays the passed sound, and triggers the onCompleteFunction if supplied when the sound has finished playing.
				If this function is called while a previous call's sound is playing, the previous sound is interrupted and the
				new sound is played. This mimics the sound processing of the original game for the Balley Astrocade. Note that
				the original sound will still play and trigger a proper SOUND_COMPLETE event, even if interrupted.
				
			Parameters:
			
				sound - the sound to be played
				onCompleteFunction - the callback function for the SOUND_COMPLETE event. OPTIONAL
		*/
		public static function playInterruptable(sound:Sound, onCompleteFunction:* = undefined):void {
			_interruptChannel.soundTransform = new SoundTransform(0.0);
			_interruptChannel = sound.play();
			
			if (onCompleteFunction) {
				_interruptChannel.addEventListener(Event.SOUND_COMPLETE, onCompleteFunction);
			} //end if
		} //end playInterruptable
		
		/*				
			Function: play
			
				Plays the passed sound, and triggers the onCompleteFunction if supplied when the sound has finished playing.
				This sound will not be interrupted by any further calls, except by changes to the global soundTransform.
				
			Parameters:
			
				sound - the sound to be played
				onCompleteFunction - the callback function for the SOUND_COMPLETE event. OPTIONAL
		*/
		public static function play(sound:Sound, onCompleteFunction:* = undefined):void {
			var channel:SoundChannel = sound.play();
			
			if (onCompleteFunction) {
				channel.addEventListener(Event.SOUND_COMPLETE, onCompleteFunction);
			} //end if
		} //end play
	} //end class
} //end package