<template>
  <div>
    <div class="container">
      <!-- <img class="logo_img" :src="info.landingPageResponse.logoUrl" alt="" /> -->
      <div class="title">{{ showMoney }}元购买{{ info.phoneData.cssClass }}元话费券</div>
      <div class="price"> {{ info.phoneData.cssClass }}<span style="font-size: 0.38rem">元</span> </div>
      <div class="notice">
        <img src="/src/assets/squirrel/bf.png" alt="" />
        <nut-swiper :init-page="1" :loop="true" auto-play="3000" direction="vertical" height="30" style="height: 14px">
          <nut-swiper-item v-for="item in userData" :key="item.name">
            <div class="user-item">
              <span style="margin-left: 0.3rem">{{ item.name }}</span>
            </div>
          </nut-swiper-item>
        </nut-swiper>
      </div>
      <div class="coupon">
        <div class="allPrice">
          <div class="left_price">
            <div>共计</div>
            <div class="tag">￥</div>
          </div>
          <div class="price">{{ info.phoneData.cssClass }}</div>
        </div>
        <div class="detail">
          <p v-if="info.phoneData.cssClass === '100'">5元话费券*10张</p>
          <p v-else-if="info.phoneData.cssClass === '200'">5元话费券*20张</p>
          <p v-else-if="info.phoneData.cssClass === '500'">5元话费券*50张</p>

          单笔充值满100元可抵扣5元
          <p v-if="info.phoneData.cssClass === '100'">10元话费券*5张</p>
          <p v-else-if="info.phoneData.cssClass === '200'">10元话费券*10张</p>
          <p v-else-if="info.phoneData.cssClass === '500'">10元话费券*25张</p>

          单笔充值满200元可抵扣10元
        </div>
      </div>
      <div class="phone">
        <nut-input
          type="tel"
          v-model="phone"
          placeholder="请输入手机号领取福利"
          maxLength="11"
          :border="false"
          style="width: 100%; background: transparent; font-size: 0.36rem; color: #333; font-weight: bold; padding: 0 0.24rem"
        />
      </div>
      <div class="btn" @click="getPayHandle">
        立即抢购
        <div class="tips"
          >限量秒杀中
          <nut-countdown :endTime="end" v-model="resetTime" millisecond format="HH:mm:ss:SS" class="times">
            <div class="countdown-part-box _flex countdown">
              <div class="part-item ml">{{ resetTime.m >= '10' ? resetTime.m : '0' + resetTime.m }}</div>
              <span class="part-item-symbol">:</span>
              <div class="part-item s">{{ resetTime.s >= '10' ? resetTime.s : '0' + resetTime.s }}</div>
              <span class="part-item-symbol">:</span>
              <div class="part-item mr">{{
                (Number(resetTime.ms) / 10).toFixed(0) >= '10'
                  ? (Number(resetTime.ms) / 10).toFixed(0)
                  : '0' + (Number(resetTime.ms) / 10).toFixed(0)
              }}</div>
            </div>
          </nut-countdown>
        </div>
      </div>
      <UserBook @change="isAgreeCB" :phone="phone" />
      <div class="stepTit">话费券领取步骤</div>
      <img class="step" src="/src/assets/squirrel/step.png" alt="" />
      <div class="step_content">
        <div>注册会员</div>
        <div>安装APP</div>
        <div>登陆领取话费券</div>
        <div>使用话费券</div>
      </div>
      <companyInfo color="#f7c1bf" />

      <sideBar />
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
  import { userData } from './mock';

  const configStore = useConfigStore();
  const { randomMoney, showMoney } = useRandomMoney();
  useCheckOrder();

  const info = computed(() => {
    return configStore.info;
  });
  // const submitLoading = computed(() => {
  //   return configStore.submitLoading;
  // });
  const state = reactive({
    phone: usePhone(),
    isAgree: true,
    payType: '',
    end: Date.now() + 60 * 1000 * 5,
    resetTime: {
      m: '00',
      s: '00',
      ms: '00',
    },
  });

  const isAgreeCB = (agreeState: boolean) => {
    state.isAgree = agreeState;
  };

  // const payMethodCB = (value: string) => {
  //   state.payType = value;
  // };

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

  const { phone, end, resetTime } = toRefs(state);
</script>

<style lang="scss" scoped>
  .container {
    background-image: url(/@/assets/squirrel/bg.png);
    width: 100vw;
    min-height: 100vh;
    background-repeat: no-repeat;
    background-size: contain;
    background-color: RGBA(249, 70, 66, 1);
    padding: 0 0.2rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    .logo_img {
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 0.1rem;
      position: absolute;
      left: 0.1rem;
      top: 0.6rem;
    }
    .title {
      font-size: 0.48rem;
      color: #f4e4d2;
      margin: 0.3rem auto;
    }
    .price {
      font-size: 2.12rem;
      font-family: DIN;
      font-weight: bold;
      color: #f6f1df;
    }
    .notice {
      width: 4.6rem;
      padding: 0.1rem 0.21rem;
      background: rgba(0, 0, 0, 0.3);
      border-radius: 0.21rem;
      margin: 0.3rem auto 0.4rem auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      img {
        width: 0.25rem;
        height: 0.23rem;
      }
      .user-item {
        width: 4.3rem;
        font-size: 0.21rem;
        color: #ffffff;
      }
    }
    .coupon {
      background-image: url(/@/assets/squirrel/coupon_bg.png);
      width: 5.77rem;
      min-height: 1.9rem;
      background-repeat: no-repeat;
      background-size: contain;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: 500;
      .allPrice {
        font-size: 37rpx;
        color: #e5554c;
        display: flex;
        align-items: center;
        margin-left: 0.4rem;
        .left_price {
          font-size: 0.25rem;
          color: #e5554c;
          .tag {
            font-size: 0.37rem;
            font-family: PingFang SC;
            font-weight: 500;
            display: flex;
            justify-content: flex-end;
          }
        }
        .price {
          font-size: 0.8rem;
          font-family: DIN;
          font-weight: bold;
          color: #e5554c;
        }
      }
      .detail {
        font-size: 0.2rem;
        color: #ae554d;
        margin-right: 0.2rem;
        p {
          font-size: 0.27rem;
          color: #e5554c;
          line-height: 0.5rem;
        }
      }
    }
    .phone {
      width: 4.8rem;
      height: 1.2rem;
      background: #f5f5f5;
      border-radius: 0.61rem;
      margin-top: 0.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-left: 0.7rem;
    }
    .btn {
      width: 6rem;
      height: 1.27rem;
      background: linear-gradient(0deg, #f0dba6 0%, #faf3d6 100%);
      border-radius: 0.6rem;
      margin-top: 0.47rem;
      font-size: 0.44rem;
      font-weight: 600;
      color: #9f3b34;
      text-align: center;
      line-height: 1.27rem;
      position: relative;
      .tips {
        width: 2.9rem;
        height: 0.53rem;
        background: #e7d357;
        border-radius: 0.27rem;
        font-size: 0.27rem;
        color: #9a3032;
        position: absolute;
        text-align: center;
        line-height: 0.53rem;
        top: -0.2rem;
        right: 0;
        display: flex;
        padding-left: 0.2rem;
      }
    }
    .stepTit {
      font-size: 0.32rem;
      color: #ffffff;
      margin: 0.3rem auto 0.6rem auto;
    }
    .step {
      width: 100%;
      height: 0.99rem;
      margin-bottom: 0.2rem;
    }
    .step_content {
      width: 82%;
      font-size: 0.21rem;
      color: #f7c1bf;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
</style>
