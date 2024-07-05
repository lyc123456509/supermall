<template>
  <maskMod />
  <div class="container">
    <div class="content">
      <img src="https://nginx-beta.oss-cn-chengdu.aliyuncs.com/h5/SQJL/download/img/img-1.png" alt="" />
      <img src="https://nginx-beta.oss-cn-chengdu.aliyuncs.com/h5/SQJL/download/img/img-2.png" alt="" />
      <img src="https://nginx-beta.oss-cn-chengdu.aliyuncs.com/h5/SQJL/download/img/img-3.png" alt="" />
      <img src="https://nginx-beta.oss-cn-chengdu.aliyuncs.com/h5/SQJL/download/img/img-4.png" alt="" />
      <img src="https://nginx-beta.oss-cn-chengdu.aliyuncs.com/h5/SQJL/download/img/logo.png" class="logo" alt="" />
      <!-- 下载按钮 -->
      <div class="download_Android" @click="jump">
        <img src="https://nginx-beta.oss-cn-chengdu.aliyuncs.com/h5/SQJL/download/img/btn.png" alt="" />
      </div>
    </div>
    <div class="fill"></div>
    <!-- 广告位 -->
  </div>
</template>

<script setup lang="ts">
  import maskMod from '/@/components/maskMod/index.vue';
  import { isIOS } from '/@/utils/common';
  import { getSQJLAndroidUrl } from '/@/api/download';

  const jump = async () => {
    if (isIOS() === 'ios') {
      window.open('https://apps.apple.com/cn/app/%E5%A5%87%E7%8E%A9%E7%9B%92%E5%AD%90/id1598716709');
    } else {
      const data = { pageType: 1 };
      let res = await getSQJLAndroidUrl(data);
      console.log(res);

      let link = res.data.value.fileUrl;
      window.open(link);
    }
  };
</script>

<style lang="scss" scoped>
  * {
    margin: 0;
    padding: 0;
  }

  @font-face {
    font-family: 'DIN';
    src: url('https://y-qiwan.obs.cn-north-4.myhuaweicloud.com/qwhz-h5/fonts/DIN-Bold_0.otf');
  }

  input:focus {
    outline: none;
  }

  input::-webkit-input-placeholder {
    /* WebKit browsers */
    color: #c4c7d0;
    font-weight: 400;
  }

  input:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #c4c7d0;
    font-weight: 400;
  }

  input::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #c4c7d0;
    font-weight: 400;
  }

  input:-ms-input-placeholder {
    /* Internet Explorer 10+ */
    color: #c4c7d0;
    font-weight: 400;
  }

  html {
    font-size: 28px;
    font-family: '微软雅黑';
  }
  ._flex {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.36rem;
    font-weight: 600;
    color: #ffffff;
  }
  .container {
    width: 100vw;
    height: 100vh;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background-color: rgba(198, 20, 23, 1);
  }
  .box {
    width: 5.3rem;
    height: 3rem;
    margin: 11.2rem auto;
  }
  .relative {
    position: relative;
  }
  .download_ios {
    width: 4.51rem;
    height: 0.78rem;
    background: rgba(255, 255, 255, 0.3);
    margin: 0 auto;
    border-radius: 0.45rem;
    border: 0.02rem solid #ffffff;
  }
  .android {
    width: 0.54rem;
    height: 0.568rem;
    margin-right: 0.2rem;
  }
  .ios {
    width: 0.4rem;
    height: 0.5rem;
    margin-right: 0.2rem;
  }

  .content {
    display: flex;
    flex-direction: column;
    width: 100vw;
    position: relative;
  }
  .content img {
    width: 100vw;
    height: auto;
    /* margin: -0.5px 0; */
    padding: 0;
  }
  .download_Android {
    position: absolute;
    bottom: 2vh;
    z-index: 99;
    left: 50%;
    transform: translate(-50%, 0);
  }
  .download_Android img {
    width: 54.13vw;
    animation: scale 1s infinite alternate;
    height: 24.67vw;
  }
  .ad {
    width: 100vw;
    height: 15.94vh;
    position: absolute;
    bottom: 0;
    left: 0;
    background: #fff;
  }

  @keyframes scale {
    0% {
      transform: scale(0.9);
    }
    100% {
      transform: scale(1.1);
    }
  }
  .fill {
    width: 100vw;
    flex: 1;
    /* background-image: linear-gradient(rgba(201, 30, 29, 0.8), yellow); */
    background: rgba(198, 20, 23, 1);
  }
  .content .logo {
    position: absolute;
    width: 1.7rem;
    height: 1.7rem;
    border-radius: 50%;
    left: 50%;
    transform: translate(-50%, 0);
    top: calc(3.45rem + 0.91rem);
  }
</style>
