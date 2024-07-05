<template>
  <div>
    <div class="container">
      <img class="logo_img" :src="info.landingPageResponse.logoUrl" alt="" />
      <div class="title"> · 49.9元特权会员享 · </div>
      <div class="grabBox">
        <div class="light">
          <img :src="`https://nginx-beta.oss-cn-chengdu.aliyuncs.com/h5/activity/grabCoupon/light${changeLight ? '1' : '2'}.png`" alt="" />
        </div>
        <div
          class="couponBox"
          :style="{
            'background-image': `url(https://nginx-beta.oss-cn-chengdu.aliyuncs.com/h5/activity/grabCoupon/tx/${
              changeButtom ? 'bg-xh' : 'bg-zq'
            }.gif?time=${state.time})`,
          }"
        >
          <!-- <img class="couponBox" src="https://nginx-beta.oss-cn-chengdu.aliyuncs.com/h5/activity/grabCoupon/tx/bg-hd.gif" alt="" /> -->
          <!-- <div class="hand">
            <img :src="`https://nginx-beta.oss-cn-chengdu.aliyuncs.com/h5/activity/grabCoupon/tx/${!state.handAni ? 'xh' : 'zq'}.gif`" alt="" />
          </div>
          <div class="coupon">
            <img src="https://nginx-beta.oss-cn-chengdu.aliyuncs.com/h5/activity/grabCoupon/100W.png" alt="" :class="state.lightStatus ? 'img_ani' : ''" />
          </div> -->
        </div>
        <div class="open_award" @click="grabCoupon">
          <img
            :src="
              changeButtom
                ? 'https://nginx-beta.oss-cn-chengdu.aliyuncs.com/h5/activity/grabCoupon/grab2.png'
                : 'https://nginx-beta.oss-cn-chengdu.aliyuncs.com/h5/activity/grabCoupon/grab.png'
            "
            alt=""
          />
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
      <img
        :src="`https://nginx-beta.oss-cn-chengdu.aliyuncs.com/h5/activity/grabCoupon/tx/sh.gif?time=${state.time}`"
        alt=""
        class="light_ani flower"
        v-show="number > 77 && number < 99"
      />
      <nut-overlay v-model:visible="show" :close-on-click-overlay="false" z-index="2007" class="popup_mod">
        <div class="wrapper" :class="aniStatus ? 'pub-scaleBig' : 'pub-scaleSmall'">
          <!-- <div class="sh">
            <img src="https://nginx-beta.oss-cn-chengdu.aliyuncs.com/h5/activity/grabCoupon/tx/sh.gif" alt="" />
          </div> -->
          <img class="luck" src="https://nginx-beta.oss-cn-chengdu.aliyuncs.com/h5/activity/grabCoupon/yq.png" alt="" />
          <div class="content">
            <div class="content-top">
              <div class="price">
                <span class="dw">¥</span><span class="price_text">{{ number }}</span>
                <img src="https://nginx-beta.oss-cn-chengdu.aliyuncs.com/h5/activity/grabCoupon/hfq.png" alt="" />
              </div>
            </div>
            <div class="content-bottom">
              <img class="sw" src="https://nginx-beta.oss-cn-chengdu.aliyuncs.com/h5/activity/grabCoupon/3w.png" alt="" />
              <nut-input
                type="tel"
                v-model="phone"
                placeholder="请输入您的手机号"
                maxLength="11"
                :border="false"
                :left-icon="phoneIcon"
                style="width: 76%; background: '#fff'; font-size: 0.32rem; color: #333; font-weight: bold; padding: 0 0.06rem"
              />
              <img
                class="nowget"
                @click="getPayHandle"
                src="https://nginx-beta.oss-cn-chengdu.aliyuncs.com/h5/activity/grabCoupon/nowget.png"
                alt=""
              />
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
  import { PayCenter } from '/@/utils/pay';
  import useRandomMoney from '/@/hooks/useRandomMoney';
  import { useConfigStore } from '/@/store/modules/platform';
  import useCheckOrder from '/@/hooks/useCheckOrder';
  import { Toast } from '@nutui/nutui';
  import usePhone from '/@/hooks/usePhone';
  import phoneIcon from '/@/assets/activity/grabCoupon/phone.png';

  // import { getCurrentInstance } from 'vue';

  const configStore = useConfigStore();
  const { randomMoney } = useRandomMoney();
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
    changeButtom: true,
    aniStatus: false,
    show: false,
    number: 77,
    handAni: false,
    lightStatus: false,
  });
  const argRef = ref(null);
  const changeLit = () => {
    setInterval(() => {
      state.changeLight = !state.changeLight;
    }, 200);
  };
  changeLit();
  const restNumber = () => {
    setTimeout(() => {
      if (state.number <= 99) {
        restNumber();
        state.number++;
      }
    }, 50);
  };
  const grabCoupon = () => {
    state.changeButtom = false;
    setTimeout(() => {
      state.changeButtom = true;
      state.handAni = true;
    }, 3000);
    const timer1 = setTimeout(() => {
      state.lightStatus = true;
      clearTimeout(timer1);
    }, 1050);
    const timer2 = setTimeout(() => {
      state.lightStatus = false;
      state.aniStatus = true;
      state.show = true;
      restNumber();
      argRef.value && (argRef.value as any).open();
      clearTimeout(timer2);
    }, 1700);
  };
  const close = () => {
    // window.location.reload();
    state.time = +new Date();
    state.show = false;
    state.changeButtom = true;
    state.aniStatus = false;
    state.handAni = false;
    state.lightStatus = false;
    state.number = 77;
  };
  const isAgreeCB = (agreeState: boolean) => {
    state.isAgree = agreeState;
  };
  // const submitLoading = computed(() => {
  //   return configStore.submitLoading;
  // });
  const payMethodCB = (value: string) => {
    state.payType = value;
  };

  const getPayHandle = () => {
    if (!state.isAgree) {
      Toast.text('请认真阅读用户隐私协议并同意');
      return;
    }

    if (state.phone.length !== 11) {
      Toast.text('请填写正确的手机号');
      return;
    }
    //  支付
    new PayCenter(info.value.applyIdentification).pay({
      phone: state.phone,
      randomMoney: randomMoney.value,
      payType: state.payType,
    });
  };

  const { changeLight, changeButtom, aniStatus, show, phone, number } = toRefs(state);
</script>

<style lang="scss" scoped>
  .container {
    width: 100vw;
    min-height: 100vh;
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
      // animation: xz 1.5s linear forwards;
    }
    // @keyframes xz {
    //   0% {
    //     transform: scale(1);
    //   }
    //   100% {
    //     transform: scale(0);
    //   }
    // }

    .flower {
      z-index: 2008;
      height: 80vh;
    }
    .logo_img {
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 0.1rem;
      position: absolute;
      left: 0.1rem;
      top: 0.6rem;
    }
    .title {
      text-align: center;
      margin-top: 2.15rem;
      font-size: 0.24rem;
      color: #fff;
      opacity: 0.5;
    }
    .grabBox {
      background-image: url(/@/assets/activity/grabCoupon/bg.png);
      width: 7.44rem;
      // height: 11.62rem;
      background-repeat: no-repeat;
      background-size: contain;
      margin: 0.18rem auto;
      position: relative;

      .light,
      img {
        width: 100%;
        height: 100%;
      }
      .couponBox {
        // background-image: url(/@/assets/activity/grabCoupon/bg2.png);
        width: 6.09rem;
        height: 6.76rem;
        background-repeat: no-repeat;
        background-size: cover;
        position: absolute;
        top: 1.7rem;
        left: 0.68rem;
        display: flex;
        flex-direction: column;
        .hand {
          width: 100%;
          height: 40%;
          position: relative;
          img {
            position: absolute;
            top: 0;
            width: 120%;
            height: 6rem;
            left: 50%;
            transform: translate(-50%, 10%) scale(1, 1.2);
          }
        }
        .coupon {
          width: 100%;
          height: 3rem;
          display: flex;
          justify-content: center;
          img {
            width: 40%;
          }
          .img_ani {
            animation: box_ani 500ms linear;
          }
        }
      }
      .open_award {
        width: 3.07rem;
        height: 3.13rem;
        position: absolute;
        bottom: 0.61rem;
        left: 2.18rem;
        img {
          width: 100%;
          height: 100%;
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
      padding: 0.5rem 0;
      .close {
        position: relative;
        transform: translate(-850%, 400%);
        z-index: 2009;
      }
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
        background: #fff;
        border-radius: 0.4rem;
        left: 50%;
        transform: translateX(-50%);
        .content-top {
          width: 100%;
          height: 2.64rem;

          background: #f10002;
          border-radius: 0.4rem 0.4rem 0 0;
          .price {
            display: flex;
            justify-content: center;
            align-items: flex-end;
            color: #ffffff;
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
          height: 4.57rem;
          border-radius: 0 0 0.4rem 0.4rem;
          background: #fff0f0;
          display: flex;
          flex-direction: column;
          align-items: center;
          .sw {
            width: 4.6rem;
            height: 0.52rem;
            margin-top: 0.31rem;
          }
          .nowget {
            width: 4.52rem;
            height: 0.98rem;
            margin-top: 0.16rem;
          }
        }
      }
      .close {
        img {
          width: 0.44rem;
          height: 0.44rem;
          margin-top: 0.65rem;
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
