window.onload = function() {

  console.log("Window Loaded.");

  ////////////////////////////////////////////////////////////// DOCUMENT INPUTS
  scale = 1;
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


  // CTX Variables
  ctx = canvas.getContext('2d'); // tree layer
  ctx2 = canvas2.getContext('2d'); // BG layer


  style_width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
  w = style_width;
  h = w*aspectRatio;

  // New Prototypes
  polyglot1 = new polyglot(); // new prototype
  poly1 = new poly();
  sky1 = new sky();

  loadPreset1();

  handleResize(); 

  
  // computeAndDraw0();

  

}




function saveImg() {

  combine();

  var link = document.getElementById('link');
  link.setAttribute('download', 'hereUGo.png');
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

    // nSides;
    var c01 = document.getElementById("c01");
    c01.addEventListener('input',recalc);

    // size;
    var c02 = document.getElementById("c02");
    c02.addEventListener('input',recalc);

    // xCenter;
    var c03 = document.getElementById("c03");
    c03.addEventListener('input',recalc);

    // yCenter;
    var c04 = document.getElementById("c04");
    c04.addEventListener('input',recalc);

    // startAngle;
    var c05 = document.getElementById("c05");
    c05.addEventListener('input',recalc);

    // Weight;
    var c06 = document.getElementById("c06"); 
    c06.addEventListener('input',redraw);
    
    // nPolys;
    var c07 = document.getElementById("c07");
    c07.addEventListener('input',recalc);

    // thetaRot;
    var c08 = document.getElementById("c08");
    c08.addEventListener('input',recalc);

    // SizeIncFactor;
    var c09 = document.getElementById("c09");
    c09.addEventListener('input',recalc);

    // hueCenter;
    var c10 = document.getElementById("c10");
    c10.addEventListener('input',redraw);

    // satCenter;
    var c11 = document.getElementById("c11");
    c11.addEventListener('input',redraw);

    // litCenter;
    var c12 = document.getElementById("c12");
    c12.addEventListener('input',redraw);

    // warble;
    var c13 = document.getElementById("c13");
    c13.addEventListener('input',recalc);

    // lineMode;
    var c14 = document.getElementById("c14");
    c14.addEventListener('input',redraw);

    // pointMode;
    var c15 = document.getElementById("c15");
    c15.addEventListener('input',redraw);

    // pointSize;
    var c16 = document.getElementById("c16");
    c16.addEventListener('input',redraw);

    // colorVariation
    var c17 = document.getElementById("c17");
    c17.addEventListener('input',redraw);

    // fillOn
    var c18 = document.getElementById("c18");
    c18.addEventListener('input',redraw);

    // alpha
    var c19 = document.getElementById("c19");
    c19.addEventListener('input',redraw);


    // Sky Controls
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

    // Polyglot params
    polyglot1.nSides = parseFloat(c01.value,10);
    polyglot1.size = parseFloat(c02.value,10);  
    polyglot1.xCenter = parseFloat(c03.value,10);
    polyglot1.yCenter = parseFloat(c04.value,10);
    polyglot1.thetad0 = parseFloat(c05.value,10);
    polyglot1.weight = parseFloat(c06.value,10);
    polyglot1.nPolys = parseFloat(c07.value,10);
    polyglot1.thetaRot = parseFloat(c08.value,10);
    polyglot1.sizeIncFactor = parseFloat(c09.value,10);
    polyglot1.hueCenter = parseFloat(c10.value,10);
    polyglot1.satCenter = parseFloat(c11.value,10);
    polyglot1.litCenter = parseFloat(c12.value,10);
    polyglot1.warble = parseFloat(c13.value,10);

    lineMode = c14.checked;
    pointMode = c15.checked;

    polyglot1.pointSize = parseFloat(c16.value,10);
    polyglot1.colorVariation = parseFloat(c17.value,10);


    polyglot1.fillOn = c18.checked;

    polyglot1.alpha = parseFloat(c19.value,10);
 
    // Sky params
    sky1.hCenter = parseFloat(sky01.value,10);
    sky1.sCenter = parseFloat(sky02.value,10);
    sky1.lCenter = parseFloat(sky03.value,10);
  
}


function combine() {
  
  ctx.clearRect(0,0,w,h);
  ctx2.clearRect(0,0,w,h);

  drawBG(ctx);

  drawPolyglot(polyglot1,ctx);

}



window.addEventListener('resize', handleResize);
// window.addEventListener('orientationchange', handleResize);




