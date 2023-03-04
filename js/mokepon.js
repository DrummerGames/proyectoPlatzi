//variables de la funcion IniciarJuego
const botonFuego = document.getElementById('boton-fuego')
const botonPersonajeJugador = document.getElementById('boton-personaje')
const botonAgua = document.getElementById('boton-agua')
const botonTierra = document.getElementById('boton-tierra')
const botonReiniciar = document.getElementById("boton-reiniciar")

//variable de la funcion seleccionarPersonajeJugador

const spanPersonajeJugador = document.getElementById("personaje-jugador")

//variables de la funcion seleccionarAtaque
const seccionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const seccionSeleccionarPersonaje = document.getElementById('seleccionar-personaje')
const spanvidasJugador = document.getElementById('vida-jugador')
const spanvidasOponente = document.getElementById('vida-oponente')

//variables de la funcion CrearMensaje
const sectionMensajes = document.getElementById("resultado")
const ataqueDelJugador = document.getElementById('ataque-del-jugador')
const ataqueDelOponente = document.getElementById('ataque-del-oponente')

//variable de la seccion CrearMensajeFinal
const seccionReiniciar = document.getElementById('reiniciar')
//variable para el contenedor de tajetas de personaje
const contenedorTarjetas= document.getElementById('contenedorTarjetas')

let Arreglopersonajes = []
let ataqueJugador
let ataqueOponente
let opcionesDePersonaje
let  inputscorpion
let  inputsubzero 
let  inputtremor 
let resultadoFinal

let vidasJugador = 3
let vidasOponente = 3
let veredictoFinal

class Mokepon{
    constructor (nombre, foto, vida){
        this.nombre = nombre
        // this.id = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
}
let subzero = new Mokepon ('Subzero', './imagenes/subzero.png', 3)
let scorpion = new Mokepon ('Scorpion', './imagenes/Scorpion.png', 3)
let tremor = new Mokepon ('Tremor', './imagenes/Tremor.png', 3)

subzero.ataques.push(
    {nombre: '💧', id:'boton-agua'},
    {nombre: '💧', id:'boton-agua'}, 
    {nombre: '💧', id:'boton-agua'},
    {nombre: '🔥', id:'boton-fuego'},
    {nombre: '🪨', id:'boton-tierra'},
)

scorpion.ataques.push(
    {nombre: '🔥', id:'boton-fuego'},
    {nombre: '🔥', id:'boton-fuego'}, 
    {nombre: '🔥', id:'boton-fuego'},
    {nombre: '💧', id:'boton-agua'},
    {nombre: '🪨', id:'boton-tierra'},
)

tremor.ataques.push(
    {nombre: '🪨', id:'boton-tierra'},
    {nombre: '🪨', id:'boton-tierra'}, 
    {nombre: '🪨', id:'boton-tierra'},
    {nombre: '🔥', id:'boton-fuego'},
    {nombre: '💧', id:'boton-agua'},
)

Arreglopersonajes.push(subzero,scorpion,tremor)

function iniciarJuego() {
    let seccionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
    seccionSeleccionarAtaque.style.display = 'none'
    
    let seccionReiniciar = document.getElementById('reiniciar')
    seccionReiniciar.style.display = 'none'
    
    Arreglopersonajes.forEach((Mokepon) =>{
        opcionesDePersonaje = `
        <input type="radio" name="personajes" id=${Mokepon.nombre} />
        <label class="tarjeta-personaje" for=${Mokepon.nombre}>
            <p>${Mokepon.nombre} </p>
            <img src="${Mokepon.foto}" alt=${Mokepon.nombre}>
        </label>
        `
    contenedorTarjetas.innerHTML += opcionesDePersonaje

    inputscorpion = document.getElementById('Scorpion')
    inputsubzero  = document.getElementById('Subzero')
    inputtremor  = document.getElementById('Tremor')

    })

    botonPersonajeJugador.addEventListener('click', seleccionarPersonajeJugador)
    botonFuego.addEventListener('click', ataqueFuego)
    botonAgua.addEventListener('click', ataqueAgua)
    botonTierra.addEventListener('click', ataqueTierra)
    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function seleccionarPersonajeJugador() {
    let inputsubzero = document.getElementById('Subzero').checked
    let inputscorpion = document.getElementById('Scorpion').checked
    let inputtremor = document.getElementById('Tremor').checked

    seccionSeleccionarAtaque.style.display = 'none'
    seccionSeleccionarPersonaje.style.display = 'block'

    if (inputsubzero==true) {
        spanPersonajeJugador.innerHTML = inputsubzero.id
        mostrarSeccionAtaque()
    } else if (inputscorpion==true) {
        spanPersonajeJugador.innerHTML = inputscorpion.id
        mostrarSeccionAtaque()
    } else if (inputtremor==true) {
        spanPersonajeJugador.innerHTML = inputtremor.id
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
        spanPersonajeOponente.innerHTML = inputsubzero.id
    } else if (personajeAleatorio == 2) {
        spanPersonajeOponente.innerHTML = inputscorpion.id
    } else {
        spanPersonajeOponente.innerHTML = inputtremor.id
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
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelOponente = document.createElement('p')

    sectionMensajes.innerHTML = resultadoFinal
    nuevoAtaqueDelJugador.innerHTML = ataqueJugador
    nuevoAtaqueDelOponente.innerHTML = ataqueOponente
    ataqueDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataqueDelOponente.appendChild(nuevoAtaqueDelOponente)
}

function crearMensajeFinal() {
        if (vidasOponente <= 0) {
        botonFuego.disabled = true
        botonAgua.disabled = true
        botonTierra.disabled = true
        seccionReiniciar.style.display = 'block'
   
    } else if (vidasJugador <= 0) {
        botonFuego.disabled = true
        botonAgua.disabled = true
        botonTierra.disabled = true
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


