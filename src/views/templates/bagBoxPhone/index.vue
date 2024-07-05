<template>
  <div class="boxBagIphone">
    <!-- 倒计时 -->
    <div class="bag_top">
      <nut-countdown :end-time="end" class="times" v-model="resetTime">
        <div class="countdown-part-box">
          <div class="part-item h">{{ resetTime.h >= '10' ? resetTime.h : '0' + resetTime.h }}</div>
          <div class="part-item m">{{ resetTime.m >= '10' ? resetTime.m : '0' + resetTime.m }}</div>
          <div class="part-item s">{{ resetTime.s >= '10' ? resetTime.s : '0' + resetTime.s }}</div>
        </div>
      </nut-countdown>
    </div>
    <!-- logo -->
    <div class="log_box">
      <img :src="info.landingPageResponse.logoUrl" alt="" class="mr ml" />
      <span>{{ info.appName }}</span>
    </div>
    <!-- tips -->
    <div class="bag_hint">
      <img src="/src/assets/bagBox/bag_hand_yellow.png" alt="" class="mr mr" />
      <span>超火爆，该最高抽奖品10000+人想要</span>
    </div>
    <!-- 商品详情价格信息 -->
    <div class="bag_content">
      <div class="bag_goodsInfo">
        <div class="bag_good">
          <div class="goodImg">
            <img src="/src/assets/bagBox/bag_iphone.png" alt="" />
          </div>
          <div class="goodInfo">
            <span class="info_title blank">苹果Apple iPhone 14 Pro 支持移动联通电信</span>
            <span class="small_text">有机会抽</span>
            <span class="info_price red"
              >¥<span class="price">{{ showMoney }}</span
              ><span class="price_hint gray">开盒价</span></span
            >
            <div class="market_box">
              <span class="market_price gray">¥10699市场价</span>
              <span class="tag" v-for="(item, index) in tags" :key="index">{{ item }}</span>
            </div>
          </div>
        </div>
        <div class="price_info">
          <div class="info_row gray">
            <div class="info_name">
              <img src="/src/assets/bagBox/bag_price.png" alt="" class="imgSize mr" />
              <span class="">市场价 :</span>
            </div>
            <div class="info_value">¥10699</div>
          </div>
          <div class="info_row">
            <div class="info_name blank">
              <img src="/src/assets/bagBox/bag_hand_blank.png" alt="" class="imgSize mr" />
              <span>奖励开盒价 :</span>
            </div>
            <div class="info_value red">¥{{ showMoney }}</div>
          </div>
          <div class="info_row blank">
            <div class="info_name">
              <img src="/src/assets/bagBox/bag_icon_hot.png" alt="" class="imgSize mr" />
              <span>有机会到手 :</span>
            </div>
            <div class="info_value red">苹果Apple iPhone 14 Pro手机</div>
          </div>
        </div>
      </div>
      <!-- 输入手机号模块 -->
      <div class="userPhone">
        <img class="phone_img" src="/src/assets/skyblue/icon_phone.png" alt="" />
        <nut-input
          type="tel"
          v-model="phone"
          placeholder="请输入您的手机号"
          maxLength="11"
          :border="false"
          :style="{
            width: '4rem',
            height: '1rem',
            lineHeight: '1rem',
            fontSize: '0.32rem',
            background: '#fff',
            padding: '0',
            margin: '0 0.2rem',
          }"
        />
      </div>
      <img src="/src/assets/bagBox/nowGet.png" class="nowGet" alt="" @click="payMethod" />
      <PayMethod @change="payMethodCB" />
    </div>
    <!-- 底部详情图 -->
    <div class="img_info">
      <div class="info_title">— 最高抽奖品介绍 —</div>
      <img src="/src/assets/bagBox/bag_intor.png" class="banner_intor" alt="" width="100%" />
    </div>
    <footer>
      <!-- 商品展示 -->
      <div class="probability_box">
        <div class="probability_title">营业执照及奖品概率：</div>
        <div class="probability_img">
          <img src="/src/assets/bagBox/bag_show_photo.png" class="bag_show_photo" alt="" />
          <div class="bag_goods">
            <template v-if="list && list.length > 0">
              <div class="bag_goods_item _flex" v-for="bagGood in list.slice(0, 4)" :key="bagGood.id">
                <img :src="bagGood.pictureUrl" alt="" />
              </div>
            </template>
          </div>
          <div class="see_detail" @click="openGoodsDetail">查看详情</div>
        </div>
      </div>
      <!-- 底部概率展示 -->
      <div class="level_box">
        <div class="level_info" v-for="level in 4" :key="level">
          <template v-if="levelList && levelList.length > 0">
            <img :src="`https://nginx-beta.oss-cn-chengdu.aliyuncs.com/h5/bagBox/bag_level_${level}.png`" alt="" />
            <span>{{ levelList[level - 1].gradeProbability }}%</span>
          </template>
        </div>
      </div>
      <companyInfo />
    </footer>
  </div>
  <redSideBar />
  <goodsList
    ref="goodsListRef"
    :list="list"
    :levelList="levelList"
    :footerStyle="{ 'padding-bottom': '0.3rem' }"
    v-if="list && list.length > 0"
  />
</template>

<script setup lang="ts">
  import { useConfigStore } from '/@/store/modules/platform';
  import useCheckOrder from '/@/hooks/useCheckOrder';
  import useRandomMoney from '/@/hooks/useRandomMoney';
  import { getGoods, getGradeGoods } from '/@/api/bagBox';
  import { businessDomain } from '/~/config/constant';
  import { PayCenter } from '/@/utils/pay';
  import { Toast } from '@nutui/nutui';
  import goodsList from '/@/components/goodsList/index.vue';
  import redSideBar from '/@/components/redSideBar/index.vue';
  const { randomMoney, showMoney } = useRandomMoney();
  const configStore = useConfigStore();
  const info = computed(() => {
    return configStore.info;
  });
  useCheckOrder();
  const tags = ['盲盒', '正品官方', '4G双卡']; // 商品tags标签
  const goodsListRef = ref(null);
  const state = reactive({
    end: Date.now() + 60 * 1000 * 15,
    resetTime: {
      h: '00',
      m: '00',
      s: '00',
    },
    phone: '', // 手机号
    payType: '', // 支付方式
    list: [] as any[], // 商品数据
    levelList: [] as any[], // 等级数据
  });

  const init = async (): Promise<void> => {
    const listRes = await getGoods({ currentPage: 1, pageSize: 50 }, businessDomain['xjc'][import.meta.env.MODE]);
    const levelRes = await getGradeGoods({}, businessDomain['xjc'][import.meta.env.MODE]);
    state.list = listRes.data.value.rows;
    state.levelList = levelRes.data.value.content;
  };
  init();
  // 获取支付方式
  const payMethodCB = (value: string) => {
    state.payType = value;
  };
  // 弹窗开启
  const openGoodsDetail = () => {
    goodsListRef.value && (goodsListRef.value as any).openGoodsDetail();
  };
  // 支付
  const payMethod = () => {
    if (state.phone === '') {
      Toast.text('请输入手机号码');
      return;
    }
    if (!/^1[34578][0-9]{9}$/.test(state.phone)) {
      Toast.text('请输入正确的手机号码');
      return;
    }
    new PayCenter(info.value.applyIdentification).pay({
      phone: state.phone,
      randomMoney: randomMoney.value,
      payType: state.payType,
    });
  };
  const { end, resetTime, phone, list, levelList } = toRefs(state);
</script>
<style lang="scss" scoped>
  .ml {
    margin-left: 0.37rem;
  }
  .mr {
    margin-right: 0.1rem;
  }
  .imgSize {
    width: 0.26rem;
    height: 0.26rem;
  }
  .gray {
    color: #504f50;
  }

  .blank {
    color: #000000;
  }
  .red {
    color: #dc3e27;
  }
  .boxBagIphone {
    width: 100vw;
    font-family: PingFang SC;
    font-size: 0.26rem;
    // 顶部
    .bag_top {
      position: relative;
      width: 100%;
      height: 2.32rem;
      background: url(/@/assets/bagBox/bag_bg.png) no-repeat;
      background-size: 100% 100%;
      // 倒计时
      .times {
        position: absolute;
        right: 0.55rem;
        bottom: 0.6rem;
        font-size: 0.44rem;
        font-family: PingFang;
        font-weight: 800;
        color: #dc3e27;
        width: 2.3rem;
        .countdown-part-box {
          width: 100%;
          display: flex;
          justify-content: space-between;

          div {
            width: 27%;
            text-align: center;
          }
        }
      }
    }
    // logo
    .log_box {
      height: 0.91rem;
      display: flex;
      align-items: center;
      font-size: 0.27rem;
      font-weight: 400;
      color: #666666;
      line-height: 51px;

      img {
        width: 0.37rem;
        height: 0.37rem;
      }
    }

    .bag_hint {
      height: 0.81rem;
      background: linear-gradient(to left, #fdfcf2, #faf7d7);
      display: flex;
      align-items: center;
      img {
        width: 0.41rem;
        height: 0.41rem;
      }
      span {
        font-size: 0.26rem;
        font-weight: 500;
        color: #c76222;
      }
    }

    .bag_content {
      margin: 0.32rem 0.24rem 0.49rem;
      width: calc(100% - 0.48rem);
      .bag_goodsInfo {
        .bag_good {
          display: grid;
          grid-template-rows: 100%;
          grid-template-columns: 1.95rem auto;
          gap: 0.22rem;
          .goodImg {
            width: 1.95rem;
            height: 1.95rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #f4f5f4;
            border-radius: 10px;
            img {
              width: 1.62rem;
              height: 1.62rem;
            }
          }
          .goodInfo {
            display: flex;
            flex-direction: column;
            padding-top: 0.07rem;
            .info_title {
              display: inline-block;
              width: 4.72rem;
              font-size: 0.27rem;
              font-weight: 500;
              color: #000000;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            .small_text {
              font-size: 0.21rem;
              color: #666666;
              line-height: 0.45rem;
            }
            .info_price {
              margin: 0.1rem 0;
              font-size: 0.28rem;
              .price {
                font-size: 0.4rem;
              }
              .price_hint {
                font-size: 0.16rem;
                zoom: 0.8;
              }
            }
            .market_box {
              .market_price {
                margin-right: 0.1rem;
                color: #666;
              }
              .tag {
                border: 1px solid #dc3e27;
                border-radius: 4px;
                font-size: 0.17rem;
                font-family: PingFang;
                font-weight: bold;
                color: #dc3e27;
                padding: 0.01rem 0.1rem;
                margin-left: 0.05rem;
                zoom: 0.8;
              }
            }
          }
        }
        .price_info {
          display: grid;
          margin-top: 0.4rem;
          grid-template-rows: repeat(3, 0.7rem);
          .info_row {
            display: grid;
            grid-template-columns: 32% 68%;
            font-size: 0.25rem;
          }
          .info_value {
            text-align: right;
          }
        }
      }
      .userPhone {
        display: flex;
        align-items: center;
        width: 6rem;
        height: 1rem;
        margin: 0 auto;
        border-radius: 0.5rem;
        background: #fff;
        border: 1px solid rgba(181, 43, 47, 0.61);
        border-radius: 53px;
        .phone_img {
          width: 0.28rem;
          height: 0.4rem;
          margin-left: 0.4rem;
        }
      }
      .nowGet {
        display: block;
        width: 6.1rem;
        height: 1.1rem;
        margin: 0.2rem auto 0.2rem auto;
        animation: scaleAnimation 0.7s linear infinite;
      }
    }
    .img_info {
      text-align: center;
      font-size: 0.21rem;
      font-family: PingFang;
      font-weight: 500;
      .info_title {
        color: #1b1b1b;
        opacity: 0.5;
        margin-bottom: 0.28rem;
      }
      .banner_intor {
        width: 100%;
      }
    }
    // 底部
    footer {
      display: block;
      margin-top: 0.2rem;
      .probability_box {
        width: 7.3rem;
        height: 1.87rem;
        margin: 0 auto;
        background: #f5f8fa;
        border-radius: 10px;
        .probability_title {
          font-size: 0.21rem;
          font-family: PingFang;
          font-weight: 500;
          color: #242424;
          line-height: 0.3rem;
        }
        .probability_img {
          margin-top: 0.15rem;
          display: grid;
          grid-template-columns: 1.73rem auto 0.38rem;
          .bag_show_photo {
            width: 1.73rem;
            height: 1.23rem;
          }
          .bag_goods {
            width: calc(100% - 0.2rem);
            height: 1.22rem;
            display: flex;
            justify-content: space-between;
            padding: 0.1rem;
            .bag_goods_item {
              width: 20%;
              height: calc(100% - 0.3rem);
              border: 0.05rem solid rgb(187, 187, 187);
              border-radius: 7px;
              display: flex;
              justify-content: center;
              align-items: center;
              img {
                width: 80%;
                height: 80%;
              }
            }
          }
          .see_detail {
            background: #e2e5e9;
            opacity: 0.8;
            border-radius: 4px;
            height: 1.22rem;
            text-align: center;
            zoom: 0.9;
            padding: 0.09rem 0.03rem;
          }
        }
      }
      .level_box {
        display: grid;
        grid-template-columns: repeat(4, 1.5rem);
        justify-content: space-around;
        margin: 0.44rem 0;
        span {
          display: inline-block;
          text-align: center;
          width: 100%;
        }
        img {
          height: 0.56rem;
        }
      }
    }
  }
</style>
