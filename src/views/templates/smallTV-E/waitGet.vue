<template>
  <div class="container">
    <div class="top_bg">
      <div class="time_box">
        <nut-countdown :endTime="end" v-model="resetTime" millisecond format="HH:mm:ss:SS" class="times">
          <div class="countdown-part-box _flex countdown">
            <div class="part-item ml">{{ resetTime.m >= '10' ? resetTime.m : '0' + resetTime.m }}</div>
            <span class="part-item-symbol">:</span>
            <div class="part-item s">{{ resetTime.s >= '10' ? resetTime.s : '0' + resetTime.s }}</div>
            <span class="part-item-symbol">:</span>
            <div class="part-item mr">{{
              (Number(resetTime.ms) / 10).toFixed(0) >= '10'
                ? (Number(resetTime.ms) / 10).toFixed(0)
                : '0' + (Number(resetTime.ms) / 10).toFixed(0)
            }}</div>
          </div>
        </nut-countdown>
      </div>
    </div>
    <div class="bom-box">
      <div class="price_box">
        <div class="price"><span style="font-size: 0.4rem">￥</span>9.9</div>
        <div class="unlock">解锁后续剧情+抽手机</div>
      </div>
      <div class="tips">短剧用户专属福利</div>
      <div class="title"> 【国行正品】 Apple/苹果 iPhone 14 Pro手机5G新款 看 短剧即抽取 </div>
      <img class="img_detail" src="/src/assets/smallTV-e/detail.png" alt="" />
      <img @click="submitHandle" class="sub" src="/src/assets/smallTV-e/btn_sub.png" alt="" />
    </div>
    <img class="line" src="/src/assets/smallTV-e/line.png" alt="" />
    <div class="watch_pay">
      <div class="watch">
        <img src="/src/assets/smallTV-e/wechat.png" alt="" />
        微信安全支付
      </div>
      <img class="check" src="/src/assets/smallTV-e/checked.png" alt="" />
    </div>
    <companyInfo color="#FFA688" />
    <sideBar />
  </div>
</template>

<script lang="ts" setup>
  import { PayCenter } from '/@/utils/pay';
  import { useConfigStore } from '/@/store/modules/platform';
  import useCheckOrder from '/@/hooks/useCheckOrder';

  const configStore = useConfigStore();
  const info = computed(() => {
    return configStore.info;
  });
  const state = reactive({
    end: Date.now() + 60 * 1000 * 5,
    resetTime: {
      m: '00',
      s: '00',
      ms: '00',
    },
  });
  const emitFun = defineEmits(['nextStep']);
  const submitHandle = () => {
    console.log(123);
    new PayCenter(info.value.applyIdentification).pay({
      randomMoney: 9.9,
      touFangType: 'xjc',
      phone: (+new Date()).toString().slice(2),
    });
  };
  const successCB = () => {
    emitFun('nextStep', 'waitGetSecond');
    sessionStorage.setItem('step', 'waitGetSecond');
  };
  useCheckOrder(successCB);
  const { end, resetTime } = toRefs(state);
</script>

<style lang="scss" scoped>
  .top_bg {
    width: 100vw;
    height: 8.52rem;
    background-image: url(/@/assets/smallTV-e/bg.png);
    background-repeat: no-repeat;
    background-size: contain;
    overflow: hidden;
    .time_box {
      margin: 1.74rem 0 0 4.4rem;
      font-size: 0.36rem;
      font-family: PingFang SC;
      font-weight: 600;
      color: #ffffff;
    }
  }
  .bom-box {
    padding: 0.25rem;
    .price_box {
      display: flex;
      align-items: flex-end;
      .price {
        font-size: 0.8rem;
        font-family: PingFang SC;
        font-weight: 600;
        color: #eb5b27;
      }
      .unlock {
        width: 2.36rem;
        height: 0.33rem;
        margin-bottom: 0.1rem;
        margin-left: 0.2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.22rem;
        font-family: PingFang SC;
        font-weight: 600;

        background: #eb333b;
        border-radius: 0.15rem;
        color: #fff;
      }
    }
    .tips {
      font-size: 0.18rem;
      color: #c4c4c4;
    }
    .title {
      margin-top: 0.3rem;
      font-size: 0.28rem;
      font-family: PingFang SC;
      font-weight: 600;
      color: #111111;
    }
    .img_detail {
      width: 100%;
      height: 1.23rem;
      margin: 0.2rem auto;
    }
    .sub {
      width: 6.92rem;
      height: 1.09rem;
      margin: 0 auto;
    }
  }
  .line {
    width: 100%;
    height: 0.03rem;
  }
  .watch_pay {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.28rem;
    color: #504f50;
    padding: 0.3rem;
    .watch {
      display: flex;
      align-items: center;
      img {
        width: 0.42rem;
        height: 0.37rem;
        margin-right: 0.16rem;
      }
    }
    .check {
      width: 0.37rem;
      height: 0.37rem;
    }
  }
</style>
