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
        question: "quais são as notas necessárias para se formar o acorde de DÓ maior?",
        answers: [
            {text: "sol, sí e ré", correct: false},
            {text: "lá, dó# e mí", correct: false},
            {text: "dó, ré e mí", correct: false},
            {text: "dó, mí e sol", correct: true}
        ]
    },
    {
        question: "qual a sequência que se usa para montar a escala maior?",
        answers: [
            {text: "tom, tom, semitom, tom, tom,tom, semitom", correct: true},
            {text: "semitom, tom, tom, semitom, semitom, semitom, tom", correct: false},
            {text: "tom, semitom, tom, tom, semitom, semitom, tom", correct: false},
            {text: "tom, tom, tom, tom, tom, tom, tom,", correct: false}
        ]
    },
    {
        question: "qual o sinal que define um bemol?",
        answers: [
            {text: "*", correct: false},
            {text: "b", correct: true},
            {text: ">", correct: false},
            {text: "#", correct: false}
        ]
    },
    {
        question: "qual o sinal que define um sustenido?",
        answers: [
            {text: "*", correct: false},
            {text: "b", correct: false},
            {text: ">", correct: false},
            {text: "#", correct: true}
        ]
    },
    {
        question: "quais são as notas que pertencem a escala maior natural de RÉ ?",
        answers: [
            {text: "DÓ, RÉ, MÍ, FÁ, SOL, LÁ e SÍ", correct: false},
            {text: "SOL, LÁ, SÍ, DÓ, RÉ, MÍ e FA#", correct: false},
            {text: "RÉ, MÍ, FÁ#, SOL, LÁ, SÍ e DÓ#", correct: true},
            {text: "MÍ, FÁ#, SOL#, LÁ, SÍ, DO# e RÉ#", correct: false}
        ]
    },
    {
        question: "a escala maior natural possui quantas notas?",
        answers: [
            {text: "7", correct: true},
            {text: "9", correct: false},
            {text: "12", correct: false},
            {text: "5", correct: false}
        ]
    },
    {
        question: " a escala cromática possui quantas notas?",
        answers: [
            {text: "11", correct: false},
            {text: "7", correct: false},
            {text: "12", correct: true},
            {text: "3", correct: false}
        ]
    }
]