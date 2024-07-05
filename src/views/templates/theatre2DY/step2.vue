<template>
  <div class="container">
    <!-- <div class="expire">{{ time.minute }}:{{ time.second }}</div>
    <div class="card">
      <div class="list">
        <img :src="hf30" alt="" />
        <img :src="hf29" alt="" />
        <img :src="hf50" alt="" />
        <div class="text29">
          <p>3000看剧积分</p>
          <p>¥{{ info.phoneData.cssClass || 100 }}话费券</p>
        </div>
      </div>
      <nut-input
        type="tel"
        v-model="phone"
        placeholder="请输入您的手机号"
        maxLength="11"
        :border="false"
        :left-icon="phoneIcon"
        style="
          width: 100%;
          background: #f4f5f4;
          font-size: 0.37rem;
          color: #333;
          padding: 0 0.24rem;
          border-radius: 0.15rem;
          height: 0.96rem;
          line-height: 0.96rem;
        "
      />
      <PayMethod
        @change="payMethodCB"
        template="theatre"
        :slot-title="true"
        style="padding: 0rem 0.29rem; height: 1.71rem; background-color: #f8f8f8; border-radius: 0.15rem; margin-bottom: 0"
      >
        <template #title><img :src="img_zffs" style="height: 0.28rem; width: 1.66rem;" /></template>
      </PayMethod>
      <img :src="btn_ljcz" alt="" class="scale-animation nowGet" @click="getPayHandle" />
      <div class="get-acc">
        <p>实际支付：¥{{ showMoney }}</p>
        <p style="font-weight: bold">实际到账福利：3000看剧积分+{{ info.phoneData.cssClass || 100 }}元话费券</p>
      </div>
    </div> -->
    <img :src="xszk" alt="" class="xszk" />
    <span class="expire">剩余时间：{{ time.minute }}:{{ time.second }}</span>
    <div class="content">
      <div class="hf-packages">
        <img :src="hf30" alt="" />
        <img :src="hf29" alt="" />
        <img :src="hf50" alt="" />
        <p class="packages_text" style="left: 0.6rem">¥30</p>
        <div class="packages_text" style="left: 2.8rem; top: 0.5rem">
          <p>¥{{ showMoney }}</p>
          <span>99%用户购买</span>
        </div>
        <p class="packages_text" style="left: 5.55rem">¥50</p>
      </div>
      <div class="tcnr">
        <div class="tcnr_text" style="left: 2.1rem">
          <p>990</p>
          <p>看剧积分</p>
        </div>
        <div class="tcnr_text" style="left: 5.1rem">
          <p>¥100</p>
          <p>话费券</p>
        </div>
      </div>
      <div class="card">
        <p>为了套餐内容精准送达，建议输入手机号</p>
        <nut-input
          type="tel"
          v-model="phone"
          placeholder="请输入11位手机号"
          maxLength="11"
          :border="false"
          style="
            width: 5.15rem;
            background-color: #ffebe6;
            font-size: 0.31rem;
            color: #fab6b1;
            border-radius: 0.21rem;
            height: 0.77rem;
            line-height: 0.77rem;
          "
        />
        <img :src="btn_ljqg" alt="" class="ljqg scale-animation" @click="getPayHandle" />
        <div class="custom-pay">
          默认支付方式：
          <img :src="icon_wx" alt="" />
          微信支付
        </div>
      </div>
    </div>
    <div class="hf_c_box">
      <div class="hf_title">赠送话费券规则说明</div>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div class="hf_text" v-html="info.phoneData.remark && JSON.parse(info.phoneData.remark)?.desc"></div>
    </div>
    <CompanyInfo style="color: #fff" />
    <sideBar />
  </div>
</template>

<script lang="ts" setup>
  import hf30 from '/@/assets/theatre2DY/30.png';
  import hf29 from '/@/assets/theatre2DY/29.9.png';
  import hf50 from '/@/assets/theatre2DY/50.png';
  import btn_ljqg from '/@/assets/theatre2DY/btn_ljqg.png';
  import xszk from '/@/assets/theatre2DY/xszk.png';
  import icon_wx from '/@/assets/theatre2DY/icon_wx.png';
  import useCountDown from '/@/hooks/useCountDown';
  import usePhone from '/@/hooks/usePhone';
  import { Toast } from '@nutui/nutui';
  import { useConfigStore } from '/@/store/modules/platform';
  import useRandomMoney from '/@/hooks/useRandomMoney';
  import { PayCenter } from '/@/utils/pay';

  const configStore = useConfigStore();
  const { showMoney } = useRandomMoney();
  const time = useCountDown(10);
  const info = computed(() => {
    return configStore.info;
  });
  const state = reactive({
    phone: usePhone(),
    isAgree: true,
  });

  const getPayHandle = () => {
    if (!/^(?:(?:\+|00)86)?1\d{10}$/.test(state.phone)) {
      Toast.text('请输入正确的手机号码');
      return;
    }

    //  支付
    new PayCenter(info.value.applyIdentification).pay({
      phone: state.phone,
      randomMoney: 9.9,
    });
  };

  const { phone } = toRefs(state);
</script>

<style lang="scss" scoped>
  .container {
    min-height: 100vh;
    width: 100vw;
    background-image: url(/@/assets/theatre2DY/bg.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-color: #f68466;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    .xszk {
      width: 4.79rem;
      height: 1.06rem;
      margin-top: 4.62rem;
    }
    .expire {
      font-size: 0.27rem;
      color: #fffeff;
      margin-top: -0.4rem;
    }
    .content {
      padding: 0 0.25rem;
      width: 100%;
      box-sizing: border-box;
      .hf-packages {
        display: flex;
        justify-content: space-between;
        margin-top: 0.19rem;
        position: relative;
        text-align: center;
        font-weight: bold;
        img {
          width: 2.12rem;
          height: 1.81rem;
        }
        .packages_text {
          position: absolute;
          top: 0.7rem;
        }
        & > p {
          color: #8a8a8a;
          font-size: 0.44rem;
        }
        & > div {
          p {
            color: #f03c3a;
            font-size: 0.44rem;
          }
          span {
            color: #f69a98;
            font-size: 0.19rem;
            font-weight: normal;
          }
        }
      }
      .tcnr {
        width: 100%;
        margin-top: -0.2rem;
        background-image: url(/@/assets/theatre2DY/tcnr_bg.png);
        background-repeat: no-repeat;
        background-size: 100% auto;
        height: 2rem;
        position: relative;
      }
      .tcnr_text {
        position: absolute;
        top: 0.67rem;
        p {
          font-weight: bold;
          color: #f03c3a;
          &:nth-child(1) {
            font-size: 0.42rem;
          }
          &:nth-child(2) {
            font-size: 0.27rem;
          }
        }
      }
      .card {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0.19rem 0;
        background-color: #fcfaf8;
        border-radius: 0.21rem;
        margin-top: 0.15rem;
        padding: 0.19rem 0;
        p {
          color: #f03c3a;
          font-size: 0.27rem;
        }
        .ljqg {
          margin-top: 0.2rem;
          width: 90%;
        }
        .custom-pay {
          font-size: 0.27rem;
          color: #abaaa8;
          img {
            vertical-align: middle;
            width: 0.38rem;
            height: 0.31rem;
          }
        }
      }
    }
    .hf_c_box {
      width: 6.8rem;
      margin: 0 auto;
      margin-top: 0.37rem;
      margin-bottom: 0.27rem;
      color: #ffcfc3;
      font-size: 0.27rem;
      .hf_title {
        text-align: center;
        margin-bottom: 0.12rem;
      }
      .hf_text {
        line-height: 0.42rem;
      }
    }
    .nut-input {
      :deep(.nut-input-left-icon) {
        margin-right: 0;
      }
      :deep(.nut-icon__img) {
        width: 0.26rem !important;
      }
      :deep(.input-text) {
        text-align: center !important;
        width: 100%;
        color: #f10c17;
      }
      :deep(.input-text::placeholder) {
        color: #fab6b1;
      }
    }
  }
</style>
