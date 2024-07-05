<template>
  <div class="danmu">
    <div style="display: flex; flex-direction: row" class="danmu_main">
      <div class="danmu_item" v-for="(dannuItem, dannuIndex) in danmuList" :key="dannuIndex">
        <img :src="icon" class="danmu_item_img" />
        <p class="danmu_item_p"
          >{{ dannuItem }}<span class="price" v-if="renderContent">{{ showMoney }}<span class="text">元</span></span
          >话费券</p
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { list } from './index';
  interface PROPS {
    danmuList?: string[];
    showMoney?: string | number;
    icon?: string;
    renderContent?: boolean;
  }
  withDefaults(defineProps<PROPS>(), {
    danmuList: () => list,
    showMoney: () => 100,
    icon: () => 'https://nginx-beta.oss-cn-chengdu.aliyuncs.com/h5/calculation/wedlock_icon_redBag.png',
    renderContent: () => true,
  });
</script>
<style lang="scss" scoped>
  // 弹幕
  .danmu {
    width: 100vw;
    overflow: hidden;
    height: 0.6rem;
    display: flex;
    align-items: center;
    .danmu_main {
      display: flex;
      left: 0;
      animation-name: img_swi;
      animation-timing-function: linear;
      animation-duration: 20s;
      animation-iteration-count: infinite;
      .danmu_item {
        position: relative;
        display: flex;
        width: 6rem;
        height: 0.48rem;
        align-items: center;
        border-radius: 200px;
        background: rgba(0, 0, 0, 0.8);
        margin-left: 0.4rem;
        font-size: 0.2rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        .danmu_item_img {
          position: absolute;
          top: -0.15rem;
          left: -0.1rem;
          width: 0.6543rem;
          height: 0.7656rem;
        }

        .danmu_item_p {
          margin-left: 0.48rem;
          .price {
            font-weight: bold;
            margin: 0 0.05rem;
          }
        }
      }
    }
  }
</style>
