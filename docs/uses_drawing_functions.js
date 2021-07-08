//THIS IS THE FILE FOR ALL THE FUNCTIONS THAT HELP THE "USES_MAIN_FUNCTIONS" FOLDER
//THIS FILE CONSISTS OF A "DRAW NEW BUTTON" FUNCTION - WHICH DRAWS THE A BUTTON IN THE "LIST" MODE FOR CREATING A NEW USE
// AND DEFINES A DRAW ORTHO BUTTON - WHICH IS A BUNCH OF SIMPLE TRIGNOMETRY, TAKING THE USER'S CLICK INPUT AND CONVERTING
//IT TO AN ELEMENT IN THE GRID THAT IS ALWAYS ORTHOGONAL TO A PREVIOUS LINE



function uses_drawNewButton(){
	push();
	stroke(255);
	fill(0);
	rect(350,420,100,20);
	pop();

	push();
	stroke(255);
	fill(255);
	text("NEW",350+30,435);
	pop();
}



function uses_drawOrtho(){
	var x2 = int(mouseX); //current click x
	var y2 = int(mouseY); //current click y
	var curPt = [x2,y2]; //user clicked point
	var grid = constructGridofPoints(50); // get the grid 2d list

// if a point has already been defined, begin the trig to figure out the orthogonality of the drawing
	if (allUses[currentUse].points.length>0){

		var closestDist = 500000; //large starting value for closest distance to initialize
		var closestPoint = grid[0];

		var previousPt = allUses[currentUse].points[allUses[currentUse].points.length-1];
		var previousIndex = [0,0];

		//find the location of the last drawn point in the grid
		for(i=0;i<grid.length;i++){
			for(j=0;j<grid.length;j++){
				var gridPt = grid[i][j];
				var distance = dist(previousPt[0],previousPt[1],gridPt[0],gridPt[1]);
				if (distance<closestDist){
					closestDist = distance;
					closestPoint = [gridPt[0], gridPt[1]];
					previousIndex = [i,j];
				}
			}
		}

		//find the location of the closest orthogonally located point in the grid
		var pointX = null;
		var closestDist = 500000;
		var closestPoint = grid[0];

		for(i=0;i<grid.length;i++){

			var gridPt = grid[i][previousIndex[1]];
			var distance = dist(curPt[0],curPt[1],gridPt[0],gridPt[1]);

			if (distance<closestDist){
				closestDist = distance;
				pointX = [gridPt[0], gridPt[1]];
			}
		}

		var pointY = null;
		var closestDist = 500000;
		var closestPoint = grid[0];

		for(i=0;i<grid.length;i++){

			var gridPt = grid[previousIndex[0]][i];
			var distance = dist(curPt[0],curPt[1],gridPt[0],gridPt[1]);

			if (distance<closestDist){
				closestDist = distance;
				pointY = [gridPt[0], gridPt[1]];
			}
		}

		var finalPoint = null;
		var distToPtX = dist(pointX[0],pointX[1],curPt[0],curPt[1]);
		var distToPtY = dist(pointY[0],pointY[1],curPt[0],curPt[1]);

		if (distToPtX<distToPtY) {finalPoint = pointX;}
		else{finalPoint = pointY;}

	}

	else{ //if this is the first drawn point, you dont need any orthogonal constraints, just register the closest point on the grid
		var closestDist = 500000;
		var finalPoint = grid[0];

		//find the location of the closest Point in the grid
		for(i=0;i<grid.length;i++){
			for(j=0;j<grid.length;j++){
				var gridPt = grid[i][j];
				var distance = dist(curPt[0],curPt[1],gridPt[0],gridPt[1]);

				if (distance<closestDist){
					closestDist = distance;
					finalPoint = [gridPt[0], gridPt[1]];
				}
			}
		}

	}

	var eq = false;

	try{
		for(var i=0; i<allUses[currentUse].points.length; i++){
			var curpt = allUses[currentUse].points[i];

			if(i==0 && allUses[currentUse].points.length > 1){
				continue;
			}

			if(almostEqualsPar(finalPoint[0], curpt[0],10) && almostEqualsPar(finalPoint[1], curpt[1],10)){
				eq = true;
			}
		}
	}
	catch{
		eq = false;
	}
	

	if(eq != true){
		allUses[currentUse].points.push(finalPoint);
		allUses[currentUse].labelPoints.push([finalPoint[0],finalPoint[1]]);
		allUses[currentUse].labels.push(" ");
	}
}

function almostEqualsPar(x,y,par){
	return (Math.abs(x-y)<par);
}

