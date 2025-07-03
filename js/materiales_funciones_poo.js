class SesionUsuario {
    static verificarSesion() {
        if (!localStorage.getItem("usuario")) window.location.href = "index.html";
    }
}

class GuardarLocalStorage {
    static obtener(clave) {
        localStorage.getItem(clave);
    }

    static guardar(clave, valor) {
        localStorage.setItem(clave, valor)
    }

    static eliminar(clave) {
        localStorage.removeItem(clave)
    }
}

class Navegacion {
    static boton_pagina(boton, pagina) {
        document.getElementById(boton).addEventListener("click", function () {
            window.location.href = pagina
        })
    }

    static recargar() {
        window.addEventListener("pageshow", (event) => {
            if (event.persisted) {
                // La página viene desde la caché, forzar recarga
                window.location.reload();
            }
        });
    }

    static nuevapaginatemporal(url, tiempo = 5000) {
        const nuevaVentana = window.open(url, '_blank');

        if (!nuevaVentana) {
            console.log("El navegador bloqueó la ventana emergente.");
            return;
        }

        setTimeout(() => {
            nuevaVentana.close();
            console.log("La ventana ha sido cerrada.");
        }, tiempo);
    }

    static mensajesindatos(datos) {
        if ((datos == null) || (datos.length === 0)) {
            let aleatorio_image =
                "https://raw.githubusercontent.com/ccubias487/disagro_beta/disagro_beta1.0/imagenes_proyecto/empty" +
                numeroAleatorio(1, 3) +
                ".png";

            const div = document.getElementById("no_encontrado");
            const imagen = document.createElement("img");
            imagen.src = aleatorio_image;
            imagen.alt = "No encontrado";
            imagen.style.width = "400px";
            imagen.style.height = "400px";
            div.appendChild(imagen);
            document.getElementById("no_encontrado_texto").innerHTML =
                "NO SE ENCOTRARON INSUMOS PARA ESTA ORDEN";
            document.getElementById("no_encontrado_texto").style.fontSize =
                "xx-large";
            document.getElementById("no_encontrado_texto").style.fontWeight = "bold";
            document.getElementById("no_encontrado_texto").style.color = "White";
            document.getElementById("boton_siguiente").innerHTML = "Iniciar orden";
        } else {
            const div = document.getElementById("no_encontrado");
            const imagen = document.createElement("img");
            //imagen.src = aleatorio_image;
            imagen.alt = "No encontrado";
            imagen.style.width = "0px";
            imagen.style.height = "0px";
            div.appendChild(imagen);
            document.getElementById("no_encontrado_texto").innerHTML = "";

        }
    }
}


class Fecha {
    static actual() {
        const ahora = new Date();
        const dia = String(ahora.getDate()).padStart(2, '0');
        const mes = String(ahora.getMonth() + 1).padStart(2, '0'); // +1 porque los meses empiezan en 0
        const año = String(ahora.getFullYear()).slice(-2); // Solo los últimos 2 dígitos

        const horas = String(ahora.getHours()).padStart(2, '0');
        const minutos = String(ahora.getMinutes()).padStart(2, '0');
        const segundos = String(ahora.getSeconds()).padStart(2, '0');

        return `${dia}/${mes}/${año} ${horas}:${minutos}:${segundos}`;
    }

    static diferencia(inicio, fin) {
        const diff = new Date(fin) - new Date(inicio);
        if (diff < 0) return "La segunda fecha debe ser posterior a la primera";
        const totalSeg = Math.floor(diff / 1000);
        const h = Math.floor(totalSeg / 3600);
        const m = Math.floor((totalSeg % 3600) / 60);
        const s = totalSeg % 60;
        return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }

    static diferenciafecha(fecha1, fecha2) {
        const inicio = new Date(fecha1);
        const fin = new Date(fecha2);

        // Calcular la diferencia en milisegundos
        const diferenciaMilisegundos = fin - inicio;

        if (diferenciaMilisegundos < 0) {
            return "La segunda fecha debe ser posterior a la primera";
        }

        const segundosTotales = Math.floor(diferenciaMilisegundos / 1000);
        const horas = Math.floor(segundosTotales / 3600);
        const minutos = Math.floor((segundosTotales % 3600) / 60);
        const segundos = segundosTotales % 60;

        return `${String(horas).padStart(2, "0")}:${String(minutos).padStart(
            2,
            "0"
        )}:${String(segundos).padStart(2, "0")}`;
    }
}
