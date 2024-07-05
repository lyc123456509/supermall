<template>
  <div class="container">
    <div class="top_bg"> </div>
    <div class="bom-box">
      <div class="title">关注公众号【剧场中转站】参与抽奖</div>
      <img src="/src/assets/smallTV-e/gz.png" alt="" @click="goWx" />
    </div>
    <div class="jd">
      <div class="jd_content">
        <img class="wechat" src="/src/assets/smallTV-e/wechat2.png" alt="" />
        <div class="tips">关注公众号</div>
      </div>
      <div class="jd_content">
        <img class="wechat" src="/src/assets/smallTV-e/gift.png" alt="" />
        <div class="tips">参与抽奖活动</div>
      </div>
      <div class="jd_content">
        <img class="wechat" src="/src/assets/smallTV-e/phone.png" alt="" />
        <div class="tips">最高抽手机</div>
      </div>
    </div>
    <companyInfo color="#FFA688" />
    <sideBar />
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
    background-color: #ff6530;
  }
  .top_bg {
    width: 100vw;
    height: 8.52rem;
    background-image: url(/@/assets/smallTV-e/gzh_bg.png);
    background-repeat: no-repeat;
    background-size: contain;
    overflow: hidden;
    .time_box {
      margin: 1.74rem 0 0 4.4rem;
      font-size: 0.36rem;
      font-family: PingFang SC;
      font-weight: 600;
      color: #ffffff;
    }
  }
  .bom-box {
    width: 100vw;
    height: 4.18rem;
    background-image: url(/@/assets/smallTV-e/bg_whiet.png);
    background-repeat: no-repeat;
    background-size: contain;
    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
      font-size: 0.28rem;
      color: #b5351a;
      margin-top: 1rem;
    }
    img {
      width: 6.92rem;
      height: 1.09rem;
      margin-top: 1rem;
    }
  }
  .jd {
    width: 6.34rem;
    height: 2rem;
    margin: 0.3rem auto;
    background-image: url(/@/assets/smallTV-e/jd.png);
    background-repeat: no-repeat;
    background-size: contain;
    background-position-y: 0.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .jd_content {
      width: 33%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        width: 0.8rem;
        height: 0.8rem;
      }
      .tips {
        font-size: 0.24rem;
        color: #ffd4c0;
        margin-top: 0.1rem;
      }
    }
  }
</style>
