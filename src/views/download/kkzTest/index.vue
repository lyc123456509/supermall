<template>
  <maskMod />
  <div class="container">
    <div class="rule">
      <div class="customer sidebar_hint" id="customer" @click="jumpToCustom">联系客服</div>
    </div>
    <img src="https://nginx-beta.oss-cn-chengdu.aliyuncs.com/h5/KKZ/download/img/bg_top.png" alt="" class="bg_img bg_top" />
    <img src="https://nginx-beta.oss-cn-chengdu.aliyuncs.com/h5/KKZ/download/img/bg_center.png" alt="" class="bg_img bg_center" />
    <div class="container_bottom">
      <!-- <img src="" alt="" class="bg_img bg_bottom" /> -->
      <div class="box">
        <img src="https://nginx-beta.oss-cn-chengdu.aliyuncs.com/h5/KKZ/download/img/kkz_logo.png" alt="" class="logo" />
        <div class="title_box">
          <h6>可可赚</h6>
          <span>下载APP登录即可使用</span>
        </div>
        <div class="downloadBtn" @click="clickFn">立即{{ isIOSFlag ? '前往' : '下载' }}</div>
      </div>
      <div class="websiteInfo">
        <div class="info_left">
          <span>App名称:</span>
          <span>版本信息:</span>
          <span>权限信息:</span>
          <span>开发者信息:</span>
          <span @click="jumpToUrl(agreement)" class="agreement">《用户协议》</span>
        </div>
        <div class="info_right">
          <span>可可赚</span>
          <span>{{ appVersion }}</span>
          <span>无</span>
          <span>成都异芯网络科技有限公司</span>
          <span @click="jumpToUrl(privacy)" class="agreement">《隐私政策》</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import maskMod from '/@/components/maskMod/index.vue';
  import { isIOS } from '/@/utils/common';
  import { getAndroidUrl, selectTreaty } from '/@/api/download';
  const isIOSFlag = ref(false);
  let clickFn = ref();
  const websiteInfo = ref();
  let appDownloadLink = ref();
  let appVersion = ref();
  let agreement = ref();
  let privacy = ref();

  onBeforeMount(async () => {
    let res = await selectTreaty();
    websiteInfo.value = res.data.value;
    console.log(res.data.value.content);
    res.data.value.content.forEach((item) => {
      if (item.appendInformation == '用户协议') {
        agreement.value = item.dexFileUrl;
      } else if (item.appendInformation == '隐私政策') {
        privacy.value = item.dexFileUrl;
      }
    });

    let res2 = await getAndroidUrl();
    const { fileUrl, versionName } = res2.data.value.content;
    appDownloadLink.value = fileUrl;
    appVersion.value = versionName;
  });

  const jumpToUrl = (url: string): void => {
    location.href = url;
  };

  const jumpToKKZWrap = (): void => {
    location.href = 'http://kkz-wap.hiparty.fun';
  };

  const jumpToAnd = () => {
    window.open(appDownloadLink.value);
  };

  if (isIOS() === 'ios') {
    isIOSFlag.value = true;
    clickFn.value = jumpToKKZWrap;
  } else {
    isIOSFlag.value = false;
    clickFn.value = jumpToAnd;
  }

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

  .agreement {
    text-decoration: underline;
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
    position: relative;
    width: 7.5rem;
    // height: 14.48rem;
    // height: 100vh;
    overflow: hidden;
    position: relative;
  }
  .bg_img {
    width: 100%;
  }
  .bg_top {
    height: 43vh;
  }
  .bg_center {
    height: 42vh;
    transform: translateY(-3%);
  }
  .bg_bottom {
    height: 30vh;
  }
  .container_bottom {
    background: url(https://nginx-beta.oss-cn-chengdu.aliyuncs.com/h5/KKZ/download/img/bg_bottom.png) no-repeat;
    background-size: 100% 100%;
    width: 100%;
    height: 28vh;
    transform: translateY(-6%);
    padding: 0.5rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  .websiteInfo {
    color: rgb(145, 128, 128);
    width: 65%;
    display: flex;
    justify-content: space-between;
  }

  .info_left {
    display: flex;
    flex-direction: column;
    line-height: 2;
  }

  .info_right {
    line-height: 2;
    display: flex;
    flex-direction: column;
  }

  .info_item {
    width: 100%;
    display: flex;
    justify-content: space-between;
    line-height: 2;
  }

  .infoVal {
    margin-left: 0.5rem;
  }

  .box {
    width: 7rem;
    height: 1.8rem;
    text-align: center;
    background: #ffffff;
    border-radius: 16px;
    display: flex;
    padding: 0.3rem;
    box-sizing: border-box;
  }

  .logo {
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 18px;
    -webkit-border-radius: 18px;
    -moz-border-radius: 18px;
    -ms-border-radius: 18px;
    -o-border-radius: 18px;
  }

  .title_box {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    text-align: left;
    margin-left: 0.5rem;
  }

  .title_box h6 {
    font-size: 0.3rem;
  }

  .title_box span {
    font-size: 0.2rem;
    color: #3c3c3c;
  }

  .downloadBtn {
    padding: 0.1rem 0.3rem;
    font-size: 0.2rem;
    margin-left: 0.55rem;
    align-self: center;
    background: linear-gradient(90deg, #484848 0%, #212120 100%);
    border-radius: 17px;
    color: #ffffff;
  }

  .rule {
    position: fixed;
    right: 0;
    top: 3.8rem;
    height: 3.26rem;
    /* width: 0.62rem; */
    /* border-radius: 0.58; */
    font-size: 0.24rem;
    color: #ffffff;
    z-index: 2;
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
