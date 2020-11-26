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

function plusOrMinus(amount) {
  return (Math.round(myrng()) * 2 - 1) * amount;
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

// linear solver given two points
function linSolve ( [x1,y1], [x2,y2] ) {
  var m = (y2-y1)/(x2-x1);
  var b = y1-m*x1;
    let coeffs = [b,m];
    return coeffs;
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

function normal2range(nValue,min,max) {
  return nValue * (max-min) + min;
}

function range2normal(rValue,min,max) {
  return (rValue - min) / (max-min);
}