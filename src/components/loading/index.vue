<template>
  <div></div>
</template>

<script setup lang="ts">
  import { useConfigStore } from '/@/store/modules/platform';
  const configStore = useConfigStore();

  const loading = computed(() => {
    return configStore.loading;
  });
  console.log(loading.value);
</script>

<style lang="scss" scoped>
  .loading-component {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 999999;
    transform: translateX(-50%) translateY(-50%);
  }
</style>
