

var populatedPattern = [];

var centerPoints = [];

var conflict = false;

var loading = false;

var photoNum = 0;

var success = false;

var sec = 0; 

///////////////////////////////////////////////////////////////////////////////
/////////////////////////// VIEWER /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
function compute_generatePage(){

	// If conflict
	if (conflict == true){
		//console.log("NO SUCCESS", success);
		background(0);
		drawNavigationButtons();

		push();
		fill(255);
		textSize(35);
		text("CISP could not create your housing unit pattern.\n\nPlease go back to 'USES' and change your constraints.\n\nAlternatively, go back to 'PATTERN' and simplify your curve.", 100, 500);
		pop();
		success = false; // Important (This line fixed a bug)

		if(help){		
		showHelp("Press 'PATTERN' or 'USES' to go back.\n\nPress 'RESET' to reset.");
		}

	}

	// If no conflict
	else{
		background(0);
		drawNavigationButtons();

		if(help){		
			showHelp("Press 'SOLVE' to generate your housing unit pattern.\n\nIf CISP is unable to create your housing unit pattern, go back and change the curve or housing unit you defined. Press 'PATTERN' or 'USES' to go back.\n\nIf CISP creates your housing unit pattern, you can still go back and define a new curve, housing unit, and generate a new pattern. Press 'PATTERN' or 'USES' to go back.\n\nPress 'RESET' to reset.");
		}
		if(loading){
			console.log("IF LOADING", success);
			push();
			fill(255);
			textSize(35);
			text("Computing...", 100, 500);
			pop();
			console.log("WRITTEN");
		}
		else{
			console.log("ELSE", success);
			for(var i=0;i<populatedPattern.length;i++){
				compute_drawUses(populatedPattern[i],allUses[i]);
			}

			for(var i=0;i<pattern_lines.length;i++){
				var pattern_points = generateExpandedCurve(pattern_lines[i]);

				var pattern_drawing_points = [];
				for(var j=0; j<pattern_points.length; j+=20){
					pattern_drawing_points.push(pattern_points[j]);
				}

				push();
				noFill();
				stroke(255);
				for(var j=0; j<pattern_drawing_points.length-7; j+=2){
					var p1 = pattern_drawing_points[j];
					var p2 = pattern_drawing_points[j+1];
					line(p1[0],p1[1],p2[0],p2[1]);
				}
				pop();
			}			 
			if(success){
				photoNum++;
				save(photoNum+"CISP.png");
				success = false;
			}
		}
	}
}

function compute_keyTyped(){
	let i;
	switch(key) {
		case "Ctrl+R":
			i = 11;
			break;
		case "c":
			i = 9;
			break;
	}
	compute_doAction(i);
}

function compute_doAction(i){
	console.log(i);
	if(i == 11) {
		//window.location.href = window.location.href
		location.reload(true);
	}

	if(conflict === true){
		var width = 100;
		var height = 20;
		//if(i == 11){
			//conflict = false;
			//mode = "USES";
		//} 
	}
	else if(useNumber > 0){
		if(i == 9){
			//console.log("DONE");
			loading = true;
			compute_generatePage();
			for(var i=0; i<10; i++){
				redraw();
			}
			setTimeout(execute_computation, 40); // Should comment out if run_Wrapper is used
			//setTimeout(run_Wrapper(execute_computation, 3000), 3000); // when run_Wrapper is used
			success = true; // Should comment out if run_Wrapper is used
		}
	}	
}

function compute_drawUses(curPopulation, curUse){
	for(var f=0;f<curPopulation.length;f++){
		var cUse = curPopulation[f];
		var newUse = new Line;
		for(var j=0;j<cUse.length;j++){
			newUse.points.push(cUse[j]);
		}
		for(var i=0; i<curUse.labels.length; i++){
			if(curUse.labels[i] == undefined){
				newUse.labels.push(" ");
			}
			newUse.labels.push(curUse.labels[i]);
		}
		newUse.findLabelPoints();
		newUse.makeSmallLabels();
		newUse.makeSmallPoints();
		newUse.makeLines();
	}
}


///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

function execute_computation(){
	try{
		compute_scaleUseCurves();
		populatedPattern = [];
		for(var j=0; j<pattern_lines.length; j++){
			var curPatternName = pattern_color[j];
			var curPattern = pattern_lines[j];
			console.log("Execute Comp PASS1");

			for(var i=0; i<allUses.length; i++){
				var curUseName = allUsesNames[i];
				var curUse = allUses[i];
				console.log("Execute Comp PASS2");

				if(curUse.points.length < 1){
					console.log("Execute Comp PASS3");
					break;
				}

				else if(curUseName[1] == curPatternName[1]){
					var curPopulatedPattern = arrayPattern(curUse,curPattern);
					console.log("Execute Comp PASS4");

					if(curPopulatedPattern == null){
						conflict = true;
					}
					else{
						populatedPattern.push(curPopulatedPattern);
						console.log("Execute Comp PASS5");
					}
				}
			}
		}
	}
	catch{
		conflict = true;
	}
	loading = false;
}



/*
// TIMER TRY 1 (Not working)

function* execute_computation(){
	try{
		compute_scaleUseCurves();
		
		populatedPattern = [];
		for(var j=0; j<pattern_lines.length; j++){
			console.log("PASS1")
			var curPatternName = pattern_color[j];
			var curPattern = pattern_lines[j];
			
			for(var i=0; i<allUses.length; i++){
				console.log("PASS2")
				var curUseName = allUsesNames[i];
				var curUse = allUses[i];

				if(curUse.points.length < 1){
					console.log("PASS3")
					break;
				}
				else if(curUseName[1] == curPatternName[1]){
					yield;
					var curPopulatedPattern = arrayPattern(curUse,curPattern);
					console.log("PASS4")
					
					if(curPopulatedPattern == null){
						yield;
						conflict = true;
						console.log("PASS5")
					}
					else{
						yield;
						success = true;
						populatedPattern.push(curPopulatedPattern);
						console.log("PASS6")
					}
				}
			}
		}
	
	}
	catch{
		conflict = true;
	}
	loading = false;
}

function run_Wrapper(gen, mili) {
	const iter = gen();
	const end = Date.now() + mili;
	console.log("INSIDE RUN")
	do {
	  const {value, done} = iter.next();
	  if(done) return value;
	  if(end < Date.now()){
		console.log("Halted function, took longer than " + mili + " miliseconds");
		conflict = true;
		loading = false;
		return null;
	  }
	} while(true);
  }
*/



///////////////////////////////////////////////////////////////////////////////
/////////////////////////// ALGORITHM ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
function startLoadingMessage(){
	push();
	noFill();
	stroke(255);
	strokeWeight(3);
	rect(600, 500, 160, 50);
	pop();

	push();
	noStroke();
	fill(255);
	textSize(30);
	text("Loading", 625, 535);
	pop();
}

function arrayPattern(use,pattern){
	var usePoints = use.scaledPoints;
	centerPoints = getRelationalPoints(use,pattern);
	console.log("Array pattern PASS 1 -- getRelationalPoints");

	// MOVE THE USE TO THE FIRST POINT ON THE CURVE
	var useCenterPoint = findCentroid(usePoints);
	console.log("Array pattern PASS 2 -- findCentroid");

	var firstCenterPoint = centerPoints[0];
	var lastMovedCurve = moveCurve(useCenterPoint,usePoints,firstCenterPoint);
	console.log("Array pattern PASS 3 -- moveCurve");

	// CREATE THE CONTAINER FOR THE FINAL GENERATED PATTERN
	var arrayedCurve = [];
	// ADD THE FIRST MOVED USE TO THE CONTAINER
	arrayedCurve.push(lastMovedCurve);

	var depth = [0];
	var ans = array(arrayedCurve, 1, use, centerPoints, usePoints, depth);
	console.log("Array pattern PASS 4 -- array (backtracking)");

	if (ans == true){
		return arrayedCurve;
	}
	return null;
}

//This is the backtracking function - takes the empty pattern curve and returns
//a populated one
function array(arrayedCurve,curCenterIndex,use,centerPoints,usePoints,depth){

	// Timer for the backtracking function (date + 10 seconds)
	const timeEndMark = Date.now() + 10000;

	if(curCenterIndex == centerPoints.length-1){
		return true;
	}

	depth[0]++;
	if(depth[0] > 3000){
		console.log("depth above 3000");
		return false;
	}
	var curCenterPoint = centerPoints[curCenterIndex];
	var workingCurve = getWorkingCurves(arrayedCurve, arrayedCurve[curCenterIndex-1], usePoints, curCenterPoint);
	console.log("array (backtracking) PASS 1 -- getWorkingCurves");

	///// Time check point (If more than 10 secs, halt the function)
	if(Date.now() > timeEndMark){
		console.log("Halting the backtracking");
		return;
	}
	/////
	
	if(workingCurve != undefined && workingCurve.length > 0){
		var appropriateCurves = getAppropCurves(use, workingCurve, arrayedCurve[curCenterIndex-1],curCenterPoint);
		console.log("array (backtracking) PASS 2 -- getAppropCurves");

		///// Time check point (If more than 10 secs, halt the function)
		if(Date.now() > timeEndMark){
			console.log("Halting the backtracking");
			return;
		}
		/////
		
		for(var j=0; j<appropriateCurves.length; j++){
			var curCurve = appropriateCurves[j];
			if(curCurve === undefined){
				//console.log("curCurve Undefined");
				conflict = true;
				arrayedCurve = [];
				populatedPattern = [];
				break;
			}
			else{

				///// Time check point (If more than 10 secs, halt the function)
				if(Date.now() > timeEndMark){
					console.log("Halting the backtracking");
					return;
				}
				/////

				arrayedCurve.push(curCurve);
				var ans = array(arrayedCurve, curCenterIndex+1, use, centerPoints, usePoints,depth);
				console.log("array (backtracking) PASS 3");

				///// Time check point (If more than 10 secs, halt the function)
				if(Date.now() > timeEndMark){
					console.log("Halting the backtracking");
					return;
				}
				/////
				
				if(ans == true){
					return true;
				}
				else{
					arrayedCurve.pop();
				}
			}
		}
		
		///// Time check point (If more than 10 secs, halt the function)
		if(Date.now() > timeEndMark){
			console.log("Halting the backtracking");
			return;
		}
		/////
		
	}
	return false;
}

//Returns all the possible positions for the uses that connect with the previously
//placed use and don't intersect
function getWorkingCurves(arrayedCurve, prevUse, usePoints, patternCenterPoint){
	var curCenterPoint = patternCenterPoint;
	var workingCurve = [];
	// FOR EACH ROTATED ITERATION
	for(var l=0 ; l<=Math.PI*2; l+=Math.PI/2){
		var rotatedCurve = rotateCurve(usePoints,l);
		// FOR EACH POINT ON THE PREVIOUS USE TO MOVE TO
		for(var j=0; j<prevUse.length; j++){
			var nextPointToMoveTo = prevUse[j];
			// FOR EACH POINT ON THE CURRENT USE TO MOVE FROM
			for(var k=0; k<rotatedCurve.length; k++){
				var pointOnUseToMove = rotatedCurve[k];
				// MOVE THE USE
				var newMovedCurve = moveCurve(pointOnUseToMove,rotatedCurve,nextPointToMoveTo);
				// CHECK IF THE USE MOVED IS IN THE EXACT SAME POSITION AS THE PREVIOUS USE ON THE PATTERN CURVE
				// THIS IS OBVIOUSLY NOT AN ACCEPTABLE SOLUTION - MOVE ON
				if (almostEquals(newMovedCurve[0][1],prevUse[j][0][1]) && almostEquals(newMovedCurve[0][0],prevUse[j][0][0])){
					continue;
				}
				// IF IT'S NOT THE SAME POSITION THEN CHECK IF THIS POSITION --
				// INTERSECTS WITH ANY PREVIOUS USE AT ALL -- IF IT DOES NOT
				// APPEND IT TO THE "WORKING CURVE" CONTAINER
				else{
					var intCheck = false;
					for(var t=0; t<arrayedCurve.length; t++){
						var curCurveToCheck = arrayedCurve[t];
						var tempIntCheck = checkUseIntersection(newMovedCurve,curCurveToCheck);
						if(tempIntCheck){
							intCheck = true;
						}
					}
					if(intCheck == false){
						workingCurve.push(newMovedCurve);
					}
				}
			}
		}
	}
	return workingCurve;
}

//Checks the uses for curves that meet the parameters
function getAppropCurves(use, workingCurves, prevCurve, curCenterPoint){
	var appropCurves = [];

	for(var i=1; i<workingCurves.length; i++){
		var curCurve = workingCurves[i];
		if(prevCurve === undefined){
			conflict = true ;
			break;
		}
		//FIRST MAKE ALL CHECKS
		var check = true;
		// CHECK ADJACENCIES
		for(var q=0; q<curCurve.length-1; q++){
			var side1 = [curCurve[q],curCurve[q+1]];
			var side1Attribute = use.labels[q];
			for(var w=0; w<prevCurve.length-1; w++){
				var side2 = [prevCurve[w], prevCurve[w+1]];
				var side2Attribute = use.labels[w];
				if(side1Attribute === "v" || side2Attribute === "v" || side1Attribute === "a" || side2Attribute === "a"){
					var adjTest = checkIfAdjacent(side1,side2);
					if(adjTest == true){
						check = false;
					}
				}
			}
		}

		if(check == true){
			var curCentroid = findCentroid(curCurve);
			var curDist = distance(curCentroid, curCenterPoint);
			if(curDist < 100){
				appropCurves.push(curCurve);
			}			
		}
	}
	return appropCurves;
}


///////////////////////////////////////////////////////////////////////////////
///////////////////////// CHECKING FUNCTIONS  /////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

function checkifVisible(useColors,usePoints,viewPoint,viewColor){
	var point = viewPoint.points[0];
	for(var i = 0; i < useColors.length ; i++ ){
		var curColor = useColors[i];
		if(curColor === viewColor){
			var curPoint = usePoints[i]
			var newLine = [usePoints[i],point]
			for(var j=0; j < usePoints.length-1 ; j++){
				var curLine = [usePoints[j],usePoints[j+1]];
				if(curLine[0] === curPoint || curLine[1] === curPoint){
					continue;
				}
				else{
					var intCheck = getLineIntersection(newLine,curLine);
					if(intCheck === true){
						return false;
					}
				}
			}
		}
	}
	return true;
}

function getLineIntersection(line1,line2){
	if(line1[0][0] === line2[0][0] && line1[0][1] === line2[0][1] || line1[1][0] === line2[0][0] && line1[1][1] === line2[0][1] ||
	   line1[0][0] === line2[1][0] && line1[0][1] === line2[1][1] || line1[1][0] === line2[1][0] && line1[1][1] === line2[1][1]){
		return false;
	}

		var p0_x = line1[0][0];
		var p0_y = line1[0][1];
		var p1_x = line1[1][0];
		var p1_y = line1[1][1];
    var p2_x = line2[0][0];
    var p2_y = line2[0][1];
    var p3_x = line2[1][0];
    var p3_y = line2[1][1];
    var s1_x = p1_x - p0_x;
    var s1_y = p1_y - p0_y;
    var s2_x = p3_x - p2_x;
    var s2_y = p3_y - p2_y;
    var s, t;
    s = (-s1_y * (p0_x - p2_x) + s1_x * (p0_y - p2_y)) / (-s2_x * s1_y + s1_x * s2_y);
    t = ( s2_x * (p0_y - p2_y) - s2_y * (p0_x - p2_x)) / (-s2_x * s1_y + s1_x * s2_y);

    if (s >= 0 && s <= 1 && t >= 0 && t <= 1)
    {return true;}
    return false;
}


function checkUseIntersection(curve1,curve2){
	for(var i = 0; i < curve1.length-1; i++){
	var curve1Line = [curve1[i],curve1[i+1]];
		for(var j=0; j < curve2.length-1; j++){
			var curve2Line = [curve2[j],curve2[j+1]];
			if(getLineIntersection(curve1Line,curve2Line) === true){
				return true;
			}
		}
	}
	return false;
}


function checkIfAdjacent(curve1,curve2){
	var p0 = curve1[0];
	var p1 = curve1[1];
	var p2 = curve2[0];
	var p3 = curve2[1];

	if((almostEquals(p0[0],p1[0]) && almostEquals(p2[0],p3[0])) || (almostEquals(p0[1],p1[1]) && almostEquals(p2[1],p3[1]))) {
			if(almostEquals(p0[0],p1[0])){ //if both lines are vertical
				if(almostEquals(p0[0],p2[0])){ // if both are in the same line

					if(p2[1]>p3[1]){
						var curve2Top = p3;
						var curve2Bottom = p2;
					}

					else if (p2[1]<p3[1]){
						var curve2Top = p2;
						var curve2Bottom = p3;
					}

					if(p0[1]>p1[1]){
						var curve1Top = p1;
						var curve1Bottom = p0;
					}

					else if (p0[1]<p1[1]){
						var curve1Top = p0;
						var curve1Bottom = p1;
					}

					if(curve1Top[1]>=curve2Top[1] && curve1Top[1]<curve2Bottom[1]){
						return true;
					}

					else if(curve1Bottom[1]>=curve2Top[1] && curve1Bottom[1]<curve2Bottom[1]){
						return true;
					}
				}
			}

			else if(almostEquals(p0[1],p1[1])){ //if both lines are horizontal
				if(almostEquals(p0[1],p2[1])){ // if both are in the same line

					if(p2[0]>p3[0]){
						var curve2Top = p3;
						var curve2Bottom = p2;
					}

					else if (p2[0]<p3[0]){
						var curve2Top = p2;
						var curve2Bottom = p3;
					}

					if(p0[0]>p1[0]){
						var curve1Top = p1;
						var curve1Bottom = p0;
					}

					else if (p0[0]<p1[0]) {
						var curve1Top = p0;
						var curve1Bottom = p1;
					}

					if(curve1Top[0]>=curve2Top[0] && curve1Top[0]<curve2Bottom[0]){
						return true;
					}

					else if(curve1Bottom[0]>=curve2Top[0] && curve1Bottom[0]<curve2Bottom[0]){
						return true;
					}
				}
			}
	}

	return false;
}

///////////////////////////////////////////////////////////////////////////////
///////////////////// OPERATIVE FUNCTIONS /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

function moveCurve(oldPoint,curve,newPoint){
	var movedCurve =[];
	var xDifference = newPoint[0]-oldPoint[0];
	var yDifference = newPoint[1]-oldPoint[1];
	for(var i=0;i<curve.length;i++){
		var currentPoint = curve[i];
		var movedX = currentPoint[0]+xDifference;
		var movedY = currentPoint[1]+yDifference;
		var movedPoint = [movedX,movedY];
		movedCurve.push(movedPoint);
	}
	return movedCurve;
}


function compute_scaleUseCurves(){
	for(var i=0; i<allUses.length; i++){
		var curUse = allUses[i];
		var curPoints = curUse.points;
		if(curPoints.length>curUse.scaledPoints.length){
			for(j=0;j<curPoints.length;j++){
				var curPoint = curPoints[j];
				var scaledPoint = [Math.floor(curPoint[0]/4),Math.floor(curPoint[1]/4)];
				curUse.scaledPoints.push(scaledPoint);
			}
		}
	}
}

function getLineVector(line){
	var x = line[1][0]-line[0][0];
	var y = line[1][1]-line[0][1];
	var vector = [x,y];
	var vectorMagnitude = Math.sqrt((x*x)+(y*y));
	var unitVector = [x/vectorMagnitude,y/vectorMagnitude];
	return [vector,vectorMagnitude,unitVector];
}

function generateExpandedCurve(curve){
	var allCrvPoints =[];
	for(var i=0; i<curve.points.length-1;i++){
		var curLine = [curve.points[i],curve.points[i+1]];
		var vectorInformation = getLineVector(curLine);
		var vector = vectorInformation[0];
		var vectorMagnitude = Math.floor(vectorInformation[1]);
		var unitVector = vectorInformation[2];
		var prevPoint = curLine[0];
		for(j=0;j<vectorMagnitude;j++){
			var nextPoint = [prevPoint[0]+unitVector[0],prevPoint[1]+unitVector[1]]
			allCrvPoints.push(nextPoint);
			prevPoint = nextPoint;
		}
	}
	return allCrvPoints;
}

function getDimension(use){
	use.findBoundingBox();
	return use.boundingBox[1];
}

function getRelationalPoints(use,pattern){
	var dimension = getDimension(use);
	var expandedPoints = generateExpandedCurve(pattern);
	var totalMagnitude = 0;
	for(i=0;i<pattern.points.length-1;i++){
		var curLine = [pattern.points[i],pattern.points[i+1]];
		var vecInfo = getLineVector(curLine);
		totalMagnitude+=vecInfo[1];
	}
	var relationalPoints =[];
	for(j=0;j<totalMagnitude;j+=dimension){
		relationalPoints.push(expandedPoints[j]);
	}
	return relationalPoints;
}

function findCentroid(curve){
	var totalX = 0;
	var totalY = 0;
	var curveLength = curve.length;
	for(i=0;i<curve.length;i++){
		var curPoint = curve[i];
		totalX = totalX+curPoint[0];
		totalY = totalY+curPoint[1];
	}
	var avgX = totalX/curveLength;
	var avgY = totalY/curveLength;
	var centroid = [avgX,avgY]
	return centroid;
}

function rotateCurve(curve,desAngle){
	var curveCentroid = findCentroid(curve);
	var rotatedCurve = [];
	for(i=0;i<curve.length;i++){
		var curPoint = curve[i];
		var opposite = curPoint[1];
		var adjacent = curPoint[0];
		var radius = Math.sqrt((opposite*opposite)+(adjacent*adjacent));
		var angle = Math.atan(opposite/adjacent);
		var rotationAngle = desAngle+angle;
		var x1 = (radius*Math.cos(rotationAngle));
		var y1 = (radius*Math.sin(rotationAngle));
		var rotatedPoint = [x1,y1];
		rotatedCurve.push(rotatedPoint);
	}
	return rotatedCurve;
}

function mirrorCurve(curve,line){
	var reflectedCurve =[];
	if(line==0){
		for(i=0;i<curve.length;i++){
			var curPoint = curve[i];
			var newX = 0-curPoint[0];
			var newPoint = [newX,curPoint[1]];
			reflectedCurve.push(newPoint);
		}
	}
	else if(line==1){
		for(i=0;i<curve.length;i++){
			var curPoint = curve[i];
			var newPoint = [curPoint[0],0-curPoint[1]];
			reflectedCurve.push(newPoint);
		}
	}
	return reflectedCurve;
}

function almostEquals(x,y){
	return (Math.abs(x-y)<5);
}

function distance(point1,point2) {
	var x = point1[0]-point2[0];
	var y = point1[1]-point2[1];
	return Math.sqrt(x*x+y*y);
}
