<template>
  <component :is="comp" />
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  import compEnum from './compEnum';
  const router = useRouter();
  const comp = compEnum[router.currentRoute.value.params.app as string];
</script>
