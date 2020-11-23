function calcLeaf( leaf ) {

    //// unpack leaf object
    var L0 = leaf.L0 * h;
    var Lstem = leaf.Lstem * L0;
    var thetad0 = leaf.thetad0;

    var x0 = leaf.x0;
    var y0 = leaf.y0;

    var L1div = leaf.L1div;
    var thetad1 = leaf.thetad1;
    var L2div = leaf.L2div;
    var thetad2 = leaf.thetad2;

    var leafScale = leaf.scale;

    var variation = leaf.variation * 100;

    // console.log("leaf info", x0,y0,L0,Lstem);

    // console.log("L0",L0);



    var thetar0 = deg2rad(thetad0); // convert to radians
    
    // console.log(Lstem);

    var x1 = x0 + Lstem * Math.cos(thetar0);
    var y1 = y0 + Lstem * Math.sin(thetar0);



        /// add natural variation
    L0 = overunder(variation/3)*L0 * leafScale;

    var L1 = overunder(variation)*L0/L1div;
    var L2 = overunder(variation)*L0/L2div;
    
    thetad1 = overunder(variation)*thetad1;
    thetad2 = overunder(variation)*thetad2;

    var e_thetad1 = thetad0 + thetad1;
    var e_thetad2 = 180 + thetad0 - thetad2;
    var e_thetad3 = 180 + thetad0 + thetad2;
    var e_thetad4 = thetad0 - thetad1;

    // console.log(e_thetad1,e_thetad2,e_thetad3,e_thetad4);

    // convert to radians
    var e_thetar1 = deg2rad(e_thetad1);
    var e_thetar2 = deg2rad(e_thetad2);
    var e_thetar3 = deg2rad(e_thetad3);
    var e_thetar4 = deg2rad(e_thetad4);

    /// calculate points
    var x2 = x1 + L0 * Math.cos(thetar0);
    var y2 = y1 + L0 * Math.sin(thetar0);

    var cp1x = x1 + L1 * Math.cos(e_thetar1);
    var cp1y = y1 + L1 * Math.sin(e_thetar1);

    var cp2x = x2 + L2 * Math.cos(e_thetar2);
    var cp2y = y2 + L2 * Math.sin(e_thetar2);

    var cp3x = x2 + (L2 * Math.cos(e_thetar3)) * overunder(variation);
    var cp3y = y2 + (L2 * Math.sin(e_thetar3)) * overunder(variation);
    
    var cp4x = x1 + (L1 * Math.cos(e_thetar4)) * overunder(variation);
    var cp4y = y1 + (L1 * Math.sin(e_thetar4)) * overunder(variation);

    
    // for leaf stem
    var f = 3;
    L1 = overunder(variation)*L0/L1div/f;
    L2 = overunder(variation)*L0/L2div/f;
    
    thetad1 = overunder(variation)*thetad1/f;
    thetad2 = overunder(variation)*thetad2/f;

    var e_thetad1 = thetad0 + thetad1;
    var e_thetad2 = 180 + thetad0 - thetad2;

    var cp1xIn = x1 + L1 * Math.cos(e_thetar1);
    var cp1yIn = y1 + L1 * Math.sin(e_thetar1);

    var cp2xIn = x2 + L2 * Math.cos(e_thetar2);
    var cp2yIn = y2 + L2 * Math.sin(e_thetar2);



    // general stuff
    leaf.x0 = x0;
    leaf.y0 = y0;

    leaf.x1 = x1;
    leaf.y1 = y1;

    leaf.x2 = x2;
    leaf.y2 = y2;

    // outer edge stuff
    leaf.cp1x = cp1x;
    leaf.cp1y = cp1y;

    leaf.cp2x = cp2x;
    leaf.cp2y = cp2y;

    leaf.cp3x = cp3x;
    leaf.cp3y = cp3y;

    leaf.cp4x = cp4x;
    leaf.cp4y = cp4y;

    // stem stuff
    leaf.cp1xIn = cp1xIn;
    leaf.cp1yIn = cp1yIn;

    leaf.cp2xIn = cp2xIn;
    leaf.cp2yIn = cp2yIn;


    return leaf;


}