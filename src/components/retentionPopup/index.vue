<template>
  <nut-overlay v-model:visible="retention" :z-index="2000" class="confirm" :close-on-click-overlay="false" v-if="status">
    <div class="popup_mod">
      <div class="showBox">
        <div class="close" @click="close"></div>
        <div class="banner">
          <img src="/src/assets/blueFloatRetention/banner.png" alt="" />
        </div>
        <div class="confirm_box">
          <div class="popup_content"
            ><div>恭喜您</div> <div class="tip">获得<span class="red" style="margin: 0 0.1rem">限时降价</span>购买资格！</div></div
          >
          <div class="price"
            ><div class="number">{{ twicePrice }}<span style="font-size: 0.26rem">元</span></div>
            <div
              ><p class="">{{ twiceAllPrice }}元话费优惠券</p> <p class="red">尊贵用户限时特价</p></div
            ></div
          >
          <div class="cutdown"
            ><div class="van-count-down red" style="font-size: 0.88rem">
              <nut-countdown :endTime="end" format="ss:SS" @on-end="timeEnd" />
              <!-- <div class="countdown-part-box red" style="display: flex; font-size: 0.4rem">
                  <div class="part-item s" v-if="resetTime.s">{{ restSTime(resetTime.s) }}</div>
                  <span class="part-item-symbol">:</span>
                  <div class="part-item s" v-if="resetTime.ms">{{ restTime(resetTime.ms) }}</div>
                </div> --> </div
            ><div>秒后收回资格，欲购从速</div></div
          >
          <div class="button" @click="btnHandle"> {{ twicePrice }}元立即抢购 <div class="icon">不回本可退款</div></div>
          <div class="gray_btn" @click="payCheck"> 我已付款 </div>
        </div>
      </div>
    </div>
    <PayMethod v-show="true" @change="payMethodCB" />
  </nut-overlay>
</template>

<script setup lang="ts">
  import { Toast } from '@nutui/nutui';
  import { PayCenter } from '/@/utils/pay';
  import useRandomMoney from '/@/hooks/useRandomMoney';
  import { useConfigStore } from '/@/store/modules/platform';
  const { secondPayMoney, twicePrice, twiceAllPrice, secondaryType } = useRandomMoney();
  const configStore = useConfigStore();
  const retention = ref();

  const timer = setInterval(() => {
    const retentionStatus = sessionStorage.getItem('state');
    retention.value = retentionStatus ? true : false;
  });

  onUnmounted(() => {
    clearInterval(timer);
  });

  console.log(1212, secondaryType.value);

  const info = computed(() => {
    return configStore.info;
  });

  const state = reactive({
    status: true,
    end: Date.now() + 60 * 1000,
    payType: '',
  });

  const payMethodCB = (value: string) => {
    state.payType = value;
  };

  const timeEnd = () => {
    state.status = false;
  };

  const close = () => {
    state.status = false;
    state.end = Date.now() + 60 * 1000;
  };

  const btnHandle = () => {
    //  支付
    new PayCenter(info.value.applyIdentification).pay({
      phone: sessionStorage.getItem('phone'),
      randomMoney: secondPayMoney.value,
      payType: state.payType,
      trenchId: info.value.secondaryPayTrenchId,
      goodsId: secondaryType.value,
    });
  };

  const payCheck = () => {
    Toast.loading('查询中...');
    setTimeout(() => {
      Toast.text('查询失败');
    }, 3000);
  };

  const { status, end } = toRefs(state);
</script>

<style lang="scss" scoped>
  .popup_mod {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .red {
      color: red;
    }
    .showBox {
      width: 90%;
      position: relative;
      .banner {
        width: 100%;
        height: 3rem;
        img {
          width: 100%;
          display: block;
        }
      }
      .confirm_box {
        margin-top: -0.026667rem;
        padding-bottom: 0.4rem;
        background: #fff;
        border-bottom-left-radius: 0.266667rem;
        border-bottom-right-radius: 0.266667rem;
      }
      .popup_content {
        text-align: center;
        font-size: 0.4rem;
        color: #7b4516;
      }
      .tip {
        font-size: 0.36rem;
        line-height: 1.6;
      }
      .number {
        width: 33%;
        font-size: 0.6rem;
        text-align: center;
        color: #bf4106;
        margin-right: 0.3rem;
      }
      .price {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        padding: 0 0.66rem;
        width: calc(100% - 1.32rem);
        height: 2.1rem;
        background: url(/src/assets/blueFloatRetention/price_bg.png) no-repeat;
        background-size: 100% auto;
        font-size: 0.3rem;
        color: #d13c02;
        line-height: 1.5;
      }
      .cutdown {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        padding: 0.32rem 0 0.4rem;
        font-size: 0.4rem;
        text-align: center;
      }
      .button {
        position: relative;
        width: 90%;
        height: 1rem;
        margin: 0 auto;
        line-height: 1rem;
        text-align: center;
        font-size: 0.36rem;
        color: #fff;
        background: -webkit-gradient(linear, right top, left top, from(#ff4f1a), to(#fe8815));
        background: linear-gradient(270deg, #ff4f1a, #fe8815);
        border-radius: 0.8rem;
      }
      .icon {
        position: absolute;
        right: 0.1rem;
        top: -0.4rem;
        color: #fff;
        height: 0.8rem;
        line-height: 0.666667rem;
        width: 2.666667rem;
        background: url(/src/assets/blueFloatRetention/icon.png) no-repeat;
        background-size: 100% auto;
        font-size: 0.15rem;
      }
      .gray_btn {
        padding-top: 0.32rem;
        text-align: center;
        font-size: 0.3rem;
      }
    }
    .close {
      position: absolute;
      top: 0;
      right: 0;
      height: 0.8rem;
      width: 0.8rem;
      background: url(/src/assets/blueFloatRetention/close.png);
      background-size: contain;
      z-index: 3000;
    }
  }
</style>
