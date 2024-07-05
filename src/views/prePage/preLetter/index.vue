<template>
  <div class="container-pre">
    <div class="gx">
      <p>恭喜获得</p>
    </div>
    <div class="info">
      <p>手机话费充值券包</p>
      <p>{{ money }}<span>元</span></p>
      <div class="zj">
        <img src="@/assets/preLetter/icon.png" alt="" />
        <span>手气最佳</span>
      </div>
      <div class="btn" @click="btnHandle">立即领取</div>
    </div>
    <div class="split-line"></div>
    <div class="list">
      <ul>
        <li v-for="(item, index) in userData" :key="item.name">
          <img :src="item.avatar" alt="" />
          <span class="time">{{ Math.ceil((index + 1) * 1.2) }}分钟前</span>
          <span style="margin-left: auto">已充值{{ info.phoneData.cssClass || 100 }}元</span>
        </li>
      </ul>
    </div>
    <companyInfo
      style="position: fixed; bottom: 0; background-color: #f6f6f6; width: 100vw; color: #999; padding: 0.2rem 0; line-height: 0.3rem"
    />
    <SideBar />
  </div>
</template>

<script lang="ts" setup>
  import { userData } from './mockData';
  import { useConfigStore } from '/@/store/modules/platform';
  const info = computed(() => {
    return configStore.info;
  });
  const configStore = useConfigStore();
  const money = ref(0);
  watch(
    info,
    () => {
      const moenyInt = Number(info.value.phoneData.cssClass || 100);
      money.value = moenyInt;
      money.value = moenyInt - 40;
      const moneyTimer = setInterval(() => {
        money.value = money.value + 8;
        if (money.value >= moenyInt) {
          clearInterval(moneyTimer);
        }
      }, 100);
    },
    { immediate: true },
  );
  const emitFun = defineEmits(['changeStep']);
  const btnHandle = () => {
    emitFun('changeStep', { step: 2 });
  };
</script>

<style lang="scss" scoped>
  .container-pre {
    overflow-x: hidden;
    .gx {
      position: relative;
      width: 100vw;
      height: 2.4rem;
      color: #fff;
      padding-top: 1.5rem;
      box-sizing: border-box;
      font-size: 0.37rem;
      display: flex;
      justify-content: center;
      font-weight: bold;
      &::after {
        content: '';
        position: absolute;
        left: 50%;
        bottom: 0;
        width: 11rem;
        height: 10rem;
        border: 4px solid #fed317;
        transform: translateX(-50%);
        background-color: #ef5643;
        border-radius: 50%;
        box-shadow: inset 0 0 25px rgb(0 0 0 / 20%);
      }
      p {
        position: absolute;
        z-index: 1;
      }
    }
    .info {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 0.5rem;
      p {
        &:nth-child(1) {
          color: #333;
          font-weight: bold;
          font-size: 0.47rem;
        }
        &:nth-child(2) {
          color: #ef5643;
          font-weight: bold;
          font-size: 1.269231rem /* 66/52 */;
          margin-top: 0.3rem;
          span {
            font-size: 0.44rem;
            color: #333;
            font-weight: normal;
          }
        }
      }
      .zj {
        font-size: 0.25rem /* 13/52 */;
        color: #cdad73;
        img {
          width: 0.288462rem /* 15/52 */;
          margin-right: 0.1rem;
        }
      }
      .btn {
        width: 4.423077rem /* 230/52 */;
        height: 0.923077rem /* 48/52 */;
        line-height: 0.923077rem /* 48/52 */;
        text-align: center;
        background-color: #ef5643;
        border-radius: 0.480769rem /* 25/52 */;
        font-size: 0.384615rem /* 20/52 */;
        color: #fff;
        font-weight: bold;
        margin-top: 0.3rem;
      }
    }
    .split-line {
      width: 100vw;
      height: 0.192308rem /* 10/52 */;
      background-color: #f6f6f6;
      margin-top: 0.6rem;
    }
    .list {
      height: 7.5rem /* 672/52 */;
      overflow: hidden;
      padding: 0 0.326923rem /* 17/52 */;
      ul {
        animation: 15s linear 0s infinite normal none running scroll;
        padding: 0;
        li {
          list-style: none;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 1.369231rem /* 66/52 */;
          width: 100%;
          position: relative;
          box-sizing: border-box;
          img {
            width: 0.865385rem /* 45/52 */;
            border-radius: 0.1rem;
          }
          .time {
            align-self: flex-start;
            margin-left: 0.2rem;
            margin-top: 0.3rem;
          }
          &::after {
            content: '';
            position: absolute;
            bottom: 0;
            right: 0;
            width: 6rem;
            height: 1px;
            background-color: #dedede;
          }
        }
      }
    }
  }
  @keyframes scroll {
    100% {
      transform: translateY(-50%);
    }
  }
</style>
