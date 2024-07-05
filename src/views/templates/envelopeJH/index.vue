<template>
  <div class="container-pre">
    <img class="logo_img" :src="info.landingPageResponse.logoUrl" alt="" />
    <span class="header-recharge">{{ showMoney }} 元充值 {{ info.phoneData.cssClass || 100 }}元话费券</span>
    <img :src="img_bt" alt="" class="gongxi" />
    <div class="red">
      <div class="renyi">百元优惠券，任意号码可用</div>
      <div class="amount">
        <span class="unit">¥</span>
        <span class="money">{{ money }}</span>
      </div>
      <div class="progress">
        <img :src="img_jdt" alt="" style="width: 4.2rem; margin-right: -0.2rem" />
        <img :src="icon_hfj" alt="" />
      </div>
      <nut-input
        type="tel"
        v-model="phone"
        placeholder="请输入您的手机号"
        maxLength="11"
        :border="false"
        :style="{ marginTop: '0.8rem', width: '87%', height: '1rem', lineHeight: '1rem', borderRadius: '0.5rem', fontSize: '0.32rem' }"
      />
      <img :src="btn_ljcz" class="nowGet" @click="btnHandle" alt="" />
      <!-- <div class="nowGet scale-animation" @click="btnHandle"> 立即充值 </div> -->
      <UserBook @change="isAgreeCB" :phone="phone" style="color: #fff; margin-top: 0rem" :checkImg="[checked, unchecked]" />
    </div>
    <div v-if="props.bxm" style="color: #ffffff; margin-top: 0.4rem">实际为话费券形式发放的服务</div>
    <companyInfo style="color: #fff; margin-top: 0.2rem" />
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

  import img_jdt from '/@/assets/envelope2/img_jdt.png';
  import icon_hfj from '/@/assets/envelope2/icon_hfj.png';
  import img_bt from '/@/assets/envelope2/img_bt.png';
  import unchecked from '/@/assets/envelope2/unchecked.png';
  import checked from '/@/assets/envelope2/checked.png';
  import btn_ljcz from '/@/assets/envelope2/btn_ljcz@2x.png';

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
    width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: linear-gradient(180deg, #ff4537, #ff8c62 59%, #febd79);
    .logo_img {
      width: 0.8rem;
      height: 0.8rem;
      margin-top: 0.2rem;
      position: absolute;
      left: 0.1rem;
      top: 0.1rem;
    }
    .header-recharge {
      color: #ffffffa3;
      font-size: 0.2rem;
      padding: 0.05rem 0.1rem;
      display: block;
      border: 1px solid #ffffffa3;
      margin-top: 0.4rem;
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
        transform: scale(0.8);
      }
      100% {
        transform: scale(1);
      }
    }
  }
</style>
