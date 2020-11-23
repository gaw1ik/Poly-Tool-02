
// This function computes the coordinates to draw a tree.

function makeTreeCoords( tree, leaf ) 
{
    
    // Unpack Tree Attributes
    var nLevels = tree.nLevels;
    var L1Frac = tree.L1;
    var segDiv = tree.segDiv;
    var rarity = tree.rarity;
    var angleChange1 = tree.angleChange1;
    var angleChange = tree.angleChange;
    var angleRange = tree.angleRange;
    var Ldivider = tree.Ldivider;
    var taper = tree.taper;
    var branchThicknessMult = tree.ThDivider;

    // Calculate Tree Branch Details  
    L1 = L1Frac*h;
    maxBranchLengths = [L1,L1/Ldivider**1,L1/Ldivider**2,L1/Ldivider**3,L1/Ldivider**4];
    segLengths = maxBranchLengths.map(x => x/segDiv);

    // branchThicknesses = [1,ThDivider**-1,ThDivider**-2,ThDivider**-3,ThDivider**-4];
    
    branchRarity = [rarity,rarity,rarity,rarity];
    angleRanges = [angleRange,angleRange,angleRange,angleRange,angleRange];
    angleChanges = [angleChange1,angleChange,angleChange,angleChange,angleChange];

    // var startCoord = [ getRandomInt(0,w), h ];  // choose random start coordinate

    ///////////////////////////////////////////////////////////////////// FIXED PARAMS
    // branch variables
    const percLength = 10; // the over under % amount for branch length 


    // VARIABLES
    var x1 = 0;
    var y1 = 0;
    var z1 = 0;
    var nBranchpoints = 0;
    let branchpoints = [[]];
    let branchpoints2 = [];
    var branchLength;
    var randel;
    // var count = 0;
    var thetad;
    var thetar;
    var x2;
    var y2;
    let X = []; let Y = [];
    let coordsArray = [];
    let segs = [];
    var rarity;

    var leafYes;

    var leafRarity = leaf.rarity;


    /////////////////////////////////////////////////////////////////////// COMPUTE COORDS
    branchpoints[0] = [x1, y1, 0, 0, z1, 1.0];

    // console.log(nLevels);

    // Repeat nLevels times

    // initialize tFrac at 1 (100% of start thickness)
    // var tFracOrigin = 1.0;

    for (let i=0; i<nLevels; i++) {  

        // console.log(i);        
        
        // For each branch point (branchpoints are indexed by "j")
        branchpoints2 = []; // initialize

        for (let j = 0; j < branchpoints.length; j++) {

        //if (branchpoints.length>0) {
            //console.log("i =",i,",j =",j,",nBranchpoints =",nBranchpoints,",branchpoints =",branchpoints);

            // Pull out the first point from branchpoints
            x1 = branchpoints[j][0];
            y1 = branchpoints[j][1];
            thetaDPrime = branchpoints[j][2];
            phid = branchpoints[j][3];
            z1 = branchpoints[j][4];
            tFracOrigin = branchpoints[j][5];

            

            // Determine Inital Angular Direction of Branch
            if (i == 0) { // if it's the first level
                thetaDPrime = thetaDPrime + angleChanges[i]; // the first thetad should be -90 degrees
                phid = 0; // the first phi should be 0 degrees
            } else { // else it's not the first level
                thetaDPrime = thetaDPrime + getRandomInt(-angleChanges[i],angleChanges[i]);
                phid = phid + getRandomInt(-angleChanges[i],angleChanges[i]);
            }            

            // Build coords array for the segment at this branchpoint and determine where branch points occur...
            branchLength = 0; // reset branchLength to 0 each time
            count = 0; // reset count
            frac = under(percLength);
            maxBranchLength = frac * maxBranchLengths[i];            

            // let X = [];
            // let Y = [];
            // let Z = [];
            // let THETAD = [];
            // let PhiD = [];


            go = 1; // set go to 1 initially, so that it enters the while loop. then it'll actually start checking.

            // build coords list for an individual branch
            segNumber = 0;

            tFrac = tFracOrigin * ( (i!=0)*branchThicknessMult + (i==0) ); // reset tFrac to the tFrac of the Origin Segment times the reduction

            while (go==1) {    
                  
                go = branchLength<maxBranchLength;  

                // console.log("go=",go)
                
                // console.log("go:",go,branchLength,maxBranchLength);

                // PhiD.push(phid);

                l = segLengths[i]*overunder(50);

       
                thetaDPrime = thetaDPrime + getRandomInt(-angleRanges[i], angleRanges[i]);
                if (thetaDPrime==0) {thetaDPrime=0.1;} // if phid was 0 degrees make it a small non-zero value (janky solution for a bug)

                phid = phid + getRandomInt(-angleRanges[i], angleRanges[i]);
                if (phid==0) {phid=0.1;} // if phid was 0 degrees make it a small non-zero value (janky solution for a bug)

                thetaRPrime = deg2rad(thetaDPrime); // convert to radians

                phir = deg2rad(phid); // convert to radians

                // determine coordinates in the "cross-plane"
                xPrime = l * Math.cos(thetaRPrime);
                yPrime = l * Math.sin(thetaRPrime);

                thetad = thetaDPrime * Math.cos(phir);
                // THETAD.push(thetad);

                // determine coordinates in 3D space
                x2 = x1 + xPrime * Math.cos(phir);
                y2 = y1 + yPrime;
                z2 = z1 + xPrime * Math.sin(phir);

                

                // z2 = w - z2;

                // weak perspective
                // sz = w*100;
                // x2 = x2 * sz/(sz-z2);
                // y2 = y2 * sz/(sz-z2);


                branchLength = branchLength + l; // add l to the total branchlength

                // th = branchThicknesses[i];
                // level = i;

                tFrac = tFrac * taper;  // calculate tFrac for this seg

                thisSeg = Object.create(seg1);

                thisSeg.x1 = x1;
                thisSeg.x2 = x2;
                thisSeg.y1 = y1;
                thisSeg.y2 = y2;
                thisSeg.z1 = z1;
                thisSeg.z2 = z2;
                thisSeg.level = i;
                thisSeg.segNumber = segNumber;                
                thisSeg.tFrac = tFrac;
                
                // console.log("tFrac",tFrac);

                segs.push([z2,"seg",thisSeg]);

                // console.log("thisseg",thisSeg);

                segNumber += 1;

                // Record the branching decisions (up until the last level)
                if (i<nLevels-1) {

                    rarity = Math.round(((branchLength/maxBranchLength)*maxBranchPerc)*(branchRarity[i]/100));

                    randel = makeRandel(rarity);

                    if (randel == 1  &  branchLength < maxBranchPerc * maxBranchLength) {
                        
                        nBranchpoints += 1;
                        tFracOrigin = tFrac;
                        branchCoords = [x2, y2, thetaDPrime, phid, z2, tFracOrigin];
                        branchpoints2.push(branchCoords); // append new point

                    }

                } 
                
                if (i==nLevels-1 && c05.checked==1) { // record leafing decisions

                    rarity_leaf = Math.round(((branchLength/maxBranchLength)*maxBranchPerc)*(leafRarity/100));

                    randel = makeRandel(rarity_leaf);

                    if (randel == 1) {   

                        var thisLeaf = Object.create(leaf1);

                        // console.log(x2,y2);

                        thisLeaf.x0 = x2;
                        thisLeaf.y0 = y2;
                        thisLeaf.thetad0 = thetad;
                        thisLeaf.L0 = L1Frac/Ldivider**(i+1);

                        thisLeaf = calcLeaf(thisLeaf);                       

                        segs.push([z2,"leaf",thisLeaf]);
                        // leafYes = 1;
                    }

                }

                // reset for next iteration
                x1 = x2;
                y1 = y2;
                z1 = z2;
                
            }

        }
        
        branchpoints = branchpoints2; // Reset

    }
    // console.log(coordsArray);
    // tree.coordsArray = [];
    // tree.coordsArray = coordsArray;
    // console.log("segs",segs);
    return segs;

}