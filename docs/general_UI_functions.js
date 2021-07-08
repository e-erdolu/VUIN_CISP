
var titleWords = ["Home","Pattern","Uses","Compute"];


//button parameters for navigation
var beginButtonsX = 30;
var endButtons = 450;
var buttonY = 20;
var buttonStep = 120;
var buttonWidth = 80;
var buttonHeight = 20;
var buttonTextSize = 30;
var startOfGridX = 100;
var endOfGridX = 1100;
var startOfGridY = 250;
var endOfGridY = 1250;


function constructGridofPoints(gridStep){
	var listOfPoints =[];
	for (i=startOfGridX;i<=endOfGridX;i+=gridStep){
		var subList = [];
		for(j=startOfGridY;j<=endOfGridY;j+=gridStep){
			subList.push([i,j]);
		}
	listOfPoints.push(subList);
	}
	return listOfPoints;
}


function drawGridDots(gridStep){
	var listOfPoints = constructGridofPoints(gridStep);
	
	push();	
	for (i=0;i<listOfPoints.length;i++){
		for (j=0;j<listOfPoints.length;j++){
			var xVal = i;
			var yVal = j+50;
			fill(100);
			stroke(0);
			ellipse(listOfPoints[i][j][0],listOfPoints[i][j][1],5,5);
		}	
	}
	pop();

}

function drawNavigationButtons(){

	push();
	noStroke();
	
	for(var i=0; i<titleWords.length; i++){
		var curWord = titleWords[i];
		if(curWord.toUpperCase() == mode){
			fill(255);			
		}
		else{
			fill(150);
		}
		textSize(35);
		text(curWord, 1200, 275 + (i*100));
	}
	pop();
}
