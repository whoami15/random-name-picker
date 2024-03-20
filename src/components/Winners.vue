<script setup>
import { ref, watch, onMounted } from 'vue'
import { useWinnersStore } from '../stores/winners'

const winnersStore = useWinnersStore()

const winners = ref([])

watch(
  () => winnersStore.items,
  () => {
    winners.value = winnersStore.items.map((item) => ({
      name: item.name,
      createdAt: item.createdAt
    }))
  }
)

onMounted(() => {
  const storedWinners = localStorage.getItem('winners')

  if (storedWinners) {
    winners.value = JSON.parse(storedWinners)
  }
})
</script>

<template>
  <div
    class="border-2 border-black bg-white p-8 shadow-[7px_7px_0px_0px_rgba(109,40,217)]"
    v-if="winners.length"
  >
    <h2 class="mb-4 text-2xl font-medium">Winners</h2>

    <TransitionGroup name="list" tag="ul" role="list" class="space-y-3">
      <li
        v-for="(item, index) in winners"
        :key="index"
        class="flex flex-col overflow-hidden border border-gray-300 p-4 shadow-sm transition-all duration-150 ease-in-out hover:!skew-y-0 sm:px-6"
        :style="`transform: skewY(${(Math.random() * 1.5 - 0.9).toFixed(2)}deg)`"
      >
        <span class="uppercase">{{ item.name }}</span>

        <span class="text-gray-500">{{ item.createdAt }}</span>
      </li>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
