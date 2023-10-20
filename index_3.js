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
        question: "o frevo surgiu em qual cidade?",
        answers: [
            {text: "brasilia", correct: false},
            {text: "rio de janeiro", correct: false},
            {text: "são paulo", correct: false},
            {text: "recife", correct: true}
        ]
    },
    {
        question: " a bossa nova teve origem em qual década?",
        answers: [
            {text: "1950", correct: true},
            {text: "1960", correct: false},
            {text: "1940", correct: false},
            {text: "1970", correct: false}
        ]
    },
    {
        question: "o samba teve origem em qual cidade ?",
        answers: [
            {text: "brasilia", correct: false},
            {text: "rio de janeiro", correct: true},
            {text: "são paulo", correct: false},
            {text: "brasilia", correct: false}
        ]
    },
    {
        question: "na chamada 'geração 80' qual estilo de musica brasileiro ganhou um impulso?",
        answers: [
            {text: "forró", correct: false},
            {text: "samba", correct: false},
            {text: "pop rock", correct: true},
            {text: "frevo", correct: false}
        ]
    },
    {
        question: "o forró é um genero musical tradicional de qual região do Brasil?",
        answers: [
            {text: "centro-oeste", correct: false},
            {text: "norte", correct: false},
            {text: "sul", correct: false},
            {text: "nordeste", correct: true}
        ]
    },
    {
        question: "onde se originou o piseiro?",
        answers: [
            {text: "nordeste", correct: true},
            {text: "norte", correct: false},
            {text: "sul", correct: false},
            {text: "centro-oeste", correct: false}
        ]
    },
    {
        question: "o piseiro é uma mistura de quais estilos musicais?",
        answers: [
            {text: "bossa nova e pop rock", correct:false},
            {text: " forró, arrocha e funk,", correct: true},
            {text: "forró e samba", correct: false},
            {text: "samba e frevo", correct: false}
        ]
    }
]