<template>
  <nut-popup position="bottom" round :style="{ height: '55%' }" v-model:visible="listPopup" :overlay="false">
    <div class="list_popup">
      <div class="close-btn" @click="closeGoodsDetail"></div>
      <div class="list">
        <div class="pro" v-for="item in props.list" :key="item.id"
          ><div class="pic" v-if="item.pictureUrl !== ''"
            ><img :src="item.pictureUrl" /><div class="pro-level" :class="`level${item.gradeId}`"></div></div
          ><div class="info"
            ><div class="name">{{ item.goodsMsg }}</div
            ><div class="price">¥{{ item.marketPrice }}</div
            ><div class="chance">{{ item.probability }}%</div></div
          ></div
        >
        <div class="footer_level" :style="footerStyle">
          <span v-for="(levelItem, levelIndex) in levelList" :key="levelIndex"
            >{{ levelItem.gradeName }}<span class="text">{{ levelItem.gradeProbability }}%</span></span
          >
        </div>
      </div>
    </div>
  </nut-popup>
</template>

<script setup lang="ts">
  type LIST_TYPE = {
    id?: string;
    pictureUrl?: string;
    goodsMsg?: string;
    marketPrice?: number;
    gradeId?: string;
    probability?: number;
  }[];

  type LEVEL_TYPE = {
    gradeName?: string;
    gradeProbability?: string;
  }[];

  interface propsType {
    list: LIST_TYPE;
    levelList: LEVEL_TYPE;
    footerStyle: any;
  }

  const props = withDefaults(defineProps<propsType>(), {
    list: () => [],
    levelList: () => [],
    footerStyle: () => {
      paddingBottom: '0.3rem';
    },
  });

  let listPopup = ref(false);

  const closeGoodsDetail = (): void => {
    listPopup.value = false;
  };

  const openGoodsDetail = (): void => {
    listPopup.value = true;
  };

  defineExpose({
    openGoodsDetail,
  });
</script>

<style lang="scss" scoped>
  $levelGradient1: linear-gradient(to bottom, #ff6754, #fa355e);
  $levelGradient2: linear-gradient(to bottom, #fbbf3a, #fd9620);
  $levelGradient3: linear-gradient(to bottom, #df97ec, #ba5fee);
  $levelGradient4: linear-gradient(to bottom, #57cdff, #4399ff);
  // 商品列表弹窗
  .list_popup {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    .close-btn {
      position: absolute;
      right: 0.2rem;
      top: 0.2rem;
      // top: 6.4rem;
      z-index: 10;
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.5) url(https://apkdl.mochai.store/pic/lede/images/landing30/close1.svg) no-repeat 50% 50%;
      background-size: 40% auto;
    }
    // 商品列表模块
    .list {
      height: 8.1rem;
      overflow-y: auto;
      pointer-events: auto; // 防止滚动穿透
      padding: 0.25rem 0.2rem 0rem;
      .pro {
        display: flex;
        align-items: center;
        padding: 0.2rem 0;
        border-bottom: #eee 1px solid;
        .pic {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-shrink: 0;
          overflow: hidden;
          width: 1rem;
          height: 1rem;
          img {
            max-width: 100%;
            max-height: 100%;
          }
          .pro-level {
            position: absolute;
            right: -0.2rem;
            bottom: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
            height: 0.3rem;
            padding: 0 0.3rem 0.01rem 0.1rem;
            transform: skewX(-25deg);
            &::before {
              content: '';
              line-height: 0.25rem;
              color: #fff;
              font-size: 0.25rem;
              font-weight: bold;
              zoom: 0.88;
              transform: skewX(25deg);
            }
          }

          .level4 {
            background: $levelGradient1;
            &::before {
              content: '欧皇';
            }
          }
          .level3 {
            background: $levelGradient2;
            &::before {
              content: '典藏';
            }
          }
          .level2 {
            background: $levelGradient3;
            &::before {
              content: '尊贵';
            }
          }
          .level1 {
            background: $levelGradient4;
            &::before {
              content: '精品';
            }
          }
        }
        .info {
          width: calc(100% - 1rem - 0.2rem);
          margin-left: 0.2rem;
          .name {
            overflow: hidden;
            display: -webkit-box;
            line-height: 0.35rem;
            margin-top: -0.05rem;
            font-size: 0.25rem;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .price {
            line-height: 0.25rem;
            margin-top: 0.1rem;
            color: #fd5258;
            font-size: 0.3rem;
            font-weight: bold;
          }
          .chance {
            line-height: 0.25rem;
            margin-top: 0.1rem;
            color: #bbb;
            font-size: 0.25rem;
            zoom: 0.8;
          }
        }
      }
    }
    .footer_level {
      width: 100%;
      display: flex;
      padding: 0.3rem 0;
      span {
        line-height: 0.25rem;
        font-size: 0.25rem;
        white-space: nowrap;
        transform: scale(0.72);
        transform-origin: left center;
      }
      .text {
        margin-left: 0.1rem;
      }
    }
  }
</style>
