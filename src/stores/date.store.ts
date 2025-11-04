import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useDateStore = defineStore(
  'date',
  () => {
    const date = ref<Date | undefined>()

    const saveDate = async (d: Date) => {
      try {
        date.value = d
        return { status: 'success' }
      } catch {
        return { status: 'error' }
      }
    }

    return { date, saveDate }
  },
  {
    persist: {
      pick: ['date'],
    },
  },
)
