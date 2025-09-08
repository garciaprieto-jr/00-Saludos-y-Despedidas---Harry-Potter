document.addEventListener('DOMContentLoaded', () => {
    // 1. Declaración de constantes y variables
    const questions = [
        {
            videoURL: 'https://garciaprieto-jr.github.io/00-Saludos-y-Despedidas---Harry-Potter/Hola.mp4',
            question: '¿Qué saludo dice Harry cuándo entra a comprar la varita?',
            options: ['¡Hola!', '¡Buenas tardes!', '¡Qué tal!', '¡Chao!'],
            correctAnswer: '¡Hola!'
        },
        {
            videoURL: 'https://garciaprieto-jr.github.io/00-Saludos-y-Despedidas---Harry-Potter/buenos%20dias.mp4', // Corregido el espacio en el nombre del archivo
            question: '¿Qué saludo utilizarías en esta situación?',
            options: ['¡Hola!', '¡Buenas tardes!', '¡Buenos días!', '¡Adiós!'],
            correctAnswer: '¡Buenos días!'
        },
        {
            videoURL: 'https://garciaprieto-jr.github.io/00-Saludos-y-Despedidas---Harry-Potter/buenas%20tardes%20alumnos.mp4', // Corregidos los espacios en el nombre del archivo
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
            // NOTA: Un iframe no puede reproducir archivos .png o .jpg.
            // Si deseas mostrar una imagen, necesitarás cambiar la etiqueta de video por <img>
            // en el HTML y modificar la lógica de loadQuestion()
            videoURL: 'https://garciaprieto-jr.github.io/00-Saludos-y-Despedidas---Harry-Potter/hasta%20luego.png',
            question: 'Harry y Ron van a ver a Hermione más tarde ¿Como se despiden?',
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
            videoURL: 'https://garciaprieto-jr.github.io/00-Saludos-y-Despedidas---Harry-Potter/Buenas%20Noches.mp4', // Corregido el espacio en el nombre del archivo
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
    const backgroundMusic = document.getElementById('background-music');
    const musicToggleButton = document.getElementById('music-toggle-btn');
    let isMusicPlaying = false;

    // 2. Funciones del juego
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

    // 3. Event listeners y lógica de los botones
    musicToggleButton.addEventListener('click', () => {
        if (isMusicPlaying) {
            backgroundMusic.pause();
            musicToggleButton.textContent = 'Música: OFF';
        } else {
            backgroundMusic.play().catch(error => {
                console.error("Error al intentar reproducir la música:", error);
            });
            musicToggleButton.textContent = 'Música: ON';
        }
        isMusicPlaying = !isMusicPlaying;
    });

    startButton.addEventListener('click', () => {
        startScreen.classList.add('hidden');
        gameContent.classList.remove('hidden');
        shuffleArray(questions);
        loadQuestion();
    });

    // 4. Hacer la función checkAnswer accesible desde HTML
    window.checkAnswer = (selectedIndex) => {
        const currentQuestion = questions[currentQuestionIndex];
        const selectedOption = currentQuestion.options[selectedIndex];
        
        // Deshabilita los botones mientras se procesa la respuesta
        const buttons = optionsContainer.getElementsByTagName('button');
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].disabled = true;
        }

        if (selectedOption === currentQuestion.correctAnswer) {
            gameContainer.classList.add('correct-effect');
            feedbackMessage.textContent = '¡Correcto! ✨ ¡Woooow!';
            successSound.play();
            
            // Espera un tiempo y pasa a la siguiente pregunta
            setTimeout(() => {
                successSound.pause();
                successSound.currentTime = 0;
                gameContainer.classList.remove('correct-effect');
                currentQuestionIndex++;
                loadQuestion();
            }, 2000);
        } else {
            gameContainer.classList.add('error-effect');
            feedbackMessage.textContent = '¡Incorrecto! Vuelve a intentarlo. 😥';
            errorSound.play();
            
            // Espera un tiempo y habilita los botones para reintentar
            setTimeout(() => {
                errorSound.pause();
                errorSound.currentTime = 0;
                gameContainer.classList.remove('error-effect');
                // Habilitar solo los botones para reintentar
                for (let i = 0; i < buttons.length; i++) {
                    buttons[i].disabled = false;
                }
            }, 1500); // Reduje el tiempo para que el usuario pueda reintentar más rápido
        }
    };
});
    });
});

