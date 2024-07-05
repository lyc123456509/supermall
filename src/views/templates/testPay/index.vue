<template>
  <div class="container">
    <div @click="payHandle">下单测试Href</div>
    <div @click="useReplacePayHandle">下单测试Replace</div>
    <div @click="useFormPayHandle">下单测试表单</div>
    <div @click="jump">跳转测试</div>
  </div>
</template>

<script setup lang="ts">
  import useCheckOrder from '/@/hooks/useCheckOrder';
  import { PayCenter } from '/@/utils/pay';
  import Url from 'domurl';

  const href = new Url(window.location.href);
  href.query.phone = 'bb';
  console.log(href.toString());
  const payHandle = () => {
    new PayCenter('kkz').pay({
      phone: '15928744355',
      randomMoney: 0.1,
    });
  };

  const useReplacePayHandle = () => {
    new PayCenter('kkz').pay({
      phone: '15928744355',
      randomMoney: 0.1,
      submitType: 'replace',
    });
  };

  const useFormPayHandle = () => {
    new PayCenter('kkz').pay({
      phone: '15928744355',
      randomMoney: 0.1,
      submitType: 'form',
    });
  };

  // const div = document.createElement('div');
  // div.addEventListener('click', () => {
  //   window.location.href = 'https://work.weixin.qq.com/kfid/kfc4ac578c2a798b992';
  // });
  // div.click();
  // div.remove();

  // window.location.href = 'https://work.weixin.qq.com/kfid/kfc4ac578c2a798b992';
  const jump = () => {
    window.location.href = 'https://work.weixin.qq.com/kfid/kfc4ac578c2a798b992';
    window.location.href = 'https://work.weixin.qq.com/kfid/kfc4ac578c2a798b992';
    window.location.href = 'https://work.weixin.qq.com/kfid/kfc4ac578c2a798b992';
    // window.open('https://work.weixin.qq.com/kfid/kfc4ac578c2a798b992');
  };
  useCheckOrder();
</script>

<style lang="scss" scoped>
  .container {
    font-size: 0.3rem;
    div {
      text-align: center;
      margin-top: 0.4rem;
    }
  }
</style>
