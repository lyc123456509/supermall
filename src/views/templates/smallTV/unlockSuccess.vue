<template>
  <div class="container">
    <img src="@/assets/smallTV/img_bt01_unlock.png" alt="" class="wait" />
    <div class="phone-container"></div>
    <div class="follow">关注公众号【剧场中转站】参与抽奖</div>
    <div class="nowGet" @click="goWx">立即关注</div>
    <div class="steps">
      <span>关注公众号</span>
      <span>参与抽奖活动</span>
      <span>最高抽手机</span>
    </div>
    <SideBar
      style="top: 1.4rem"
      :itemStyle="{
        color: '#FAE52E',
        background: 'rgba(249, 228, 47, 0.1)',
        border: '0px',
        padding: '0.19rem 0.22rem',
        fontSize: '0.28rem',
      }"
    />
    <CompanyInfo style="color: #772ac4; margin-top: 0.54rem" />
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
    background-image: url('/@/assets/smallTV/bg.png');
    background-size: 100% auto;
    background-repeat: no-repeat;
    width: 100vw;
    min-height: 100vh;
    background-color: #000;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    .logo {
      position: absolute;
      top: 0.09rem;
      left: 0.34rem;
      width: 0.95rem;
    }
    .wait {
      width: 7.21rem;
      margin-top: 0.68rem;
    }
    .phone-container {
      background-image: url('/@/assets/smallTV/img_sj.png');
      width: 4.14rem;
      height: 5.38rem;
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
      position: relative;
      margin-top: -0.2rem;
    }
    .follow {
      margin-top: 0.74rem;
      color: #fff;
      font-size: 0.27rem;
    }
    .nowGet {
      margin-top: 0.12rem;
      background-image: url('/@/assets/smallTV/btn_qrlq.png');
      background-repeat: no-repeat;
      background-size: contain;
      width: 5.87rem;
      height: 1.59rem;
      line-height: 1.59rem;
      text-align: center;
      color: #fbe62e;
      font-weight: 600;
      font-size: 0.41rem;
    }
    .steps {
      margin-top: 1.22rem;
      background-image: url('/@/assets/smallTV/img_jdt2.png');
      background-repeat: no-repeat;
      background-size: contain;
      width: 7.21rem;
      height: 1.93rem;
      font-size: 0.23rem;
      color: #fff;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      padding: 1.6rem 0.8rem 0 1.2rem;
      margin-bottom: 1rem;
    }
  }
</style>
