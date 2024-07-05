<template>
  <div>
    <component :is="step" @nextStep="nextStep" />
  </div>
</template>

<script lang="ts" setup>
  import { getQueryParam } from '/@/utils';
  const waitGet = defineAsyncComponent(() => import('./waitGet.vue'));
  const waitGetSecond = defineAsyncComponent(() => import('./waitGetSecond.vue'));

  const stepEnum = {
    waitGet,
    waitGetSecond,
  };

  let step = shallowRef(stepEnum[sessionStorage.getItem('step') || getQueryParam('step') || 'waitGet']);

  const nextStep = (s: string) => {
    step.value = stepEnum[s];
  };
</script>

<style lang="scss" scoped>
  .logo {
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    color: rgb(254 252 51 / 69%);
    font-size: 0.3rem;
    z-index: 1;
  }
</style>
