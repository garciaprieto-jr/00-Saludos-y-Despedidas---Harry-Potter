const questions = [
    {
        // Harry cuando entra a comprar su varita
        videoURL: 'https://garciaprieto-jr.github.io/00-Saludos-y-Despedidas---Harry-Potter/Hola.mp4', 
        question: '¿Qué saludo dice Harry cuándo entra a compar la varita?',
        options: ['¡Hola!', '¡Buenas tardes!', '¡Qué tal!', '¡Chao!'],
        correctAnswer: '¡Hola!'

    },
   {
        videoURL: 'https://tu_usuario.github.io/tu_repositorio/video-2.mp4',
        question: 'Cuando visitan la cabaña de Hagrid por la mañana, ¿cómo lo saludan?',
        options: ['¡Hola!', '¡Buenas tardes!', '¡Buenos días!', '¡Adiós!'],
        correctAnswer: '¡Buenos días!'
    },
    {
        videoURL: 'https://tu_usuario.github.io/tu_repositorio/video-3.mp4',
        question: 'La profesora McGonagall ve a Harry y sus amigos por la tarde y les dice:',
        options: ['¡Buenos días!', '¡Hola, estudiantes!', '¡Buenas tardes, estudiantes!', '¡Hasta luego!'],
        correctAnswer: '¡Buenas tardes, estudiantes!'
    },
    {
        videoURL: 'https://tu_usuario.github.io/tu_repositorio/video-4.mp4',
        question: 'En la estación de tren, Sirius se despide de Harry con la frase:',
        options: ['¡Chao!', '¡Adiós!', '¡Hasta luego!', '¡Nos vemos!'],
        correctAnswer: '¡Adiós!'
    },
    {
        videoURL: 'https://tu_usuario.github.io/tu_repositorio/video-5.mp4',
        question: 'Después del Baile de Navidad, ¿qué dice Hermione a Harry para despedirse?',
        options: ['¡Adiós!', '¡Hasta luego!', '¡Nos vemos!', '¡Chao!'],
        correctAnswer: '¡Hasta luego!'
    },
    {
        videoURL: 'https://tu_usuario.github.io/tu_repositorio/video-6.mp4',
        question: 'Si Dobby el elfo fuera a despedirse de una forma informal, ¿qué diría?',
        options: ['¡Hola!', '¡Buenos días!', '¡Adiós!', '¡Chao!'],
        correctAnswer: '¡Chao!'
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


