

// // /////////////////////////////// DEFINE LINE CLASS //////////////////////////////////////////////////////////////

// // class Line {

// // 	constructor(){
// // 		this.points = []; //points in the line
// // 		this.close = false; //check if line is closed
// // 		this.labelPoints = []; //center points for labels
// // 		this.labels = []; //labels themselves
// // 		this.scaledPoints =[];
// // 		this.centroid = [];
// // 		this.boundingBox;
// // 	}

// // 	isClosed (){ //check to see if line is closed (essentially see if first and last points match)
// // 		var firstPoints = this.points[0];
// // 		var lastPoints = this.points[this.points.length-1];

// // 		if (this.points.length>2 && almostEqual(firstPoints[0],lastPoints[0],10) && almostEqual(firstPoints[1],lastPoints[1],10)){
// // 			this.close = true;
// // 			return this.close;
// // 		}
// // 		else{
// // 			return false;
// // 		}
// // 	}

// // 	makePoints(){	//draw the line
// // 		//draw points
// // 		for (i=0;i<this.points.length;i++){
// // 			ellipse(this.points[i][0],this.points[i][1],2,2);
// // 		}
// // 	}


// // 	makeLines(){
// // 		for (i=0;i<this.points.length-1;i++){
// // 			var x1 = this.points[i][0];
// // 			var y1 = this.points[i][1];
// // 			var x2 = this.points[i+1][0];
// // 			var y2 = this.points[i+1][1];
// // 			//draw the line
// // 			push();
// // 			line(x1,y1,x2,y2);
// // 			stroke(255);
// // 			pop();
// // 		}
// // 	}

// // 	makeScaledLines(){
// // 		for (i=0;i<this.points.length-1;i++){
// // 			var x1 = this.scaledPoints[i][0];
// // 			var y1 = this.scaledPoints[i][1];
// // 			var x2 = this.scaledPoints[i+1][0];
// // 			var y2 = this.scaledPoints[i+1][1];
// // 			//draw the line
// // 			push();
// // 			line(x1,y1,x2,y2);
// // 			stroke(255);
// // 			pop();
// // 		}
// // 	}

// // 	//draw the lines and labels by interpolating through the points


// // 	makeLabels(){
// // 		for(i=0;i<this.labelPoints.length;i++){
// // 			push();
// // 			stroke(255);
// // 			fill(0);
// // 			rect(this.labelPoints[i][0],this.labelPoints[i][1],-15,15);
// // 			pop();

// // 			push();
// // 			fill(150);
// // 			stroke(150);
// // 			fill(255);
// // 			textSize(10);
// // 			text(this.labels[i],this.labelPoints[i][0]-10,this.labelPoints[i][1]+10);
// // 			pop();

// // 		}
// // 	}

// // 	findCentroid(){
// // 		var totalX = 0;
// // 		var totalY = 0;
// // 		for(i=0;i<this.scaledPoints.length;i++){
// // 			var curPoint = this.scaledPoints[i];
// // 			totalX+=curPoint[0];
// // 			totalY+=curPoint[1];
// // 		}
// // 		var avgX = totalX/this.points.length;
// // 		var avgY = totalY/this.points.length;

// // 		this.centroid = [avgX,avgY];
// // 	}

// // 	findBoundingBox(){
// // 		var allPoints = this.scaledPoints;
// // 		var topX = 1000;
// // 		var topY = 1000;
// // 		var bottomX = 0;
// // 		var bottomY = 0;

// // 		for(var i=0;i<allPoints.length;i++){
// // 			var curPoint = allPoints[i];
// // 			if(curPoint[0]<topX){
// // 				topX = curPoint[0]
// // 			}
// // 			else if(curPoint[0]>bottomX){
// // 				bottomX = curPoint[0]
// // 			}
// // 			else if(curPoint[1]<topY){
// // 				topY = curPoint[1];
// // 			}
// // 			else if(curPoint[1]>bottomY){
// // 				bottomY = curPoint[1];
// // 			}
// // 		}

// // 		var topPoint = [topX,topY];
// // 		var width = bottomX-topX;
// // 		var height = bottomY-topY;
// // 		this.boundingBox = [topPoint,width,height];


// // 		// push();
// // 		// fill(0);
// // 		// stroke(255);
// // 		// rect(topX,topY,width,height);
// // 		// pop();
// // 	}

// // }


// // //////////////////////////////////////////////////////////////////////////////////////////////////////
// // /////////////////////////////////////////////////////////////////////////////////////////////////////


// // var useClassLine = new Line;
// // useClassLine.points = [[195, 155] ,[295, 155] ,[295, 235] ,[335, 235] ,[335, 275] ,[195, 275] ,[195, 155]]
// // useClassLine.close = true;



// // var allUses = [useClassLine];

// // var patternCurve = new Line;
// // patternCurve.points = [[150, 325],[190, 255],[210, 200],[205, 155]]

// // var pattern_lines = [patternCurve];



// function moveCurveCentroid(curve,newPoint){
// 	var movedCurve =[];
// 	var useCentroid = findCentroid(curve);
// 	var xDifference = newPoint[0]-useCentroid[0];
// 	var yDifference = newPoint[1]-useCentroid[1];

// 	for(i=0;i<curve.length;i++){
// 		var currentPoint = curve[i];
// 		var movedX = currentPoint[0]+xDifference;
// 		var movedY = currentPoint[1]+yDifference;
// 		var movedPoint = [movedX,movedY];
// 		// console.log(movedPoint);
// 		movedCurve.push(movedPoint);
// 	}
// 	return movedCurve;
// }

// function compute_checkIntersections(curve1,curve2){

// 	for(var i = 0; i < curve1.length-1; i++){
// 		var curve1Line = [curve1[i],curve1[i+1]];

// 		for(var j=0; j < curve2.length-1; j++){
// 			var curve2Line = [curve2[j],curve2[j+1]];


// 			var verticalAndHorizontal = sortVerticalAndHorizontalLines(curve1Line,curve2Line);

// 			if (verticalAndHorizontal === true){
// 				continue;
// 			}

// 			var verticalLine = verticalAndHorizontal[0];
// 			var horizontalLine = verticalAndHorizontal[1];

// 			if(horizontalLine[0][0]<verticalLine[0][0] && verticalLine[0][0]<horizontalLine[1][0]){
// 				if(verticalLine[0][1]<verticalLine[1][1]){
// 					if(verticalLine[0][1]<horizontalLine[0][1] && verticalLine[1][1]>horizontalLine[1][1]){
// 						return true;
// 					}
// 				}
// 				else{
// 					if(verticalLine[1][1]<horizontalLine[0][1] && verticalLine[0][1]>horizontalLine[1][1]){
// 						return true;
// 					}
// 				}
// 			}
// 		}
// 	}
// 	return false;
// }


// function compute_drawLines(points){
// 	for(i=0;i<points.length-1;i++){
// 		push();
// 		stroke(255);
// 		fill(255);
// 		line(points[i][0],points[i][1],points[i+1][0],points[i+1][1]);
// 		pop();
// 	}
// }


// function sortVerticalAndHorizontalLines(line1,line2){
// 	var verticalLine;
// 	var horizontalLine;

// 	if(almostEquals(line1[0][0],line2[0][0])){
// 		verticalLine = line1;
// 		horizontalLine = line2;
// 		return true;
// 	}

// 	if(almostEquals(line1[0][0],line1[1][0])){
// 		verticalLine = line1;
// 		horizontalLine = line2;
// 	}
// 	else{
// 		horizontalLine = line1;
// 		verticalLine = line2;
// 	}

// 	return [verticalLine,horizontalLine];
// }


// function populatePattern(use,pattern){
// 	var allMovedUses =[];

// 	var usePoints = use.scaledPoints;

// 	//using use class next line is fine, that is how the function is set up
// 	var patternPoints = getRelationalPoints(use,pattern);
// 	var useCentroid = findCentroid(usePoints);
// 	var pointOnUseToMove = usePoints[0];

// 	var firstPatternPoint = patternPoints[0];
// 	var lastMovedCurve = moveCurve(useCentroid,usePoints,firstPatternPoint);


// 	for(i=1;i<patternPoints.length;i++){

// 		var nextCentroid = patternPoints[i];
// 		var nextMovedCurve = moveCurve(pointOnUseToMove,usePoints,lastMovedCurve[0]);
// 		// var acceptableResults =[];

// 		// for(j=0;j<lastMovedCurve.length;j++){
// 		// 	var nextPointToMoveTo = lastMovedCurve[j];
// 		// 	var movedUse = moveCurve(pointOnUseToMove,usePoints,nextPointToMoveTo);
// 		// 	var intersectionCheck = compute_checkIntersections(movedUse,lastMovedCurve);
// 		// 	if(intersectionCheck == false){
// 		// 		acceptableResults.push(movedUse);
// 		// 	}
// 		// }

// 		// var distFromCentroid = 1000000;
// 		// var finalResult =[];

// 		// for(z=0;z<acceptableResults.length;z++){

// 		// 	var curResult = acceptableResults[z];
// 		// 	var curCentroid = findCentroid(curResult);
// 		// 	var curDist = dist(nextCentroid[0],nextCentroid[1],curCentroid[0],curCentroid[1]);

// 		// 	if(curDist<distFromCentroid){
// 		// 		distFromCentroid = curDist;
// 		// 		finalResult = curResult;
// 		// 	}
// 		// }

// 		allMovedUses.push(nextMovedCurve);
// 		lastMovedCurve = nextMovedCurve;
// 	}

// 	return allMovedUses;
// }


// function findLowestPoints(curve){
// 	var lowestYPoint = curve.scaledPoints[0];
// 	for(i=0;i<curve.points.length;i++){
// 		var curPoint = curve.points[i];
// 		if(curPoint[1]>lowestYPoint[1]){
// 			lowestYPoint = curPoint[1];
// 		}
// 	}


// 	var lowestPoints = [];
// 	lowestPoints.push(lowestYPoint);
// 	for(j=0;j<curve.points.length;j++){
// 		var curPoint = curve.points[j];
// 		if(curPoint[1]==lowestYPoint[1]){
// 			if(curPoint[0]!=lowestYPoint[0])
// 				lowestPoints.push(curPoint);
// 		}
// 	}

// 	return lowestPoints;
// }
