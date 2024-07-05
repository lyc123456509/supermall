<template>
  <nut-countdown :endTime="end" v-model="resetTime" millisecond format="HH:mm:ss:SS" class="times">
    <div class="countdown-part-box _flex countdown">
      <!-- <span>请在</span> -->
      <div class="part-item ml">{{ resetTime.m >= '10' ? resetTime.m : '0' + resetTime.m }}</div>
      <span class="part-item-symbol">:</span>
      <div class="part-item s">{{ resetTime.s >= '10' ? resetTime.s : '0' + resetTime.s }}</div>
      <span class="part-item-symbol">:</span>
      <div class="part-item mr">{{
        (Number(resetTime.ms) / 10).toFixed(0) >= '10'
          ? (Number(resetTime.ms) / 10).toFixed(0)
          : '0' + (Number(resetTime.ms) / 10).toFixed(0)
      }}</div>
      <!-- <span>内完成支付</span> -->
    </div>
  </nut-countdown>
</template>

<script setup lang="ts">
  const props = defineProps({
    time: {
      type: Number,
      default: () => 10,
    },
  });
  const state = reactive({
    end: Date.now() + 60 * 1000 * props.time,
    resetTime: {
      m: '00',
      s: '00',
      ms: '00',
    },
  });
  const { end, resetTime } = toRefs(state);
</script>
<style lang="scss" scoped>
  // 倒计时
  .times {
    font-size: 0.26rem;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #7f0608;
    width: 2rem;
    margin-left: 0.32rem;
    .countdown-part-box {
      width: 100%;
      display: flex;
      align-items: center;
      div {
        width: 0.46rem;
        height: 0.42rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 0.08rem;
        box-shadow: inset 0px 0px 1px 1px #eee;
        background: linear-gradient(180deg, #ffe895 0%, #f9cf53 100%);
      }
      .part-item-symbol {
        color: #f2d281;
        margin: 0 0.02rem;
      }
    }
  }
</style>
