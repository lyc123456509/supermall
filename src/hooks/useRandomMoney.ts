import { useConfigStore } from '/@/store/modules/platform';
import BigNumber from 'bignumber.js';

const useRandomMoney = ({ isRandom } = { isRandom: true }) => {
  const configStore = useConfigStore();
  const info = computed(() => {
    return configStore.info;
  });

  const randomMoney = ref(29.9);
  const showMoney = ref(29.9);
  const secondPayMoney = ref(29.9);
  const twicePrice = ref(29.9);
  const twiceAllPrice = ref(100);
  const state = reactive({
    secondaryType: 1,
  });

  const getRandom = (val: number) => {
    //  JS
    // const max = val * 100;
    // const min = max - 20;
    // const range = max - min;
    // const rand = Math.random();
    // let num = min + Math.round(rand * range); //四舍五入
    // num = num / 100;
    // return num;
    // BIGNUMBER
    const max = new BigNumber(val).multipliedBy(100);
    const min = max.minus(20);
    const range = max.minus(min);
    const rand = Math.random();
    let num = min.plus(Math.round(range.multipliedBy(rand).toNumber())); //四舍五入
    num = new BigNumber(num).div(100);
    return num.toNumber();
  };

  watch(
    info,
    async () => {
      if (info.value.phoneData.remark && JSON.parse(info.value.phoneData.remark).money) {
        randomMoney.value = isRandom
          ? getRandom(JSON.parse(info.value.phoneData.remark).money)
          : JSON.parse(info.value.phoneData.remark).money;
        showMoney.value = JSON.parse(info.value.phoneData.remark).displayMoney || JSON.parse(info.value.phoneData.remark).money;
        const remark = JSON.parse(info.value.phoneData.remark);
        if (remark.secondaryPayMoney && remark.secondaryPhone && remark.secondaryType) {
          const { secondaryPayMoney, secondaryPhone, secondaryType } = remark;
          secondPayMoney.value = getRandom(secondaryPayMoney);
          twicePrice.value = secondaryPayMoney;
          twiceAllPrice.value = secondaryPhone;
          state.secondaryType = secondaryType;
        }
      }
    },
    { immediate: true },
  );

  const { secondaryType } = toRefs(state);
  console.log(showMoney.value, randomMoney.value);
  return {
    showMoney: showMoney,
    randomMoney: randomMoney,
    secondPayMoney: secondPayMoney,
    twicePrice: twicePrice,
    twiceAllPrice: twiceAllPrice,
    secondaryType: secondaryType,
  };
};

export default useRandomMoney;
