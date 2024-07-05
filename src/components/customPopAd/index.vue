<template>
  <nut-overlay v-model:visible="show" :z-index="2000" :close-on-click-overlay="false" class="custom-pop-ad">
    <img :src="props.imgurl" alt="" @click="handleClick" />
    <nut-icon name="circle-close" color="rgba(255,255,255,0.1)" size="22" @click="show = false" />
  </nut-overlay>
</template>

<script lang="ts" setup>
  const props = defineProps({
    imgurl: {
      type: String,
    },
    adUrl: {
      type: String,
    },
  });

  const state = reactive({
    show: true,
  });

  //  点击埋点
  const handleClick = () => {
    window.location.href = props.adUrl as string;
  };

  const { show } = toRefs(state);
</script>

<style lang="scss" scoped>
  .custom-pop-ad {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 85%;
    }
  }
  .nut-icon-circle-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 2001;
  }
</style>
