
var mode = "HOME"; // Starting state of entire system
var help = false;

var beginButtons = 30; //the starting x value for the top row of buttons
var endButtons = 450; // the ending x value for the top row of buttons
var buttonY = 20; // the y value for top row
var buttonStep = 120; // distance between buttons
var buttonWidth = 80; // width of each button
var buttonHeight = 20; // height of each button
var buttonTextSize = 10; // text height in px

//var gif_loadImg, gif_createImg;

var controlPad;
let vid;

////////////////////////////////////// VIEW //////////////////////////////////////////////////////////////

function setup() {
  createCanvas(1500,1500);
  background(0);
  //noCursor(); //Comment out Cursor(CROSS); below

  // Setup the video in HOME
  if (mode == "HOME"){
	vid = createVideo('imgs/cispdemo.mp4');
	//vid.size(1072, 942);
	vid.size(1608, 1413);
	vid.volume(0);
	vid.loop();
	vid.hide();
  }

  controlPad = new ControlPad();
  controlPad.addListener(i => {
	// Some code that does something when the ith button is pressed
	doAction(i.toString());

	if(mode == "PATTERN"){
		pattern_doAction(i);
	}
	else if(mode == "USES"){
		use_doAction(i);
	}
	else if(mode == "COMPUTE"){
		compute_doAction(i);
	}
	// else if(mode == "DEMO"){
	// 	demo_doAction(i.toString());
	// }
  });
}


// This part enables the HOME mode with reset (cleans all) when inactive for 2 mins
var timeoutInMiliseconds = 124000;
var timeoutId; 

function startTimer() { 
    // window.setTimeout returns an Id that can be used to start and stop a timer
    timeoutId = setTimeout(doInactive, timeoutInMiliseconds)
}

function doInactive() {
    // does whatever you need it to actually do
	//mode = "HOME";
	location.reload(true);
}

function resetTimer() { 
    clearTimeout(timeoutId)
    startTimer();
}

function setupTimers() {
    document.addEventListener("mousemove", resetTimer, false);
    document.addEventListener("mousedown", resetTimer, false);
    document.addEventListener("keypress", resetTimer, false);
    document.addEventListener("touchmove", resetTimer, false);
     
    startTimer();
}

setupTimers();


function draw() {
cursor(CROSS);
	//THIS IS THE STATE SWITCH FOR CALLING THE RESPECTIVE DRAWING FUNCTIONS -
  //THE VARIABLE MODE DETERMINES THE STATE WHICH GETS MODIFIED VIA MOUSEPRESSED
	if (mode == "PATTERN"){
		patterns_generatePage();
	}
	else if (mode == "USES"){
		background(0);
		uses_generatePage();
	}
	else if(mode == "HOME"){
		background(0);
		home_generatePage();

		// Play the video on HOME
		let img = vid.get();
		image(img, -51.2, 37.7);
	}
	else if(mode == "COMPUTE"){
		background(0);
		compute_generatePage();
	}
	else if(mode == "DEMO"){
		background(0);
		demo_generatePage();
	}

}

//////////////////////////////////// CONTROLLER ////////////////////////////////////////////////////////////////


function keyTyped(){
	doAction(key);
	
	if(mode == "PATTERN"){
		pattern_keyTyped();
	}
	else if(mode == "USES"){
		use_keyTyped();
	}
	else if(mode == "COMPUTE"){
		compute_keyTyped();
	}
	else if(mode == "DEMO"){
		demo_keyTyped();
	}
}

function doAction(i) {
	if(i == "1"){
		mode = "HOME";
		vid.loop();
	}
	else if(i == "2"){
		mode = "PATTERN";
		vid.stop();
	}
	else if(i == "3"){
		mode = "USES";
		vid.stop();
	}
	else if(i == "4"){
		conflict = false;
		mode = "COMPUTE";
		vid.stop();
	}
	else if(i == "5"){
		help = !help;
	}
}

/*
function preload() {
	gif_loadImg = loadImage("sampleGIF.gif");
	gif_createImg = createImg("sampleGIF.gif");
  }

function drawGIF() {
	// loads only first frame
	image(gif_loadImg, 50, 50);
	
	// updates animation frames by using an html
	// img element, positioning it over top of
	// the canvas.
	gif_createImg.position(50, 350);
  }
*/


function mousePressed(){
	if (mode == "PATTERN"){
		patterns_mousedPressed();
	}
	else if (mode=="USES"){
		uses_MousedPressed();
	}

}

class ControlPad {
	constructor() {
	  this.buttonCache = {};
	  this.listeners = [];
	  this.eventListener = () => this._loop();
	  window.addEventListener('gamepadconnected', this.eventListener);
	}

	addListener(fn) {
		this.listeners.push(fn);
	}
  
	// clean up the event listener and
	remove() {
	  window.removeEventListener('gamepadconnected', this.eventListener);
	  if (this.controlPadTimeout) {
		clearTimeout(this.controlPadTimeout);
	  }
	}
  
	_loop() {
	  // make sure there is only one loop being called
	  if (this.controlPadTimeout) {
		clearTimeout(this.controlPadTimeout);
	  }
  
	  // need to retrieve every time for Chrome
	  const gamepads = navigator.getGamepads();
	  // assume there is only one gamepad hooked up
	  if (gamepads && gamepads.length > 0 && gamepads[0].buttons) {
		gamepads[0].buttons.forEach((button, i) => {
		  // if currently pressed and cache doesn't show that it was being pressed, fire event
		  if (button.pressed && !this.buttonCache[i]) {
			// fires once per press
			console.log(i);
			this.listeners.forEach(listener => listener(i));
		  }
		  this.buttonCache[i] = button.pressed;
		});
	  }
  
	  this.controlPadTimeout = setTimeout(() => this._loop(), 20);
	}
  }
