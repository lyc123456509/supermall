<template>
  <div class="payMethod" v-if="info.payType">
    <slot name="title" v-if="props.slotTitle"></slot>
    <div class="payMethod_title" v-else>支付方式</div>
    <nut-radiogroup v-model="selectedPay" text-position="left" @change="handleChange">
      <nut-radio
        :label="item.method"
        icon-size="16"
        class="payMethodOne"
        v-for="item in info.payTypeWrap"
        :key="item.method"
        :disabled="!item.enable"
        icon-name="check-normal"
        icon-active-name="checked"
      >
        <img :src="`${item.method === 'WECHAT_PAY' ? icon_wx : icon_zfb}`" alt="" class="wxpay_icon" />
        <span>{{ item.method === 'WECHAT_PAY' ? '微信支付' : '支付宝支付' }}</span>
        <div v-show="props.template !== 'theatre'">首单随机立减，最高至免单</div>
      </nut-radio>
    </nut-radiogroup>
  </div>
</template>

<script setup lang="ts">
  import { useConfigStore } from '/@/store/modules/platform';
  import icon_wx from '/@/assets/blue/icon_wx.png';
  import icon_zfb from '/@/assets/blue/icon_zfb.png';

  const props = defineProps({
    template: {
      type: String,
      default: () => 'normal',
    },
    slotTitle: {
      type: Boolean,
      default: () => false,
    },
  });

  const configStore = useConfigStore();

  const info = computed(() => {
    return configStore.info;
  });

  let selectedPay = ref('');

  const emitFun = defineEmits(['change']);

  watch(
    info,
    () => {
      info.value.payTypeWrap.forEach((item) => {
        if (item.enable) {
          selectedPay.value = item.method;
        }
      });
      emitFun('change', selectedPay.value);
    },
    { immediate: true },
  );

  const handleChange = (value: string) => {
    console.log(value);
    emitFun('change', value);
  };
</script>

<style lang="scss" scoped>
  .payMethod {
    margin-top: 0.45rem;
    margin-bottom: 0.55rem;
    :deep(.nut-radiogroup) {
      width: 100%;
    }
    .payMethod_title {
      color: #2e2e2d;
      font-size: 0.29rem;
      margin-bottom: 0.2rem;
      font-weight: bold;
    }
    .payMethodOne {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      :deep(.nut-radio__label) {
        margin-left: auto;
        display: flex;
        align-items: center;
      }
      :deep(.nut-radio__icon) {
        color: #3b82fb;
      }
      img {
        width: 0.34rem;
        height: 0.34rem;
      }
      span {
        color: #2e2e2d;
        font-size: 0.25rem;
        margin: 0 0.1rem;
      }
      div {
        font-size: 0.21rem;
        padding: 0.07rem 0.1rem;
        color: #d42e22;
        border: 0.01px solid #d32e22;
        border-radius: 0.02rem;
      }
    }
  }
</style>
