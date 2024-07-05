<template>
  <component :is="page" />
</template>

<script lang="ts" setup>
  import { useRoute } from 'vue-router';
  const route = useRoute();
  const compEnum = {
    searchResult: defineAsyncComponent(() => import('./searchResult.vue')),
    wedlockResult: defineAsyncComponent(() => import('./wedlockResult.vue')),
  };
  const page = ref(compEnum[(route.params.pageName as string) || 'searchResult']);
  watch(
    () => route.params.pageName,
    () => {
      page.value = compEnum[route.params.pageName as string];
    },
  );
</script>
