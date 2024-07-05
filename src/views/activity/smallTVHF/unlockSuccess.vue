<template>
  <div class="container">
    <img src="@/assets/activity/smallTVHF/unlockSuccess.png" alt="" class="unlockSuccess" />
    <div class="bottom-container">
      <p>为了福利精准送达，建议输入手机号</p>
      <div class="input-phone">
        <span class="label">手机号码</span>
        <input
          class="nut-input-text"
          @change="(e: any) => {formData.phone = e.target.value}"
          v-model="formData.phone"
          placeholder="请输入手机号码"
          type="tel"
          maxlength="13"
          v-input-phone
        />
      </div>
      <img src="@/assets/activity/smallTVHF/btn_ljdh.png" class="nowGet" alt="" @click="submitHandle" />
    </div>
    <sideBarActivity
      :type="2"
      style="top: 2.75rem"
      :itemStyle="{
        color: '#845e07',
        background: '#e9d6ad',
        border: '0px',
        padding: '0.06rem 0.12rem',
        fontSize: '0.24rem',
        boxShadow: '1px 1px 4px 1px #958888',
        marginTop: '0.2rem',
      }"
    />
  </div>
</template>

<script lang="ts" setup>
  import { exchangePhoneFavourable } from '/@/api/theatre';
  import router from '/@/router';
  import { useConfigStore } from '/@/store/modules/platform';
  import { useTVStore } from '/@/store/modules/smallTV';
  import { businessDomain } from '/~/config/constant';
  import { Toast } from '@nutui/nutui';

  const configStore = useConfigStore();
  const tvStore = useTVStore();
  const info = computed(() => {
    return configStore.info;
  });
  const formData = reactive({
    phone: '',
  });
  const submitHandle = async () => {
    if (!/^1\d{2}\s{1}\d{4}\s{1}\d{4}$/.test(formData.phone)) {
      Toast.text('请输入正确的手机号码格式');
      return;
    }
    const res = await exchangePhoneFavourable(
      { phone: formData.phone.replace(/\s*/g, ''), openId: tvStore.openId },
      businessDomain[info.value.applyIdentification][import.meta.env.MODE],
    );
    if (res.data.value) {
      router.push('/activity/smallTVHF/download');
    }
  };
</script>

<style lang="scss" scoped>
  .container {
    background-image: url('/@/assets/activity/smallTVHF/bg200.png');
    background-size: 100% auto;
    background-repeat: no-repeat;
    background-color: #e0c38f;
    width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    color: #5b5c5e;
    font-size: 0.27rem;
    .unlockSuccess {
      width: 6.27rem;
      margin-top: 1.18rem;
    }
    .bottom-container {
      margin-top: 5.95rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      .input-phone {
        display: flex;
        align-items: center;
        margin-top: 0.38rem;
        .label {
          color: #5b5c5e;
          margin-right: 0.25rem;
        }
        .nut-input-text {
          width: 4.42rem;
          height: 0.75rem;
          line-height: 0.75rem;
          border-radius: 0.15rem;
          padding: 0 0.29rem;
          box-sizing: border-box;
          color: #5b5c5e;
          font-weight: bold;
          &::-webkit-input-placeholder {
            color: #ddc194;
          }
        }
      }
      .nowGet {
        width: 6.1rem;
        margin-top: 0.51rem;
      }
    }
  }
</style>
