<template>
  <div>
    <preTurntable v-if="step === 1" @change-step="changeStep" />
    <div class="container" v-else>
      <img class="logo_img" :src="info.landingPageResponse.logoUrl" alt="" />
      <div class="header">
        <span style="font-size: 0.21rem; margin: 0.3rem 0 -0.2rem 0" v-if="props.stepTip">· · · 需分多次使用· · ·</span>
        <span style="font-size: 0.21rem; margin-top: 0.3rem" v-if="props.stepTip">·{{ showMoney }}元充值{{ info.appName }}会员·</span>
        <span style="font-size: 0.48rem; margin: 0.5rem 0 0.18rem 0">恭喜您, 锁定百元话费券</span>
        <p class="count-down"
          >请在<span class="time">{{ time.hour }}</span
          >:<span class="time">{{ time.minute }}</span
          >:<span class="time">{{ time.second }}</span
          >内完成支付</p
        >
      </div>
      <div class="content">
        <p class="wait-save">充话费</p>
        <div class="list">
          <div class="item">
            <p>20 <span>元</span></p>
            <p>市场价: 20元</p>
          </div>
          <div class="item">
            <p>200 <span>元</span></p>
            <p>仅需: {{ showMoney }}元</p>
          </div>
          <div class="item">
            <p>100 <span>元</span></p>
            <p>市场价: 100元</p>
          </div>
        </div>
        <nut-input
          type="tel"
          v-model="phone"
          placeholder="输入充值手机号"
          maxLength="11"
          :border="false"
          style="
            width: 100%;
            height: 0.95rem;
            background: rgb(244, 244, 244);
            font-size: 0.4rem;
            color: #333;
            font-weight: bold;
            padding: 0 0.24rem;
            line-height: 0.95rem;
            margin-top: 0.5rem;
            margin-bottom: 28px;
            border-radius: 55px;
          "
        />
        <div class="sw">
          <img src="/src/assets/blue/icon_yhq.png" alt="" />
          <span>全国三网通用，领不到可退</span>
        </div>
        <PayMethod @change="payMethodCB" />
        <div class="pay_amount pay_amount_ac">
          <span class="text">实际支付金额：</span>
          <span class="value">{{ showMoney }}元</span>
        </div>
        <div class="pay_amount">
          <span class="text">实际到账话费券：</span>
          <span class="value">200.00元</span>
        </div>
        <div class="pay_amount" v-if="info.FeesInfo && info.FeesInfo !== ''">
          <span class="text">额外附赠：</span>
          <span class="value">{{ info.FeesInfo }}</span>
        </div>
        <div class="btnBox scale-animation">
          <p class="btn_hint_price"
            >待节省金额 <span>{{ new BigNumber(Number(info.phoneData.cssClass)).minus(showMoney) }}元</span></p
          >
          <nut-button :loading="submitLoading" class="nowGet" size="large" @click="getPayHandle">立即充值</nut-button>
        </div>
        <UserBook @change="isAgreeCB" :phone="phone" />
      </div>
      <div class="hf_c_box">
        <div class="hf_title">话费优惠券包说明</div>
        <div class="hf_text" v-html="info.phoneData.remark && JSON.parse(info.phoneData.remark)?.desc"></div>
      </div>
      <companyInfo />
      <sideBar />
    </div>
  </div>
</template>
<script setup lang="ts">
  import { PayCenter } from '/@/utils/pay';
  import useCountDown from '/@/hooks/useCountDown';
  import useRandomMoney from '/@/hooks/useRandomMoney';
  import { useConfigStore } from '/@/store/modules/platform';
  import useCheckOrder from '/@/hooks/useCheckOrder';
  import { Toast } from '@nutui/nutui';
  import usePhone from '/@/hooks/usePhone';
  import BigNumber from 'bignumber.js';
  import preTurntable from '/@/views/prePage/preTurntable/index.vue';

  const configStore = useConfigStore();
  const { randomMoney, showMoney } = useRandomMoney();
  useCheckOrder();
  const time = useCountDown();

  const props = defineProps({
    stepTip: Boolean,
  });

  const info = computed(() => {
    return configStore.info;
  });
  const submitLoading = computed(() => {
    return configStore.submitLoading;
  });
  const state = reactive({
    phone: usePhone(),
    isAgree: true,
    payType: '',
    step: 1,
  });

  const changeStep = ({ step, phone }) => {
    state.step = step;
    state.phone = phone;
  };

  const isAgreeCB = (agreeState: boolean) => {
    state.isAgree = agreeState;
  };

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

  const { phone, step } = toRefs(state);
</script>
<style>
  input::placeholder {
    color: #8a8787;
    font-weight: 600;
  }
</style>
<style lang="scss" scoped>
  .container {
    background-image: url(/@/assets/blue/bg_ls.png);
    width: 100vw;
    min-height: 100vh;
    background-repeat: no-repeat;
    background-size: 100% 18%;
    background-color: #f2f2f2;
    padding: 0 0.2rem;
    box-sizing: border-box;
    .logo_img {
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 0.1rem;
      position: absolute;
      left: 0.1rem;
      top: 0.6rem;
    }
    .header {
      color: #fff;
      display: flex;
      flex-direction: column;
      // align-items: center;
      margin: 0 auto;
      width: 70vw;
      .count-down {
        font-size: 0.3rem;
        padding-left: 0.3rem;
        .time {
          padding: 0 0.1rem;
          text-align: center;
          background: linear-gradient(0deg, #fdf2b7, #ffffff);
          border-radius: 0.07rem;
          color: red;
          margin: 0 0.05rem;
        }
      }
    }

    .content {
      background-color: #ffffff;
      margin-top: 0.98rem;
      border-radius: 10px;
      padding: 0.2rem 0.23rem 0.5rem 0.23rem;
      .wait-save {
        height: 0.62rem;
        font-weight: bold;
        line-height: 0.62rem;
        margin: 0.25rem 0 0.29rem 0;
        font-size: 0.5rem;
        color: #555;
      }

      .list {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .item {
          width: 2.04rem;
          height: 1.63rem;
          background: #f3f9fe;
          box-shadow: 0px 0px 0.16rem 0px rgb(200 200 200 / 58%);
          border-radius: 0.13rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          p:nth-child(1) {
            font-size: 0.52rem;
            font-weight: bold;
            color: #606060;
            span {
              font-size: 0.27rem;
            }
          }
          p:nth-child(2) {
            font-size: 0.21rem;
            color: #b1b1b1;
            margin-top: 0.1rem;
          }
          &:nth-child(2) {
            color: #4381f7;
            position: relative;
            border: 1px solid #3b82fb;
            &::before {
              content: '';
              position: absolute;
              left: 0;
              top: 0;
              width: 0.8rem;
              height: 0.75rem;
              background: url(https://nginx-beta.oss-cn-chengdu.aliyuncs.com/h5/img/recommend.png) no-repeat;
              background-size: 100% 100%;
              color: #fff;
            }
            p {
              color: #3b82fb;
            }
          }
        }
      }

      .sw {
        margin-top: 0.29rem;
        img {
          width: 0.23rem;
          height: 0.23rem;
          margin-right: 0.06rem;
        }
        span {
          color: #a2a3a3;
          font-size: 0.25rem;
        }
      }

      .pay_amount {
        margin-top: 0.27rem;
        display: flex;
        .text {
          color: #222423;
          margin-right: 0.34rem;
          font-size: 0.29rem;
        }
        .value {
          color: #2c70f6;
          margin-right: 0.34rem;
          font-size: 0.33rem;
        }
      }

      .btnBox {
        position: relative;
        .btn_hint_price {
          position: absolute;
          top: -0.3rem;
          right: 0.62rem;
          font-size: 0.2rem;
          background: red;
          color: #fff;
          padding: 0 0.1rem;
          height: 0.4rem;
          line-height: 0.4rem;
          border-radius: 0.2rem 0.3rem 0.3rem 0;
          z-index: 2;
        }
      }

      .nowGet {
        display: block;
        height: 1rem;
        width: 5.19rem;
        line-height: 1rem;
        background: #3f86f7;
        border-radius: 0.48rem;
        margin: 0.4rem auto;
        font-size: 0.4rem;
        font-weight: 500;
        color: #ffffff;
        text-align: center;
        :deep(.nut-button__warp::before) {
          // content: '节省近150元';
          // position: absolute;
          // top: -0.2rem;
          // right: 0;
          // font-size: 0.17rem;
          // background: red;
          // padding: 0 0.2rem 0 0.1rem;
          // height: 0.4rem;
          // line-height: 0.4rem;
          // border-radius: 0.18rem 0.18rem 0.18rem 0;
        }
      }
    }
    .hf_c_box {
      width: 6.8rem;
      margin: 0 auto;
      background: #fff;
      border-radius: 0.1rem;
      padding: 0.29rem 0.17rem 0.31rem 0.17rem;
      margin-top: 0.37rem;
      margin-bottom: 0.2rem;
      .hf_title {
        color: #777;
        font-size: 0.31rem;
        text-align: center;
        font-weight: 600;
        margin-bottom: 0.19rem;
      }
      .hf_text {
        padding: 0.1rem 0.24rem;
        font-size: 0.2rem;
        color: #a2a2a2;
        line-height: 0.45rem;
        background: #f6f6f6;
      }
    }
  }
</style>
