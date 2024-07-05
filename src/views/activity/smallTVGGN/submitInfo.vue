<template>
  <div class="container">
    <img src="@/assets/activity/smallTV/img_gxcz.png" alt="" style="width: 6.77rem; margin-top: 0.54rem" />
    <div class="product">
      <img :src="prizeGoods.pictureUrl" alt="" style="height: 1.54rem; margin-right: 0.38rem" />
      <div class="text">
        <div class="title">{{ prizeGoods.goodsMsg }}</div>
        <div class="price-sku">
          <span
            >市场价：<span style="color: #ff5050; font-size: 0.35rem">¥{{ prizeGoods.marketPrice }}</span></span
          >
          <span>x1</span>
        </div>
      </div>
    </div>
    <nut-form :model-value="formData" ref="ruleForm">
      <div class="form-title">填写收货信息</div>
      <nut-form-item label="收件人姓名：" prop="reciver" :rules="[{ required: true, message: '*请输入收件人姓名' }]">
        <input
          class="nut-input-text"
          @blur="customBlurValidate('reciver')"
          v-model="formData.reciver"
          placeholder="请输入姓名"
          maxlength="10"
          type="text"
        />
      </nut-form-item>
      <nut-form-item
        label="收件人电话："
        prop="phone"
        :rules="[
          { required: true, message: '*请输入正确格式的手机号码' },
          { regex: /^1\d{2}\s{1}\d{4}\s{1}\d{4}$/, message: '*请输入正确格式的手机号码' },
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
        />
      </nut-form-item>
      <nut-form-item
        label="收件人地区："
        prop="areaCode"
        :rules="[{ required: true, message: '*请选择地区', validator: () => formData.areaCode.length }]"
      >
        <div @click="addressPop = true">
          <span v-if="formData.areaCode.length" style="color: #fff">{{ formData.areaCode.join('/') }}</span>
          <span v-else>请选择省/市/区县</span>
        </div>
        <nut-cascader
          v-model:visible="addressPop"
          v-model="formData.areaCode"
          :options="cityData"
          value-key="value"
          text-key="label"
          children-key="children"
          :closeable="false"
        />
      </nut-form-item>
      <nut-form-item label="详细地址：" prop="address" :rules="[{ required: true, message: '*请输入地址' }]">
        <input class="nut-input-text" v-model="formData.address" placeholder="请输入街道、楼栋号详细地址" type="text" maxlength="50" />
      </nut-form-item>
      <div class="submit-btn" @click="submit">提交</div>
      <!-- <nut-cell>
        <nut-button type="primary" size="small" style="margin-right: 10px" @click="submit">提交</nut-button>
      </nut-cell> -->
    </nut-form>
  </div>
</template>
<script lang="ts" setup>
  import cityJSON from './city.json';
  import router from '/@/router';
  import { useTVStore } from '/@/store/modules/smallTV';
  const tvStore = useTVStore();
  const formData = reactive({
    reciver: '',
    phone: '',
    areaCode: [],
    address: '',
  });
  const state = reactive({
    addressPop: false,
    cityData: cityJSON.data,
    prizeGoods: tvStore.prizeGoods,
  });
  const ruleForm = ref<any>(null);

  const submit = () => {
    ruleForm.value.validate().then(({ valid, errors }: any) => {
      if (valid) {
        tvStore.setUser({ ...formData, phone: formData.phone.replace(/\s*/g, '') });
        router.push('/activity/smallTVGGN/payEms');
      } else {
        console.log(formData);
        console.log('error submit!!', errors);
      }
    });
  };
  // 失去焦点校验
  const customBlurValidate = (prop: string) => {
    ruleForm.value.validate(prop);
  };
  const { addressPop, cityData, prizeGoods } = toRefs(state);
</script>

<style lang="scss" scoped>
  .container {
    background-image: linear-gradient(180deg, #7729c4 0%, #110419 20%, #110419 100%);
    background-color: #110419;
    width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    :deep(.nut-cell-group__warp),
    :deep(.nut-cell) {
      background-color: transparent;
    }
    :deep(.nut-cell-group__warp) {
      margin: 0;
    }
    :deep(.nut-cell) {
      padding: 0;
      &::after {
        border-bottom: 0px;
      }
    }
    .product {
      display: flex;
      flex-direction: row;
      color: #fff;
      font-size: 0.29rem;
      width: 6.5rem;
      margin-top: 0.42rem;
      .text {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1;
        .price-sku {
          display: flex;
          justify-content: space-between;
        }
      }
    }
    .nut-form {
      width: 6.6rem;
      background-color: #5a1f93;
      border-radius: 0.15rem;
      margin-top: 0.6rem;
      font-size: 0.27rem;
      color: #dbb7ff;
      :deep(.nut-cell) {
        color: #dbb7ff;
        height: 1.33rem;
      }
      :deep(.nut-form-item__label) {
        margin-top: 0.3rem;
        text-align: right;
      }
      :deep(.nut-form-item__body__slots) {
        background-color: #7130b1;
      }
      :deep(.nut-form-item__body__tips),
      .error-tips {
        color: #fbe52e;
        font-size: 0.23rem;
        margin-top: 0.1rem;
      }
      :deep(.nut-input-text) {
        color: #fff;
      }
      .form-title {
        color: #dbb7ff;
        font-size: 0.29rem;
        margin-top: 0.38rem;
        text-align: center;
        margin-bottom: 0.38rem;
      }
      .submit-btn {
        background-image: url(/@/assets/activity/smallTV/btn_tj.png);
        width: 100%;
        height: 2.08rem;
        line-height: 1.78rem;
        text-align: center;
        background-size: 100% auto;
        font-size: 0.38rem;
        color: #fff;
      }
    }
  }
</style>
