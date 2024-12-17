<script setup>
import { computed, ref } from "vue"
import { questions } from "./questions"
import { scores } from "./scores"

const questionId = ref(1)
const answers = ref([])
const selectedOption = ref(null)

const question = computed(() => {
  if (questionId.value > questions.length) {
    console.log(answers.value)
    return null
  }
  return questions.find(q => q.id === questionId.value)
})

const result = computed(() => {
  if (answers.value.length < questions.length) {
    return null
  }
  const results = { cat: 0, dog: 0, bird: 0, fish: 0 }
  answers.value.forEach((answer, index) => {
    const r = scores[index + 1][answer]
    results.cat += r.cat
    results.dog += r.dog
    results.bird += r.bird
    results.fish += r.fish
  })
  let res = "cat"
  console.log(results)
  Object.entries(results).forEach(([key, value]) => {
    if (value > results[res]) {
      res = key
    }
  })
  return res
})

function handleOptionClick(id) {
  const optionId = id
  selectedOption.value = optionId
}

function handleNextClick() {
  answers.value.push(selectedOption.value)
  selectedOption.value = null
  questionId.value++
}

function resetQuiz() {
  questionId.value = 1
  answers.value = []
}
</script>

<template>
  <div
    style="
      width: 100%;
      height: 100vh;
      display: flex;
      background-color: #182841;
      pointer-events: all;
      overflow-y: auto;
      justify-content: center;
    "
  >
    <div
      style="
        display: flex;
        flex-direction: column;
        width: 100%;
        align-items: center;
        margin-top: 3rem;
        max-width: 32rem;
      "
    >
      <div style="display: flex; flex-direction: row">
        <h1>Which 2024 Ian or Cindy are you?</h1>
      </div>
      <div>
        <!-- <img
          style="height: 10rem"
          src="/assets-2023/year-in-photos/events/02-cny.jpg"
        /> -->
      </div>
      <template v-if="question">
        <div>
          <p>
            This year was our 5 year college reunion at Cornell. We spent the
            weekend in Ithaca catching up with friends and participating in some
            Big Red activities.
          </p>
        </div>
        <div>
          <p>{{ question.textContent }}</p>
        </div>
        <ul style="display: flex; flex-direction: column">
          <li
            @click="handleOptionClick(option.id)"
            v-for="option of question.options"
            :id="option.id"
            style="
              padding: 1rem;
              margin-top: 1rem;
              border-radius: 0.5rem;
              cursor: pointer;
              list-style-type: none;
            "
            :class="`${
              selectedOption === option.id ? 'selected' : 'unselected'
            }`"
          >
            {{ option.textContent }}
          </li>
        </ul>
        <div>
          <button @click="handleNextClick" :disabled="selectedOption === null">
            Next
          </button>
        </div>
      </template>
      <template v-else>
        <div>
          <p>Thank you for participating in the quiz! Your result is</p>
          <p>{{ result }}</p>
          <button @click="resetQuiz">Go again</button>
        </div>
      </template>
    </div>
  </div>
</template>

<style>
.selected {
  background-color: red;
}
.unselected {
  background-color: #111111;
}
</style>
