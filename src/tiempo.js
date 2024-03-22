document.addEventListener('DOMContentLoaded', function() {

    document.addEventListener('keypress', function(event){
        
        if (event.key === 'Enter'){
            var inputVerde = document.getElementsByClassName('inputVerde');
            var valorInputVerde = inputVerde[0].value
            
            var inputAmarillo = document.getElementsByClassName('inputAmarillo');
            var valorInputAmarillo = inputAmarillo[0].value
            
            var inputRojo = document.getElementsByClassName('inputRojo');
            var valorInputRojo = inputRojo[0].value;
            

            var amarillo = valorInputAmarillo.split(':')
            var nAmarillo = new Date (0,0,0, amarillo[0], amarillo[1], amarillo[2])
            var verde = valorInputVerde.split(':')
            var nVerde = new Date (0,0,0, verde[0], verde[1], verde[2])
            var rojo = valorInputRojo.split(':')
            var nRojo = new Date (0,0,0, rojo[0], rojo[1], rojo[2])

            console.log(nVerde)
            console.log(nAmarillo)
            console.log(nRojo)

            if(nAmarillo > nRojo){
                if (nAmarillo < nVerde) {
                    if (nVerde > nRojo) {
                        //Si todos los input son menores que el input verde pasa esto
                        
                        const gVerde = inputVerde.value;
                        const gAmarillo = inputAmarillo.value;
                        const gRojo = inputRojo.value
                        localStorage.setItem('inputVerde', gVerde);
                        localStorage.setItem('inputAmarillo', gAmarillo);
                        localStorage.setItem('inputRojo', gRojo);

                    }
                    //Si los input son mayores que el input verde o entre sí, salta error
                    else {
                        console.log("Verde no es mayor que rojo")
                    }
                }
                else {
                    console.log("Amarillo no es menor que verde")
                }
            }
            else {
                console.log("Amarillo no es mayor a rojo")
            }
        }
        else if (event.key === 'R') {
            inputAmarillo.value = "00:00:00"
            inputRojo.value = "00:00:00"
            inputVerde.value = "00:00:00"
        }
    })
    
})


