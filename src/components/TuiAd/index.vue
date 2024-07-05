<template>
  <nut-overlay v-model:visible="show" :z-index="2000" :close-on-click-overlay="false" class="tui-ad">
    <img :src="imgurl" alt="" @click="handleClick" />
    <nut-icon name="circle-close" color="rgba(255,255,255,0.8)" size="22" @click="show = false" />
  </nut-overlay>
  <!-- <div class="tui-ad">
    <img :src="imgurl" alt="" />
  </div> -->
</template>

<script lang="ts" setup>
  import TuiAd from '/@/utils/tuiAd';
  import { useRouter } from 'vue-router';
  import { pidEnum } from './config';

  const router = useRouter();

  const state = reactive({
    imgurl: '',
    show: false,
    durl: '',
    tuiAdInstance: new TuiAd({ pid: pidEnum[router.currentRoute.value.query.channelParams as string] || '432876' }),
  });

  (async () => {
    //  互动推， 享点， xmob， 推啊， 极准
    const disableAd = ['utm_click', 'landingid', 'mob_cid', 'a_oId', 'jcid'];
    if (!router.currentRoute.value.query.channelParams || disableAd.includes(router.currentRoute.value.query.channelParams as string))
      return;
    const res = await state.tuiAdInstance.getAd();
    state.imgurl = res.imgurl[0];
    state.durl = res.durl;
    state.show = true;
    //  触发曝光埋点
    state.tuiAdInstance.exposeReport();
  })();

  //  点击埋点
  const handleClick = () => {
    state.tuiAdInstance.clickReport();
    window.location.href = state.durl;
  };

  const { imgurl, show } = toRefs(state);
</script>

<style lang="scss" scoped>
  .tui-ad {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 60%;
    }
  }
  .nut-icon-circle-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 2001;
  }
</style>
