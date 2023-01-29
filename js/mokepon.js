let botonPersonajeJugador = document.getElementById('boton-personaje')
let botonFuego = document.getElementById('boton-fuego')
let botonAgua = document.getElementById('boton-agua')
let botonTierra = document.getElementById('boton-tierra')
let botonReiniciar = document.getElementById("boton-reiniciar")

let spanPersonajeJugador = document.getElementById("personaje-jugador")

let seccionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
let seccionSeleccionarPersonaje = document.getElementById('seleccionar-personaje')

let ataqueJugador
let ataqueOponente
let resultadoFinal

let vidasJugador = 3
let vidasOponente = 3
let veredictoFinal


function iniciarJuego() {
    let seccionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
    seccionSeleccionarAtaque.style.display = 'none'
    
    let seccionReiniciar = document.getElementById('reiniciar')
    seccionReiniciar.style.display = 'none'
        
    botonPersonajeJugador.addEventListener('click', seleccionarPersonajeJugador)
    botonFuego.addEventListener('click', ataqueFuego)
    botonAgua.addEventListener('click', ataqueAgua)
    botonTierra.addEventListener('click', ataqueTierra)
    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function seleccionarPersonajeJugador() {
    var inputsubzero = document.getElementById('subzero').checked
    var inputscorpion = document.getElementById('scorpion').checked
    var inputtremor = document.getElementById('tremor').checked

    seccionSeleccionarAtaque.style.display = 'none'
    seccionSeleccionarPersonaje.style.display = 'block'

    if (inputsubzero == true) {
        spanPersonajeJugador.innerHTML = "Subzero"
        mostrarSeccionAtaque()
    } else if (inputscorpion == true) {
        spanPersonajeJugador.innerHTML = "Scorpion"
        mostrarSeccionAtaque()
    } else if (inputtremor == true) {
        spanPersonajeJugador.innerHTML = "Tremor"
        mostrarSeccionAtaque()
    } else {
        seccionSeleccionarAtaque.style.display = 'none'
        seccionSeleccionarPersonaje.style.display = 'block'
        alert("⚠️ Seleccione un personaje ⚠️")
    }

    seleccionarPersonajeOponente()
}

function seleccionarPersonajeOponente() {
    let personajeAleatorio = aleatorio(1, 3)
    let spanPersonajeOponente = document.getElementById("personaje-oponente")

    if (personajeAleatorio == 1) {
        spanPersonajeOponente.innerHTML = "Subzero"
    } else if (personajeAleatorio == 2) {
        spanPersonajeOponente.innerHTML = "Scorpion"
    } else {
        spanPersonajeOponente.innerHTML = "Tremor"
    }
}

function ataqueFuego() {
    ataqueJugador = 'Fuego'
    ataqueAleatorioOponente()
    crearMensaje()
    crearMensajeFinal()
}

function ataqueAgua() {
    ataqueJugador = 'Agua'
    ataqueAleatorioOponente()
    crearMensaje()
    crearMensajeFinal()
}

function ataqueTierra() {
    ataqueJugador = 'Tierra'
    ataqueAleatorioOponente()
    crearMensaje()
    crearMensajeFinal()
}

function ataqueAleatorioOponente() {
    ataqueOponente = aleatorio(1, 3)

    if (ataqueOponente == 1) {
        ataqueOponente = 'Fuego'
    } else if (ataqueOponente == 2) {
        ataqueOponente = 'Agua'
    } else {
        ataqueOponente = 'Tierra'
    }

    combate()
}

function combate() {
    let spanvidasJugador = document.getElementById('vida-jugador')
    let spanvidasOponente = document.getElementById('vida-oponente')

    if (ataqueJugador == ataqueOponente) {
        resultadoFinal = ("Empate 🤔")
    } else if (ataqueJugador == "Tierra" && ataqueOponente == "Fuego") {
        resultadoFinal = ("Has ganado 🎉")

        vidasOponente = vidasOponente - 1
        spanvidasOponente.innerHTML = vidasOponente
    }
    else if (ataqueJugador == "Fuego" && ataqueOponente == "Agua") {
        resultadoFinal = ("Has ganado 🎉")

        vidasOponente = vidasOponente - 1
        spanvidasOponente.innerHTML = vidasOponente
    } else {
        resultadoFinal = ("Has perdido 💀")

        vidasJugador = vidasJugador - 1
        spanvidasJugador.innerHTML = vidasJugador
    }

    veredicto()
}

function veredicto() {
    if (vidasOponente == 0) {
        veredictoFinal = ("Has ganado la batalla !FELICITACIONES")
    } else if (vidasJugador == 0) {
        veredictoFinal = ("HAS PERDIDO LA BATALLA, RETIRADA 🏃‍♂️")
    }
}

function crearMensaje() {
    let sectionMensajes = document.getElementById("resultado")
    let ataqueDelJugador = document.getElementById('ataque-del-jugador')
    let ataqueDelOponente = document.getElementById('ataque-del-oponente')

    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelOponente = document.createElement('p')

    sectionMensajes.innerHTML = resultadoFinal
    nuevoAtaqueDelJugador.innerHTML = ataqueJugador
    nuevoAtaqueDelOponente.innerHTML = ataqueOponente
    ataqueDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataqueDelOponente.appendChild(nuevoAtaqueDelOponente)
}

function crearMensajeFinal() {
    let SectionMensajes = document.getElementById("mensajes")
    let parrafo = document.createElement("p")

    if (vidasOponente <= 0) {
        let botonFuego = document.getElementById('boton-fuego')
        let botonAgua = document.getElementById('boton-agua')
        let botonTierra = document.getElementById('boton-tierra')

        botonFuego.disabled = true
        botonAgua.disabled = true
        botonTierra.disabled = true

        let seccionReiniciar = document.getElementById('reiniciar')
        seccionReiniciar.style.display = 'block'
    } else if (vidasJugador <= 0) {
        let botonFuego = document.getElementById('boton-fuego')
        let botonAgua = document.getElementById('boton-agua')
        let botonTierra = document.getElementById('boton-tierra')

        botonFuego.disabled = true
        botonAgua.disabled = true
        botonTierra.disabled = true

        let seccionReiniciar = document.getElementById('reiniciar')
        seccionReiniciar.style.display = 'block'
    }
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function mostrarSeccionAtaque() {
    seccionSeleccionarAtaque.style.display = 'block'
    seccionSeleccionarPersonaje.style.display = 'none'
}

window.addEventListener('load', iniciarJuego)


