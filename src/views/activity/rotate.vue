<template>
  <iframe
    ref="myiframe"
    width="100%"
    height="100vh"
    src="https://portal-h5.hiparty.fun/smallTV2/1597530104722886658&1597529830725910530?a_oId=m1234567890"
    frameborder="0"
  ></iframe>
</template>

<script lang="ts" setup>
  const myiframe = ref(null);

  onMounted(() => {
    myiframe.value && ((myiframe.value as unknown as any).height = document.documentElement.clientHeight);
  });
</script>
<!-- <template>
  <div class="container">
    <div class="card score-card">
      <div class="header">
        <span>88</span>
        <span class="tip">(验证手机号即可查询）</span>
      </div>
      <div class="content">
        <nut-input type="tel" v-model="phone" placeholder="请输入您的手机号" maxLength="11" :border="false" />
        <nut-input type="tel" v-model="code" placeholder="输入验证码" maxLength="6" :border="false" style="margin-top: 0.3rem">
          <template #button>
            <span v-if="!sendDisable" @click="sendCode" style="color: #f10c17; font-size: 0.27rem; word-break: keep-all">发送验证码</span>
            <span v-else style="color: #f10c17; font-size: 0.27rem; word-break: keep-all">{{ sendText }}</span>
          </template>
        </nut-input>
        <img :src="btn_yjdh_no" alt="" class="btn-submit" v-if="disabled" />
        <img :src="btn_yjdh_yes" alt="" class="btn-submit" v-else />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { Toast } from '@nutui/nutui';
  import btn_yjdh_no from '/@/assets/activity/rotate/btn_yjdh_no.png';
  import btn_yjdh_yes from '/@/assets/activity/rotate/btn_yjdh_yes.png';
  const phoneReg = /^(?:(?:\+|00)86)?1\d{10}$/;
  const state = reactive({
    phone: '',
    disabled: true,
    code: '',
    sendText: '',
    sendDisable: false,
  });
  watch(state, () => {
    if (phoneReg.test(state.phone) && state.code) {
      state.disabled = false;
    } else {
      state.disabled = true;
    }
  });
  const sendCode = () => {
    if (!phoneReg.test(state.phone)) {
      Toast.text('请输入正确的手机号');
      return;
    }
    if (state.sendDisable) return;
    let expire = 6;
    state.sendDisable = true;
    state.sendText = `${expire}S后再次发送`;
    const timer = setInterval(() => {
      console.log(expire);
      expire--;
      if (expire > 0) {
        state.sendText = `${expire}S后再次发送`;
      } else {
        state.sendDisable = false;
        clearInterval(timer);
      }
    }, 1000);
  };
  const { phone, disabled, code, sendText, sendDisable } = toRefs(state);
</script>

<style lang="scss" scoped>
  .container {
    width: 100vw;
    min-height: 100vh;
    background-image: url(/@/assets/activity/rotate/bg.png);
    background-repeat: no-repeat;
    background-size: contain;
    background-color: #fe404a;
    padding: 3.57rem 0.31rem 0.57rem 0.31rem;
    box-sizing: border-box;
    .score-card {
      border-radius: 0.31rem;
      width: 100%;
      .header {
        background-image: url(/@/assets/activity/rotate/bg1.png);
        background-repeat: no-repeat;
        background-size: cover;
        height: 1.84rem;
        width: 100%;
        color: #fff;
        font-size: 0.37rem;
        box-sizing: border-box;
        padding-left: 2.2rem;
        padding-top: 0.38rem;
        .tip {
          font-size: 0.23rem;
          opacity: 0.5;
          margin-left: 0.3rem;
        }
      }
      .content {
        background-color: #fff;
        padding: 0.4rem 0.29rem 0.22rem 0.29rem;
        margin-top: -0.7rem;
        border-radius: 0.31rem;
        .btn-submit {
          width: 100vw;
          margin-left: -0.6rem;
        }
      }
    }
    :deep(.nut-input) {
      width: 100%;
      background: #ffeded;
      font-size: 0.31rem;
      color: #f10c17;
      font-weight: bold;
      padding: 0 0.24rem;
      height: 0.85rem;
      line-height: 0.85rem;
      margin: 0;
    }
  }
</style> -->
