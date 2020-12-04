function drawPolyglot( polyglot, ctx ) 
{

    // pull in attributes
    var seed = polyglot.seed;

    var scale = normal2range(polyglot.scale,0.1,4);
    
    var polys = polyglot.polys;

    var pointSize = normal2range(polyglot.pointSize,0,1);

    var weight = normal2range(polyglot.weight,0.0001,0.01);

    var hueCenter = normal2range(polyglot.hueCenter,0,255);
    var satCenter = normal2range(polyglot.satCenter,0,100);
    var litCenter = normal2range(polyglot.litCenter,0,100);
    var alpha = normal2range(polyglot.alpha,0,0.1);

    var fillOn = polyglot.fillOn; 

    var maxColorVariation = normal2range(polyglot.colorVariation ,0 , 100);

    var maxHueVariation = maxColorVariation;
    var maxSatVariation = maxColorVariation;
    var maxLitVariation = maxColorVariation;


    myrng = new Math.seedrandom(seed);
    



    // normalize to canvas
    pointSize = pointSize * h;
    weight = weight * h;

     // scale
    pointSize = pointSize * scale;

    // lineMode=1;
    // pointMode=1;
    
    for (let j = 0; j < polys.length; j += 1) 
    {

        hue = hueCenter + plusOrMinusMax(maxHueVariation);
        sat = satCenter + plusOrMinusMax(maxSatVariation);
        lit = litCenter + plusOrMinusMax(maxLitVariation);

        ctx.strokeStyle = 'hsl(' + hue + ', ' +  sat + '%, ' + lit + '%'  +')';    
        ctx.lineWidth = weight*overunder(50);

        thisPoly = polys[polys.length-1-j];
        coords = thisPoly.coords;

        ctx.beginPath();

        x0 = coords[0][0];
        y0 = coords[0][1];

        if(lineMode==1)
        {

            ctx.moveTo(x0,y0);
            
            for (let i = 1; i <= coords.length-1; i += 1)
            {
                
                x = coords[i][0];   y = coords[i][1];

                ctx.lineTo(x,y);

            }

            ctx.closePath();
                
            ctx.stroke();

            if(fillOn==1) {
                ctx.fillStyle = 'hsla(' + hue + ', ' +  sat + '%, ' + lit + '%,'  + alpha + ')';  
                ctx.fill();
            }

        }

        if(pointMode==1)
        {

            ctx.moveTo(x0,y0);
            
            for (let i = 0; i <= coords.length-1; i += 1)
            {
                
                x = coords[i][0];   y = coords[i][1];

                ctx.beginPath();
                ctx.ellipse(x, y, pointSize, pointSize, 0, 0, 2*Math.PI);
                // ctx.rect(x-pointSize/2, y-pointSize/2, pointSize, pointSize);
                ctx.stroke();

                if(fillOn==1) {
                    ctx.fillStyle = 'hsla(' + hue + ', ' +  sat + '%, ' + lit + '%,'  + alpha + ')';  
                    ctx.fill();
                }

            }

        }

    }

}