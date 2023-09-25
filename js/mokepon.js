let indiceArray = 0;
let jugadorId = null
let arrayPersonajes = []
let arrayAtaqueJugador1 = []
let arrayAtaqueJugador2 = []
let personajeJugador1
let personajeJugador2
let personajeJugadorObjeto

let opcionesDePersonaje
let inputscorpion
let inputsubzero
let inputtremor

let botonFuego
let botonAgua
let botonTierra
let botonesAtaque = []

let ataquesJugador1 = []
let ataquesJugador2 = []

let indexAtaqueJugador1
let indexAtaqueJugador2
let victoriasJugador1 = 0
let victoriasJugador2 = 0

let resultadoFinal
let veredictoFinal
let lienzo = mapa.getContext('2d')
let intervalo
let mapaBackground = new Image()
mapaBackground.src = './imagenes/mokemap.png'

let subzero = new Mokepon('Subzero', './imagenes/subzero.png', 3, './imagenes/subzero-head.png')
let scorpion = new Mokepon('Scorpion', './imagenes/Scorpion.png', 3, './imagenes/scorpion-head.png')
let tremor = new Mokepon('Tremor', './imagenes/Tremor.png', 3, './imagenes/tremor-head.png')

let subzeroOponente = new Mokepon('Subzero', './imagenes/subzero.png', 3, './imagenes/subzero-head.png', 80, 330)
let scorpionOponente = new Mokepon('Scorpion', './imagenes/Scorpion.png', 3, './imagenes/scorpion-head.png', 130, 90)
let tremorOponente = new Mokepon('Tremor', './imagenes/Tremor.png', 3, './imagenes/tremor-head.png', 180, 10)

arrayPersonajes.push(subzero, scorpion, tremor)
setearAtaquesPersonajes()

function unirseAlJuego(){
    fetch("http://localhost:8080/unirse")
        .then(function (res) {
        if (res.ok){
             res.text()
            .then(function(respuesta){
                console.log(respuesta);
                jugadorId = respuesta
            })
         }
    })
}

function seleccionarPersonaje(personajeJugador1) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}`,{
        method:"post",
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify({
            mokepon:personajeJugador1

        })
    })
}

function iniciarJuego() {
    elementosUI.seccionSeleccionarAtaque.style.display = 'none'
    elementosUI.sectionVerMapa.style.display = 'none'
    elementosUI.seccionReiniciar.style.display = 'none'

    arrayPersonajes.forEach((Mokepon) => {
        opcionesDePersonaje = `
        <input type="radio" name="personaje" id=${Mokepon.nombre} />
        <label class="tarjeta-personaje" for=${Mokepon.nombre}>
            <p>${Mokepon.nombre} </p>
            <img src="${Mokepon.foto}" alt=${Mokepon.nombre}>
        </label>
        `
        contenedorTarjetas.innerHTML += opcionesDePersonaje

        inputscorpion = document.getElementById('Scorpion')
        inputsubzero = document.getElementById('Subzero')
        inputtremor = document.getElementById('Tremor')
    })

    elementosUI.botonPersonajeJugador.addEventListener('click', seleccionarPersonajeJugador1)
    elementosUI.botonReiniciar.addEventListener('click', reiniciarJuego)
    unirseAlJuego()
}

function seleccionarPersonajeJugador1() {
    let inputsubzeroCheck = document.getElementById('Subzero').checked
    let inputscorpionCheck = document.getElementById('Scorpion').checked
    let inputtremorCheck = document.getElementById('Tremor').checked

    elementosUI.seccionSeleccionarPersonaje.style.display = 'block'

    if (inputsubzeroCheck == true) {
        elementosUI.spanPersonajeJugador.innerHTML = inputsubzero.id
        personajeJugador1 = inputsubzero.id
        mostrarSeccionAtaque()
    } else if (inputscorpionCheck == true) {
        elementosUI.spanPersonajeJugador.innerHTML = inputscorpion.id
        personajeJugador1 = inputscorpion.id
        mostrarSeccionAtaque()
    } else if (inputtremorCheck == true) {
        elementosUI.spanPersonajeJugador.innerHTML = inputtremor.id
        personajeJugador1 = inputtremor.id
        mostrarSeccionAtaque()
    } else {
        elementosUI.seccionSeleccionarAtaque.style.display = 'none'
        elementosUI.seccionSeleccionarPersonaje.style.display = 'block'
        alert("⚠️ Seleccione un personaje ⚠️")
    }
    
    seleccionarPersonaje(personajeJugador1)

    extraerAtaques(personajeJugador1)
    iniciarMapa()
    elementosUI.sectionVerMapa.style.display = 'flex'
}

function mostrarSeccionAtaque() {
    elementosUI.seccionSeleccionarPersonaje.style.display = 'none'
}

function extraerAtaques(personajeJugador1) {
    let ataques
    for (let i = 0; i < arrayPersonajes.length; i++) {
        if (personajeJugador1 === arrayPersonajes[i].nombre) {
            ataques = arrayPersonajes[i].ataques
        }
    }

    mostrarAtaques(ataques)
}


function mostrarAtaques(ataques) {
    const ataquesHTML = ataques.map((ataque) => `
        <button class="botonera-ataques BAtaques" id=${ataque.id}>${ataque.nombre}</button>
    `).join('');

    contenedorAtaques.innerHTML = ataquesHTML;

    botonFuego = document.getElementById('boton-fuego')
    botonAgua = document.getElementById('boton-agua')
    botonTierra = document.getElementById('boton-tierra')
    botonesAtaque = document.querySelectorAll('.BAtaques')
}

function seleccionarPersonajeOponente() {
    elementosUI.spanPersonajeOponente.innerHTML = personajeJugador2.nombre
    ataquesJugador2 = personajeJugador2.ataques
    secuenciaAtaques()

}

function secuenciaAtaques() {
    botonesAtaque.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === '🔥') {
                arrayAtaqueJugador1.push('FUEGO')
                boton.style.background = '#112f58'
                boton.disabled = true
            } else if (e.target.textContent === '💧') {
                arrayAtaqueJugador1.push('AGUA')
                boton.style.background = '#112f58'
                boton.disabled = true
            } else {
                arrayAtaqueJugador1.push('TIERRA')
                boton.style.background = '#112f58'
                boton.disabled = true
            }
            ataqueAleatorioJugador2()
        })
    })
}

function ataqueAleatorioJugador2() { 
    // se le pasa por  parametro una variable referente al personaje que se va a usar a la funcion para que se quede con un personaje especifico.
    const availableAttacks = personajeJugador2.ataques;
    
    if (availableAttacks.length > 0) {
        const indiceAleatorio = aleatorio(0, availableAttacks.length - 1);
        const ataqueAleatorio = availableAttacks.splice(indiceAleatorio, 1)[0];
        const nombreAtaque = equivalenciaAtaques[ataqueAleatorio.nombre];

        arrayAtaqueJugador2.push(nombreAtaque);
    }

    combate()
}

function combate() {
    if (arrayAtaqueJugador1[indiceArray] === arrayAtaqueJugador2[indiceArray]) {
        indexContrincantes(indiceArray, indiceArray)
        crearMensaje("Empate 🤔")
    } else if (arrayAtaqueJugador1[indiceArray] === "TIERRA" && arrayAtaqueJugador2[indiceArray] === "AGUA") {
        indexContrincantes(indiceArray, indiceArray)
        victoriasJugador1++
        elementosUI.spanVictoriasJugador1.innerHTML = victoriasJugador1
        crearMensaje("HAS GANADO! 🎉")
    } else if (arrayAtaqueJugador1[indiceArray] === "FUEGO" && arrayAtaqueJugador2[indiceArray] === "TIERRA") {
        indexContrincantes(indiceArray, indiceArray)
        victoriasJugador1++
        elementosUI.spanVictoriasJugador1.innerHTML = victoriasJugador1
        crearMensaje("HAS GANADO! 🎉")
    } else if (arrayAtaqueJugador1[indiceArray] === "AGUA" && arrayAtaqueJugador2[indiceArray] === "FUEGO") {
        indexContrincantes(indiceArray, indiceArray)
        victoriasJugador1++
        elementosUI.spanVictoriasJugador1.innerHTML = victoriasJugador1
        crearMensaje("HAS GANADO! 🎉")
    } else {
        indexContrincantes(indiceArray, indiceArray)
        crearMensaje("Has perdido 💀")
        elementosUI.seccionReiniciar.style.display = 'block'
        victoriasJugador2++
        elementosUI.spanVictoriasJugador2.innerHTML = victoriasJugador2
    }

    if (arrayAtaqueJugador1.length === 5) {
        veredicto()
    }
    indiceArray++;
}

function indexContrincantes(jugador, oponente) {
    indexAtaqueJugador1 = arrayAtaqueJugador1[jugador]
    indexAtaqueJugador2 = arrayAtaqueJugador2[oponente]
}

function veredicto() {
    if (victoriasJugador1 === victoriasJugador2) {
        veredictoFinal = ("Empate 😦")
        elementosUI.seccionReiniciar.style.display = 'block'
    } else if (victoriasJugador1 > victoriasJugador2) {
        veredictoFinal = ("Has ganado!!")
        elementosUI.seccionReiniciar.style.display = 'block'
    } else {
        veredictoFinal = ("HAS PERDIDO LA BATALLA, RETIRADA 🏃‍♂️")
        elementosUI.seccionReiniciar.style.display = 'block'
    }
    crearMensajeFinal(veredictoFinal);
}

function crearMensaje(mensaje) {
    let resultadoFinal = document.getElementById("resultado-final");
    let resultadosAtaqueDelJugador1 = document.createElement('p')
    let resultadosAtaqueDelJugador2 = document.createElement('p')

    elementosUI.sectionMensajes.innerHTML = mensaje
    resultadosAtaqueDelJugador1.innerHTML = indexAtaqueJugador1
    resultadosAtaqueDelJugador2.innerHTML = indexAtaqueJugador2
    resultadoFinal.innerHTML = mensaje

    elementosUI.ataqueDelJugador.appendChild(resultadosAtaqueDelJugador1)
    elementosUI.ataqueDelOponente.appendChild(resultadosAtaqueDelJugador2)
}

function crearMensajeFinal(mensajeFinal) {
    elementosUI.sectionMensajes.innerHTML = mensajeFinal
    elementosUI.seccionReiniciar.style.display = 'block'
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function pintarCanvas() {
    personajeJugadorObjeto.x = personajeJugadorObjeto.x + personajeJugadorObjeto.velocidadX
    personajeJugadorObjeto.y = personajeJugadorObjeto.y + personajeJugadorObjeto.velocidadY

    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.height,
        mapa.width
    )
    personajeJugadorObjeto.pintarPersonaje()

    enviarPosicion (personajeJugadorObjeto.x, personajeJugadorObjeto.y)


    subzeroOponente.pintarPersonaje()
    scorpionOponente.pintarPersonaje()
    tremorOponente.pintarPersonaje()

    if (personajeJugadorObjeto.velocidadX !== 0 || personajeJugadorObjeto.velocidadY !== 0) {
        revisarColisiones(tremorOponente)
        revisarColisiones(subzeroOponente)
        revisarColisiones(scorpionOponente)
    }
}

function enviarPosicion(x,y){
    fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`,{
    method:"post",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
            x,
            y
            })
        })
        .then(function(res){
            if (res.ok) {
                res.json()

                .then(function({enemigos}) {
                    console.log(enemigos)
                })
            }
        })
}

function moverDerecha() {
    personajeJugadorObjeto.velocidadX = 5
}
function moverIzquierda() {
    personajeJugadorObjeto.velocidadX = -5
}
function moverAbajo() {
    personajeJugadorObjeto.velocidadY = 5
}

function moverArriba() {
    personajeJugadorObjeto.velocidadY = -5
}
function detenerMovimiento() {
    personajeJugadorObjeto.velocidadX = 0
    personajeJugadorObjeto.velocidadY = 0
}

function sePrecionoUnaTecla(event) {
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break
        case 'ArrowDown':
            moverAbajo()
            break
        case 'ArrowLeft':
            moverIzquierda()
            break
        case 'ArrowRight':
            moverDerecha()
            break
        default:
            break;
    }
}

function iniciarMapa() {
    personajeJugadorObjeto = obtenerPersonajeElegido(personajeJugador1)
    mapa.width = 600
    mapa.height = 600
    intervalo = setInterval(pintarCanvas, 50)
    window.addEventListener('keydown', sePrecionoUnaTecla);
    window.addEventListener('keyup', detenerMovimiento)
}
function obtenerPersonajeElegido() {
    for (let i = 0; i < arrayPersonajes.length; i++) {
        if (personajeJugador1 === arrayPersonajes[i].nombre) {
            return arrayPersonajes[i]
        }
    }
}

function revisarColisiones(personajeOponente) {
    const arribaJugador2 = personajeOponente.y
    const abajoJugador2 = personajeOponente.y + personajeOponente.alto
    const derechaJugador2 = personajeOponente.x + personajeOponente.ancho
    const izquierdaJugador2 = personajeOponente.x

    const arribaJugador1 = personajeJugadorObjeto.y
    const abajoJugador1 = personajeJugadorObjeto.y + personajeJugadorObjeto.alto
    const derechaJugador1 = personajeJugadorObjeto.x + personajeJugadorObjeto.ancho
    const izquierdaJugador1 = personajeJugadorObjeto.x

    if (
        abajoJugador1 < arribaJugador2 ||
        arribaJugador1 > abajoJugador2 ||
        derechaJugador1 < izquierdaJugador2 ||
        izquierdaJugador1 > derechaJugador2
    ) {
        return
    }
    /* Esta wea te coge el frame donde se quedo en la variable "animationID" y se lo mete frio
     * a la funcion "cancelAnimationFrame" pa que se pare el jodio canva del diablo
     * 
     * A pesar de que esta wea majomeno da la talla, hay que buscar la panera de freezar el canva del
     * cohoyo....
     */
    let animationId = requestAnimationFrame(pintarCanvas)
    cancelAnimationFrame(animationId)

    detenerMovimiento()
    clearInterval(intervalo)
    elementosUI.sectionVerMapa.style.display = 'none'
    elementosUI.seccionSeleccionarAtaque.style.display = 'block'
    personajeJugador2 = personajeOponente
    seleccionarPersonajeOponente()
}

function ingresarAtaqueJugador(personaje, ataquesPersonaje) {
    personaje.ataques = ataquesPersonaje
}

function setearAtaquesPersonajes() {
    const personajesConAtaques = [subzero, scorpion, tremor, subzeroOponente, scorpionOponente, tremorOponente];
    const ataquesPorPersonaje = [ataquesAgua, ataquesFuego, ataquesTierra];

    personajesConAtaques.forEach((personaje, index) => {
        ingresarAtaqueJugador(personaje, ataquesPorPersonaje[index % ataquesPorPersonaje.length]);
    });
}

window.addEventListener('load', iniciarJuego)
