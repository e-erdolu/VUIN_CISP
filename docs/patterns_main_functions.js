var pattern_lines = [];
var pattern_mode = "draw";
var pattern_color = [];
var pattern_displayPoints = [];
var lineToChangeIndex;
var reachedPattern = false;
var currentPattern = 0;
var patternNumber = 0;

function patterns_generatePage(){
	
	background(0);
	drawGridDots(25);
	drawNavigationButtons();

	if(help){		
		showHelp("Use the pen. Touch on the grid points to draw a curve which will create your housing unit pattern.\n\nPress 'DELETE' to delete the curve.\n\nPress 'USES' once your curve is finished.\n\nPress 'RESET' to reset.");
	}

	if(reachedPattern == false){
		pattern_lines.push(new Line);
		pattern_color.push("P1");
		reachedPattern = true;
		patternNumber++;
	}

	push();
	noStroke();
	for(i=0;i<pattern_color.length;i++){
		if(i == currentPattern){
			fill(255);
		}
		else{
			fill(150);
		}
		/*
		var patternName = pattern_color[i][1];
		textSize(30);
		text(patternName,100,275+(i*50));
		*/
	}
	pop();

	for (z=0;z<pattern_lines.length;z++){
		pattern_lines[z].makePoints();
		if (pattern_lines[z].points.length>0){
			pattern_lines[z].makeLines();
			if(z == currentPattern){
				push();
				fill(255);
				textSize(30);
				text(pattern_color[z],pattern_lines[z].points[0][0],pattern_lines[z].points[0][1]+15);
				pop();
			}
		}
	}
}


function pattern_keyTyped(){
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
	pattern_doAction(i);
}

function pattern_doAction(i){

	if (lineToChangeIndex != "null"){
		pattern_color[lineToChangeIndex] = pattern_color[lineToChangeIndex]+key;
	}
	/*
	if(i == 6){
		if(patternNumber<4){
			pattern_lines.push(new Line);
			patternNumber++;
			pattern_color.push("P" + str(patternNumber));
			currentPattern = patternNumber -1;
		}
	}
	*/
	if(patternNumber > 0){
		if(i == 7){
			if(currentPattern < patternNumber-1){
				currentPattern++;
			}
		}
		else if(i == 8){
			if(currentPattern > 0){
				currentPattern--;
			}
		}
		else if(i == 9){
			uses_mode = "draw";
		}
		if(i == 10){
			pattern_lines[currentPattern] = new Line;
		}
	}
	if(i == 11){
		console.log(pattern_lines);
		//window.location.href = window.location.href
		location.reload(true);
	}
}

function patterns_mousedPressed(){

	/*
	if (mouseX>100 && mouseY>250 && mouseX<1100 && mouseY<1250 ){
		patterns_drawOrtho();
	}
	*/

	if (mouseX>97 && mouseY>247 && mouseX<1103 && mouseY<1253 ){
		patterns_drawOrtho();
	}


}
