// CLASSES
//// tree class
function tree() {

  // for computeCoordsForDrawing
  this.L1;
  this.segDiv;
  this.th1;
  this.ThDivider;
  this.rarity;
  this.angleChange1;
  this.angleChange;
  this.angleRange;
  this.Ldivider;
  this.maxBranchPerc;
  // this.segLength;

  this.taper;
  // For makeTreeCoords
  // this.startCoords;
  this.nLevels;
  // this.branchThicknesses;
  // this.maxBranchLengths;
  // this.branchRarity;
  // this.maxBranchPerc;
  // this.angleChanges;
  // this.angleRanges;
  // this.segLengths;

  this.coordsArray;
  this.hCenter;
  this.sCenter;
  this.lCenter;

  this.segs;

}

function seg() {

  this.x1;
  this.x2;
  this.y1;
  this.y2;
  this.z1;
  this.z2;
  this.level;
  this.segNumber;
  this.t0;

  this.tFrac;

  this.hCenter;
  this.sCenter;
  this.lCenter;

}

//// leaf class
function leaf() {

  this.Lstem
  this.L0;
  this.thetad0;

  this.x0;
  this.y0;
  this.x1;
  this.y1;
  this.x2;
  this.y2;
  this.z1;
  this.z2;

  this.cp1x;
  this.cp1y;
  this.cp2x;
  this.cp2y;
  this.cp3x;
  this.cp3y;
  this.cp4x;
  this.cp4y;

  this.cp1xIn;
  this.cp1yIn;
  this.cp2xIn;
  this.cp2yIn;

  this.weightFrac;

  this.thetad0;

  this.L1div;
  this.thetad1;
  this.L2div;
  this.thetad2;

  this.hCenter;
  this.sCenter;
  this.lCenter;

  this.variation;
  this.rarity;
  this.scale;

}

//// clouds class
function clouds() {
  this.nFrac;
  this.alphaMax;
  this.hMin;
  this.hMax;
}

//// sky class
function sky() {
  this.hCenter;
  this.sCenter;
  this.lCenter;
}

//// moon class
function moon() {
  this.xFrac;
  this.yFrac;
  this.radFrac;
  this.glowIntensity;
}

//// stars class
function stars() {
  this.nFrac;
  this.radFrac;
  this.alpha;
}



/////////////////////////////////////////////////////////////// FUNCTIONS
// COMPUTE COORDINATES FUNCTION
function computeCoordsForDrawing( tree ) {

  for (q=0;q<nTrees;q++) {
    // randCount = 0; // reset the random counter
    // seed = treeSeeds[q];    // get the individual tree seed 
    xpos = (q+1)*(w/(nTrees+1));
  }
  
  treeList = []; // reset treeList

  for (q=0;q<nTrees;q++) {

    var thisTree = Object.create(tree1); // initialize new tree, inheret attributes from preset tree    // let thisTree = tree1; // initialize with the preset tree
    // thisTree = tree1;
    
    // randCount = 0; // reset the random counter
    // seed = treeSeeds[q]; // get the individual tree seed

    thisTree.segs = makeTreeCoords( thisTree, leaf1 );

    // console.log(thisTree);

    treeList.push(thisTree);
    
  }
  
  return treeList;

}





// DRAW FUNCTION 
function drawTrees( treeList, ctx ) { 
  


    for (let i=0;i<treeList.length;i++) {

      thisTree = treeList[i];

      // console.log("drawing tree:",i);

      drawTree( thisTree, ctx );  

    }
    
  

}




function computeAndDraw0() {
  // makeTreeSeeds();
  computeCoordsForDrawing( tree1 );
  // console.log(radStar);
  drawBG( ctx2 );
  drawTrees( treeList, ctx );
}


function updateBG() {

  updateValues();
  // updatePrototype();
  drawBG(ctx2);

}

function redraw() { // (redraw trees only)
  // computeCoordsForDrawing();

  console.log("redraw");

  updateValues(); // update the values
  // updatePrototype();
  // infobox.innerText = "drawing...";
  // drawBG( ctx2 );
  ctx.clearRect(0, 0, w, h); // clear tree layer
  drawTrees( treeList, ctx ); // and draw it again
  // infobox.innerText = "idle.";
  // drawLeafCanvas( leaf1, ctxL );
}

function bumpSeedUp() {
  seedValue = seedValue + 1;
  seed01.value = seedValue;
  reseed();
}
function bumpSeedDown() {
  seedValue = seedValue - 1;
  seed01.value = seedValue;
  reseed();
}
function reseed() { 

  console.log("reseed");

  myrng = new Math.seedrandom(seedValue);

  // console.log(myrng());

  updateValues(); // update the values
  // updatePrototype();
  // makeTreeSeeds();
  computeCoordsForDrawing( tree1 );
  ctx.clearRect(0,0, w, h); // clear tree layer
  drawTrees( treeList, ctx );

  // drawLeafCanvas( leaf1, ctxL );
}


function loadTree1() {

  c03.value = 1; // nTrees
  // c04.value = 3; // nLevels

  c09.value = 75; // rarity
  c10.value = 10; // angleChange
  c11.value = 20; // segDiv
  c12.value = 5; // angleRange
  c13.value = 0.65; // branchL1  
  tree14.value = 0.007; // branchTh1
  tree15.value = 0.4; // treeLDiv
  tree16.value = 0; // treeThDiv
  c40.value = 0.3; // taper


  tree1.angleChange1 = -90; // angleChange1
  maxBranchPerc = 100;  

  // // leaves
  // // c05.checked = 0; // leavesOn
  c38.value = 1.0; // leafL0
  // c35.value = 25; // leafHCenter
  // c36.value = 65; // leafSCenter
  // c37.value = 38; // leafLCenter
  // // leaf39.value = -90; // thetad0
  // leaf40.value = 0.01; // weight
  // leaf41.value = 2; // L1div
  // leaf42.value = 20; //thetad1
  // leaf43.value = 5; // L2div
  // leaf44.value = 20; //thetad2
  // leaf45.value = 5; // leafRarity
  // leaf46.value = 0.1; // variation
  // leaf47.value = 0.2; // Lstem

  updateValues();
  
  // updatePrototype();  

  reseed();

}

function loadTree2() {

  // seed01.value = 86;

  c03.value = 1; // nTrees
  // c04.value = 3; // nLevels

  c09.value = 75; // rarity
  c10.value = 30; // angleChange
  c11.value = 20; // segDiv
  c12.value = 5; // angleRange
  c13.value = 0.65; // branchL1  
  tree14.value = 0.02; // branchTh1
  tree15.value = 0.2; // treeLDiv
  tree16.value = 0.2; // treeThDiv
  c40.value = 0.35; // treeThDiv
  // treesOn.checked=1;
  // tree17.value = 0.5; // shadingAlpha
  // tree18.value = 0.5; // textureIntensity

  tree1.angleChange1 = -90; // angleChange1
  maxBranchPerc = 100;  

  // // leaves
  // // c05.checked = 0; // leavesOn
  c38.value = 0.15; // leafScale
  // c35.value = 80; // leafHCenter
  // c36.value = 65; // leafSCenter
  // c37.value = 38; // leafLCenter
  // // leaf39.value = -90; // thetad0
  // leaf40.value = 0.01; // weight
  // leaf41.value = 2; // L1div
  // leaf42.value = 20; //thetad1
  // leaf43.value = 5; // L2div
  // leaf44.value = 20; //thetad2
  // leaf45.value = 20; // leafRarity
  // leaf46.value = 0.4; // variation
  // leaf47.value = 0.2; // Lstem

  updateValues();
  
  // updatePrototype();  

  reseed();

}

function loadTree3() {

  // seed01.value = 46;

  c03.value = 1; // nTrees

  c09.value = 60; // rarity
  c10.value = 30; // angleChange
  c11.value = 20; // segDiv
  c12.value = 7; // angleRange
  c13.value = 0.65; // branchL1  
  tree14.value = 0.07; // branchTh1
  tree15.value = 0.1; // treeLDiv
  tree16.value = 0.3; // treeThDiv
  c40.value = 0.4; // taper

  tree1.angleChange1 = -90; // angleChange1
  maxBranchPerc = 100;  

  // leaves
  // // c05.checked = 1; // leavesOn
  c38.value = 0.05; // leafL0
  // c35.value = 100; // leafHCenter
  // c36.value = 50; // leafSCenter
  // c37.value = 30; // leafLCenter
  // // leaf39.value = -90; // thetad0
  // leaf40.value = 0.01; // weight
  // leaf41.value = 2; // L1div
  // leaf42.value = 60; //thetad1
  // leaf43.value = 2; // L2div
  // leaf44.value = 30; //thetad2
  // leaf45.value = 60; // leafRarity
  // leaf46.value = 0.4; // variation
  // leaf47.value = 0.2; // Lstem

  updateValues();
  
  // updatePrototype();  

  reseed();

}


function loadPreset1() {

  cX.value = 0.4;
  cY.value = 0.66;

  seed01.value = 14;

  shadingOn.checked=0;
  textureOn.checked=0;

  loadTree1();

  c06.value = 40; // branchHCenter
  c07.value = 50; // branchSCenter
  c08.value = 20; // branchLCenter

  // Moon
  moon01.value = 0.66;
  moon02.value = 0.7;
  moon03.value = 0.14;
  moon04.value = 0.25;

  // stars
  stars01.value = 0.5; // nStarsFrac
  stars02.value = 0.5; // radStarsFrac
  stars03.value = 0.5; // aStars

  // sky
  skyOn.checked = 1;
  sky01.value = 202; // hSky
  sky02.value = 76; // sSky
  sky03.value = 84; // lSky

  // Clouds
  sky04.value = 0.2; // nFrac
  cloudsOn.checked = 1;
  clouds02.value = 0.1;// alphaMax
  clouds03.value = -0.1; // hMin
  clouds04.value = 0.4; // hMax


  updateValues();
  
  // updatePrototype();  

  reseed();
  drawBG(ctx2);
  // reseed();

}

function loadPreset2() {

  cX.value = 0.5;
  cY.value = 0.6;

  seed01.value = 86;

  loadTree2();

  c06.value = 200; // branchHCenter
  c07.value = 30; // branchSCenter
  c08.value = 14; // branchLCenter

  shadingOn.checked=0;
  textureOn.checked=0;

  // Moon
  moon01.value = 0.35; // x
  moon02.value = 0.7; // y
  moon03.value = 0.14; // r
  moon04.value = 0.25; // glow

  // stars
  starsOn.checked = 1;
  stars01.value = 0.15; // nStarsFrac
  stars02.value = 0.21; // radStarsFrac
  stars03.value = 0.75; // aStars

  // sky
  skyOn.checked = 1;
  sky01.value = 210; // hSky
  sky02.value = 49; // sSky
  sky03.value = 22; // lSky

  // Clouds
  sky04.value = 0.2; // nFrac
  cloudsOn.checked = 1;
  clouds02.value = 0.04;// alphaMax
  clouds03.value = 0.15; // hMin
  clouds04.value = 0.64; // hMax


  updateValues();
  
  // updatePrototype();  

  reseed();
  drawBG(ctx2);
  // reseed();

}

function loadPreset3() {

  cX.value = 0.4;
  cY.value = 0.6;

  seed01.value = 46;

  // shadingOn.checked=1;
  // textureOn.checked=1;

  loadTree3();    

  c06.value = 40; // branchHCenter
  c07.value = 68; // branchSCenter
  c08.value = 15; // branchLCenter

  // Moon
  // moonOn.checked=1;
  moon01.value = 0.66;
  moon02.value = 0.7;
  moon03.value = 0.14;
  moon04.value = 0.25;

  // stars
  stars01.value = 0.5; // nStarsFrac
  stars02.value = 0.5; // radStarsFrac
  stars03.value = 0.5; // aStars

  // sky
  skyOn.checked = 1;
  sky01.value = 202; // hSky
  sky02.value = 76; // sSky
  sky03.value = 84; // lSky

  // Clouds
  sky04.value = 0.2; // nFrac
  cloudsOn.checked = 1;
  clouds02.value = 0.1;// alphaMax
  clouds03.value = -0.1; // hMin
  clouds04.value = 0.4; // hMax


  updateValues();
  
  // updatePrototype();  

  reseed();
  drawBG(ctx2);
  // reseed();

}





// UTILITY FUNCTIONS
function getRandomInt(min, max) {
  return Math.floor(myrng() * (max - min + 1) + min);
}
function getRandomFloat(min, max) {
  return (myrng() * (max - min) + min);
}
function chooseFromArray(array) {
  return array[Math.floor(myrng() * array.length)];
}
function randomSign() {
  return Math.round(myrng()) * 2 - 1;
}
function overunder(perc) {
  return myrng() * (2 * perc / 100) + (1 - perc / 100);
}
function under(perc) {
  return 1.0 - myrng()*(perc/100);
}
function makeChoiceArray(rarity) {
  a = Array(100-rarity).fill(0);
  if (rarity==0){
    c = a;
  } else {
    b = Array(rarity).fill(1);
    c = a.concat(b);
  }
  return c;
}
function makeRandel(rarity) {
  return myrng()<(rarity/100);
}
function deg2rad(thetad) {
  return thetad * Math.PI/180;
}
function rad2deg(thetar) {
  return thetar * 180/Math.PI;
}
function linSolve(x1,y1,x2,y2) {
  m = (y2-y1)/(x2-x1);
  b = y1-m*x1;
  return [b,m];
}



// RANDOM FUNCTIONS
// Make some arrays of random numbers
function createRandomNums(){
  let oneNumList = [];
  var count = 0;
  for (i=0;i<nSeeds;i++) {
      oneNumList = [];
      for (j=0;j<nNums;j++) {
          count += 1;        
          oneNumList.push(Math.random()); 
      }
      randomNums.push(oneNumList);
  }
  return randomNums;
}
// custom random function that is seedable (pulls numbers from randomNums)
function myRandom(seed) {
  randomNumber = randomNums[seed][randCount];
  if(randCount<nNums-1){
    randCount += 1;//add one
  } else {
    randCount = 0;//reset it
  }
  return randomNumber;
}
// function makeTreeSeeds() {
//   for(i=0;i<100;i++) {
//     treeSeed = Math.floor( Math.random()*nSeeds );
//     treeSeeds[i] = treeSeed;
//   }
//   return treeSeeds;
// }
