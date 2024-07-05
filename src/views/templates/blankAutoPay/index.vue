<script lang="ts" setup>
  import usePhone from '/@/hooks/usePhone';
  import { useConfigStore } from '/@/store/modules/platform';
  import { getQueryParam } from '/@/utils';
  import { PayCenter } from '/@/utils/pay';
  const configStore = useConfigStore();
  const info = computed(() => {
    return configStore.info;
  });
  const state = reactive({
    phone: usePhone(),
    isLock: false,
  });

  onMounted(() => {
    //  支付
    watch(
      () => info.value.id,
      () => {
        if (info.value.id && !state.isLock) {
          state.isLock = !state.isLock;
          new PayCenter(info.value.applyIdentification).pay({
            phone: state.phone,
            randomMoney: getQueryParam('randomMoney') || 29.9,
            origin: 'blankAutoPay',
          });
        }
      },
      { immediate: true },
    );
  });
</script>
