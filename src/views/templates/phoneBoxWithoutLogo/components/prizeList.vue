<template>
  <div class="pirze-wrap">
    <img class="icon" :src="titleIcon" alt="" />
    <img class="top" :src="topBorder" />
    <div class="list">
      <div class="items-container">
        <div class="items">
          <div class="item" v-for="item in prizeData" :key="item.goodsId">
            <img class="goodsImg" :src="item.goodsImg" alt="" />
            <img class="state" :src="ohkImg" alt="" />
            <p class="goodsName">{{ item.goodsName }}</p>
            <div class="goodsPrice">{{ item.marketPrice }}</div>
          </div>
        </div>
      </div>
    </div>
    <img class="bottom" :src="bottomBorder" alt="" />
  </div>
</template>

<script setup lang="ts">
  import titleIcon from '/@/assets/phoneBox/active_h.png';
  import topBorder from '/@/assets/phoneBox/top.png';
  import bottomBorder from '/@/assets/phoneBox/bottom.png';
  import prizeData from './data';
  import ohkImg from '/@/assets/phoneBox/ohk.png';
</script>

<style lang="scss" scoped>
  .pirze-wrap {
    margin-top: 1.2rem;
    position: relative;
    .icon {
      position: absolute;
      top: -0.57rem;
      left: 50%;
      transform: translateX(-50%);
      width: 3.86rem;
      height: 1.27rem;
    }
    .top,
    .bottom {
      height: 0.63rem;
      display: block;
      width: 100%;
    }
    .list {
      height: 12.4rem;
      background: url(/@/assets/phoneBox/content.png) repeat;
      background-size: 100% auto;
      padding: 0.2rem;
      width: 6.71rem;
      overflow: hidden;
      position: relative;
      z-index: 9;
      .items-container {
        position: relative;
        width: 6.12rem;
        height: 2.94rem;
        overflow: hidden;
        margin: 0.12rem auto;
      }
      .items {
        display: flex;
        position: absolute;
        animation: swipeAnimation 50s infinite;
        @keyframes swipeAnimation {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-40rem);
          }
        }
      }
      .item {
        height: 2.44rem;
        width: 1.8rem;
        margin: 0 0.15rem;
        position: relative;
        border-radius: 0.16rem;
        background-color: #ffffff;
        display: flex;
        flex-direction: column;
        align-items: center;
        .goodsImg {
          width: 80%;
          height: auto;
        }
        .state {
          position: absolute;
          top: 0;
          right: 0;
          width: 0.84rem;
          height: 0.36rem;
        }
        .goodsName {
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          width: 90%;
        }
        .goodsPrice {
          height: 0.49rem;
          background: linear-gradient(180deg, #303569 0%, #222956 100%);
          font-size: 0.32rem;
          line-height: 0.49rem;
          color: #ffffff;
          text-align: center;
          width: 100%;
          margin-top: auto;
          border-radius: 0 0 0.16rem 0.16rem;
        }
      }
    }
  }
</style>
