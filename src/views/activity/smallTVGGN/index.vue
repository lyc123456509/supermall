<template>
  <component :is="page" />
</template>

<script lang="ts" setup>
  import { useRoute } from 'vue-router';
  import { getQueryParam, isWx } from '/@/utils';
  import { appid } from './config';
  import { useConfigStore } from '/@/store/modules/platform';
  import { useTVStore } from '/@/store/modules/smallTV';
  import { getWxOpenid } from '/@/api';
  import { businessDomain, controller } from '/~/config/constant';
  const configStore = useConfigStore();
  const tvStore = useTVStore();
  const route = useRoute();
  const compEnum = {
    luckGrid: defineAsyncComponent(() => import('./luckGrid.vue')),
    submitInfo: defineAsyncComponent(() => import('./submitInfo.vue')),
    payEms: defineAsyncComponent(() => import('./payEms.vue')),
    payEmsSuccess: defineAsyncComponent(() => import('./payEmsSuccess.vue')),
    searchEms: defineAsyncComponent(() => import('./searchEms.vue')),
    wxAppRedirct: defineAsyncComponent(() => import('./wxAppRedirct.vue')),
  };
  const page = ref(compEnum[(route.params.pageName as string) || 'luckGrid']);
  watch(
    () => route.params.pageName,
    () => {
      page.value = compEnum[route.params.pageName as string];
    },
  );
  //  符合微信公众号获取code流程
  if (!sessionStorage.getItem('openId')) {
    if (!getQueryParam('code') && isWx()) {
      const redirect_uri = encodeURIComponent(window.location.href);
      const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_base#wechat_redirect`;
      window.location.href = url;
    }
    if (getQueryParam('code') && isWx()) {
      getWxOpenid(
        { appId: appid, code: getQueryParam('code') },
        businessDomain['xjc'][import.meta.env.MODE],
        controller['xjc']['getWxOpenid'],
      ).then((res) => {
        if (res.data.value) {
          tvStore.setOpenId(res.data.value);
        }
      });
    }
  }
  //  配置微信支付相关参数，方便调用封装好的支付类
  configStore.setConfig({
    ...configStore.info,
    wxPayType: 'wechat_pay',
    wxAppId: appid,
  });
</script>
