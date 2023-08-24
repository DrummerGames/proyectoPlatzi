//variables de la funcion IniciarJuego
const botonPersonajeJugador = document.getElementById('boton-personaje')
const botonReiniciar = document.getElementById("boton-reiniciar")
//variable de la funcion seleccionarPersonajeJugador

const spanPersonajeJugador = document.getElementById("personaje-jugador")
const spanPersonajeOponente = document.getElementById("personaje-oponente")

//variables de la funcion seleccionarAtaque
const seccionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const seccionSeleccionarPersonaje = document.getElementById('seleccionar-personaje')
const spanVictoriasJugador1 = document.getElementById('victoria-jugador')
const spanVictoriasJugador2 = document.getElementById('victoria-oponente')

//variables de la funcion CrearMensaje
const sectionMensajes = document.getElementById("resultado-final")
const ataqueDelJugador = document.getElementById('ataque-del-jugador')
const ataqueDelOponente = document.getElementById('ataque-del-oponente')

//variable de la seccion CrearMensajeFinal
const seccionReiniciar = document.getElementById("reiniciar")
//variable para el contenedor de tajetas de personaje
const contenedorTarjetas= document.getElementById('contenedorTarjetas')
const contenedorAtaques= document.getElementById('contenedorAtaques')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById ('mapa')




let indiceArray = 0;

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


class Mokepon {
    constructor (nombre, foto, vida,fotoMapa, x = 10, y = 10){
        this.nombre = nombre
        this.id = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.x = x
        this.y = y
        this.ancho= 70
        this. alto =70
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa 
        this.velocidadX = 0
        this.velocidadY= 0  
    }
     pintarPersonaje() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto      
        )
     }

}


let subzero = new Mokepon ('Subzero', './imagenes/subzero.png', 3, './imagenes/subzero-head.png')
let scorpion = new Mokepon ('Scorpion', './imagenes/Scorpion.png', 3,'./imagenes/scorpion-head.png')
let tremor = new Mokepon ('Tremor', './imagenes/Tremor.png', 3, './imagenes/tremor-head.png')

let subzeroOponente = new Mokepon ('Subzero', './imagenes/subzero.png', 3, './imagenes/subzero-head.png',80,330 )
let scorpionOponente = new Mokepon ('Scorpion', './imagenes/Scorpion.png', 3,'./imagenes/scorpion-head.png',130,90)
let tremorOponente = new Mokepon ('Tremor', './imagenes/Tremor.png', 3, './imagenes/tremor-head.png', 180,10)

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

arrayPersonajes.push(subzero,scorpion,tremor)

function iniciarJuego() {
   
    seccionSeleccionarAtaque.style.display = 'none'
    sectionVerMapa.style.display = 'none'
    seccionReiniciar.style.display = 'none'
    
    arrayPersonajes.forEach((Mokepon) =>{
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

    botonPersonajeJugador.addEventListener('click', seleccionarPersonajeJugador1)
    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function seleccionarPersonajeJugador1() {
    let inputsubzeroCheck = document.getElementById('Subzero').checked
    let inputscorpionCheck = document.getElementById('Scorpion').checked
    let inputtremorCheck = document.getElementById('Tremor').checked
      
    seccionSeleccionarPersonaje.style.display = 'block'
    

    if (inputsubzeroCheck==true) {
        spanPersonajeJugador.innerHTML = inputsubzero.id
        personajeJugador1 = inputsubzero.id
        mostrarSeccionAtaque()
    } else if (inputscorpionCheck==true) {
        spanPersonajeJugador.innerHTML = inputscorpion.id
        personajeJugador1 = inputscorpion.id
        mostrarSeccionAtaque()
    } else if (inputtremorCheck==true) {
        spanPersonajeJugador.innerHTML = inputtremor.id
        personajeJugador1 = inputtremor.id
        mostrarSeccionAtaque()
    } else {
        seccionSeleccionarAtaque.style.display = 'none'
        seccionSeleccionarPersonaje.style.display = 'block'
        alert("⚠️ Seleccione un personaje ⚠️")
    }
    extraerAtaques(personajeJugador1)
    iniciarMapa()
    sectionVerMapa.style.display = 'flex'  
}

function mostrarSeccionAtaque() {
    seccionSeleccionarPersonaje.style.display = 'none'    
    
}
     
    function extraerAtaques(personajeJugador1) {
    let ataques
    for (let i = 0; i < arrayPersonajes.length; i++) {
        if (personajeJugador1 ===  arrayPersonajes[i].nombre){
            ataques =  arrayPersonajes[i].ataques
        }
    }
    
    mostrarAtaques(ataques)
} 


function mostrarAtaques (ataques) { 
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

function seleccionarPersonajeOponente(personajeJugador2) {
   
     spanPersonajeOponente.innerHTML = personajeJugador2.nombre
     ataquesJugador2 = personajeJugador2.ataques
     secuenciaAtaques()
   
   
    // personajeJugador2 = aleatorio (0, arrayPersonajes.length - 1);
    // let spanPersonajeJugador2 = document.getElementById("personaje-oponente");
    // spanPersonajeJugador2.innerHTML = arrayPersonajes[personajeJugador2].id;
    // secuenciaAtaques(personajeJugador2); // Pasar el personaje seleccionado como parámetro
}

function secuenciaAtaques() {
    botonesAtaque.forEach((boton)=> {
        boton.addEventListener('click', (e) =>{
            if (e.target.textContent === '🔥'){
                arrayAtaqueJugador1.push('FUEGO')
                boton.style.background = '#112f58'
                boton.disabled = true  
            } else if (e.target.textContent === '💧'){
                arrayAtaqueJugador1.push('AGUA')
                boton.style.background = '#112f58'
                boton.disabled = true
            }else{
                arrayAtaqueJugador1.push('TIERRA')
                boton.style.background = '#112f58'
                boton.disabled = true
            }
            ataqueAleatorioJugador2()
        })
    })   
}
  
function ataqueAleatorioJugador2(personajeJugador2) { // se le pasa por  parametro una variable referente al personaje que se va a usar a la funcion para que se quede con un personaje especifico 
    let setAtaquesPersonaje = arrayPersonajes[personajeJugador2].ataques;
    let equivalenciaAtaques = {
      '🪨': 'TIERRA', 
      '🔥': 'FUEGO',    
      '💧': 'AGUA'      
    };  
    
    if (setAtaquesPersonaje.length > 0) {        
        let indiceAleatorio = aleatorio(0, setAtaquesPersonaje.length - 1); 
        let ataqueAleatorio = setAtaquesPersonaje[indiceAleatorio]; 
        let nombreAtaque = equivalenciaAtaques[ataqueAleatorio.nombre]; 
      
        arrayAtaqueJugador2.push(nombreAtaque);
        setAtaquesPersonaje.splice(indiceAleatorio, 1); 
    }
       
    combate()
}

function combate() {
    if (arrayAtaqueJugador1[indiceArray] === arrayAtaqueJugador2[indiceArray]) {
        indexContrincantes(indiceArray,indiceArray)
        crearMensaje("Empate 🤔")
    } else if (arrayAtaqueJugador1 [indiceArray] === "TIERRA" && arrayAtaqueJugador2[indiceArray]=== "AGUA"){
        indexContrincantes(indiceArray,indiceArray)
        victoriasJugador1++
        spanVictoriasJugador1.innerHTML = victoriasJugador1
        crearMensaje("HAS GANADO! 🎉") 
    } else if (arrayAtaqueJugador1 [indiceArray] ==="FUEGO" && arrayAtaqueJugador2[indiceArray]=== "TIERRA"){
        indexContrincantes(indiceArray,indiceArray)
        victoriasJugador1++
        spanVictoriasJugador1.innerHTML = victoriasJugador1
        crearMensaje("HAS GANADO! 🎉")
    } else if (arrayAtaqueJugador1 [indiceArray] === "AGUA" && arrayAtaqueJugador2[indiceArray]=== "FUEGO"){
        indexContrincantes(indiceArray,indiceArray)
        victoriasJugador1++
        spanVictoriasJugador1.innerHTML = victoriasJugador1
        crearMensaje("HAS GANADO! 🎉")
    } else {
        indexContrincantes(indiceArray,indiceArray)
        crearMensaje("Has perdido 💀")
        seccionReiniciar.style.display = 'block'  
        victoriasJugador2++
        spanVictoriasJugador2.innerHTML = victoriasJugador2
    }

    if (arrayAtaqueJugador1.length === 5) {
        veredicto()
    }
    indiceArray++;
}

function indexContrincantes(jugador,oponente) {
    indexAtaqueJugador1 =  arrayAtaqueJugador1[jugador]
    indexAtaqueJugador2 = arrayAtaqueJugador2[oponente]       
}

function veredicto() {
    if (victoriasJugador1 === victoriasJugador2) {
        veredictoFinal = ("Empate 😦")
        seccionReiniciar.style.display = 'block'  
    } else if (victoriasJugador1 > victoriasJugador2){ 
        veredictoFinal = ("Has ganado!!")
        seccionReiniciar.style.display = 'block'  
    } else {
        veredictoFinal = ("HAS PERDIDO LA BATALLA, RETIRADA 🏃‍♂️")
        seccionReiniciar.style.display = 'block'  
    }
    crearMensajeFinal(veredictoFinal);
}

function crearMensaje(mensaje) {
    let resultadoFinal = document.getElementById("resultado-final");
    let resultadosAtaqueDelJugador1 = document.createElement('p')
    let resultadosAtaqueDelJugador2 = document.createElement('p')
    
    sectionMensajes.innerHTML = mensaje
    resultadosAtaqueDelJugador1.innerHTML = indexAtaqueJugador1
    resultadosAtaqueDelJugador2.innerHTML = indexAtaqueJugador2
    resultadoFinal.innerHTML = mensaje

    ataqueDelJugador.appendChild(resultadosAtaqueDelJugador1)
    ataqueDelOponente.appendChild(resultadosAtaqueDelJugador2)
}

function crearMensajeFinal(mensajeFinal) {
    sectionMensajes.innerHTML = mensajeFinal
    seccionReiniciar.style.display = 'block'
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function pintarCanvas(){
    personajeJugadorObjeto.x = personajeJugadorObjeto.x + personajeJugadorObjeto.velocidadX
    personajeJugadorObjeto.y = personajeJugadorObjeto.y + personajeJugadorObjeto.velocidadY
    lienzo.clearRect(0,0, mapa.width, mapa.height)
    lienzo.drawImage(
       mapaBackground,
       0,
       0,
       mapa.height,
       mapa.width
    )
    personajeJugadorObjeto.pintarPersonaje()
    subzeroOponente.pintarPersonaje()
    scorpionOponente.pintarPersonaje()
    tremorOponente.pintarPersonaje()
    if (personajeJugadorObjeto.velocidadX !==0 || personajeJugadorObjeto.velocidadY !==0){
      
        revisarColisiones (tremorOponente)
        revisarColisiones (subzeroOponente)
        revisarColisiones (scorpionOponente)
    }
}
  

function moverDerecha(){
    personajeJugadorObjeto.velocidadX = 5
}
function moverIzquierda(){
    personajeJugadorObjeto.velocidadX = -5
}
function moverAbajo(){
    personajeJugadorObjeto.velocidadY = 5
}

function moverArriba(){
    personajeJugadorObjeto.velocidadY = -5
}
function detenerMovimiento(){
   
   
    personajeJugadorObjeto.velocidadX = 0
    personajeJugadorObjeto.velocidadY = 0
}

function sePrecionoUnaTecla (event){
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

function iniciarMapa(){
    personajeJugadorObjeto = obtenerPersonajeElegido (personajeJugador1)
    mapa.width = 600
    mapa.height = 600
    intervalo = setInterval(pintarCanvas, 50)
    window.addEventListener('keydown', sePrecionoUnaTecla);
    window.addEventListener('keyup', detenerMovimiento)
}
function obtenerPersonajeElegido(){
    for (let i = 0; i < arrayPersonajes.length; i++) {
        if (personajeJugador1 ===  arrayPersonajes[i].nombre){
            return arrayPersonajes [i]
        }
    }

}

function revisarColisiones(personajeJugador2){
   const arribaJugador2 = personajeJugador2.y
   const abajoJugador2 = personajeJugador2.y + personajeJugador2. alto
   const derechaJugador2 = personajeJugador2.x + personajeJugador2.ancho
   const izquierdaJugador2 = personajeJugador2.x
    
   const arribaJugador1 = personajeJugadorObjeto.y
   const abajoJugador1 = personajeJugadorObjeto.y + personajeJugadorObjeto. alto
   const derechaJugador1 = personajeJugadorObjeto.x + personajeJugadorObjeto.ancho
   const izquierdaJugador1 = personajeJugadorObjeto.x
    
   
   
   if(
        abajoJugador1 < arribaJugador2 ||
        arribaJugador1 > abajoJugador2 ||
        derechaJugador1 < izquierdaJugador2 ||
        izquierdaJugador1 > derechaJugador2
    ) {
        return
    }
   
    detenerMovimiento()
    sectionVerMapa.style.display = 'none'
    seccionSeleccionarAtaque.style.display = 'block'
    seleccionarPersonajeOponente(personajeJugador2)
    
}


window.addEventListener('load', iniciarJuego)

