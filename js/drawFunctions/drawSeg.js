function drawSeg( seg, ctx )
{
    // pull out info about this seg
    var x1 = seg.x1;
    var x2 = seg.x2;
    var y1 = seg.y1;
    var y2 = seg.y2;
    var z1 = seg.z1;
    var z2 = seg.z2;
    var level = seg.level;
    var segNumber = seg.segNumber;
    var t0 = seg.t0;

    

    hue = seg.hCenter;
    sat = seg.sCenter;
    lit = seg.lCenter;

    // add the start coords
    x1 = x1 + startCoord[0];
    x2 = x2 + startCoord[0];
    y1 = y1 + startCoord[1];
    y2 = y2 + startCoord[1];





    // calculate the angle
    var thetar = Math.atan( (y2-y1)/(x2-x1) );

    // console.log(y2-y1,x2-x1);

    // OBNOXIOUS case structure for finding thetad...
    if( (x2-x1) < 0 && (y2-y1)>0 ){
      thetar = -Math.PI + thetar;
    } else if ( (x2-x1)<0 && (y2-y1)<0 ) {
      thetar = -Math.PI*2 + thetar;
    } else if ( (x2-x1)>0 && (y2-y1)<0 ) {
      thetar = -Math.PI*3 + thetar;
    } else if ( (x2-x1)==0 && (y2-y1)>0 ) {
      thetar = -Math.PI/2;
      // console.log('-90');
    } else if (  (x2-x1)<0 && (y2-y1)==0) {
      thetar = -Math.PI/2*2;
      // console.log('-180');
    } else if (  (x2-x1)==0 && (y2-y1)<0) {
      thetar = -Math.PI/2*3;
      // console.log('-270');
    } else if (  (x2-x1)>0 && (y2-y1)==0) {
      thetar = 0;
    } else if (  (x2-x1)==0 && (y2-y1)==0) {
      thetar = 90;
    }

    // convert to degrees
    thetad = rad2deg(thetar); 

    // hue = overunder(50) * branchHCenter;

    alpha = 1.0;

    ctx.lineCap = 'round';

    ctx.beginPath();
    // l = ( (y2-y1)**2 + (x2-x1)**2 ) ** 0.5; // the length of the segment

    // // was this to create overlap??
    // ctx.moveTo(x1,y1+l/10);
    // ctx.lineTo(x2,y2-l/10); 

    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);

    

    // console.log("drew a seg");



    // x = thisXArray[k];
    // y = thisYArray[k]; 
    // thetad = THETAD[k];
    var f = 20;
    // zScaleFactor = (w/f+z2)/(w/f);
    zScaleFactor = 1; // setting to 1 essentially turns the zScaleFactor off

    // t = t0 * (tree1.taper**segNumber) * zScaleFactor;

    t = t0 * zScaleFactor;
    
    
    ctx.lineWidth = t;

    ctx.strokeStyle = 'hsl(' + hue + ', ' +  sat + '%, ' + lit + '%)';

    ctx.stroke();

    // console.log(x1,y1,x2,y2,hue,sat,lit,t,level);


    // apply shading
    if (shadingOn.checked==1) {

        // Gradient Stuff
        xa = x1 + t/2 * Math.cos( deg2rad(thetad - 90) );
        ya = y1 + t/2 * Math.sin( deg2rad(thetad - 90) );
        xb = x1 + t/2 * Math.cos( deg2rad(thetad + 90) );
        yb = y1 + t/2 * Math.sin( deg2rad(thetad + 90) );

        // overlay gradient shader (cylindrical shading)
        var alpha = shadingAlpha;

        var shadingIntensity = 8;

        ctx.beginPath();
        ctx.moveTo(x1,y1+l/10);
        ctx.lineTo(x2,y2-l/10); 
        // t = branchThicknesses[level] * (0.97**segNumber);
        ctx.lineWidth = t;        
        var grd = ctx.createLinearGradient(xa, ya, xb, yb);
        grd.addColorStop(0,   'hsla(' + hue + ', ' +  sat + '%, ' + lit*shadingIntensity   + '%,' + alpha + ')' );
        grd.addColorStop(0.1, 'hsla(' + hue + ', ' +  sat + '%, ' + lit     + '%,' + alpha + ')' );
        grd.addColorStop(0.4, 'hsla(' + hue + ', ' +  sat + '%, ' + lit*shadingIntensity/3 + '%,' + alpha + ')' );
        grd.addColorStop(0.9, 'hsla(' + hue + ', ' +  sat + '%, ' + lit     + '%,' + alpha + ')' );
        grd.addColorStop(1,   'hsla(' + hue + ', ' +  sat + '%, ' + lit/shadingIntensity   + '%,' + alpha + ')' );

        ctx.strokeStyle = grd;

        ctx.stroke();
    
        //////////////////////////////////

        // overlay gradient shader 2 (z-position depth colors)
        var alpha = shadingAlpha;

        ctx.beginPath();
        ctx.moveTo(x1,y1+l/10);
        ctx.lineTo(x2,y2-l/10); 
        // t = branchThicknesses[level] * (0.97**segNumber);
        ctx.lineWidth = t;        
        var grd = ctx.createLinearGradient(x1, y1, x2, y2);
        var exagg = 5;
        litZ1 = z1/(w/exagg) * 100 + lit;
        litZ2 = z2/(w/exagg) * 100 + lit;

        grd.addColorStop(0,   'hsla(' + hue + ', ' +  sat + '%, ' + litZ1   + '%,' + alpha + ')' );
        grd.addColorStop(1,   'hsla(' + hue + ', ' +  sat + '%, ' + litZ2   + '%,' + alpha + ')' );
    
        ctx.strokeStyle = grd;
    
        // ctx.stroke();
        //////////////////////////////////
    }

    // Apply the texture
    if (textureOn.checked==1 && t>w/300) {

        var nTex = textureIntensity * 100;

        for (let j=0;j<nTex;j++) {

        // console.log('hey');

        // solve the equation of the center line of the segment
        var coeffs = linSolve(x1,y1,x2,y2);
        var b = coeffs[0];
        var m = coeffs[1];

        // select a random point along the center line to start at
        randX = getRandomFloat(x1,x2);
        randY = m*randX + b;

        // get a random thickness value to see how far from the center line to put the texture line (scaled 0 to t/2)
        randT = randomSign() * myrng()*t/2;

        // get an angle to shoot off from the center line at (the angle is thetar plus or minus 90 degrees)
        angleR = (thetar + randomSign() * Math.PI/2 );

        // find center point of the texture line
        xLc = randX + randT*Math.cos(angleR);
        yLc = randY + randT*Math.sin(angleR);

        // find the length of the texture line (as a constrained random fraction of the segment length)
        texLength = getRandomFloat(0.1,0.9) * l; 

        // finally, find the endpoints of the texture line
        xL1 = xLc + texLength * Math.cos(thetar+Math.PI);
        xL2 = xLc + texLength * Math.cos(thetar);
        yL1 = yLc + texLength * Math.sin(thetar+Math.PI);
        yL2 = yLc + texLength * Math.sin(thetar);

        // var xL1 = getRandomInt(x1-t/2,x1+t/2);
        // var xL2 = getRandomInt(x2-t/2,x2+t/2);
        // var yL1 = y1+getRandomInt(0,t);
        // var yL2 = y2-getRandomInt(0,t);

        ctx.lineWidth = t/20*overunder(50);
        var satL = sat*overunder(10);
        var litL = lit*overunder(10);
        alpha = textureIntensity;
        ctx.strokeStyle = 'hsla(' + hue + ', ' +  satL + '%, ' + litL   + '%,' + alpha + ')';

        ctx.beginPath();
        ctx.moveTo(xL1,yL1);
        ctx.lineTo(xL2,yL2); 
        ctx.stroke();

        }
    }
  
   
}