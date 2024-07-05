<template>
  <div class="top"></div>
  <div class="container-pre">
    <img class="logo_img" :src="info.landingPageResponse.logoUrl" alt="" />
    <span class="header-recharge">{{ showMoney }} 元充值 {{ info.phoneData.cssClass || 100 }}元话费券</span>
    <div class="swiperC">
      <nut-swiper
        :init-page="page4"
        :pagination-visible="false"
        :loop="true"
        auto-play="3000"
        direction="vertical"
        height="50"
        style="height: 0.5rem"
      >
        <nut-swiper-item>
          <div class="userList">
            <img class="user" :src="user1" alt="" />
            <img class="user_wechat" :src="user_wechat" alt="" />
          </div>
        </nut-swiper-item>
        <nut-swiper-item>
          <div class="userList">
            <img class="user" :src="user2" alt="" />
            <img class="user_wechat" :src="user_wechat" alt="" />
          </div>
        </nut-swiper-item>
        <nut-swiper-item>
          <div class="userList">
            <img class="user" :src="user3" alt="" />
            <img class="user_wechat" :src="user_wechat" alt="" />
          </div>
        </nut-swiper-item>
        <nut-swiper-item>
          <div class="userList">
            <img class="user" :src="user4" alt="" />
            <img class="user_wechat" :src="user_wechat" alt="" />
          </div>
        </nut-swiper-item>
        <nut-swiper-item>
          <div class="userList">
            <img class="user" :src="user5" alt="" />
            <img class="user_wechat" :src="user_wechat" alt="" />
          </div>
        </nut-swiper-item>
      </nut-swiper>
    </div>
    <div class="money">
      {{ money }}
    </div>

    <div class="userPhone">
      <img class="phone_img" :src="icon_phone" alt="" />
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
        }"
      />
    </div>
    <img :src="btn_ljcz" class="nowGet" @click="btnHandle" alt="" />
    <UserBook @change="isAgreeCB" style="color: #ccc; margin-top: 0rem" :checkImg="[checked, unchecked]" :phone="phone" />
    <companyInfo style="color: #fff; margin-top: 0.8rem" />
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

  import unchecked from '/@/assets/envelope2/unchecked.png';
  import checked from '/@/assets/envelope2/checked.png';
  import btn_ljcz from '/@/assets/skyblue/button.png';
  import icon_phone from '/@/assets/skyblue/icon_phone.png';
  import user1 from '/@/assets/user/user1.png';
  import user2 from '/@/assets/user/user2.png';
  import user3 from '/@/assets/user/user3.png';
  import user4 from '/@/assets/user/user4.png';
  import user5 from '/@/assets/user/user5.png';
  import user_wechat from '/@/assets/user/user_wechat.png';

  const configStore = useConfigStore();
  useCheckOrder();
  const { randomMoney, showMoney } = useRandomMoney();

  const props = defineProps({
    animation: Boolean,
    bxm: Boolean,
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
    page4: 0,
  });

  //

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

  const { phone, page4 } = toRefs(state);
</script>

<style lang="scss" scoped>
  .top {
    height: 0.5rem;
    background: rgba(85, 159, 255, 1);
    width: 100%;
  }
  .container-pre {
    width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgba(85, 159, 255, 1);
    background-image: url(/@/assets/skyblue/skyblue_bg.png);
    background-size: contain;
    background-repeat: no-repeat;
    // background: linear-gradient(180deg, #ff4537, #ff8c62 59%, #febd79);
    .swiperC {
      width: 3.5rem;
      height: 0.38rem;
      margin-top: 1.76rem;
      .userList {
        width: 3.5rem;
        height: 0.58rem;
        display: flex;
        align-items: center;
        .user {
          width: 2rem;
          height: 0.36rem;
        }
        .user_wechat {
          height: 0.68rem;
          height: 0.3rem;
        }
      }
    }
    .logo_img {
      width: 0.8rem;
      height: 0.8rem;
      margin-top: 0.2rem;
      position: absolute;
      left: 0.1rem;
      top: 0.1rem;
    }

    .money {
      font-size: 3rem;
      font-weight: 600;
      color: #ff5c00;
      margin-top: 1.4rem;
    }
    .userPhone {
      display: flex;
      align-items: center;
      // justify-content: center;
      width: 6rem;
      height: 1rem;
      border-radius: 0.5rem;
      border: 0.02rem solid #333;
      background: #fff;
      margin-top: 0.7rem;
      .phone_img {
        width: 0.28rem;
        height: 0.4rem;
        margin-left: 0.4rem;
      }
    }
    .nowGet {
      width: 80%;
      height: 1.2rem;
      margin: 0.2rem auto 0.2rem auto;
      animation: scaleAnimation 0.7s linear infinite;
    }

    .header-recharge {
      color: #ffffffa3;
      font-size: 0.2rem;
      padding: 0.05rem 0.1rem;
      display: block;
      border: 1px solid #ffffffa3;
      // margin-top: 0.4rem;
    }

    .gongxi {
      margin-top: 0.7rem;
    }
    .red {
      margin-top: 0.3rem;
      box-sizing: border-box;
      width: 6.5rem;
      height: 10rem;
      background-size: 100% 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-image: url(/@/assets/envelope2/bh_bg.png);
      background-size: contain;
      background-repeat: no-repeat;
      .renyi {
        font-size: 0.28rem;
        color: #ff0000db;
        margin-top: 1.2rem;
      }
      .amount {
        display: flex;
        margin-top: -0.2rem;
        align-items: baseline;
        .unit {
          font-size: 0.8rem;
          font-weight: bold;
          color: #ff0000;
        }
        .money {
          font-size: 2.4rem;
          color: red;
          font-weight: bold;
        }
        img {
          width: 0.68rem;
          height: 1.78rem;
        }
      }

      .progress {
        display: flex;
        align-items: center;
        margin-top: -0.25rem;
      }

      .nowGet {
        width: 100%;
        height: auto;
        margin: 0 auto;
        animation: scaleAnimation 0.7s linear infinite;
      }
    }
    @keyframes scaleAnimation {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(0.9);
      }
      100% {
        transform: scale(1);
      }
    }
  }

  .nut-swiper-item {
    line-height: 0.39rem;
    width: 1.8rem;
    ::v-deep(.nut-swiper-pagination-vertical) {
      i {
        width: 0.06rem;
        height: 0.06rem;
        border-radius: 50%;
        &.active {
          height: 0.18rem;
          border-radius: 0.05rem;
        }
      }
    }
  }
</style>
