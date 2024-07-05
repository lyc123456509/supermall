<template>
  <div class="container">
    <img src="@/assets/activity/smallTV/paySuccess.png" alt="" class="success-img" />
    <p class="success-text">物流费支付成功!</p>
    <div class="tip">- 可在公众号【鲸喜盒盒】查询物流单号</div>
    <!-- <div class="btn" @click="goWx">立即关注</div> -->
  </div>
</template>

<script lang="ts" setup>
  // import { getxjcOrder } from '/@/api/theatre';
  // import useTTJC from '/@/hooks/useTTJC';
  // import { useConfigStore } from '/@/store/modules/platform';
  // import { businessDomain } from '/~/config/constant';
  // const configStore = useConfigStore();
  // const info = computed(() => {
  //   return configStore.info;
  // });

  // const goWx = async () => {
  //   // const res = await getxjcOrder(
  //   //   { openId: sessionStorage.getItem('openId') },
  //   //   businessDomain[info.value.applyIdentification][import.meta.env.MODE],
  //   // );
  //   // useTTJC(res.data.value.content || '');
  //   window.location.href = 'https://s.eastday.com/?vid=2832&source=ad&dramaNum=1#/';
  // };
</script>

<style lang="scss" scoped>
  .container {
    background-size: 100% auto;
    width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    background: linear-gradient(180deg, #7729c4 0%, #110419 100%);
    position: relative;
    .success-img {
      margin-top: 0.92rem;
      width: 1.65rem;
    }
    .success-text {
      margin-top: 0.5rem;
      color: #dbb7ff;
      font-size: 0.48rem;
    }
    .tip {
      padding: 0.12rem 0.25rem;
      border-radius: 0.23rem;
      font-size: 0.23rem;
      color: #dbb7ff;
      background-color: rgba(219, 183, 255, 0.1);
      text-align: center;
      margin-top: 1.15rem;
    }
    .btn {
      margin-top: -0.15rem;
      background-image: url(/@/assets/activity/smallTV/btn_tj.png);
      width: 100%;
      height: 2.08rem;
      line-height: 2.08rem;
      text-align: center;
      background-size: 100% auto;
      font-size: 0.38rem;
      color: #fff;
    }
    .bottom {
      margin-top: 1.15rem;
      margin-bottom: 2.29rem;
      width: 6.6rem;
      height: 1.56rem;
      padding: 0.21rem 0.19rem;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #3a135d;
      border-radius: 0.92rem;
      .logo {
        width: 1.15rem;
        height: 1.15rem;
        border-radius: 100%;
        background-color: #fff;
        margin-right: 0.19rem;
      }
      span {
        color: #a56ddc;
        font-size: 0.27rem;
      }
      div {
        margin-left: auto;
        background-color: #5a1f93;
        border-radius: 0.38rem;
        width: 1.71rem;
        height: 0.65rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.29rem;
        color: #a56ddc;
        img {
          width: 0.15rem;
          margin-left: 0.1rem;
        }
      }
    }
  }
</style>
