<template>
  <div>
    <component :is="step" @nextStep="nextStep" />
  </div>
</template>

<script lang="ts" setup>
  // import useCheckOrder from '/@/hooks/useCheckOrder';
  // import Url from 'domurl';
  // import { encode } from 'js-base64';
  // import { useConfigStore } from '/@/store/modules/platform';
  import { getQueryParam } from '/@/utils';

  // const configStore = useConfigStore();
  // const info = computed(() => {
  //   return configStore.info;
  // });

  const waitGet = defineAsyncComponent(() => import('./waitGet.vue'));
  const unlockSuccess = defineAsyncComponent(() => import('./unlockSuccess.vue'));
  const waitGetSecond = defineAsyncComponent(() => import('./waitGetSecond.vue'));

  const stepEnum = {
    waitGet,
    waitGetSecond,
    unlockSuccess,
  };

  let step = shallowRef(stepEnum[sessionStorage.getItem('step') || getQueryParam('step') || 'waitGet']);

  const nextStep = (s: string) => {
    step.value = stepEnum[s];
  };

  // const successCB = () => {
  //   if (info.value.secondaryPayScaleType === 1 && info.value.secondaryPayType === 1) {
  //     const href = new Url(sessionStorage.getItem('returnUrl'));
  //     href.query.phone = encode(sessionStorage.phone);
  //     window.location.href = href;
  //     sessionStorage.setItem('step', 'waitGetSecond');
  //   } else {
  //     step.value = unlockSuccess;
  //     sessionStorage.setItem('step', 'unlockSuccess');
  //   }
  // };

  // useCheckOrder(successCB);
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
