const questions = [
    {
        // Harry cuando entra a comprar su varita
        videoURL: 'https://garciaprieto-jr.github.io/00-Saludos-y-Despedidas---Harry-Potter/Hola.mp4', 
        question: '¿Qué saludo dice Harry cuándo entra a compar la varita?',
        options: ['¡Hola!', '¡Buenas tardes!', '¡Qué tal!', '¡Chao!'],
        correctAnswer: '¡Hola!'

    },
   {
        videoURL: 'https://garciaprieto-jr.github.io/00-Saludos-y-Despedidas---Harry-Potter/buenos dias.mp4',
        question: '¿Que saludo utilizarias en esta situación?',
        options: ['¡Hola!', '¡Buenas tardes!', '¡Buenos días!', '¡Adiós!'],
        correctAnswer: '¡Buenos días!'
    },
    {
        videoURL: 'https://garciaprieto-jr.github.io/00-Saludos-y-Despedidas---Harry-Potter/buenas tardes alumnos.mp4',
        question: '¿Qué saludo utiliza la profesora Madam Hooch?',
        options: ['¡Buenos días!', '¡Hola, estudiantes!', '¡Buenas tardes, alumnos!', '¡Hasta luego!'],
        correctAnswer: '¡Buenas tardes, alumnos!'
    },
    {
        videoURL: 'https://garciaprieto-jr.github.io/00-Saludos-y-Despedidas---Harry-Potter/Adios.mp4',
        question: 'Qué dice Dumbledore para despedirse antes de salir de la casa ',
        options: ['¡Chao!', '¡Adiós!', '¡Hasta luego!', '¡Nos vemos!'],
        correctAnswer: '¡Adiós!'
    },
    {
        videoURL: 'https://garciaprieto-jr.github.io/00-Saludos-y-Despedidas---Harry-Potter/hasta luego.png',
        question: 'Harry y Ron van a ver a Hermion más tard ¿Como se despiden?',
        options: ['¡Adiós!', '¡Hasta luego!', '¡Nos vemos!', '¡Chao!'],
        correctAnswer: '¡Hasta luego!'
    },
    {
        videoURL: 'https://garciaprieto-jr.github.io/00-Saludos-y-Despedidas---Harry-Potter/chao.jpg',
        question: 'Si Dobby el elfo fuera a despedirse de una forma informal, ¿qué diría?',
        options: ['¡Hola!', '¡Buenos días!', '¡Adiós!', '¡Chao!'],
        correctAnswer: '¡Chao!'
    },
     {
        videoURL: 'https://garciaprieto-jr.github.io/00-Saludos-y-Despedidas---Harry-Potter/Buenas Noches.mp4',
        question: '¿Cómo se despide el profesor Lúpin del profesor Snake?',
        options: ['¡Hola!', '¡Profesor, buenas noches!', '¡Adiós!', '¡Chao!'],
        correctAnswer: '¡Profesor, buenas noches!'
    }
];

let currentQuestionIndex = 0;
const videoPlayer = document.getElementById('video-player');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const feedbackMessage = document.getElementById('feedback-message');
const successSound = document.getElementById('success-sound');
const errorSound = document.getElementById('error-sound');
const gameContainer = document.querySelector('.game-container');

const startScreen = document.getElementById('start-screen');
const gameContent = document.getElementById('game-content');
const startButton = document.getElementById('start-button');

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        questionText.textContent = '¡Juego Terminado! ¡Eres un gran mago del español!';
        optionsContainer.style.display = 'none';
        feedbackMessage.textContent = 'Recarga la página para volver a jugar.';
        videoPlayer.src = '';
        return;
    }
    
    const currentQuestion = questions[currentQuestionIndex];
    videoPlayer.src = currentQuestion.videoURL;
    questionText.textContent = currentQuestion.question;
    feedbackMessage.textContent = '';
    
    gameContainer.classList.remove('correct-effect', 'error-effect');
    const buttons = optionsContainer.getElementsByTagName('button');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].textContent = currentQuestion.options[i];
        buttons[i].disabled = false;
        buttons[i].style.backgroundColor = '';
    }
}

function checkAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    const selectedOption = currentQuestion.options[selectedIndex];
    
    if (selectedOption === currentQuestion.correctAnswer) {
        // Lógica para la respuesta CORRECTA
        gameContainer.classList.add('correct-effect');
        successSound.play();
        
        // Detiene el sonido de acierto después de 2 segundos
        setTimeout(() => {
            successSound.pause();
            successSound.currentTime = 0;
        }, 2000);

        feedbackMessage.textContent = '¡Correcto! ✨ ¡Woooow!';
        
        const buttons = optionsContainer.getElementsByTagName('button');
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].disabled = true;
        }

        setTimeout(() => {
            currentQuestionIndex++;
            loadQuestion();
        }, 2000);

    } else {
        // Lógica para la respuesta INCORRECTA
        gameContainer.classList.add('error-effect');
        errorSound.play();

        // Detiene el sonido de error después de 2 segundos
        setTimeout(() => {
            errorSound.pause();
            errorSound.currentTime = 0;
        }, 2000);
        
        feedbackMessage.textContent = '¡Incorrecto! Vuelve a intentarlo. 😥';

        setTimeout(() => {
            gameContainer.classList.remove('error-effect');
        }, 500);
    }
}

startButton.addEventListener('click', () => {
    startScreen.classList.add('hidden');
    gameContent.classList.remove('hidden');
    loadQuestion();
});


