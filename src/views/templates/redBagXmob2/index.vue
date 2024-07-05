<template>
  <div class="container-pre">
    <div class="logo_box">
      <img class="logo_img" :src="info.landingPageResponse.logoUrl" alt="" />
      <span style="color: #fff">{{ info.appName }}</span>
    </div>
    <div class="red">
      <img src="/src/assets/envelope/china.png" alt="" class="china" />
      <div class="gongxi">
        <p>恭喜你获得</p>
        <span v-if="!newBxm">{{ showMoney }}元{{ info.appName }}会员专享</span>
      </div>
      <div class="amount">
        <span class="unit"></span>
        <span class="money">{{ money }}</span>
        <img src="/src/assets/envelope/phone-securities.webp" alt="" />
      </div>
      <p class="tips">200元话费优惠券: 20张5元和10张10元</p>
      <nut-input
        type="tel"
        v-model="phone"
        placeholder="请输入您的手机号"
        maxLength="11"
        :border="false"
        :style="{ marginTop: '0.9rem', borderRadius: '0.1rem' }"
      />
      <div class="nowGet scale-animation" @click="btnHandle"> 立即领取 </div>
      <UserBook @change="isAgreeCB" :phone="phone" />
      <div class="gif"></div>
    </div>
    <div class="hf_c_box">
      <div class="hf_title">详情:</div>
      <div class="hf_text" v-html="info.phoneData.remark && JSON.parse(info.phoneData.remark)?.desc"></div>
    </div>
    <div v-if="props.bxm" style="color: #ffffff; margin-top: 0.4rem">实际为话费券形式发放的服务</div>
    <companyInfo style="color: #fff; margin-top: 0.2rem" :filingStatus="false" :addressStatus="false" />
    <sideBar />
  </div>
</template>
<script setup lang="ts">
  import { useConfigStore } from '/@/store/modules/platform';
  import { Toast } from '@nutui/nutui';
  import useCheckOrder from '/@/hooks/useCheckOrder';
  import useRandomMoney from '/@/hooks/useRandomMoney';
  import { PayCenter } from '/@/utils/pay';
  import usePhone from '/@/hooks/usePhone';

  const configStore = useConfigStore();
  useCheckOrder();
  const { randomMoney, showMoney } = useRandomMoney();

  const props = defineProps({
    animation: Boolean,
    bxm: Boolean,
    newBxm: Boolean,
  });

  const info = computed(() => {
    return configStore.info;
  });

  const money = ref(100);

  watch(
    info,
    () => {
      const moenyInt = Number(info.value.phoneData.cssClass || 100);
      money.value = moenyInt;
      if (props.animation) {
        money.value = moenyInt - 40;
        const moneyTimer = setInterval(() => {
          money.value = money.value + 8;
          if (money.value >= moenyInt) {
            clearInterval(moneyTimer);
          }
        }, 100);
      }
    },
    { immediate: true },
  );

  const state = reactive({
    phone: usePhone(),
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

    //  支付
    new PayCenter(info.value.applyIdentification).pay({
      phone: state.phone,
      randomMoney: randomMoney.value,
    });
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
    .logo_box {
      display: flex;
      align-items: center;
      width: 1.8rem;
      justify-content: space-between;
      height: 0.8rem;
      transform: translateY(70%);
      font-weight: bold;
    }
    .logo_img {
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 0.1rem;
      // margin-top: 0.2rem;
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
        font-weight: bold;
        p {
          font-size: 0.4rem;
          margin-bottom: 0.3rem;
        }
        span {
          font-size: 0.4rem;
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
          width: 0.68rem;
          height: 1.78rem;
        }
      }

      .tips {
        color: #eee;
        font-size: 0.2rem;
      }

      .nowGet {
        width: 5.76rem;
        height: 1.04rem;
        line-height: 1.04rem;
        background: #fcc805;
        border-radius: 0.58rem;
        margin: 0 auto;
        font-size: 0.6rem;
        font-weight: 500;
        color: #333526;
        text-align: center;
        margin-top: 0.1rem;
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
  .hf_c_box {
    width: 6.8rem;
    margin: 0 auto;
    border-radius: 0.1rem;
    padding: 0.29rem 0.17rem 0.31rem 0.17rem;
    margin-top: 0.37rem;
    margin-bottom: 0.2rem;
    .hf_title {
      color: #a2a2a2;
      font-size: 0.2rem;
      font-weight: bold;
      margin-bottom: 0.19rem;
      margin-left: 0.3rem;
    }
    .hf_text {
      padding: 0.1rem 0.24rem;
      font-size: 0.2rem;
      color: #a2a2a2;
      line-height: 0.45rem;
    }
  }
</style>
