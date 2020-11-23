function drawLeaf( leaf, ctx )
{

    // console.log("drawLeaf");

    var x0 = leaf.x0;
    var y0 = leaf.y0;

    var x1 = leaf.x1;
    var y1 = leaf.y1;

    var x2 = leaf.x2;
    var y2 = leaf.y2;

    var cp1x = leaf.cp1x;
    var cp1y = leaf.cp1y;

    var cp2x = leaf.cp2x;
    var cp2y = leaf.cp2y;

    var cp3x = leaf.cp3x;
    var cp3y = leaf.cp3y;

    var cp4x = leaf.cp4x;
    var cp4y = leaf.cp4y;

    var cp1xIn = leaf.cp1xIn;
    var cp1yIn = leaf.cp1yIn;

    var cp2xIn = leaf.cp2xIn;
    var cp2yIn = leaf.cp2yIn;


    // account for the X/Y positioning
    x0 = x0 + startCoord[0];
    y0 = y0 + startCoord[1];

    

    //// unpack leaf object
    // var L0 = leaf.L0 * h;
    // var Lstem = leaf.Lstem * L0;
    // var thetad0 = leaf.thetad0;
    // var x0 = leaf.x1;
    // var y0 = leaf.y1;
    var weightFrac = leaf.weightFrac;
    // var L1div = leaf.L1div;
    // var thetad1 = leaf.thetad1;
    // var L2div = leaf.L2div;
    // var thetad2 = leaf.thetad2;

    var hueCenter = leaf.hCenter;
    var satCenter = leaf.sCenter;
    var litCenter = leaf.lCenter;
    var leafScale = leaf.scale;

    ctx.lineWidth = weightFrac;
    ctx.strokeStyle = 'hsl(' + 0 + ', ' +  0 + '%, ' + 0 + '%)';

    // draw stem
    // ctx.lineWidth = 1;
    
    ctx.beginPath();
    ctx.moveTo(x0,y0);
    ctx.lineTo(x1,y1);
    ctx.stroke();
    
    var hue;

    hue = hueCenter + randomSign()*getRandomInt(0,20);
    if (hue<0) {
        hue = hue+360;
    } else if (hue>360) {
        hue = hue-360;
    }
    var sat = satCenter*overunder(10);
    var lit = litCenter*overunder(30);

    ctx.fillStyle = 'hsl(' + hue + ', ' +  sat + '%, ' + lit + '%)';
    ctx.strokeStyle = 'hsl(' + hue + ', ' +  0 + '%, ' + 0 + '%)';

    // outer leaf
    ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x2, y2);
        ctx.bezierCurveTo(cp3x, cp3y, cp4x, cp4y, x1, y1);
        ctx.closePath();
        
        ctx.stroke();
        ctx.fill();
        ctx.clip(); // clip the texture

    // stem
    ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.bezierCurveTo(cp1xIn, cp1yIn, cp2xIn, cp2yIn, x2, y2);
        // ctx.strokeStyle = 'hsl(' + hue + ', ' +  0 + '%, ' + 0 + '%)';
        ctx.stroke();



}

