<template>
  <component :is="step" @nextStep="nextStep" />
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
