if (localStorage.getItem("usuario")== null){
  window.location.href = "index.html";
}

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

    // Desktop canvas events
    canvas.onmousedown = function(e) {
      startDrawing(e.layerX, e.layerY);
      mousePressed = true;
    };
    canvas.onmousemove = function(e) {
      if (mousePressed) {
        draw(e.layerX, e.layerY);
      }
    };
    canvas.onmouseup = function() {
      mousePressed = false;
    };
    canvas.onmouseleave = function() {
      mousePressed = false;
    };

    // Touch events for mobile
    canvas.addEventListener('touchstart', function(e) {
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      startDrawing(touch.clientX - rect.left, touch.clientY - rect.top);
      mousePressed = true;
      e.preventDefault();
    });

    canvas.addEventListener('touchmove', function(e) {
      if (mousePressed) {
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        draw(touch.clientX - rect.left, touch.clientY - rect.top);
      }
      e.preventDefault();
    });

    canvas.addEventListener('touchend', function() {
      mousePressed = false;
    });
  }

  function startDrawing(x, y) {
    lastX = x;
    lastY = y;
  }

  function draw(x, y) {
    if (mousePressed) {
      ctx.beginPath();
      ctx.strokeStyle = document.getElementById('color').value;
      ctx.lineWidth = 8;
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
    localStorage.setItem("firma_user", data);
    window.location.href = "principal.html";
  }
  
  function resetCanvas() {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  return {
    'init': init
  };
})();

window.onload = function() {
    tiemposcambian.GuardandoPNGs.init();
  };
