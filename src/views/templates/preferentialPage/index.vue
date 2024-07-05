<template>
  <main>
    <backAdver />
    <img :src="info.logoUrl" class="logo" alt="" />
    <header>
      <div class="title"> 恭喜您！您已锁定优惠名额 </div>
    </header>
    <div class="container">
      <div class="show">
        <img src="https://nginx-beta.oss-cn-chengdu.aliyuncs.com/h5/blue/phone.png" alt="" />
        <div class="info">
          <h2>话费券包 100元</h2>
          <div class="infoBox">
            <span>三网通用</span>
            <span>会员专享</span>
            <span>限时特惠</span>
          </div>
        </div>
      </div>
      <nut-input
        type="tel"
        v-model="phone"
        placeholder="输入办理手机号"
        maxLength="11"
        :border="false"
        class="nowGet"
        right-icon="https://nginx-beta.oss-cn-chengdu.aliyuncs.com/h5/blue/icon-lxr.png"
        right-icon-size="26"
      />
      <div class="pay_amount">
        <span class="text">实际到账话费券包：</span>
        <span class="value">{{ Number(info.phoneData.cssClass).toFixed(2) }}元</span>
      </div>
      <div class="pay_amount">
        <span class="text">会员限时特惠</span>
        <span class="value">-{{ new BigNumber(100).minus(showMoney) }}元</span>
      </div>
      <div class="pay_amount">
        <span class="text">实付金额</span>
        <span class="value pay_price">{{ showMoney }}元</span>
      </div>
    </div>
    <div class="payType">
      <div class="sw">
        <img src="/src/assets/blue/icon_yhq.png" alt="" />
        <span>不满意可无理由退款</span>
      </div>
      <!-- <h2>支付方式</h2> -->
      <PayMethod @change="payMethodCB" />
    </div>
    <nut-button :loading="submitLoading" class="scale-animation btn" size="large" @click="getPayHandle">立即支付</nut-button>
    <UserBook @change="isAgreeCB" :phone="phone" />
    <div class="hf_c_box">
      <div class="hf_title">话费优惠券包说明</div>
      <div class="hf_text" v-html="info.phoneData.remark && JSON.parse(info.phoneData.remark)?.desc"></div>
      <companyInfo />
    </div>
    <sideBar
      :itemStyle="{
        background: 'rgba(178,178,178, 0.8)',
        'border-radius': '5vw 0 0 5vw',
        border: 0,
        color: '#eee',
        padding: '0.1rem 0.15rem',
      }"
      :downloadShow="true"
    />
  </main>
</template>

<script setup lang="ts">
  import { PayCenter } from '/@/utils/pay';
  import BigNumber from 'bignumber.js';
  import { useConfigStore } from '/@/store/modules/platform';
  import useRandomMoney from '/@/hooks/useRandomMoney';
  import { Toast } from '@nutui/nutui';
  import usePhone from '/@/hooks/usePhone';
  const configStore = useConfigStore();
  const { randomMoney, showMoney } = useRandomMoney();
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
<style lang="scss">
  main {
    min-width: 100vw;
    min-height: 100vh;
    background: #f2f2f2;
    overflow: hidden;
    .logo {
      position: absolute;
      top: 0.3rem;
      left: 0.3rem;
      width: 0.88rem;
      height: 0.88rem;
      border-radius: 0.1rem;
    }
    header {
      width: 100%;
      text-align: center;
      .title {
        font-weight: 500;
        font-size: 0.36rem;
        height: 1.5rem;
        line-height: 1.5rem;
      }
    }
    .container {
      background: #ffffff;
      border-radius: 0.2rem;
      padding: 0.3rem 0.28rem;
      margin: 0 0.16rem;
      .show {
        width: 100%;
        display: grid;
        grid-template-rows: 100%;
        grid-template-columns: 30% 70%;
        h2 {
          margin: 0;
        }
        img {
          width: 1.56rem;
          height: 1.72rem;
        }
        .infoBox {
          margin-top: 0.22rem;
          span {
            width: 1.24rem;
            height: 0.42rem;
            border: 0.02rem solid #008cff;
            border-radius: 0.08rem;
            display: inline-grid;
            justify-content: center;
            align-items: center;
            font-size: 0.24rem;
            color: #008cff;
            margin-right: 0.22rem;
          }
        }
      }
      .nut-input {
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        background: transparent;
        font-size: 0.4rem;
        color: #333;
        padding: 0 0.24rem;
        border-top: 1px solid #ededed;
        border-bottom: 1px solid #ededed;
        border-radius: 0;
        margin: 0.24rem 0;
        input::-webkit-input-placeholder {
          color: #666;
        }
      }
      .pay_amount {
        font-size: 0.3rem;
        font-weight: 500;
        color: #666666;
        margin-top: 0.08rem;
        display: flex;
        justify-content: space-between;
        .value {
          color: #333;
          font-size: 0.3rem;
          font-weight: 500;
        }
        .pay_price {
          color: #3a81fa;
          font-size: 0.38rem;
          font-weight: bold;
        }
      }
    }
    .payType {
      margin: 0.3rem 0.16rem 0;
      background: #ffffff;
      border-radius: 0.2rem;
      padding: 0.3rem 0.28rem;
      .sw {
        display: flex;
        font-size: 0.26rem;
        font-weight: 500;
        color: #999999;
        margin-bottom: 0.16rem;
        img {
          width: 0.3rem;
          height: 0.28rem;
          margin-right: 0.06rem;
        }
      }
      .payMethod {
        margin-top: 0.3rem;
        margin-bottom: 0;
      }
    }
    .btn {
      display: block;
      height: 1.17rem;
      width: 90%;
      line-height: 0.8rem;
      background: #3f86f7;
      border-radius: 0.59rem;
      margin: 0.4rem auto;
      font-size: 0.54rem;
      font-weight: 500;
      color: #ffffff;
      text-align: center;
      .nut-button__warp::before {
        content: '节省近70元';
        position: absolute;
        top: -0.2rem;
        right: 0;
        font-size: 0.2rem;
        background: red;
        border-radius: 0.13rem 0 0.13rem 0;
        padding: 0 0.2rem;
        height: 0.4rem;
        line-height: 0.4rem;
        border-radius: 0.2rem 0.2rem 0.2rem 0;
      }
    }
    .hf_c_box {
      width: 6.8rem;
      margin: 0 auto;
      background: #fff;
      border-radius: 0.2rem;
      padding: 0.3rem 0.17rem 0.31rem 0.17rem;
      margin-top: 0.37rem;
      margin-bottom: 0.2rem;
      .hf_title {
        color: #2e2e2d;
        font-size: 0.31rem;
        text-align: center;
        margin-bottom: 0.3rem;
      }
      .hf_text {
        padding: 0.3rem 0.12rem 0.5rem 0.12rem;
        background: #f8f8f8;
        border: 0.02rem solid rgba(170, 169, 169, 0.4);
        border-radius: 0.1rem;
        font-size: 0.26rem;
        color: #717171;
        line-height: 0.44rem;
      }
      .footerInfo {
        color: #717171;
      }
    }
  }
</style>
