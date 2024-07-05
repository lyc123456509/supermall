<template>
  <main class="container">
    <div class="content">
      <div class="bg_title"></div>
      <div class="bg_opportunity"
        >(剩余机会<span>{{ prizeNum }}</span
        >次)</div
      >
      <div class="prize_box cc">
        <div class="prize" :class="isOpen ? 'animation_rotate' : ''"> </div>
        <div class="prize_btn" :class="!isOpen ? 'prize_btn_ani' : ''" @click="openPrizeHandle"></div>
      </div>
      <!-- <div class="agreement"><UserBook @change="isAgreeCB" /></div> -->
    </div>
    <nut-popup position="top" class="popup_box" :style="popupSty" v-model:visible="showTop" :close-on-click-overlay="false">
      <div class="popup_content">
        <div class="light"></div>
        <div class="coupon"></div>
        <span class="hint">看剧可领取100元话费哦!</span>
        <div class="popup_btn" @click="goWxHandle"></div>
      </div>
    </nut-popup>
  </main>
</template>

<script lang="ts" setup>
  import { Toast } from '@nutui/nutui';
  const state = reactive({
    isOpen: false,
    showTop: false,
    prizeNum: 1,
    popupSty: {
      width: '80%',
      height: '44%',
      /*设置为绝对定位之后,html元素会自动失去宽高*/
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      'background-color': 'transparent',
    },
  });

  const openPrizeHandle: any = () => {
    if (state.prizeNum != 0) {
      state.prizeNum -= 1;
      state.isOpen = true;
      setTimeout(() => {
        setTimeout(() => {
          state.showTop = true;
        }, 500);
      }, 3000);
    } else {
      return Toast.text('次数已用尽!');
    }
  };

  const goWxHandle: any = () => {
    location.href = 'https://wxaurl.cn/Aduv0kK9KDg';
  };
  const { isOpen, showTop, popupSty, prizeNum } = toRefs(state);
</script>
<style lang="scss" scoped>
  .cc {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .container {
    width: 100vw;
    height: 100vh;
    background: url(/src/assets/theatre/active/bg.png);
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    .content {
      width: 100%;
      height: 78%;
      .bg_title {
        width: 84%;
        margin: auto;
        height: 1.4rem;
        background: url(/src/assets/theatre/active/bg_title.png);
        background-size: 100% 100%;
      }
      .bg_opportunity {
        width: 100%;
        text-align: center;
        margin-top: 0.4rem;
        font-size: 0.2rem;
        color: #fffe34;
      }
      .prize_box {
        position: relative;
        width: 7.5rem;
        height: 7.5rem;
        background: url(/src/assets/theatre/active/bg_zp.png);
        background-size: 100% 100%;
        .prize {
          width: 5.6rem;
          height: 5.6rem;
          background: url(/src/assets/theatre/active/zp_prize.png);
          background-size: 100% 100%;
        }
        .prize_btn {
          position: absolute;
          width: 38%;
          height: 38%;
          background: url(/src/assets/theatre/active/touch.png);
          background-size: 100% 100%;
        }
        .prize_btn_ani {
          animation: btnAnimation 1s linear infinite;
        }
      }
    }

    .agreement {
      width: 100%;
      text-align: center;
      font-size: 0.28rem;
      font-family: PingFang SC;
      font-weight: 400;
      color: #fee6ed;
      line-height: 42px;
    }
  }

  .popup_content {
    position: relative;
    width: 100%;
    height: 100%;
    background: url(/src/assets/theatre/active/popup_bg.png);
    background-size: 100% 100%;
    overflow: hidden;
    border-radius: 7px;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .light {
      position: absolute;
      z-index: -1;
      top: 7%;
      width: 100%;
      height: 70%;
      background: url(/src/assets/theatre/active/light.png);
      background-size: 100% 100%;
    }
    .coupon {
      width: 97%;
      height: 40%;
      margin: 25% 0 5%;
      background: url(/src/assets/theatre/active/coupon.png);
      background-size: 100% 100%;
    }
    .hint {
      font-size: 0.28rem;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ae8a7e;
      display: inline-block;
      text-align: center;
      width: 100%;
      margin-bottom: 2%;
    }
    .popup_btn {
      width: 90%;
      height: 18%;
      background: url(/src/assets/theatre/active/popup_btn.png);
      background-size: 100% 100%;
    }
  }

  @keyframes btnAnimation {
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

  .animation_rotate {
    transform-origin: 50% 50%;
    animation: animation_rotate 3s ease-in-out;
  }

  @keyframes animation_rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(1800deg);
    }
  }
</style>
