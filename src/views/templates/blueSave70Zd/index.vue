<template>
  <div>
    <div class="container">
      <backAdver />
      <div class="logo">
        <img class="logo_img" :src="info.logoUrl" alt="" />
        <span>{{ info.appName }}</span>
      </div>
      <div class="header">
        <span style="font-size: 0.21rem; margin: 0.3rem 0 -0.2rem 0" v-if="props.stepTip">· · · 需分多次使用· · ·</span>
        <span style="font-size: 0.21rem; margin-top: 0.3rem" v-if="props.stepTip">·{{ showMoney }}元充值{{ info.appName }}会员·</span>
        <span style="margin-top: 0.2rem"
          >·<span style="margin-right: 0.2rem"></span>{{ showMoney }}元{{ info.appName }}会员专享<span style="margin-right: 0.2rem"></span
          >·</span
        >
        <span style="font-size: 0.42rem; margin: 0.1rem 0 0.3rem 0; font-weight: bold">恭喜您,锁定百元话费券包！</span>
      </div>
      <div class="content">
        <h1 class="wait-save">充话费</h1>
        <div class="list">
          <div class="item" v-for="hfItem in 3" :key="hfItem">
            <p>{{ info.phoneData.cssClass }}<span>元</span></p>
            <p>仅需 {{ showMoney }}元</p>
            <img src="https://nginx-beta.oss-cn-chengdu.aliyuncs.com/h5/blue/hf-tips.png" alt="" />
          </div>
        </div>
        <nut-input
          type="tel"
          v-model="phone"
          placeholder="输入手机号购买会员"
          maxLength="11"
          :border="false"
          style="
            width: 100%;
            height: 1rem;
            line-height: 1rem;
            background: #f4f4f4;
            font-size: 0.4rem;
            color: #333;
            font-weight: bold;
            padding: 0 0.24rem;
          "
        />
        <div class="sw"></div>
        <PayMethod @change="payMethodCB" />
        <div class="pay_amount pay_amount_ac">
          <span class="text">实际支付金额：</span>
          <span class="value">{{ showMoney }}元</span>
        </div>
        <div class="pay_amount">
          <span class="text">实际到账话费券包：</span>
          <span class="value">{{ Number(info.phoneData.cssClass).toFixed(2) }}元</span>
        </div>
        <nut-button :loading="submitLoading" class="scale-animation nowGet" size="large" @click="getPayHandle">立即购买</nut-button>
        <UserBook @change="isAgreeCB" :phone="phone" />
      </div>
      <div class="hf_c_box">
        <div class="hf_title">话费优惠券包说明</div>
        <div class="hf_text" v-html="info.phoneData.remark && JSON.parse(info.phoneData.remark)?.desc"></div>
      </div>
      <companyInfo />
      <sideBar
        :itemStyle="{
          background: 'rgba(0, 0, 0, 0.6)',
          'border-radius': '5vw 0 0 5vw',
          border: 0,
          color: '#fff',
          padding: '0.1rem 0.15rem',
        }"
      />
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
  import backAdver from '/@/components/backAdver/index.vue';

  const configStore = useConfigStore();
  const { randomMoney, showMoney } = useRandomMoney();
  useCheckOrder();

  const props = defineProps({
    stepTip: Boolean,
  });

  const info = computed(() => {
    return configStore.info;
  });

  const submitLoading = computed(() => {
    return configStore.submitLoading;
  });

  onMounted(() => {
    document.title = `${showMoney.value}赠送${info.value.phoneData.cssClass}元话费券包`;
  });
  const state = reactive({
    phone: usePhone(),
    isAgree: true,
    payType: '',
  });
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

  const { phone } = toRefs(state);
</script>

<style lang="scss">
  .container {
    background-image: url(/@/assets/blue/bg_ls.png);
    width: 100vw;
    min-height: 100vh;
    background-repeat: no-repeat;
    background-size: contain;
    background-color: #f2f2f2;
    padding: 0 0.2rem;
    box-sizing: border-box;
    overflow: hidden;
    .logo {
      display: flex;
      flex-direction: column;
      position: absolute;
      left: 0.1rem;
      top: 0.1rem;
      color: #fff;
      justify-content: center;
      align-items: center;
      font-size: 0.2rem;
      span {
        margin-top: 0.1rem;
      }
    }
    .logo_img {
      width: 0.4rem;
      height: 0.4rem;
      border-radius: 0.08rem;
    }
    .header {
      color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      transform: translateY(30%);
      .count-down {
        font-size: 0.3rem;
        .time {
          padding: 0 0.1rem;
          text-align: center;
          background: linear-gradient(0deg, #fdf2b7, #ffffff);
          border-radius: 0.07rem;
          color: #2646f4;
          margin: 0 0.05rem;
        }
      }
    }

    .content {
      background-color: #ffffff;
      margin-top: 0.43rem;
      border-radius: 10px;
      padding: 0.1rem 0.23rem 0.1rem 0.23rem;
      .wait-save {
        background-color: #f8fbff;
        height: 0.62rem;
        padding-left: 0.17rem;
        font-weight: bold;
        line-height: 0.62rem;
        margin: 0.39rem 0 0.29rem 0;
      }
      input::-webkit-input-placeholder {
        color: #777;
        font-weight: 600;
      }
      .list {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .item {
          position: relative;
          width: 2.04rem;
          height: 1.33rem;
          background: #f3f9fe;
          box-shadow: 0px 0px 0.16rem 0px rgb(200 200 200 / 58%);
          border-radius: 0.13rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          box-sizing: border-box;
          img {
            position: absolute;
            top: 0;
            left: 0;
            width: 0.66rem;
            height: 0.68rem;
          }
          p:nth-child(1) {
            font-size: 0.52rem;
            color: black;
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
            background: #fff;
            position: relative;
            color: #3d79ad;
            border: 1px solid #3d79ad;
            p {
              color: #3d79ad;
            }
          }
        }
      }

      .sw {
        margin-top: 0.29rem;
        border-top: 1px solid #e9e4e4;
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

      .nowGet {
        display: block;
        height: 0.8rem;
        width: 5.39rem;
        line-height: 0.8rem;
        background: #3f86f7;
        border-radius: 0.38rem;
        margin: 0.4rem auto;
        font-size: 0.4rem;
        font-weight: 500;
        color: #ffffff;
        text-align: center;
        .nut-button__warp::before {
          content: '节省近70元';
          position: absolute;
          top: -0.5rem;
          right: 0;
          font-size: 0.2rem;
          background: red;
          border-radius: 0.13rem 0 0.13rem 0;
          padding: 0 0.1rem;
          height: 0.4rem;
          line-height: 0.4rem;
          border-radius: 0.2rem 0.2rem 0.2rem 0;
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
        color: #2e2e2d;
        font-size: 0.31rem;
        text-align: center;
        font-weight: bold;
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
