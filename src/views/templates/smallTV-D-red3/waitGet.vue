<template>
  <div class="container">
    <div class="animation-char" v-if="state.showCharAnimation">
      <img src="@/assets/smallTV-D-red/太.png" alt="" />
      <img src="@/assets/smallTV-D-red/棒.png" alt="" />
      <img src="@/assets/smallTV-D-red/了,.png" alt="" />
      <img src="@/assets/smallTV-D-red/恭.png" alt="" />
      <img src="@/assets/smallTV-D-red/喜.png" alt="" />
      <img src="@/assets/smallTV-D-red/您.png" alt="" />
      <img src="@/assets/smallTV-D-red/！.png" alt="" style="width: 0.24rem" />
    </div>
    <img src="@/assets/smallTV-D-red/gx.png" alt="" class="wait" v-if="guess === '1'" />
    <img src="@/assets/smallTV-D-red/waitGet.png" alt="" class="wait" v-else />
    <img src="@/assets/smallTV-D-red/true.png" alt="" class="guess" v-if="guess === '1'" />
    <img src="@/assets/smallTV-D-red/false.png" alt="" class="guess" v-else-if="guess === '-1'" />
    <img src="@/assets/smallTV-D-red/js.png" alt="" class="csj" />
    <div class="bottom-container">
      <nut-swiper :init-page="1" :loop="true" auto-play="3000" direction="vertical" height="40" style="height: 40px">
        <nut-swiper-item v-for="item in userData" :key="item.name">
          <div class="user-item">
            <img :src="item.avatar" alt="" style="width: 0.36rem; height: 0.36rem; border-radius: 50%" />
            <span style="margin-left: 0.33rem">{{ item.name }}</span>
            <span style="color: #585353; margin-left: auto">已经领取看短剧<span style="color: #ea3323">抽iPhone福利</span></span>
          </div>
        </nut-swiper-item>
      </nut-swiper>
      <img src="@/assets/smallTV-D-red/btn_lq.png" class="nowGet" alt="" @click="submitHandle" />
      <div class="pay"> <img src="@/assets/smallTV2/aqzf.png" alt="" />微信安全支付<img src="@/assets/smallTV2/checked.png" alt="" /> </div>
    </div>
    <SideBar
      style="top: 1.56rem"
      :itemStyle="{
        color: '#845e07',
        background: '#e9d6ad',
        border: '0px',
        padding: '0.06rem 0.12rem',
        fontSize: '0.24rem',
        boxShadow: '1px 1px 4px 1px #958888',
        marginTop: '0.2rem',
      }"
    />
    <CompanyInfo style="color: #e07963; margin-top: 0rem" />
    <img :src="info.landingPageResponse.logoUrl" class="logo" alt="" />
  </div>
</template>

<script lang="ts" setup>
  import { getCurrentInstance } from 'vue';
  import router from '/@/router';
  import useCheckOrder from '/@/hooks/useCheckOrder';
  import Url from 'domurl';
  import { useConfigStore } from '/@/store/modules/platform';
  import { PayCenter } from '/@/utils/pay';
  import { getQueryParam } from '/@/utils';
  import { userData } from './mockData';
  const configStore = useConfigStore();
  const info = computed(() => {
    return configStore.info;
  });
  const { proxy } = getCurrentInstance() as any;
  const state = reactive({
    showCharAnimation: false,
  });
  const startAnimation = () => {
    state.showCharAnimation = true;
    setTimeout(() => {
      state.showCharAnimation = false;
      proxy.$confetti.start();
      setTimeout(() => {
        proxy.$confetti.stop();
      }, 2000);
    }, 2500);
  };
  onMounted(() => {
    if (getQueryParam('guess') === '1') {
      startAnimation();
    }
  });
  const emitFun = defineEmits(['nextStep']);
  const guess = ref(router.currentRoute.value.query.guess || '0');
  const submitHandle = () => {
    new PayCenter(info.value.applyIdentification).pay({
      randomMoney: 9.9,
      touFangType: 'xjc',
      phone: (+new Date()).toString().slice(2),
    });
  };
  console.log('redirect_url from config');

  const successCB = () => {
    if (info.value.secondaryPayScaleType === 1 && info.value.secondaryPayType === 1) {
      const href = new Url(sessionStorage.getItem('returnUrl'));
      sessionStorage.setItem('step', 'waitGetSecond');
      href.query.step = 'waitGetSecond';
      (href.query.orderId = ''), (window.location.href = href);
    } else {
      emitFun('nextStep', 'unlockSuccess');
      sessionStorage.setItem('step', 'unlockSuccess');
    }
  };

  useCheckOrder(successCB);
</script>

<style lang="scss" scoped>
  .animation-char {
    background-color: rgba(0, 0, 0, 0.89);
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    z-index: 99;
    transform-style: preserve-3d;
    perspective: 1000;
    img {
      position: absolute;
      top: 4.4rem;
      height: 0.75rem;
      transform: translateZ(13rem);
      animation-name: charAnimation;
      animation-duration: 0.3s;
      animation-fill-mode: forwards;
      &:nth-child(1) {
        left: 0.49rem;
        animation-delay: 0s;
      }
      &:nth-child(2) {
        left: 1.45rem;
        animation-delay: 0.3s;
      }
      &:nth-child(3) {
        left: 2.43rem;
        animation-delay: 0.6s;
      }
      &:nth-child(4) {
        left: 3.57rem;
        animation-delay: 0.9s;
      }
      &:nth-child(5) {
        left: 4.53rem;
        animation-delay: 1.2s;
      }
      &:nth-child(6) {
        left: 5.49rem;
        animation-delay: 1.5s;
      }
      &:nth-child(7) {
        left: 6.49rem;
        animation-delay: 1.8s;
      }
    }
    @keyframes charAnimation {
      0% {
        transform: translateZ(13rem);
      }
      100% {
        transform: translateZ(0rem);
      }
    }
  }
  .container {
    background-image: url('/@/assets/smallTV-D-red/bg3.png');
    background-size: 100% auto;
    background-repeat: no-repeat;
    background-color: #b5351a;
    width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    color: #5b5c5e;
    font-size: 0.27rem;
    .guess {
      position: absolute;
      top: 8.32rem;
      width: 4.64rem;
    }
    .csj {
      position: absolute;
      width: 1.79rem;
      top: 5.08rem;
      right: 0.46rem;
    }
    .logo {
      position: absolute;
      top: 0.09rem;
      left: 0.34rem;
      width: 0.95rem;
    }
    .wait {
      width: 6.27rem;
      margin-top: 0.43rem;
    }
    .bottom-container {
      margin-top: 7.54rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-image: url(/@/assets/smallTV-D-red/bottom.png);
      background-size: 100% auto;
      background-repeat: no-repeat;
      width: 100vw;
      height: 4.13rem;
      .user-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.65rem;
      }
      .unlock-price {
        font-size: 0.27rem;
        margin-bottom: 0.25rem;
        .price {
          color: #c5793b;
        }
      }
      .after-unlock {
        margin-bottom: 0.35rem;
      }
      .nowGet {
        width: 6.1rem;
        margin-bottom: 0.36rem;
      }
      .pay {
        display: flex;
        align-items: center;
        width: 6.1rem;
        img {
          &:nth-child(1) {
            width: 0.4rem;
            margin-right: 0.15rem;
          }
          &:nth-child(2) {
            width: 0.36rem;
            margin-left: auto;
          }
        }
      }
    }
  }
</style>
