<template>
  <div class="mask" v-show="showBasic" @click="maskBtn"></div>
  <div class="showBox" v-show="showBasic">
    <div class="goto">
      <img src="https://on-the-cloud-html.oss-cn-chengdu.aliyuncs.com/ZDH/download/img/goto.png" alt="" />
    </div>
    <div class="hint"> 如遇无法打开请点击右上角选择浏览器打开 </div>
  </div>
</template>

<script lang="ts" setup>
  import { isWx } from '/@/utils/index';
  const showBasic = ref(true);

  //判断是否为微信内部登录
  showBasic.value = isWx();

  const maskBtn = () => {
    showBasic.value = false;
  };
</script>

<style lang="scss" scoped>
  .mask {
    width: 100vw;
    height: 100vh;
    transition: all 2s;
    background: rgb(0, 0, 0);
    opacity: 0.5;
    z-index: 100;
    position: absolute;
    color: #fff;
  }

  .showBox {
    position: absolute;
    z-index: 101;
    width: 100vw;
    .goto {
      display: flex;
      justify-content: flex-end;
      img {
        width: 1rem;
        height: 1rem;
        transform: rotate(45deg);
        margin-right: 0.1rem;
      }
    }

    .hint {
      display: flex;
      justify-content: center;
      background: #fff;
      opacity: 1;
      color: red;
      font-weight: bold;
      width: 70%;
      margin: 0 auto;
      padding: 0.2rem;
      border-radius: 8px;
    }
  }
</style>
