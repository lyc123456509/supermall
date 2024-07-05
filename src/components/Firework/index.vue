<template>
  <canvas class="fire-canvas" id="canvas" ref="canvasRef" :width="1920" :height="950"></canvas>
</template>

<script lang="ts" setup>
  import '/@/assets/js/firework';
  const canvasRef = ref<any>(null);
  onMounted(() => {
    canvasRef.value.style.display = 'block';
  });
</script>

<style>
  .fire-canvas {
    display: block;
    z-index: 999;
    pointer-events: none;
    position: fixed;
    top: 0;
  }
</style>
