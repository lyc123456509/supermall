<template>
  <div class="container">
    <img src="@/assets/passApproveDY/logo.jpg" alt="" class="logo" />
    <span class="title">九州小剧场</span>
    <div class="btn" @click="jumpWx">前往公众号</div>
  </div>
</template>

<script lang="ts" setup>
  const jumpWx = () => {
    window.location.href = 'https://wxfx.jxjzwh.cn/wechat.html?tfid=62fe450c1ad9236a16ae6e9a';
  };
</script>

<style lang="scss" scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 100vh;
    padding: 2rem 0 1rem 0;
    box-sizing: border-box;
  }
  .logo {
    width: 1.8rem;
  }
  .title {
    font-size: 0.3rem;
  }
  .btn {
    margin-top: auto;
    width: 4rem;
    height: 0.8rem;
    color: #fff;
    text-align: center;
    line-height: 0.8rem;
    background-color: #1aad19;
    border-radius: 0.1rem;
    font-size: 0.28rem;
  }
</style>
