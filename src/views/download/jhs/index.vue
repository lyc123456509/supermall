<template>
  <maskMod />
  <div class="content">
    <img class="logo" src="https://on-the-cloud-html.oss-cn-chengdu.aliyuncs.com/JHS/download/image/logo_jhs.png" />

    <div class="btn_mod">
      <img
        src="https://on-the-cloud-html.oss-cn-chengdu.aliyuncs.com/JHS/download/image/button_jsh_az.png"
        class="btn btn_az"
        alt=""
        @click="downloadAndUrl"
      />
      <img src="https://on-the-cloud-html.oss-cn-chengdu.aliyuncs.com/JHS/download/image/button_jsh_pg.png" class="btn btn_pg" alt="" />
    </div>
  </div>
  <!-- 广告位 -->
</template>

<script setup lang="ts">
  import maskMod from '/@/components/maskMod/index.vue';
  const downloadAndUrl = () => {
    location.href = 'https://shop-svc-pro.obs.cn-southwest-2.myhuaweicloud.com/version/app-offcial-release-v1.2.6.apk';
  };
</script>

<style lang="scss" scoped>
  * {
    margin: 0;
    padding: 0;
  }

  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 15.84rem;
    background-image: url(https://nginx-beta.oss-cn-chengdu.aliyuncs.com/h5/JHS/download/image/background-noneCoupon.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: 40% 0;
  }

  .logo {
    width: 1.8rem;
    height: 1.8rem;
    position: absolute;
    top: 10.3rem;
    left: 37%;
  }

  .btn_mod {
    position: absolute;
    top: 11.3rem;
    width: 100%;
    height: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .btn_mod .btn_az {
    width: 80%;
  }

  .btn_mod .btn_pg {
    width: 55%;
  }
  .download {
    position: absolute;
    width: 200px;
    height: 170px;
    /* top: calc(100vh - 32%); */
    top: 11.09rem;
  }

  .kefu {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 35%;
    right: 3%;
  }

  .kefu img {
    width: 30px;
    height: 30px;
  }

  .kefu span {
    font-size: 12px;
    color: #0fd2ce;
  }
</style>
