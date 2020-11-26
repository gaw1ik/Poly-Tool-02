function drawSky( sky, ctx ) {

  hue = sky.hCenter * 255;
  sat = sky.sCenter * 100;
  lit = sky.lCenter * 100;
  var grd = ctx.createLinearGradient(0, 0, w/2, h);   // linear gradient
  grd.addColorStop(0, 'hsl(' + hue + ', ' +  sat + '%, ' + lit + '%)');
  grd.addColorStop(1, 'hsl(' + hue + ', ' +  sat + '%, ' + lit + '%)');
  ctx.rect(0,0,w,h);
  ctx.fillStyle = grd;
  // ctx.fillStyle = 'hsl(' + h + ', ' +  s + '%, ' + l + '%)';
  ctx.fill();
}





function drawBG( ctx ) { 
  
  console.log("drawBG");

  ctx.clearRect(0,0, w, h);
    
  // Sky
  drawSky( sky1, ctx ); 

   
}
  