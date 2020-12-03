function calcPolyglot( polyglot ) {

    var seed = polyglot1.seed;

    var nSides = polyglot.nSides;
    var size = normal2range(polyglot.size,0,h);
    var xCenter = normal2range(polyglot.xCenter,0,w);
    var yCenter = normal2range(polyglot.yCenter,h,0);
    var startAngle = normal2range(polyglot.thetad0,0,360);
    var nPolys = normal2range(polyglot.nPolys,0,1000);
    var thetaRot = normal2range(polyglot.thetaRot,0,180);
    var sizeIncFactor = normal2range(polyglot.sizeIncFactor,1.00001,1.001);
    var warbleAmount = normal2range(polyglot.warble,0,h/100);

    // console.log(hueCenter);


    myrng = new Math.seedrandom(seed);


    // let thisPoly.coords = [];

    polyglot.polys = [];
    

    for (let j = 0; j < nPolys; j += 1) {

        var thisPoly = Object.create(poly1);

        thisPoly.coords = [];
    
        // Polygons
        // ctx.beginPath();
        
        thetar = (startAngle + thetaRot*j ) * Math.PI/180;
        // console.log(thetar);
        size = size * sizeIncFactor**j;

        // console.log("[amount]",[warbleAmount]);
        // console.log("[xCenter,yCenter]",[xCenter,yCenter]);
        
        var cx = xCenter + plusOrMinus(warbleAmount);
        var cy = yCenter + plusOrMinus(warbleAmount);

        var x0 = cx + size * Math.cos(thetar);
        var y0 = cy + size * Math.sin(thetar);

        thisPoly.coords.push([x0,y0]);

        
        
        // ctx.moveTo(x0,y0);   

        // console.log("[cx,cy]",[cx,cy]);
        
        for (let i = 1; i <= nSides-1; i += 1) {

            x = cx + size * Math.cos(i * 2 * Math.PI / nSides + thetar);
            y = cy + size * Math.sin(i * 2 * Math.PI / nSides + thetar);

            thisPoly.coords.push([x,y]);

            polyglot.polys.push(thisPoly);
            // ctx.lineTo (x,y);        

        }
        // ctx.closePath();
    }

    return polyglot;



    
}

