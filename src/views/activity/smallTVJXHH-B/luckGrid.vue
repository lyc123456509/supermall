<template>
  <div class="container">
    <img src="@/assets/activity/smallTVJXHH/cj_bt.png" alt="" style="width: 7.19rem; margin-top: 0.82rem" />
    <img src="@/assets/activity/smallTVJXHH/icon_wait.png" alt="" class="wait" @click="goOrderList" />
    <div class="box_show">
      <img src="@/assets/activity/smallTVJXHH/small_box.png" alt="" />
      <span
        ><span class="num">{{ list.length }}个</span>好物 随你开!</span
      >
    </div>
    <div class="goods_info" v-if="list.length > 0">
      <div class="tips">大奖等你开</div>
      <img :src="list[0].pictureUrl" alt="" />
      <div class="goods_box_rl">
        <div class="title">{{ list[0].goodsMsg }}</div>
        <span>{{ list[0].probability }}%</span>
      </div>
    </div>
    <main class="list_box" v-if="list.length > 0">
      <div class="goods_item" v-for="goodsItem in list.slice(1)" :key="goodsItem.id">
        <div class="imgBox">
          <img :src="goodsItem.pictureUrl" alt="" />
        </div>
        <div class="goodInfo">
          <div class="title">{{ goodsItem.goodsMsg }}</div>
          <div>{{ goodsItem.probability }}%</div>
        </div>
      </div>
    </main>
    <footer>
      <div class="btn" @click="startCallback">立即开启</div>
    </footer>
    <sideBarActivity
      :type="5"
      style="top: 0.75rem"
      :itemStyle="{
        color: '#000',
        background: '#e9d6ad',
        border: '0px',
        padding: '0.06rem 0.22rem',
        fontSize: '0.24rem',
        boxShadow: '1px 1px 4px 1px #958888',
        marginTop: '0.2rem',
      }"
    />
    <nut-dialog v-model:visible="state.bindPhoneDialog" title="抽奖机会查询" :noFooter="true" popClass="bind-dialog">
      <nut-form :model-value="formData" ref="ruleForm">
        <div class="title">- 手机号验证 -</div>
        <nut-form-item
          label="手机号："
          prop="phone"
          :rules="[
            { required: true, message: '*请输入正确格式的手机号码' },
            { regex: /^(1\d{2}\s{1}\d{4}\s{1}\d{4})|(1\d{10})$/, message: '*请输入正确格式的手机号码' },
          ]"
        >
          <input
            class="nut-input-text"
            @blur="customBlurValidate('phone')"
            @change="(e: any) => { formData.phone = e.target.value }"
            v-model="formData.phone"
            placeholder="请输入手机号码"
            type="tel"
            maxlength="13"
            v-input-phone
          />
        </nut-form-item>
        <nut-form-item
          label="验证码："
          prop="verifyCode"
          :rules="[
            { required: true, message: '*请输入正确格式的验证码' },
            { regex: /^\d{6}$/, message: '*请输入正确格式的验证码' },
          ]"
        >
          <input
            class="nut-input-text input-code"
            @blur="customBlurValidate('verifyCode')"
            @change="(e: any) => { formData.verifyCode = e.target.value }"
            v-model="formData.verifyCode"
            placeholder="请输入验证码"
            type="tel"
            maxlength="6"
          />
          <nut-countdown
            ref="countDownRef"
            class="code-abs"
            :endTime="state.endTime"
            @on-end="countDownEnd"
            format="sss"
            v-if="state.showCountDown"
          />
          <span class="get-code code-abs" v-else @click="getCodeHandle">获取验证码</span>
        </nut-form-item>
        <div class="bind-btn" @click="bindPhoneHandle">一键查询</div>
      </nut-form>
    </nut-dialog>
  </div>
</template>

<script lang="ts" setup>
  import router from '/@/router';
  import { bindingSpringFrame, phoneVerificationQuery, raffleprobability, sendTheaterCode } from '/@/api/theatre';
  import { getGoods } from '/@/api/bagBox';
  import { useTVStore } from '/@/store/modules/smallTV';
  import { businessDomain } from '/~/config/constant';
  import { Toast } from '@nutui/nutui';
  const tvStore = useTVStore();
  const state = reactive({
    stopIndex: 0,
    prizeGoods: {},
    listUrl: [],
    list: [] as any[], // 商品数据
    bindPhoneDialog: false, //
    endTime: Date.now() + 60 * 1000,
    showCountDown: false,
  });
  const formData = reactive({
    phone: '',
    verifyCode: '',
  });
  const ruleForm = ref<any>(null);
  const countDownRef = ref(null);
  const init = async () => {
    const listRes = await getGoods({ currentPage: 1, pageSize: 50 }, businessDomain['jxhh'][import.meta.env.MODE]);
    state.list = listRes.data.value.rows;
  };
  init();
  //  查询是否绑定手机
  const isBindPhone = async () => {
    const res = await bindingSpringFrame(
      { openId: sessionStorage.getItem('openId'), type: 'jxhh' },
      businessDomain['jxhh'][import.meta.env.MODE],
    );
    if (res.data.value.content) {
      state.bindPhoneDialog = !res.data.value.content.unbound;
    }
  };

  watch(
    () => tvStore.openId,
    (val) => {
      if (val) {
        isBindPhone();
      }
    },
    { immediate: true },
  );
  // 失去焦点校验
  const customBlurValidate = (prop: string) => {
    ruleForm.value.validate(prop);
  };

  //  获取验证码
  const getCodeHandle = async () => {
    if (!ruleForm.value.validate) {
      return;
    }
    const res = await sendTheaterCode(
      { phone: formData.phone.replace(/\s*/g, ''), type: 'jxhh' },
      businessDomain['jxhh'][import.meta.env.MODE],
    );
    //  调接口获取验证码
    if (res.data.value && res.data.value.content) {
      state.endTime = Date.now() + 60 * 1000;
      state.showCountDown = true;
    }
  };

  //  绑定手机
  const bindPhoneHandle = async () => {
    ruleForm.value.validate().then(async ({ valid, errors }: any) => {
      if (valid) {
        Toast.loading('查询中，请稍候...');
        const res = await phoneVerificationQuery(
          {
            wxOpenId: sessionStorage.getItem('openId'),
            phone: formData.phone.replace(/\s*/g, ''),
            code: formData.verifyCode,
            type: 'jxhh',
          },
          businessDomain['jxhh'][import.meta.env.MODE],
        );
        Toast.hide();
        if (res.data.value.content?.luckDraw) {
          Toast.text('查询成功，可正常开启盲盒');
          state.bindPhoneDialog = false;
        } else {
          Toast.text('此手机号并未支付盲盒抽奖订单');
        }
      } else {
        console.log(formData);
        console.log('error submit!!', errors);
      }
    });
  };
  //  倒计时结束
  const countDownEnd = () => {
    state.showCountDown = false;
  };

  const startCallback = async () => {
    Toast.loading('请稍候...', {
      id: 'loading',
      duration: 0,
      cover: true,
    });
    const res = await raffleprobability(
      { code: sessionStorage.getItem('openId'), type: 1, appType: 2 },
      businessDomain['jxhh'][import.meta.env.MODE],
    );
    Toast.hide('loading');
    const content = res.data.value.content;
    if (content) {
      if (!content.luckDraw) {
        Toast.text('您暂无抽奖机会');
        return;
      } else {
        if (!content.prizeGoods) {
          Toast.text('暂无库存，补货中...');
          return;
        } else {
          state.prizeGoods = content.prizeGoods;
          state.stopIndex = state.listUrl.findIndex((item: any) => item.id === content.prizeGoods.id);
        }
      }
    }
    tvStore.setPrizeGoods(state.prizeGoods);
    router.push('/activity/smallTVJXHH-B/submitInfo');
  };

  const goOrderList = () => {
    router.push('/activity/smallTVJXHH-B/orderList');
  };

  const { list } = toRefs(state);
</script>

<style lang="scss" scoped>
  .container {
    background-image: url('/@/assets/activity/smallTVJXHH/cj_bg.png');
    background-size: 100% auto;
    background-repeat: no-repeat;
    background-color: #371173;
    width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    .wait {
      position: fixed;
      top: 0.19rem;
      left: 0;
      width: 1.15rem;
      z-index: 1;
    }
    .box_show {
      display: flex;
      width: 100%;
      height: 4.5rem;
      flex-direction: column;
      align-items: center;
      img {
        width: 3.84rem;
        height: 3.84rem;
        animation: shake 1.5s linear infinite;
      }
      span {
        font-size: 0.32rem;
        font-family: PingFang SC;
        font-weight: 600;
        color: #fbe62e;
      }
      .num {
        color: #ff4e0a;
      }
    }
    .goods_info {
      position: relative;
      width: 5.4rem;
      height: 1.72rem;
      background: #ffffff;
      border-radius: 8px;
      padding: 0.24rem;
      display: flex;
      img {
        width: 1.24rem;
        height: 1.24rem;
        align-self: center;
      }
      .tips {
        position: absolute;
        top: 0;
        right: 0;
        width: 1.5rem;
        height: 0.42rem;
        background: #ff4e0a;
        border-radius: 4px;
        font-size: 0.21rem;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffffff;
        text-align: center;
        line-height: 0.42rem;
      }
      .goods_box_rl {
        margin: 0.4rem 0 0 0.2rem;
        .title {
          font-size: 0.36rem;
          font-weight: bold;
        }
        span {
          display: block;
          margin-top: 0.15rem;
        }
      }
    }
    .list_box {
      width: calc(5.4rem + 0.45rem);
      display: flex;
      flex-wrap: wrap;
      margin-top: 0.15rem;
      padding-bottom: 2rem;
      .goods_item {
        box-sizing: border-box;
        margin-right: 0.15rem;
        margin-top: 0.15rem;
        width: 1.84rem;
        height: 2.48rem;
        background: #ffffff;
        border-radius: 2px;
        display: flex;
        flex-direction: column;
        align-items: center;
        align-self: flex-end;
        padding: 0.1rem;
        &:nth-child(3n) {
          margin-right: 0;
        }
        .imgBox {
          width: 1.56rem;
          height: 1.56rem;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            width: 80%;
            height: 80%;
          }
        }

        .goodInfo {
          margin-top: 0.1rem;
          width: 1.56rem;
          flex: 1;
          font-size: 0.22rem;
          font-family: PingFang SC;
          font-weight: 400;
          color: #b3b3b3;
          display: flex;
          justify-content: flex-end;
          flex-direction: column;
          .title {
            color: #180b1f;
            display: -webkit-box;
            overflow: hidden;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
          }
        }
      }
    }
    footer {
      width: 100vw;
      height: 1.86rem;
      background: #2b0960;
      position: fixed;
      bottom: 0;
      display: flex;
      justify-content: center;
      .btn {
        height: 90%;
        width: 90%;
        background: url(/src/assets/activity/smallTVJXHH/small_btn.png) no-repeat;
        background-size: 100% 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.4rem;
        font-family: PingFang SC;
        font-weight: 600;
        color: #fbe62e;
        animation: btnAnl 1.5s linear infinite;
      }
    }
    .sidebar_hint {
      position: fixed;
      right: 0;
      top: 0.54rem;
      height: 3.26rem;
      font-size: 0.24rem;
      color: #333;
      z-index: 10;
      width: 1.62rem;
      height: 0.47rem;
    }
  }
  .popclass {
    .rule_mod {
      display: flex;
      flex-direction: column;
      width: 5.4rem;
      max-height: 8rem;
      padding: 0.4rem 0.2rem;
      line-height: 1.7;
    }

    .rule-title {
      text-align: center;
    }

    .rule_content {
      overflow-y: auto;
      white-space: pre-wrap;
    }
  }

  @keyframes btnAnl {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
  }

  @keyframes shake {
    0%,
    100% {
      -webkit-transform: translateX(0), rotate(90deg);
      transform: translate(0), rotate(90deg);
    }

    10% {
      -webkit-transform: translateX(-9px), rotate(30deg);
      transform: translate(-9px);
    }
    20% {
      -webkit-transform: translateX(8px);
      transform: translate(8px);
    }
    30% {
      -webkit-transform: translateX(-7px);
      transform: translate(-7px);
    }
    40% {
      -webkit-transform: translateX(6px);
      transform: translate(6px);
    }
    50% {
      -webkit-transform: translateX(-5px);
      transform: translate(-5px);
    }
    60% {
      -webkit-transform: translateX(4px);
      transform: translate(4px);
    }
    70% {
      -webkit-transform: translateX(-3px);
      transform: translate(-3px);
    }
    80% {
      -webkit-transform: translateX(2px);
      transform: translate(2px);
    }
    90% {
      -webkit-transform: translateX(-1px);
      transform: translate(-1px);
    }
  }
</style>

<style lang="scss">
  .bind-dialog {
    background-color: #5a1f93;
    .nut-cell,
    .nut-cell-group__warp {
      background-color: transparent;
    }
    .nut-dialog {
      padding: 0.3rem 0 0.2rem 0;
    }
    .nut-dialog__content {
      margin: 0;
      max-height: 80vh;
    }
    .nut-form-item__label {
      margin-top: 0.22rem;
      width: 1.2rem;
      font-size: 0.27rem;
      color: #dbb7ff;
    }
    .nut-form-item__body__slots {
      background-color: #7130b1;
      border-radius: 0.15rem;
      color: #dbb7ff;
    }
    .nut-input-text {
      color: #dbb7ff;
    }
    .nut-form-item__body__tips {
      margin-top: 0.1rem;
      font-size: 0.21rem;
      color: #fbe52e;
      font-weight: normal;
    }
    .nut-cell-group .nut-cell::after {
      border: 0;
    }
    .nut-dialog__header {
      text-align: left;
      color: #dbb7ff;
      padding-left: 0.5rem;
      box-sizing: border-box;
      font-size: 0.27rem;
    }
    .title {
      color: #dbb7ff;
      font-size: 0.38rem;
      font-weight: 600;
      // margin-bottom: 0.6rem;
      line-height: normal;
    }
    .bind-btn {
      background: linear-gradient(90deg, #f84d3c 0%, #ffb071 100%);
      box-shadow: 0rem 0rem 0rem 0rem rgba(248, 77, 60, 0.29);
      font-size: 0.31rem;
      color: #fff;
      width: 4.92rem;
      height: 0.69rem;
      line-height: 0.69rem;
      text-align: center;
      box-sizing: border-box;
      margin: auto;
      border-radius: 0.35rem;
      margin-top: 0.37rem;
    }
    .code-abs {
      position: absolute;
      right: 0.5rem;
      top: 0.3rem;
      color: #fff;
      font-size: 0.21rem;
      font-weight: normal;
    }
  }
</style>
