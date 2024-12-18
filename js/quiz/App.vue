<script setup>
import { computed, ref } from "vue"
import { questions } from "./questions"
import { scores } from "./scores"
import { personas } from "./personas"

const questionId = ref(1)
const answers = ref([])
const selectedOption = ref(null)
const myDiv = ref(null)

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
    results.friar += r.friar
    results.newyork += r.newyork
    results.corn += r.corn
    results.pool += r.pool
    results.sleeping += r.sleeping
    results.lobster += r.lobster
    results.squishy += r.squishy
    results.sweater += r.sweater
    results.time += r.time
    results.retro += r.retro
    results.beach += r.beach
    results.reindeer += r.reindeer
  })
  let res = "friar"
  console.log(results)
  Object.entries(results).forEach(([key, value]) => {
    if (value > results[res]) {
      res = key
    }
  })
  return res
})

const persona = computed(() => {
  return personas[result.value]
})

function handleOptionClick(id) {
  const optionId = id
  selectedOption.value = optionId
}

function handleNextClick() {
  answers.value.push(selectedOption.value)
  selectedOption.value = null
  questionId.value++
  myDiv.value.scrollTop = 0
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
      color: white;
    "
    ref="myDiv"
    class="font-inclusive-sans"
  >
    <div
      style="
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 32rem;
        margin-left: 16px;
        margin-right: 16px;
        margin-top: 16px;
      "
    >
      <div
        style="
          display: flex;
          flex-direction: row;
          width: 100%;
          margin-bottom: 25px;
        "
      >
        <h2 class="font-shantell-sans" style="font-size: 14px">
          Which 2024 Ian or Cindy are you?
        </h2>
      </div>
      <template v-if="question">
        <div>
          <img style="width: 100%; border-radius: 4px" :src="question.image" />
        </div>
        <div>
          <p>
            This year was our 5 year college reunion at Cornell. We spent the
            weekend in Ithaca catching up with friends and participating in some
            Big Red activities.
          </p>
        </div>
        <div>
          <p style="font-style: italic">{{ question.textContent }}</p>
        </div>
        <ul
          style="display: flex; flex-direction: column; margin: 0; padding: 0"
        >
          <li
            @click="handleOptionClick(option.id)"
            v-for="option of question.options"
            :key="option.id"
            style="
              margin-top: 1rem;
              border-radius: 4px;
              cursor: pointer;
              list-style-type: none;
              position: relative;
              isolation: isolate;
            "
            :class="`${
              selectedOption === option.id
                ? 'selected-border'
                : 'unselected-border'
            }`"
          >
            <div
              style="
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                z-index: 100;
              "
              :class="`${
                selectedOption === option.id ? 'selected' : 'unselected'
              }`"
            ></div>
            <div
              style="
                position: absolute;
                top: 0;
                left: 0;
                z-index: 100;
                padding: 1rem;
              "
            >
              <span>{{ option.textContent }}</span>
            </div>
            <div style="padding: 1rem">
              <span>{{ option.textContent }}</span>
            </div>
          </li>
        </ul>
        <div>
          <button
            @click="handleNextClick"
            :disabled="selectedOption === null"
            class="red-button"
            style="width: 100%; margin-top: 20px; margin-bottom: 30px"
          >
            Next
          </button>
        </div>
      </template>
      <template v-else>
        <div>
          <img style="width: 100%; border-radius: 4px" :src="persona.image" />
          <p class="font-shantell-sans">You&apos;re {{ persona.name }}!</p>
          <p>{{ persona.description }}</p>
          <button
            class="red-button"
            style="width: 100%; margin-bottom: 28px"
            @click="resetQuiz"
          >
            Try again
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<style>
.selected {
  background-color: #c7202d;
  opacity: 0.2;
  border: 1px solid #c7202d;
}
.unselected {
  background-color: #0b121c;
  opacity: 0.6;
  border: 1px solid #2b4867;
}

.selected-border {
  border: 1px solid #c7202d;
}
.unselected-border {
  border: 1px solid #2b4867;
}

.font-shantell-sans {
  font-family: "Shantell Sans", sans-serif;
  font-optical-sizing: auto;
  font-weight: 800;
  font-style: normal;
  font-variation-settings: "BNCE" 30, "INFM" 50, "SPAC" 0;
}

.font-inclusive-sans {
  font-family: "Inclusive Sans", sans-serif;
}

:root {
  --midnight: #0b121c;
  --night-sky: #182841;
  --twilight: #2b4867;
  --cloud: #fcf8fa;

  --rudolph: #c7202d;
  --brick: #871016;

  --gold-star: #cbb571;
  --reindeer: #b15f28;
  --bark: #624524;
  --dust: #7c6e6a;

  --midnight-60: rgba(10, 18, 28, 0.6);
  --night-sky-80: rgba(24, 40, 65, 0.8);
  --night-sky-30: rgba(24, 40, 65, 0.3);
  --brick-50: rgba(138, 15, 21, 0.5);
}

button {
  padding: 0.75rem 1rem;
  font-family: "Shantell Sans", sans-serif;
  font-optical-sizing: auto;
  font-weight: 800;
  font-style: normal;
  font-variation-settings: "BNCE" 30, "INFM" 50, "SPAC" 0;
  font-size: 1rem;
  border-radius: 0.25rem;
  border: none;
  color: var(--cloud);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.5s;
}

.red-button {
  cursor: pointer;
  background: var(--rudolph);
  box-shadow: 0px 4px 0px 0px var(--brick);
}

.red-button:disabled {
  background: #2b4867;
  box-shadow: 0px 4px 0px 0px #2b4867;
}
</style>
