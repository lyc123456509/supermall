<template>
  <div>
    <div class="container">
      <img class="logo" :src="info.landingPageResponse.logoUrl" alt="" v-if="props.logo" />
      <div class="price">{{ 19.9 }}元</div>
      <div class="prize">抢购IPhone 13 Pro</div>
      <img class="prizeImg" :src="phoneImg" alt="" />
      <img class="guang" :src="guangGif" alt="" />
      <div class="input-container">
        <nut-input
          type="tel"
          input-align="center"
          v-model="phone"
          placeholder="请输入您的手机号"
          maxLength="11"
          :border="false"
          class="input"
        />
      </div>
      <div class="confirm">
        <img class="confirmImg" :src="btnImg" alt="" @click="getPayHandle" />
        <img class="sz" :src="szImg" alt="" />
      </div>
      <UserBook @change="isAgreeCB" :phone="phone" />
      <prizeList />
      <companyInfo style="color: #ffffff" />
      <sideBar :downloadShow="true" />
    </div>
  </div>
</template>
<script setup lang="ts">
  import { PayCenter } from '/@/utils/pay';
  import useRandomMoney from '/@/hooks/useRandomMoney';
  import { useConfigStore } from '/@/store/modules/platform';
  import useCheckOrder from '/@/hooks/useCheckOrder';
  import { Toast } from '@nutui/nutui';
  import prizeList from './components/prizeList.vue';
  import phoneImg from '/@/assets/phoneBox/iphone.png';
  import guangGif from '/@/assets/phoneBox/guang.png';
  import btnImg from '/@/assets/phoneBox/btn.png';
  import szImg from '/@/assets/phoneBox/sz.png';
  import { Dialog } from '@nutui/nutui';
  import usePhone from '/@/hooks/usePhone';

  const props = defineProps({
    logo: {
      type: Boolean,
      default: () => true,
    },
  });

  const configStore = useConfigStore();
  const { randomMoney } = await useRandomMoney();
  useCheckOrder();

  const info = computed(() => {
    return configStore.info;
  });
  const submitLoading = computed(() => {
    return configStore.submitLoading;
  });
  const state = reactive({
    phone: usePhone(),
    isAgree: true,
  });

  const isAgreeCB = (agreeState: boolean) => {
    state.isAgree = agreeState;
  };

  const getPayHandle: any = () => {
    if (!state.isAgree) {
      Toast.text('请认真阅读用户隐私协议并同意');
      return;
    }
    if (state.phone.length !== 11) {
      Toast.text('请填写正确的手机号');
      return;
    }
    if (submitLoading.value) {
      return;
    }

    const ok = () => {
      //  支付
      new PayCenter(info.value.applyIdentification).pay({
        phone: state.phone,
        randomMoney: randomMoney.value,
      });
    };

    if (info.value.landingPageResponse.reviewWindows) {
      Dialog({
        title: '支付确认',
        content: '是否确认支付？',
        onOk: ok,
      });
    } else {
      ok();
    }
  };

  const { phone } = toRefs(state);
</script>

<style lang="scss" scoped>
  .container {
    background-image: url(/@/assets/phoneBox/bg.png);
    width: 100vw;
    min-height: 100vh;
    background-repeat: no-repeat;
    background-size: contain;
    background-color: #f95f41;
    padding: 0 0.2rem;
    box-sizing: border-box;
    position: absolute;
    .logo {
      height: 1rem;
      margin-top: 0.2rem;
      position: absolute;
      top: 0.2rem;
      left: 0.2rem;
    }
    .price {
      background: url(http://y-qiwan.obs.cn-north-4.myhuaweicloud.com/qwhz-h5/page/spread/img/spread2/price.png) no-repeat;
      background-size: 100% 100%;
      width: 3.28rem;
      height: 1.34rem;
      margin: -0.4rem auto 0;
      font-size: 0.45rem;
      text-align: center;
      font-weight: 600;
      color: #ff0900;
      line-height: 1.04rem;
      animation: titleAnimation 1.8s linear infinite;
      margin-top: 0.4rem;
    }
    @keyframes titleAnimation {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.3);
      }
      100% {
        transform: scale(1);
      }
    }
    .prize {
      text-align: center;
      font-size: 0.6rem;
      font-weight: 600;
      font-style: italic;
      color: #ffedcc;
      text-shadow: 0rem 0.07rem 0.04rem rgb(239 30 0 / 95%);
      line-height: 0.74rem;
    }
    .prizeImg {
      display: block;
      margin: 1.13rem auto 0;
      width: 3.5rem;
      height: 4.49rem;
      position: relative;
      z-index: 2;
    }
    .guang {
      position: absolute;
      top: 3.3rem;
      left: 0;
      width: 7.5rem;
      height: 8.16rem;
      animation: flashAnimation 6s linear infinite;
    }

    @keyframes flashAnimation {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(1turn);
      }
    }
    .input-container {
      margin: 0.82rem auto 0;
      width: 5.59rem;
      height: 1.51rem;
      background: url(/@/assets/phoneBox/input.png) no-repeat;
      background-size: 100% 100%;
      display: flex;
      position: relative;
      z-index: 2;
      .input {
        width: 100%;
        height: 100%;
        background: transparent;
        font-size: 0.34rem;
        font-weight: bold;
        padding: 0 0.54rem;
        margin: 0;
        :deep(input) {
          width: 100%;
          height: 1.51rem;
          line-height: 1.51rem;
          color: #f12800;
          &::placeholder {
            color: #f12800;
          }
        }
      }
    }
    .confirm {
      margin: 0.07rem auto 0;
      width: 5.6rem;
      height: 1.95rem;
      position: relative;
      .confirmImg {
        display: block;
        width: 5.6rem;
        height: 1.95rem;
        animation: btnAnimation 0.6s linear infinite;
      }
      @keyframes btnAnimation {
        0% {
          transform: rotate(0deg);
        }
        25% {
          transform: rotate(-3deg);
        }
        50% {
          transform: rotate(0deg);
        }
        75% {
          transform: rotate(3deg);
        }
        100% {
          transform: rotate(0deg);
        }
      }
      .sz {
        position: absolute;
        top: 0.64rem;
        right: -0.53rem;
        width: 1.7rem;
        height: 1.81rem;
        animation: fingerAnimation 1s linear infinite;
      }

      @keyframes fingerAnimation {
        0% {
          transform: scale(1);
        }
        25% {
          transform: scale(1.2);
        }
        50% {
          transform: scale(1);
        }
        75% {
          transform: scale(1.2);
        }
        100% {
          transform: scale(1);
        }
      }
    }
  }
</style>
