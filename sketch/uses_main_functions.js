
var allUses = []; //container to store all current uses
var allUsesNames = []; // container to store each use definition
var uses_mode = "list"; // begins with mode "list" - which means that the system is intiially ready to create a new use and display the list of all uses
var currentUse = 0; // initialize "current use" variable which is the container to modify the use which is currently being operated upon by the user
var currentUsePointIndex; // record of index of a point on a use that has been clicked to be defined
var useNumber = 0; // record of total number of uses in memory
var reached = false;

///////////////////////////////////////////////////////////////////////////////
/////////////////////////// VIEWER /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

function uses_generatePage(){
//In listing mode - this mode shows all the uses currently defined by the user, theres essentially a for loop creating
//the representation of such.
	push();
	stroke(255);
	drawNavigationButtons();
	drawGridDots(50);
	drawNavigationButtons();
	pop();

	if(help){		
		showHelp("Use the pen. Touch on the grid points to draw a housing unit shape.\n\nOnce the shape is closed, press the pen inside the boxes to put constraints.\n\nPress once to put view (v) and twice to put access (a). Press once more to cancel.\n\nPress 'DELETE' to delete the shape.\n\nPress 'COMPUTE' once your housing unit is finished.\n\nPress 'RESET' to reset.");
	}
	
	if(reached == false){
		allUses.push(new Line);
		useNumber++;
		allUsesNames.push("U" + str(useNumber));
		reached = true;
	}

	push();
	noStroke();
	for(i=0;i<allUses.length;i++){
		if(i == currentUse){
			fill(255);
		}
		else{
			fill(150);
		}
		/*
		var useName = allUsesNames[i][1];
		textSize(30);
		text(useName,100,275+(i*50));
		*/
	}
	pop();

	if(allUses.length > 0){
		if (allUses[currentUse].points.length>0){
			allUses[currentUse].findLabelPoints();
			push();
			stroke(255);
			fill(255);
			allUses[currentUse].makePoints();
			allUses[currentUse].makeLabels();
			allUses[currentUse].makeLines();
			pop();
		}
	}

}

///////////////////////////////////////////////////////////////////////////////
/////////////////////////// CONTROLLER ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////


function use_keyTyped(){
	//  // here the user is allowed to insert multiple symbols into the box
	let i;
	switch(key) {
		/*
		case "n":
			i = 6;
			break;
		case "s":
			i = 7;
			break;
		case "w":
			i = 8;
			break;
		*/
		case "d":
			i = 9;
			break;
		case "=":
			i = 10;
			break;
		case "Ctrl+R":
			i = 11;
			break;
	}
	use_doAction(i);
}

function use_doAction(i){
	if(i == 6){
		if(useNumber<4){
			allUses.push(new Line);
			useNumber++;
			allUsesNames.push("U" + str(useNumber));
			currentUse = useNumber - 1;
		}
	}
	if(useNumber > 0){
		if(i == 7){
			if(currentUse < useNumber-1){
				currentUse++;
			}
		}
		else if(i == 8){
			if(currentUse > 0){
				currentUse--;
			}
		}
		else if(i == 9){
			uses_mode = "draw";
		}
		else if(i == 10){
			allUses[currentUse] = new Line;
		}
	}

	if(i == 11){
		console.log(allUses);
		//window.location.href = window.location.href
		location.reload(true);
	}	
}

function uses_MousedPressed(){


	//if (mouseX>100 && mouseY>250 & mouseX<1100 && mouseY<1125){
	if (mouseX>97 && mouseY>247 && mouseX<1103 && mouseY<1253 ) {
	// until the use is closed, the user is not allowed to label any of the sides
		if (allUses[currentUse].isClosed() == false){
			uses_drawOrtho();
		}

	//once the use is closed, the user can click on the square in the middle of the line, and if he clicks on it,
	//the system checks which one and stores it to the "currentUsePointIndex" variable - this is then used in keypressed
		else{
			for(var i=0;i<allUses[currentUse].labelPoints.length;i++){
				var use_cPoint = allUses[currentUse].labelPoints[i];
				if(mouseX>use_cPoint[0]-30 && mouseY>use_cPoint[1]-30 && mouseX<use_cPoint[0]+30 && mouseY<use_cPoint[1]+30){
					currentUsePointIndex = i;
					if(allUses[currentUse].labels[i] == " "){
						allUses[currentUse].labels[i] = "v";
					}
					else if(allUses[currentUse].labels[i] == "v"){
						allUses[currentUse].labels[i] = "a";
					}
					else if(allUses[currentUse].labels[i] == "a"){
						allUses[currentUse].labels[i] = " ";
					}
					else{
						allUses[currentUse].labels[i] = " ";
					}
				}
			}
		}
	}
	
}
