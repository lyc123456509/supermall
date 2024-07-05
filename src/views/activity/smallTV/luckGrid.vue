<template>
  <div class="container">
    <img src="@/assets/activity/smallTV/jbdj.png" alt="" style="width: 7.19rem; margin-top: 0.82rem" />
    <div class="luck-grid-container">
      <img src="@/assets/activity/smallTV/img_deng_1.png" alt="" v-if="pmdFlag" class="pmd" />
      <img src="@/assets/activity/smallTV/img_deng_2.png" alt="" v-else class="pmd" />
      <LuckyGrid
        width="5.7rem"
        height="5.7rem"
        :prizes="prizes"
        :buttons="buttons"
        :active-style="{ background: '#fff491' }"
        class="luck-grid"
        ref="luckGridRef"
        @start="startCallback"
      />
    </div>

    <sideBarActivity
      :type="1"
      style="top: 0.75rem"
      :itemStyle="{
        color: '#000',
        background: '#e9d6ad',
        border: '0px',
        padding: '0.06rem 0.22rem',
        fontSize: '0.24rem',
        boxShadow: '1px 1px 4px 1px #958888',
        marginTop: '0.2rem',
      }"
    />
  </div>
</template>

<script lang="ts" setup>
  import { getSmallTheaterGoods, raffleprobability } from '/@/api/theatre';
  import prizeSource from '/@/assets/activity/smallTV/btn_kscj.png';
  import btn_kscj from '/@/assets/activity/smallTV/btn_kscj.png';
  import router from '/@/router';
  import { useTVStore } from '/@/store/modules/smallTV';
  import { businessDomain } from '/~/config/constant';
  import { Toast } from '@nutui/nutui';
  import { getQueryParam } from '/@/utils';
  const tvStore = useTVStore();
  const buttons = [
    {
      x: 1,
      y: 1,
      imgs: [
        {
          src: btn_kscj,
          width: '2.15rem',
          top: '-0.14rem',
        },
      ],
    },
  ];
  const prizeImg = {
    src: prizeSource,
    width: '80%',
    top: '10%',
  };
  const luckGridRef = ref(null);

  const state = reactive({
    pmdFlag: false,
    prizes: [
      { x: 0, y: 0, imgs: [prizeImg], background: '#e0cdf0', borderRadius: 8 },
      { x: 1, y: 0, imgs: [prizeImg], background: '#e0cdf0', borderRadius: 8 },
      { x: 2, y: 0, imgs: [prizeImg], background: '#e0cdf0', borderRadius: 8 },
      { x: 2, y: 1, imgs: [prizeImg], background: '#e0cdf0', borderRadius: 8 },
      { x: 2, y: 2, imgs: [prizeImg], background: '#e0cdf0', borderRadius: 8 },
      { x: 1, y: 2, imgs: [prizeImg], background: '#e0cdf0', borderRadius: 8 },
      { x: 0, y: 2, imgs: [prizeImg], background: '#e0cdf0', borderRadius: 8 },
      { x: 0, y: 1, imgs: [prizeImg], background: '#e0cdf0', borderRadius: 8 },
    ],
    stopIndex: 0,
    prizeGoods: {},
    listUrl: [],
  });

  const init = async () => {
    const res = await getSmallTheaterGoods({}, businessDomain['xjc'][import.meta.env.MODE]);
    const content = res.data.value.content;
    if (content) {
      content.listUrl.forEach((item, index) => {
        state.prizes[index].imgs = [
          {
            src: item.pictureUrl,
            width: '80%',
            top: '10%',
          },
        ];
      });
      state.listUrl = content.listUrl;
    }
    // console.log(prizes.value)
  };
  init();

  const startCallback = async () => {
    Toast.loading('请稍候...', {
      id: 'loading',
      duration: 0,
      cover: true,
    });
    const res = await raffleprobability(
      { code: sessionStorage.getItem('openId'), xjcNum: getQueryParam('xjcNum') || '1' },
      businessDomain['xjc'][import.meta.env.MODE],
    );
    Toast.hide('loading');
    const content = res.data.value.content;
    if (content) {
      if (!content.luckDraw) {
        Toast.text('您暂无抽奖机会');
        return;
      } else {
        if (!content.prizeGoods) {
          Toast.text('暂无库存，补货中...');
          return;
        } else {
          state.prizeGoods = content.prizeGoods;
          state.stopIndex = state.listUrl.findIndex((item: any) => item.id === content.prizeGoods.id);
        }
      }
    }
    luckGridRef.value && (luckGridRef.value as any).play();
    setTimeout(() => {
      luckGridRef.value && (luckGridRef.value as any).stop(state.stopIndex);
      tvStore.setPrizeGoods(state.prizeGoods);
      setTimeout(() => {
        router.push('/activity/smallTV/submitInfo');
      }, 4000);
    }, 3000);
  };

  onMounted(() => {
    setInterval(() => {
      state.pmdFlag = !state.pmdFlag;
    }, 1000);
  });

  const { pmdFlag, prizes } = toRefs(state);
</script>

<style lang="scss" scoped>
  .container {
    background-image: url('/@/assets/activity/smallTV/cj_bg.png');
    background-size: 100% auto;
    background-repeat: no-repeat;
    background-color: #56061e;
    width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    .luck-grid-container {
      background-image: url('/@/assets/activity/smallTV/img_kuang.png');
      background-size: 100% auto;
      background-repeat: no-repeat;
      width: 6.82rem;
      height: 6.82rem;
      margin-top: 0.47rem;
      position: relative;
      .pmd {
        position: relative;
        width: 6.52rem;
        top: 0.145rem;
        left: 0.145rem;
      }
      .luck-grid {
        position: absolute;
        top: 0.55rem;
        left: 0.55rem;
      }
    }
    .sidebar_hint {
      position: fixed;
      right: 0;
      top: 0.54rem;
      height: 3.26rem;
      font-size: 0.24rem;
      color: #333;
      z-index: 10;
      width: 1.62rem;
      height: 0.47rem;
    }
  }
  .popclass {
    .rule_mod {
      display: flex;
      flex-direction: column;
      width: 5.4rem;
      max-height: 8rem;
      padding: 0.4rem 0.2rem;
      line-height: 1.7;
    }

    .rule-title {
      text-align: center;
    }

    .rule_content {
      overflow-y: auto;
      white-space: pre-wrap;
    }
  }
</style>
