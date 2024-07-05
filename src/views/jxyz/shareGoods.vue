<template>
  <div class="container">
    <div class="card score-card">
      <div class="title">
        <img :src="title_img" alt="" />
      </div>
      <div class="goods">
        <img class="goods_img" src="https://nginx-beta.oss-cn-chengdu.aliyuncs.com/app/jxyz/static/images/logo.png" alt="" />
        <div class="goods_title">您的好友给您送了一份神秘大礼！</div>
        <div class="goods_detail">快绑定手机号领取吧，领取成功后打开APP即可提取</div>
      </div>
      <div class="content">
        <nut-input
          label="手机号"
          class="put"
          type="tel"
          v-model="phone"
          placeholder="请输入您的手机号"
          placeholder-class="pls"
          maxLength="11"
          :border="false"
        />
        <nut-input
          label="验证码"
          class="put"
          type="tel"
          v-model="authCode"
          placeholder="输入验证码"
          placeholder-class="pls"
          maxLength="6"
          :border="false"
          style="margin-top: 0.3rem"
        >
          <template #button>
            <span v-if="!sendDisable" @click="sendCode" style="color: #d7ea01; font-size: 0.28rem; word-break: keep-all">发送验证码</span>
            <span v-else style="color: #d7ea01; font-size: 0.28rem; word-break: keep-all">{{ sendText }}</span>
          </template>
        </nut-input>
      </div>
    </div>
    <div class="download" @click="downloadHandle">
      <text>前往下载></text>
    </div>
    <img class="receive" :src="lq_img" alt="" @click="getHandle" />
  </div>
</template>

<script lang="ts" setup>
  import { Toast } from '@nutui/nutui';
  import title_img from '/@/assets/jxyz/title.png';
  import lq_img from '/@/assets/jxyz/lq.png';
  import { getAuthCode, giveBoxBindingPhone } from '/@/api/jxyz';
  import { businessDomain, controller } from '/~/config/constant';
  import { getQueryParam } from '/@/utils';
  import router from '/@/router';
  const phoneReg = /^(?:(?:\+|00)86)?1\d{10}$/;
  const state = reactive({
    phone: '',
    disabled: true,
    authCode: '',
    invitationCode: '',
    sendText: '',
    sendDisable: false,
  });
  watch(state, () => {
    if (phoneReg.test(state.phone) && state.authCode) {
      state.disabled = false;
    } else {
      state.disabled = true;
    }
  });
  const sendCode = async () => {
    if (!phoneReg.test(state.phone)) {
      Toast.text('请输入正确的手机号');
      return;
    }
    if (state.sendDisable) return;
    const res = await getAuthCode(
      { telephone: state.phone },
      businessDomain['jxyz'][import.meta.env.MODE],
      controller['jxyz']['getAuthCode'],
    );
    if (res.data.value.code !== 200) {
      Toast.text(res.data.value.message);
      return;
    }
    let expire = 60;
    state.sendDisable = true;
    state.sendText = `${expire}S后再次发送`;
    const timer = setInterval(() => {
      console.log(expire);
      expire--;
      if (expire > 0) {
        state.sendText = `${expire}s后再次发送`;
      } else {
        state.sendDisable = false;
        clearInterval(timer);
      }
    }, 1000);
  };
  const getHandle = async () => {
    const data: any = {
      phone: state.phone,
      authCode: state.authCode,
    };
    if (getQueryParam('giveCode')) {
      data.giveCode = getQueryParam('giveCode');
    }
    if (getQueryParam('invitationCode')) {
      data.invitationCode = getQueryParam('invitationCode');
    }
    const res = await giveBoxBindingPhone(data, businessDomain['jxyz'][import.meta.env.MODE], controller['jxyz']['giveBoxBindingPhone']);
    if (res.data.value.code === 200) {
      Toast.text('领取成功');
      state.phone = '';
      state.authCode = '';
    }
  };
  const downloadHandle = () => {
    router.push('/download/jxyz');
  };
  const { phone, authCode, sendText, sendDisable } = toRefs(state);
</script>

<style lang="scss" scoped>
  .container {
    width: 100vw;
    min-height: 100vh;
    background: #04172c;
    padding: 0.4rem 0.32rem 0 0.32rem;
    box-sizing: border-box;
    position: relative;
    .receive {
      position: absolute;
      width: 5.18rem;
      height: 1.08rem;
      right: 0rem;
      top: 10rem;
    }
    .score-card {
      width: 100%;
      height: 11.12rem;
      background-image: url(/@/assets/jxyz/fx_bg.png);
      background-repeat: no-repeat;
      background-size: cover;
      padding-top: 0.02rem;
    }
    .title {
      width: 6.84rem;
      height: 2.24rem;
      margin-top: 0.32rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .goods {
      width: 100%;
      color: #ffffff;
      flex-direction: column;
      text-align: center;
      .goods_img {
        width: 2rem;
        height: 2rem;
        background: skyblue;
        align-items: center;
        justify-content: center;
        margin: 0.4rem 0;
      }
      .goods_title {
        font-size: 0.36rem;
      }
      .goods_detail {
        font-size: 0.26rem;
        margin: 0.4rem 0;
      }
    }
    .content {
      width: 6.22rem;
      height: 0.8rem;
      margin: 0 auto;

      .put {
        font-size: 0.32rem;
      }
      .pls {
        font-size: 0.28rem;
      }
    }

    :deep(.nut-input) {
      margin-left: 0.5rem;
      border-radius: 0;
      background: rgba(255, 255, 255, 0);
      background-image: url(/@/assets/jxyz/kuang.png);
      background-repeat: no-repeat;
      background-size: cover;
      width: 100%;
      font-size: 0.31rem;
      color: #fff;
      font-weight: bold;
      padding: 0 0.34rem;
      height: 0.85rem;
      line-height: 0.85rem;
      margin: 0;
    }
    .download {
      text-align: center;
      font-size: 0.3rem;
      color: #d7ea01;
      margin-top: 0.84rem;
      text {
        text-decoration: underline;
      }
    }
  }
</style>
