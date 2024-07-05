<template>
  <div class="container">
    <div class="product">
      <img :src="prizeGoods.pictureUrl" alt="" style="height: 1.54rem; margin-right: 0.38rem" />
      <div class="text">
        <div class="title">{{ prizeGoods.goodsMsg }}</div>
        <div class="price-sku">
          <span
            >市场价：<span style="color: #ff5050; font-size: 0.35rem">¥{{ prizeGoods.marketPrice }}</span></span
          >
          <span>x1</span>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="title">配送货品类型：贵重物品</div>
      <div class="content">
        <p class="need">需支付</p>
        <p class="money">¥{{ Number(prizeGoods.payPrice).toFixed(2) }}</p>
        <div class="tip">此费用为快递服务商费用</div>
        <div class="btn" @click="payHandle">支付快递费</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import router from '/@/router';
  import { useConfigStore } from '/@/store/modules/platform';
  import { useTVStore } from '/@/store/modules/smallTV';
  import { PayCenter } from '/@/utils/pay';
  import { appid } from './config';

  const tvStore = useTVStore();
  const configStore = useConfigStore();
  const info = computed(() => {
    return configStore.info;
  });
  let state = reactive({
    prizeGoods: tvStore.prizeGoods,
  });

  const successCB = () => {
    router.push('/activity/smallTVGGN/payEmsSuccess');
  };

  const payHandle = () => {
    new PayCenter(info.value.applyIdentification).pay({
      ...tvStore.user,
      id: tvStore.prizeGoods.id,
      randomMoney: state.prizeGoods.payPrice,
      touFangType: 'xjc',
      appId: appid,
      successCB: successCB,
    });
  };

  const { prizeGoods } = toRefs(state);
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
    .product {
      display: flex;
      flex-direction: row;
      color: #fff;
      font-size: 0.29rem;
      width: 6.5rem;
      margin-top: 0.77rem;
      .text {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1;
        .price-sku {
          display: flex;
          justify-content: space-between;
        }
      }
    }
    .card {
      background-color: #5a1f93;
      margin-top: 0.77rem;
      width: 6.6rem;
      height: 6.12rem;
      border-radius: 0.15rem;
      .title {
        height: 0.87rem;
        line-height: 0.87rem;
        padding-left: 0.38rem;
        color: #dbb7ff;
        font-size: 0.27rem;
        background-color: #7130b1;
        border-top-left-radius: 0.15rem;
        border-top-right-radius: 0.15rem;
      }
      .content {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        .need {
          font-size: 0.31rem;
          line-height: 1.12rem;
          color: #dbb7ff;
        }
        .money {
          color: #ff5050;
          font-size: 0.69rem;
          line-height: 1.12rem;
        }
        .tip {
          padding: 0.12rem 0.25rem;
          border-radius: 0.23rem;
          font-size: 0.23rem;
          color: rgba(219, 183, 255, 0.4);
          background-color: rgba(219, 183, 255, 0.1);
          text-align: center;
          margin-top: 0.15rfem;
        }
        .btn {
          margin-top: 0.35rem;
          background-image: url(/@/assets/activity/smallTV/btn_tj.png);
          width: 100%;
          height: 2.08rem;
          line-height: 1.78rem;
          text-align: center;
          background-size: 100% auto;
          font-size: 0.38rem;
          color: #fff;
        }
      }
    }
  }
</style>
