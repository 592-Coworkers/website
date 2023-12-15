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

function renderComment(comment, mode) {
  const commentDiv = document.createElement("div")
  commentDiv.classList.add("comment")
  const commentName = document.createElement("div")
  commentName.classList.add("comment-name")
  commentName.innerText = comment.name
  commentDiv.appendChild(commentName)
  const commentMessage = document.createElement("div")
  commentMessage.classList.add("comment-message")
  commentMessage.innerText = comment.message
  commentDiv.appendChild(commentMessage)
  if (mode === "prepend") {
    commentList.prepend(commentDiv)
  } else {
    commentList.appendChild(commentDiv)
  }
}

async function fetchComments() {
  const response = await fetch("https://hash.spudlocker.com/xmas/comments")
  const comments = await response.json()
  comments.forEach(comment => {
    renderComment(comment, "append")
  })
}

async function submitComment(e) {
  e.preventDefault()
  const name = nameInput.value
  const message = messageInput.value
  if (!name) {
    alert("Who are you??? Please enter a name!!")
    return
  }
  if (!message) {
    alert("Hold your horses, partner! You can't submit a blank comment!")
    return
  }
  const bodyString = JSON.stringify({ name, message })
  await fetch("https://hash.spudlocker.com/xmas/comment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: bodyString
  })
  renderComment({ name, message }, "prepend")
  modal.style.display = "none"
}

snowFAB.addEventListener("click", snowSome)
commentForm.addEventListener("submit", submitComment)

btn.onclick = function () {
  modal.style.display = "flex"
}

back.onclick = function () {
  modal.style.display = "none"
}

fetchComments()
