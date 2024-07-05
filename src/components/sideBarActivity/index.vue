<template>
  <div class="rule">
    <div class="sidebar_hint" @click="rulesHandle" v-if="state.rule.content">活动规则</div>
    <nut-popup v-model:visible="show" pop-class="popclass" round>
      <div class="rule_mod">
        <h3 class="rule-title">活动规则</h3>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div class="rule_content" v-html="state.rule.content"></div>
        <nut-button type="primary" color="#e15ae8" @click="show = false">确定</nut-button>
        <!-- <van-button color="#e15ae8" round @click="show = false">确定</van-button> -->
      </div>
    </nut-popup>
  </div>
</template>

<script setup lang="ts">
  import { useConfigStore } from '/@/store/modules/platform';
  import { getContent } from '/@/api/theatre';
  import { businessDomain } from '/~/config/constant';

  const configStore = useConfigStore();
  const info = computed(() => {
    return configStore.info;
  });
  let show = ref(false);

  const props = defineProps({
    // eslint-disable-next-line vue/require-prop-types
    itemStyle: {
      default: {},
    },
    type: {
      type: Number,
    },
  });

  const state = reactive({
    rule: {
      content: '',
      name: '',
    },
  });

  const getContentRes = await getContent({ type: props.type }, businessDomain[info.value.applyIdentification][import.meta.env.MODE]);
  if (getContentRes.data.value) {
    state.rule.content = getContentRes.data.value.content[0].content;
    state.rule.name = getContentRes.data.value.content[0].name;
  }

  onMounted(() => {
    const sidebar_hint = document.querySelectorAll('.sidebar_hint');
    for (let i = 0; i < sidebar_hint.length; i++) {
      Object.keys(props.itemStyle).map((key) => {
        (sidebar_hint[i] as any).style[key] = props.itemStyle[key];
      });
    }
  });
  const rulesHandle: any = () => {
    show.value = true;
  };
</script>

<style lang="scss" scoped>
  .rule {
    position: fixed;
    right: 0;
    top: 0.54rem;
    height: 3.26rem;
    font-size: 0.24rem;
    color: #333;
    z-index: 10;

    &::first-child {
      margin-top: 0.6rem;
    }
  }

  .sidebar_hint {
    background: -webkit-linear-gradient(top, rgb(247, 239, 223), rgb(236, 197, 97));
    background: linear-gradient(to bottom, rgb(247, 239, 223), rgb(236, 197, 97));
    color: #fe5903;
    border: 0.05rem solid #fff;
    border-right: 0;
    box-shadow: 0px 0px 1.66667rem 0px rgb(94 94 94 / 26%);
    border-radius: 0.35rem 0 0 0.35rem;
    -webkit-border-radius: 0.35rem 0 0 0.35rem;
    -moz-border-radius: 0.35rem 0 0 0.35rem;
    -ms-border-radius: 0.35rem 0 0 0.35rem;
    -o-border-radius: 0.35rem 0 0 0.35rem;
    line-height: 0.35rem;
    padding: 0.06rem 0.1rem;
    text-align: center;
    word-wrap: break-word;
    margin-top: 0.3rem;
  }

  .rule_mod {
    display: flex;
    flex-direction: column;
    width: 5.4rem;
    height: 8rem;
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
</style>
