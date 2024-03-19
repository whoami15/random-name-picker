<script setup>
const props = defineProps({
  winner: {
    type: String,
    required: true
  },
  entries: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <Transition name="fade" mode="out-in">
    <div
      class="border-2 border-black bg-white p-4 shadow-[7px_7px_0px_0px_rgba(109,40,217)]"
      v-if="winner"
    >
      <div class="mt-2 text-center text-lila-900">
        <span class="text-7xl">🏆</span>

        <h2 class="mt-4 text-lila-800">And the winner is...</h2>

        <h1 class="text-2xl font-semibold uppercase underline underline-offset-4">{{ winner }}</h1>

        <p class="mt-4 text-lila-800">from {{ entries }} entries</p>
      </div>
    </div>
  </Transition>
</template>

<style scoped></style>
