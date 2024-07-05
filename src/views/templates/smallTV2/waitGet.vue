<template>
  <div class="container">
    <img src="@/assets/smallTV2/waitGet.png" alt="" class="wait" />
    <div class="guess" v-if="guess === '1'"><img src="@/assets/smallTV2/true.png" alt="" />恭喜猜中剧情</div>
    <div class="guess" v-else-if="guess === '-1'"><img src="@/assets/smallTV2/false.png" alt="" />很可惜猜错了，继续解锁剧情</div>
    <img src="@/assets/smallTV2/csj.png" alt="" class="csj" />
    <div class="bottom-container">
      <div class="unlock-price">剧情解锁价：<span class="price">¥9.90</span></div>
      <div class="after-unlock">
        <p>您将获得：解锁7集剧情+<span style="color: #fc482a">免费抽iPhone14Pro</span> 机会</p>
      </div>
      <img src="@/assets/smallTV2/btn_lq.png" class="nowGet" alt="" @click="submitHandle" />
      <div class="pay"> <img src="@/assets/smallTV2/aqzf.png" alt="" />微信安全支付<img src="@/assets/smallTV2/checked.png" alt="" /> </div>
    </div>
    <SideBar
      style="top: 2.75rem"
      :itemStyle="{
        color: '#845e07',
        background: '#e9d6ad',
        border: '0px',
        padding: '0.06rem 0.12rem',
        fontSize: '0.24rem',
        boxShadow: '1px 1px 4px 1px #958888',
        marginTop: '0.2rem',
      }"
    />
    <CompanyInfo style="color: #a69064; margin-top: 1.14rem" />
    <img :src="info.landingPageResponse.logoUrl" class="logo" alt="" />
  </div>
</template>

<script lang="ts" setup>
  import router from '/@/router';
  import useCheckOrder from '/@/hooks/useCheckOrder';
  import Url from 'domurl';
  import { useConfigStore } from '/@/store/modules/platform';
  // import { PayCenter } from '/@/utils/pay';
  const configStore = useConfigStore();
  const info = computed(() => {
    return configStore.info;
  });
  const emitFun = defineEmits(['nextStep']);
  const guess = ref(router.currentRoute.value.query.guess || '0');
  // const submitHandle = () => {
  //   new PayCenter(info.value.applyIdentification).pay({
  //     randomMoney: 9.9,
  //     touFangType: 'xjc',
  //     phone: (+new Date()).toString().slice(2),
  //   });
  // };
  console.log('redirect_url from config');

  const successCB = () => {
    if (info.value.secondaryPayScaleType === 1 && info.value.secondaryPayType === 1) {
      const href = new Url(sessionStorage.getItem('returnUrl'));
      sessionStorage.setItem('step', 'waitGetSecond');
      href.query.step = 'waitGetSecond';
      (href.query.orderId = ''), (window.location.href = href);
    } else {
      emitFun('nextStep', 'unlockSuccess');
      sessionStorage.setItem('step', 'unlockSuccess');
    }
  };

  useCheckOrder(successCB);
  const submitHandle = () => {
    const url = new Url(
      `http://${JSON.parse(info.value.domainValue).url}/blankAutoPay/${info.value.id}&${info.value.landingPageId}${window.location.search}`,
    );
    url.query.phone = (+new Date()).toString().slice(2);
    url.query.randomMoney = 9.9;
    url.query.originUrl = encodeURIComponent(
      `http://${JSON.parse(info.value.domainValue).url}${window.location.pathname}${window.location.search}`,
    );
    window.location.href = decodeURIComponent(url);
  };
</script>

<style lang="scss" scoped>
  .container {
    background-image: url('/@/assets/smallTV2/bg.png');
    background-size: 100% auto;
    background-repeat: no-repeat;
    background-color: #e0c38f;
    width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    color: #5b5c5e;
    font-size: 0.27rem;
    .guess {
      position: absolute;
      top: 2.47rem;
      color: #c82f25;
      font-size: 0.39rem;
      img {
        width: 0.51rem;
        margin-right: 0.18rem;
        vertical-align: top;
      }
    }
    .csj {
      position: absolute;
      width: 1.62rem;
      top: 5.93rem;
      right: 1.02rem;
    }
    .logo {
      position: absolute;
      top: 0.09rem;
      left: 0.34rem;
      width: 0.95rem;
    }
    .wait {
      width: 6.27rem;
      margin-top: 1.18rem;
    }
    .bottom-container {
      margin-top: 6.45rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      .unlock-price {
        font-size: 0.27rem;
        margin-bottom: 0.25rem;
        .price {
          color: #c5793b;
        }
      }
      .after-unlock {
        margin-bottom: 0.35rem;
      }
      .nowGet {
        width: 6.1rem;
        margin-bottom: 0.36rem;
      }
      .pay {
        display: flex;
        align-items: center;
        width: 6.1rem;
        img {
          &:nth-child(1) {
            width: 0.4rem;
            margin-right: 0.15rem;
          }
          &:nth-child(2) {
            width: 0.36rem;
            margin-left: auto;
          }
        }
      }
    }
  }
</style>
