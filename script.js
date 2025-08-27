const questions = [
    {
        // Harry y Ron se encuentran en el tren
        videoURL: 'ENLACE_VIDEO_HOLA', 
        question: '¿Qué saludo dice Ron Weasley a Harry Potter al conocerse?',
        options: ['¡Hola!', '¡Buenas tardes!', '¡Qué tal!', '¡Chao!'],
        correctAnswer: '¡Hola!'
    },
    {
        // Harry y Hagrid en el jardin
        videoURL: 'ENLACE_VIDEO_BUENOS_DIAS',
        question: 'Cuando visitan la cabaña de Hagrid por la mañana, ¿cómo lo saludan?',
        options: ['¡Hola!', '¡Buenas tardes!', '¡Buenos días!', '¡Adiós!'],
        correctAnswer: '¡Buenos días!'
    },
    {
        // McGonagall saluda a los estudiantes
        videoURL: 'ENLACE_VIDEO_BUENAS_TARDES',
        question: 'La profesora McGonagall ve a Harry y sus amigos por la tarde y les dice:',
        options: ['¡Buenos días!', '¡Hola, estudiantes!', '¡Buenas tardes, estudiantes!', '¡Hasta luego!'],
        correctAnswer: '¡Buenas tardes, estudiantes!'
    },
    {
        // Harry se despide de Sirius en King's Cross
        videoURL: 'ENLACE_VIDEO_ADIOS',
        question: 'En la estación de tren, Sirius se despide de Harry con la frase:',
        options: ['¡Chao!', '¡Adiós!', '¡Hasta luego!', '¡Nos vemos!'],
        correctAnswer: '¡Adiós!'
    },
    {
        // Harry y Hermione en el baile de Navidad
        videoURL: 'ENLACE_VIDEO_HASTA_LUEGO',
        question: 'Después del Baile de Navidad, ¿qué dice Hermione a Harry para despedirse?',
        options: ['¡Adiós!', '¡Hasta luego!', '¡Nos vemos!', '¡Chao!'],
        correctAnswer: '¡Hasta luego!'
    },
    {
        // Despedida informal (Dobby)
        videoURL: 'ENLACE_VIDEO_CHAO',
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
        // Acierto
        gameContainer.classList.add('correct-effect');
        successSound.play();
        
        // Detiene el sonido después de 3 segundos para que no sea muy largo
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
        // Error
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

window.onload = loadQuestion;