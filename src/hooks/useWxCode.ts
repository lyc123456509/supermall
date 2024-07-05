import { useConfigStore } from '/@/store/modules/platform';
import { getQueryParam, isWx } from '/@/utils/index';

const useWxCode = () => {
  const code = ref(getQueryParam('code'));
  const configStore = useConfigStore();
  const info = computed(() => {
    return configStore.info;
  });

  const getCode = () => {
    const appid = info.value.wxAppId;
    const redirect_uri = encodeURIComponent(window.location.href);
    const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`;
    window.location.href = url;
  };

  watch(
    info,
    () => {
      if (!code.value && isWx() && info.value.wxAppId) {
        getCode();
      }
    },
    { immediate: true },
  );
};

export default useWxCode;
