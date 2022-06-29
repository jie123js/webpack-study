<template>
  <HelloWorld />
  <br />
  <img style="width:20px" src="@/assets/kf.jpg" />
  <img style="width:20px" :src="imgUrl" />
  <div style="width:20px" class="avatar"></div>
</template>
<script setup>
import HelloWorld from '@/components/HelloWorld.vue';
import imgUrl from "@/assets/kf.jpg"
fetch('/api/todos/1').then(res => res.json()).then(result => console.log(result))
</script>
<style scoped>
.avatar {
  width: 20px;
  height: 20px;
  background-image: url(@/assets/kf.jpg);
  background-size: contain;
}
</style>