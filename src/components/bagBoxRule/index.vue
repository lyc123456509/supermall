<template>
  <div class="rule">
    <div class="sidebar_hint" @click="rulesHandle" v-if="info.landingPageResponse.rulsUrlValue">活动规则</div>
    <div class="customer" @click="customsHandle" v-if="info.landingPageResponse.customerUrlValue"></div>
    <div class="sidebar_hint" @click="jumpToRefoundView" v-if="refundStatus">在线退款</div>
    <div class="sidebar_hint" @click="downloadApp" v-if="props.downloadShow">下载APP</div>
    <nut-popup v-model:visible="show" pop-class="popclass" z-index="2006">
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
    itemStyle: {
      default: {},
    },
  });

  onMounted(() => {
    const sidebar_hint = document.querySelectorAll('.sidebar_hint');
    for (let i = 0; i < sidebar_hint.length; i++) {
      Object.keys(props.itemStyle).map((key) => {
        (sidebar_hint[i] as any).style[key] = props.itemStyle[key];
      });
    }
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
    position: absolute;
    right: 0;
    top: 0rem;
    height: 3.26rem;
    font-size: 0.24rem;
    color: #333;
    z-index: 2007;

    &::first-child {
      margin-top: 0.6rem;
    }
  }

  .sidebar_hint {
    position: absolute;
    right: 0;
    top: 1.4rem;
    z-index: 11;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 0.48rem;
    height: 1.3rem;
    border-radius: 0.3rem 0 0 0.3rem;
    background: linear-gradient(to right, #999, #ccc);
    font-size: 0.25rem;
    color: #fff;
    writing-mode: vertical-lr;
    zoom: 0.8;
  }

  .customer {
    position: absolute;
    right: 0.4rem;
    top: 0.2rem;
    width: 0.8rem;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    &::after {
      content: '客服投诉';
      line-height: 0.25rem;
      color: #333;
      font-size: 0.25rem;
      zoom: 0.8;
    }
    &::before {
      content: '';
      width: 0.44rem;
      height: 0.44rem;
      margin-bottom: 0.1rem;
      background: url(https://apkdl.mochai.store/pic/lede/images/landing30/service1.svg) no-repeat 0 0;
      background-size: 100% 100%;
    }
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
