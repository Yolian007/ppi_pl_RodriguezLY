document.addEventListener('DOMContentLoaded', () => {
    // Referencias a los elementos del DOM
    const startButton = document.getElementById('start-btn');
    const nextButton = document.getElementById('next-btn');
    const questionContainerElement = document.getElementById('question-container');
    const questionElement = document.getElementById('question');
    const answerButtonsElement = document.getElementById('answer-buttons');

    // Variables globales para las preguntas y el índice actual
    let shuffledQuestions, currentQuestionIndex;
    let score = 0; // Variable para llevar la puntuación

    // Array de preguntas con sus respuestas
    const questions = [
        {
            question: "¿Cuál es la capital de Francia?",
            answers: [
                { text: "Madrid", correct: false },
                { text: "París", correct: true },
                { text: "Roma", correct: false },
                { text: "Londres", correct: false }
            ]
        },
        {
            question: "¿Cuál es el río más largo del mundo?",
            answers: [
                { text: "Nilo", correct: true },
                { text: "Amazonas", correct: false },
                { text: "Yangtsé", correct: false },
                { text: "Misisipi", correct: false }
            ]
        },
        {
            question: "¿Cuál es el planeta más grande del sistema solar?",
            answers: [
                { text: "Marte", correct: false },
                { text: "Tierra", correct: false },
                { text: "Júpiter", correct: true },
                { text: "Saturno", correct: false }
            ]
        },
        {
            question: "¿En qué año llegó el hombre a la luna?",
            answers: [
                { text: "1965", correct: false },
                { text: "1969", correct: true },
                { text: "1971", correct: false },
                { text: "1973", correct: false }
            ]
        },
        {
            question: "¿Cuál es el idioma más hablado en el mundo?",
            answers: [
                { text: "Inglés", correct: false },
                { text: "Español", correct: false },
                { text: "Chino Mandarín", correct: true },
                { text: "Hindú", correct: false }
            ]
        },
        {
            question: "¿Cuál es el océano más grande del mundo?",
            answers: [
                { text: "Atlántico", correct: false },
                { text: "Índico", correct: false },
                { text: "Pacífico", correct: true },
                { text: "Ártico", correct: false }
            ]
        },
        {
            question: "¿Cuál es el país con mayor población del mundo?",
            answers: [
                { text: "India", correct: false },
                { text: "Estados Unidos", correct: false },
                { text: "China", correct: true },
                { text: "Indonesia", correct: false }
            ]
        },
        {
            question: "¿Qué invento revolucionó las comunicaciones en el siglo XIX?",
            answers: [
                { text: "El teléfono", correct: true },
                { text: "La televisión", correct: false },
                { text: "El automóvil", correct: false },
                { text: "El avión", correct: false }
            ]
        },
        {
            question: "¿Cuál es el metal más abundante en la corteza terrestre?",
            answers: [
                { text: "Hierro", correct: false },
                { text: "Aluminio", correct: true },
                { text: "Cobre", correct: false },
                { text: "Plata", correct: false }
            ]
        },
        {
            question: "¿En qué continente se encuentra el desierto del Sahara?",
            answers: [
                { text: "Asia", correct: false },
                { text: "América", correct: false },
                { text: "África", correct: true },
                { text: "Oceanía", correct: false }
            ]
        },
        {
            question: "¿Cuál es el animal terrestre más rápido?",
            answers: [
                { text: "León", correct: false },
                { text: "Gacela", correct: false },
                { text: "Guepardo", correct: true },
                { text: "Caballo", correct: false }
            ]
        },
        {
            question: "¿Quién pintó la Mona Lisa?",
            answers: [
                { text: "Vincent van Gogh", correct: false },
                { text: "Pablo Picasso", correct: false },
                { text: "Leonardo da Vinci", correct: true },
                { text: "Claude Monet", correct: false }
            ]
        },
        {
            question: "¿Cuál es el país más grande del mundo?",
            answers: [
                { text: "Canadá", correct: false },
                { text: "China", correct: false },
                { text: "Estados Unidos", correct: false },
                { text: "Rusia", correct: true }
            ]
        },
        {
            question: "¿Cuál es la montaña más alta del mundo?",
            answers: [
                { text: "K2", correct: false },
                { text: "Kangchenjunga", correct: false },
                { text: "Everest", correct: true },
                { text: "Lhotse", correct: false }
            ]
        },
        {
            question: "¿Cuál es el elemento químico más abundante en el universo?",
            answers: [
                { text: "Oxígeno", correct: false },
                { text: "Hidrógeno", correct: true },
                { text: "Carbono", correct: false },
                { text: "Nitrógeno", correct: false }
            ]
        }
    ];

    // Event listener para iniciar el juego
    startButton.addEventListener('click', startGame);
    // Event listener para pasar a la siguiente pregunta
    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        setNextQuestion();
    });

    // Función para iniciar el juego
    function startGame() {
        startButton.classList.add('hide'); // Oculta el botón de inicio
        score = 0; // Reinicia la puntuación
        // Mezcla las preguntas y selecciona las primeras 6
        shuffledQuestions = questions.sort(() => Math.random() - 0.5).slice(0, 6);
        currentQuestionIndex = 0; // Reinicia el índice de la pregunta actual
        questionContainerElement.classList.remove('hide'); // Muestra el contenedor de preguntas
        setNextQuestion(); // Configura la siguiente pregunta
    }

    // Función para configurar la siguiente pregunta
    function setNextQuestion() {
        resetState(); // Reinicia el estado de los botones
        showQuestion(shuffledQuestions[currentQuestionIndex]); // Muestra la siguiente pregunta
    }

    // Función para mostrar una pregunta
    function showQuestion(question) {
        questionElement.innerText = question.question; // Muestra el texto de la pregunta
        // Muestra las respuestas como botones
        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('btn');
            if (answer.correct) {
                button.dataset.correct = answer.correct; // Marca la respuesta correcta
            }
            button.addEventListener('click', selectAnswer); // Añade event listener para seleccionar la respuesta
            answerButtonsElement.appendChild(button); // Añade el botón de respuesta al contenedor
        });
    }

    // Función para reiniciar el estado de los botones
    function resetState() {
        clearStatusClass(document.body); // Limpia las clases de estado del cuerpo
        nextButton.classList.add('hide'); // Oculta el botón de siguiente
        // Elimina los botones de respuesta existentes
        while (answerButtonsElement.firstChild) {
            answerButtonsElement.removeChild(answerButtonsElement.firstChild);
        }
    }

    // Función para seleccionar una respuesta
    function selectAnswer(e) {
        const selectedButton = e.target;
        const correct = selectedButton.dataset.correct === 'true'; // Verifica si la respuesta es correcta
        setStatusClass(selectedButton, correct); // Configura la clase de estado del botón seleccionado
        // Configura la clase de estado de todos los botones de respuesta
        Array.from(answerButtonsElement.children).forEach(button => {
            setStatusClass(button, button.dataset.correct === 'true');
        });
        if (correct) {
            score++; // Incrementa la puntuación si la respuesta es correcta
        }
        if (shuffledQuestions.length > currentQuestionIndex + 1) {
            nextButton.classList.remove('hide'); // Muestra el botón de siguiente si hay más preguntas
        } else {
            startButton.innerText = `Reiniciar (Puntuación: ${score})`; // Muestra la puntuación final
            startButton.classList.remove('hide'); // Muestra el botón de reiniciar
        }
    }

    // Función para configurar la clase de estado
    function setStatusClass(element, correct) {
        clearStatusClass(element); // Limpia las clases de estado
        if (correct) {
            element.classList.add('correct'); // Añade la clase de correcto
        } else {
            element.classList.add('wrong'); // Añade la clase de incorrecto
        }
    }

    // Función para limpiar las clases de estado
    function clearStatusClass(element) {
        element.classList.remove('correct');
        element.classList.remove('wrong');
    }
});
