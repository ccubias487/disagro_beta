let navegador = navigator.userAgent;
 if (
   navigator.userAgent.match(/Android/i) ||
   navigator.userAgent.match(/webOS/i) ||
   navigator.userAgent.match(/iPhone/i) ||
   navigator.userAgent.match(/iPad/i) ||
   navigator.userAgent.match(/iPod/i) ||
   navigator.userAgent.match(/BlackBerry/i) ||
   navigator.userAgent.match(/Windows Phone/i)
 ) {
   if (
     window.location.href !=
     "https://marchenhaft.s3.us-east-2.amazonaws.com/fragancias-mobile.html"
   ) {
     //console.log("Estás usando un dispositivo móvil!!");
     window.location.href =
       "https://marchenhaft.s3.us-east-2.amazonaws.com/fragancias-mobile.html";
   }
 } else {
   if (
     window.location.href !=
     "https://marchenhaft.s3.us-east-2.amazonaws.com/fragancias.html"
   ) {
     //console.log("No estás usando un móvil");
     window.location.href =
       "https://marchenhaft.s3.us-east-2.amazonaws.com/fragancias.html";
   }
 }