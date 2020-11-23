// linear solver given two points
// function linSolveForY([t1,y1],[t2,y2],time) {
// 	var m = (y2-y1)/(t2-t1);
// 	var b = y1-m*t1;
//   let coeffs = [b,m];
//   y = m*time + b;
//   return y;
// }

function drawSky( sky, ctx ) {

  // console.log("drawSky");

  hue = sky.hCenter;
  sat = sky.sCenter;
  lit = sky.lCenter;
  var grd = ctx.createLinearGradient(0, 0, w/2, h);   // linear gradient
  grd.addColorStop(0, 'hsl(' + hue + ', ' +  sat + '%, ' + lit + '%)');
  grd.addColorStop(1, 'hsl(' + hue + ', ' +  sat + '%, ' + lit + '%)');
  ctx.rect(0,0,w,h);
  ctx.fillStyle = grd;
  // ctx.fillStyle = 'hsl(' + h + ', ' +  s + '%, ' + l + '%)';
  ctx.fill();
}

function drawMoon( moon, ctx ) {

  // console.log("drawMoon");

  var xFrac = moon.xFrac;
  var yFrac = moon.yFrac;
  var radFrac = moon.radFrac;
  var glowIntensity = moon.glowIntensity;

  var xMoon = xFrac * w;
  var yMoon = h - (yFrac * h);    

  var radMoon = radFrac * w/2;
  glowRad = glowIntensity * (w/2-radMoon) + radMoon;

  var hue = 40;
  var sat = 50;
  var lit = 90;

  hGlow = hue;
  sGlow = sat;
  lGlow = lit;
  aGlow = glowIntensity;

  // moon
  ctx.fillStyle = 'hsl(' + hue + ', ' +  sat + '%, ' + lit + '%)';
  ctx.beginPath();
  ctx.ellipse(xMoon,yMoon,radMoon,radMoon,Math.PI / 4, 0, 2 * Math.PI);
  ctx.fill()

  // // moon glow
  var grdRad = ctx.createRadialGradient(xMoon,yMoon,1, xMoon,yMoon,glowRad);

  grdRad.addColorStop(0, 'hsla(' + hGlow + ', ' +  sGlow + '%, ' + lGlow + '%,' + aGlow + ')');
  grdRad.addColorStop(1, 'hsla(' + hGlow + ', ' +  sGlow + '%, ' + lGlow + '%,' + 0   + ')');
  ctx.beginPath();
  ctx.ellipse(xMoon,yMoon,glowRad,glowRad,Math.PI / 4, 0, 2 * Math.PI);
  ctx.fillStyle = grdRad;
  ctx.fill();

}

function drawClouds( clouds1, ctx ) {

  // console.log("drawClouds");
  
  var thisH = 180;
  var thisS = 0;
  // var thisL = 90;
  var thisA = clouds1.alphaMax;  

  maxNClouds = 750;

  lMax = 100;
  lMin = 90;

  nFrac = clouds1.nFrac;

  var radCenter = h/6;
  var n = nFrac * maxNClouds;

  hMinFrac = clouds1.hMin;
  hMaxFrac = clouds1.hMax;

  for(i=0;i<n;i++) {

      var x = myrng() * (1.1*w - (0-0.1*w) ) + (0-0.1*w);
      var y = myrng() * (hMaxFrac*h - hMinFrac*h) + hMinFrac*h;

      var thisL = myrng() * (lMax-lMin) + lMin;
      // console.log(x,y);
      var thisRad = overunder(50)*radCenter;

      var xSky = 1;
      
      // set color
      // ctx.fillStyle = 'hsla(' + thisH + ', ' +  thisS + '%, ' + thisL + '%,' + thisA + ')';

      var grdRad = ctx.createRadialGradient(x,y,1, x,y,xSky*thisRad);
      grdRad.addColorStop(0, 'hsla(' + thisH + ', ' +  thisS + '%, ' + thisL + '%,' + thisA + ')');
      grdRad.addColorStop(1, 'hsla(' + thisH + ', ' +  thisS + '%, ' + thisL + '%,' + 0 + ')');
      ctx.fillStyle = grdRad;

      ctx.beginPath();
      ctx.ellipse(x, y, xSky*thisRad, thisRad, 0, 0, 2 * Math.PI);
      ctx.fill();

      x = x + h/10;

      var grdRad = ctx.createRadialGradient(x,y,1, x,y,xSky*thisRad);
      grdRad.addColorStop(0, 'hsla(' + thisH + ', ' +  thisS + '%, ' + thisL + '%,' + thisA + ')');
      grdRad.addColorStop(1, 'hsla(' + thisH + ', ' +  thisS + '%, ' + thisL + '%,' + 0 + ')');
      ctx.fillStyle = grdRad;

      ctx.beginPath();
      ctx.ellipse(x, y, xSky*thisRad, thisRad, 0, 0, 2 * Math.PI);
      ctx.fill();

  }

}

function drawStars( stars, ctx) {

    // console.log("drawStars");

    var nFrac = stars.nFrac;
    var radFrac = stars.radFrac;
    var alpha = stars.alpha;

    var thisHStar = 40;
    var ThisSStar = 10;
    // var lStar = 90;

    nStars = nFrac * 5000;

    radStar = radFrac * 2;

    for(i=0;i<nStars;i++) {

        var xStar = myrng() * w;
        var yStar = myrng() * h;
        var thisLStar = myrng() * (100-50) + 50;
        // console.log(xStar,yStar);
        var thisRadStar = myrng()*radStar;
        // var thisRadStar = radStar;

        ctx.fillStyle = 'hsla(' + thisHStar + ', ' +  ThisSStar + '%, ' + thisLStar + '%,' + alpha + ')';
        ctx.beginPath();
        ctx.ellipse(xStar,yStar,thisRadStar,thisRadStar,0, 0, 2 * Math.PI);
        ctx.fill()

    }
}

function drawCityScape(nLayers, nBuildings, yGround, xLeft, xRight, rarityWindow, ctx) {

  var variation = 15;

  for(let j=0;j<nLayers;j++) {

    layerL = (20/nLayers)*(j+1);
    // layerHeight = (/nLayers)*(j+1);

    for(let i=0;i<nBuildings;i++) {

      var thisH = overunder(variation) * 240;
      var thisS = overunder(variation) * 20;;
      var thisL = overunder(variation) * layerL;
      
      var wBuilding = getRandomInt(w/50,w/30);
      var aspect = getRandomInt(1,5);
      var hBuilding = wBuilding * aspect;

      var x = getRandomInt(xLeft,xRight);
      var y = yGround - hBuilding;

      ctx.fillStyle = 'hsl(' + thisH + ', ' +  thisS + '%, ' + thisL + '%)';

      ctx.beginPath();
      ctx.rect(x,y,wBuilding,hBuilding);

      ctx.fill();

      // Add windows
      var nWindowsX = getRandomInt(5,10);
      var nWindowsY = nWindowsX*aspect;

      var paddingX = wBuilding/(nWindowsX*3);
      var paddingY = hBuilding/(nWindowsY*3);

      var wWindow = (wBuilding-(nWindowsX+1)*paddingX)/nWindowsX;
      var hWindow = (hBuilding-(nWindowsY+1)*paddingY)/nWindowsY;

      var thisHWindow;
      var thisSWindow;
      var thisLWindow;

      for(let k=0;k<nWindowsX;k++) {

        for(let l=0;l<nWindowsY;l++) {

          var choice = makeRandel(rarityWindow);

          if(choice==0) {

            thisHWindow = thisH;
            thisSWindow = thisS * overunder(variation);
            thisLWindow = thisL * overunder(variation);

          } else {

            thisHWindow = overunder(variation*3) * 60;
            thisSWindow = overunder(variation) * 50;
            thisLWindow = overunder(variation*2) * (20/nLayers)*(j+1);

          }

          ctx.fillStyle = 'hsl(' + thisHWindow + ', ' +  thisSWindow + '%, ' + thisLWindow + '%)';

          ctx.beginPath();
          // randy = getRandomInt(2,6);
          // randyH = getRandomInt(3,5*aspect);

          xWindow = x + k*wWindow + (k+1)*paddingX;
          yWindow = y + l*hWindow + (l+1)*paddingX;

          ctx.rect(xWindow,yWindow,wWindow,hWindow);

          ctx.fill();
          // ctx.stroke();
          
        }
      }

    }
  }
}





function drawBG( ctx ) { 
  
  console.log("drawBG");

  ctx.clearRect(0,0, w, h);
    
  // Sky
  if (skyOn.checked==1) {
    drawSky( sky1, ctx ); 
  }

  // Stars
  if (starsOn.checked==1) {
    drawStars( stars1, ctx);
  }

  // Moon
  if (moonOn.checked==1) {
    drawMoon( moon1, ctx );
  }

  // Fog
  if (cloudsOn.checked==1) {
    drawClouds( clouds1, ctx );
  }

  // nLayers = 10;
  // nBuildings=5;
  // yGround=0.6*h;
  // xLeft=0;
  // xRight=2/3*w;
  // rarityWindow = 90;
  // drawCityScape(nLayers, nBuildings, yGround, xLeft, xRight, rarityWindow, ctx);

  // ctx.filter = 'blur(14px)';
   
}
  