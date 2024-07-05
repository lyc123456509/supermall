<template>
  <main>
    <img src="https://html.sccdyzl.com/vue-cps/bagBoxPrize/bg-title.png" alt="" class="title" />
    <div class="prize_box">
      <div
        class="prize_item"
        v-for="(prizeItem, prizeIndex) in prizeList"
        :key="prizeItem.id"
        :class="activeIndex === prizeIndex ? 'active_item' : ''"
      >
        <img :src="prizeItem" alt="" />
      </div>
    </div>
    <input type="tel" maxlength="11" placeholder="请输入手机号" id="myOrderTel" class="changeInputTel" ref="inputRef" v-model="phone" />
    <div class="btn" @click="btnClick">立即抽奖</div>
    <div class="showList">
      <img src="https://html.sccdyzl.com/vue-cps/bagBoxPrize/more.png" alt="" @click="open" />
      <div class="showBox">
        <div class="show_item" v-for="(showItem, showGoodIndex) in bottomList" :key="showItem.id">
          <div class="imgBox">
            <img :src="showItem.goodImg" alt="" class="goodShowImg" />
            <div
              class="tips"
              :style="{ background: `url(https://html.sccdyzl.com/vue-cps/bagBoxPrize/lv${showItem.level}.png)`, backgroundSize: 'cover' }"
              >{{ levelList[showGoodIndex]['levelName'] }}</div
            >
          </div>
          <div class="show_title">{{ showItem.goodName }}</div>
          <div class="show_price">¥{{ showItem.price }}</div>
        </div>
      </div>
    </div>
    <nut-popup position="bottom" :style="{ height: '70%' }" v-model:visible="showBottom" closeable>
      <div class="wrap">
        <img src="https://html.sccdyzl.com/vue-cps/bagBoxPrize/line3.png" alt="" class="line" />
        <div class="content_wrap">
          <div class="title_box">
            <span style="font-size: 0.32rem">盒内全部商品</span>
            <div class="title_right">
              <img src="https://html.sccdyzl.com/vue-cps/bagBoxPrize/icon2.png" alt="" />
              <div>随机获得以下任意一件商品</div>
            </div>
          </div>
          <div class="list_box">
            <div class="popup_item" v-for="goodsItem in goodsList" :key="goodsItem.id">
              <div class="item_img">
                <div
                  class="tips"
                  :style="{
                    background: `url(https://html.sccdyzl.com/vue-cps/bagBoxPrize/lv${goodsItem.level}.png)`,
                    backgroundSize: 'cover',
                  }"
                  >{{ goodsItem['levelName'] }}</div
                >
                <img :src="goodsItem.goodImg" alt="" class="goodImg" />
              </div>
              <div class="item_info">
                <div class="title">{{ goodsItem.goodName }}</div>
                <span>参考价</span>
                <div class="price"><span style="font-size: 0.2rem">¥</span>{{ goodsItem.price }}</div>
              </div>
            </div>
            <img src="https://html.sccdyzl.com/vue-cps/bagBoxPrize/line3.png" alt="" class="line_bottom" />
            <div class="bottomBox">
              <div class="title">盲盒内商品类型概率</div>
              <div class="showBox">
                <div class="showGoodItem" v-for="bottomItem in levelList" :key="bottomItem.id">
                  <img :src="bottomItem.levelBg" alt="" />
                  <span style="margin: 0.1rem 0">{{ bottomItem.levelName }}</span>
                  <span>{{ bottomItem.probability }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nut-popup>
    <companyInfo />
    <PayMethod @change="payMethodCB" v-show="false" />
    <sideBar
      :itemStyle="{
        'writing-mode': 'tb-rl',
        border: '1px solid red',
        'border-radius': '0.15rem 0 0 0.15rem',
        background: 'rgb(255,244,222)',
      }"
    />
  </main>
</template>

<script setup lang="ts">
  import { PayCenter } from '/@/utils/pay';
  import { Toast } from '@nutui/nutui';
  import { useConfigStore } from '/@/store/modules/platform';
  import useRandomMoney from '/@/hooks/useRandomMoney';
  import { prizeList, bottomList, levelList, goodsList } from './goodsList';
  const { randomMoney } = useRandomMoney();
  const configStore = useConfigStore();
  const info = computed(() => {
    return configStore.info;
  });
  const timer = ref();
  const state = reactive({
    activeIndex: 0,
    phone: '',
    currentIndex: 0,
    showBottom: false,
    payType: '',
  });
  // 获取支付方式
  const payMethodCB = (value: string) => {
    state.payType = value;
  };
  const prize = (index) => {
    state.currentIndex++;
    clearTimeout(timer.value);
    timer.value = setTimeout(() => {
      if (state.currentIndex < index) {
        if (state.activeIndex < 9) {
          state.activeIndex++;
          prize(index);
        } else {
          state.activeIndex = 0;
          prize(index);
        }
      } else {
        clearTimeout(timer.value);
        new PayCenter(info.value.applyIdentification).pay({
          phone: state.phone,
          randomMoney: randomMoney.value,
          payType: state.payType,
        });
      }
    }, 100);
  };
  const randomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  const open = () => {
    state.showBottom = true;
  };
  const btnClick = () => {
    if (state.phone === '') {
      Toast.text('请输入手机号码');
      return;
    }
    if (!/^1[34578][0-9]{9}$/.test(state.phone)) {
      Toast.text('请输入正确的手机号码');
      return;
    }
    scrollTo(0, 0);
    let num = randomInt(11, 19);
    prize(num);
  };

  const { activeIndex, showBottom, phone } = toRefs(state);
</script>
<style lang="scss" scoped>
  .wrap {
    overflow: hidden;
    width: 100%;
    height: 100%;
    position: relative;
    .line {
      height: 0.14rem;
      position: absolute;
      top: 0;
    }
    .content_wrap {
      padding: 0.4rem 0 0.2rem;
      height: calc(100% - 0.6rem);
      background: #f3f3f5;
      .title_box {
        display: flex;
        align-items: center;
        padding-left: 0.3rem;
        img {
          width: 0.52rem;
          height: 0.44rem;
          position: relative;
          left: 0.2rem;
        }
        .title_right {
          display: flex;
          align-items: center;
          margin-left: 0.3rem;
          div {
            background-color: #2c2f34;
            vertical-align: middle;
            color: #fff;
            height: 0.3rem;
            line-height: 0.3rem;
            padding: 0 0.14rem;
            padding-left: 0.3rem;
            font-size: 0.2rem;
            border-radius: 10px;
          }
        }
      }
      .list_box {
        height: calc(100% - 0.44rem);
        overflow-y: auto;
        margin-top: 0.2rem;
        .popup_item {
          display: flex;
          margin-bottom: 0.2rem;
          padding: 0 0.3rem;
        }
        .line_bottom {
          width: 100vw;
          height: 0.14rem;
        }
        .bottomBox {
          width: 6.3rem;
          height: 1.74rem;
          margin: 0.2rem auto;
          padding: 0.2rem;
          text-align: center;
          border-radius: 5px;
          background: #fff;
          .showBox {
            display: flex;
            justify-content: center;
            margin-top: 0.2rem;
            .showGoodItem {
              display: flex;
              flex-direction: column;
              height: 1.16rem;
              width: 1.575rem;
              align-items: center;
              color: #303133;
              img {
                width: 0.66rem;
                height: 0.32rem;
              }
            }
          }
        }
        .item_img {
          position: relative;
          width: 2rem;
          height: 2rem;
          background: #fff;
          margin-right: 0.2rem;
          .tips {
            position: absolute;
            top: 0.1rem;
            left: 0.1rem;
            width: 0.8rem;
            height: 0.34rem;
            color: #fff;
            font-size: 0.22rem;
            text-align: right;
            line-height: 0.34rem;
          }
          .goodImg {
            display: block;
            width: 1.6rem;
            height: 1.6rem;
            margin: 0.2rem auto 0;
          }
        }
        .item_info {
          color: #303133;
          font-size: 0.28rem;
          margin-top: 0.3rem;
          .title {
            height: 0.8rem;
            overflow: hidden;
            word-break: break-all;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
          }
          .price {
            font-size: 0.36rem;
            font-weight: 700;
          }
        }
      }
    }
  }
  main {
    min-width: 100vw;
    min-height: 100vh;
    background-image: url(https://html.sccdyzl.com/vue-cps/bagBoxPrize/bg.png);
    background-repeat: no-repeat;
    background-color: #fee9d8;
    background-size: contain;
    overflow: hidden;
    .footerInfo {
      color: #fff;
    }
    .rule {
      top: 0;
    }
    .title {
      display: block;
      width: 5.34rem;
      height: 1.72rem;
      margin: 0.7rem auto 0;
    }
    .prize_box {
      width: 6.74rem;
      height: 7rem;
      margin: 0 auto;
      padding: 0.3rem 0.35rem 0.5rem;
      box-sizing: border-box;
      overflow: hidden;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      .prize_item {
        width: 1.8rem;
        height: 1.88rem;
        background-color: #fdc846;
        border-radius: 12px;
        // margin-top: 0.2rem;
        // margin-right: 0.2rem;
        img {
          width: 100%;
          height: 1.8rem;
        }
      }
      .active_item {
        position: relative;
        &::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #000;
          border-radius: 12px;
          opacity: 0.5;
        }
      }
    }
    .changeInputTel {
      display: block;
      width: 6.1rem;
      height: 1.04rem;
      line-height: 1.04rem;
      outline: 1px solid #fcf712;
      border: 2px solid #ff6667;
      border-radius: 8px;
      padding-left: 0.3rem;
      background-color: #fee9d8;
      font-size: 0.36rem;
      margin: 0.3rem auto 0;
    }
    .btn {
      width: 6.1rem;
      box-sizing: border-box;
      padding: 0.26rem 0;
      outline: 1px solid #fcf712;
      border: 2px solid #ff6667;
      text-align: center;
      background: linear-gradient(180deg, #ffb9b8, #ff5866, #ff4844);
      border-radius: 26px;
      font-size: 0.4rem;
      color: #fff;
      margin: 0.2rem auto 0;
    }
    .showList {
      position: relative;
      background-color: #fbfbfb;
      margin: 0.5rem 0.1rem 0;
      padding: 0.2rem 0.1rem;
      border: 7px solid #fecc9f;
      outline: 1px solid #ff8640;
      border-radius: 12px;
      width: 6.82rem;
      height: 2.2rem;
      & > img {
        position: absolute;
        top: 0;
        right: 0;
        width: 1.06rem;
        height: 2.28rem;
      }
      .showBox {
        width: calc(100% - 1.06rem);
        height: 100%;
        display: flex;
        overflow: hidden;
        .show_item {
          width: 1.52rem;
          height: 2.18rem;
          margin-right: 0.14rem;
          .imgBox {
            position: relative;
            width: 1.32rem;
            height: 1.32rem;
            box-sizing: border-box;
            background-color: #f3f3f3;
            margin-right: 10px;
            // padding-top: 0.18rem;
            margin-bottom: 0.1rem;
            display: flex;
            justify-content: center;
            align-items: center;
            .goodShowImg {
              width: 1rem;
              height: 1rem;
            }
            .tips {
              position: absolute;
              top: 0.05rem;
              left: 0.1rem;
              width: 0.9rem;
              height: 0.34rem;
              color: #fff;
              font-size: 0.22rem;
              text-align: right;
              line-height: 0.34rem;
            }
          }
          .show_title {
            display: -webkit-box; //将盒子转换为弹性盒子
            -webkit-box-orient: vertical; //文本显示方式，默认水平
            -webkit-line-clamp: 1; //设置显示多少行
            overflow: hidden;
            font-size: 0.25rem;
          }
          .show_price {
            font-size: 0.25rem;
            text-align: center;
          }
        }
      }
    }
  }
</style>
