<script setup>
import { ref } from 'vue'
import useShuffle from './composables/useShuffle'
import { useNamesStore } from './stores/names'
import { useWinnersStore } from './stores/winners'

import NameDisplay from './components/NameDisplay.vue'
import NameForm from './components/NameForm.vue'
import Winner from './components/Winner.vue'
import Winners from './components/Winners.vue'
import TheFooter from './components/TheFooter.vue'

const names = ref([])
const entries = ref(0)
const duration = ref(3)

const winner = ref('')
const isDrawing = ref(false)

const { shuffle } = useShuffle()
const namesStore = useNamesStore()
const winnersStore = useWinnersStore()

const startDraw = (data) => {
  isDrawing.value = true
  names.value = data.names.split('\n')
  entries.value = names.value.length

  duration.value = data.duration
  winner.value = ''

  let intervalId = setInterval(() => {
    shuffleNames()
    duration.value -= 0.1
  }, 100)

  setTimeout(() => {
    clearInterval(intervalId)
    pickWinner()
    isDrawing.value = false
  }, duration.value * 1000)
}

const shuffleNames = () => {
  shuffle(names.value)
}

const pickWinner = () => {
  const randomIndex = Math.floor(Math.random() * names.value.length)
  winner.value = names.value[randomIndex]

  winnersStore.addItem(winner.value)

  namesStore.removeItem(winner.value)

  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  })
}
</script>

<template>
  <main>
    <div class="relative mx-auto w-full items-center border-b-2 border-b-black">
      <div class="relative h-full items-center gap-12 bg-gray-100 p-8 lg:p-20">
        <div class="mx-auto max-w-4xl text-center">
          <h1 class="text-3xl font-medium text-black lg:text-5xl">Random Name Picker</h1>

          <p class="mx-auto mt-4 max-w-xl tracking-wide text-black xl:text-lg">
            Enter a list of names, set a duration, and click 'Pick a Winner'!
          </p>
        </div>
      </div>
    </div>

    <div class="mx-auto w-full items-center">
      <div
        class="grid grid-cols-1 divide-y-2 divide-black border-b-2 border-b-black md:grid-cols-2 md:divide-x-2 md:divide-y-0"
      >
        <div class="flex flex-col justify-start gap-12 bg-white px-4 py-12 sm:p-8 lg:p-12 lg:pl-32">
          <NameForm @start-draw="startDraw" :isDrawing />
        </div>

        <div
          class="flex flex-col justify-start gap-8 bg-lila-200 px-4 py-12 sm:p-8 lg:p-12 lg:pr-32"
        >
          <div class="border-2 border-black bg-white p-4 shadow-[7px_7px_0px_0px_rgba(0,0,0)]">
            <NameDisplay :names :isDrawing :duration />
          </div>

          <Winner :winner :entries />

          <Winners />
        </div>
      </div>
    </div>
  </main>

  <TheFooter />
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
./components/TheFooter.vue
