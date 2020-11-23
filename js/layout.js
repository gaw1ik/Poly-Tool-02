function handleResize() {

    console.log('resize');
  
    style_width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
  
    // w = style_width;
    // h = ;
  
     // html width
    canvas.width = style_width*dpi*scale;
    canvas2.width= style_width*dpi*scale;
  
    drawing_height = style_width*aspectRatio; 
  
     // html height
    canvas.height = drawing_height*dpi*scale;
    canvas2.height= drawing_height*dpi*scale;


  
    // canvas.setAttribute('height', drawing_height * dpi * scale);
  // canvas.setAttribute('width', style_width * dpi * scale);
  
    // CSS height
    drawingContainer.style.height = drawing_height.toString() + 'px';
  
    // if horizontal screen
    if(window.innerWidth >= window.innerHeight) {
      inputContainer.style.height =  drawing_height.toString() + 'px';
    } else if (window.innerWidth < window.innerHeight) {
      inputContainerHeight = drawing_height - window.innerHeight;
      inputContainerHeight = 100;
      inputContainer.style.height =  inputContainerHeight.toString() + '%';
    }

      // overlayGrad.height =  h;
    // }
  
    w = canvas.width;
    h = canvas.height;
    // drawingContainer.setAttribute('height', h);
  
    updateBG();
    reseed();
  
  };