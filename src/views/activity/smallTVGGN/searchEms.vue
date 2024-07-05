<template>
  <div class="container">
    <div class="tip">正常发货时间：下单后72小时内</div>
    <nut-form :model-value="formData" ref="ruleForm">
      <nut-form-item
        prop="phone"
        :rules="[
          { required: true, message: '*请输入正确格式的手机号码' },
          { regex: /^\d{3}\s{1}\d{4}\s{1}\d{4}$/, message: '*请输入正确格式的手机号码' },
        ]"
      >
        <input
          class="nut-input-text"
          @blur="customBlurValidate('phone')"
          @change="(e: any) => {formData.phone = e.target.value}"
          v-model="formData.phone"
          placeholder="请输入手机号码"
          type="tel"
          maxlength="13"
          v-input-phone
          ref="firstInput"
        />
      </nut-form-item>
      <nut-form-item
        prop="code"
        :rules="[
          { required: true, message: '*请输入正确的验证码' },
          { regex: /^[0-9]{6}$/, message: '*请输入正确的验证码' },
        ]"
        style="margin-top: 0.46rem"
      >
        <input
          class="nut-input-text"
          @blur="customBlurValidate('code')"
          v-model="formData.code"
          placeholder="请输入验证码"
          type="digit"
          maxlength="6"
        />
        <span class="get-code" @click="getCodeHandle">{{
          state.countTime <= 0 || state.countTime === state.initCountDown ? '获取验证码' : `${state.countTime}S后发送`
        }}</span>
      </nut-form-item>
    </nut-form>
    <div class="submit-btn" @click="submit"><img src="@/assets/activity/smallTV/search.png" alt="" />一键查询</div>
    <nut-dialog v-model:visible="state.dialogShow" noFooter>
      <template #header>
        <h5 class="result-title">查询结果</h5>
      </template>
      <template #default>
        <div class="result-card" v-for="(item, index) in state.info" :key="item.logisticsNum">
          <div class="title">
            <h5>运单{{ index + 1 }}</h5>
            <span @click="copy(item)">复制</span>
          </div>
          <span
            >物流名称：<span class="value">{{ item.logisticsName }}</span></span
          >
          <span
            >物流运单号：<span class="value">{{ item.logisticsNum }}</span></span
          >
        </div>
        <span class="tip">复制后可到对应物流商系统平台查询物流详情</span>
        <div class="copy-btn" @click="copyAll">一键复制</div>
        <img src="@/assets/activity/smallTV/btn_gb.png" alt="" class="close-icon" @click="state.dialogShow = false" />
      </template>
    </nut-dialog>
  </div>
</template>

<script lang="ts" setup>
  import { copyText } from 'vue3-clipboard';
  import { Toast } from '@nutui/nutui';
  import { findLogisticsNum, sendTheaterCode } from '/@/api/theatre';
  import { businessDomain } from '/~/config/constant';
  const initCountDown = 60;
  const ruleForm = ref<any>(null);
  const firstInput = ref<any>(null);
  const formData = reactive({
    phone: '',
    code: '',
  });

  const state = reactive({
    disableCode: false,
    countTime: initCountDown,
    initCountDown,
    dialogShow: false,
    info: [{ logisticsName: '', logisticsNum: '' }],
  });

  const customBlurValidate = (prop: string) => {
    ruleForm.value.validate(prop);
  };

  const getCodeHandle = async () => {
    if (state.disableCode || !/^\d{3}\s{1}\d{4}\s{1}\d{4}$/.test(formData.phone)) {
      return;
    }
    state.disableCode = true;
    const res = await sendTheaterCode({ phone: formData.phone.replace(/\s*/g, '') }, businessDomain['xjc'][import.meta.env.MODE]);
    //  调接口获取验证码
    if (res.data.value && res.data.value.content) {
      startCountDown();
    }
  };

  const startCountDown = () => {
    const countDownInter = setInterval(() => {
      state.countTime--;
      if (state.countTime <= 0) {
        clearInterval(countDownInter);
        state.disableCode = false;
        state.countTime = initCountDown;
      }
    }, 1000);
  };

  const submit = () => {
    ruleForm.value.validate().then(async ({ valid, errors }: any) => {
      if (valid) {
        const res = await findLogisticsNum(
          { ...formData, phone: formData.phone.replace(/\s*/g, '') },
          businessDomain['xjc'][import.meta.env.MODE],
        );
        if (res.data.value.content) {
          state.info = res.data.value.content;
          state.dialogShow = true;
        }
      } else {
        console.log('error submit!!', errors);
      }
    });
  };

  const copy = (item) => {
    let val = item.logisticsName + '、' + item.logisticsNum + ';';
    copyText(val, undefined, (error) => {
      if (!error) {
        Toast.text('复制成功~');
      }
    });
  };

  const copyAll = () => {
    let val = '';
    state.info.forEach((item: any) => {
      val = val + item.logisticsName + '、' + item.logisticsNum + ';';
    });
    copyText(val, undefined, (error) => {
      if (!error) {
        Toast.text('复制成功~');
      }
    });
  };

  onMounted(() => {
    firstInput.value.focus();
    document.title = '物流单号查询';
  });
</script>

<style lang="scss" scoped>
  .container {
    width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    background-image: url('/@/assets/activity/smallTV/bg_cxwl.png');
    background-size: 100% auto;
    background-repeat: no-repeat;
    background-color: #f8f0ff;
    position: relative;
    .tip {
      margin-top: 2.1rem;
      color: #b19fc4;
      font-size: 0.27rem;
    }
    .get-code {
      position: relative;
      color: #762bc4;
      font-size: 0.27rem;
      width: 2.5rem;
    }
    .submit-btn {
      width: 5.77rem;
      height: 1.23rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 0.15rem;
      background-color: #762bc4;
      box-shadow: 0rem 0.38rem 0.44rem -0.23rem rgba(119, 42, 196, 0.54);
      font-size: 0.38rem;
      color: #fff;
      margin-top: 1.42rem;
      img {
        width: 0.37rem;
        margin-right: 0.19rem;
      }
    }
    :deep(.nut-cell-group__warp) {
      background-color: transparent;
      margin: 0;
      margin-top: 0.92rem;
    }
    :deep(.nut-form-item__body__slots) {
      background-color: #f4eaff;
      width: 5.77rem;
      height: 1.04rem;
      line-height: 1.04rem;
      border-radius: 0.15rem;
      padding-left: 0.58rem;
      box-sizing: border-box;
      display: flex;
      align-items: center;
    }
    :deep(.nut-form-item) {
      padding: 0;
      background-color: transparent;
    }
    :deep(.nut-form-item__body__tips) {
      font-size: 0.23rem;
      margin-top: 0.1rem;
    }
    :deep(.nut-input-text) {
      font-size: 0.38rem;
      color: #762bc4;
      &::-webkit-input-placeholder {
        color: rgba(118, 43, 196, 0.3);
      }
    }
  }
  .result-title {
    color: #333333;
    font-size: 0.38rem;
    font-weight: bold;
  }
  .result-card {
    width: 90%;
    height: 1.85rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0.38rem;
    box-sizing: border-box;
    background-color: #f5f5f5;
    font-weight: normal;
    line-height: normal;
    margin: 0 auto;
    font-size: 0.29rem;
    &:nth-child(n + 1) {
      margin-top: 0.2rem;
    }
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.1rem;
      width: 100%;
      font-size: 0.26rem;
      span {
        color: #772ac3;
      }
    }
    .value {
      font-weight: bold;
      width: 2.8rem;
      overflow: hidden;
      display: inline-block;
      text-overflow: ellipsis;
      vertical-align: bottom;
      white-space: nowrap;
      text-align: left;
    }
  }
  .tip {
    color: rgba(119, 42, 195, 0.6);
    margin-top: 0.65rem;
    font-size: 0.23rem;
  }
  .copy-btn {
    width: 3.08rem;
    height: 0.85rem;
    line-height: 0.85rem;
    text-align: center;
    background-color: #772ac3;
    color: #fff;
    font-size: 0.29rem;
    margin: 0.19rem auto 0 auto;
    border-radius: 0.5rem;
  }
  .close-icon {
    position: absolute;
    width: 0.62rem;
    top: 0.1rem;
    right: 0.1rem;
  }
</style>
