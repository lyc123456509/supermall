<template>
  <!-- v-if="isBackAd" -->
  <!-- 返回按钮 -->
  <nut-icon name="left" size="0.3rem" class="back-icon" @click="jumpHandleBackAd(BackAdList[0], '1')" v-if="BackAdList.length > 0" />
  <!-- 支付完成弹窗-->
  <nut-overlay v-model:visible="show" :z-index="2000" :close-on-click-overlay="false" class="tui-ad">
    <img
      v-if="PaySuccessPopAdList.length > 0"
      :src="PaySuccessPopAdList[0].bannerCover"
      alt=""
      @click="jumpHandleBackAd(PaySuccessPopAdList[0], '3')"
    />
    <nut-icon name="circle-close" color="rgba(255,255,255,0.8)" size="22" @click="show = false" />
  </nut-overlay>
</template>

<script lang="ts" setup>
  import { qureyAllAd, clickAd } from '../../api';
  import { useConfigStore } from '/@/store/modules/platform';
  import TuiAd from '/@/utils/tuiAd';
  import { useRouter } from 'vue-router';
  import { pidEnum } from '../TuiAd/config';
  import { getQueryParam } from '/@/utils';

  const router = useRouter();

  const configStore = useConfigStore();
  const info = computed(() => {
    return configStore.info;
  });
  const state = reactive({
    BackAdList: [] as any,
    tuiyaAdList: [] as any,
    DetainmentAdList: [] as any,
    PaySuccessPopAdList: [] as any,
    PaySuccessInsertAdList: [] as any,
    tuiAdInstance: null as any,

    show: false,
  });
  // tuiAdInstance: new TuiAd({ pid: pidEnum[router.currentRoute.value.query.channelParams as string] || '432876' }),
  // 点击广告回调
  const saveAd = async (data: any) => {
    const params = {
      applyAppId: info.value.id,
      bannerAddress: data.bannerAddress,
      bannerDetailId: data.bannerDetailId,
      bannerId: data.bannerId,
    };
    await clickAd(params);
  };
  // 查询所有广告
  const queryAllAd = async () => {
    const trenchId = getQueryParam('trenchId');
    let applyAppId: any = '';
    if (!!trenchId) {
      applyAppId = trenchId;
    } else {
      applyAppId = info.value.id;
    }
    console.log(applyAppId);
    if (!applyAppId) {
      return;
    }
    const params = {
      applyAppId,
    };
    const res: any = await qureyAllAd(params);
    const data = res.data.value.data;
    data.forEach(async (item: any) => {
      //  落地页
      if (!router.currentRoute.value.params.template) {
        if (item.bannerLinkType === 2) {
          state.tuiAdInstance = new TuiAd({
            pid: pidEnum[item.parameters],
          });
          await tuiyaAd(item.parameters);
        }
        if (item.bannerAddress.indexOf('3') !== -1) {
          if (item.bannerLinkType === 2) {
            state.PaySuccessPopAdList.push({
              ...item,
              ...state.tuiyaAdList[0],
            });
          } else {
            state.PaySuccessPopAdList.push(item);
          }
          state.show = true;
        }
        if (item.bannerAddress.indexOf('4') !== -1) {
          state.PaySuccessInsertAdList.push(item);
        }
      }
      if (item.bannerAddress.indexOf('1') !== -1) {
        // if (item.bannerLinkType === 2) {
        //   state.BackAdList.push({
        //     ...item,
        //     ...state.tuiyaAdList[0],
        //   });
        // } else {
        // }
        state.BackAdList.push(item);
      }
      if (item.bannerAddress.indexOf('2') !== -1) {
        // if (item.bannerLinkType === 2) {
        //   state.BackAdList.push({
        //     ...item,
        //     ...state.tuiyaAdList[0],
        //   });
        // } else {
        // }
        state.DetainmentAdList.push(item);
      }
    });
  };
  watch(
    info,
    () => {
      queryAllAd();
    },
    { immediate: true },
  );
  // 推呀广告
  const tuiyaAd = async (parameters) => {
    if (!!parameters) {
      const res = await state.tuiAdInstance.getAd();
      const data: any = {
        bannerCover: res.imgurl[0],
        bannerLinkUrl: res.durl,
      };
      state.tuiyaAdList.push(data);
      //  触发曝光埋点
      state.tuiAdInstance.exposeReport();
    }
  };
  // 点击广告
  const jumpHandleBackAd = async (data, bannerAddress) => {
    await saveAd({
      ...data,
      bannerAddress: bannerAddress,
    });
    if (data.bannerLinkType === 2) {
      await state.tuiAdInstance.clickReport();
    }
    window.location.href = data.bannerLinkUrl;
    // else{
    //     const params = {
    //         advertisingUrl: data.bannerLinkUrl,
    //         trenchId: info.value.id,
    //         type: 1,
    //     };
    //     await backAdver(params);
    // }
  };
  // DetainmentAdList
  const { BackAdList, PaySuccessPopAdList, show } = toRefs(state);
</script>

<style lang="scss" scoped>
  .back-icon {
    position: absolute;
    left: 0rem;
    top: 0.1rem;
    padding: 0.1rem;
    color: #fff;
    z-index: 9;
  }
  .tui-ad {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 80%;
    }
  }
  .nut-icon-circle-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 2001;
  }
</style>
