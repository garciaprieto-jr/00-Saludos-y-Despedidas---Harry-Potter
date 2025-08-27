const questions = [
    {
        // Harry y Ron se encuentran en el tren
        videoURL: 'https://www.youtube-nocookie.com/embed/5Wq51a02i9M?autoplay=1&mute=1&controls=0', 
        question: '¿Qué saludo dice Ron Weasley a Harry Potter al conocerse?',
        options: ['¡Hola!', '¡Buenas tardes!', '¡Qué tal!', '¡Chao!'],
        correctAnswer: '¡Hola!'
    },
    {
        // Harry y Hagrid en el jardin
        videoURL: 'https://tu_usuario.github.io/tu_repositorio/video-2.mp4',
        question: 'Cuando visitan la cabaña de Hagrid por la mañana, ¿cómo lo saludan?',
        options: ['¡Hola!', '¡Buenas tardes!', '¡Buenos días!', '¡Adiós!'],
        correctAnswer: '¡Buenos días!'
    },
    {
        // McGonagall saluda a los estudiantes
        videoURL: 'https://tu_usuario.github.io/tu_repositorio/video-3.mp4',
        question: 'La profesora McGonagall ve a Harry y sus amigos por la tarde y les dice:',
        options: ['¡Buenos días!', '¡Hola, estudiantes!', '¡Buenas tardes, estudiantes!', '¡Hasta luego!'],
        correctAnswer: '¡Buenas tardes, estudiantes!'
    },
    {
        // Harry se despide de Sirius en King's Cross
        videoURL: 'https://tu_usuario.github.io/tu_repositorio/video-4.mp4',
        question: 'En la estación de tren, Sirius se despide de Harry con la frase:',
        options: ['¡Chao!', '¡Adiós!', '¡Hasta luego!', '¡Nos vemos!'],
        correctAnswer: '¡Adiós!'
    },
    {
        // Harry y Hermione en el baile de Navidad
        videoURL: 'https://tu_usuario.github.io/tu_repositorio/video-5.mp4',
        question: 'Después del Baile de Navidad, ¿qué dice Hermione a Harry para despedirse?',
        options: ['¡Adiós!', '¡Hasta luego!', '¡Nos vemos!', '¡Chao!'],
        correctAnswer: '¡Hasta luego!'
    },
    {
        // Despedida informal (Dobby)
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

// Nuevas variables para la pantalla de inicio
const startScreen = document.getElementById('start-screen');
const gameContent = document.getElementById('game-content');
const startButton = document.getElementById('start-button');

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
        // Reproduce el sonido de acierto
        gameContainer.classList.add('correct-effect');
        successSound.play();
        
        // Detiene el sonido después de 3 segundos
        setTimeout(() => {
            successSound.pause();
            successSound.currentTime = 0;
        }, 3000);

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
        // Reproduce el sonido de error
        gameContainer.classList.add('error-effect');
        errorSound.play();

        // Detiene el sonido después de 3 segundos
        setTimeout(() => {
            errorSound.pause();
            errorSound.currentTime = 0;
        }, 3000);
        
        feedbackMessage.textContent = '¡Incorrecto! Vuelve a intentarlo. 😥';

        setTimeout(() => {
            gameContainer.classList.remove('error-effect');
        }, 500);
    }
}

// Inicia el juego
startButton.addEventListener('click', () => {
    startScreen.classList.add('hidden');
    gameContent.classList.remove('hidden');
    loadQuestion();
});
