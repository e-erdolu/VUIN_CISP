function checkIfClickedOnText(){
	var x = mouseX;
	var y = mouseY;
	
	index = null;
	
	for (i=0;i<currentUse.labelPoints.length;i++){
		if (almostEqual(x,currentUse.labelPoints[i][0],40) && almostEqual(y,currentUse.labelPoints[i][1],40) ){
			index = i;
		}
	}
	return index;
}

function almostEqual(x,y){
	return (abs(x-y)<0.00000001);
}
