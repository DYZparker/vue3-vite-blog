<!-- <script setup lang="ts">
import Father from './Father.vue';
</script>

<template>
  <div>
    home
    <Father></Father>
  </div>
</template> -->

<style scoped lang="scss">
</style>


<template>
    <div class="hello">
       <h1>计算属性</h1>
        姓：<input type="text" v-model="obj.firstName">
        <br>
        名：<input type="text" v-model="obj.lateName">
 
        <h2>合计：{{fullNum}}</h2>
 
        合计：<input type="text" v-model="fullNum">
    </div>
</template>
 
<script  lang="ts">
    import {reactive,computed} from  'vue'
    export default {
        name: 'Home',
        setup() {
            let obj = reactive({
                firstName:'1',
                lateName:'2',
            })
 
            //计算属性简写方式(计算属性不可被修改)
            // obj.fullNum = computed(()=>{
            //     return obj.firstName + '-' +obj.lateName
            // });
 
            //计算属性完整写法（可读写）
            const fullNum = computed({
                get(){
                    return obj.firstName + '-' + obj.lateName
                },
                set(value: string){
                    const nameArr = value.split('-')
                    obj.firstName = nameArr[0]
                    obj.lateName = nameArr[1]
                }
            });
 
            return {
                obj,
                fullNum
            }
        },
        props: {
            msg: String
        }
    }
</script>
