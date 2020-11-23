function drawLeafCanvas (leaf, ctx) {

    // clear tree layer
    ctx.clearRect(0,0, wLeafCanvas, hLeafCanvas); 

    // draw background as sky color
    ctx.fillStyle = 'hsl(' + hSky + ', ' +  sSky + '%, ' + lSky + '%)';
    ctx.rect(0,0,wLeafCanvas,hLeafCanvas);
    ctx.fill();

    //// unpack leaf object
    
    // var L0Frac = leaf.L0;

    Lpicture =  wLeafCanvas-(wLeafCanvas/5)*2;

    var Lstem = leaf.Lstem * Lpicture;
    // var x1 = leaf.x1;
    // var y1 = leaf.y1;
    // var weightFrac = leaf.weightFrac;
    var L1div = leaf.L1div;
    var thetad1 = leaf.thetad1;
    var L2div = leaf.L2div;
    var thetad2 = leaf.thetad2;
    var hueCenter = leaf.hCenter;
    var satCenter = leaf.sCenter;
    var litCenter = leaf.lCenter;

    var thetad0 = 0;
    // var L0 = wLeafCanvas;

// console.log(Lstem);

    // DRAW BASIC LEAF ON LEAF CANVAS
    var x0 = wLeafCanvas/5;
    var x1 = x0 + Lstem;
    var x2 = wLeafCanvas-wLeafCanvas/5;
    var y0 = hLeafCanvas/2;
    var y1 = hLeafCanvas/2;    
    var y2 = hLeafCanvas/2;

    // draw stem
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'hsl(' + 0 + ', ' +  0 + '%, ' + 0 + '%)';
    ctx.beginPath();
    ctx.moveTo(x0,y0);
    ctx.lineTo(x1,y1);
    ctx.stroke();

    // calc
    /// add natural variation
    var L0 = x2-x1;

    var L1 = L0/L1div;
    var L2 = L0/L2div;

    // console.log(L1,L2,thetad1,thetad2);

    // ctx.lineWidth = 1;
    // hueChoice = getRandomInt(1,3);
    var hue = hueCenter;
    var sat = satCenter;
    var lit = litCenter;

    var e_thetad1 = thetad0 + thetad1;
    var e_thetad2 = 180 + thetad0 - thetad2;
    var e_thetad3 = 180 + thetad0 + thetad2;
    var e_thetad4 = thetad0 - thetad1;

    // convert to radians
    // var thetar0   = deg2rad(thetad0);
    var e_thetar1 = deg2rad(e_thetad1);
    var e_thetar2 = deg2rad(e_thetad2);
    var e_thetar3 = deg2rad(e_thetad3);
    var e_thetar4 = deg2rad(e_thetad4);

    var cp1x = x1 + L1 * Math.cos(e_thetar1);
    var cp1y = y1 + L1 * Math.sin(e_thetar1);

    var cp2x = x2 + L2 * Math.cos(e_thetar2);
    var cp2y = y2 + L2 * Math.sin(e_thetar2);

    var cp3x = x2 + L2 * Math.cos(e_thetar3);
    var cp3y = y2 + L2 * Math.sin(e_thetar3);

    var cp4x = x1 + L1 * Math.cos(e_thetar4);
    var cp4y = y1 + L1 * Math.sin(e_thetar4);

    ctx.fillStyle = 'hsl(' + hue + ', ' +  sat + '%, ' + lit + '%)';
    ctx.strokeStyle = 'hsl(' + 0 + ', ' +  0 + '%, ' + 0 + '%)';

    // draw outer leaf
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x2, y2);
    ctx.bezierCurveTo(cp3x, cp3y, cp4x, cp4y, x1, y1);
    ctx.closePath();    
    ctx.stroke();
    ctx.fill();

    // draw leaf stem
    // calc leaf stem
    var f = 3;
    L1 = L0/L1div/f;
    L2 = L0/L2div/f;
    
    thetad1 = thetad1/f;
    thetad2 = thetad2/f;

    var e_thetad1 = thetad0 + thetad1;
    var e_thetad2 = 180 + thetad0 - thetad2;

    var cp1xIn = x1 + L1 * Math.cos(e_thetar1);
    var cp1yIn = y1 + L1 * Math.sin(e_thetar1);

    var cp2xIn = x2 + L2 * Math.cos(e_thetar2);
    var cp2yIn = y2 + L2 * Math.sin(e_thetar2);

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    // ctx.bezierCurveTo(cp1xIn, cp1yIn, cp2xIn, cp2yIn, x2, y2);
    ctx.lineTo(x2, y2);
    ctx.stroke();

}
