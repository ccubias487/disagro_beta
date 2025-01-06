var tiemposcambian = tiemposcambian || {};

tiemposcambian.GuardandoPNGs = (function() {
  var mousePressed = false;
  var lastX, lastY;
  var ctx;

  function init() {
    // init canvas
    var canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    resetCanvas();

    // button events
    document.getElementById('bt-save').onmouseup = sendToServer;
    document.getElementById('bt-clear').onmouseup = resetCanvas;

    // canvas events
    canvas.onmousedown = function(e) {
      draw(e.layerX, e.layerY);
      mousePressed = true;
    };

    canvas.onmousemove = function(e) {
      if (mousePressed) {
        draw(e.layerX, e.layerY);
      }
    };

    canvas.onmouseup = function(e) {
      mousePressed = false;
    };
    
    canvas.onmouseleave = function(e) {
      mousePressed = false;
    };
  }

  function draw(x, y) {
    if (mousePressed) {
      ctx.beginPath();
      ctx.strokeStyle = document.getElementById('color').value;
      ctx.lineWidth = 1;
      ctx.lineJoin = 'round';
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
      ctx.closePath();
      ctx.stroke();
    }
    lastX = x; lastY = y;
  }

  function sendToServer() {
    var data = canvas.toDataURL('image/png');
    var data2 = canvas
    localStorage.setItem("firma_user",canvas.toDataURL('image/png'))
    //console.log(data)
   
  }
  
  function resetCanvas() {
    // just repaint canvas white
    ctx.fillStyle = '#EEEEEE';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  return {
    'init': init
  };
});


window.onload = function() {
  new tiemposcambian.GuardandoPNGs().init();
};