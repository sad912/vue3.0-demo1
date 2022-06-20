import { defineStore } from 'pinia'

export const testState = defineStore('TEST', {
  state: () => {
    return {
      test: '测试',
    }
  },
  getters: {
    valueOfTest(state) {
      return state.test
    },
  },
})
