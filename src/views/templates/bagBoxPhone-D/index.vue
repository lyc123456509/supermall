<template>
  <div class="container">
    <div class="welcome">{{ showMoney }}成为会员即可参与抢购活动</div>
    <div class="sun"></div>
    <div class="head-box">
      <img src="@/assets/phoneBox-D/v4_success.png" alt="" class="hb_success" />
      <div class="app">
        <img :src="info.landingPageResponse.logoUrl" alt="" />
        <span>{{ info.appName }}</span>
      </div>
      <div class="iphone">
        <img src="@/assets/phoneBox-D/iphone.png" alt="" />
        <div class="info">
          <span>Iphone14 Pro Max</span>
          <span>国行正品+颜色随机</span>
          <div class="tags">
            <div class="tag">超长待机</div>
            <div class="tag">5G全网通</div>
          </div>
          <div class="price">
            <span>市场价：13999</span>
            <span>¥0</span>
          </div>
        </div>
      </div>
      <div class="userPhone">
        <img class="phone_img" src="@/assets/phoneBox-D/phone_1.png" alt="" />
        <nut-input
          type="tel"
          v-model="phone"
          placeholder="请输入您的手机号"
          maxLength="11"
          :border="false"
          :style="{
            width: '4rem',
            height: '1rem',
            lineHeight: '1rem',
            fontSize: '0.32rem',
            background: '#fff',
            padding: '0',
            margin: '0 0.2rem',
            backgroundColor: 'transparent',
            color: 'rgb(51,51,51)',
          }"
        />
      </div>
      <div class="scale-animation nowGet" @click="getPayHandle">立即抢购</div>
      <UserBook @change="isAgreeCB" :phone="phone" style="margin: 0.1rem 0 0 0; color: #fff" :checkImg="[select_icon, unselect_icon]" />
    </div>
    <img src="@/assets/phoneBox-D/landing_new_goods.png" alt="" class="landing_new_goods" />
    <div class="rule-fp">
      <img :src="info.landingPageResponse.logoUrl" alt="" class="logo" />
      <div class="title">规则详情：</div>
      <div class="content" v-html="info.phoneData.remark && JSON.parse(info.phoneData.remark)?.desc"></div>
    </div>
    <companyInfo style="color: #999; margin-top: 0.4rem" />
    <SideBar />
  </div>
</template>

<script lang="ts" setup>
  import useRandomMoney from '/@/hooks/useRandomMoney';
  import { useConfigStore } from '/@/store/modules/platform';
  import select_icon from '/@/assets/phoneBox-D/select.png';
  import unselect_icon from '/@/assets/phoneBox-D/unselect.png';
  import { Toast } from '@nutui/nutui';
  import { PayCenter } from '/@/utils/pay';

  const { showMoney, randomMoney } = useRandomMoney();
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
    });
  };

  const { phone } = toRefs(state);
</script>

<style lang="scss" scoped>
  .container {
    background-color: #000;
    min-height: 100vh;
    width: 100vw;
    position: relative;
    padding-top: 0.5rem;
    box-sizing: border-box;
    .welcome {
      font-size: 0.28rem;
      color: #ffffff;
      opacity: 0.4;
      text-align: center;
    }
    .sun {
      width: 6rem;
      height: 6rem;
      background-image: url(/@/assets/phoneBox-D/v4_sun.png);
      background-size: cover;
      background-repeat: no-repeat;
      position: absolute;
      top: 1.06667rem;
      left: calc(50% - 3rem);
      z-index: 0;
      animation: rotate 6s linear 0s infinite normal none;
    }
    .head-box {
      width: 90%;
      height: 10rem;
      margin: 0 auto;
      margin-top: 0.6rem;
      background-image: url(/@/assets/phoneBox-D/v4_bg.png);
      background-size: 100% auto;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      .hb_success {
        width: 1.538462rem;
      }
      .app {
        margin-top: 0.2rem;
        display: flex;
        align-items: center;
        img {
          width: 0.423077rem /* 22/52 */;
          height: 0.423077rem /* 22/52 */;
        }
        span {
          font-size: 0.28rem;
          color: #fff;
          margin-left: 0.15rem;
        }
      }
      .iphone {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 1.3rem;
        img {
          width: 2rem;
        }
        .info {
          display: flex;
          flex-direction: column;
          justify-content: center;
          & > span:nth-child(1) {
            font-size: 0.3rem;
            font-weight: bold;
          }
          & > span:nth-child(2) {
            font-size: 0.2rem;
            color: #a6a5a4;
          }
          & > * {
            margin-top: 0.1rem;
          }
          .tags {
            display: flex;
            justify-content: flex-start;
          }
          .tag {
            display: inline-block;
            padding: 0.05rem;
            border: 1px solid #ff8071;
            color: #ff8071;
            font-size: 0.2rem;
            border-radius: 0.05rem;
            transform-origin: 0px;
            transform: scale(0.85);
          }
          .price {
            display: flex;
            justify-content: space-between;
            font-size: 0.2rem;
            & > span:nth-child(1) {
              color: #a6a5a4;
              text-decoration: line-through;
            }
            & > span:nth-child(2) {
              color: red;
            }
          }
        }
      }
      .userPhone {
        display: flex;
        align-items: center;
        width: 6rem;
        height: 1rem;
        margin: 0 auto;
        border-radius: 0.5rem;
        background: #fcf0e7;
        border-radius: 53px;
        margin-top: 1.3rem;
        .phone_img {
          width: 0.28rem;
          height: 0.4rem;
          margin-left: 0.4rem;
        }
        :deep(input) {
          &::placeholder {
            color: rgb(51, 51, 51);
          }
        }
      }
      .nowGet {
        background-image: url(/@/assets/phoneBox-D/v4_btn.png);
        background-size: 100% auto;
        width: 5.769231rem /* 300/52 */;
        height: 1.115385rem /* 58/52 */;
        text-align: center;
        line-height: 1.115385rem /* 58/52 */;
        font-size: 0.38rem;
        color: #ff1849;
        font-weight: 500;
        margin-top: 0.2rem;
      }

      :deep(.user-book) {
        & > img {
          width: 0.28rem;
          height: 0.28rem;
        }
        .policy {
          color: #ffcc68;
        }
      }
    }
    .landing_new_goods {
      width: 90% /* 315/52 */;
      margin: 0.2rem auto 0 auto;
      display: block;
    }
    .rule-fp {
      width: 94%;
      min-height: 11rem /* 502/52 */;
      background-image: url(/@/assets/phoneBox-D/rechargeV1_rule.png);
      background-size: 100% auto;
      background-repeat: no-repeat;
      margin: 0 auto;
      margin-top: 0.4rem;
      position: relative;
      padding: 3.5rem 0.6rem 1rem 0.6rem;
      box-sizing: border-box;
      color: #333;
      font-size: 0.230769rem /* 12/52 */;
      .logo {
        border-radius: 50%;
        width: 0.846154rem /* 44/52 */;
        position: absolute;
        top: 1.14rem;
        left: 2.3rem;
      }
      .content {
        width: 100%;
        line-height: 0.4rem;
      }
    }

    @keyframes rotate {
      0% {
        transform: rotate(0deg);
      }
      50% {
        transform: rotate(-180deg);
      }

      100% {
        transform: rotate(-360deg);
      }
    }
  }
</style>
