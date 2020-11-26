function drawPolyglot( polyglot , ctx) {

    nSides = polyglot.nSides;
    size = normal2range(polyglot.size,0,h);
    Xcenter = normal2range(polyglot.Xcenter,0,w);
    Ycenter = normal2range(polyglot.Ycenter,h,0);
    weight = normal2range(polyglot.weight,1,20);
    startAngle = normal2range(polyglot.thetad0,0,360);
    nPolys = normal2range(polyglot.nPolys,0,1000);
    thetaRot = normal2range(polyglot.thetaRot,0,180);
    sizeIncFactor = normal2range(polyglot.sizeIncFactor,1.00001,1.001);

    hueCenter = normal2range(polyglot.hueCenter,0,255);
    satCenter = normal2range(polyglot.satCenter,0,100);
    litCenter = normal2range(polyglot.litCenter,0,100);

    warblePerc = normal2range(polyglot.warble,0,10);

    // console.log(hueCenter);
    

    for (j = 0; j < nPolys; j += 1) {
    
        ctx.beginPath();
        
        thetar = (startAngle + thetaRot*j ) * Math.PI/180;
        // console.log(thetar);
        size = size*sizeIncFactor**j;
        cx = Xcenter * overunder(warblePerc);
        cy = Ycenter * overunder(warblePerc);
        x0 = cx + size * Math.cos(thetar);
        y0 = cy + size * Math.sin(thetar);
        ctx.moveTo(x0,y0);   
        
        // console.log("[startAngle]",[startAngle]);
        
        for (i = 1; i <= nSides-1; i += 1) {
            x = cx + size * Math.cos(i * 2 * Math.PI / nSides + thetar);
            y = cy + size * Math.sin(i * 2 * Math.PI / nSides + thetar);
            ctx.lineTo (x,y);
            
        }
        ctx.closePath();

        hue = hueCenter * overunder(10);
        sat = satCenter * overunder(10);
        lit = litCenter * overunder(10);

        ctx.strokeStyle = 'hsl(' + hue + ', ' +  sat + '%, ' + lit + '%'  +')';    
        ctx.lineWidth = weight*overunder(50);
        ctx.stroke();

    }
}

