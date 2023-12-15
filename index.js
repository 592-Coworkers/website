import JSConfetti from "js-confetti"
import confetti from "canvas-confetti"

const jsConfetti = new JSConfetti()

var myCanvas = document.createElement("canvas")
document.body.appendChild(myCanvas)

var myConfetti = confetti.create(myCanvas, { resize: true })

myConfetti()

const snowFAB = document.querySelector("#snow-fab")

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

snowFAB.addEventListener("click", snowSome)
