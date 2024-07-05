<template>
  <div class="container">
    <img src="@/assets/activity/smallTVHF/exchangeSuccess.png" alt="" class="exchangeSuccess" />
    <p class="gx">恭喜！额外获赠200元话费券！</p>
    <div class="bottom-container">
      <div class="left">
        <img src="@/assets/activity/smallTVHF/hf.png" alt="" />
        <span>价值200元话费券</span>
      </div>
      <div class="right">
        <div class="btn" @click="goDownloadApp">前往充值</div>
        <span>后续充值请下载APP</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import router from '/@/router';

  const goDownloadApp = () => {
    router.push('/download/kkz-200');
  };
</script>

<style lang="scss" scoped>
  .container {
    background-image: url('/@/assets/activity/smallTVHF/bg2.png');
    background-size: 100% auto;
    background-repeat: no-repeat;
    background-color: #e0c38f;
    width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    color: #cd3d2b;
    font-size: 0.27rem;
    .exchangeSuccess {
      width: 6.27rem;
      margin-top: 1.18rem;
    }
    .gx {
      margin-top: 1.03rem;
      font-size: 0.37rem;
    }
    .bottom-container {
      margin-top: 1.18rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      box-sizing: border-box;
      padding: 0 0.83rem 0 0.97rem;
      & > div {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .left {
        img {
          width: 2.18rem;
        }
      }
      .right {
        .btn {
          padding: 0.17rem 0.5rem;
          font-size: 0.35rem;
          color: #fff;
          background-color: #cc3a2a;
          border-radius: 0.4rem;
          margin-bottom: 0.13rem;
        }
        span {
          font-size: 0.23rem;
        }
      }
    }
  }
</style>
