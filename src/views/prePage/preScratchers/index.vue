<template>
  <div class="pre-page-container">
    <img src="@/assets/activity/scratchers/rotate.png" alt="" class="rotate" />
    <div class="mock-guagua-container" id="guagua-container" @touchstart="touchHandle"></div>
    <img src="@/assets/activity/scratchers/finger.png" alt="" class="finger" v-if="!start" />
    <nut-swiper :init-page="1" :loop="true" auto-play="3000" direction="vertical" :height="swiperItemHeight" class="user-container-swiper">
      <nut-swiper-item v-for="item in userData" :key="item.name">
        <div class="user-item">
          <div>
            <img :src="item.avatar" alt="" style="width: 0.36rem; height: 0.36rem; border-radius: 50%" />
            <span style="margin-left: 0.19rem">{{ item.name }}</span>
          </div>
          <span>{{ item.time }}</span>
          <span style="color: #fd0401">刮开福利</span>
        </div>
      </nut-swiper-item>
    </nut-swiper>
    <img src="@/assets/activity/scratchers/goDownload.png" alt="" class="go-download" v-if="goDownload" />
  </div>
</template>

<script lang="ts" setup>
  import coverUrl from '/@/assets/activity/scratchers/mask.png';
  // import { loadJs } from '/@/utils';
  import { userData } from './mockData';
  import Scratchers from '/@/utils/scratchers.js';
  const start = ref(false);
  const swiperItemHeight = ref(0);
  const goDownload = ref(false);
  const emitFun = defineEmits(['changeStep']);
  onMounted(() => {
    //  设置swiper高度
    swiperItemHeight.value = (document.querySelector('.user-container-swipe') as Element)?.clientHeight;
    //  初始化刮刮cavas
    const width = document.getElementById('guagua-container')?.clientWidth;
    const height = document.getElementById('guagua-container')?.clientHeight;
    const scraping = new Scratchers(document.getElementById('guagua-container'), {
      width: width, // canvas 宽
      height: height, // canvas 高
      // awardUrl: "", // 奖品图片
      awardColor: 'transparent', // 奖品默认背景，默认为透明：transparent
      // awardMsg: "特等奖", // 奖品文字
      // font: "bold 30px Arial", // 奖品字体样式
      // fontColor: "#ffffff", // 奖品字体颜色
      coverUrl: coverUrl, // 覆盖层图片
      // coverColor: "#cccccc", // 纯色覆盖层
      radius: 70, // 擦除手势半径
      duration: 500, // 展现全部的淡出效果时间（ms）
      percent: 70, // 刮开面积 占 整张刮卡的百分比
      unit: 'px', // 宽高css单位
      containerClass: 'jy-scraping-container', // 装载刮卡的父元素类名
      mode: 'default', // 刮刮卡刮开卡片模式。default:默认模式，一个个像素点刮开；sector:快速模式，以鼠标按下点开始到结束点形成扇形消除像素
      onReady: function () {
        console.log('scratchers ready');
      },
      onProgress: function (rate) {
        console.log('scratchers progress', rate);
      },
      onSuccess: () => {
        console.log('scratchers done');
        goDownload.value = true;
        setTimeout(() => {
          emitFun('changeStep', { step: 2 });
        }, 1000);
      }, // 全部刮开回调
    });
    (scraping as any).setLock(false);
  });
  const touchHandle = () => {
    start.value = true;
  };
</script>

<style lang="scss" scoped>
  .pre-page-container {
    background-color: #262626;
    width: 100vw;
    min-height: 100vh;
    background-image: url(/@/assets/activity/scratchers/bg.png);
    background-size: 100% auto;
    background-repeat: no-repeat;
    background-position: center 1.69rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    .rotate {
      width: 5.08rem;
      height: auto;
      top: 1.49rem;
      animation: rotate 10s linear infinite;
      position: absolute;
    }
    .finger {
      width: 5.16rem;
      height: auto;
      position: absolute;
      top: 5.65rem;
      left: 50%;
      transform: translateX(-50%);
      z-index: 2;
      animation: fadeOut 2s 1s forwards;
    }
    .mock-guagua-container {
      width: 6.42rem;
      height: 3.65rem;
      position: absolute;
      top: 5.65rem;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1;
      background-color: transparent;
    }
    .user-container-swiper {
      background-image: url(/@/assets/activity/scratchers/swipeBg.png);
      background-size: 100% auto;
      background-repeat: no-repeat;
      position: absolute;
      top: 9.86rem;
      width: 6.41rem;
      height: 0.92rem;
    }
    .user-item {
      height: 100%;
      width: 90%;
      margin: auto;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      color: #202020;
      & > div {
        display: flex;
        align-items: center;
      }
    }
    .go-download {
      width: 4.21rem;
      height: auto;
      margin-top: 11.2rem;
    }
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
      height: 0;
    }
  }
</style>
