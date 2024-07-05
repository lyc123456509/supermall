<template>
  <div class="container">
    <img src="@/assets/smallTV2/unlock.png" alt="" class="wait" />
    <div class="follow">关注公众号【剧场中转站】参与抽奖</div>
    <img src="@/assets/smallTV2/btn_gz.png" class="nowGet" alt="" @click="goWx" />
    <div class="steps">
      <div class="step1"><img src="@/assets/smallTV2/step1.png" alt="" />关注公众号</div>
      <div class="step2"><img src="@/assets/smallTV2/step2.png" alt="" />参与抽奖活动</div>
      <div class="step3"><img src="@/assets/smallTV2/step3.png" alt="" />最高抽手机</div>
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
    <CompanyInfo style="color: #a69064; margin-top: 0.7rem" />
    <img :src="info.landingPageResponse.logoUrl" class="logo" alt="" />
    <!-- <customPopAd
      :imgurl="adImg"
      adUrl="https://m.cat-happy.cn/dist/welfareAT02/private/T/T029/index.html?appkey=9e8a7ecd2bc145cca7a17ca6c0bac206&business=money-96&uid=4C0C9A14606E5ED259018D303084746D&spm=20221222093653352000019412446506&gettime=1671673013421&activityid=20043&fmmodel_id=actNotColdStart,actSendTicketCount1,actCvr1#"
    /> -->
  </div>
</template>

<script lang="ts" setup>
  import { useConfigStore } from '/@/store/modules/platform';
  // import adImg from '/@/assets/adResources/ad2.gif';
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
    background-image: url('/@/assets/smallTV2/bg.png');
    background-size: 100% auto;
    background-repeat: no-repeat;
    width: 100vw;
    min-height: 100vh;
    background-color: #e0c38f;
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
      width: 6.27rem;
      margin-top: 1.18rem;
    }
    .follow {
      margin-top: 6.44rem;
    }
    .nowGet {
      width: 6.1rem;
      margin-top: 0.3rem;
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
</style>
