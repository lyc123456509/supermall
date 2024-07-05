<template>
  <div class="pre-container">
    <div class="card">
      <p>话费充值券包</p>
      <p
        ><span>{{ info.phoneData.cssClass }}</span
        >元</p
      >
      <p>有效期：{{ dateText }}</p>
      <div class="nowGet" @click="btnHandle">立即领取</div>
      <span>本话费券包由{{ info.appName }}提供</span>
    </div>
    <div class="rule">
      <p>规则</p>
      <div
        >1.三网手机号均可使用<br />2.刷单等行为均视为违规操作，平台有权拒绝发放<br />3.详细规则以活动页面为主<br />4.更多疑问可咨询客服</div
      >
    </div>
    <div class="recordNum">{{ JSON.parse(info.domainValue).recordNumber }}</div>
  </div>
</template>
<script lang="ts" setup>
  import moment from 'moment';
  import { useConfigStore } from '/@/store/modules/platform';
  const configStore = useConfigStore();
  const info = computed(() => {
    return configStore.info;
  });
  const emitFun = defineEmits(['changeStep']);
  const dateText = computed(() => {
    return `${moment().format('YYYY-MM-DD')} ~ ${moment().format('YYYY-MM-DD')}`;
  });
  const btnHandle = () => {
    emitFun('changeStep', { step: 2 });
  };
</script>

<style lang="scss" scoped>
  .pre-container {
    background-color: #2c8dff;
    padding: 0.44rem 0.36rem 0 0.36rem;
    min-height: 100vh;
    box-sizing: border-box;
    .card {
      width: 100%;
      height: 4.5rem;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 0.42rem;
      padding-top: 0.3rem;
      border-top: 5px solid #afd1f2;
      p {
        font-weight: bold;
        &:nth-child(2) {
          margin-top: 0.2rem;
          span {
            font-size: 0.6rem;
            color: #000;
          }
        }
        &:nth-child(3) {
          font-size: 0.24rem;
          margin-top: 0.4rem;
        }
      }
      .nowGet {
        background-color: #2c8dff;
        width: 80%;
        height: 0.8rem;
        text-align: center;
        line-height: 0.8rem;
        color: #fff;
        margin-top: 0.4rem;
      }
      span {
        color: #999;
        font-size: 0.24rem;
        margin-top: 0.4rem;
      }
    }

    .rule {
      margin-top: 0.4rem;
      p {
        color: #fff;
        font-size: 0.28rem;
      }
      div {
        font-size: 0.24rem;
        color: hsla(0, 0%, 100%, 0.7);
        margin-top: 0.05rem;
        line-height: 0.46rem;
      }
    }

    .recordNum {
      font-size: 0.26rem;
      position: fixed;
      bottom: 4rem;
      left: 50%;
      transform: translateX(-50%);
      color: hsla(0, 0%, 100%, 0.7);
    }
  }
</style>
