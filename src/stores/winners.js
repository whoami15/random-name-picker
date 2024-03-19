import { defineStore } from 'pinia'

export const useWinnersStore = defineStore({
  id: 'winners',
  state: () => ({
    rawItems: []
  }),
  getters: {
    items: (state) =>
      state.rawItems.reduce((items, item) => {
        const existingItem = items.find((it) => it.name === item.name)

        if (!existingItem) {
          items.push(item)
        }

        let winners = localStorage.getItem('winners')
        const parsedWinners = winners ? JSON.parse(winners) : []

        if (parsedWinners.length) {
          return parsedWinners
        }

        return items
      }, [])
  },
  actions: {
    addItem(name) {
      const item = { name: name, createdAt: new Date().toLocaleString() }

      this.rawItems.push(item)

      let winners = localStorage.getItem('winners')
      const parsedWinners = winners ? JSON.parse(winners) : []

      const existInLocalStorage = parsedWinners.find((it) => it.name === item.name)

      if (!existInLocalStorage) {
        parsedWinners.push(item)

        localStorage.setItem('winners', JSON.stringify(parsedWinners))
      }
    },
    remove() {
      this.rawItems = []

      localStorage.setItem('winners', JSON.stringify(this.rawItems))
    }
  }
})
