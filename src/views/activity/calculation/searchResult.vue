<template>
  <main>
    <div class="list_title">· 历史测算结果 ·</div>
    <div class="content">
      <img src="/src/assets/wedlock/search_icon.png" alt="" class="tl" />
      <img src="/src/assets/wedlock/search_icon.png" alt="" class="tr" />
      <img src="/src/assets/wedlock/search_icon.png" alt="" class="bl" />
      <img src="/src/assets/wedlock/search_icon.png" alt="" class="br" />
      <div class="list" v-if="list && list.length > 0">
        <div
          class="item"
          @click="timeSearch(item['contents'])"
          v-for="(item, index) in list"
          :key="index"
          :style="{ borderBottom: typeof JSON.parse(item['contents'])['data'] === 'string' ? '0' : '' }"
        >
          <template v-if="typeof JSON.parse(item['contents'])['data'] !== 'string'">
            <div class="left"> 🌟{{ item['createTime'] || '-' }} </div>
            <div class="right">
              <span>{{ restFraction(item['contents']) }}分</span>
              <img src="/src/assets/wedlock/united_icon_right.png" alt="" />
            </div>
          </template>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
  import router from '/@/router';
  // import wedlockResult from '../wedlockResult/index.vue';
  const list = ref([]);
  list.value = JSON.parse(sessionStorage.getItem('searchList') || '[]');
  const timeSearch = (contents: string) => {
    sessionStorage.setItem('calculationInfo', contents);
    router.push('/activity/calculation/wedlockResult');
  };
  const restFraction = (content: string) => {
    let score = 0;
    let sum = 0;
    try {
      let tempArr: number[] = Object.values(JSON.parse(content).data.zhishu);
      for (const item of tempArr) {
        sum += item;
      }
      score = sum / tempArr.length;
    } catch (error) {}
    return parseInt(score) || '-';
  };
</script>
<style lang="scss" scoped>
  main {
    width: 100vw;
    min-height: 100vh;
    background: #c01110;
    background-image: url(/@/assets/wedlock/search_bg.png);
    background-repeat: no-repeat;
    background-size: 70% auto;
    background-position-x: center;
    overflow: hidden;
    padding-bottom: 1rem;
    .list_title {
      position: relative;
      z-index: 1;
      background: url(/@/assets/wedlock/wedlock_list_title.png) no-repeat;
      background-size: contain;
      width: 5rem;
      height: 0.96rem;
      line-height: 0.96rem;
      text-align: center;
      margin: 0.4rem auto 0;
      font-size: 0.4rem;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #f2d281;
    }
    .content {
      position: relative;
      width: 7.2rem;
      // height: 12rem;
      background: #7f0608;
      border-radius: 0.48rem;
      border: 0.04rem solid #dfa263;
      margin: 0 auto 1rem;
      padding-bottom: 0.6rem;
      > img {
        position: absolute;
        width: 0.4rem;
        height: 0.4rem;
      }
      .tl {
        top: -0.05rem;
        left: -0.05rem;
      }
      .tr {
        top: -0.05rem;
        right: -0.05rem;
        transform: rotate(90deg);
      }
      .bl {
        bottom: -0.05rem;
        left: -0.05rem;
        transform: rotate(-90deg);
      }
      .br {
        bottom: -0.05rem;
        right: -0.05rem;
        transform: rotate(180deg);
      }
      .list {
        .item {
          display: flex;
          justify-content: space-between;
          margin: 0rem 0.2rem 0 0.2rem;
          border-bottom: 0.02rem solid #6b0406;
          padding: 0.4rem 0;
          .left {
            font-size: 0.3rem;
            font-family: AppleColorEmoji;
            color: #f2d281;
            line-height: 0.6rem;
          }
          .right {
            width: 1rem;
            font-size: 0.3rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #f2d281;
            line-height: 0.6rem;
            display: flex;
            align-items: center;
            img {
              width: 0.18rem;
              height: 0.3rem;
              margin-left: 0.1rem;
            }
          }
        }
      }
    }
  }
</style>
