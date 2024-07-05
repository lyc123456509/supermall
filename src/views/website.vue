<template>
  <iframe ref="myiframe" :src="`http://home.922y.com?t=${+new Date()}`" frameborder="0" width="100%" height="100%"></iframe>
</template>

<script lang="ts" setup>
  const myiframe = ref(null);

  onMounted(() => {
    myiframe.value && ((myiframe.value as unknown as any).height = document.documentElement.clientHeight);
  });
</script>
