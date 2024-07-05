<template>
  <div class="container">
    <div class="logo_box">
      <img src="https://nginx-beta.oss-cn-chengdu.aliyuncs.com/app/jxyz/static/images/logo.png" alt="" />
      <span>鲸喜宇宙</span>
    </div>
    <div class="text">正在前往领奖页面,请勿划走>>></div>
    <div class="text2" @click="jumpTo">如未跳转,可点击此处</div>
  </div>
</template>

<script setup lang="ts">
  setTimeout(() => {
    window.open('https://work.weixin.qq.com/kfid/kfc94f0f7348c438d2b');
  }, 50);
  const jumpTo = () => {
    window.open('https://work.weixin.qq.com/kfid/kfc94f0f7348c438d2b');
  };
</script>
<style lang="scss" scoped>
  .container {
    width: 100vw;
    height: 100vh;
    .logo_box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 1.7rem 0 2.5rem;
      img {
        width: 3rem;
        height: 3rem;
        border-radius: 7px;
      }
      span {
        margin-top: 0.3rem;
        font-size: 0.3rem;
        font-weight: bold;
      }
    }
    .text {
      text-align: center;
      color: #666;
      font-size: 0.28rem;
    }
    .text2 {
      text-align: center;
      color: #666;
      margin-top: 0.3rem;
      text-decoration: underline;
    }
  }
</style>
