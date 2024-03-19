import { defineStore } from 'pinia'

export const useNamesStore = defineStore({
  id: 'name',
  state: () => ({
    rawItems: []
  }),
  getters: {
    items: (state) =>
      state.rawItems.reduce((items, item) => {
        const existingItem = items.find((it) => it === item)

        if (!existingItem) {
          items.push(item)
        }

        return items
      }, [])
  },
  actions: {
    addItems(names) {
      // Instead of pushing items, we are replacing the whole array each time
      this.rawItems = names.split('\n')

      localStorage.setItem('names', this.rawItems)
    },

    removeItem(name) {
      const i = this.rawItems.lastIndexOf(name)

      if (i > -1) {
        this.rawItems.splice(i, 1)

        // Save the new list of items without the removed one
        localStorage.setItem('names', this.rawItems)
      }
    }
  }
})
