<template>
  <div>{{ message }}</div>
  <div ref="container"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineExpose } from 'vue'
import monaco from 'monaco-editor
ref: container = null
ref: value = ''
ref: message = 'hello world2';
onMounted(() => {
  // if (container.value) {
  //   monaco.editor.create(
  //     container.value,
  //     value,
  //   )
  // }
})

defineExpose({
  container
})
</script>

<style>
</style>
