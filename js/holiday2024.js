const quizApp = document.querySelector("#quiz-app")
const snowFAB = document.querySelector("#snow-fab")
const quizButton = document.querySelector("#quiz-button")
const closeQuizButton = document.querySelector("#close-quiz-button")
const documentBody = document.querySelector("body")

function snowSome() {
  confetti({
    angle: 270,
    colors: ["#ffffff"],
    drift: 0.3,
    flat: true,
    gravity: 0.5,
    origin: { x: 0.4, y: -0.2 },
    scalar: 0.6,
    shapes: ["circle"],
    spread: 180,
    startVelocity: 25,
    ticks: 600
  })
}

function showQuizApp() {
  quizApp.classList.remove("hidden")
  closeQuizButton.classList.remove("hidden")
  documentBody.classList.add("no-scroll")
}

function hideQuizApp() {
  quizApp.classList.add("hidden")
  closeQuizButton.classList.add("hidden")
  documentBody.classList.remove("no-scroll")
}

snowFAB.addEventListener("click", snowSome)
quizButton.addEventListener("click", showQuizApp)
closeQuizButton.addEventListener("click", hideQuizApp)
