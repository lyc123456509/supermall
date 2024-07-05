<template>
  <nut-icon name="left" size="0.3rem" class="back-icon" @click="jumpHandle" v-if="info.advertisingUrl" />
</template>

<script lang="ts" setup>
  import { backAdver } from '../../api';
  import { useConfigStore } from '/@/store/modules/platform';
  const configStore = useConfigStore();
  const info = computed(() => {
    return configStore.info;
  });
  const jumpHandle = async () => {
    const params = {
      advertisingUrl: info.value.advertisingUrl,
      trenchId: info.value.id,
      type: 1,
    };
    await backAdver(params);
    window.location.href = info.value.advertisingUrl;
  };
</script>

<style lang="scss" scoped>
  .back-icon {
    position: absolute;
    left: 0rem;
    top: 0.1rem;
    padding: 0.1rem;
    color: #fff;
  }
</style>
