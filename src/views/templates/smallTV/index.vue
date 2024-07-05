<template>
  <div>
    <component :is="step" @nextStep="nextStep" />
  </div>
</template>

<script lang="ts" setup>
  import useCheckOrder from '/@/hooks/useCheckOrder';

  const waitGet = defineAsyncComponent(() => import('./waitGet.vue'));
  const unlockSuccess = defineAsyncComponent(() => import('./unlockSuccess.vue'));

  const stepEnum = {
    waitGet,
    unlockSuccess,
  };

  let step = shallowRef(stepEnum[sessionStorage.getItem('step') || 'waitGet']);

  const nextStep = (s: string) => {
    step.value = stepEnum[s];
  };

  const successCB = () => {
    step.value = unlockSuccess;
    sessionStorage.setItem('step', 'unlockSuccess');
  };

  useCheckOrder(successCB);
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
