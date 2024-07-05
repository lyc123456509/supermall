<template>
  <main v-if="Object.keys(state.ItemInfo).length > 0">
    <img src="/src/assets/wedlock/wedlockResult_title.png" alt="" class="title" />
    <img src="/src/assets/wedlock/wedlockResult_tips.png" alt="" class="tips" @click="jumpTo" />
    <div class="btn" @click="jumpTo">立即领100元话费券</div>
    <div class="list" v-if="a && a.length > 0">
      <div class="item" v-for="(item, index) in a" :key="index" @click="itemClick(index)">
        <div class="list_title">
          <span>· {{ item['title'] }} ·</span>
          <img src="/src/assets/wedlock/wedlockResult_icon.png" alt="" :class="item['show'] ? 'img_active' : ''" />
        </div>
        <div class="content" v-show="item['show']">
          <img src="/src/assets/wedlock/search_icon.png" alt="" class="tl" />
          <img src="/src/assets/wedlock/search_icon.png" alt="" class="tr" />
          <img src="/src/assets/wedlock/search_icon.png" alt="" class="bl" />
          <img src="/src/assets/wedlock/search_icon.png" alt="" class="br" />
          <template v-if="index === 0">
            <div class="title_box">
              <div class="text1">{{ state.score }}分</div>
              <div class="text2">你们是百年好合的一对</div>
            </div>
            <div v-for="(textItem, textIndex) in item['textList']" :key="textIndex" style="line-height: 0.5rem">🌟{{ textItem }}</div>
          </template>
          <template v-else>
            <div class="score">{{ item['score'] }}分</div>
            <div class="contentList" v-for="(itemContent, contentIndex) in item['contentList']" :key="contentIndex">
              <div class="content_title">【{{ itemContent['title'] }}】</div>
              <div
                class="text3"
                v-html="itemContent['content']"
                :style="{ marginTop: itemContent['title'] === '总结' ? '0.4rem' : '' }"
              ></div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </main>
  <main v-else class="errMain">
    <h2
      >当前测算人数暴增,请耐心等待测算结果<span class="lot lot1">.</span><span class="lot lot2">.</span><span class="lot lot3">.</span></h2
    >
  </main>
</template>

<script setup lang="ts">
  import router from '/@/router';
  const state = reactive({
    ItemInfo: {},
    score: 0,
  });
  const a = ref([]);
  try {
    state.ItemInfo = JSON.parse(sessionStorage.getItem('calculationInfo') || '{}')?.data || {};
    const scoreList = state.ItemInfo['zhishu'];
    let sum = 0;
    let current = 0;
    for (const key in scoreList) {
      sum += scoreList[key];
      current++;
    }
    state.score = parseInt(sum / current);
    // let arr1: any = [];
    // let arr2: any = [];
    let o1: any = {};
    let o2: any = {};
    let o3: any = {};
    let o4: any = {};
    let o5: any = {};
    let o6: any = {};
    let o7: any = {};
    let o8: any = {};
    let o9: any = {};
    let o10: any = {};
    o1 = {
      title: '八字合婚总论',
      textList: [
        state.ItemInfo['minfo']['hubu'],
        state.ItemInfo['winfo']['hubu'],
        `双方八字融合后,五行平衡度为${state.ItemInfo['wuxingpinghengdu']}`,
        `双方八字融合后,阴阳平衡度为${state.ItemInfo['yinyangpinghengdu']}`,
        state.ItemInfo['nianguanxi'],
        state.ItemInfo['yueguanxi'],
        state.ItemInfo['riguanxi'],
        state.ItemInfo['shiguanxi'],
      ],
      show: false,
    };

    o2 = {
      title: '子女兴旺指数',
      score: state.ItemInfo['zhishu']['zinvxingwang'],
      contentList: [
        {
          title: '总结',
          content: state.ItemInfo['toutai'],
        },
      ],
    };

    o3 = {
      title: '婚后互助指数',
      score: state.ItemInfo['zhishu']['zinvxingwang'],
      contentList: [
        {
          title: '总结',
          content: state.ItemInfo['zhishuzonglun']['dyhuzhu'],
        },
      ],
    };
    o4 = {
      title: '月老定情指数',
      score: state.ItemInfo['zhishu']['yuelaodingqing'],
      contentList: [
        {
          title: '总结',
          content: state.ItemInfo['yuelaodq'],
        },
      ],
    };
    o5 = {
      title: '命中注定指数',
      score: state.ItemInfo['zhishu']['mzzhuding'],
      contentList: [
        {
          title: '总结',
          content: state.ItemInfo['shuxianghunpei'],
        },
      ],
    };
    o6 = {
      title: '先天命数指数',
      score: state.ItemInfo['zhishu']['xtminggua'],
      contentList: [
        {
          title: '总结',
          content: '男方命数为坤命(西四命),女方命数为坎命(东四命).属不同命数' + state.ItemInfo['gua'],
        },
      ],
    };
    o7 = {
      title: '婚后财运指数',
      score: state.ItemInfo['zhishu']['caiyun'],
      contentList: [
        {
          title: '男方',
          content: state.ItemInfo['minfo']['caiyun'],
        },
        {
          title: '女方',
          content: state.ItemInfo['winfo']['caiyun'],
        },
        {
          title: '总结',
          content: state.ItemInfo['zhishuzonglun']['dycaiyun'],
        },
      ],
    };
    o8 = {
      title: '婚后健康指数',
      score: state.ItemInfo['zhishu']['jiankang'],
      contentList: [
        {
          title: '男方',
          content: state.ItemInfo['minfo']['jiankang'],
        },
        {
          title: '女方',
          content: state.ItemInfo['winfo']['jiankang'],
        },
        {
          title: '总结',
          content: state.ItemInfo['zhishuzonglun']['dyjiankang'],
        },
      ],
    };
    o9 = {
      title: '婚后和睦指数',
      score: state.ItemInfo['zhishu']['hemu'],
      contentList: [
        {
          title: '总结',
          content: state.ItemInfo['zhishuzonglun']['dyhuzhu'],
        },
      ],
    };
    o10 = {
      title: '婚后幸福指数',
      score: state.ItemInfo['zhishu']['xingfu'],
      contentList: [
        {
          title: '男方',
          content: state.ItemInfo['minfo']['lianai'],
        },
        {
          title: '女方',
          content: state.ItemInfo['winfo']['lianai'],
        },
        {
          title: '总结',
          content: state.ItemInfo['zhishuzonglun']['dyxingfu'],
        },
      ],
    };
    a.value && (a.value as any).push(o1, o2, o3, o4, o5, o6, o7, o8, o9, o10);
  } catch (error) {
    state.ItemInfo = {};
  }

  const itemClick = (index: number) => {
    (a.value[index] as any).show = !(a.value[index] && (a.value[index] as any).show);
  };
  const jumpTo = () => {
    router.push('/download/kkz');
  };
</script>
<style lang="scss" scoped>
  main {
    position: relative;
    width: 100%;
    height: 100%;
    background: #b31a1d;
    background-image: url(/@/assets/wedlock/wedlockResult_bg.png);
    background-repeat: repeat;
    background-size: contain;
    overflow: hidden;
    padding-bottom: 2rem;
    .title {
      width: 100%;
      height: 2rem;
    }
    .tips {
      position: fixed;
      top: 50%;
      right: 0;
      width: 2.2rem;
      height: 2.2rem;
      z-index: 10;
    }
    .btn {
      position: fixed;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 5.52rem;
      height: 1.84rem;
      background: url(/@/assets/wedlock/wedlock_popup_btn.png) no-repeat;
      background-size: contain;
      display: flex;
      justify-content: center;
      font-size: 0.36rem;
      line-height: 1.64rem;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #7f0608;
      animation: btn 2s linear infinite;
      z-index: 9;
    }
    .list {
      .item {
        .list_title {
          position: relative;
          z-index: 1;
          background: url(/@/assets/wedlock/wedlock_list_title.png) no-repeat;
          background-size: contain;
          width: 5rem;
          height: 0.96rem;
          line-height: 0.96rem;
          text-align: center;
          margin: 0.4rem auto 0;
          font-size: 0.4rem;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #f2d281;
          > img {
            position: absolute;
            top: 50%;
            right: 0;
            transform: translateY(-50%);
            width: 0.56rem;
            height: 0.56rem;
          }
          .img_active {
            transform: translateY(-50%) rotate(180deg);
          }
        }
        .content {
          position: relative;
          width: 7.2rem;
          // height: 12rem;
          background: #7f0608;
          border-radius: 0.48rem;
          border: 0.04rem solid #dfa263;
          margin: 0 auto;
          padding-bottom: 0.6rem;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #f2d281;
          padding: 0 0.4rem 1.2rem;
          box-sizing: border-box;
          > img {
            position: absolute;
            width: 0.4rem;
            height: 0.4rem;
          }
          .tl {
            top: -0.05rem;
            left: -0.05rem;
          }
          .tr {
            top: -0.05rem;
            right: -0.05rem;
            transform: rotate(90deg);
          }
          .bl {
            bottom: -0.05rem;
            left: -0.05rem;
            transform: rotate(-90deg);
          }
          .br {
            bottom: -0.05rem;
            right: -0.05rem;
            transform: rotate(180deg);
          }
          .title_box {
            width: 3.7rem;
            height: 1.4rem;
            margin: 0.12rem auto 0.3rem;
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #f2d281;
            border-top: 0.04rem solid #dfa263;
            border-bottom: 0.04rem solid #dfa263;
            &::after {
              content: '';
              width: 0.8rem;
              height: 1.5rem;
              position: absolute;
              top: 50%;
              transform: translateY(-50%) rotate(180deg);
              left: -20%;
              background: url(/@/assets/wedlock/title_box.png) no-repeat;
              background-size: contain;
            }
            &::before {
              content: '';
              width: 0.8rem;
              height: 1.5rem;
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              right: -20%;
              background: url(/@/assets/wedlock/title_box.png) no-repeat;
              background-size: contain;
            }
            .text1 {
              font-size: 0.5rem;
            }
            .text2 {
              font-size: 0.3rem;
            }
          }
          .score {
            text-align: center;
            font-size: 0.5rem;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #f2d281;
            margin-top: 0.4rem;
            margin-bottom: 0.5rem;
          }
          .content_title {
            font-weight: 400;
            color: #ffffff;
            font-size: 0.36;
            margin-bottom: 0.1rem;
            text-align: center;
          }
          .text3 {
            font-weight: 400;
            font-size: 0.3rem;
            line-height: 0.42rem;
          }
        }
      }
    }
  }

  .errMain {
    height: 100vh;
    padding-bottom: 0;
    display: grid;
    justify-content: center;
    align-items: center;
    h2 {
      font-size: 0.36rem;
      color: #f2d281;
    }
    .lot {
      animation-name: lot;
      animation-duration: 2s;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
    }
    .lot1 {
      // animation-delay: 2s;
    }
    .lot2 {
      animation-delay: 2.5s;
      animation-duration: 2s;
    }
    .lot3 {
      animation-delay: 3s;
      animation-duration: 2s;
    }
  }

  @keyframes lot {
    0%,
    100% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
  }

  @keyframes btn {
    0%,
    100% {
      transform: translateX(-50%) scale(1);
    }
    50% {
      transform: translateX(-50%) scale(1.2);
    }
  }
</style>
