// var demoMode = "COMPUTE";
// var s;


// function waiting(){
//     console.log("waiting");
// }

// function pattern_mode(){
//     patterns_generatePage();
//     var linePoints = [[250, 450],[250, 675],[375, 850],[625, 925],[900, 800],[950, 550],[825, 450]];
//     for(var i=0; i<linePoints.length; i++){
//         pattern_lines[0].points.push(linePoints[i]);
//     }
//     pattern_lines[0].close = false;
//     patterns_generatePage();
// }

// function uses_mode(){
//     uses_generatePage();
//     var usePoints = [[350,400],[350,800],[800,800],[800,400]];
//     for(var i=0; i<usePoints.length; i++){
//         var finalPoint = usePoints[i];
//         allUses[0].points.push(finalPoint);
//         allUses[0].labelPoints.push([finalPoint[0],finalPoint[1]]);
//         if(i===0){
//             allUses[0].labels.push("v");
//         }
//         allUses[0].labels.push(" ");
//     }
//     uses_generatePage();  
// }


// function demo_generatePage(){

//     //first open the home page 

//     home_generatePage();

//     delay(2000);
//     //second open the patterns page 
//         //draw a pattern
//     pattern_mode();

//     delay(2000);

//     uses_mode();

//     delay(2000);

//     // //fourth open the compute page
//     //     //compute a solution

//     // compute_generatePage();
//     // demoMode = "COMPUTE";
//     // console.log("Please click on the compute button");
//     // compute_generatePage();


//     // noLoop();
//     // pattern_lines = [];
//     // pattern_mode = "draw";
//     // pattern_color = [];
//     // reachedPattern = false;
//     // allUses = [];
//     // reached = false;
// }



// function demo_keyTyped(){
//     if(demoMode == "COMPUTE"){
//         compute_keyTyped();
//     }
// }

// function delay(milliseconds) {
//   var start = new Date().getTime();
//   for (var i = 0; i < 1e7; i++) {
//     console.log("delay");
//         if ((new Date().getTime() - start) > milliseconds){
//           break;
//         }
//   }
// }