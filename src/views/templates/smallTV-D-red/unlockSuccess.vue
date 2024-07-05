<template>
  <div class="container">
    <img src="@/assets/smallTV-D-red/unlock.png" alt="" class="wait" />
    <div class="bottom-container">
      <div class="follow">关注公众号【剧场中转站】参与抽奖</div>
      <img src="@/assets/smallTV-D-red/btn_gz2.png" class="nowGet" alt="" @click="goWx" />
    </div>
    <div class="steps">
      <div class="step1"><img src="@/assets/smallTV2/step1.png" alt="" />关注公众号</div>
      <div class="step2"><img src="@/assets/smallTV2/step2.png" alt="" />参与抽奖活动</div>
      <div class="step3"><img src="@/assets/smallTV2/step3.png" alt="" />最高抽手机</div>
    </div>
    <SideBar
      style="top: 1.56rem"
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
    <CompanyInfo style="color: #e07963; margin-top: 0.7rem" />
    <img :src="info.landingPageResponse.logoUrl" class="logo" alt="" />
  </div>
</template>

<script lang="ts" setup>
  import { useConfigStore } from '/@/store/modules/platform';
  const configStore = useConfigStore();
  const info = computed(() => {
    return configStore.info;
  });
  const goWx = () => {
    window.open('https://work.weixin.qq.com/kfid/kfc69a8bb802dd00a4b');
  };
</script>

<style lang="scss" scoped>
  .container {
    background-image: url(/@/assets/smallTV-D-red/bg.png);
    background-size: 100% auto;
    background-repeat: no-repeat;
    width: 100vw;
    min-height: 100vh;
    background-color: #b5351a;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    font-size: 0.27rem;
    color: #5b5c5e;
    .logo {
      position: absolute;
      top: 0.09rem;
      left: 0.34rem;
      width: 0.95rem;
    }
    .wait {
      width: 4.37rem;
      margin-top: 0.43rem;
    }
    .bottom-container {
      margin-top: 7.55rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-image: url('/@/assets/smallTV-D-red/bottom.png');
      background-size: 100% auto;
      background-repeat: no-repeat;
      width: 100vw;
      height: 4.13rem;
    }
    .follow {
      color: #b5351a;
    }
    .nowGet {
      width: 6.1rem;
      margin-top: 0.86rem;
    }
    .steps {
      margin-top: 0.38rem;
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
</style>
