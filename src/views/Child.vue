<template>
  <!-- <div>child - {{a}} - {{b}} - {{c}} - {{d}}</div> -->
  <div>child - {{person}}</div>
</template>

<script setup lang="ts">
interface Iperson {
  name: string,
  age: number
}
// defineProps<bb>()
const props = defineProps<{
  a: string,
  b: number,
  person: Array<Iperson>
}>()
// const props = defineProps({
//   a: String,
//   b: Object,
//   c: Array,
//   d: bb[]
// })
</script>


<style scoped lang="scss">
</style>
