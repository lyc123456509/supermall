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
      <!-- <div class="agreement"><UserBook @change="isAgreeCB" :check-img="[selectIcon, unselectIcon]" /></div> -->
    </div>
    <nut-popup position="top" class="popup_box" :style="popupSty" v-model:visible="showTop" :close-on-click-overlay="false">
      <div class="popup_content">
        <div class="light"></div>
        <div class="coupon"></div>
        <span class="hint">看剧可领取100元话费哦!</span>
        <div class="popup_btn" @click="goWxHandle"></div>
      </div>
    </nut-popup>
    <nut-popup v-model:visible="showRule" pop-class="popclass" style="overflow-y: hidden">
      <div class="rule_mod">
        <h3 class="rule-title">活动规则</h3>
        <div class="rule_content">{{ info.landingPageResponse.rulsUrlValue }}</div>
        <nut-button type="primary" color="#e15ae8" @click="showRule = false">确定</nut-button>
      </div>
    </nut-popup>
    <img :src="icon_hzgz" alt="" class="sidebar_hint" @click="showRule = true" />
  </main>
</template>

<script lang="ts" setup>
  import { Toast } from '@nutui/nutui';
  import icon_hzgz from '/@/assets/theatreDY/icon_hzgz.png';
  import { useConfigStore } from '/@/store/modules/platform';
  // import selectIcon from '/@/assets/theatre2DY/2.png';
  // import unselectIcon from '/@/assets/theatre2DY/1.png';
  const emitFun = defineEmits(['nextStep']);
  const configStore = useConfigStore();
  const info = computed(() => {
    return configStore.info;
  });
  const state = reactive({
    isAgree: false,
    isOpen: false,
    showTop: false,
    showRule: false,
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

  // const isAgreeCB = (agreeState: boolean) => {
  //   state.isAgree = agreeState;
  // };

  const openPrizeHandle: any = () => {
    // if (!state.isAgree) {
    //   Toast.text('请认真阅读用户隐私协议并勾选');
    //   return;
    // }
    if (state.prizeNum != 0) {
      state.prizeNum -= 1;
      state.isOpen = true;
      setTimeout(() => {
        setTimeout(() => {
          // state.showTop = true;
          goWxHandle();
        }, 500);
      }, 3000);
    } else {
      return Toast.text('次数已用尽!');
    }
  };

  const goWxHandle: any = () => {
    // location.href = 'https://wxaurl.cn/Aduv0kK9KDg';
    emitFun('nextStep', 'step2');
    sessionStorage.setItem('step', 'step2');
  };
  const { isOpen, showTop, showRule, popupSty, prizeNum } = toRefs(state);
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
        width: 3.9rem;
        height: 0.48rem;
        line-height: 0.48rem;
        text-align: center;
        margin: 0.4rem auto 0 auto;
        font-size: 0.29rem;
        color: #fffe34;
        background-image: url(/@/assets/theatre2DY/chanceBg.png);
        background-size: contain;
        background-repeat: no-repeat;
      }
      .prize_box {
        position: relative;
        width: 7.5rem;
        height: 7.5rem;
        background: url(/src/assets/theatre/active/bg_zp.png);
        background-size: 100% 100%;
        .prize {
          width: 5.8rem;
          height: 5.8rem;
          background: url(/src/assets/theatre/active/zp_prize.png);
          background-size: 100% 100%;
          transform: rotate(-45deg);
        }
        .prize_btn {
          position: absolute;
          width: 34%;
          height: 34%;
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
      :deep(.policy) {
        color: #fee6ed;
      }
    }
  }
  .sidebar_hint {
    position: fixed;
    right: 0;
    top: 0.54rem;
    height: 3.26rem;
    font-size: 0.24rem;
    color: #333;
    z-index: 10;
    width: 1.62rem;
    height: 0.47rem;
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
  .popclass {
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
      transform: rotate(-45deg);
    }
    100% {
      transform: rotate(1755deg);
    }
  }
</style>
