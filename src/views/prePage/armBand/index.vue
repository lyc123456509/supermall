<template>
  <main>
    <div class="prize_box">
      <div class="bg_box"></div>
      <div class="lotteryBody_bottom">
        <div class="left">
          <div class="goodsContainer" :class="boxWhileScroll ? 'left-ani' : ''" ref="leftRef" :style="{ top: leftTop + 'px' }">
            <div class="goodsItem" ref="prizeItemRef" :id="item.id" theme="" v-for="(item, index) in goodsList1" :key="index">
              <div class="imgBox">
                <img class="goodsImg" id="goodsImg_1" :src="item.img" />
              </div>
              <div class="goodsName">{{ item.name }}</div>
            </div></div
          >
        </div>
        <div class="middle">
          <div class="goodsContainer" :class="boxWhileScroll ? 'mid-ani' : ''" ref="midRef" :style="{ top: midTop + 'px' }">
            <div class="goodsItem" :id="item.id" theme="" v-for="(item, index) in goodsList2" :key="index">
              <div class="imgBox">
                <img class="goodsImg" id="goodsImg_1" :src="item.img" />
              </div>
              <div class="goodsName">{{ item.name }}</div>
            </div></div
          >
        </div>
        <div class="right">
          <div class="goodsContainer" :class="boxWhileScroll ? 'right-ani' : ''" ref="rightRef" :style="{ top: rightTop + 'px' }">
            <div class="goodsItem" :id="item.id" theme="" v-for="(item, index) in goodsList3" :key="index">
              <div class="imgBox">
                <img class="goodsImg" id="goodsImg_1" :src="item.img" />
              </div>
              <div class="goodsName">{{ item.name }}</div>
            </div></div
          >
        </div>
      </div>
      <div class="leftTimes">{{ times }}</div>
      <div class="playBtn">
        <div
          class="playBtnItem"
          style="background-image: url(https://nginx-beta.oss-cn-chengdu.aliyuncs.com/h5/armBandit/btn.webp)"
          @click="btnHandle"
          :class="btnFlag ? 'btnAni' : ''"
        ></div>
        <div
          class="btn_hand handAni"
          style="background-image: url('https://nginx-beta.oss-cn-chengdu.aliyuncs.com/h5/armBandit/hand.webp')"
          v-show="btnFlag"
        ></div
      ></div>
    </div>
    <nut-overlay v-model:visible="show" :close-on-click-overlay="false">
      <div class="popup_wrap">
        <img src="https://nginx-beta.oss-cn-chengdu.aliyuncs.com/h5/armBandit2/iphone%402x.png" alt="" class="phone" />
        <img src="https://nginx-beta.oss-cn-chengdu.aliyuncs.com/h5/armBandit2/tips.png" alt="" class="tips" />
        <div class="bot">
          <div class="price">开盒价: {{ showMoney }}元</div>
          <div class="inputBox">
            <div class="icon">
              <img src="/src/assets/prePink/icon_phone.png" alt="" />
            </div>
            <nut-input type="tel" v-model="state.phone" placeholder="请输入您的手机号码" maxLength="11" :border="false" class="input" />
          </div>
          <div
            class="btn"
            style="background-image: url(https://nginx-beta.oss-cn-chengdu.aliyuncs.com/h5/armBandit/fef2d5aba45d459c8850151420d62834.webp)"
            @click="btnJumpToNext"
          ></div>
        </div>
      </div>
    </nut-overlay>
    <nut-overlay v-model:visible="state.showBoom" :close-on-click-overlay="false">
      <div class="boom-animation">
        <img src="@/assets/armBandit/iphone.png" alt="" />
        <img src="@/assets/armBandit/iphone.png" alt="" />
        <img src="@/assets/armBandit/iphone.png" alt="" />
      </div>
      <div class="boom-img"></div>
    </nut-overlay>
  </main>
</template>

<script setup lang="ts">
  import { goodsList1, goodsList2, goodsList3 } from './index';
  import useRandomMoney from '/@/hooks/useRandomMoney';
  const { showMoney } = useRandomMoney();
  const leftRef = ref();
  const midRef = ref();
  const rightRef = ref();
  const timer = ref();
  const prizeItemRef = ref<any>(null);
  const state = reactive({
    leftTop: 0,
    midTop: 0,
    rightTop: 0,
    boxWhileScroll: true,
    times: 2,
    index: 2,
    btnFlag: true,
    speed: 1,
    show: false,
    showBoom: false,
    itemHeight: 0,
    phone: '',
  });

  const boxAni = (top, ele, wait = 0) => {
    timer.value = setInterval(() => {
      if (state[top] > -1 * state.itemHeight) {
        state[top] -= state.speed;
      } else {
        state[top] = 0;
        const e = ele.children[0]; // 获取第一个元素
        ele.appendChild(e); // 从末尾添加一个元素
      }
    }, wait);
  };

  const init = () => {
    state.speed = 1;
    state.boxWhileScroll = true;
    state.leftTop = 0;
    state.midTop = 0;
    state.rightTop = 0;
  };

  onMounted(() => {
    init();
    state.itemHeight = (prizeItemRef.value as any) && prizeItemRef.value[0].clientHeight;
  });

  const prodHtml = (arr: any): string => {
    let html = ``;
    for (let i = 0; i < arr.length; i++) {
      const e = arr[i];
      html += `<div class="goodsItem" id="${e.id}">
              <div class="imgBox">
                <img class="goodsImg" id="goodsImg_1" src="${e.img}" />
              </div>
              <div class="goodsName">${e.name}</div>
            </div>`;
    }
    return html;
  };
  watch(
    () => state.phone,
    () => {
      if (state.phone.length === 11) {
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      }
    },
  );

  const rest = () => {
    const leftHtml = prodHtml(goodsList1);
    const midHtml = prodHtml(goodsList2);
    const rightHtml = prodHtml(goodsList3);
    leftRef.value.innerHTML = leftHtml;
    midRef.value.innerHTML = midHtml;
    rightRef.value.innerHTML = rightHtml;
  };

  const btnHandle = () => {
    state.index--;
    if (state.index < 1) return;
    state.leftTop = leftRef.value.getBoundingClientRect().top + 2 * state.itemHeight * -1;
    state.midTop = midRef.value.getBoundingClientRect().top + 2 * state.itemHeight * -1;
    state.rightTop = rightRef.value.getBoundingClientRect().top + 2 * state.itemHeight * -1;
    state.boxWhileScroll = false;
    boxAni('leftTop', leftRef.value);

    state.btnFlag = false;
    state.speed = 8;
    setTimeout(() => {
      const div = document.getElementById('1');
      const top = div?.offsetTop;
      state.leftTop = -top!;
      clearInterval(timer.value);
      boxAni('midTop', midRef.value);
    }, 1000);
    setTimeout(() => {
      clearInterval(timer.value);
      const div2 = document.getElementById('8');
      const top2 = div2?.offsetTop;
      state.midTop = -top2!;
      boxAni('rightTop', rightRef.value, 5);
    }, 2000);
    setTimeout(() => {
      clearInterval(timer.value);
      let num = '21';
      if (state.times == 1) {
        num = '15';
      }
      const div3 = document.getElementById(num);
      const top3 = div3?.offsetTop;
      state.rightTop = -top3!;
      state.btnFlag = true;
      setTimeout(() => {
        if (state.times == 2) {
          state.times = 1;
          state.index = 2;
          state.btnFlag = true;
          init();
          rest();
        } else {
          state.times = 0;
          state.showBoom = true;
          setTimeout(() => {
            state.showBoom = false;
            state.show = true;
          }, 2000);
        }
      }, 500);
    }, 3000);
  };
  const emitFun = defineEmits(['changeStep']);
  const btnJumpToNext = () => {
    emitFun('changeStep', { step: 2, phone: state.phone });
  };
  const { boxWhileScroll, leftTop, midTop, rightTop, times, btnFlag, show } = toRefs(state);
</script>

<style lang="scss">
  main {
    overflow: hidden;
    min-width: 100vw;
    min-height: 100vh;
    background: url(/@/assets/armBandit/bg.webp) no-repeat;
    background-size: 100% auto;
    .prize_box {
      width: 100%;
      position: absolute;
      top: 4.6rem;

      .bg_box {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0rem;
        height: 5rem;
        background: url(/@/assets/armBandit/box.webp) no-repeat;
        background-size: cover;
        z-index: 5;
      }
      .lotteryBody_bottom {
        position: absolute;
        width: 6.5rem;
        height: 3.4rem;
        background-color: #fff;
        left: 50%;
        transform: translateX(-50%);
        top: 1.14rem;
        border-radius: 0.25rem;
        z-index: 0;
        display: flex;
        flex-direction: row;
        justify-content: center;
        flex-wrap: nowrap;
        justify-items: center;
        align-items: center;
        .left,
        .middle,
        .right {
          width: 2.1rem;
          height: 3.4rem;
          position: relative;
          overflow: hidden;
        }
        .middle {
          margin: 0 0.1rem;
        }
        img {
          display: block;
          width: 2rem;
          height: 2rem;
          margin: 0 auto;
        }
        .goodsContainer {
          position: absolute;
          top: 0;
          .goodsItem {
            padding: 0.52rem 0 0;
          }
        }
        .goodsName {
          width: 100%;
          height: 0.36rem;
          text-align: center;
          color: red;
          font-size: 0.26rem;
          line-height: 0.36rem;
          font-weight: 700;
          margin-top: 0;
        }
      }
      .leftTimes {
        position: absolute;
        width: 1rem;
        height: 0.5rem;
        color: #e40044;
        font-size: 0.48rem;
        // line-height: 0.5rem;
        font-weight: 700;
        top: 5.6rem;
        left: 4rem;
        &::after {
          content: '次';
          font-size: 0.26rem;
          margin-left: 0.02em;
          position: relative;
          top: -0.04rem;
        }
      }
      .playBtn {
        position: absolute;
        width: 2.1rem;
        height: 2.1rem;
        z-index: 10;
        top: 5.2rem;
        left: 5rem;
        .playBtnItem {
          position: absolute;
          width: 2.1rem;
          height: 2.1rem;
          background-image: url(//cdn.ituibei.cn/dist/welfareAT02/private/C/Cz046P/img);
          background-repeat: no-repeat;
          background-size: 100% 100%;
          left: 0;
          top: 0;
          background-size: cover;
          background-position: 0 0;
        }
        .btnAni {
          animation: playBtnItem_move 0.3s linear infinite alternate;
        }
        .handAni {
          animation: btn_hand_move 0.3s linear infinite alternate;
        }
        .btn_hand {
          position: absolute;
          width: 1.3rem;
          height: 1.3rem;
          left: 1rem;
          top: 1rem;
          background-image: url(https://nginx-beta.oss-cn-chengdu.aliyuncs.com/h5/armBandit/hand.webp);
          background-repeat: no-repeat;
          background-size: cover;
          background-size: 100% 100%;
        }
      }
    }
  }

  .popup_wrap {
    width: 6.04rem;
    height: 7.56rem;
    background-image: url(https://nginx-beta.oss-cn-chengdu.aliyuncs.com/h5/armBandit2/box_bg.png);
    background-repeat: no-repeat;
    box-sizing: border-box;
    background-size: 100% auto;
    background-position-y: 20%;
    margin: 35% auto 0;
    position: relative;
    overflow: hidden;
    .phone {
      position: absolute;
      width: 4.65rem;
      height: 5.63rem;
      left: 50%;
      top: 0.3rem;
      opacity: 0;
      transform: translate(-50%, 80%);
      animation: phoneAni 500ms linear forwards;
    }
    .tips {
      position: absolute;
      top: 0.84rem;
      right: 0.31rem;
      width: 1.5rem;
      height: 1.63rem;
      transform: scale(2.5);
      opacity: 0;
      animation: tipsAni 700ms ease-in forwards;
    }
    .bot {
      width: 5.74rem;
      height: 4.48rem;
      background-image: url(https://nginx-beta.oss-cn-chengdu.aliyuncs.com/h5/armBandit2/box_bot.png);
      background-repeat: no-repeat;
      background-size: contain;
      margin: 2.94rem auto 0;
      position: relative;
      overflow: hidden;
      .price {
        font-size: 0.22rem;
        margin-top: 0.2rem;
        text-align: center;
        color: #b3712f;
      }
      .inputBox {
        border: 0;
        height: 0.96rem;
        border-radius: 0.49rem;
        width: 4.96rem;
        margin: 1.34rem auto 0.39rem;
        display: flex;
        background: #fff;
        .icon {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 20%;
          img {
            width: 0.34rem;
            height: 0.48rem;
          }
        }
        .input {
          width: 100%;
          height: 100%;
          background: transparent;
          font-size: 0.34rem;
          padding: 0 0.54rem 0 0;
          margin: 0;
          line-height: 0.9rem;
        }
      }
    }
    .btn {
      width: 4.4rem;
      height: 1rem;
      margin: 0.1rem auto 0;
      animation: FormBtnScale 1s ease 0s infinite;
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
  }

  .boom-img {
    width: 3rem;
    height: 3rem;
    background-image: url(/@/assets/armBandit/boom.webp);
    background-position-x: -12.6rem;
    background-size: cover;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 3.2rem;
    opacity: 0;
    animation: boomImgShow 0.3s 1.2s forwards;
  }
  @keyframes boomImgShow {
    0% {
      opacity: 0;
    }
    75% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  .boom-animation {
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 5rem;
    width: 100%;
    padding: 0 0.5rem;
    box-sizing: border-box;
    img {
      width: 30%;
      height: auto;
      animation-duration: 1s;
      animation-fill-mode: forwards;
      animation-delay: 0.5s;
      &:nth-child(1) {
        animation-name: phoneMove1;
      }
      &:nth-child(2) {
        animation-name: phoneMove2;
      }
      &:nth-child(3) {
        animation-name: phoneMove3;
      }
    }
  }

  @keyframes phoneMove1 {
    0% {
      transform: translate(0) rotateZ(0deg);
    }
    10% {
      transform: translate(0) rotateZ(10deg);
    }
    20% {
      transform: translate(0) rotateZ(-10deg);
    }
    30% {
      transform: translate(0) rotateZ(0deg);
    }
    80% {
      transform: translate(2.27rem, -30px) rotateZ(10deg);
    }
    90% {
      transform: translate(2.27rem, -30px) rotateZ(-10deg);
    }
    100% {
      transform: translate(2.27rem, -30px) rotateZ(0deg);
    }
  }

  @keyframes phoneMove2 {
    0% {
      transform: translate(0);
    }
    10% {
      transform: translate(0) rotateZ(10deg);
    }
    20% {
      transform: translate(0) rotateZ(-10deg);
    }
    30% {
      transform: translate(0) rotateZ(0deg);
    }
    80% {
      transform: translate(0px, -30px) rotateZ(10deg);
    }
    90% {
      transform: translate(0px, -30px) rotateZ(-10deg);
    }
    100% {
      transform: translate(0px, -30px) rotateZ(0deg);
    }
  }

  @keyframes phoneMove3 {
    0% {
      transform: translate(0);
    }
    10% {
      transform: translate(0) rotateZ(10deg);
    }
    20% {
      transform: translate(0) rotateZ(-10deg);
    }
    30% {
      transform: translate(0) rotateZ(0deg);
    }
    80% {
      transform: translate(-2.27rem, -30px) rotateZ(10deg);
    }
    100% {
      transform: translate(-2.27rem, -30px) rotateZ(-10deg);
    }
    100% {
      transform: translate(-2.27rem, -30px) rotateZ(0deg);
    }
  }

  @keyframes FormBtnScale {
    0% {
      transform: scale(1);
    }

    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes playBtnItem_move {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0.8);
    }
  }
  @keyframes btn_hand_move {
    0% {
      transform: translate(0);
    }

    100% {
      transform: translate(0.5rem, 0.5rem);
    }
  }
  .left-ani {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0%, 0);
    animation: fx-roll 4500ms 0s infinite linear;
    animation-delay: 0ms;
  }
  .mid-ani {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0%, 0);
    animation: fx-roll 3000ms 0s infinite linear;
    animation-delay: 500ms;
  }
  .right-ani {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0%, 0);
    animation: fx-roll 3500ms 0s infinite linear;
    animation-delay: 1000ms;
  }
  @keyframes fx-roll {
    0% {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0%, 0);
    }
    100% {
      -webkit-transform: translate3d(0, -87.5%, 0);
      transform: translate3d(0, -87.5%, 0);
    }
  }
  @keyframes phoneAni {
    to {
      transform: translate(-50%, 0%);
      opacity: 1;
    }
  }
  @keyframes tipsAni {
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
</style>
