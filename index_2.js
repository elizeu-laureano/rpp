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
        question: "o pentagrama ou pauta possui quantas linhas?",
        answers: [
            {text: "7", correct: false},
            {text: "6", correct: false},
            {text: "5", correct: true},
            {text: "4", correct: false}
        ]
    },
    {
        question: " na escrita moderna utilaza-se quantos tipos de claves?",
        answers: [
            {text: "3", correct: true},
            {text: "4", correct: false},
            {text: "5", correct: false},
            {text: "6", correct: false}
        ]
    },
    {
        question: "quais são as duas claves mais utilizadadas?",
        answers: [
            {text: "fá e dó", correct: false},
            {text: "sol e fá", correct: true},
            {text: "sol e dó", correct: false},
            {text: "nenhuma das auternativas", correct: false}
        ]
    },
    {
        question: "como são chamadas os nomes das 'linhas imaginárias' que são usadas fora da pauta?",
        answers: [
            {text: "linha imaginárias", correct: false},
            {text: "linhas de correção", correct: false},
            {text: "linhas suplementares", correct: true},
            {text: "linhas extras", correct: false}
        ]
    },
    {
        question: "na clave de sol, a 2ª linha será denominada de?",
        answers: [
            {text: "FÁ", correct: false},
            {text: "DÓ", correct: false},
            {text: "SOL", correct: true},
            {text: "MÍ", correct: false}
        ]
    },
    {
        question: "o som são vibrações regulares, e quando não são regulares chamamos de?",
        answers: [
            {text: "barulho", correct: true},
            {text: "nota errada", correct: false},
            {text: "som feio", correct: false},
            {text: "nenhuma das opções anteriores", correct: false}
        ]
    }
]