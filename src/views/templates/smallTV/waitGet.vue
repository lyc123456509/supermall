<template>
  <div class="container">
    <img src="@/assets/smallTV/img_bt01.png" alt="" class="wait" />
    <div class="phone-container">
      <img src="@/assets/smallTV/img_bq.png" alt="" class="gx" />
    </div>
    <div class="count-container">抽取时间{{ time.minute }}:{{ time.second }}</div>
    <div class="bottom-container">
      <div class="unlock-price">剧情解锁价：<span class="price">¥9.90</span></div>
      <div class="after-unlock">
        <p>- 解锁后您将获得 -</p>
        <p>990看剧积分+<span style="color: #fe560d">免费抽 iPhone 14 Pro</span> 机会</p>
      </div>
      <div class="nowGet" @click="submitHandle">确认抽取</div>
      <div class="pay">默认支付方式：<img src="@/assets/smallTV/icon_wx.png" alt="" />微信支付</div>
    </div>
    <SideBar
      style="top: 1.4rem"
      :itemStyle="{
        color: '#FAE52E',
        background: 'rgba(249, 228, 47, 0.1)',
        border: '0px',
        padding: '0.19rem 0.22rem',
        fontSize: '0.28rem',
      }"
    />
    <CompanyInfo style="color: #772ac4; margin-top: 0.54rem" />
    <img :src="info.landingPageResponse.logoUrl" class="logo" alt="" />
  </div>
</template>

<script lang="ts" setup>
  import useCountDown from '/@/hooks/useCountDown';
  import { useConfigStore } from '/@/store/modules/platform';
  import { PayCenter } from '/@/utils/pay';
  const time = useCountDown(10);
  const configStore = useConfigStore();
  const info = computed(() => {
    return configStore.info;
  });

  const submitHandle = () => {
    new PayCenter(info.value.applyIdentification).pay({
      randomMoney: 9.9,
      touFangType: 'xjc',
      phone: (+new Date()).toString().slice(2),
    });
  };
</script>

<style lang="scss" scoped>
  .container {
    background-image: url('/@/assets/smallTV/bg.png');
    background-size: 100% auto;
    background-repeat: no-repeat;
    width: 100vw;
    min-height: 100vh;
    background-color: #000;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    .logo {
      position: absolute;
      top: 0.09rem;
      left: 0.34rem;
      width: 0.95rem;
    }
    .wait {
      width: 7.21rem;
      margin-top: 0.41rem;
    }
    .phone-container {
      background-image: url('/@/assets/smallTV/img_sj.png');
      width: 4.14rem;
      height: 5.38rem;
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
      position: relative;
      margin-top: -0.2rem;
      .gx {
        width: 1.77rem;
        position: absolute;
        top: 3rem;
        left: 2.7rem;
      }
    }
    .count-container {
      width: 4.02rem;
      height: 0.72rem;
      background-image: url('/@/assets/smallTV/mg_lqsj.png');
      background-repeat: no-repeat;
      background-size: contain;
      text-align: center;
      font-size: 0.31rem;
      color: #fff;
      font-weight: 600;
      padding-top: 0.18rem;
    }
    .bottom-container {
      background-image: url('/@/assets/smallTV/img_nr_bg.png');
      background-repeat: no-repeat;
      background-size: contain;
      width: 6.54rem;
      height: 5.35rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      .unlock-price {
        color: #fbe62e;
        font-size: 0.31rem;
        margin-bottom: 0.38rem;
        margin-top: 0.76rem;
        .price {
          font-size: 0.48rem;
        }
      }
      .after-unlock {
        background-image: url('/@/assets/smallTV/img_jsh_bg.png');
        background-repeat: no-repeat;
        background-size: contain;
        width: 5.8rem;
        height: 1.13rem;
        padding: 0.16rem 0.27rem 0.25rem 0.37rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        font-size: 0.27rem;
        color: #fff;
        box-sizing: border-box;
      }
      .nowGet {
        margin-top: 0.12rem;
        background-image: url('/@/assets/smallTV/btn_qrlq.png');
        background-repeat: no-repeat;
        background-size: contain;
        width: 5.87rem;
        height: 1.59rem;
        line-height: 1.59rem;
        text-align: center;
        color: #fbe62e;
        font-weight: 600;
        font-size: 0.41rem;
      }
      .pay {
        display: flex;
        align-items: center;
        color: #772ac4;
        font-size: 0.19rem;
        img {
          width: 0.35rem;
          margin-right: 0.11rem;
        }
      }
    }
  }
</style>
