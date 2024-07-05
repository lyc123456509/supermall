<template>
  <div class="container">
    <img src="@/assets/smallTV2/waitGet.png" alt="" class="wait" />
    <div class="guess" v-if="guess === '1'"><img src="@/assets/smallTV2/true.png" alt="" />恭喜猜中剧情</div>
    <div class="guess" v-else-if="guess === '-1'"><img src="@/assets/smallTV2/false.png" alt="" />很可惜猜错了，继续解锁剧情</div>
    <img src="@/assets/smallTV2/csj.png" alt="" class="csj" />
    <div class="bottom-container">
      <div class="unlock-price">剧情解锁价：<span class="price">¥9.80</span></div>
      <div class="after-unlock">
        <p>您将获得：解锁7集剧情+<span style="color: #fc482a">免费抽iPhone14Pro</span> 机会</p>
      </div>
      <img src="@/assets/smallTV2/btn_lq.png" class="nowGet" alt="" @click="submitHandle" />
      <div class="pay"> <img src="@/assets/smallTV2/aqzf.png" alt="" />微信安全支付<img src="@/assets/smallTV2/checked.png" alt="" /> </div>
    </div>
    <div class="second-hide">
      <div class="follow">关注公众号【剧场中转站】参与抽奖</div>
      <img src="@/assets/smallTV2/btn_gz.png" class="nowGet" alt="" @click="goWx" />
      <div class="steps">
        <div class="step1"><img src="@/assets/smallTV2/step1.png" alt="" />关注公众号</div>
        <div class="step2"><img src="@/assets/smallTV2/step2.png" alt="" />参与抽奖活动</div>
        <div class="step3"><img src="@/assets/smallTV2/step3.png" alt="" />最高抽手机</div>
      </div>
    </div>
    <SideBar
      style="top: 2.75rem"
      :itemStyle="{
        color: '#845e07',
        background: '#e9d6ad',
        border: '0px',
        padding: '0.06rem 0.12rem',
        fontSize: '0.24rem',
        boxShadow: '1px 1px 4px 1px #958888',
        marginTop: '0.2rem',
      }"
    />
    <CompanyInfo style="color: #a69064; margin-top: 1.14rem" />
    <img :src="info.landingPageResponse.logoUrl" class="logo" alt="" />
  </div>
</template>

<script lang="ts" setup>
  import useCheckOrder from '/@/hooks/useCheckOrder';
  import router from '/@/router';
  import { useConfigStore } from '/@/store/modules/platform';
  import { PayCenter } from '/@/utils/pay';
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
    background-image: url('/@/assets/smallTV2/bg-second.png');
    background-size: 100% auto;
    background-repeat: no-repeat;
    background-color: #e0c38f;
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
      top: 2.47rem;
      color: #c82f25;
      font-size: 0.39rem;
      img {
        width: 0.51rem;
        margin-right: 0.18rem;
        vertical-align: top;
      }
    }
    .csj {
      position: absolute;
      width: 1.62rem;
      top: 5.93rem;
      right: 1.02rem;
    }
    .logo {
      position: absolute;
      top: 0.09rem;
      left: 0.34rem;
      width: 0.95rem;
    }
    .wait {
      width: 6.27rem;
      margin-top: 1.18rem;
    }
    .bottom-container {
      margin-top: 6.45rem;
      display: flex;
      flex-direction: column;
      align-items: center;
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
        margin-top: 3.44rem;
        text-align: center;
      }
      .nowGet {
        width: 6.1rem;
        margin-top: 1.41rem;
      }
      .steps {
        margin-top: 0.71rem;
        background-image: url('/@/assets/smallTV2/stepLine.png');
        background-repeat: no-repeat;
        background-size: contain;
        background-position-y: 0.3rem;
        width: 6.1rem;
        display: flex;
        justify-content: space-between;
        padding: 0 0.56rem;
        box-sizing: border-box;
        font-size: 0.23rem;
        color: #333333;
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
