class Line {

	constructor(){
		this.points = []; //points in the line
		this.close = false; //check if line is closed
		this.labelPoints = []; //center points for labels
		this.labels = []; //labels themselves
		this.scaledPoints =[];
		this.centroid = [];
		this.boundingBox;
	}

	isClosed (){ //check to see if line is closed (essentially see if first and last points match)
		var firstPoints = this.points[0];
		var lastPoints = this.points[this.points.length-1];

		if (this.points.length>2 && almostEqual(firstPoints[0],lastPoints[0],10) && almostEqual(firstPoints[1],lastPoints[1],10)){
			this.close = true;
			return this.close;
		}
		else{
			return false;
		}
	}

	makePoints(){	//draw the line
		//draw points
		push();
		noStroke();
		fill(255);
		for (i=0;i<this.points.length;i++){
			ellipse(this.points[i][0],this.points[i][1],10,10);
		}
		pop();
	}

	makeLines(){
		for (i=0;i<this.points.length-1;i++){
			var x1 = this.points[i][0];
			var y1 = this.points[i][1];
			var x2 = this.points[i+1][0];
			var y2 = this.points[i+1][1];
			//draw the line
			push();
			stroke(255);
			line(x1,y1,x2,y2);
			pop();
		}
	}

	makeScaledLines(){
		for (i=0;i<this.points.length-1;i++){
			var x1 = this.scaledPoints[i][0];
			var y1 = this.scaledPoints[i][1];
			var x2 = this.scaledPoints[i+1][0];
			var y2 = this.scaledPoints[i+1][1];
			//draw the line
			push();
			line(x1,y1,x2,y2);
			stroke(255);
			pop();
		}
	}

	//draw the lines and labels by interpolating through the points
	findLabelPoints(){
		this.labelPoints = [];
		var finalPoints = [];
		for(var i=0;i<this.points.length-1;i++){
			var curLine = [this.points[i],this.points[i+1]];
			var avgX = (curLine[0][0]+curLine[1][0])/2
			var avgY = (curLine[0][1]+curLine[1][1])/2
			var point = [avgX,avgY];
			finalPoints.push(point);
		}
		this.labelPoints = finalPoints;
	}

	makeLabels(){
		for(i=0;i<this.labelPoints.length;i++){
			push();
			stroke(150);
			fill(0);
			rect(this.labelPoints[i][0],this.labelPoints[i][1],-40,40);
			pop();

			push();
			noStroke();
			fill(150);
			textSize(40);
			text(this.labels[i],this.labelPoints[i][0]-30,this.labelPoints[i][1]+30);
			pop();
		}

		if(help && this.labelPoints.length>0 && this.isClosed()){
			push();
			stroke(255);
			strokeWeight(3);
			noFill();
			line(this.labelPoints[0][0]-20, this.labelPoints[0][1]-10,this.labelPoints[0][0]-100, this.labelPoints[0][1]-80);
			line(this.labelPoints[0][0]-20, this.labelPoints[0][1]-10,this.labelPoints[0][0]-20, this.labelPoints[0][1]-40);
			line(this.labelPoints[0][0]-20, this.labelPoints[0][1]-10,this.labelPoints[0][0]-50, this.labelPoints[0][1]-10);
			pop();

			push();
			noStroke();
			fill(255);
			textSize(30);
			text("Click any box to define attribute", this.labelPoints[0][0]-200, this.labelPoints[0][1]-90);
			pop();
		}
	}

	makeSmallLabels(){

		for(i=0;i<this.labelPoints.length;i++){
			if(this.labels[i] == undefined) continue;
			push();
			fill(255);
			textSize(20);
			text(this.labels[i],this.labelPoints[i][0]-15,this.labelPoints[i][1]+15);
			pop();

		}
	}

	makeSmallPoints(){
		push();
		noStroke();
		fill(255);
		for (i=0;i<this.points.length;i++){
			ellipse(this.points[i][0],this.points[i][1],6,6);
		}
		pop();
	}

	findCentroid(){
		var totalX = 0;
		var totalY = 0;
		for(i=0;i<this.scaledPoints.length;i++){
			var curPoint = this.scaledPoints[i];
			totalX+=curPoint[0];
			totalY+=curPoint[1];
		}
		var avgX = totalX/this.points.length;
		var avgY = totalY/this.points.length;

		this.centroid = [avgX,avgY];
	}

	findBoundingBox(){
		var allPoints = this.scaledPoints;
		var topX = 1000;
		var topY = 1000;
		var bottomX = 0;
		var bottomY = 0;

		for(var i=0;i<allPoints.length;i++){
			var curPoint = allPoints[i];
			if(curPoint[0]<topX){
				topX = curPoint[0]
			}
			else if(curPoint[0]>bottomX){
				bottomX = curPoint[0]
			}
			else if(curPoint[1]<topY){
				topY = curPoint[1];
			}
			else if(curPoint[1]>bottomY){
				bottomY = curPoint[1];
			}
		}

		var topPoint = [topX,topY];
		var width = bottomX-topX;
		var height = bottomY-topY;
		this.boundingBox = [topPoint,width,height];

	}

}
