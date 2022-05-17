<template>
  <!-- <Child a="zifuchuan" :b="obj" :c="arr" :d="arr2" /> -->
  <Child a="sd" :b="1" :person="arr2" />
</template>

<script setup lang="ts">
  import Child from './Child.vue'
interface Iperson {
  name: string,
  age: number
}
  const obj: Iperson = {
    name: 't',
    age: 1
  }
  const arr = [1,2,3]
  const arr2 = [
    {
      name: 'xm',
      age: 12
    },
    {
      name: 'xh',
      age: 13
    }
  ]
</script>


<style scoped lang="scss">
</style>
