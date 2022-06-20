import { defineStore } from 'pinia'
import { testState } from '@/store/test.ts'
export const sadState = defineStore('SAD', {
  state: () => {
    return {
      mode: 'learning',
      modeList: ['learning', 'working', 'sleeping', 'reading', 'writing'],
    }
  },
  actions: {
    setModeToWorking() {
      this.mode = 'working'
    },
  },
  getters: {
    getModeByIndex(state) {
      return (index) => {
        return state.modeList[index]
      }
    },
    contactStoreState(state) {
      return state.mode + '|' + testState().valueOfTest
    },
  },
})
