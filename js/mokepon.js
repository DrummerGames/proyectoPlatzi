//variables de la funcion IniciarJuego
const botonPersonajeJugador = document.getElementById('boton-personaje')
const botonReiniciar = document.getElementById("boton-reiniciar")
//variable de la funcion seleccionarPersonajeJugador

const spanPersonajeJugador = document.getElementById("personaje-jugador")
const spanPersonajeOponente = document.getElementById("personaje-oponente")

//variables de la funcion seleccionarAtaque
const seccionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const seccionSeleccionarPersonaje = document.getElementById('seleccionar-personaje')
const spanVictoriasJugador = document.getElementById('victoria-jugador')
const spanVictoriasOponente = document.getElementById('victoria-oponente')

//variables de la funcion CrearMensaje
const sectionMensajes = document.getElementById("resultado")
const ataqueDelJugador = document.getElementById('ataque-del-jugador')
const ataqueDelOponente = document.getElementById('ataque-del-oponente')

//variable de la seccion CrearMensajeFinal
const seccionReiniciar = document.getElementById('reiniciar')
//variable para el contenedor de tajetas de personaje
const contenedorTarjetas= document.getElementById('contenedorTarjetas')
const contenedorAtaques= document.getElementById('contenedorAtaques')

let Arreglopersonajes = []
let ataqueJugador = []
let ataqueOponente = []
let opcionesDePersonaje
let inputscorpion
let inputsubzero 
let inputtremor 
let botonFuego
let botonAgua 
let botonTierra 
let botonesAtaque = []
let arregloAtaqueJugador = []
let ataquesDelEnemigo
let indexAtaqueJugador 
let indexAtaqueOponente 
let victoriasJugador = 0
let victoriasOponente = 0
let personajeJugador
let ataquesPersonaje

let resultadoFinal
let veredictoFinal

class Mokepon{
    constructor (nombre, foto, vida){
        this.nombre = nombre
        this.id = nombre
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
        <input type="radio" name="personaje" id=${Mokepon.nombre} />
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

    //EVENTOS DE CLICK PARA QUE LOS ATAQUES FUNCIONEN//
    botonPersonajeJugador.addEventListener('click', seleccionarPersonajeJugador)
    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function seleccionarPersonajeJugador() {
    let inputsubzeroCheck = document.getElementById('Subzero').checked
    let inputscorpionCheck = document.getElementById('Scorpion').checked
    let inputtremorCheck = document.getElementById('Tremor').checked
    

    seccionSeleccionarAtaque.style.display = 'none'
    seccionSeleccionarPersonaje.style.display = 'block'

    if (inputsubzeroCheck==true) {
        spanPersonajeJugador.innerHTML = inputsubzero.id
        personajeJugador = inputsubzero.id
        mostrarSeccionAtaque()
    } else if (inputscorpionCheck==true) {
        spanPersonajeJugador.innerHTML = inputscorpion.id
        personajeJugador = inputscorpion.id
        mostrarSeccionAtaque()
    } else if (inputtremorCheck==true) {
        spanPersonajeJugador.innerHTML = inputtremor.id
        personajeJugador = inputtremor.id
        mostrarSeccionAtaque()
    } else {
        seccionSeleccionarAtaque.style.display = 'none'
        seccionSeleccionarPersonaje.style.display = 'block'
        alert("⚠️ Seleccione un personaje ⚠️")
    }
    extraerAtaques(personajeJugador)
    seleccionarPersonajeOponente()
}

function extraerAtaques(personajeJugador){
let ataques
for (let i = 0; i < Arreglopersonajes.length; i++) {
    if (personajeJugador ===  Arreglopersonajes[i].nombre){
        ataques =  Arreglopersonajes[i].ataques
    }
    
} 
mostrarAtaques(ataques)
}

function mostrarAtaques (ataques){
    ataques.forEach((ataque)=> {
        ataquesPersonaje= `
        <button class="botonera-ataques BAtaques"  id=${ataque.id}>${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesPersonaje

    })
     botonFuego = document.getElementById('boton-fuego')
     botonAgua = document.getElementById('boton-agua')
     botonTierra = document.getElementById('boton-tierra')
     botonesAtaque = document.querySelectorAll ('.BAtaques')
     
}

function secuenciaAtaques(){

    botonesAtaque.forEach((boton)=> {
        boton.addEventListener('click', (e) =>{
            if(e.target.textContent === '🔥'){
                arregloAtaqueJugador.push('FUEGO')
                console.log(arregloAtaqueJugador)
                boton.style.background = '#112f58'  
            } else if (e.target.textContent === '💧'){
                arregloAtaqueJugador.push('AGUA')
                console.log(arregloAtaqueJugador)
                boton.style.background = '#112f58'
            }else{
                arregloAtaqueJugador.push('TIERRA')
                console.log(arregloAtaqueJugador)
                boton.style.background = '#112f58'
            }
                        ataqueAleatorioOponente()
        })

    })
    
}
// solucionar problema con el arreglo del oponente. los ataques estan desordenados

function seleccionarPersonajeOponente() {
    let personajeAleatorio = aleatorio(0, Arreglopersonajes.length -1)
    let spanPersonajeOponente = document.getElementById("personaje-oponente")

    spanPersonajeOponente.innerHTML = Arreglopersonajes[personajeAleatorio].nombre
    ataquesDelEnemigo = Arreglopersonajes[personajeAleatorio].ataques
    secuenciaAtaques()
}

function ataqueAleatorioOponente() {
   let ataqueOponenteAleatorio = aleatorio(0,ataquesDelEnemigo.length -1)

    if (ataqueOponenteAleatorio == 0 || ataqueOponenteAleatorio == 1) {
        ataqueOponente.push('FUEGO')
    } else if (ataqueOponenteAleatorio == 3|| ataqueOponenteAleatorio == 4) {
        ataqueOponente.push('AGUA')
    } else{
         ataqueOponente.push('TIERRA') }

    console.log(ataqueOponente)
  iniciarContienda()
    }

function iniciarContienda(){
    if(arregloAtaqueJugador.length === 5){
        combate()
    }
}

function indexContrincantes(jugador,oponente){
    indexAtaqueJugador =  ataqueJugador[jugador]
    indexAtaqueOponente = ataqueOponente[oponente]
    console.log(indexAtaqueJugador)
    console.log(indexAtaqueOponente)
}


function combate() {

    for (let index = 0; index < arregloAtaqueJugador.length; index++) {
       if (arregloAtaqueJugador [index] === ataquesDelEnemigo[index]){
        
         indexContrincantes(index,index)
             crearMensaje("Empate")
            
       } else if (arregloAtaqueJugador [index] ==="AGUA" && ataquesDelEnemigo[index]=== "FUEGO"){
        indexContrincantes(index,index)
        crearMensaje("Has ganado 🎉")
        victoriasJugador++
        spanVictoriasJugador.innerHTML = victoriasJugador
       } else if (arregloAtaqueJugador [index] ==="TIERRA" && ataquesDelEnemigo[index]=== "AGUA"){
        indexContrincantes(index,index)
        crearMensaje("Has ganado 🎉")
        victoriasJugador++
        spanVictoriasJugador.innerHTML = victoriasJugador
        
       }else if (arregloAtaqueJugador [index] ==="FUEGO" && ataquesDelEnemigo[index]=== "TIERRA"){
        indexContrincantes(index,index)
        crearMensaje("Has ganado 🎉")
        victoriasJugador++
        spanVictoriasJugador.innerHTML = victoriasJugador 
       
        }   else {
            indexContrincantes(index,index)
             crearMensaje("Has perdido 💀")
            victoriasOponente ++
            spanVictoriasOponente.innerHTML = victoriasOponente
       }
      
    }
    veredicto()
}

function veredicto() {
    if (victoriasJugador === victoriasOponente) {
        veredictoFinal = ("Empate 😦")
    } else if (victoriasJugador > victoriasOponente){ 
        veredictoFinal = ("Has ganado!!")
    }else {
        veredictoFinal = ("HAS PERDIDO LA BATALLA, RETIRADA 🏃‍♂️")
    }
}

function crearMensaje() {
    let resultadosAtaqueDelJugador = document.createElement('p')
    let resultadosAtaqueDelOponente = document.createElement('p')

    sectionMensajes.innerHTML = veredictoFinal
    resultadosAtaqueDelJugador.innerHTML = indexAtaqueJugador
    resultadosAtaqueDelOponente.innerHTML = indexAtaqueOponente
    
    ataqueDelJugador.appendChild(resultadosAtaqueDelJugador)
    ataqueDelOponente.appendChild(resultadosAtaqueDelOponente)
}

function crearMensajeFinal() {
        if (victoriasOponente >= victoriasJugador) {
        botonFuego.disabled = true
        botonAgua.disabled = true
        botonTierra.disabled = true
        seccionReiniciar.style.display = 'block'
   
    } else if (victoriasJugador >= victoriasOponente) {
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


