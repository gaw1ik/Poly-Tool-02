/////////////////////////////////////////////////////////////// CLASSES
//// polyglot class
function polyglot() {

  this.nSides;
  this.size;

  this.xCenter;
  this.yCenter;
  this.thetad0;

  this.weight;

  this.nPolys;
  this.thetaRot;
  this.sizeIncFactor;

  this.hueCenter;
  this.satCenter;
  this.litCenter;
  this.alpha;
  this.colorVariation
  this.fillOn;

  this.warble;

  this.polys;

  this.pointSize;

}

function poly() {
  this.coords;
}

//// sky class
function sky() {
  this.hCenter;
  this.sCenter;
  this.lCenter;
}


/////////////////////////////////////////////////////////////// FUNCTIONS

function updateBG() {

  updateValues();
  // updatePrototype();
  drawBG(ctx2);

}


function recalc() { 

  console.log("re-calc");

  

  updateValues(); // update the values

  var thisPolyglot = Object.create(polyglot1);
  // console.log("thisPolyglot",thisPolyglot);
  polyglot1 = calcPolyglot(thisPolyglot);
  redraw();

}


function redraw() { // (redraw trees only)
  // computeCoordsForDrawing();

  console.log("re-draw");

  updateValues(); // update the values

  ctx.clearRect(0, 0, w, h); // clear tree layer

  myrng = new Math.seedrandom("1");

  drawPolyglot( polyglot1, ctx ); // and draw it again

}




function loadPreset0() {

  polyglot1.seed = 1;

  c01.value = 5; // nSides
  c02.value = 0.14; // size
  c03.value = 0.5; // xCenter
  c04.value = 0.5; // yCenter
  c05.value = 0.1; // startAngle
  c06.value = 0.1; // weight
  c07.value = 0.07; // nPolys
  c08.value = 0.5; // thetaRot
  c09.value = 0.5; // sizeIncFactor
  c10.value = 0.1; // hueCenter
  c11.value = 0.5; // satCenter
  c12.value = 0.5; // litCenter
  c13.value = 0.0; // warble
  c14.checked = 1; // lineMode
  c15.checked = 1; // pointMode
  c16.value = 0.01; // pointSize
  c17.value = 0.3; // colorVariation
  c18.checked = 0; // fillOn
  c19.value = 0.1; //alpha


  sky01.value = 0.7;
  sky02.value = 0.3;
  sky03.value = 0.2;

  updateValues();

  recalc();

  // redraw();

  // drawBG(ctx2);

}

function loadPreset3() {
  polyglot1.seed = 1;
  c01.value = 10 ; c02.value = 0.46 ; c03.value = 0.5 ; c04.value = 0 ; c05.value = 0.1 ; c06.value = 0 ; c07.value = 0.06 ; c08.value = 0 ; c09.value = 0.29 ; c10.value = 0.49 ; c11.value = 0.35 ; c12.value = 0.43 ; c13.value = 0 ; c14.checked = false ; c15.checked = true ; c16.value = 0.471 ; c17.value = 0.38 ; c18.checked = false ; c19.value = 0.1 ; sky01.value = 0.27 ; sky02.value = 0.3 ; sky03.value = 0.92 ;
  updateValues();
  recalc();
  drawBG(ctx2);
}

function loadPreset2() {
  polyglot1.seed = 1;
  c01.value = 8 ; c02.value = 0.28 ; c03.value = 0.5 ; c04.value = 0.51 ; c05.value = 0.1 ; c06.value = 0.01 ; c07.value = 0.08 ; c08.value = 0.2 ; c09.value = 0.12 ; c10.value = 0 ; c11.value = 0.43 ; c12.value = 0.43 ; c13.value = 0 ; c14.checked = false ; c15.checked = true ; c16.value = 0.361 ; c17.value = 0.36 ; c18.checked = false ; c19.value = 0.03 ; sky01.value = 0.82 ; sky02.value = 0.63 ; sky03.value = 0.84 ;  
  updateValues();
  recalc();
  drawBG(ctx2);
}

function loadPreset1() {
  polyglot1.seed = 1;
  c01.value = 9 ; c02.value = 0.28 ; c03.value = 0.5 ; c04.value = 0.51 ; c05.value = 0.1 ; c06.value = 0 ; c07.value = 0.11 ; c08.value = 0.21 ; c09.value = 0.06 ; c10.value = 0.1 ; c11.value = 0.91 ; c12.value = 0.36 ; c13.value = 0 ; c14.checked = true ; c15.checked = false ; c16.value = 0.361 ; c17.value = 0.7 ; c18.checked = false ; c19.value = 0.01 ; sky01.value = 1 ; sky02.value = 0.63 ; sky03.value = 0.06 ;  updateValues();
  recalc();
  drawBG(ctx2);
}