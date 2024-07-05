<template>
  <div class="sms-server">
    <nut-form :model-value="formData" ref="ruleForm">
      <div class="form-title">申请退款</div>
      <nut-form-item
        label="手机号码"
        prop="payUserPhone"
        required
        :rules="[
          { required: true, message: '请输入手机号码' },
          { regex: /^1\d{10}$/, message: '请输入正确的手机号' },
        ]"
        :show-error-line="false"
      >
        <input class="nut-input-text" v-model="formData.payUserPhone" placeholder="请输入手机号码" type="text" maxlength="11" />
      </nut-form-item>
      <nut-form-item
        label="商家订单号"
        prop="outTradeNo"
        required
        :rules="[
          { required: true, message: '请输入商家订单号' },
          { regex: /^[A-Za-z0-9]+$/, message: '请输入正确的商家订单号' },
        ]"
        :show-error-line="false"
      >
        <template #label>商家订单号<span class="tips">（请仔细核对订单号）</span></template>
        <input class="nut-input-text" v-model="formData.outTradeNo" placeholder="请输入商家订单号" type="text" />
      </nut-form-item>
      <nut-form-item
        label="交易流水号"
        prop="partyOrderNumber"
        required
        :rules="[
          { required: true, message: '请输入交易流水号' },
          { regex: /^[A-Za-z0-9]+$/, message: '请输入正确的交易流水号' },
        ]"
        :show-error-line="false"
      >
        <template #label>交易流水号<span class="tips">（请仔细核对订单号）</span></template>
        <input class="nut-input-text" v-model="formData.partyOrderNumber" placeholder="请输入交易流水号" type="text" />
      </nut-form-item>

      <nut-form-item label="退款码" prop="code" required :rules="[{ required: true, message: '请输入退款码' }]" :show-error-line="false">
        <template #label>退款码<span class="tips" v-if="!refundCode">（退款码在短信中）</span></template>
        <input class="nut-input-text" v-model="formData.code" placeholder="请输入退款码" type="text" v-if="!refundCode" />
        <nut-input v-model="formData.code" class="refundCode_input" placeholder="请输入退款码" max-length="8" v-else clearable center>
          <template #button>
            <nut-button size="small" type="primary" class="refundCodeBtn" v-if="!resetTime" @click="sendCode" :loading="refundBtnLoading">{{
              refundCodeText
            }}</nut-button>
            <nut-countdown :end-time="refundTimeEnd" ref="CountDown" format="sss" @on-end="refundCodeTimeEnd" v-if="resetTime" />
          </template>
        </nut-input>
      </nut-form-item>
      <nut-form-item
        label="退款说明"
        prop="details"
        required
        :rules="[{ required: true, message: '请输入退款说明' }]"
        :show-error-line="false"
      >
        <input class="nut-input-text" v-model="formData.details" placeholder="请输入退款说明" type="text" />
      </nut-form-item>
      <nut-form-item label="退款截图上传" class="updateImg" required>
        <nut-uploader
          :url="`${platformServer}/admin/upload/oss`"
          v-model:file-list="files"
          accept="image/*"
          method="post"
          ref="uploadRef"
          @success="successUpload"
        />
      </nut-form-item>
      <nut-cell>
        <nut-button type="primary" class="refundBtn" size="small" @click="submit" :loading="submitLoading">提交申请</nut-button>
      </nut-cell>
    </nut-form>
    <div class="see-way" v-if="!bagBox">
      <div class="title">
        <img src="https://y-qiwan.obs.cn-north-4.myhuaweicloud.com:443/qwhz-h5/page/applyRefund/tips.png" alt="" />
        <span> 怎么查看支付宝订单号？</span>
      </div>
      <div style="line-height: 0.4rem; margin-top: 0.1rem; font-size: 0.26rem">
        打开支付宝-我的-账单，找到相应的记录就可以看到账单详情
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { Toast } from '@nutui/nutui';
  import { ref, reactive } from 'vue';
  import { feedbackOrder } from '/@/api';
  import { useRoute } from 'vue-router';

  const platformServer = import.meta.env.VITE_SERVER_URL;
  const route = useRoute();

  const { refundCode, bagBox } = route.query;

  const uploadRef = ref<any>(null);
  const submitLoading = ref<boolean>(false);
  const state = reactive({
    files: [] as any[],
    formData: {
      payUserPhone: '',
      outTradeNo: '',
      partyOrderNumber: '',
      details: '',
      code: '',
    },
    resetTime: false,
    refundTimeEnd: Date.now() + 61 * 1000,
    refundCodeText: '发送退款码',
    refundBtnLoading: false,
  });
  const ruleForm = ref<any>(null);

  const sendCode = () => {
    state.refundBtnLoading = true;
    setTimeout(() => {
      state.resetTime = true;
      state.refundBtnLoading = false;
      Toast.text('发送成功! 请稍侯~');
    }, 2000);
  };
  const refundCodeTimeEnd = () => {
    state.resetTime = false;
    state.refundCodeText = '重新发送';
    state.refundTimeEnd = Date.now() + 61 * 1000;
  };
  const submit = () => {
    ruleForm.value.validate().then(async ({ valid, errors }: any) => {
      if (valid) {
        if (!state.files.length) {
          Toast.text('请上传退款截图');
          return;
        }
        submitLoading.value = true;
        const res = await feedbackOrder({ ...state.formData, detailsImg: state.files[0].url });
        submitLoading.value = false;
        if (res.data.value.code === 200) {
          Toast.text('提交成功');
          uploadRef.value.clearUploadQueue();
          state.formData.payUserPhone = '';
          state.formData.outTradeNo = '';
          state.formData.partyOrderNumber = '';
          state.formData.details = '';
          state.formData.code = '';
        }
      } else {
        console.log('error submit!!', errors);
      }
    });
  };

  const successUpload = ({ responseText }) => {
    try {
      const res = JSON.parse(responseText);
      if (res.code === 200) {
        state.files[0].url = res.msg;
        console.log(state.files);
      }
    } catch (e) {
      console.log('error', e);
    }
  };

  // const beforeUpload = async (file: File[]) => {
  //   const uploadFile = file[0];
  //   const res = await axios.post('https://qwhz.chengduyouzhile.com/qwhz/app/tg/uploadGoodsInfo', { filename: uploadFile.name });
  //   if (res.data.code === 200) {
  //     const reopt = {
  //       method: 'put',
  //       url: res.data.msg,
  //       withCredentials: false,
  //       async: false,
  //       headers: { 'Content-Type': 'text/plain' },
  //       data: uploadFile,
  //     };
  //     console.log(res.data.msg.substr(0, res.data.msg.lastIndexOf('?')));
  //     await axios.request(reopt);
  //     state.files.push({
  //       url: res.data.msg.substr(0, res.data.msg.lastIndexOf('?')),
  //       name: uploadFile.name,
  //       status: 'success',
  //       type: 'image',
  //     });
  //     uploadRef.value.clearUploadQueue();
  //   }
  // };
  const { files, formData, resetTime, refundTimeEnd, refundCodeText, refundBtnLoading } = toRefs(state);
</script>

<style lang="scss" scoped>
  .sms-server {
    padding: 0.2rem 0.32rem;
    background-color: #1dcbc5;
    min-height: 100vh;
    box-sizing: border-box;
    .tips {
      font-size: 0.24rem;
      color: #e92828;
    }
    .refundCode_input {
      width: 100%;
      height: 0.84rem;
      background: none;
      border: none;
      position: relative;
      padding: 0;
    }
    .refundCodeBtn {
      position: absolute;
      right: 0;
      transform: translate(63%, -36%);
      background: #1dcbc5;
    }
    :deep(.nut-button .nut-icon-loading) {
      right: 0;
    }

    :deep(.nut-button .text) {
      margin-left: 0;
    }
    .refundCodeTime {
      position: absolute;
      right: 0;
      transform: translate(63%, -36%);
      width: 0.5rem;
      height: 0.5rem;
      background: #1dcbc5;
      color: #fff;
    }
    :deep(.nut-cell-group__warp) {
      margin: 0;
      border-radius: 0.32rem;
    }
    .nut-cell {
      padding: 0 0.3rem 0.4rem 0.3rem;
      &::after {
        border: 0;
      }
    }
    .form-title {
      font-size: 0.4rem;
      font-weight: 600;
      color: #333333;
      text-align: center;
      margin-bottom: 0.6rem;
      margin-top: 0.4rem;
    }
    .nut-form-item {
      flex-direction: column;
      :deep(.nut-form-item__label) {
        width: 100%;
        font-size: 0.26rem;
      }
      :deep(.nut-form-item__body) {
        padding: 0 0.3rem;
        .nut-input-text {
          height: 0.84rem;
          font-size: 0.3rem;
        }
      }
    }

    :deep(.updateImg .nut-form-item__body__slots) {
      height: 1.8rem;
    }

    .refundBtn {
      // background-color: #4CAF50;
      border: none;
      color: white;
      width: 6.06rem;
      height: 0.8rem;
      background: #1dcbc5;
      border-radius: 0.16rem;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 0.32rem;
      color: #ffffff;
      letter-spacing: 0.02rem;
      margin-top: 0.1rem;
    }
    .see-way {
      padding: 0.2rem 0.4rem;
      margin-top: 0.2rem;
      font-size: 0.28rem;
      color: #ffffff;
      border-radius: 16px;
      border: 0.02rem dashed #cbebea;
      .title {
        display: flex;
        align-items: center;
        img {
          width: 0.26rem;
          height: 0.26rem;
          margin-right: 0.1rem;
        }
      }
    }
  }
</style>
