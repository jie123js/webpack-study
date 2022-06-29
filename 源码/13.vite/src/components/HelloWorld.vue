<template>
  <h1>Hello</h1>
  <a>超链接</a>
  <a :class="style.link">超链接</a>
  <h2>less</h2>
  <h3>sass</h3>
  <div class="postcss"></div>
  <button @click="handleClick">{{ state.count }}</button>
</template>
<script setup lang="ts">
import style from './HelloWorld.module.css';
import { reactive } from 'vue';
defineProps({
  msg: String
});
interface State {
  count: number
}
let state = reactive({ count: 0 });
const handleClick = () => {
  state.count++;
}
</script>
<style lang="less">
@color: red;
h2 {
  color: @color;
}
</style>
<style lang="scss">
$color: green;
h3 {
  color: $color;
}
</style>
<style scoped>
.postcss {
  height: 20px;
  width: 100px;
  background-color: orange;
  transform: rotate(45deg);
}
</style>