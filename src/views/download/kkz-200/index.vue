<template>
  <maskMod />
  <div class="container">
    <div class="rule">
      <div class="customer sidebar_hint" id="customer" @click="jumpToCustom">联系客服</div>
    </div>
    <div class="box">
      <div class="download_Android _flex" v-if="!isIOSFlag" @click="jumpToAnd">
        <div class="box_mod">
          <img src="https://nginx-beta.oss-cn-chengdu.aliyuncs.com/KKZ/download/img/andio.png" alt="" class="android" />
          <span>安卓下载</span>
        </div>
      </div>
      <div class="download_ios _flex" v-else @click="jumpToKKZWrap">
        <div class="box_mod">
          <img src="https://nginx-beta.oss-cn-chengdu.aliyuncs.com/h5/KKZ/download/img/ios.png" alt="" class="ios" />
          <span> 前往充值</span>
        </div>
      </div>
    </div>
  </div>
  <!-- 广告位 -->
</template>

<script lang="ts" setup>
  import maskMod from '/@/components/maskMod/index.vue';
  import { isIOS } from '/@/utils/common';
  import { getAndroidUrl } from '/@/api/download';
  const isIOSFlag = ref(false);
  if (isIOS() === 'ios') {
    isIOSFlag.value = true;
  } else {
    isIOSFlag.value = false;
  }

  const jumpToKKZWrap = (): void => {
    location.href = 'http://kkz-wap.hiparty.fun';
  };

  const jumpToAnd = async (): Promise<void> => {
    let res = await getAndroidUrl();
    let link = res.data.value.content.fileUrl;
    window.open(link);
  };

  const jumpToCustom = () => {
    window.location.href =
      'https://ykf-webchat.7moor.com/wapchat.html?accessId=3e89c540-ed47-11ec-a02e-eb8e52aced8a&fromUrl=http://1&urlTitle=%E5%8F%AF%E5%8F%AF%E8%B5%9A&language=ZHCN';
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
    width: 7.5rem;
    height: 14.48rem;
    background: url(https://nginx-beta.oss-cn-chengdu.aliyuncs.com/h5/KKZ/download/img/kkz-200-bg.png) no-repeat;
    background-size: 100% 100%;
    overflow: hidden;
    position: relative;
  }
  .box {
    width: 5.3rem;
    height: 3rem;
    margin: 10.3rem auto;
    text-align: center;
  }

  .box_mod {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  .download_Android {
    width: 4.28rem;
    height: 0.9rem;
    margin: 0.1rem auto 0.5rem auto;
    background: linear-gradient(180deg, #ffffff 0%, #ffc683 100%);
    border-radius: 0.45rem;
    color: #434343;
  }
  .download_ios {
    width: 4.51rem;
    height: 0.78rem;
    margin: 0 auto;
    color: #434343;
    border: 0.02rem solid #ffffff;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.79) 0%, rgba(255, 255, 255, 0.33) 100%);
    border-radius: 23px;
  }
  .android {
    width: 0.54rem;
    height: 0.568rem;
    margin-right: 0.2rem;
  }
  .ios {
    width: 0.7rem;
    height: 0.7rem;
    margin-right: 0.2rem;
  }

  .rule {
    position: absolute;
    right: 0;
    top: 3rem;
    height: 3.26rem;
    /* width: 0.62rem; */
    /* border-radius: 0.58; */
    font-size: 0.24rem;
    color: #ffffff;
  }

  .sidebar_hint {
    background: linear-gradient(to bottom, rgb(247, 239, 223), rgb(236, 197, 97));
    width: 1.4rem;
    color: #fe5903;
    border: 0.05rem solid #fff;
    border-right: 0;
    box-shadow: 0px 0px 32px 0px rgba(94, 94, 94, 0.26);
    border-radius: 0.35rem 0 0 0.35rem;
    -webkit-border-radius: 0.35rem 0 0 0.35rem;
    -moz-border-radius: 0.35rem 0 0 0.35rem;
    -ms-border-radius: 0.35rem 0 0 0.35rem;
    -o-border-radius: 0.35rem 0 0 0.35rem;
    line-height: 0.35rem;
    padding: 0.1rem 0.1rem;
    text-align: center;
  }
</style>
