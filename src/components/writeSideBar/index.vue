<template>
  <div class="rule">
    <div class="sidebar_hint" @click="rulesHandle" v-if="info.landingPageResponse.rulsUrlValue">活<br />动<br />规<br />则</div>
    <div class="sidebar_hint" @click="customsHandle" v-if="info.landingPageResponse.customerUrlValue">在<br />线<br />客<br />服</div>
    <div class="sidebar_hint" @click="jumpToRefoundView" v-if="refundStatus">在线退款</div>
    <div class="sidebar_hint" @click="downloadApp" v-if="props.downloadShow">下载APP</div>
    <nut-popup v-model:visible="show" pop-class="popclass">
      <div class="rule_mod">
        <h3 class="rule-title">活动规则</h3>
        <div class="rule_content">{{ info.landingPageResponse.rulsUrlValue }}</div>
        <nut-button type="primary" color="#e15ae8" @click="show = false">确定</nut-button>
        <!-- <van-button color="#e15ae8" round @click="show = false">确定</van-button> -->
      </div>
    </nut-popup>
  </div>
</template>

<script setup lang="ts">
  import { useConfigStore } from '/@/store/modules/platform';
  import router from '/@/router/index';

  const configStore = useConfigStore();
  const info = computed(() => {
    return configStore.info;
  });
  let show = ref(false);

  const props = defineProps({
    downloadShow: {
      type: Boolean,
      default: () => false,
    },
    refundStatus: {
      type: Boolean,
      default: false,
    },
  });

  const jumpToRefoundView: any = () => {
    router.push({ path: '/system/smsServer', query: { refundCode: 'true' } });
  };

  const customsHandle: any = () => {
    window.open(info.value.landingPageResponse.customerUrlValue);
  };
  const rulesHandle: any = () => {
    show.value = true;
  };
  const downloadApp: any = () => {
    window.open(info.value.applyDownUrl);
  };
</script>

<style lang="scss" scoped>
  .rule {
    position: fixed;
    right: 0;
    top: 0.34rem;
    height: 3.26rem;
    font-size: 0.24rem;
    color: #333;
    z-index: 10;

    &::first-child {
      margin-top: 0.6rem;
    }
  }

  .sidebar_hint {
    border: 1px solid #fff;
    color: #fff;
    width: 0.5rem;
    text-align: center;
    padding: 0.1rem 0;
    border-radius: 0.2rem 0 0 0.2rem;
    margin-top: 0.3rem;
    box-shadow: inset 0px 0px 3px 1px #fff;
    opacity: 0.9;
  }

  .rule_mod {
    display: flex;
    flex-direction: column;
    width: 5.4rem;
    height: 8rem;
    padding: 0.4rem 0.2rem;
    line-height: 1.7;
  }

  .rule-title {
    text-align: center;
  }

  .rule_content {
    overflow-y: auto;
    white-space: pre-wrap;
  }
</style>
