function handleResize() {

    console.log('resize');

    canvasContainer = document.getElementById("canvas-container");
    drawingContainer = document.getElementById("drawing-container");

    drawingContainer_style_width  = +getComputedStyle(drawingContainer).getPropertyValue("width" ).slice(0, -2);  
    drawingContainer_style_height = +getComputedStyle(drawingContainer).getPropertyValue("height").slice(0, -2);

    var amount = 0.95;

    canv_style_height = amount*drawingContainer_style_height;

    // canv_style_width = canv_style_height; // width equals height (square ratio)

    canv_style_width = amount*drawingContainer_style_width;
  
     // html width
    // canvas.width = canv_style_width*dpi*scale;
    // canvas2.width= canv_style_width*dpi*scale;

    canv_html_width = canv_style_width*dpi*scale;
    canv_html_height = canv_style_height*dpi*scale;

    canvas.width   = canv_html_width;
    canvas.height  = canv_html_height;
    canvas2.width  = canv_html_width;
    canvas2.height = canv_html_height;
  
    // drawing_height = style_width*aspectRatio; 
  
     // html height
    // canvas.height = drawing_height*dpi*scale;
    // canvas2.height= drawing_height*dpi*scale;



    // html dimensions
    canvasContainer.height = canv_html_height;
    canvasContainer.width = canv_html_width;

    canv_style_left = (drawingContainer_style_width  - canv_style_width ) / 2;
    canv_style_top  = (drawingContainer_style_height - canv_style_height) / 2;


  
    // canvas.setAttribute('height', drawing_height * dpi * scale);
    // canvas.setAttribute('width', style_width * dpi * scale);

    console.log("height,width",[canv_style_height,canv_style_width]);
  
    // CSS height
    canvasContainer.style.height = canv_style_height.toString() + 'px';
    canvasContainer.style.width  = canv_style_width.toString() + 'px';

    canvasContainer.style.left   = canv_style_left.toString() + 'px';
    canvasContainer.style.top    = canv_style_top.toString() + 'px';
  
    // // if horizontal screen
    // if(window.innerWidth >= window.innerHeight) {
    //   inputContainer.style.height =  drawing_height.toString() + 'px';
    // } else if (window.innerWidth < window.innerHeight) {
    //   inputContainerHeight = drawing_height - window.innerHeight;
    //   inputContainerHeight = 100;
    //   inputContainer.style.height =  inputContainerHeight.toString() + '%';
    // }

      // overlayGrad.height =  h;
    // }
  
    w = canvas.width;
    h = canvas.height;
    // drawingContainer.setAttribute('height', h);
  
    updateBG();
    recalc();
  
  };