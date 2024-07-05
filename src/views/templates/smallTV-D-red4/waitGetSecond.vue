<template>
  <div class="container">
    <img src="@/assets/smallTV-D-red/gx.png" alt="" class="wait" v-if="guess === '1'" />
    <img src="@/assets/smallTV-D-red/waitGet.png" alt="" class="wait" v-else />
    <img src="@/assets/smallTV-D-red/all.png" alt="" class="guess" />
    <img src="@/assets/smallTV-D-red/98js.png" alt="" class="csj" />
    <div class="bottom-container">
      <nut-swiper :init-page="1" :loop="true" auto-play="3000" direction="vertical" height="40" style="height: 40px">
        <nut-swiper-item v-for="item in userData" :key="item.name">
          <div class="user-item">
            <img :src="item.avatar" alt="" style="width: 0.36rem; height: 0.36rem; border-radius: 50%" />
            <span style="margin-left: 0.33rem">{{ item.name }}</span>
            <span style="color: #585353; margin-left: auto">已经领取看短剧<span style="color: #ea3323">抽iPhone福利</span></span>
          </div>
        </nut-swiper-item>
      </nut-swiper>
      <img src="@/assets/smallTV-D-red/btn_lq.png" class="nowGet" alt="" @click="submitHandle" />
      <div class="pay"> <img src="@/assets/smallTV2/aqzf.png" alt="" />微信安全支付<img src="@/assets/smallTV2/checked.png" alt="" /> </div>
    </div>
    <div class="second-hide">
      <div class="follow">关注公众号【剧场中转站】参与抽奖</div>
      <img src="@/assets/smallTV-D-red/btn_gz1.png" class="nowGet" alt="" @click="goWx" />
      <div class="steps">
        <div class="step1"><img src="@/assets/smallTV2/step1.png" alt="" />关注公众号</div>
        <div class="step2"><img src="@/assets/smallTV2/step2.png" alt="" />参与抽奖活动</div>
        <div class="step3"><img src="@/assets/smallTV2/step3.png" alt="" />最高抽手机</div>
      </div>
    </div>
    <SideBar
      style="top: 1.56rem"
      :itemStyle="{
        color: '#fcd78a',
        background: 'url(https://nginx-beta.oss-cn-chengdu.aliyuncs.com/h5/calculation/rule.png) no-repeat',
        backgroundSize: '100% 100%',
        border: '0px',
        padding: '0.16rem 0.12rem',
        fontSize: '0.24rem',
        boxShadow: '0px 0px 0px 0px #958888',
        marginTop: '0.2rem',
        writingMode: 'tb-rl',
        borderRadius: '0',
        width: '0.35rem',
        zoom: '0.8',
      }"
      :customerRender="{
        background: 'url(https://nginx-beta.oss-cn-chengdu.aliyuncs.com/h5/calculation/customer.png) no-repeat',
        backgroundSize: '100% 100%',
        width: '0.5rem',
        height: '1rem',
      }"
    />
    <CompanyInfo style="color: #e07963; margin-top: 0rem" :filingStatus="false" :companyStatus="false" :addressStatus="false" />
    <img :src="info.landingPageResponse.logoUrl" class="logo" alt="" />
  </div>
</template>

<script lang="ts" setup>
  import useCheckOrder from '/@/hooks/useCheckOrder';
  import router from '/@/router';
  import { useConfigStore } from '/@/store/modules/platform';
  import { PayCenter } from '/@/utils/pay';
  import { userData } from './mockData';
  const configStore = useConfigStore();
  const info = computed(() => {
    return configStore.info;
  });
  const emitFun = defineEmits(['nextStep']);
  const guess = ref(router.currentRoute.value.query.guess || '0');
  const submitHandle = () => {
    new PayCenter(info.value.applyIdentification).pay({
      randomMoney: 9.8,
      touFangType: 'xjc',
      phone: (+new Date()).toString().slice(2),
    });
  };
  const goWx = () => {
    window.open('https://work.weixin.qq.com/kfid/kfc69a8bb802dd00a4b');
  };
  const successCB = () => {
    emitFun('nextStep', 'unlockSuccess');
    sessionStorage.setItem('step', 'unlockSuccess');
  };
  useCheckOrder(successCB);
  console.log('redirect_url from config');
</script>

<style lang="scss" scoped>
  .container {
    background-image: url('/@/assets/smallTV-D-red/bg4.png');
    background-size: 100% auto;
    background-repeat: no-repeat;
    background-color: #b5351a;
    width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    color: #5b5c5e;
    font-size: 0.27rem;
    .guess {
      position: absolute;
      top: 8.32rem;
      width: 4.64rem;
    }
    .csj {
      position: absolute;
      width: 1.79rem;
      top: 5.08rem;
      right: 0.46rem;
    }
    .logo {
      position: absolute;
      top: 0.09rem;
      left: 0.34rem;
      width: 0.95rem;
    }
    .wait {
      width: 6.27rem;
      margin-top: 0.43rem;
    }
    .bottom-container {
      margin-top: 7.54rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-image: url('/@/assets/smallTV-D-red/bottom.png');
      background-size: 100% auto;
      background-repeat: no-repeat;
      width: 100vw;
      height: 4.13rem;
      .user-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.65rem;
      }
      .unlock-price {
        font-size: 0.27rem;
        margin-bottom: 0.25rem;
        .price {
          color: #c5793b;
        }
      }
      .after-unlock {
        margin-bottom: 0.35rem;
      }
      .nowGet {
        width: 6.1rem;
        margin-bottom: 0.36rem;
      }
      .pay {
        display: flex;
        align-items: center;
        width: 6.1rem;
        img {
          &:nth-child(1) {
            width: 0.4rem;
            margin-right: 0.15rem;
          }
          &:nth-child(2) {
            width: 0.36rem;
            margin-left: auto;
          }
        }
      }
    }
    .second-hide {
      .follow {
        margin-top: 2.01rem;
        text-align: center;
        color: #ffffff;
      }
      .nowGet {
        width: 6.1rem;
        margin-top: 1.74rem;
      }
      .steps {
        margin-top: 0.71rem;
        background-image: url('/@/assets/smallTV-D-red/stepLine.png');
        background-repeat: no-repeat;
        background-size: contain;
        background-position-y: 0.3rem;
        width: 6.1rem;
        display: flex;
        justify-content: space-between;
        padding: 0 0.56rem;
        box-sizing: border-box;
        font-size: 0.23rem;
        color: #ffe6bf;
        & > div {
          display: flex;
          flex-direction: column;
          align-items: center;
          img {
            width: 0.77rem;
            margin-bottom: 0.1rem;
          }
        }
      }
    }
  }
</style>
