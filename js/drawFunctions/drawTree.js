function drawTree( tree, ctx ) 
{

  console.log("Drawing Tree...");
  // unpack
  drawQue = tree.segs;
  var th1Frac = tree.th1;
  var Ldivider = tree.Ldivider;
  var ThDivider = tree.ThDivider;
  // var treeNum = tree.treeNum;
  // var J = tree.segNum;

  // var branchThicknesses = tree.branchThicknesses;

  var th1 = th1Frac*w;

  // var taper = 0.98;

  

  // console.log(coordsArray);


  // var doneFlag = 0;
  // var level = 0;

  // maxLoops = coordsArray.length;

  // console.log(coordsArray.length);

  // SORT SEGS BY Z2
  var sortIndex = 0; // z2
  drawQue = drawQue.sort(function(a,b) {
    return a[sortIndex]-b[sortIndex]
  });


  // DRAW EACH ITEM IN THE DRAWING QUE
  for(let i=0;i<drawQue.length;i++) {
  // for(i=0;i<10;i++) {
  // while (J<maxLoops) {

    

    let item = drawQue[i];    

    let type = item[1];

    // console.log("drawing itew #",i,"type=",type);
    
    if(type=="seg") {

      // console.log("that was a seg");

      thisSeg = item[2];

      // thisSeg.t0 = branchThicknesses[thisSeg.level];
      thisSeg.t0 = thisSeg.tFrac * tree.th1 * w;
      thisSeg.hCenter = tree.hCenter;
      thisSeg.sCenter = tree.sCenter;
      thisSeg.lCenter = tree.lCenter;

      // console.log(thisSeg.y2);

      drawSeg(thisSeg,ctx);

    } else if (type=="leaf") {

      thisLeaf = item[2];
      
      // drawLeaf(thisLeaf,ctx);     

      // CIRCLE LEAVES
      // console.log("that was a leaf",thisLeaf.x0+startCoord[0],thisLeaf.y0+startCoord[1],thisLeaf.L0);
      ctx.beginPath();
      // ctx.rect(thisLeaf.x0+startCoord[0],thisLeaf.y0+startCoord[1],10,10);
      L0 = thisLeaf.L0 * h * thisLeaf.scale * overunder(thisLeaf.variation);
      // console.log("L0",L0);
      x0 = thisLeaf.x0 + startCoord[0];
      y0 = thisLeaf.y0 + startCoord[1];
      ctx.ellipse(x0, y0, L0, L0, 0, 0, 2 * Math.PI);
      hue = thisLeaf.hCenter * overunder(thisLeaf.variation);
      sat = thisLeaf.sCenter * overunder(thisLeaf.variation);
      lit = thisLeaf.lCenter * overunder(thisLeaf.variation);
      ctx.fillStyle = 'hsl(' + hue + ', ' +  sat + '%, ' + lit + '%)';
      ctx.fill();

    }    


  }

  console.log("Done Drawing Tree.");

} 