window.onload = function() {

  console.log("Window Loaded.");

  ////////////////////////////////////////////////////////////// DOCUMENT INPUTS
  scale = 2;
  aspectRatio = 8/10;

  // Scaling Stuff
  /// get DPI
  dpi = window.devicePixelRatio;
  /// get CSS width and height

  canvas = document.getElementById('layer1');//trees
  canvas2 = document.getElementById('layer2');//BG
  drawingContainer = document.getElementById('drawing-container');
  drawing = document.getElementsByClassName('drawing');
  inputContainer = document.getElementById('input-form-container');
  overlayGrad = document.getElementById('input-form-container');


  // CTX Variables
  ctx = canvas.getContext('2d'); // tree layer
  ctx2 = canvas2.getContext('2d'); // BG layer


  //// Leaf Canvas
  leafCanvas = document.getElementById('leafCanvas');
  style_height = +getComputedStyle(leafCanvas).getPropertyValue("height").slice(0, -2);
  style_width = +getComputedStyle(leafCanvas).getPropertyValue("width").slice(0, -2);
  leafCanvas.setAttribute('height', style_height * dpi * scale);
  leafCanvas.setAttribute('width', style_width * dpi * scale);
  ctxL = leafCanvas.getContext('2d'); // BG layer
  hLeafCanvas = leafCanvas.height;
  wLeafCanvas = leafCanvas.width;

  // property arrays
  maxBranchLengths = [];
  segLength = [];
  branchThicknesses = [];
  branchRarity = [];
  angleRanges = [];
  angleChanges = [];

  treeCoords = [];
  treeList = [];

  startCoord = []; // start coordinates (aligned to background)

  style_width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
  w = style_width;
  h = w*aspectRatio;


  /////////////////////////////////////////////////////////////////// INITIALIZE
  // Execute functions initially
  // treesOn.checked=0;
  skyOn.checked=1;
  moonOn.checked=1;
  // sunOn.checked=1;
  cloudsOn.checked=1;
  starsOn.checked=0;

  seedValue=0;

  // New Prototypes
  tree1 = new tree(); // new prototype tree
  leaf1 = new leaf(); // new prototype leaf
  clouds1 = new clouds(); // and so on...
  seg1 = new seg();
  sky1 = new sky();
  moon1 = new moon();
  stars1 = new stars();

  loadPreset1();
  // computeAndDraw0();

  handleResize();

  

}

document.addEventListener('DOMContentLoaded', function() {
  // var dt = new Date();
  // var utcDate = dt.toUTCString();  

  var today = new Date();

  var minute = today.getMinutes();
  var hour = today.getHours();
  if(minute<10){
    minute = "0" + minute;
  }

  var time; 

  if(hour==0){
    time = 12    + ":" + minute + " AM";
  } else if (hour<12) {    
    time = hour + ":" + minute + " AM";
  } else if (hour==12) {
    time = 12    + ":" + minute + " PM";
  } else {
    time = hour-12    + ":" + minute + " PM";
  }

  thanksMessage = document.getElementById("thanks");
  thanksMessage.textContent += time;

  console.log(time);

});


function saveImg() {

  combine();

  var link = document.getElementById('link');
  link.setAttribute('download', 'test.png');
  link.setAttribute('href', canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
  link.click(); 

}

// Save Img Event Handler
document.addEventListener('DOMContentLoaded', function() {

  SaveImgButton = document.getElementById("save-img-button");

  SaveImgButton.addEventListener('click', saveImg);

});



// #region //// Assign controls
document.addEventListener('DOMContentLoaded', function() {

    // var infobox = document.getElementById("infobox");  
    
    // seed;
    var seed01 = document.getElementById("seed01");
    seed01.addEventListener('change',reseed);

    // startX;
    var cX = document.getElementById("cX");
    cX.addEventListener('input',reseed);

    // startY;
    var cY = document.getElementById("cY");
    cY.addEventListener('input',reseed);

    //// treesOn
    // var treesOn = document.getElementById("treesOn"); 
    // treesOn.addEventListener('change',redraw);

    //// SkyOn
    var skyOn = document.getElementById("skyOn"); 
    skyOn.addEventListener('change',updateBG);

    //// starsOn
    var starsOn = document.getElementById("starsOn"); 
    starsOn.addEventListener('change',updateBG);

    //// moonOn
    var moonOn = document.getElementById("moonOn"); 
    moonOn.addEventListener('change',updateBG);

    var leavesOn = document.getElementById("c05"); 
    leavesOn.addEventListener('change',redraw);



    // Tree Controls

    //// treeScale
    // treeScale;
    // var c02 = document.getElementById("c02");     
    // c02.addEventListener('change',reseed); // treeScale

    //// nTrees
    // nTrees;
    var c03 = document.getElementById("c03");
    c03.addEventListener('change',reseed);

    //// nLevels
    // nLevels;
    var c04 = document.getElementById("c04");
    c04.addEventListener('change',reseed);

    //// branchHCenter
    // branchHCenter;
    var c06 = document.getElementById("c06"); 
    c06.addEventListener('input',redraw);
    
    //// branchSCenter
    // branchSCenter;
    var c07 = document.getElementById("c07");
    c07.addEventListener('input',redraw);

    //// branchLCenter
    // branchLCenter;
    var c08 = document.getElementById("c08");
    c08.addEventListener('input',redraw);

    //// rarity
    // rarity;
    var c09 = document.getElementById("c09");
    c09.addEventListener('input',reseed);

    //// angleChange
    // angleChange;
    var c10 = document.getElementById("c10");
    c10.addEventListener('input',reseed);

    //// segDiv
    // segDiv;
    var c11 = document.getElementById("c11");
    c11.addEventListener('input',reseed);

    //// angleRange
    // angleRange;
    var c12 = document.getElementById("c12");
    c12.addEventListener('input',reseed); // angleRange

    //// branchL1
    // branchL1;
    var c13 = document.getElementById("c13");
    c13.addEventListener('input',reseed);

    //// branchTh1
    // branchTh1;
    var tree14 = document.getElementById("tree14");
    tree14.addEventListener('input',redraw);

    //// treeLDiv
    // treeLDiv;
    var tree15 = document.getElementById("tree15");
    tree15.addEventListener('input',reseed);

    //// treeThDiv
    // treeThDiv;
    var tree16 = document.getElementById("tree16");
    tree16.addEventListener('input',reseed);

    //// shadingOn
    var shadingOn = document.getElementById("shadingOn"); 
    shadingOn.addEventListener('change',redraw);

    //// textureOn
    var textureOn = document.getElementById("textureOn"); 
    textureOn.addEventListener('change',redraw);

    //// shadingAlpha
    var tree17 = document.getElementById("tree17"); 
    tree17.addEventListener('change',redraw);

    //// textureIntensity
    var tree18 = document.getElementById("tree18"); 
    tree18.addEventListener('change',redraw);

    //// Taper
    var c40 = document.getElementById("c40"); 
    c40.addEventListener('input',reseed);







    // Leaf Controls

    //// leafHCenter
    // leafHCenter;
    var c35 = document.getElementById("c35"); 
    c35.addEventListener('input',redraw);

    //// leafSCenter
    // leafSCenter;
    var c36 = document.getElementById("c36"); 
    c36.addEventListener('input',redraw);

    //// leafLCenter
    // leafLCenter;
    var c37 = document.getElementById("c37"); 
    c37.addEventListener('input',redraw);

    //// leafL0
    // leafL0;
    var c38 = document.getElementById("c38");
    c38.addEventListener('input',redraw);

    //// leavesOn
    var c05 = document.getElementById("c05"); 
    c05.addEventListener('change',reseed);

    //// leafWeightFrac
    var leaf40 = document.getElementById("leaf40");
    leaf40.addEventListener('input',redraw);
    
    //// L1div
    var leaf41 = document.getElementById("leaf41");
    leaf41.addEventListener('input',redraw);
    
    //// thetad1
    var leaf42 = document.getElementById("leaf42");
    leaf42.addEventListener('input',redraw);
    
    //// L2div
    var leaf43 = document.getElementById("leaf43");
    leaf43.addEventListener('input',redraw);
    
    //// thetad2
    var leaf44 = document.getElementById("leaf44");
    leaf44.addEventListener('input',redraw);

    //// rarity
    var leaf45 = document.getElementById("leaf45");
    leaf45.addEventListener('input',reseed);

    //// variation
    var leaf46 = document.getElementById("leaf46");
    leaf46.addEventListener('input',redraw);

    //// Lstem
    var leaf47 = document.getElementById("leaf47");
    leaf47.addEventListener('input',redraw);





    // Moon Controls
    //// xMoonFrac
    var moon01 = document.getElementById("moon01");
    moon01.addEventListener('input', updateBG );
    //// yMoonFrac
    var moon02 = document.getElementById("moon02");
    moon02.addEventListener('input', updateBG );
    //// radMoonFrac
    var moon03 = document.getElementById("moon03");
    moon03.addEventListener('input', updateBG );
    //// glowIntensity
    var moon04 = document.getElementById("moon04");
    moon04.addEventListener('input', updateBG );

    // Star Controls
    //// nStars
    stars01 = document.getElementById("star01");
    stars01.addEventListener('input',updateBG);
    //// radStar
    stars02 = document.getElementById("star02");
    stars02.addEventListener('input',updateBG);
    //// lStar
    stars03 = document.getElementById("star03");
    stars03.addEventListener('input',updateBG);

    // Sky Controls
    //// hSky
    // hSky;
    var sky01 = document.getElementById("sky01");
    sky01.addEventListener('input',updateBG);
    //// sSky
    // sSky;
    var sky02 = document.getElementById("sky02");
    sky02.addEventListener('input',updateBG);
    //// lSky
    // lSky;
    var sky03 = document.getElementById("sky03");
    sky03.addEventListener('input',updateBG);

    // Cloud Controls
    //// cloudsOn
    var cloudsOn = document.getElementById("cloudsOn"); 
    cloudsOn.addEventListener('change',updateBG);
    //// cloudiness
    var sky04 = document.getElementById("sky04");
    sky04.addEventListener('input',updateBG);
    //// alpha
    var clouds02 = document.getElementById("clouds02");
    clouds02.addEventListener('input',updateBG);
    //// hMin
    var clouds03 = document.getElementById("clouds03");
    clouds03.addEventListener('input',updateBG);
    //// hMax
    var clouds04 = document.getElementById("clouds04");
    clouds04.addEventListener('input',updateBG);

    sliderHue = document.getElementsByClassName("slider-hue");

    for (i=0;i<sliderHue.length;i++) {
      sliderHue[i].addEventListener('input',updateColorSliders );    
    }

});


var sliderSat = document.getElementsByClassName("slider-sat");

function updateColorSliders() {

  for (i=0;i<sliderSat.length;i++) {

    sliderSatHue = sliderHue[i].value;
    var color1 = 'hsl(' + sliderSatHue + ', ' +  0 + '%, ' + 50 + '%)';
    var color2 = 'hsl(' + sliderSatHue + ', ' +  100 + '%, ' + 50 + '%)';
 
    sliderSat[i].style.background = 'linear-gradient(to right,' + color1 + ',' + color2 + ')';
  }

}


function updateValues() {

    seedValue = parseInt(seed01.value,10);// the seed value

    // Tree params
    nTrees = parseInt(c03.value,10); // nTrees
    tree1.nLevels = parseInt(c04.value,10); //nLevels  
    // treeScale = parseFloat(c02.value,10); // nTrees
    tree1.hCenter = parseInt(c06.value,10); // branchHCenter
    tree1.sCenter = parseInt(c07.value,10); // branchSCenter
    tree1.lCenter = parseInt(c08.value,10); // branchLCenter
    tree1.rarity = parseInt(c09.value,10); // rarity
    tree1.angleChange = parseInt(c10.value,10); // angleChange
    tree1.segDiv = parseInt(c11.value,10); // segDiv
    tree1.angleRange = parseInt(c12.value,10); // angleRange
    tree1.L1 = parseFloat(c13.value,10); // branchL1
    tree1.th1 = parseFloat(tree14.value,10);
    tree1.Ldivider = parseFloat(tree15.value,10) * ((8)-(1)) + (1);
    tree1.ThDivider = (1-parseFloat(tree16.value,10)) * ((1)-(0.05)) + (0.05);
    shadingAlpha = parseFloat(tree17.value,10);
    textureIntensity = parseFloat(tree18.value,10);
    startCoord[0] = parseFloat(cX.value,10) * ((w+w/2)-(-w/2)) + (-w/2);
    startCoord[1] = (1-parseFloat(cY.value,10)) * ((h+2*h)-(0   )) + (0   );
    tree1.taper = (1-parseFloat(c40.value,10)) * ((1)-(0.8)) + (0.8);
    
    // Leaves
    leaf1.hCenter = parseInt(c35.value,10); // leafHCenter
    leaf1.sCenter = parseInt(c36.value,10); // leafSCenter
    leaf1.lCenter = parseInt(c37.value,10); // leafLCenter
    leaf1.scale = parseFloat(c38.value,10); // leafL0
    leavesOn = c05.checked; // leavesOn
    // leaf1.weightFrac = parseFloat(c39.value,10);
    leaf1.weightFrac = parseFloat(leaf40.value,10);
    leaf1.L1div = parseFloat(leaf41.value,10);
    leaf1.thetad1 = parseFloat(leaf42.value,10);
    leaf1.L2div = parseFloat(leaf43.value,10);
    leaf1.thetad2 = parseFloat(leaf44.value,10);
    leaf1.rarity = parseInt(leaf45.value,10);
    leaf1.variation = parseFloat(leaf46.value,10)*100;
    leaf1.Lstem = 0.2; //
    leaf1.Lstem = parseFloat(leaf47.value,10);

    // Time
    // time = c01.value; // time
    // getClockTime(time); // update clockTime
    // Moon
    moon1.xFrac = parseFloat(moon01.value,10);
    moon1.yFrac = parseFloat(moon02.value,10);
    moon1.radFrac = parseFloat(moon03.value,10);
    moon1.glowIntensity = parseFloat(moon04.value,10);

    // Stars
    stars1.nFrac = parseFloat(stars01.value,10);
    stars1.radFrac = parseFloat(stars02.value,10);
    stars1.alpha = parseFloat(stars03.value,10);
    // Sky
    sky1.hCenter = parseFloat(sky01.value,10);
    sky1.sCenter = parseFloat(sky02.value,10);
    sky1.lCenter = parseFloat(sky03.value,10);

    // Clouds
    clouds1.nFrac = parseFloat(sky04.value,10);
    clouds1.alphaMax = parseFloat(clouds02.value,10);
    clouds1.hMin = parseFloat(clouds03.value,10);
    clouds1.hMax = parseFloat(clouds04.value,10);

    // nCloudsFrac = parseFloat(sky05.value,10);
  
  }


function combine() {
  
  // ctx.clearRect(0,0, w, h);
  // var img = document.getElementById('exampleImg');
  // ctx2.clearRect(0,0, w, h);
  ctx.clearRect(0,0, w, h);
  ctx2.clearRect(0,0,w,h);

  drawBG(ctx);

  // ctx.drawImage(canvas2,0,0);

  drawTrees(treeList,ctx);

  
}



window.addEventListener('resize', handleResize);
// window.addEventListener('orientationchange', handleResize);




