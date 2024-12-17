import { createApp } from "vue"
import App from "./quiz/App.vue"

const quizApp = document.querySelector("#quiz-app")
const snowFAB = document.querySelector("#snow-fab")
const quizButton = document.querySelector("#quiz-button")
const closeQuizButton = document.querySelector("#close-quiz-button")

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
}

function hideQuizApp() {
  quizApp.classList.add("hidden")
  closeQuizButton.classList.add("hidden")
}

createApp(App).mount("#quiz-app")

snowFAB.addEventListener("click", snowSome)
quizButton.addEventListener("click", showQuizApp)
closeQuizButton.addEventListener("click", hideQuizApp)
