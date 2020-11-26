function drawPolyGlot2(coordsArray,ctx) {

  thisXArray = coordsArray[0];
  thisYArray = coordsArray[1];
  th = coordsArray[2];

  for (i=0;i<coordsArray.length;i++) {

    // color and stroke
    ctx.lineWidth = th;
    hue = overunder(75) * hueCenter;
    sat = satCenter;
    lit = litCenter;
    alpha = getRandomInt(5,10)*0.1;
    ctx.strokeStyle = 'hsla(' + hue + ', ' +  sat + '%, ' + lit + '%, ' + alpha +')';    

    // Draws a branch.
    x = thisXArray[0];
    y = thisYArray[0]; 
    
    ctx.beginPath();
    ctx.moveTo(x,y);

    for (let k = 1; k < thisXArray.length; k++) {
      x = thisXArray[k];
      y = thisYArray[k]; 
      ctx.lineTo(x,y);
    }   
    
    // ctx.closePath();ctx.fill();

    ctx.stroke();    

  }
  
}