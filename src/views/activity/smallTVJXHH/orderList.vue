<template>
  <div class="container">
    <div class="list-container" v-if="listData.length">
      <div class="item" v-for="item in listData" :key="item.id">
        <img :src="JSON.parse(item.goodsJson).pictureUrl" alt="" />
        <div class="info">
          <span>{{ item.goodName }}</span>
          <span class="time">抽奖时间：{{ item.createTime }}</span>
          <p class="market-price"
            >市场价：<span style="color: #ff5050">¥{{ JSON.parse(item.goodsJson).marketPrice }}</span></p
          >
        </div>
        <div class="right">
          <span>x1</span>
          <div class="get-now" @click="getHandle(item)">立即领取</div>
        </div>
      </div>
    </div>
    <div v-else class="empty">暂无待领取奖品~</div>
  </div>
</template>

<script lang="ts" setup>
  import { getLuckDrawInfo } from '/@/api/theatre';
  import { useTVStore } from '/@/store/modules/smallTV';
  import { businessDomain } from '/~/config/constant';
  const tvStore = useTVStore();
  const router = useRouter();
  const listData = ref<any[]>([]);
  const getList = async () => {
    const res = await getLuckDrawInfo({ openId: tvStore.openId, type: 'jxhh' }, businessDomain['jxhh'][import.meta.env.MODE]);
    listData.value = res.data.value.content;
  };
  watch(
    () => tvStore.openId,
    (val) => {
      console.log(Boolean(val));
      if (val) {
        getList();
      }
    },
    { immediate: true },
  );
  const getHandle = (item: any) => {
    tvStore.setPrizeGoods({ ...JSON.parse(item.goodsJson), orderId: item.orderId });
    item.address && tvStore.setUser(item.address);
    router.push('/activity/smallTVJXHH/submitInfo?origin=orderList');
  };
</script>

<style lang="scss" scoped>
  .container {
    // background-color: #F4F4F4;
    background: linear-gradient(180deg, #7729c4 0%, #110419 100%);
    width: 100vw;
    min-height: 100vh;
    padding: 0.19rem 0;
    box-sizing: border-box;
    .empty {
      text-align: center;
      margin-top: 2rem;
      font-size: 0.28rem;
      color: #fff;
    }
    .list-container {
      .item {
        background-color: #5a1f93;
        width: 100%;
        height: 2.69rem;
        margin-top: 0.19rem;
        padding: 0.58rem 0.31rem;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #fff;
        font-size: 0.27rem;
        position: relative;
        &:nth-child(1) {
          margin-top: 0;
        }
        & > img {
          width: 1.54rem;
          height: 1.54rem;
          margin-right: 0.19rem;
        }
        .info {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
          .time {
            color: #aca9a9;
            font-size: 0.2rem;
          }
          .market-price {
            font-weight: bold;
          }
        }
        .right {
          margin-left: auto;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-end;
          .get-now {
            padding: 0.15rem 0.38rem;
            color: #ffffff;
            border-radius: 0.5rem;
            background-color: #ec6464;
            position: absolute;
            right: 0.31rem;
            bottom: 0.4rem;
          }
        }
      }
    }
  }
</style>
