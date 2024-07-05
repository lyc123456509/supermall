import router from '../router';
import { useConfigStore } from '../store/modules/platform';
import { PayCenter } from '../utils/pay';

const useCheckOrder = (cb?: () => void) => {
  const configStore = useConfigStore();

  const info = computed(() => {
    return configStore.info;
  });
  onMounted(() => {
    setInterval(() => {
      const orderId = sessionStorage.getItem('orderId') || (router.currentRoute.value.query.orderId as string);
      const returnUrl = sessionStorage.getItem('returnUrl') || info.value.secondaryTrenchIdPageId || info.value.applyDownUrl;
      if (orderId && returnUrl) {
        new PayCenter(info.value.applyIdentification).checkOrder(orderId, returnUrl, cb);
      }
    }, 2000);
  });
};

export default useCheckOrder;
