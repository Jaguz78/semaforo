document.addEventListener('DOMContentLoaded', function() {
    viejoVerde = localStorage.getItem('inputVerde');
    console.log(viejoVerde)
    viejoAmarillo = localStorage.getItem('inputAmarillo')
    console.log(viejoAmarillo)
    viejoRojo = localStorage.getItem('inputRojo')
    console.log(viejoRojo)

    document.addEventListener('keypress', function(event){
        
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

            if(nAmarillo > nRojo){
                if (nAmarillo < nVerde) {
                    if (nVerde > nRojo) {
                        //Si todos los input son menores que el input verde pasa esto
                        localStorage.setItem('inputVerde', valorInputVerde);
                        localStorage.setItem('inputAmarillo', valorInputAmarillo);
                        localStorage.setItem('inputRojo', valorInputRojo);
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
            var inputVerde = document.getElementsByClassName('inputVerde');
            inputVerde.innerHTML = '00:00:00'
            
        }
    })
    
})


