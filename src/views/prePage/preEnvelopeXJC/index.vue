<template>
  <div class="container-pre">
    <img class="logo_img" :src="info.landingPageResponse.logoUrl" alt="" />
    <div class="red">
      <img src="/src/assets/envelope/china.png" alt="" class="china" />
      <div class="gongxi">
        <p>恭喜你获得</p>
      </div>
      <div class="amount">
        <span class="unit"></span>
        <span class="money">{{ info.phoneData.cssClass }}</span>
        <img src="/src/assets/envelope/phone-securities.png" alt="" />
      </div>
      <nut-input
        type="tel"
        v-model="phone"
        placeholder="请输入您的手机号"
        maxLength="11"
        :border="false"
        :style="{ marginTop: '1.2rem' }"
      />
      <div class="nowGet scale-animation" @click="btnHandle"> 立即充值 </div>
      <UserBook @change="isAgreeCB" :phone="phone" />
      <div class="gif"></div>
    </div>
    <companyInfo style="color: #fff; margin-top: 0.2rem" />
    <sideBar />
  </div>
</template>
<script setup lang="ts">
  import { useConfigStore } from '/@/store/modules/platform';
  import { Toast } from '@nutui/nutui';

  const emitFun = defineEmits(['changeStep']);
  const configStore = useConfigStore();

  const info = computed(() => {
    return configStore.info;
  });

  const state = reactive({
    phone: '',
    isAgree: true,
  });

  const isAgreeCB = (agreeState: boolean) => {
    state.isAgree = agreeState;
  };

  const btnHandle: any = () => {
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

  const { phone } = toRefs(state);
</script>

<style lang="scss" scoped>
  .container-pre {
    background-color: #000;
    width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    .logo_img {
      width: 0.8rem;
      height: 0.8rem;
      margin-top: 0.2rem;
    }
    .red {
      box-sizing: border-box;
      padding-top: 1.2rem;
      width: 7.5rem;
      height: 11.68rem;
      background: url(/@/assets/envelope/pop-window8.png);
      background-size: 100% 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .china {
        width: 4.98rem;
        height: 0.7rem;
      }
      .gongxi {
        color: #ffe2c4;
        text-align: center;
        margin-top: 0.6rem;
        p {
          font-size: 0.4rem;
          margin-bottom: 0.3rem;
        }
        span {
          font-size: 0.3rem;
        }
      }
      .amount {
        display: flex;
        margin-top: 0.5rem;
        align-items: baseline;
        .unit {
          width: 0.5rem;
          height: 0.62rem;
          background-image: url(/@/assets/envelope/unit.png);
          background-size: 100% 100%;
        }
        .money {
          font-size: 2.6rem;
          background: linear-gradient(180deg, #fee3ba 0%, #fec774 100%);
          font-weight: bold;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        img {
          width: 0.38rem;
          height: 0.98rem;
        }
      }

      .nowGet {
        width: 5.76rem;
        height: 1.04rem;
        line-height: 1.04rem;
        background: #fcc805;
        border-radius: 0.58rem;
        margin: 0 auto;
        font-size: 0.68rem;
        font-weight: 600;
        color: #333526;
        text-align: center;
        margin-top: 0.2rem;
      }

      .gif {
        width: 100%;
        height: 5.4rem;
        background-image: url(/@/assets/envelope/red-envelopes.gif);
        position: absolute;
        background-size: 100% 100%;
      }
    }
  }
</style>
