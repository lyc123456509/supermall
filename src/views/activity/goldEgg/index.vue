<template>
  <div>
    <div class="container">
      <!-- <img class="logo_img" :src="info.landingPageResponse.logoUrl" alt="" /> -->
      <div class="phoneBox">
        <img class="bg_xz" src="/src/assets/activity/openEgg/xh.png" alt="" />
        <img class="bg_phone" src="/src/assets/activity/openEgg/iphone.png" alt="" />
      </div>
      <div class="eggBox">
        <div class="box" v-for="(item, index) in 3" :key="item">
          <img
            :style="{ visibility: state.eggNum !== index ? 'visible' : 'hidden' }"
            class="egg"
            :class="{ moreEgg: state.eggIndex === index }"
            src="/src/assets/activity/openEgg/egg.png"
            alt=""
            @click="openEgg(index)"
          />
          <img
            class="openEgg"
            :style="{ left: index === 0 ? '0.08rem' : index === 1 ? '2.52rem' : '4.96rem' }"
            v-if="state.eggNum === index && state.showEgg"
            src="/src/assets/activity/openEgg/tx/zd.gif"
            alt=""
          />
          <img
            class="lightEgg"
            :style="{ left: index === 0 ? '-0.57rem' : index === 1 ? '1.86rem' : '4.3rem' }"
            v-if="state.eggNum === index && state.showOpenEgg"
            src="/src/assets/activity/openEgg/openegg.png"
            alt=""
          />
        </div>
        <img
          class="cz"
          v-if="state.showCz"
          :style="{ left: state.eggIndex === 0 ? '1.3rem' : state.eggIndex === 1 ? '3.6rem' : '6rem' }"
          src="/src/assets/activity/openEgg/tx/cz.gif"
          alt=""
        />
      </div>
      <companyInfo />
      <!-- <sideBar /> -->
      <img v-if="state.lightStatus" src="/src/assets/activity/openEgg/tx/ch.gif" alt="" class="light_ani flower" />
      <nut-overlay v-model:visible="show" :close-on-click-overlay="false">
        <div class="popup_wrap">
          <div
            class="btn"
            style="background-image: url(https://nginx-beta.oss-cn-chengdu.aliyuncs.com/h5/armBandit/fef2d5aba45d459c8850151420d62834.webp)"
            @click="btnJumpToNext"
          ></div>
        </div>
      </nut-overlay>
    </div>
  </div>
</template>
<script setup lang="ts">
  const state = reactive({
    isAgree: true,
    payType: '',
    show: false,
    lightStatus: false,

    eggNum: -1,
    showEgg: false,
    showOpenEgg: false,
    eggIndex: 0,
    showCz: true,
  });
  const timer = ref();
  const openEgg = (i) => {
    state.eggNum = i;
    state.showEgg = true;
    state.showOpenEgg = false;
    state.showCz = false;
    clearInterval(timer.value);
    state.eggIndex = 4;
    setTimeout(() => {
      state.showEgg = false;
      state.showOpenEgg = true;
      state.lightStatus = true;
      state.show = true;
    }, 1000);
  };

  const skipEgg = () => {
    timer.value = setInterval(() => {
      if (state.eggIndex <= 1) {
        state.eggIndex++;
      } else {
        state.eggIndex = 0;
      }
    }, 2000);
  };
  skipEgg();

  const emitFun = defineEmits(['changeStep']);
  const btnJumpToNext = () => {
    emitFun('changeStep', { step: 2 });
  };

  const { show } = toRefs(state);
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
    }

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
    .phoneBox {
      width: 100%;
      height: 6.73rem;
      position: relative;
      top: 2.44rem;
      .bg_xz {
        width: 100%;
        height: 100%;
        animation: imgspin 10s infinite;
        -webkit-animation: imgspin 10s linear infinite;
        -o-animation: imgspin 10s linear infinite;
        position: absolute;
        z-index: 6;
      }
      @keyframes imgspin {
        100% {
          transform: rotate(360deg);
        }
      }
      .bg_phone {
        width: 100%;
        height: 6.73rem;
        position: absolute;
        z-index: 7;
      }
    }
    .eggBox {
      padding: 0 0.24rem 0 0.3rem;
      display: flex;
      height: 4.37rem;
      align-items: flex-end;
      justify-content: space-between;
      margin-top: 1rem;
      position: relative;
      .box {
        .egg {
          width: 2.06rem;
          height: 2.91rem;
        }
        .moreEgg {
          animation: move 1.5s infinite;
        }
        @keyframes move {
          0%,
          10%,
          40%,
          70% {
            transform: translateY(0%);
          }
          20%,
          50%,
          80% {
            transform: translateY(3%);
          }
          30%,
          60%,
          90% {
            transform: translateY(0%);
          }
        }
      }
      .cz {
        width: 1.41rem;
        height: 1.37rem;
        position: absolute;
        top: 1rem;
        left: 1.1rem;
        z-index: 1000;
      }
      //   0.08,-0.57rem;2.52rem,1.86rem;4.96rem,4.3rem
      .openEgg {
        position: absolute;
        width: 2.5rem;
        height: 3rem;
        bottom: 0;
      }
      .lightEgg {
        position: absolute;
        bottom: 0;
        width: 3.79rem;
        height: 4.37rem;
      }
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

  .popup_wrap {
    width: 100%;
    height: 100%;
    background-image: url(https://nginx-beta.oss-cn-chengdu.aliyuncs.com/h5/armBandit/ac0240b0ec104b35901c59e16d70dc71.webp);
    background-repeat: no-repeat;
    box-sizing: border-box;
    background-size: 100% auto;
    background-position-y: 20%;
    padding-top: 9rem;
    .btn {
      width: 4.4rem;
      height: 1rem;
      margin: 0.1rem auto 0;
      animation: FormBtnScale 1s ease 0s infinite;
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
  }
  @keyframes FormBtnScale {
    0% {
      transform: scale(1);
    }

    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
