<template>
  <div class="footerInfo" :style="{ color: color }">
    <div
      >客服电话：<span class="phone">{{ info.landingPageResponse.customerPhone }}</span></div
    >
    <div class="company" v-if="companyStatus">{{ subject.company }}</div>
    <span v-if="addressStatus"
      ><span class="address">{{ subject.address }}</span></span
    >
    <div v-if="filingStatus"
      >网站备案/许可证号：<a class="recordNumber" href="https://beian.miit.gov.cn/" target="_blank" recordNumber>{{
        domain.recordNumber
      }}</a>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useConfigStore } from '/@/store/modules/platform';

  const configStore = useConfigStore();

  defineProps({
    color: {
      type: String,
      value: '#181717',
    },
    companyStatus: {
      type: Boolean,
      default: true,
    },
    addressStatus: {
      type: Boolean,
      default: true,
    },
    filingStatus: {
      type: Boolean,
      default: true,
    },
  });

  const info = computed(() => {
    console.log(configStore.info.subjectValue);
    return configStore.info;
  });

  const subject = computed(() => {
    return JSON.parse(info.value.subjectValue);
  });

  const domain = computed(() => {
    return JSON.parse(info.value.domainValue);
  });
</script>
<style lang="scss" scoped>
  .footerInfo {
    font-size: 0.24rem;
    color: #181717;
    text-align: center;
    line-height: 0.5rem;
    .recordNumber {
      color: inherit;
    }
  }
</style>
