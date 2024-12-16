const snowFAB = document.querySelector("#snow-fab")
const commentList = document.querySelector("#comment-list")
const nameInput = document.querySelector("#name")
const messageInput = document.querySelector("#message")
const commentForm = document.querySelector("form")
const modal = document.getElementById("comment-modal")
const btn = document.getElementById("add-note")
const back = document.getElementById("close")

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
