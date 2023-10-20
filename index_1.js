const $startGameButton = document.querySelector(".start-quiz")
const $questionsContainer = document.querySelector(".questions-container")
const $answersContainer = document.querySelector(".answers-container")
const $questionText = document.querySelector(".question")
const $nextQuestionButton =document.querySelector(".next-question")

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)

let currentQuestionIndex = 0
let totalCorrect = 0

function startGame() {
    $startGameButton.classList.add("hide")
    $questionsContainer.classList.remove("hide")
    displayNextQuestion()
}

function displayNextQuestion() {
    resetState()

    if(questions.length == currentQuestionIndex) {
        return finishGame()
    }



    $questionText.textContent = questions[currentQuestionIndex].question
    questions[currentQuestionIndex].answers.forEach(answer => {
        const newAnswer = document.createElement("button")
        newAnswer.classList.add("button", "answer")
        newAnswer.textContent = answer.text
        if(answer.correct) {
            newAnswer.dataset.correct = answer.correct
        }
        $answersContainer.appendChild(newAnswer)

        newAnswer.addEventListener("click", selectAnswer)
    })
}

function resetState() {
    while($answersContainer.firstChild) {
        $answersContainer.removeChild($answersContainer.firstChild)
    }

    document.body.removeAttribute("class")
    $nextQuestionButton.classList.add("hide")
}

function selectAnswer(event) {
    const answerClicked = event.target

    if(answerClicked.dataset.correct) {
        document.body.classList.add("correct")
        totalCorrect++
    } else{
        document.body.classList.add("incorrect")
    }

    document.querySelectorAll(".answer").forEach(button => {
        if(button.dataset.correct){
            button.classList.add("correct")
        }else{
            button.classList.add("incorrect")
        }

        button.disabled = true
    })

    $nextQuestionButton.classList.remove("hide")
    currentQuestionIndex++
}

function finishGame() {
    const totalQuestion = questions.length
    const performance = Math.floor (totalCorrect * 100 / totalQuestion)

    let message = ""


    switch (true) {
        case (performance >= 90):
            message = "exelente :)"
            break
        case (performance >= 70):
            message = "muito bom :)"
            break
        case (performance >= 50):
            message = "bom :)"
            break
        default:
            message = "pode melhorar!"
            
    }

    $questionsContainer.innerHTML =
    `
        <p class="final-message">
            você acertou ${totalCorrect} de ${totalQuestion} questões
            <span>Resultado: ${message} </span>
        </p>  
        <button onclick=window.location.reload() class="button">
            refazer teste
        </button>  
    `
       
 




}











const questions = [
    {
        question: "sobre a melodia é correto afirmar: ",
        answers: [
            {text: "se constitui por apenas uma nota", correct: false},
            {text: "são diferentes sons em qualquer sequência", correct: false},
            {text: "é o solo que a guitarra faz na música", correct: false},
            {text: "são organizações de diferentes sons a fazer sentido na música", correct: true}
        ]
    },
    {
        question: "o qué harmonia?",
        answers: [
            {text: "são diferentes notas tocadas ao mesmo tempo", correct: true},
            {text: "são diferentes notas tocadas uma após a outra ", correct: false},
            {text: "são uma sequência da mesma nota tocada varias vezes", correct: false},
            {text: "nenhuma das alternativas", correct: false}
        ]
    },
    {
        question: "qual das opções não é excencial para o ritmo ?",
        answers: [
            {text: "tempo", correct: false},
            {text: "melodia", correct: true},
            {text: "acentuação (batidas fortes e fracas)", correct: false},
            {text: "padrões ", correct: false}
        ]
    },
    {
        question: "qual dos termos abaixo se refere a caracteristica sonora que nos permite destiguiur sons iguais de sujeitos diferentes?",
        answers: [
            {text: "ritmo", correct: false},
            {text: "harmonia", correct: false},
            {text: "timbre", correct: true},
            {text: "melodia", correct: false}
        ]
    },
    {
        question: "quando ouvimos uma nota podemos identificar quais elementos?",
        answers: [
            {text: "altura", correct: false},
            {text: "volume/intensidade", correct: false},
            {text: "timbre", correct: false},
            {text: "todas as alternativas são corretas ", correct: true}
        ]
    },
    {
        question: "na música,sons com frequêcias mas altas são percebidos como?",
        answers: [
            {text: "sons agudos", correct: true},
            {text: "sons fortes", correct: false},
            {text: "sons médios", correct: false},
            {text: "nenhuma das alternativas ", correct: false}
        ]
    },
    {
        question: "qual é a medida  usada para calcular a intensidade do som?",
        answers: [
            {text: "hertz", correct:false},
            {text: " decibéis", correct: true},
            {text: "watts", correct: false},
            {text: "Ohms", correct: false}
        ]
    }
]