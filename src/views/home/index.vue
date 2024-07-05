<template>
  <div>
    <!-- <Loading /> -->
    <component :is="page" />
    <retentionPopup />
  </div>
</template>

<script lang="ts" setup name="HomePage">
  import { useRouter } from 'vue-router';
  import { useConfigStore } from '/@/store/modules/platform';
  import compEnum from './compEnum';
  import { Toast } from '@nutui/nutui';
  import * as fpModule from '/@/utils/fingerprint';
  // import { getId } from '/@/utils';

  // Get the visitor identifier when you need it.
  const page = ref('');
  const fpPromise = fpModule.load();
  const configStore = useConfigStore();
  const router = useRouter();
  let id = router.currentRoute.value.params.id as string;
  let pageRerenderFlag = '';
  let pageId = '';
  fpPromise
    .then((fp) => fp.get())
    .then((result) => {
      const visitorId = result.visitorId;
      console.log('visitorId', visitorId);
      configStore.setVisitorId(visitorId);
    });

  const template = router.currentRoute.value.params.template as string;
  try {
    pageId = id.split('&').slice(0, 2).join('&');
    pageRerenderFlag = id.split('&').slice(2, 3).join('');
  } catch (e) {}

  //  获取落地页相关配置
  const getPlatformConfig = async () => {
    const res = await configStore.getPlatformConfig(pageId);
    if (res.renderPageValueStr) {
      page.value = compEnum[res.renderPageValueStr];
    } else {
      Toast.text('渲染页面不存在，请检查配置');
    }
  };
  //  渲染类型
  if (id) {
    if (pageRerenderFlag) {
      getPlatformConfig();
    } else {
      page.value = compEnum[template];
      configStore.getPlatformConfig(pageId);
    }
  } else {
    page.value = compEnum[template];
  }
</script>

<style lang="scss" scoped></style>
