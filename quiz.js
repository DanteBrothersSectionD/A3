// Quiz data
const quizData = [
    {
        question: "What Man Was Sent To Prepare The Way For Jesus?",
        answers: ["John The Baptist", "Matthew The Tax Collector", "Simon The Zealot", "Judas The Thief"],
        correct: 0
    },
    {
        question: "How Long Did The Flood Rain Fall In The Noah's Ark Story?",
        answers: ["80 Days And Nights", "12 Days And Nights", "40 Days And Nights", "107 Days And Nights"],
        correct: 2
    },
    {
        question: "How Old Was Moses When He Gave God's Message To Pharaoh: 'Let My People Go!'?",
        answers: ["80 Years", "18 Years", "37 Years", "68 Years"],
        correct: 0
    },
    {
        question: "Who Restored Paul's Sight After The Lord Blinded Him?",
        answers: ["Peter", "Ananias", "Luke", "Matthew"],
        correct: 1
    },
    {
        question: "What Was The First Prophecy?",
        answers: ["The End Of The Age", "The Second Coming Of Christ", "The Destruction Of The Temple", "The Victory Over Satan Of The Seed Of The Woman"],
        correct: 3
    },
];

// DOM Elements for quiz
const auth = document.getElementById('auth');
const quiz = document.getElementById('quiz');
const finalScoreSection = document.getElementById('final-score');
const usernameInput = document.getElementById('username');
const startQuizBtn = document.getElementById('startQuizBtn');
let currentQuestionIndex = 0;
let score = 0;

// Quiz display elements
const questionElement = document.getElementById('question');
const answerButtons = document.querySelectorAll('.btn');
const scoreDisplay = document.getElementById('score');
const questionCounter = document.getElementById('question-counter');
const finalScoreDisplay = document.getElementById('finalScoreDisplay');

// Start quiz
startQuizBtn.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    if (username) {
        auth.style.display = 'none';
        quiz.style.display = 'block';
        loadQuestion();
    } else {
        alert("Enter your name to start!");
    }
});

// Load questions
function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    questionCounter.textContent = currentQuestionIndex + 1;
    scoreDisplay.textContent = score;

    // Assign answers to buttons and clear previous styles
    answerButtons.forEach((button, index) => {
        // Set the answer text for each button
        button.textContent = currentQuestion.answers[index];
        button.classList.remove('correct', 'incorrect');

        // Remove any previous event listener and add a new one
        button.onclick = () => checkAnswer(index, button);
    });
}

// Check answers
function checkAnswer(selectedIndex, button) {
    const correctIndex = quizData[currentQuestionIndex].correct;
    if (selectedIndex === correctIndex) {
        score++;
        button.classList.add('correct');
    } else {
        button.classList.add('incorrect');
    }

    // Update the score display
    scoreDisplay.textContent = score;

    // Move to the next question after a delay
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            loadQuestion();
        } else {
            endQuiz();
        }
    }, 1000);
}

// End quiz and prompt for restart
function endQuiz() {
    quiz.style.display = 'none';
    finalScoreSection.style.display = 'block';
    finalScoreDisplay.textContent = score;

    setTimeout(() => {
        if (confirm("You've completed the quiz! Do you want to play again?")) {
            resetQuiz();
        }
    }, 1000);
}

// Restart the quiz
function resetQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreDisplay.textContent = score;
    finalScoreSection.style.display = 'none';
    quiz.style.display = 'block';
    loadQuestion();
}
