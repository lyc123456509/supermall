<template>
  <div>
    <span class="logo">桃色剧场</span>
    <component :is="step" @nextStep="nextStep" />
  </div>
</template>

<script lang="ts" setup>
  import useCheckOrder from '/@/hooks/useCheckOrder';

  const step1 = defineAsyncComponent(() => import('./step1.vue'));
  const step2 = defineAsyncComponent(() => import('./step2.vue'));
  const step3 = defineAsyncComponent(() => import('./step3.vue'));

  const stepEnum = {
    step1,
    step2,
    step3,
  };

  let step = ref(stepEnum[sessionStorage.getItem('step') || 'step1']);

  const nextStep = (s: string) => {
    step.value = stepEnum[s];
  };

  const successCB = () => {
    step.value = step3;
    sessionStorage.setItem('order_no', sessionStorage.getItem('orderId') as string);
    sessionStorage.setItem('step', 'step3');
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
