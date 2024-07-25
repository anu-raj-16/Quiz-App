const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})
var shuffledQuestions, currentQuestionIndex;

const questionElement = document.getElementById('question')
const answerButtons = document.getElementById('answer-buttons')

function startGame() {
    
    console.log('Started!')
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text;
        button.classList.add('btn')
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer)
        console
        answerButtons.appendChild(button)
    });
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtons.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if(shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element) 
    if(correct) {
        element.classList.add('correct')
    }
    else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(e) {
    e.classList.remove('correct')
    e.classList.remove('wrong')
}

const questions = [
    {
        question: 'What is 4 + 4',
        answers: [
            {text: '8', correct: true},
            {text: '24', correct: false}
        ]
    },
    {
        question: 'What is 4 * 4',
        answers: [
            {text: '28', correct: false},
            {text: '24', correct: false},
            {text: '16', correct: true},
            {text: '20', correct: false}
        ]
    },
    {
        question: 'My opinion on webdev',
        answers: [
            {text: 'fun', correct: false},
            {text: 'amazing spectacular mind-blowing jaw-dropping etc. etc..', correct: true},
            {text: 'super', correct: false},
            {text: 'awesome', correct: false}
        ]
    }
]