<template>
  <div>
    <div class="container">
      <img class="logo_img" :src="info.landingPageResponse.logoUrl" alt="" />
      <div class="header">
        <img src="/src/assets/green/get.png" alt="" style="width: 1.49rem" />
        <div>
          <span style="font-size: 0.38rem; margin: 0.1rem 0 0.3rem 0">锁定百元话费券！</span>
          <p class="count-down"
            >支付剩余时间<span class="time">{{ time.hour }}</span
            >:<span class="time">{{ time.minute }}</span
            >:<span class="time">{{ time.second }}</span></p
          >
        </div>
      </div>
      <div class="content">
        <div style="font-size: 0.29rem; margin-top: 0.32rem">会员手机号:</div>
        <nut-input
          type="tel"
          v-model="phone"
          placeholder="请输入您的手机号"
          maxLength="11"
          :border="false"
          :right-icon="phoneIcon"
          style="width: 100%; background: transparent; font-size: 0.49rem; color: #333; font-weight: bold; padding: 0 0.24rem"
        />
        <div class="coupon-title">话费券</div>
        <div class="list">
          <div class="item">
            <p>20 <span>元</span></p>
            <p>会员价: 20.00元</p>
          </div>
          <div class="item">
            <p>100 <span>元</span></p>
            <p>会员价: {{ showMoney }}元</p>
          </div>
          <div class="item">
            <p>50 <span>元</span></p>
            <p>会员价: 50.00元</p>
          </div>
        </div>
        <PayMethod @change="payMethodCB" />
        <div class="pay_amount pay_amount_ac">
          <span class="text">实际支付金额：</span>
          <span class="value">{{ showMoney }}元</span>
        </div>
        <div class="pay_amount">
          <span class="text">实际到账话费券：</span>
          <span class="value">100.00元</span>
        </div>
        <div class="pay_amount" v-if="info.FeesInfo && info.FeesInfo !== ''">
          <span class="text">额外附赠：</span>
          <span class="value">{{ info.FeesInfo }}</span>
        </div>
        <nut-button :loading="submitLoading" class="scale-animation nowGet" size="large" @click="getPayHandle">立即充值</nut-button>
        <UserBook @change="isAgreeCB" :phone="phone" :checkImg="[select_icon, unselect_icon]" />
      </div>
      <div class="hf_c_box">
        <div class="hf_title">话费优惠券说明</div>
        <div class="hf_text" v-html="info.phoneData.remark && JSON.parse(info.phoneData.remark)?.desc"> </div>
      </div>
      <companyInfo />
      <sideBar style="top: 1.34rem" />
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
  import phoneIcon from '/@/assets/blue/icon_dh.png';
  import select_icon from '/@/assets/green/select.png';
  import unselect_icon from '/@/assets/green/unselect.png';
  import usePhone from '/@/hooks/usePhone';

  const configStore = useConfigStore();
  const { randomMoney, showMoney } = useRandomMoney();
  useCheckOrder();
  const time = useCountDown();

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

<style lang="scss" scoped>
  :deep(.nut-radio__icon) {
    color: #fd7c27 !important;
  }
  .container {
    background-image: linear-gradient(to bottom, #51b355 80%, #f2f2f2);
    width: 100vw;
    min-height: 100vh;
    background-repeat: no-repeat;
    background-size: 100% 3.4rem;
    background-color: #f2f2f2;
    padding: 0 0.2rem;
    box-sizing: border-box;
    color: #2e2e2d;
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
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding-top: 0.2rem;
      .count-down {
        font-size: 0.3rem;
        margin-top: 0.2rem;
        .time {
          padding: 0 0.1rem;
          text-align: center;
          background: linear-gradient(0deg, #fdf2b7, #ffffff);
          border-radius: 0.07rem;
          color: #2fc337;
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
      .coupon-title {
        margin: 0.32rem 0;
        font-size: 0.29rem;
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
            color: #4d4d4d;
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
            position: relative;
            color: #52ba59;
            border: 1px solid #4daf50;
            background: #fafffa;
            &::before {
              content: '';
              background-image: url(/@/assets/green/priceBdage.png);
              background-size: contain;
              background-repeat: no-repeat;
              position: absolute;
              width: 0.8rem;
              height: 0.8rem;
              left: 0;
              top: 0;
            }
            p {
              color: inherit;
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
          color: #2fc337;
          margin-right: 0.34rem;
          font-size: 0.33rem;
        }
      }

      .nowGet {
        display: block;
        height: 0.8rem;
        width: 5.39rem;
        line-height: 0.8rem;
        background: #50b355;
        border-radius: 0.38rem;
        margin: 0.4rem auto;
        font-size: 0.4rem;
        font-weight: 500;
        color: #ffffff;
        text-align: center;
        :deep(.nut-button__warp::before) {
          content: '节省近70元';
          position: absolute;
          top: -0.5rem;
          right: 0;
          font-size: 0.2rem;
          background: #fd7c27;
          border-radius: 0.13rem 0 0.13rem 0;
          padding: 0 0.1rem;
          height: 0.4rem;
          line-height: 0.4rem;
          border-radius: 0.13rem 0 0.13rem 0;
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
