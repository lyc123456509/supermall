<script lang="ts" setup>
  import { Toast } from '@nutui/nutui';
  import { getxjcOrder } from '/@/api/theatre';
  import useTTJC from '/@/hooks/useTTJC';
  import { useConfigStore } from '/@/store/modules/platform';
  import { useTVStore } from '/@/store/modules/smallTV';
  import { businessDomain } from '/~/config/constant';

  const tvStore = useTVStore();
  const configStore = useConfigStore();
  const info = computed(() => {
    return configStore.info;
  });
  const disable = ref(false);
  const init = async () => {
    Toast.loading('请稍候...', {
      duration: 0,
    });
    const res = await getxjcOrder({ openId: tvStore.openId }, businessDomain[info.value.applyIdentification][import.meta.env.MODE]);
    useTTJC(res.data.value.content || '');
  };

  watch(
    () => tvStore.openId,
    (val: string) => {
      if (val && !disable.value) {
        disable.value = true;
        init();
      }
    },
    { immediate: true },
  );
</script>
