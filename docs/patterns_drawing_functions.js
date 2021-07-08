function patterns_drawOrtho(){
	var x2 = int(mouseX); //current click x
	var y2 = int(mouseY); //current click y
	var curPt = [x2,y2];
	var grid = constructGridofPoints(25);

	var closestDist = 500000;
	var closestPoint = grid[0];
	//find the location of the last drawn point in the grid
	for(i=0;i<grid.length;i++){
		for(j=0;j<grid.length;j++){
			var gridPtX = grid[i][j][0];
			var gridPtY = grid[i][j][1];
			var distance = dist(curPt[0],curPt[1],gridPtX,gridPtY);

			if (distance<closestDist){
				closestDist = distance;
				closestPoint = [gridPtX, gridPtY];
			}
		}
	}
	pattern_lines[currentPattern].points.push(closestPoint);
}



function pattern_showDef(){
	var prevLine;
	for(w=0;w<pattern_lines.length;w++){
		patternLine = pattern_lines[w];

		if (patternLine != prevLine){
			prevLine = patternLine;
			if (patternLine.points.length>0){
				dispPoint = patternLine.points[0];
				pattern_displayPoints.push(dispPoint);
				push();
				text(pattern_color,dispPoint[0],dispPoint[1]);
				pop();
			}
		}
	}
}
