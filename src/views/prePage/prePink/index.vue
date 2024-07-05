<template>
  <main>
    <div class="light_bg">
      <img src="https://html.sccdyzl.com/vue-cps/prePink/light_bg2.png" class="bg" alt="" />
      <img src="https://html.sccdyzl.com/vue-cps/prePink/xz2.png" alt="" class="light" />
      <img class="logo_img" :src="info.landingPageResponse.logoUrl" alt="" />
      <div class="tips">
        <span class="header-recharge">{{ showMoney }} 元充值会员专享</span>
      </div>
      <div
        class="box"
        :style="{
          background: `url(https://html.sccdyzl.com/vue-cps/prePink/bg${
            Number(info.phoneData.cssClass) === 100 ? '3' : '2'
          }.png) no-repeat`,
          backgroundSize: '100% 100%',
        }"
      >
        <div class="price"
          ><span class="dw">¥</span><span class="price_text">{{ state.number }}</span></div
        >
        <div class="inputBox">
          <div class="icon">
            <img src="https://html.sccdyzl.com/vue-cps/prePink/icon_phone.png" alt="" />
          </div>
          <nut-input type="tel" v-model="state.phone" placeholder="输入手机号充值" maxLength="11" :border="false" class="input" />
        </div>
        <div class="btn" @click="btnClick"></div>
        <UserBook @change="isAgreeCB" style="color: #fff; margin-top: 0.2rem" :checkImg="[checked, unchecked]" :phone="state.phone" />
      </div>
      <companyInfo style="color: #fff; margin-top: 0.8rem" />
    </div>
    <writeSideBar />
  </main>
</template>

<script setup lang="ts">
  import { Toast } from '@nutui/nutui';
  import { useConfigStore } from '/@/store/modules/platform';
  import useRandomMoney from '/@/hooks/useRandomMoney';
  const configStore = useConfigStore();
  const { showMoney } = useRandomMoney();
  const info = computed(() => {
    return configStore.info;
  });
  const unchecked = 'https://html.sccdyzl.com/vue-cps/prePink/unchecked.png';
  const checked = 'https://html.sccdyzl.com/vue-cps/prePink/checked.png';
  const state = reactive({
    phone: '',
    number: Number(info.value.phoneData.cssClass) - 40,
    isAgree: true,
  });
  const timer = ref();
  const isAgreeCB = (agreeState: boolean) => {
    state.isAgree = agreeState;
  };
  const restNumber = () => {
    timer.value = setTimeout(() => {
      if (state.number <= Number(info.value.phoneData.cssClass) - 1) {
        clearTimeout(timer.value);
        restNumber();
        state.number++;
      } else {
        clearTimeout(timer.value);
      }
    }, 20);
  };
  watch(
    info,
    () => {
      restNumber();
    },
    { immediate: true },
  );
  watch(
    () => state.phone,
    () => {
      if (state.phone.length === 11) {
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      }
    },
  );
  const emitFun = defineEmits(['changeStep']);
  const btnClick = () => {
    if (state.phone === '') {
      Toast.text('请输入手机号码');
      return;
    }
    if (!/^1[34578][0-9]{9}$/.test(state.phone)) {
      Toast.text('请输入正确的手机号码');
      return;
    }
    window.scrollTo(0, 0);
    emitFun('changeStep', { step: 2, phone: state.phone });
  };
</script>
<style lang="scss" scoped>
  main {
    min-width: 100vw;
    min-height: 15rem;
    background-color: rgb(255, 192, 205);
    overflow: hidden;
    // background-image: url(https://html.sccdyzl.com/vue-cps/prePink/light_bg1.png);
    // background-repeat: no-repeat;
    // background-size: 100% 100%;
    // margin: 0 -100px 0 -10px;
    .light_bg {
      position: absolute;
      top: 0;
      width: 100%;
      height: 15rem;
      overflow: hidden;
      .bg {
        width: 100%;
        height: 100%;
        transform: scale(1.7, 1);
        position: absolute;
        z-index: 0;
      }
      .light {
        width: 7.5rem;
        height: 7.5rem;
        position: absolute;
        z-index: 1;
        top: 1rem;
        left: 0;
        animation: light 4s linear infinite;
      }
      .logo_img {
        width: 0.6rem;
        height: 0.6rem;
        border-radius: 0.1rem;
        border: 0.03rem solid #fff;
        // margin-top: 0.2rem;
        position: absolute;
        left: 0.28rem;
        top: 0.26rem;
      }
      .tips {
        color: #fff;
        text-align: center;
        margin-top: 0.26rem;
        .header-recharge {
          padding: 0 0.16rem;
          height: 0.53333rem;
          border-radius: 0.08rem;
          opacity: 0.9;
          border: 0.02667rem solid hsla(0, 0%, 100%, 0.5);
          font-size: 0.32rem;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: hsla(0, 0%, 100%, 0.6);
          line-height: 0.53333rem;
        }
      }
      .box {
        background: url(https://html.sccdyzl.com/vue-cps/prePink/bg2.png) no-repeat;
        background-size: 100% 100%;
        padding-top: 3.2rem;
        position: relative;
        z-index: 1;
        height: 7.9rem;
        width: 100vw;
        overflow: hidden;
        .price {
          width: 100%;
          text-align: center;
          font-family: MiSans-Semibold, MiSans;
          font-weight: 600;
          color: #ff1b24;
          font-size: 2rem;
          margin: 1.7rem auto 0;
          .dw {
            font-size: 0.7rem;
          }
        }
        .inputBox {
          border: 1px solid red;
          height: 0.96rem;
          border-radius: 1rem;
          width: 75%;
          margin: 0.7rem auto 0;
          display: flex;
          background: #fff;
          .icon {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 20%;
            img {
              width: 0.34rem;
              height: 0.48rem;
            }
          }
          .input {
            width: 100%;
            height: 100%;
            background: transparent;
            font-size: 0.34rem;
            padding: 0 0.54rem 0 0;
            margin: 0;
            line-height: 0.9rem;
          }
        }
        .btn {
          width: 5.34rem;
          height: 1rem;
          margin: 0.2rem auto 0;
          background: url(https://html.sccdyzl.com/vue-cps/prePink/button.png) no-repeat;
          background-size: contain;
          animation: heartbeat 0.8s infinite;
        }
      }
    }
  }
  @keyframes heartbeat {
    0% {
      -webkit-transform: scale(0.8);
      transform: scale(0.8);
    }

    50% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
    100% {
      -webkit-transform: scale(0.8);
      transform: scale(0.8);
    }
  }
  @keyframes light {
    0% {
      -webkit-transform: rotate(0);
      transform: rotate(0);
    }

    100% {
      -webkit-transform: rotate(1turn);
      transform: rotate(1turn);
    }
  }
</style>
