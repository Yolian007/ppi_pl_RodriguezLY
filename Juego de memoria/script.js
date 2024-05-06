// Array de cartas con valores duplicados para crear parejas
const cards = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];

// Contador de intentos
let attempts = 0;

// Contador de parejas encontradas
let matches = 0;

// Almacena los valores de las cartas seleccionadas
let cardValues = [];

// Almacena los IDs de las cartas seleccionadas
let cardIds = [];

// Temporizador
let timer;

// Contador de segundos
let seconds = 0;

// Función para mezclar un array utilizando el algoritmo de Fisher-Yates
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Variable para controlar si el juego está activo o no
let gameActive = false;

// Función para comenzar el juego
function startGame() {
    if (!gameActive) {
        gameActive = true;  // Activar el juego
        shuffleArray(cards);  // Mezclar las cartas
        const board = document.getElementById('game-board');
        board.innerHTML = '';  // Limpiar el tablero
        for (let i = 0; i < cards.length; i++) {
            const card = document.createElement('div');  // Crear una nueva carta
            card.className = 'card hidden';  // Asignar la clase 'hidden' para ocultar la carta
            card.id = i;  // Asignar un ID único a cada carta
            card.addEventListener('click', revealCard);  // Agregar un event listener para revelar la carta al hacer clic
            board.appendChild(card);  // Agregar la carta al tablero
        }
        document.getElementById('attempts').innerText = '0';  // Reiniciar el contador de intentos
        document.getElementById('timer').innerText = '0';  // Reiniciar el temporizador
        clearInterval(timer);  // Detener cualquier temporizador anterior
        seconds = 0;  // Reiniciar el contador de segundos
        // Iniciar el temporizador y actualizar el contador de segundos cada segundo
        timer = setInterval(() => {
            seconds++;
            document.getElementById('timer').innerText = seconds;
        }, 1000);
    }
}

// Función para revelar una carta al hacer clic
function revealCard() {
    if (!gameActive) return;  // No permitir revelar cartas si el juego no está activo

    let id = this.id;
    // Verificar si la carta está oculta y no se han seleccionado más de dos cartas
    if (cardValues.length < 2 && this.className.includes('hidden')) {
        this.style.backgroundColor = '#4CAF50';  // Cambiar el color de fondo de la carta
        this.innerText = cards[id];  // Mostrar el valor de la carta
        this.classList.remove('hidden');  // Eliminar la clase 'hidden' para revelar la carta
        // Si es la primera carta seleccionada
        if (cardValues.length === 0) {
            cardValues.push(cards[id]);  // Almacenar el valor de la carta
            cardIds.push(id);  // Almacenar el ID de la carta
        // Si es la segunda carta seleccionada
        } else if (cardValues.length === 1) {
            cardValues.push(cards[id]);  // Almacenar el valor de la segunda carta
            cardIds.push(id);  // Almacenar el ID de la segunda carta
            attempts++;  // Incrementar el contador de intentos
            document.getElementById('attempts').innerText = attempts;  // Actualizar el contador de intentos en el HTML
            // Si las dos cartas seleccionadas son iguales
            if (cardValues[0] === cardValues[1]) {
                matches++;  // Incrementar el contador de parejas encontradas
                cardValues = [];  // Vaciar el array de valores de cartas seleccionadas
                cardIds = [];  // Vaciar el array de IDs de cartas seleccionadas
                // Si se han encontrado todas las parejas
                if (matches === cards.length / 2) {
                    // Mostrar un mensaje de victoria con el tiempo y los intentos
                    alert('¡Ganaste el juego en ' + seconds + ' segundos y ' + attempts + ' intentos!');
                    clearInterval(timer);  // Detener el temporizador
                    gameActive = false;  // Desactivar el juego
                }
            } else {
                setTimeout(flipBack, 700);  // Si las cartas no son iguales, voltearlas nuevamente después de 700 ms
            }
        }
    }
}

// Función para voltear las cartas nuevamente si no son iguales
function flipBack() {
    // Obtener las cartas seleccionadas por sus IDs
    let cardOne = document.getElementById(cardIds[0]);
    let cardTwo = document.getElementById(cardIds[1]);
    // Restaurar el color de fondo y ocultar el valor de las cartas
    cardOne.style.backgroundColor = '#9E9E9E';
    cardOne.innerText = '';
    cardOne.className = 'card hidden';
    cardTwo.style.backgroundColor = '#9E9E9E';
    cardTwo.innerText = '';
    cardTwo.className = 'card hidden';
    cardValues = [];  // Vaciar el array de valores de cartas seleccionadas
    cardIds = [];  // Vaciar el array de IDs de cartas seleccionadas
}
