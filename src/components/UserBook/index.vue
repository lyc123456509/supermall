<template>
  <div class="user-book">
    <img :src="props.checkImg[0]" alt="" v-if="checked" @click="toggleAgree" />
    <img :src="props.checkImg[1]" alt="" v-else @click="toggleAgree" />
    <span>提交即您已阅读并同意</span>
    <a class="policy" @click="jumpToPolicy">《用户隐私协议》</a>
  </div>
</template>

<script lang="ts" setup name="UserBook">
  import select_icon from '/@/assets/blue/select.png';
  import unselect_icon from '/@/assets/blue/unselect.png';
  import { useConfigStore } from '/@/store/modules/platform';
  const configStore = useConfigStore();
  const info = computed(() => {
    return configStore.info;
  });
  interface Props {
    checkImg: string[];
    phone?: string;
    auto?: boolean;
    defaultChecked?: any;
  }
  const props = withDefaults(defineProps<Props>(), {
    checkImg: () => [select_icon, unselect_icon],
    phone: () => '',
    auto: () => true,
    defaultChecked: () => true,
  });

  let checked = ref(info.value.agreementSelection);
  watch(
    info,
    () => {
      checked.value = info.value.agreementSelection;
      emitFun('change', info.value.agreementSelection);
    },
    { immediate: true },
  );

  watch(
    props,
    () => {
      if (props.phone.length === 11) {
        if (props.auto) {
          checked.value = true;
        }
        emitFun('change', checked.value);
      }
    },
    { immediate: true },
  );

  watch(
    props.defaultChecked,
    () => {
      if (!props.defaultChecked) {
        checked.value = false;
      }
    },
    { immediate: true },
  );

  const emitFun = defineEmits(['change']);

  const toggleAgree: any = () => {
    checked.value = !checked.value;
    emitFun('change', checked.value);
  };
  const jumpToPolicy: any = () => {
    window.location.href = info.value.landingPageResponse.userShValue;
  };
</script>

<style lang="scss" scoped>
  .user-book {
    font-size: 0.23rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0.6rem 0 0.2rem 0;
    img {
      width: 0.23rem;
      height: 0.23rem;
      margin-right: 0.1rem;
    }
    .policy {
      color: #ff8400;
    }
  }
</style>
