<template>
  <div class="main-page">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" :key="$route.path" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" :key="$route.path" />
    <!-- <RouterView v-slot="{ Component }" v-if="$route.meta.keepAlive">
      <keep-alive>
        <component :is="Component" :key="$route.path" />
      </keep-alive>
    </RouterView>
    <RouterView v-if="!$route.meta.keepAlive" :key="$route.path" /> -->
  </div>
</template>

<script lang="ts" setup name="BasicLayoutPage">
  import { useRouter } from 'vue-router';

  const tabItem = [
    { key: 'home', icon: 'home' },
    { key: 'list', icon: 'horizontal' },
    { key: 'member', icon: 'my' },
    { key: 'demo', icon: 'location' },
  ];

  const router = useRouter();

  const activeTab = ref(0);

  onMounted(() => {
    activeTab.value = tabItem.findIndex((item) => item.key === router.currentRoute.value.path.replace('/', ''));
  });
</script>

<style scoped lang="scss">
  .nut-navbar {
    margin-bottom: 0;
  }

  .main-page {
    box-sizing: border-box;
    padding: 40px;
    height: calc(100vh - 200px);
    overflow-y: scroll;
    overflow-x: hidden;
  }
</style>
