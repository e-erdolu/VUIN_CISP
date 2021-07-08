function home_generatePage(){
	background(0);
	/*
	push();
	stroke(255);
	drawNavigationButtons();
	pop();
	*/

	/*
	var CISPTitle = "CISP"
	var CISPTitle_2 = "Computer Implemented Site Planning"
	//var CISPText = "Welcome to the reconstruction of CISP, a pioneering software for generative urban design developed by Christos Yessios in 1972 at Carnegie Mellon University.";
	//var CISPPoints = "Instructions: \n\n- Define a path for a building row. Press 'Pattern' on the keypad, and use the stylus to draw a path.\n\n- Define a building. Press 'Uses' on the keypad, and use the stylus to draw a building.\n\n- You can make your building to have views (v) or access (a). Press the stylus inside the boxes attached to your building's walls.\n\n- Generate your building row. Press 'Compute' and then press 'Solve' on the keypad. CISP will create your building row that satisfies the pattern and uses you defined.\n\n- If CISP is unable to create your building row, go back and change the pattern or uses you defined. Press 'Pattern' or 'Uses' on the keypad."

	push();
	noStroke();
	fill(255);
	textSize(40);
	text(CISPTitle,100,245,1000,100);
	//text(CISPTitle,100,250,1000,100);
	pop();

	push();
	noStroke();
	fill(255);
	textSize(30);
	text(CISPTitle_2,225,250,1000,100);
	pop();
	*/

	/*
	push();
	noStroke();
	fill(200);
	textSize(35);
	text(CISPText,100,400,1000,500);
	pop();

	push();
	noStroke();
	fill(200);
	textSize(30);
	text(CISPPoints,100,600,1000,1300);
	pop();
	*/

	/*
	if(help){		
		showHelp("To start, press 'PATTERN' and follow the steps on this corner.");
	}
	*/

}

function showHelp(helpString){
	var helpTopX = 1200;
	var helpTopY = 650;
	var helpWidth = 250;
	var helpHeight = 800;


	push();
	noStroke();
	fill(255);
	textSize(40);
	text("Help", helpTopX, helpTopY+35);
	pop();

	push()
	noStroke();
	noStroke();
	fill(255);
	textSize(20);
	text(helpString, helpTopX, helpTopY+80, helpWidth-10, helpHeight);
	pop();
}

function home_MousedPressed(){

}