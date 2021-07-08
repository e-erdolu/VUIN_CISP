
function backgrounGrid(){
	var Vx1 = startOfGrid;
	var Vy1 = startOfGrid+50;
	var Vx2 = startOfGrid;
	var Vy2 = endOfGrid+50;

	var Hx1 = startOfGrid;
	var Hy1 = endOfGrid+50;
	var Hx2 = endOfGrid;
	var Hy2 = endOfGrid+50;

	function primaryLines(){
		line(Vx1,Vy1,Vx2,Vy2);	
		line(Hx1,Hy1,Hx2,Hy2);
		stroke(255);
	}

	function secondaryLines(){
		for (i=Vy1;i<Vy2;i+=50){		
			line(Vx1-10,i,Vx1+10,i);
		}
		for (i=Hx1+50;i<Hx2+50;i+=50){
			line(i,Hy1-10,i,Hy1+10);
		}
	}

	function tertiaryLines(){
		for (i=Vy1;i<Vy2;i+=10){		
			line(Vx1-2,i,Vx1+2,i);
		}
		for (i=Hx1+10;i<Hx2+10;i+=10){
			line(i,Hy1-2,i,Hy1+2);
		}
	}

	primaryLines();
	secondaryLines();
	tertiaryLines();
}

