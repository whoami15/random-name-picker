<script setup>
const props = defineProps({
  names: {
    type: Array,
    required: true
  },
  isDrawing: {
    type: Boolean,
    required: true
  },
  duration: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <div>
    <div class="rounded-lg text-center text-lg font-medium leading-6 text-gray-900">
      <Transition name="fade" mode="out-in">
        <div v-if="isDrawing && duration > 0">
          <h1>{{ names[0] }}</h1>

          <p class="mt-2 text-sm font-normal text-gray-500">{{ duration.toFixed(2) }}s</p>
        </div>

        <div v-else>
          <h2>Click <span class="font-semibold">'Pick a Winner'</span> to start</h2>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped></style>
