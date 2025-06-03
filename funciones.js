
        window.dataLayer = window.dataLayer || [];
        function gtag() {
          dataLayer.push(arguments);
        }
        gtag("js", new Date());

        gtag("config", "G-F6HKN8FPNT");
/* FOCUS DE  INPUTS*/
 

document.getElementById('fin').addEventListener('keydown', function() {
if (event.keyCode == 13) {
document.getElementById('comentario').focus();
}
})

 const html = document.documentElement;
 const body = document.body;
 const menuLinks = document.querySelectorAll(".admin-menu a");
 const collapseBtn = document.querySelector(
   ".admin-menu .collapse-btn"
 );
 const toggleMobileMenu = document.querySelector(".toggle-mob-menu");
 const switchInput = document.querySelector(".switch input");
 const switchLabel = document.querySelector(".switch label");
 const switchLabelText = switchLabel.querySelector("span:last-child");
 const collapsedClass = "collapsed";
 const lightModeClass = "light-mode";
 const image = document.createElement("div");
 let notificacion = 0;
 ruta = window.location.pathname.substring(
   0,
   window.location.pathname.lastIndexOf("/") + 1
 );

 //if (localStorage.getItem("user")===""){
 //location.href = ruta + "login.html"}

 /*TOGGLE HEADER STATE*/
 collapseBtn.addEventListener("click", function () {
   body.classList.toggle(collapsedClass);
   this.getAttribute("aria-expanded") == "true"
     ? this.setAttribute("aria-expanded", "false")
     : this.setAttribute("aria-expanded", "true");
   this.getAttribute("aria-label") == "collapse menu"
     ? this.setAttribute("aria-label", "expand menu")
     : this.setAttribute("aria-label", "collapse menu");
 });

 /*TOGGLE MOBILE MENU*/
 toggleMobileMenu.addEventListener("click", function () {
   body.classList.toggle("mob-menu-opened");
   this.getAttribute("aria-expanded") == "true"
     ? this.setAttribute("aria-expanded", "false")
     : this.setAttribute("aria-expanded", "true");
   this.getAttribute("aria-label") == "open menu"
     ? this.setAttribute("aria-label", "close menu")
     : this.setAttribute("aria-label", "open menu");
 });

 /*SHOW TOOLTIP ON MENU LINK HOVER*/
 for (const link of menuLinks) {
   link.addEventListener("mouseenter", function () {
     if (
       body.classList.contains(collapsedClass) &&
       window.matchMedia("(min-width: 768px)").matches
     ) {
       const tooltip = this.querySelector("span").textContent;
       this.setAttribute("title", tooltip);
     } else {
       this.removeAttribute("title");
     }
   });
 }

 /*TOGGLE LIGHT/DARK MODE*/
 if (localStorage.getItem("dark-mode") === "false") {
   html.classList.add(lightModeClass);
   switchInput.checked = false;
   switchLabelText.textContent = "Light";
 }

 switchInput.addEventListener("input", function () {
   html.classList.toggle(lightModeClass);
   if (html.classList.contains(lightModeClass)) {
     switchLabelText.textContent = "Light";
     localStorage.setItem("dark-mode", "false");
   } else {
     switchLabelText.textContent = "Dark";
     localStorage.setItem("dark-mode", "true");
   }
 });

 if (notificacion > 0) {
   document.getElementById("notificaciones").innerHTML =
     '<span class="badge" id="notificacion">' +
     notificacion +
     '</span><svg><use xlink:href="#users"></use></svg>';
 }

 /*ventana flotante de sesion*/
 document
   .getElementById("notificaciones")
   .addEventListener("dblclick", function () {
     if (!!document.getElementById("sesion") === false) {
       if (notificacion > 0) {
         document.getElementById("notificaciones").innerHTML =
           '<span class="badge" id="notificacion">' +
           notificacion +
           '</span><svg><use xlink:href="#users"></use></svg><div id="sesion"><ul><li><div class="icon_cerrar_sesion"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="1.25em" height="1.25em" class="icon_sesionclose" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M24 5H8L8 27H24V5ZM8 2C6.34315 2 5 3.34315 5 5V27C5 28.6569 6.34315 30 8 30H24C25.6569 30 27 28.6569 27 27V5C27 3.34315 25.6569 2 24 2H8Z"></path><path d="M10 8.5C10 7.67157 10.6716 7 11.5 7H20.5C21.3284 7 22 7.67157 22 8.5C22 9.32843 21.3284 10 20.5 10H11.5C10.6716 10 10 9.32843 10 8.5Z"></path><path d="M10 13.5C10 12.6716 10.6716 12 11.5 12H20.5C21.3284 12 22 12.6716 22 13.5C22 14.3284 21.3284 15 20.5 15H11.5C10.6716 15 10 14.3284 10 13.5Z"></path><path d="M10 18.5C10 17.6716 10.6716 17 11.5 17H15.5C16.3284 17 17 17.6716 17 18.5C17 19.3284 16.3284 20 15.5 20H11.5C10.6716 20 10 19.3284 10 18.5Z"></path></svg><a href="notificaciones.html" id="ver_notificaciones"><span>Realizar compra</span></a></div></li></ul></div>';
         document
           .getElementById("cerrar_sesion")
           .addEventListener("click", function () {
             //localStorage.setItem("user","");
             //location.href = ruta + "login.html";
             console.log("cerrar_session");
           });
         return;
       } else {
         document.getElementById("notificaciones").innerHTML =
           '</span><svg><use xlink:href="#users"></use></svg><div id="sesion"><ul><li><a href="#0"><span>Cerrar sesion</span></a></li><li><a href="#0" id="ver_notificaciones"><span>Ver notificaciones</span></a></li></ul></div>';
         document
           .getElementById("cerrar_sesion")
           .addEventListener("click", function () {
             localStorage.setItem("user", "");
             location.href = ruta + "login.html";
             console.log("ok");
           });
         return;
       }
     }

     if (!!document.getElementById("sesion") === true) {
       if (notificacion > 0) {
         document.getElementById("notificaciones").innerHTML =
           '<span class="badge" id="notificacion">' +
           notificacion +
           '</span><svg><use xlink:href="#users"></use></svg>';
         return;
       } else {
         document.getElementById("notificaciones").innerHTML =
           '</span><svg><use xlink:href="#users"></use></svg>';
         return;
       }
     }
   });
 let date = new Date();
 let fecha_actual =
   String(date.getDate()).padStart(2, "0") +
   "/" +
   String(date.getMonth() + 1).padStart(2, "0") +
   "/" +
   date.getFullYear();

 inf = [
   {
     imagen: "perfumes/eros.jpg",
     titulo: "Eros - Versace (Replica)",
     descripcion:
       "El dios mitológico Eros, vuelve a la vida con esta fragancia y personifica el amor y el deseo.",
     precio:
       '<div class="wompi_button_widget" data-url-pago="https://lk.wompi.sv/8irH"></div>',
     clasificacion: "Avainillado",
     presentacion: "100ml",
     genero: "Hombre",
     pago: "$ 22.50",
   },
   {
     imagen: "perfumes/1millon.jpg",
     titulo: "1 Millon - Paco Rabanne (Replica)",
     descripcion:
       "Es una fragancia realmente seductora y atrayente por la masculinidad que transmite en todos los sentidos.",
     precio:
       '<div class="wompi_button_widget" data-url-pago="https://lk.wompi.sv/QEUb"></div>',
     clasificacion: "Amaderado",
     presentacion: "100ml",
     genero: "Hombre",
     pago: "$ 22.50",
   },
   {
     imagen: "perfumes/212vip.jpg",
     titulo: "212 Vip Rose - Carolina H. (Replica)",
     descripcion:
       "Inspirada en la feminidad de las burbujas de una champaña rosada, que inunda de un sentimiento festivo y seductor.",
     precio:
       '<div class="wompi_button_widget" data-url-pago="https://lk.wompi.sv/Ygx2"></div>',
     clasificacion: "Afrutado",
     presentacion: "100ml",
     genero: "Mujer",
     pago: "$ 18.00",
   },
   {
     imagen: "perfumes/acquadiGio.jpg",
     titulo: "Acqua di Gio - Armani (Replica)",
     descripcion:
       "Esta fragancia para hombre es para los amantes de lo clásico, pero que buscan algo más intenso y duradero.",
     precio:
       '<div class="wompi_button_widget" data-url-pago="https://lk.wompi.sv/fXjm"></div>',
     clasificacion: "Citrico",
     presentacion: "100ml",
     genero: "Hombre",
     pago: "$ 20.50",
   },
   {
     imagen: "perfumes/farhrenheit.jpg",
     titulo: "Farhrenheit - Christian Dior (Replica)",
     descripcion:
       "Creatividad y carácter. Esta Fragancia es única, tan masculina como sutil, para los apasionados de la libertad.",
     precio:
       '<div class="wompi_button_widget" data-url-pago="https://lk.wompi.sv/zSMf"></div>',
     clasificacion: "Amaderado",
     presentacion: "50ml",
     genero: "Hombre",
     pago: "$ 12.50",
   },
   {
     imagen: "perfumes/good girl.jpg",
     titulo: "Good Girl - Carolina Herrra (Replica)",
     descripcion:
       "Es una fragancia desafiante y sofisticada a la vez, inspirada en la inconfundible visión de la dualidad de la mujer moderna.",
     precio:
       '<div class="wompi_button_widget" data-url-pago="https://lk.wompi.sv/s3Tq"></div>',
     clasificacion: "Dulce",
     presentacion: "100ml",
     genero: "Mujer",
     pago: "$ 18.50",
   },
   {
     imagen: "perfumes/le male.jpg",
     titulo: "Le Male - Jean Paul Gaultier (Replica)",
     descripcion:
       "Esta fragancia fresca, fuerte y sensual es tu amuleto, el sello de tu virilidad, para disfrutar de la esencia de la vida sin límites",
     precio:
       '<div class="wompi_button_widget" data-url-pago="https://lk.wompi.sv/8rAQ"></div>',
     clasificacion: "Avainillado",
     presentacion: "50/100ml",
     genero: "Hombre",
     pago: "$ 20.50",
   },
   {
     imagen: "perfumes/sauvage.jpg",
     titulo: "Sauvage - Christian Dior (Replica)",
     descripcion:
       "Esta creacion describe a un hombre que vive intensamente y con un instinto salvaje, capaz de seducir a quién se proponga",
     precio:
       '<div class="wompi_button_widget" data-url-pago="https://lk.wompi.sv/Fds9"></div>',
     clasificacion: "Especiado",
     presentacion: "50/100ml",
     genero: "Hombre",
     pago: "$ 20.50",
   },
   {
     imagen: "perfumes/paris hilton.jpg",
     titulo: "Paris Hilton - Paris Hilton (Replica)",
     descripcion:
       "Esta fragancia se ajusta para cualquier ocasión, con un aroma femenino y caprichoso, ideal para trabajo o en la diversion.",
     precio:
       '<div class="wompi_button_widget" data-url-pago="https://lk.wompi.sv/yzhf"></div>',
     clasificacion: "Afrutado",
     presentacion: "100ml",
     genero: "Mujer",
     pago: "$ 19.50",
   },
   {
     imagen: "perfumes/profumo.jpg",
     titulo: "Profumo - Giorgio Armani (Replica)",
     descripcion:
       "En ella se representa al hombre libre, que vive alejado de las masificaciones y artificios, amante de la naturaleza y los aromas puros",
     precio:
       '<div class="wompi_button_widget" data-url-pago="https://lk.wompi.sv/vgQS"></div>',
     clasificacion: "Aromatico",
     presentacion: "100ml",
     genero: "Hombre",
     pago: "$ 18.50",
   },
   {
     imagen: "perfumes/ck one.jpg",
     titulo: "Ck One - Calvin Klein (Replica)",
     descripcion:
       "Es una fragancia unisex diseñada para usar a diario. Un exquisito equilibrio entre frescura, dinamismo y personalidad",
     precio:
       '<div class="wompi_button_widget" data-url-pago="https://lk.wompi.sv/kVjE"></div>',
     clasificacion: "Citrico",
     presentacion: "100ml",
     genero: "Hombre",
     pago: "$ 18.50",
   },
   {
     imagen: "perfumes/Bottled2.jpg",
     titulo: "Bottled - Hugo Boss (Replica)",
     descripcion:
       "Presenta una frescura elegante para el día pero además, también toques especiados. Es perfecta para salir de noche.",
     precio:
       '<div class="wompi_button_widget" data-url-pago="https://lk.wompi.sv/FZuy"></div>',
     clasificacion: "Amaderado",
     presentacion: "100ml",
     genero: "Hombre",
     pago: "$  18.50",
   },
   {
     imagen: "perfumes/clinique.jpg",
     titulo: "Happy Clinique - Clinique (Replica)",
     descripcion:
       "La particular frescura de esta fragancia le aporta un tono muy casual y espontáneo, lleno de naturalidad, pensado para amenizar nuestro día a día.",
     precio:
       '<div class="wompi_button_widget" data-url-pago="https://lk.wompi.sv/MCid"></div>',
     clasificacion: "Citrico",
     presentacion: "100ml",
     genero: "Hombre",
     pago: "$ 18.50",
   },
   {
     imagen: "perfumes/daisy.jpg",
     titulo: "Daisy - Marc Jacobs (Replica)",
     descripcion:
       "Esta fragancia evoca a ese momento del día en el que el sol se pone y baña los campos de margaritas de un tono dorado.",
     precio:
       '<div class="wompi_button_widget" data-url-pago="https://lk.wompi.sv/1oEx"></div>',
     clasificacion: "Floral",
     presentacion: "100ml",
     genero: "Mujer",
     pago: "$ 18.50",
   },
   {
     imagen: "perfumes/the essence.jpg",
     titulo: "The Essence - David Beckham (Replica)",
     descripcion:
       "La búsqueda de una fragancia fresca y audaz. Contiene un aroma seductor es ideal para hombres seguros y aventureros",
     precio:
       '<div class="wompi_button_widget" data-url-pago="https://lk.wompi.sv/zWQ4"></div>',
     clasificacion: "Afrutado",
     presentacion: "100ml",
     genero: "Hombre",
     pago: "$ 20.00",
   },
   {
     imagen: "perfumes/woman-ralph lauren.jpg",
     titulo: "Woman - Ralph Lauren (Replica)",
     descripcion:
       "Una fragancia que transmite el empoderamiento femenino y celebra la afirmación de ser una mujer exitosa, que diseña sus propios sueños",
     precio:
       '<div class="wompi_button_widget" data-url-pago="https://lk.wompi.sv/1PSy"></div>',
     clasificacion: "Floral",
     presentacion: "100ml",
     genero: "Mujer",
     pago: "$ 19.50",
   },
   {
     imagen: "perfumes/swiss army.jpg",
     titulo: "Swiss Army - Victorinox (Replica)",
     descripcion:
       "Este Perfume es un clásico que captura la esencia de los Alpes suizos. Como quienes la usan, esta fragancia es atemporal y elegante.",
     precio:
       '<div class="wompi_button_widget" data-url-pago="https://lk.wompi.sv/KdYw"></div>',
     clasificacion: "Amaderado",
     presentacion: "100ml",
     genero: "Hombre",
     pago: "$ 20.00",
   },
   {
     imagen: "perfumes/212 vip men.jpg",
     titulo: "212 Vip Men - Carolina H. (Replica)",
     descripcion:
       "Una fragancia que se reconoce inmediatamente en la pista de baile.Para un hombre elegante, sofisticado y deseado. ¡El rey de las fiestas más exclusivas!.",
     precio:
       '<div class="wompi_button_widget" data-url-pago="https://lk.wompi.sv/2LC4"></div>',
     clasificacion: "Aromatico",
     presentacion: "100ml",
     genero: "Hombre",
     pago: "$ 20.00",
   },
   {
     imagen: "perfumes/360 for woman.jpg",
     titulo: "360 for  Women - Carolina H. (Replica)",
     descripcion:
       "Es una fragancia femenina, para las mujeres sofisticadas y de buen gusto, así que podrás fácilmente llevarlo cualquier día de la semana.",
     precio:
       '<div class="wompi_button_widget" data-url-pago="https://lk.wompi.sv/HiiZ"></div>',
     clasificacion: "Citrico",
     presentacion: "100ml",
     genero: "Mujer",
     pago: "$ 18.00",
   },
   {
     imagen: "perfumes/360 for  man.jpg",
     titulo: "360 for Men - Carolina H. (Replica)",
     descripcion:
       "Rompe la rutina sin perder el aroma clásico fresco al agua. Esta fragancia tiene un estilo entre el informal deportivo y el semiformal social.",
     precio:
       '<div class="wompi_button_widget" data-url-pago="https://lk.wompi.sv/BQrX"></div>',
     clasificacion: "Aromatico",
     presentacion: "100ml",
     genero: "Hombre",
     pago: "$ 18.00",
   },
   {
     imagen: "perfumes/anai anais.jpg",
     titulo: "Anais Anais - Cacharel. (Replica)",
     descripcion:
       "Este aroma es femenino al extremo y habla de la pureza y la frescura del espíritu. Respira el aroma y flota en la inocencia de un jardín inglés en verano.",
     precio:
       '<div class="wompi_button_widget" data-url-pago="https://lk.wompi.sv/z6zT"></div>',
     clasificacion: "Floral",
     presentacion: "100ml",
     genero: "Mujer",
     pago: "$ 18.00",
   },
   {
     imagen: "perfumes/bleu.jpg",
     titulo: "Bleu - Chanel. (Replica)",
     descripcion:
       "Bleu, más allá de levantar odios o pasiones, representa una fragancia que agrada a todo aquel que la percibe por su elegancia y masculinidad.",
     precio:
       '<div class="wompi_button_widget" data-url-pago="https://lk.wompi.sv/U6yA"></div>',
     clasificacion: "Citrico",
     presentacion: "100ml",
     genero: "Hombre",
     pago: "$ 20.00",
   },
   {
     imagen: "perfumes/channel 5.jpg",
     titulo: "Chanel #5 - Chanel. (Replica)",
     descripcion:
       "es una fragancia que se ha convertido en un emblema en el mundo de la perfumería, después de 100 años su legado permanece.",
     precio:
       '<div class="wompi_button_widget" data-url-pago="https://lk.wompi.sv/E14n"></div>',
     clasificacion: "Floral",
     presentacion: "100ml",
     genero: "Mujer",
     pago: "$ 19.50",
   },
   {
     imagen: "perfumes/invictus.jpg",
     titulo: "Invictus - Paco Rabanne. (Replica)",
     descripcion:
       "Un verdadero dios, un héroe del Olimpo. Invictus tiene la actitud correcta y un ego elevado que lo hacen ser el mejor en todo.",
     precio:
       '<div class="wompi_button_widget" data-url-pago="https://lk.wompi.sv/Stje"></div>',
     clasificacion: "Citrico",
     presentacion: "100ml",
     genero: "Hombre",
     pago: "$ 20.50",
   },
   {
     imagen: "perfumes/can can.jpg",
     titulo: "Can Can - Paris Hilton. (Replica)",
     descripcion:
       "Es una fragancia femenina que trae ingredientes aptos para utilizarse en cualquier ocasión. Su combinación hace de esta fragancia un producto único",
     precio:
       '<div class="wompi_button_widget" data-url-pago="https://lk.wompi.sv/buW8"></div>',
     clasificacion: "Afrutado",
     presentacion: "100ml",
     genero: "Mujer",
     pago: "$ 19.50",
   },
   {
     imagen: "perfumes/essencial.jpg",
     titulo: "Essencial - Lacoste. (Replica)",
     descripcion:
       "Es una fragancia divertida para un hombre con espíritu libre, juguetón y clásico. Para los hombres sin ataduras que disfruta de ser él mismo.",
     precio:
       '<div class="wompi_button_widget" data-url-pago="https://lk.wompi.sv/4h7L"></div>',
     clasificacion: "Citrico",
     presentacion: "100ml",
     genero: "Hombre",
     pago: "$ 20.00",
   },
   {
     imagen: "perfumes/eternity air.jpg",
     titulo: "Eternity Air - Calvin Klein. (Replica)",
     descripcion:
       "Estamos ante una fragancia luminosa y delicada. Que se posa sobre la piel como un delicado velo, impregnándonos de bienestar y calma",
     precio:
       '<div class="wompi_button_widget" data-url-pago="https://lk.wompi.sv/RZJ1"></div>',
     clasificacion: "Citrico",
     presentacion: "100ml",
     genero: "Mujer",
     pago: "$ 19.00",
   },
   {
     imagen: "perfumes/hugo boss men.jpg",
     titulo: "Hugo Man - Hugo Boss. (Replica)",
     descripcion:
       "Una fragancia aromática y fresca, que te acompañará a encontrar tu propio camino. En un mundo lleno de reglas, Hugo te impulsa a desafiarlas.",
     precio:
       '<div class="wompi_button_widget" data-url-pago="https://lk.wompi.sv/wSXi"></div>',
     clasificacion: "Amaderado",
     presentacion: "100ml",
     genero: "Hombre",
     pago: "$ 19.00",
   },
   {
     imagen: "perfumes/jadore.jpg",
     titulo: "J'adore - Christian Dior. (Replica)",
     descripcion:
       "Este perfume es una apuesta segura para la obtención de excelentes resultados y muchos halagos en cualquier ocasión.",
     precio:
       '<div class="wompi_button_widget" data-url-pago="https://lk.wompi.sv/QDZm"></div>',
     clasificacion: "Floral",
     presentacion: "100ml",
     genero: "Mujer",
     pago: "$ 22.50",
   },
   {
     imagen: "perfumes/lacoste red.jpg",
     titulo: "Lacoste Red - Lacoste. (Replica)",
     descripcion:
       "es una fragancia para aquellos hombres que aman la acción, pero que no quieren dejar de lucir y oler muy bien.",
     precio:
       '<div class="wompi_button_widget" data-url-pago="https://lk.wompi.sv/zcfM"></div>',
     clasificacion: "Amaderado",
     presentacion: "100ml",
     genero: "Hombre",
     pago: "$ 18.50",
   },
   {
     imagen: "perfumes/olympea2.jpg",
     titulo: "Olympea - Paco Rabanne (Replica)",
     descripcion:
       "Un aroma único y que representa a la mujer victoriosa, moderna, determinada y elegante de hoy día, eso es lo que trae para cautivar y seducir.",
     precio:
       '<div class="wompi_button_widget" data-url-pago="https://lk.wompi.sv/2u7K"></div>',
     clasificacion: "Avainillado",
     presentacion: "100ml",
     genero: "Mujer",
     pago: "$ 20.50",
   },
   {
     imagen: "perfumes/pour femme.jpg",
     titulo: "Pour Femme - Lacoste (Replica)",
     descripcion:
       "Las características que nos aporta este perfume. Una dulzura inocente, pero seductora, que se combina con un frescor desenfadado.",
     precio:
       '<div class="wompi_button_widget" data-url-pago="https://lk.wompi.sv/FBYB"></div>',
     clasificacion: "Floral",
     presentacion: "100ml",
     genero: "Mujer",
     pago: "$ 19.00",
   },
   {
     imagen: "perfumes/code.jpg",
     titulo: "Code - Giorgio Armani (Replica)",
     descripcion:
       "Con este perfume, las noches más inesperadas se convertirán en momentos únicos e inolvidables.",
     precio:
       '<div class="wompi_button_widget" data-url-pago="https://lk.wompi.sv/gd6r"></div>',
     clasificacion: "Citrico",
     presentacion: "100ml",
     genero: "Hombre",
     pago: "$ 18.50",
   },
   {
     imagen: "perfumes/purr.jpg",
     titulo: "Purr - Katy Perry (Replica)",
     descripcion:
       "Una combinación perfecta entre dulzura y acidez, esto le trae muy buenas críticas por hacer de la mujer un ser que irradia grandes logros.",
     precio:
       '<div class="wompi_button_widget" data-url-pago="https://lk.wompi.sv/WATH"></div>',
     clasificacion: "Afrutado",
     presentacion: "100ml",
     genero: "Mujer",
     pago: "$ 19.00",
   },
   {
     imagen: "perfumes/hallowen.jpg",
     titulo: "Hallowen - J. del Pozo (Replica)",
     descripcion:
       "Una fragancia fresca, llena de fuerza y vitalidad que muestra a la perfección el espíritu rebelde y dinámico.",
     precio:
       '<div class="wompi_button_widget" data-url-pago="https://lk.wompi.sv/tRHH"></div>',
     clasificacion: "Floral",
     presentacion: "100ml",
     genero: "Mujer",
     pago: "$ 19.00",
   },
   {
     imagen: "perfumes/coconut.jpg",
     titulo: "Coconut - Victoria's Secret (Replica)",
     descripcion:
       "Este delicioso perfume para el cuerpo combina notas florales, para refrescar y perfumar nuestra piel.",
     precio:
       '<div class="wompi_button_widget" data-url-pago="https://lk.wompi.sv/8NX6"></div>',
     clasificacion: "Avainillado",
     presentacion: "100ml",
     genero: "Mujer",
     pago: "$ 19.00",
   },
   {
     imagen: "perfumes/gentleman.jpg",
     titulo: "Gentleman - Givenchy (Replica)",
     descripcion:
       "Una exclusiva fragancia floral amaderada inspirada en el refinamiento suave y aromático del whisky. ",
     precio:
       '<div class="wompi_button_widget" data-url-pago="https://lk.wompi.sv/bzWo"></div>',
     clasificacion: "Amaderado",
     presentacion: "50ml",
     genero: "Hombre",
     pago: "$ 12.50",
   },
   {
     imagen: "perfumes/crush.jpg",
     titulo: "Crush- Victoria Secrect (Replica)",
     descripcion:
       "Crush es una fragancia coqueta. Es un aroma fresco femenino, exótico y seductor.",
     precio:
       '<div class="wompi_button_widget" data-url-pago="https://lk.wompi.sv/iMBK"></div>',
     clasificacion: "Floral",
     presentacion: "100ml",
     genero: "Mujer",
     pago: "$ 19.00",
   },
   {
     imagen: "perfumes/fahrenheit 32.jpg",
     titulo: "Fahrenheit 32 - Christian Dior (Replica)",
     descripcion:
       "El calor desprendido por sus notas, aportan a este perfume un carácter más acorde a momentos nocturnos, sea cual sea el nivel de formalidad.",
     precio:
       '<div class="wompi_button_widget" data-url-pago="https://lk.wompi.sv/13W5"></div>',
     clasificacion: "Especiado",
     presentacion: "50ml",
     genero: "Hombre",
     pago: "$ 12.50",
   },
   {
     imagen: "perfumes/fame.jpg",
     titulo: "Fame - Paco Rabanne (Replica)",
     descripcion:
       "Compuesta por un jazmín excepcionalmente puro, un suculento mango y un cremoso incienso adictivamente sensual.",
     precio:
       '<div class="wompi_button_widget" data-url-pago="https://lk.wompi.sv/35va"></div>',
     clasificacion: "Floral",
     presentacion: "100ml",
     genero: "Mujer",
     pago: "$ 20.00",
   },
   {
     imagen: "perfumes/le beau.jpg",
     titulo: "Le Beau - Jean Paul Gaultier (Replica)",
     descripcion:
       "Cada adicción tiene su secreto. La de este perfume es un intenso amaderado de ámbar, madera de sándalo y del haba tonka.",
     precio:
       '<div class="wompi_button_widget" data-url-pago="https://lk.wompi.sv/qjVx"></div>',
     clasificacion: "Amaderado",
     presentacion: "100ml",
     genero: "Hombre",
     pago: "$ 20.00",
   },
   {
     imagen: "perfumes/mademoiselle- chanel.jpg",
     titulo: "Mademoiselle- Chanel (Replica)",
     descripcion:
       "Un perfume paradójico, rico y con estilo, que rinde homenaje a la mujer sofisticada y libre que disfruta de si misma y de su vida.",
     precio:
       '<div class="wompi_button_widget" data-url-pago="https://lk.wompi.sv/WFBr"></div>',
     clasificacion: "Floral",
     presentacion: "100ml",
     genero: "Mujer",
     pago: "$ 19.50",
   },
   {
     imagen: "perfumes/pi.jpg",
     titulo: "Pi - Givenchy (Replica)",
     descripcion:
       "Como bien sabemos, Pi es un número infinito. En esta fragancia representa la masculinidad infinita, un hombre con carácter y una personalidad muy definida. ",
     precio:
       '<div class="wompi_button_widget" data-url-pago="https://lk.wompi.sv/7EkG"></div>',
     clasificacion: "Amaderado",
     presentacion: "100ml",
     genero: "Hombre",
     pago: "$ 20.50",
   },
   {
     imagen: "perfumes/pink.jpg",
     titulo: "Pink Sugar - Aquolina (Replica)",
     descripcion:
       "Destellos dulces y placenteros te invitan a sumergirte en un mundo fantasioso, en el que seras las protagonistas de un increíble cuento de hadas.",
     precio:
       '<div class="wompi_button_widget" data-url-pago="https://lk.wompi.sv/XjB7"></div>',
     clasificacion: "Floral",
     presentacion: "100ml",
     genero: "Mujer",
     pago: "$ 16.50",
   },
   {
     imagen: "perfumes/caramel.jpg",
     titulo: "Caramel Orchid - Kim Kardashian (Replica)",
     descripcion:
       "Capturan la belleza de las fragancias florales, verdes y frutales con la ayuda de algunos acordes curiosos como un acorde de aire de invernadero.",
     precio:
       '<div class="wompi_button_widget" data-url-pago="https://lk.wompi.sv/MXzx"></div>',
     clasificacion: "Avainillado",
     presentacion: "100ml",
     genero: "Mujer",
     pago: "$ 19.50",
   },
   {
     imagen: "perfumes/nautica.jpg",
     titulo: "Nautica Blue - Nautica (Replica)",
     descripcion:
       "Disfruta de una fragancia fresca, que te brinda un aroma con toque acuaticos. Un aroma refrescante e informal con notas de lavanda, rosa, musgo, ámbar y almizcle.",
     precio:
       '<div class="wompi_button_widget" data-url-pago="https://lk.wompi.sv/Qn4M"></div>',
     clasificacion: "Aromatico",
     presentacion: "100ml",
     genero: "Hombre",
     pago: "$ 20.50",
   },
 ];

 if (Number(localStorage.getItem("compra")) > 0) {
   compra = Number(localStorage.getItem("compra"));
   document.getElementById("compra_carrito").innerHTML =
     '<span class="greeting" id="carrito">$ ' + compra + "</span>";
 } else {
   document.getElementById("compra_carrito").innerHTML =
     '<span class="greeting" id="carrito">$ 0.00</span>';
 }

 function agregar_carrito(valor) {
   compra =
     Number(localStorage.getItem("compra")) +
     Number(document.getElementById(valor.id * -1).innerText);
   nombre = document.getElementById(
     "titulo" + valor.id * -1
   ).innerText;
   precio_perfume = document.getElementById(valor.id * -1).innerText;
   console.log(
     document.getElementById("titulo" + valor.id * -1).innerText
   );
   console.log(document.getElementById(valor.id * -1).innerText);
   document.getElementById("compra_carrito").innerHTML =
     '<span class="greeting" id="carrito">$ ' + compra + "</span>";
   localStorage.setItem("compra", compra);
   if (localStorage.getItem("lista_compra") == null) {
     lista_existente = [];
   } else {
     lista_existente = JSON.parse(
       localStorage.getItem("lista_compra")
     );
   }
   lista_pedido = [{ nombre: nombre, precio: precio_perfume }];

   lista_existente.push(lista_pedido);
   nuevo = JSON.stringify(lista_existente);
   localStorage.setItem(
     "lista_compra",
     JSON.stringify(lista_existente)
   );
   console.log(lista_existente);
 }

 for (i = 0; i <= inf.length - 1; i++) {
   //console.log(i)
   let agregar = document.getElementById("caja_botones").innerHTML;
   let nuevo =
     '<div class="tabla"><div class="imagen"><img src="https://marchenhaft.s3.us-east-2.amazonaws.com/' +
     inf[i].imagen +
     '" alt="" class="imagenpost"></div><div class="titulo"><p class="titulo_texto" id="titulo' +
     i +
     '">' +
     inf[i].titulo +
     '</p></div><div class="descripcion"><p class="descripcion_texto">' +
     inf[i].descripcion +
     '</p></div><div  class="detalles" id="detalles' +
     i +
     '"><div class="clasificacion">' +
     inf[i].clasificacion +
     '</div><div class="presentacion">' +
     inf[i].presentacion +
     '</div><div class="genero">' +
     inf[i].genero +
     '</div></div><div class="precio"><div class="carrito-precio"> <svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1.25em" viewBox="0 0 32 32" class="svg-icon normal s-mr-05 fill white-700 undefined" fill="yellow"><g><path d="M24.0003 26.6177C23.9997 27.1872 24.1966 27.7394 24.5575 28.18C24.9183 28.6207 25.4209 28.9225 25.9794 29.0342C26.5379 29.1458 27.1178 29.0604 27.6204 28.7923C28.123 28.5243 28.5171 28.0903 28.7355 27.5642C28.9539 27.0382 28.9832 26.4527 28.8183 25.9076C28.6534 25.3624 28.3046 24.8913 27.8313 24.5745C27.3579 24.2577 26.7894 24.1148 26.2225 24.1702C25.6556 24.2256 25.1255 24.4758 24.7225 24.8783C24.4897 25.1035 24.3056 25.374 24.1813 25.6732C24.0571 25.9723 23.9955 26.2938 24.0003 26.6177Z"></path><rect x="7" y="2" width="2" height="7" rx="1" transform="rotate(90 7 2)"></rect><rect x="11.0105" y="21.7759" width="2" height="20.1162" rx="1" transform="rotate(167.811 11.0105 21.7759)"></rect><rect x="8.93015" y="24.5331" width="2" height="4.07966" rx="1" transform="rotate(-150 8.93015 24.5331)"></rect><rect x="8" y="24" width="2" height="21" rx="1" transform="rotate(-90 8 24)"></rect><rect x="32" y="4" width="2" height="26" rx="1" transform="rotate(90 32 4)"></rect><rect x="32" y="17" width="2" height="13" rx="1" transform="rotate(-180 32 17)"></rect><rect x="31.84" y="15" width="2" height="23.8096" rx="1" transform="rotate(83.3797 31.84 15)"></rect><path d="M7.3851 26.6173C7.38504 27.187 7.5825 27.739 7.94385 28.1793C8.3052 28.6196 8.80806 28.921 9.36673 29.0321C9.9254 29.1431 10.5053 29.0571 11.0076 28.7885C11.5099 28.5199 11.9035 28.0854 12.1214 27.5591C12.3392 27.0328 12.3679 26.4472 12.2023 25.9022C12.0368 25.3572 11.6874 24.8864 11.2136 24.5702C10.7399 24.2539 10.1711 24.1117 9.6043 24.1678C9.03746 24.2239 8.50763 24.4749 8.10509 24.8779C7.87264 25.1033 7.68883 25.3739 7.56499 25.6731C7.44116 25.9722 7.37994 26.2936 7.3851 26.6173V26.6173Z"></path></g> </svg>' +
     inf[i].pago +
     ' </div><div class="cantidad" id=' +
     i +
     "></div>" +
     inf[i].precio +
     "</div>";
   document.getElementById("caja_botones").innerHTML = agregar + nuevo;
   //this.document.getElementById("agregar").addEventListener("click",agregar_carrito())
   // console.log((agregar)+nuevo)

   let borde = document.getElementById("detalles" + i);
   borde.style.borderLeft =
     "5px solid var(--" + inf[i].clasificacion + ")";
 }

 //<svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1.25em" viewBox="0 0 32 32" class="svg-icon normal s-mr-05 fill white-700 undefined" fill="yellow"><g><path d="M24.0003 26.6177C23.9997 27.1872 24.1966 27.7394 24.5575 28.18C24.9183 28.6207 25.4209 28.9225 25.9794 29.0342C26.5379 29.1458 27.1178 29.0604 27.6204 28.7923C28.123 28.5243 28.5171 28.0903 28.7355 27.5642C28.9539 27.0382 28.9832 26.4527 28.8183 25.9076C28.6534 25.3624 28.3046 24.8913 27.8313 24.5745C27.3579 24.2577 26.7894 24.1148 26.2225 24.1702C25.6556 24.2256 25.1255 24.4758 24.7225 24.8783C24.4897 25.1035 24.3056 25.374 24.1813 25.6732C24.0571 25.9723 23.9955 26.2938 24.0003 26.6177Z"></path><rect x="7" y="2" width="2" height="7" rx="1" transform="rotate(90 7 2)"></rect><rect x="11.0105" y="21.7759" width="2" height="20.1162" rx="1" transform="rotate(167.811 11.0105 21.7759)"></rect><rect x="8.93015" y="24.5331" width="2" height="4.07966" rx="1" transform="rotate(-150 8.93015 24.5331)"></rect><rect x="8" y="24" width="2" height="21" rx="1" transform="rotate(-90 8 24)"></rect><rect x="32" y="4" width="2" height="26" rx="1" transform="rotate(90 32 4)"></rect><rect x="32" y="17" width="2" height="13" rx="1" transform="rotate(-180 32 17)"></rect><rect x="31.84" y="15" width="2" height="23.8096" rx="1" transform="rotate(83.3797 31.84 15)"></rect><path d="M7.3851 26.6173C7.38504 27.187 7.5825 27.739 7.94385 28.1793C8.3052 28.6196 8.80806 28.921 9.36673 29.0321C9.9254 29.1431 10.5053 29.0571 11.0076 28.7885C11.5099 28.5199 11.9035 28.0854 12.1214 27.5591C12.3392 27.0328 12.3679 26.4472 12.2023 25.9022C12.0368 25.3572 11.6874 24.8864 11.2136 24.5702C10.7399 24.2539 10.1711 24.1117 9.6043 24.1678C9.03746 24.2239 8.50763 24.4749 8.10509 24.8779C7.87264 25.1033 7.68883 25.3739 7.56499 25.6731C7.44116 25.9722 7.37994 26.2936 7.3851 26.6173V26.6173Z"></path></g> </svg> $<div class="cantidad" id='+i+'>'+inf[i].precio+'<input type="button" value="Agregar" id="-'+i+'" class="boton" onclick = agregar_carrito(this)>
 let elemento = document.getElementsByClassName("boton");

 //console.log(elemento)

 //for (let i = 0; i < elemento.length; i++) {
 //    elemento[i].onclick = agregar_carrito(this)

 //}

 
