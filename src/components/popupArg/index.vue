<template>
  <nut-overlay v-model:visible="show" :close-on-click-overlay="false" z-index="2007" class="popup_mod">
    <div class="wrapper" :class="aniStatus ? 'pub-scaleBig' : 'pub-scaleSmall'" :style="{ 'border-radius': round + 'px;', background }">
      <h3 class="title">{{ title }}</h3>
      <div class="content">
        <template v-if="!contentRender">
          {{ content }}
        </template>
        <template v-else>
          <slot></slot>
        </template>
      </div>
      <div class="operate">
        <div class="know-btn" @click="close" v-if="btnStatus">知道了</div>
      </div>
      <div class="pub-close-btn" v-if="closeIcon" @click="close"></div>
    </div>
  </nut-overlay>
</template>

<script setup lang="ts">
  interface props {
    content?: string;
    title?: string;
    height?: string;
    round?: string;
    closeIcon?: boolean;
    btnStatus?: boolean;
    contentRender?: boolean;
    background?: string;
  }
  withDefaults(defineProps<props>(), {
    content: () => '规则',
    title: () => '',
    height: () => '4',
    round: () => '10',
    closeIcon: () => true,
    btnStatus: () => true,
    contentRender: () => false,
    background: () => '#fff',
  });
  const state = reactive({
    show: false,
    aniStatus: false,
  });
  const open = () => {
    state.aniStatus = true;
    state.show = true;
  };

  const emitFun = defineEmits(['closePop']);
  const close = () => {
    state.show = false;
    state.aniStatus = false;
    emitFun('closePop');
  };

  defineExpose({
    open,
  });
  const { show, aniStatus } = toRefs(state);
</script>
<style lang="scss" scoped>
  .popup_mod {
    display: flex;
    justify-content: center;
    align-items: center;
    .wrapper {
      position: relative;
      background: #fff;
      width: 6.4rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      box-sizing: border-box;
      padding: 0.5rem 0.4rem;
      .title {
        line-height: 0.36rem;
        font-size: 0.36rem;
        font-weight: bold;
        text-align: center;
      }
      .content {
        line-height: 0.38rem;
        margin-top: 0.45rem;
        color: #333;
        font-size: 0.28rem;
      }
      .operate {
        display: flex;
        justify-content: center;
        margin-top: 0.45rem;
        .know-btn {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 4rem;
          height: 0.8rem;
          border-radius: 0.8rem;
          color: #fff;
          font-size: 0.32rem;
          background: linear-gradient(to bottom, #ff6754, #fa355e);
        }
      }
      .pub-close-btn {
        position: absolute;
        right: 0;
        top: -0.64rem;
        z-index: 100;
        width: 0.44rem;
        height: 0.44rem;
        background: url(https://video.mochai.store/pic/qugou/images/close2.svg) no-repeat 0 0;
        background-size: 100% 100%;
      }
    }
  }
  .pub-scaleSmall {
    animation: pubScaleSmall 0.3s ease-in-out forwards;
  }
  .pub-scaleBig {
    animation: pubScaleBig 0.3s ease-in-out forwards;
  }
  @keyframes pubScaleSmall {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }

  @keyframes pubScaleBig {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
