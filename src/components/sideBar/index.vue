<template>
  <div class="rule">
    <div class="sidebar_hint" @click="rulesHandle" v-if="info.landingPageResponse.rulsUrlValue">活动规则</div>
    <div class="sidebar_hint" @click="customsHandle" v-if="info.landingPageResponse.customerUrlValue && !props.customerRender"
      ><img :src="props.customerIcon" alt="" v-if="props.customerIcon" />{{ props.customerContent }}</div
    >
    <div
      @click="customsHandle"
      :style="props.customerRender"
      v-else-if="info.landingPageResponse.customerUrlValue && props.customerRender"
    ></div>
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
    itemStyle: {
      default: {},
    },
    customerContent: {
      type: String,
      default: '在线客服',
    },
    customerIcon: {
      type: String,
      default: '',
    },
    customerRender: {
      type: Object,
      default: () => {},
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
    position: fixed;
    right: 0;
    top: 0.96rem;
    height: 3.26rem;
    font-size: 0.24rem;
    color: #333;
    z-index: 10;

    &::first-child {
      margin-top: 0.6rem;
    }
  }

  .sidebar_hint {
    background: -webkit-linear-gradient(top, rgb(247, 239, 223), rgb(236, 197, 97));
    background: linear-gradient(to bottom, rgb(247, 239, 223), rgb(236, 197, 97));
    color: #fe5903;
    border: 0.05rem solid #fff;
    border-right: 0;
    box-shadow: 0px 0px 1.66667rem 0px rgb(94 94 94 / 26%);
    border-radius: 0.35rem 0 0 0.35rem;
    -webkit-border-radius: 0.35rem 0 0 0.35rem;
    -moz-border-radius: 0.35rem 0 0 0.35rem;
    -ms-border-radius: 0.35rem 0 0 0.35rem;
    -o-border-radius: 0.35rem 0 0 0.35rem;
    line-height: 0.35rem;
    padding: 0.06rem 0.1rem;
    text-align: center;
    word-wrap: break-word;
    margin-top: 0.16rem;
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
