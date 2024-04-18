document.addEventListener('DOMContentLoaded', function() {
    viejoVerde = localStorage.getItem('inputVerde');
    console.log(viejoVerde)
    viejoAmarillo = localStorage.getItem('inputAmarillo')
    console.log(viejoAmarillo)
    viejoRojo = localStorage.getItem('inputRojo')
    console.log(viejoRojo)
    var intervaloVerde, intervaloAmarillo, intervaloRojo;
    var tiempoRestante = 0;
    var temporizadorPausado = false;
    var horaPausa;

    function iniciarTemporizador(verde, amarillo, rojo) {
        var temporizador = document.querySelector('.temporizador');
		var amarilloString = localStorage.getItem('inputAmarillo');
		var rojoString = localStorage.getItem('inputRojo');

        //Actualizar el temporizador
        function actualizarTemporizador(tiempo) {
            var horas = tiempo.getHours().toString().padStart(2, '0');
            var minutos = tiempo.getMinutes().toString().padStart(2, '0');
            var segundos = tiempo.getSeconds().toString().padStart(2, '0');
            temporizador.textContent = horas + ':' + minutos + ':' + segundos;
        }
        
        //Temporizador verde
        alert("empezara verde")
        intervaloVerde = setInterval(function() {
            verde.setSeconds(verde.getSeconds() - 1);
            actualizarTemporizador(verde);
            if (temporizador.textContent === amarilloString) {
                clearInterval(intervaloVerde);
                //Temporizador amarillo
                alert("empezara amarillo")
                intervaloAmarillo = setInterval(function() {
                    amarillo.setSeconds(amarillo.getSeconds() - 1);
                    actualizarTemporizador(amarillo);
                    if (temporizador.textContent === rojoString) {
                        clearInterval(intervaloAmarillo);
                        //Temporizador rojo
                        alert("empezara rojo")
                        intervaloRojo = setInterval(function() {
                            rojo.setSeconds(rojo.getSeconds() - 1);
                            actualizarTemporizador(rojo);
                            if (temporizador.textContent === "00:00:00") {
                                clearInterval(intervaloRojo);
                                temporizador.textContent = '00:00:00';
                            }
                        }, 1000);
                    }
                }, 1000);
            }
        }, 1000);
        
    }

    
    function pausarTemporizador() {
        // Detener el temporizador
        clearInterval(intervaloVerde);
        clearInterval(intervaloAmarillo);
        clearInterval(intervaloRojo);

        // Actualizar el estado del temporizador
        temporizadorPausado = true;
        tiempoRestante = obtenerTiempoRestante();
        horaPausa = new Date();

        // Mostrar el tiempo pausado en el HTML
        var tiempoPausado = document.querySelector('.temporizador').textContent;
        document.querySelector('.temporizador').textContent = tiempoPausado;
    }

    function reanudarTemporizador() {
        temporizadorPausado = false; // Actualizar el estado del temporizador
        iniciarTemporizador(obtenerNuevoTiempo(tiempoRestante), new Date(), new Date()); // Reiniciar el temporizador con nuevos valores
        
    
    }

    function reiniciarTemporizador() {
        alert("¡Se ha reiniciado el temporizador!")
        clearInterval(intervaloVerde);
        clearInterval(intervaloAmarillo);
        clearInterval(intervaloRojo);
    
        document.querySelector('.temporizador').textContent = '00:00:00';
        tiempoRestante = 0;
        temporizadorPausado = false;
    }

    function obtenerTiempoRestante() {
        var tiempoActual = document.querySelector('.temporizador').textContent;
        var tiempo = tiempoActual.split(':');
        return (parseInt(tiempo[0]) * 3600) + (parseInt(tiempo[1]) * 60) + parseInt(tiempo[2]);
    }
    
    function obtenerNuevoTiempo(tiempoRestante) {
        var horas = Math.floor(tiempoRestante / 3600);
        var minutos = Math.floor((tiempoRestante % 3600) / 60);
        var segundos = tiempoRestante % 60;
        return new Date(0, 0, 0, horas, minutos, segundos);
    }
	
    
    document.addEventListener('keyup', function(event){
        
        if (event.key === 'Enter'){
            var inputVerde = document.getElementsByClassName('inputVerde');
            var valorInputVerde = inputVerde[0].value
            console.log(valorInputVerde)
            
            var inputAmarillo = document.getElementsByClassName('inputAmarillo');
            var valorInputAmarillo = inputAmarillo[0].value
            console.log(valorInputAmarillo)
            
            var inputRojo = document.getElementsByClassName('inputRojo');
            var valorInputRojo = inputRojo[0].value;
            console.log(valorInputRojo)
            

            var amarillo = valorInputAmarillo.split(':')
            var nAmarillo = new Date (0,0,0, amarillo[0], amarillo[1], amarillo[2])
            var verde = valorInputVerde.split(':')
            var nVerde = new Date (0,0,0, verde[0], verde[1], verde[2])
            var rojo = valorInputRojo.split(':')
            var nRojo = new Date (0,0,0, rojo[0], rojo[1], rojo[2])

            console.log(nVerde)
            console.log(nAmarillo)
            console.log(nRojo)

            if(isNaN(nVerde.getTime()) || isNaN(nAmarillo.getTime()) || isNaN(nRojo.getTime())) {
                mostrarNotificacion('Error, revise que las entradas sean solo números', 'error');
            }
            else {
                if(nAmarillo > nRojo){
                    if (nAmarillo < nVerde) {
                        if (nVerde > nRojo) {
                            //Si todos los input son menores que el input verde pasa esto
                            localStorage.setItem('inputVerde', valorInputVerde);
                            localStorage.setItem('inputAmarillo', valorInputAmarillo);
                            localStorage.setItem('inputRojo', valorInputRojo);
                            iniciarTemporizador(nVerde, nAmarillo, nRojo);
                        }
                        //Si los input son mayores que el input verde o entre sí, salta error
                        else {
                            mostrarNotificacion('Error, verde no es mayor que rojo', 'error');
                            console.log("Verde no es mayor que rojo")
                        }
                    }
                    else {
                        mostrarNotificacion('Error, amarillo no es menor que verde', 'error');
                        console.log("Amarillo no es menor que verde")
                    }
                }
                else {
                    mostrarNotificacion('Error, amarillo no es mayor que rojo', 'error');
                    console.log("Amarillo no es mayor a rojo")
                }
            }
        }
        else if (event.key === 'r' || event.key === 'R') {
            reiniciarTemporizador()
        }
        else if (event.key === ' '){
            if (temporizadorPausado) {
                reanudarTemporizador();
            } else {
                pausarTemporizador();
            }
        }
    })
    
    function mostrarNotificacion(mensaje, tipo) {
        // Crear elemento de notificación
        var notificacion = document.createElement('div');
        notificacion.textContent = mensaje;
        notificacion.classList.add('notification', tipo);
    
        
        var contenedor = document.getElementById('notification-container');
        contenedor.appendChild(notificacion);
    
        
        setTimeout(function() {
            contenedor.removeChild(notificacion);
        }, 3000);
    }

})

