<script setup>
import { ref, watch, onMounted } from 'vue'
import useShuffle from '../composables/useShuffle'
import { useNamesStore } from '../stores/names'

const props = defineProps({
  isDrawing: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['start-draw'])

const { shuffle } = useShuffle()
const namesStore = useNamesStore()

const namesInput = ref('john,jane\nben')
const duration = ref(3)

const shuffleEntries = () => {
  const entries = sanitizeInput(namesInput.value)

  if (entries.length < 2) {
    alert('Please enter at least 2 names')

    return
  }

  shuffle(entries)

  namesInput.value = entries.join('\n')
}

const sanitizeInput = (input) => {
  return Array.from(
    new Set(
      input
        .split(/[\n,]+/)
        .map((name) => name.trim())
        .filter((name) => name !== '')
    )
  )
}

const emitDraw = () => {
  const sanitizedInput = sanitizeInput(namesInput.value)

  if (sanitizedInput.length < 2) {
    alert('Please enter at least 2 names')

    return
  }

  if (duration.value < 2) {
    alert('Please enter a duration of at least 2 seconds')

    return
  }

  namesInput.value = sanitizedInput.join('\n')

  namesStore.addItems(namesInput.value)

  emit('start-draw', {
    names: namesInput.value,
    duration: duration.value
  })
}

watch(
  () => namesStore.items,
  (newItems) => {
    namesInput.value = newItems.join('\n')
  }
)

onMounted(() => {
  const storedNames = localStorage.getItem('names')

  if (storedNames) {
    namesInput.value = storedNames.split(',').join('\n')
  }
})
</script>

<template>
  <div>
    <form @submit.prevent="emitDraw">
      <div
        class="h-full border-2 border-black bg-white p-8 shadow-[7px_7px_0px_0px_rgba(109,40,217)]"
      >
        <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="col-span-full">
            <label for="names" class="block text-lg font-medium leading-6 text-gray-900">
              Names
            </label>

            <div class="relative mt-2">
              <textarea
                id="names"
                name="names"
                v-model="namesInput"
                rows="7"
                class="block w-full resize-none border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500"
              />

              <button
                type="button"
                @click="shuffleEntries"
                class="transition-150 absolute right-0 top-0 mr-3 mt-3 size-10 rounded-full bg-gray-200 text-sm text-gray-600 transition-all hover:bg-lila-200 hover:text-lila-900"
                title="Shuffle names"
              >
                <font-awesome-icon icon="fa-solid fa-shuffle" />
              </button>
            </div>

            <p class="mt-3 text-sm leading-6 text-gray-600">
              Each name must be added on a new line or separated by a comma.
            </p>
          </div>

          <div class="sm:col-span-4">
            <label for="duration" class="block text-lg font-medium leading-6 text-gray-900">
              Duration <span class="text-base text-gray-600">(in seconds)</span>
            </label>

            <div class="mt-2">
              <input
                type="number"
                name="duration"
                id="duration"
                v-model="duration"
                min="1"
                class="block h-10 w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="mt-12 text-center">
        <button
          type="submit"
          :disabled="namesInput.length === 0 || isDrawing"
          class="inline-flex h-16 w-full items-center justify-center border-2 border-black bg-white px-6 py-3 text-center text-lg font-semibold shadow-[7px_7px_0px_0px_rgba(109,40,217)] transition-all duration-150 ease-in-out hover:text-lila-900 hover:shadow-[4px_4px_0px_0px_rgba(109,40,217)] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          <template v-if="isDrawing">
            <font-awesome-icon icon="fa-solid fa-spinner" spin />

            <span class="ml-2">Drawing a name...</span>
          </template>

          <template v-else>Pick a Winner</template>
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
