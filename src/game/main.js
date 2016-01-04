// The Incredible Wizard of Wor
// ----------------------------

// Welcome to an open-source Web Browser clone of the 1981 Midway Games title
// "Wizard of Wor" for the [Bally Astrocade](http://en.wikipedia.org/wiki/Bally_Astrocade).
// The goal of this project is to completely recreate, as closely as possible, the experience
// of playing the original title.

// This file is the main entry point for the entire application, and uses an engine called
// *Fiddle*, which is intented to be a JavaScript implementation of Mike McShaffry's
// *GameCode4* (GCC4) engine from the book [Game Codeing Complete, Fourth Edition)[], by McShaffry
// and David Graham.
//
// I named my implementation "Fiddle" because I wanted a name that was more
// fun than "GameCode4", and also to show that the engine isn't really intended to be anything
// other than an avenue for me to fiddle around with understanding how real game engines work.
// I also figured that the difference between C++ and JavaScript, and the differences between
// a Desktop application and a Web Browswer application would require significant enough logic/architectural
// changes for me to adequately get away with a name change.

import fiddle from '../engine/fiddle/main';
import WizardApplication from './wizard-application';

// In a simlar fashion to the way GCC4 works, most of the logic that operates independent from the
// actual game is abstracted into the game engine. One of such abstractions is a function whose job
// is to be the main entry point for the application (in Windows-land, this is the `WinMain` or the
// `wWinMain` function).

// A thing to note is that the GCC4 engine relies on a global variable named `g_pApp` to point to the
// currently initialized game application subclass. Since I've been writing JavaScript long enough to
// despise global variables, we're instead passing the game's FiddleApp subclass to the Fiddle main
// function so that it can be initialized.
fiddle(WizardApplication);
