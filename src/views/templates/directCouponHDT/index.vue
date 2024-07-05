<template>
  <div>
    <div class="container">
      <div class="topBox">
        <div class="_flex_item">
          <img class="logo_img" :src="info.landingPageResponse.logoUrl" alt="" />
        </div>
        <div class="top_img _flex_item">
          <img class="top_img_" src="https://y-qiwan.obs.cn-north-4.myhuaweicloud.com:443/qwhz-h5/page/h5_hf/29_hf/g.png" alt="" />
          <div class="top_name_">恭喜你 !话费优惠券资格锁定</div>
        </div>
      </div>
      <div class="box">
        <div class="hf-coupon">
          <img class="line" src="https://y-qiwan.obs.cn-north-4.myhuaweicloud.com:443/qwhz-h5/page/h5_hf/29_hf/line.png" alt="" />
          <div class="pull_price">话费优惠券</div>
          <div class="couponList _flex_item">
            <div class="coupon_box">
              <div class="c_price">20元</div>
              <div class="s_price">售价：20元</div>
            </div>
            <div class="coupon_box_">
              <div class="c_tit">话费优惠券</div>
              <div class="c_price _cl">100元</div>
              <div class="s_price _sl">售价：{{ showMoney }}元</div>
              <div class="pay_amount" style="color: red; text-align: center" v-if="info.FeesInfo && info.FeesInfo !== ''">
                <span class="text">额外附赠:</span><br />
                <span class="value">{{ info.FeesInfo }}</span>
              </div>
            </div>
            <div class="coupon_box">
              <div class="c_price">50元</div>
              <div class="s_price">售价：50元</div>
            </div>
          </div>
        </div>
      </div>
      <div class="box">
        <div class="hf-coupon" style="height: 10rem">
          <img class="line" src="https://y-qiwan.obs.cn-north-4.myhuaweicloud.com:443/qwhz-h5/page/h5_hf/29_hf/line.png" alt="" />
          <PayMethod @change="payMethodCB" style="margin-left: 0.2rem; margin-right: 0.2rem" />
          <nut-input
            type="tel"
            v-model="phone"
            placeholder="请输入您的手机号"
            maxLength="11"
            :border="false"
            :style="{ marginTop: '0.5rem' }"
          />
          <nut-button :loading="submitLoading" class="scale-animation nowGet" size="large" @click="getPayHandle">立即支付</nut-button>
          <!-- <div class="nowGet scale-animation" @click="getPayHandle"> 立即充值 </div> -->
          <UserBook @change="isAgreeCB" :phone="phone" />
        </div>
      </div>

      <div class="hf_c_box">
        <div class="hf_text" v-html="info.phoneData.remark && JSON.parse(info.phoneData.remark)?.desc"> </div>
      </div>

      <div class="use_flow">
        <div class="flow_img _flex_bew">
          <!-- <a href="https://h.chengduyouzhile.com"></a> -->
          <img class="dw_img" src="https://y-qiwan.obs.cn-north-4.myhuaweicloud.com:443/qwhz-h5/page/h5_hf/h5_hf_pay/dowload.png" alt="" />
          <img class="dw_jt" src="https://y-qiwan.obs.cn-north-4.myhuaweicloud.com:443/qwhz-h5/page/h5_hf/h5_hf_pay/jt.png" alt="" />
          <img class="dw_img" src="https://y-qiwan.obs.cn-north-4.myhuaweicloud.com:443/qwhz-h5/page/h5_hf/h5_hf_pay/phone.png" alt="" />
          <img class="dw_jt" src="https://y-qiwan.obs.cn-north-4.myhuaweicloud.com:443/qwhz-h5/page/h5_hf/h5_hf_pay/jt.png" alt="" />

          <img class="dw_img" src="https://y-qiwan.obs.cn-north-4.myhuaweicloud.com:443/qwhz-h5/page/h5_hf/h5_hf_pay/coupon.png" alt="" />
        </div>
        <div class="flow_content _flex_bew">
          <div>下载{{ info.appName }}APP</div>
          <div>手机号登录APP</div>
          <div
            ><span class="price_">{{ showMoney }}</span
            >领<span class="price_"></span>话费优惠券</div
          >
        </div>
      </div>
      <companyInfo />
      <sideBar />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { PayCenter } from '/@/utils/pay';
  import { useConfigStore } from '/@/store/modules/platform';
  import useRandomMoney from '/@/hooks/useRandomMoney';
  import useCheckOrder from '/@/hooks/useCheckOrder';
  import { Toast } from '@nutui/nutui';
  import usePhone from '/@/hooks/usePhone';

  const configStore = useConfigStore();

  const info = computed(() => {
    return configStore.info;
  });
  const submitLoading = computed(() => {
    return configStore.submitLoading;
  });
  const { randomMoney, showMoney } = useRandomMoney();
  useCheckOrder();

  const state = reactive({
    phone: usePhone(),
    isAgree: true,
    payType: '',
  });

  const isAgreeCB = (agreeState: boolean) => {
    state.isAgree = agreeState;
  };

  const payMethodCB = (value: string) => {
    state.payType = value;
  };

  const getPayHandle = () => {
    if (!state.isAgree) {
      Toast.text('请认真阅读用户隐私协议并同意');
      return;
    }

    if (state.phone.length !== 11) {
      Toast.text('请填写正确的手机号');
      return;
    }

    //  支付
    new PayCenter(info.value.applyIdentification).pay({
      phone: state.phone,
      randomMoney: randomMoney.value,
      payType: state.payType,
    });
  };
  // const time = ref(15 * 60 * 1000);

  const { phone } = toRefs(state);
</script>

<style scoped>
  .container {
    width: 7.5rem;
    /* height: 14.38rem; */
    padding-bottom: 1.8rem;
    background: #f2f2f2;
    overflow: hidden;
    position: relative;
  }

  ._flex_bew {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  ._flex_item {
    display: flex;
    align-items: center;
  }

  .topBox {
    width: 100%;
    background: #66cf7e;
    padding: 0.3rem;
  }

  .logo_img {
    width: 0.45rem;
    height: 0.45rem;
    border-radius: 0.1rem;
    margin-right: 0.05rem;
  }

  .logo_name {
    font-size: 0.3rem;
    font-weight: bold;
    font-style: italic;
    color: #ffffff;
  }

  .top_img {
    margin-top: 0.19rem;
  }

  .top_img_ {
    width: 0.84rem;
    height: 0.84rem;
  }

  .top_name_ {
    font-size: 0.42rem;
    color: #ffffff;
    margin-left: 0.14rem;
  }

  .box {
    padding: 0.15rem 0.2rem;
    /* margin-top: 0.15rem; */
  }

  .hf-coupon {
    background: #ffffff;
    border-radius: 10px;
    position: relative;
    padding: 0.01rem;
  }

  .line {
    width: 100%;
    height: 0.13rem;
    position: absolute;
    top: 0;
  }

  .pull_price {
    font-size: 0.3rem;
    font-weight: 600;
    color: #4d4d4d;
    margin: 0.2rem 0 0 0.2rem;
  }

  .coupon_box {
    width: 2rem;
    height: 2.3rem;
    background: #ffffff;
    border: 0.02rem solid #c3c3c3;
    box-shadow: 0px 0px 0.16rem 0px rgba(200, 200, 200, 0.58);
    border-radius: 0.13rem;
  }

  .couponList {
    padding-left: 0.14rem;
  }

  .coupon_box_ {
    width: 2.49rem;
    height: 3.07rem;
    background: url(https://y-qiwan.obs.cn-north-4.myhuaweicloud.com:443/qwhz-h5/page/h5_hf/29_hf/czq.png) no-repeat;
    background-size: 100% 100%;
  }

  .c_price {
    font-size: 0.52rem;
    color: #4d4d4d;
    text-align: center;
    margin-top: 0.7rem;
  }

  .s_price {
    font-size: 0.24rem;
    color: #b1b1b1;
    text-align: center;
    line-height: 0.4rem;
  }

  .c_tit {
    font-size: 0.24rem;
    font-weight: 400;
    color: #ffffff;
    text-align: center;
    line-height: 0.65rem;
  }

  ._cl {
    font-size: 0.58rem;
    font-weight: 600;
    margin-top: 0.3rem;
  }

  ._sl {
    color: #de1414;
  }

  .nowGet {
    display: block;
    height: 0.8rem;
    width: 5.39rem;
    line-height: 0.8rem;
    background: linear-gradient(111deg, #e96f48 0%, #db3c2b 100%);
    border-radius: 0.38rem;
    margin: 0 auto;
    font-size: 0.4rem;
    font-weight: 500;
    color: #ffffff;
    text-align: center;
    margin-top: 0.2rem;
  }

  .hf_c_box {
    width: 6.86rem;
    margin: 0 auto;
    /* background: linear-gradient(0deg, #fffefd 72%, #ffeded 85%); */
    background: #fff;
    border-radius: 0.1rem;
    padding: 0.01rem;
  }

  .hf_bg {
    width: 6.47rem;
    height: 1.72rem;
    margin: 0.6rem auto 0 auto;
    background: url(https://y-qiwan.obs.cn-north-4.myhuaweicloud.com:443/qwhz-h5/page/h5_hf/29_hf/hf_bg.png) no-repeat;
    background-size: 100% 100%;
  }

  .old_price {
    font-size: 0.24rem;
    color: #d63428;
    text-align: center;
  }

  .hf_text {
    padding: 0.3rem 0.24rem;
    font-size: 0.2rem;
    color: #a2a2a2;
    line-height: 0.45rem;
  }

  .yhxy {
    color: #ff8400;
  }

  .use_flow {
    width: 6.86rem;
    height: 2.92rem;
    background: url(https://y-qiwan.obs.cn-north-4.myhuaweicloud.com:443/qwhz-h5/page/h5_hf/h5_hf_pay/aw_bg_1.png) no-repeat;
    background-size: 100% 100%;
    margin: 0.22rem auto;
    padding: 0.001rem;
  }

  .flow_img {
    width: 5.42rem;
    height: 0.96rem;
    margin: 1rem auto 0 auto;
  }

  .dw_img {
    width: 0.96rem;
    height: 0.96rem;
  }

  .dw_jt {
    width: 0.66rem;
    height: 0.28rem;
  }

  .flow_content {
    font-size: 0.24rem;
    color: #333333;
    width: 6.38rem;
    height: 0.3rem;
    margin: 0.22rem auto;
  }

  .price_ {
    color: #fe7739;
  }

  .time_style {
    width: 100%;
    display: flex;
    margin-left: 1rem;
    color: #fff;
    height: 0.5rem;
    font-size: 0.3rem;
    align-items: center;
  }

  .block {
    padding: 0 0.1rem;
    text-align: center;
    height: 100%;
    background: #e63323;
    border-radius: 0.07rem;
    color: #fff;
    margin: 0 0.05rem;
    line-height: 1.73;
  }
</style>
