<script setup lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
const state = reactive({
  disabledDate(time: { getTime: () => number }) {
    return time.getTime() > Date.now()
  },
  shortcuts: [
    {
      text: 'Today',
      value: new Date(),
    },
    {
      text: 'Yesterday',
      value: () => {
        const date = new Date()
        date.setTime(date.getTime() - 3600 * 1000 * 24)
        return date
      },
    },
    {
      text: 'A week ago',
      value: () => {
        const date = new Date()
        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
        return date
      },
    },
  ],
  value1: '',
  value2: '',
})
</script>

<template>
  <h1>{{ msg }}</h1>

  <el-button type="primary">Primary</el-button>
  <div class="demo-date-picker">
    <div class="block">
      <span class="demonstration">Default</span>
      <el-date-picker v-model="state.value1" type="date" placeholder="Pick a day">
      </el-date-picker>
    </div>
    <div class="block">
      <span class="demonstration">Picker with quick options</span>
      <el-date-picker
        v-model="state.value2"
        type="date"
        placeholder="Pick a day"
        :disabled-date="state.disabledDate"
        :shortcuts="state.shortcuts"
      >
      </el-date-picker>
    </div>
  </div>

  <p>
    Recommended IDE setupp:
    <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <p>See <code>README.md</code> for more information.</p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Docs
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
  </p>

  <button type="button" @click="count++">count is: {{ count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
