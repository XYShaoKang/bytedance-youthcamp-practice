import './style.css'
import Vue from './vue'
import { reactive } from './util'

const app = Vue.createApp({
  data() {
    return {
      title: 'hello, vue3!',
    }
  },
  setup() {
    const state = reactive({
      title: 'vue3,hello'.split(''),
    })
    setTimeout(() => {
      state.title = 'hello,vue3'.split('')
    }, 2000)
    return state
  },
})
app.mount('#app')
