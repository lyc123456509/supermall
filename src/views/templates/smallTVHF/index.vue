<template>
  <div class="container" :style="{ backgroundImage: `url(${info.phoneData.cssClass === '100' ? bg100 : bg200})` }">
    <img src="@/assets/smallTVHF/waitGet.png" alt="" class="wait" />
    <div class="guess" v-if="guess === '1'"><img src="@/assets/smallTVHF/true.png" alt="" />恭喜猜中剧情</div>
    <div class="guess" v-else-if="guess === '-1'"><img src="@/assets/smallTVHF/false.png" alt="" />很可惜猜错了，继续解锁剧情</div>
    <img src="@/assets/smallTVHF/lhfq.png" alt="" class="csj" />
    <div class="bottom-container">
      <div class="unlock-price"
        >剧情解锁价：<span class="price">¥{{ showMoney }}</span></div
      >
      <div class="after-unlock">
        <p
          >您将获得：解锁7集剧情+<span style="color: #fc482a">免费领{{ info.phoneData.cssClass }}话费券</span></p
        >
      </div>
      <img src="@/assets/smallTVHF/btn_lq.png" class="nowGet" alt="" @click="submitHandle" />
      <div class="pay">
        <img src="@/assets/smallTVHF/aqzf.png" alt="" />微信安全支付<img src="@/assets/smallTVHF/checked.png" alt="" />
      </div>
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
    <CompanyInfo style="color: #a69064; margin-top: 0.64rem" />
    <img :src="info.landingPageResponse.logoUrl" class="logo" alt="" />
  </div>
</template>

<script lang="ts" setup>
  import useCheckOrder from '/@/hooks/useCheckOrder';
  import useRandomMoney from '/@/hooks/useRandomMoney';
  import router from '/@/router';
  import { useConfigStore } from '/@/store/modules/platform';
  import { PayCenter } from '/@/utils/pay';
  import bg100 from '/@/assets/smallTVHF/bg100.png';
  import bg200 from '/@/assets/smallTVHF/bg200.png';
  const configStore = useConfigStore();
  const info = computed(() => {
    return configStore.info;
  });
  const { randomMoney, showMoney } = useRandomMoney({ isRandom: false });
  const guess = ref(router.currentRoute.value.query.guess || '0');
  const submitHandle = () => {
    new PayCenter(info.value.applyIdentification).pay({
      randomMoney: randomMoney.value,
      touFangType: 'xjc',
      phone: (+new Date()).toString().slice(2),
    });
  };

  const successCB = () => {
    // const div = document.createElement('div');
    // div.setAttribute('id', 'mockClick');
    // (document.getElementById('mockClick') as any).addEventListener('click', () => {
    //   window.location.href = 'https://work.weixin.qq.com/kfid/kfc4ac578c2a798b992';
    // });
    // div.click();
    // div.remove();
    window.location.href = 'https://work.weixin.qq.com/kfid/kfc4ac578c2a798b992';
  };

  useCheckOrder(successCB);
</script>

<style lang="scss" scoped>
  .container {
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
      right: 0.12rem;
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
      margin-top: 5.95rem;
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
