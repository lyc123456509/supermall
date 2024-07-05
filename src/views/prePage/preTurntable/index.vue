<template>
  <div>
    <div class="container">
      <img class="logo_img" :src="info.landingPageResponse.logoUrl" alt="" />
      <div class="statrZ" v-if="state.showStart">
        <img src="https://html.sccdyzl.com/vue-cps/turntable-200/start.png" alt="" />
      </div>
      <div class="title"> · 29.9元特权会员享 · </div>
      <div class="grabBox">
        <div class="light">
          <img :src="`https://html.sccdyzl.com/vue-cps/turntable-200/light${changeLight ? '1' : '2'}.png`" alt="" />
        </div>
        <div class="couponBox">
          <img
            src="https://html.sccdyzl.com/vue-cps/turntable-200/content1.png"
            alt=""
            ref="rotateAngle"
            :style="{ transform: `rotate(${state.angle}deg)` }"
          />
        </div>
        <div class="open_award" @click="grabCoupon">
          <img src="https://html.sccdyzl.com/vue-cps/turntable-200/play.png" alt="" />
        </div>
      </div>

      <companyInfo />
      <sideBar />
      <img
        :src="`https://nginx-beta.oss-cn-chengdu.aliyuncs.com/h5/activity/grabCoupon/tx/xw.gif?time=${state.time}`"
        alt=""
        class="light_ani"
        v-show="state.lightStatus"
      />
      <nut-overlay v-model:visible="show" :close-on-click-overlay="false" z-index="2007" class="popup_mod">
        <div class="wrapper" :class="aniStatus ? 'pub-scaleBig' : 'pub-scaleSmall'">
          <div class="content">
            <img class="sw" src="https://nginx-beta.oss-cn-chengdu.aliyuncs.com/h5/activity/grabCoupon/3w.png" alt="" />
            <div class="content-top">
              <div class="price">
                <span class="dw">¥</span><span class="price_text">{{ number }}</span>
                <img src="https://html.sccdyzl.com/vue-cps/turntable-200/hf.png" alt="" />
              </div>
            </div>
            <div class="content-bottom">
              <nut-input
                type="tel"
                v-model="phone"
                placeholder="请输入您的手机号"
                maxLength="11"
                :border="false"
                :left-icon="phoneIcon"
                style="width: 85%; background: '#fff'; font-size: 0.32rem; color: #333; font-weight: bold; padding: 0 0.16rem"
              />
              <img class="nowget" @click="getPayHandle" src="https://html.sccdyzl.com/vue-cps/turntable-200/pay-btn.png" alt="" />
              <PayMethod @change="payMethodCB" />

              <UserBook @change="isAgreeCB" :phone="phone" />
            </div>
          </div>
          <div class="close" @click="close">
            <img src="https://nginx-beta.oss-cn-chengdu.aliyuncs.com/h5/activity/grabCoupon/close.png" alt="" />
          </div>
        </div>
      </nut-overlay>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { useConfigStore } from '/@/store/modules/platform';
  import useCheckOrder from '/@/hooks/useCheckOrder';
  import { Toast } from '@nutui/nutui';
  import usePhone from '/@/hooks/usePhone';
  import phoneIcon from '/@/assets/activity/grabCoupon/phone.png';

  // import { getCurrentInstance } from 'vue';

  const configStore = useConfigStore();

  useCheckOrder();
  const info = computed(() => {
    return configStore.info;
  });
  const state = reactive({
    time: +new Date(),
    phone: usePhone(),
    isAgree: true,
    payType: '',
    changeLight: true,
    aniStatus: false,
    show: false,
    number: 200,
    lightStatus: false,
    angle: 0,
    showStart: true,
    onlyRotate: false,
  });
  const argRef = ref(null);
  const rotateAngle = ref();
  setTimeout(() => {
    state.showStart = false;
  }, 2000);
  onMounted(() => {
    rotateAngle.value.addEventListener('transitionend', function () {
      state.angle = 2160;
    });
  });
  const changeLit = () => {
    setInterval(() => {
      state.changeLight = !state.changeLight;
    }, 200);
  };
  changeLit();
  const grabCoupon = () => {
    if (!state.onlyRotate) {
      state.onlyRotate = true;
      state.angle = 2180;
      const timer1 = setTimeout(() => {
        state.lightStatus = true;
        clearTimeout(timer1);
        state.aniStatus = true;
        const timer2 = setTimeout(() => {
          state.show = true;
          argRef.value && (argRef.value as any).open();
          clearTimeout(timer2);
        }, 500);
      }, 8000);
    } else {
      state.show = true;
      state.aniStatus = true;
    }
  };
  const close = () => {
    state.time = +new Date();
    state.show = false;
    state.aniStatus = false;
    state.lightStatus = false;
  };
  const isAgreeCB = (agreeState: boolean) => {
    state.isAgree = agreeState;
  };
  const payMethodCB = (value: string) => {
    state.payType = value;
  };

  const emitFun = defineEmits(['changeStep']);
  const getPayHandle = () => {
    if (!state.isAgree) {
      Toast.text('请认真阅读用户隐私协议并同意');
      return;
    }

    if (state.phone.length !== 11) {
      Toast.text('请填写正确的手机号');
      return;
    }
    emitFun('changeStep', { step: 2, phone: state.phone });
  };

  const { changeLight, aniStatus, show, phone, number } = toRefs(state);
</script>

<style lang="scss" scoped>
  .container {
    width: 100vw;
    min-height: 100vh;
    background-image: url(https://html.sccdyzl.com/vue-cps/turntable-200/m-bg.png);
    background-repeat: no-repeat;
    background-size: contain;
    background-color: rgba(0, 0, 2, 0.9);
    padding: 0 0.03rem;
    box-sizing: border-box;
    overflow: hidden;
    .light_ani {
      position: absolute;
      width: 100%;
      height: 50vh;
      top: 50%;
      transform: translateY(-50%);
    }

    .logo_img {
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 0.1rem;
      position: absolute;
      left: 0.1rem;
      top: 0.6rem;
    }
    .statrZ {
      width: 100vw;
      min-height: 100vh;
      background-color: rgba(0, 0, 2, 0.8);
      position: fixed;
      top: 0;
      z-index: 999;
      img {
        width: 4rem;
        height: 6rem;
        position: absolute;
        top: 3.4rem;
        left: 1.74rem;
      }
    }
    .title {
      text-align: center;
      margin-top: 1.8rem;
      font-size: 0.24rem;
      color: rgb(249, 231, 206);
    }
    .grabBox {
      width: 7rem;
      height: 7rem;
      background-image: url(https://html.sccdyzl.com/vue-cps/turntable-200/content.png);
      background-repeat: no-repeat;
      background-size: contain;
      margin: 1.8rem auto 0 auto;
      position: relative;
      // z-index: 99;
      .light {
        img {
          width: 100%;
          height: 100%;
        }
      }

      .couponBox {
        img {
          width: 86%;
          height: 86%;
          position: absolute;
          top: 0.5rem;
          left: 0.5rem;
          transition: transform 4s ease-in-out;
        }
      }

      .open_award {
        width: 2.5rem;
        height: 2.7rem;
        position: absolute;
        top: 2.1rem;
        left: 2.3rem;
        img {
          width: 100%;
          height: 100%;
          animation: scaleDraw 2s infinite;
        }
        @keyframes scaleDraw {
          0%,
          50% {
            transform: scale(1);
          }
          25%,
          75% {
            transform: scale(1.1);
          }
        }
      }
    }
  }

  .pub-scaleSmall {
    animation: pubScaleSmall 0.3s ease-in-out forwards;
  }
  .pub-scaleBig {
    animation: pubScaleBig 0.3s ease-in-out forwards;
  }
  @keyframes pubScaleSmall {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }

  @keyframes pubScaleBig {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  .popup_mod {
    display: flex;
    justify-content: center;
    align-items: center;
    .wrapper {
      position: relative;
      width: 100vh;
      display: flex;
      // flex-direction: column;
      align-items: center;
      box-sizing: border-box;
      padding: 0.5rem 0.3rem;
      .sh,
      img {
        width: 100%;
        height: 100vh;
      }

      .luck {
        width: 100%;
        height: 1.03rem;
        transform: translateY(-400%);
      }

      .content {
        position: absolute;
        z-index: 98;
        width: 6.3rem;
        background: #fff0f0;
        border-radius: 0.4rem;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0.3rem;
        .sw {
          width: 4.6rem;
          height: 0.52rem;
          margin: 0.31rem auto;
        }
        .content-top {
          width: 100%;
          height: 2.64rem;

          // background: #f10002;
          border-radius: 0.4rem 0.4rem 0 0;
          .price {
            display: flex;
            justify-content: center;
            align-items: flex-end;
            color: #000;
            .dw {
              font-size: 1.2rem;
            }
            .price_text {
              font-size: 2rem;
              margin-left: 0.2rem;
              font-weight: 500;
            }
            img {
              width: 0.44rem;
              height: 1rem;
              margin-left: 0.2rem;
            }
          }
        }
        .content-bottom {
          width: 100%;
          // height: 4.57rem;
          border-radius: 0 0 0.4rem 0.4rem;

          display: flex;
          flex-direction: column;
          align-items: center;

          .nowget {
            width: 5.52rem;
            height: 0.9rem;
            margin-top: 0.16rem;
          }
        }
      }
      .close {
        position: absolute;
        top: 5rem;
        left: 3.3rem;
        img {
          width: 0.6rem;
          height: 0.6rem;
        }
      }
    }
  }

  @keyframes box_ani {
    0%,
    50% {
      transform: translateY(-3%);
    }
    100% {
      transform: translateY(0%);
    }
  }
</style>
