<template>
  <maskMod />
  <div class="container">
    <div class="content">
      <img src="https://html.sccdyzl.com/vue-cps/download/zdh/img-5.png" alt="" />
      <img src="https://html.sccdyzl.com/vue-cps/download/zdh/img-2.png" alt="" />
      <img src="https://html.sccdyzl.com/vue-cps/download/zdh/img-3.png" alt="" />
      <div class="footer">
        <!-- <img src="https://html.sccdyzl.com/vue-cps/download/zdh/img-4.png" alt="" /> -->
        <!-- 下载按钮 -->
        <div class="download_Android" @click="jump">
          <img src="https://html.sccdyzl.com/vue-cps/download/zdh/btn.png" alt="" />
        </div>
        <div class="info_box">
          <div class="item">
            <span>APP名称:</span>
            <span>{{ appName }}</span>
          </div>
          <div class="item">
            <span>开发者信息:</span>
            <span>成都异芯网络科技有限公司</span>
          </div>
          <div class="item">
            <span>版本信息:</span>
            <span>{{ version }}</span>
          </div>
          <div class="item">
            <span>权限列表及用途说明:</span>
            <span @click="JumpToJurisdiction">《权限列表查看》</span>
          </div>
          <div class="item">
            <span>用户隐私协议:</span>
            <span><a class="policy" @click="jumpToPolicy">《用户隐私协议》</a></span>
          </div>
        </div>
      </div>
    </div>
    <!-- 广告位 -->
  </div>
</template>

<script setup lang="ts">
  import maskMod from '/@/components/maskMod/index.vue';
  import { isIOS } from '/@/utils/common';
  import { getZDHAndroidUrl } from '/@/api/download';

  const state = reactive({
    fileUrl: '',
    appName: '',
    version: '',
  });

  onMounted(async () => {
    const data = { pageType: 1 };
    const res = await getZDHAndroidUrl(data);
    const { fileUrl, versionTitle, versionName } = res.data.value;
    state.fileUrl = fileUrl;
    state.appName = versionTitle;
    state.version = versionName;
  });

  const jumpToPolicy: any = () => {
    window.location.href = 'http://h5.hiparty.fun/ZDH/agreement.html';
  };

  const JumpToJurisdiction = () => {
    window.open('https://wechat.sccdyzl.com/ZDH/jurisdiction.html');
  };

  const jump = async () => {
    if (isIOS() === 'ios') {
      window.open('https://apps.apple.com/cn/app/%E5%A5%87%E7%8E%A9%E7%9B%92%E5%AD%90/id1598716709');
    } else {
      let link = state.fileUrl;
      window.open(link);
    }
  };

  const { appName, version } = toRefs(state);
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
    overflow: hidden;
    position: relative;
  }
  .box {
    width: 5.3rem;
    height: 3rem;
    margin: 11.2rem auto;
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
  }
  .content img {
    width: 100vw;
    /* height: 25vh; */
    height: auto;
    margin: -0.5px 0;
    padding: 0;
  }
  .download_Android {
    // top: 13.1rem;
    z-index: 99;
    height: 24.67vw;
    width: 54.13vw;
    position: relative;
    transform: translateY(-20%);
  }
  .download_Android img {
    position: absolute;
    top: 0;
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

  .footer {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    // padding-top: 0.7rem;
    flex-direction: column;
    color: #999;
    line-height: 0.3rem;
    background-image: url(https://html.sccdyzl.com/vue-cps/download/zdh/img-4.png);
    background-repeat: no-repeat;
    background-size: contain;
    .info_box {
      transform: translateY(-20%);
      width: 100vw;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .item {
      width: 60%;
      display: flex;
      justify-content: space-between;
      margin-top: 0.05rem;
    }
  }
</style>
