<template>
  <div>
    <div class="wp-landing30 pro4">
      <div class="logo"></div>
      <div class="get-box-tips">{{ showMoney }}元抽iPhone 14 Pro盲盒</div>
      <!-- 顶部swiper -->
      <div class="swiper_top">
        <nut-swiper :init-page="page" :loop="true" ref="swiper">
          <nut-swiper-item v-for="(item, index) in swiperList" :key="index">
            <img :src="item.logoImg" alt="" class="log" v-if="item.logoImg" />
            <img :src="item.goodsTips" alt="" class="goodsTips" v-if="item.goodsTips" />
            <img :src="item.imgUrl" alt="" class="goods_img" />
            <div class="goods_info _flex">
              <div class="level _flex_dir_col">
                <span v-for="(level, levelIndex) in item.level" :key="levelIndex">{{ level }}</span>
              </div>
              <div class="goodsName _flex_dir_col">
                <span
                  v-for="(goodsName, goodsNameIndex) in item.goodsName"
                  :key="goodsNameIndex"
                  class="_flex_dir_col"
                  :class="`name_${goodsNameIndex}`"
                  >{{ goodsName }}</span
                >
              </div>
              <div class="info_price">
                <div class="goodsPrice _flex_dir_col">
                  <span class="price_text">市场价</span>
                  <span>¥{{ item.price }}</span>
                </div>
              </div>
            </div>
          </nut-swiper-item>
        </nut-swiper>
      </div>
      <!-- swiper按钮 -->
      <div class="nut-swiper-btns">
        <div class="btn nut-swiper-btn__left" @click="handlePrev"></div>
        <div class="btn nut-swiper-btn__right" @click="handleNext"></div>
      </div>
      <!-- 价格时间倒计时 -->
      <div class="price-sale">
        <div class="price">
          <div class="box-price">
            <div class="num"
              ><span style="font-size: 0.35rem">¥</span>{{ leftPrice }}<span class="decimal">{{ rightPrice }}</span></div
            >
            <div class="title"><span class="text">开盒价</span></div>
          </div>
        </div>
        <div class="sale-time shock-lr">
          <nut-countdown :endTime="end" v-model="resetTime" millisecond format="HH:mm:ss:SS">
            <div class="countdown-part-box _flex countdown">
              <span>请在</span>
              <div class="part-item ml">{{ resetTime.m >= '10' ? resetTime.m : '0' + resetTime.m }}</div>
              <span class="part-item-symbol">:</span>
              <div class="part-item s">{{ resetTime.s >= '10' ? resetTime.s : '0' + resetTime.s }}</div>
              <span class="part-item-symbol">:</span>
              <div class="part-item mr">{{
                (Number(resetTime.ms) / 10).toFixed(0) >= '10'
                  ? (Number(resetTime.ms) / 10).toFixed(0)
                  : '0' + (Number(resetTime.ms) / 10).toFixed(0)
              }}</div>
              <span>内完成支付</span>
            </div>
          </nut-countdown>
          <div class="overtime-tips">超时不付款将失去购买优惠</div>
        </div>
      </div>

      <!-- 商品标题 -->
      <div class="high-pro-name"
        ><span class="label"><i class="text">最高抽</i></span
        >苹果Apple iPhone 14 Pro 支持移动联通电信5G双卡双待手机</div
      >
      <!-- 输入手机号模块 -->
      <div class="vip-tel">
        <div class="title">提货手机号：</div>
        <div class="tel">
          <input
            type="tel"
            maxlength="11"
            placeholder="请输入您的提货手机号"
            id="myOrderTel"
            class="changeInputTel"
            ref="inputRef"
            v-model="phone"
          />
          <span class="tips">
            <i class="text">手机号输错</i>
            <i class="text">将无法提货</i>
          </span>
        </div>
      </div>
      <!-- 支付方式 -->
      <div class="choose-pay-mode">
        <div class="item selected">
          <div class="icon"><img src="https://nginx-beta.oss-cn-chengdu.aliyuncs.com/h5/bagBox/wx1.svg" /></div>
          <div class="name">微信</div>
          <div class="sale-tips _flex_cc"><span class="text">首单随机立减，最高至免单</span></div>
          <div class="radio"></div>
        </div>
      </div>
      <!-- 协议模块 -->
      <div class="is-agree">
        <span class="checkbox selected"></span>
        <span class="text"
          >同意 《<a class="link" @click="ruleClick(1)">隐私协议</a>》 《<a @click="ruleClick(2)" class="link">购买说明</a>》 《<a
            class="link"
            @click="ruleClick(3)"
            >未成年人不得购买</a
          >》 《<a @click="ruleClick(4)" class="link">盲盒不支持7天无理由退换货</a>》
        </span>
      </div>
      <!-- 商品参数 -->
      <div class="high-pro-para"></div>
      <!-- 商品tips -->
      <div class="ensure"><div class="logo"></div><div class="text">苹果手机 | 最高抽得该商品，官方100%正品</div></div>
      <!-- swiper滑动栏 -->
      <div class="contain-pro">
        <div class="title-more">
          <div class="title">该盒100%必中以下商品之一</div>
          <div class="check-more-btn" @click="openGoodsDetail">查看详情&gt;</div>
        </div>
        <div class="contain-pro-main">
          <template v-if="list && list.length > 0">
            <nut-swiper :init-page="1" ref="swiper2" class="swiper-pro" auto-play="1000" width="50" duration="31000">
              <nut-swiper-item v-for="goodItem in list" :key="goodItem.id" class="swiper-slide">
                <div class="pro">
                  <div class="pic">
                    <img :src="goodItem.pictureUrl" alt="" />
                  </div>
                  <div class="pro-level" :class="`level${goodItem.gradeId}`"></div>
                </div>
              </nut-swiper-item>
            </nut-swiper>
          </template>
          <div class="chance-list">
            <template v-if="levelList && levelList.length > 0">
              <div class="pro-level" v-for="levelItem in levelList" :key="levelItem.gradeId"
                ><span class="text"
                  >{{ levelItem.gradeName }}<i class="num">{{ levelItem.gradeProbability }}%</i></span
                ></div
              >
            </template>
          </div>
        </div>
      </div>

      <!-- iPhone 14 Pro的评论 -->
      <div class="user-comment pro4-comment">
        <div class="item">
          <div class="user">
            <div class="avatar"><img src="https://nginx-beta.oss-cn-chengdu.aliyuncs.com/h5/bagBox/avatar1.jpg" /></div>
            <div class="info">
              <div class="name">182***1456</div>
              <div class="time">2天前</div>
            </div>
          </div>
          <div class="comment">
            <div class="content"
              >我这运气也真的是太好，一发入魂，直接给我来了个至尊款大奖。申请发货才2天，就顺丰送到家了。没拆封，应该是正品。一定要给商家点个赞，想换手机的真的可以试试，希望你也们可以开中。</div
            >
            <div class="pic-list">
              <div class="pic"><img src="https://nginx-beta.oss-cn-chengdu.aliyuncs.com/h5/bagBox/pic1.jpg" /></div>
              <div class="pic"><img src="https://nginx-beta.oss-cn-chengdu.aliyuncs.com/h5/bagBox/pic2.jpg" /></div>
              <div class="pic"><img src="https://nginx-beta.oss-cn-chengdu.aliyuncs.com/h5/bagBox/pic3.jpg" /></div>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="user">
            <div class="avatar"><img src="https://nginx-beta.oss-cn-chengdu.aliyuncs.com/h5/bagBox/avatar2.jpg" /></div>
            <div class="info">
              <div class="name">137***6762</div>
              <div class="time">5天前</div>
            </div>
          </div>
          <div class="comment">
            <div class="content"
              >手机拿到手那一刻，真的很激动，没想到真的给我发货了。前天开盒开中的，当时还不相信，抱着试一试的态度，填了地址，结果真给我发过来了。手机显示真的很惊艳，拍照非常清晰，太棒了。</div
            >
            <div class="pic-list">
              <div class="pic"><img src="https://nginx-beta.oss-cn-chengdu.aliyuncs.com/h5/bagBox/pic4.jpg" /></div>
              <div class="pic"><img src="https://nginx-beta.oss-cn-chengdu.aliyuncs.com/h5/bagBox/pic5.jpg" /></div>
              <div class="pic"><img src="https://nginx-beta.oss-cn-chengdu.aliyuncs.com/h5/bagBox/pic6.jpg" /></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 华为Mate 50 Pro的评论 -->
      <!-- <div class="user-comment pro5-comment">
        <div class="item">
          <div class="user">
            <div class="avatar"><img src="https://apkdl.mochai.store/pic/lede/images/landing30/avatar1.jpg" /></div>
            <div class="info">
              <div class="name">136****2678</div>
              <div class="time">2天前</div>
            </div>
          </div>
          <div class="comment">
            <div class="content"
              >我这运气也真的是太好，一发入魂，直接给我来了个至尊款大奖。申请发货才2天，就顺丰送到家了。没拆封，应该是正品。一定要给商家点个赞，想换手机的真的可以试试，希望你也们可以开中。</div
            >
            <div class="pic-list">
              <div class="pic"><img src="https://apkdl.mochai.store/pic/lede/images/landing30/pic8.jpg" /></div>
              <div class="pic"><img src="https://apkdl.mochai.store/pic/lede/images/landing30/pic9.jpg" /></div>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="user">
            <div class="avatar"><img src="https://apkdl.mochai.store/pic/lede/images/landing30/avatar2.jpg" /></div>
            <div class="info">
              <div class="name">132****4614</div>
              <div class="time">5天前</div>
            </div>
          </div>
          <div class="comment">
            <div class="content"
              >手机拿到手那一刻，真的很激动，没想到真的给我发货了。前天开盒开中的，当时还不相信，抱着试一试的态度，填了地址，结果真给我发过来了。手机显示真的很惊艳，拍照非常清晰，太棒了。</div
            >
            <div class="pic-list">
              <div class="pic"><img src="https://apkdl.mochai.store/pic/lede/images/landing30/pic10.jpg" /></div>
              <div class="pic"><img src="https://apkdl.mochai.store/pic/lede/images/landing30/pic11.jpg" /></div>
            </div>
          </div>
        </div>
      </div> -->

      <companyInfo />
    </div>
    <!-- 悬浮支付按钮 -->
    <div class="footer">
      <div class="pos-f">
        <div class="pos-a">
          <div class="total-price">
            <div class="text"
              >【开盒价】<span class="price">¥{{ showMoney }}</span></div
            >
          </div>
          <div class="confirm-btn pub-scaleBigSmall btn_confirm_pay" @click="payMethod"><span class="text">付款提货</span></div>
        </div>
      </div>
    </div>
    <goodsList
      ref="goodsListRef"
      :list="list"
      :levelList="levelList"
      :footerStyle="{ 'padding-bottom': '1.3rem' }"
      v-if="list && list.length > 0"
    />
    <!-- 确认订单是否支付完成 -->
    <!-- <div class="pub-popBox dp-n" id="popBox-is-paid">
      <div class="pub-mask"></div>
      <div class="pub-middle">
        <div class="ppb-is-paid">
          <h3 class="title">请确认是否已完成付款</h3>
          <div class="operate">
            <div class="had-pay-btn" onclick="$.doMyOrderQuery(false);">我已支付</div>
            <div class="pay-again-btn" onclick="$.doMyTryPayAgain();">支付失败 重新支付</div>
          </div>
          <div class="pub-close-btn" onclick="$.hidePayResultDlg();"></div>
        </div>
      </div>
    </div> -->

    <!-- 提示重新支付弹窗 -->
    <!-- <div class="pub-popBox dp-n" id="popBox-pay-again">
      <div class="pub-mask"></div>
      <div class="pub-middle">
        <div class="ppb-pay-again">
          <h3 class="title"><span class="text">您还没有完成付款</span><span class="text">请点击<i>“重新支付”</i>进行付款</span></h3>
          <div class="operate">
            <div class="pay-again-btn" onclick="$.hidePayAgainDlg('tryPayAgain');">重新支付</div>
          </div>
          <div class="pub-close-btn" onclick="$.hidePayAgainDlg();"></div>
        </div>
      </div>
    </div> -->

    <PayMethod @change="payMethodCB" v-show="false" />
    <popupArg :content="content" :title="title" ref="argRef" />
    <bagBoxRule />
    <!-- 盲盒购买说明弹窗 -->
    <popupArg title="购买说明" ref="shopArgRef" contentRender>
      <div class="buy-intro">
        <div class="intro-item">
          <h3 class="title"><i class="serial-num">一.</i><i class="text">服务说明</i></h3>
          <p class="intro1"
            ><i class="serial-num"></i
            ><i class="text"
              >用户在本平台购买/兑换盲盒应遵守本规则。用户开始使用及或继续使用本平台服务即视为用户同意并已经接受本规则中全部内容。此后用户不得以未阅读/未同意本规则内容或类似理由提出任何形式的抗辩。</i
            ></p
          >
        </div>
        <div class="intro-item">
          <h3 class="title"><i class="serial-num">二.</i><i class="text">盲盒</i></h3>
          <p class="intro"
            ><i class="serial-num">2.1</i
            ><i class="text"
              >盲盒是一种商品。用户打开盲盒后可随机获得该盲盒中包含的一款商品中的一个，该盲盒中包含的商品在每个盲盒详情页的商品明细中会有显示和说明。盲盒属于特殊的消耗品，一旦打开后就不可以退换。</i
            ></p
          >
          <p class="intro"
            ><i class="serial-num">2.2</i
            ><i class="text"
              >盲盒中包含的商品的价值和盲盒本身的销售/兑换价格不同，两者之间并没有关联性。盲盒的销售/兑换价格以用户购买/兑换该盲盒时页面展示为准（一般显示为“XXX元/盒”或“￥XXX/盒”）。</i
            ></p
          >
          <p class="intro"
            ><i class="serial-num">2.3</i
            ><i class="text">用户可在盲盒详情页查看打开该盲盒后可能获得的商品信息。用户理解并同意打开盲盒可能获得重复的商品。</i></p
          >
          <p class="intro"
            ><i class="serial-num">2.4</i
            ><i class="text"
              >用户理解并同意打开盲盒后可能获得的商品信息包括但不限于商品的名称、规格型号、颜色、价格、数量、是否有货等可能随时发生变动，本平台将不会另行通知，具体以用户下单时详情页展示的信息为准。</i
            ></p
          >
          <p class="intro"
            ><i class="serial-num">2.5</i
            ><i class="text"
              >用户通过宣传广告支付购买的盲盒，会存放在APP里面的盲盒仓库中，需要用户下载我们APP，并在盲盒仓库中打开盲盒后可获得盲盒中的其中一款商品。如果用户是在APP内购买盲盒，则购买的盲盒会立即自动打开，而不会和用户进行再次确认</i
            ></p
          >
        </div>
        <div class="intro-item">
          <h3 class="title"><i class="serial-num">三.</i><i class="text">盲盒商品发货</i></h3>
          <p class="intro"
            ><i class="serial-num">3.1</i
            ><i class="text"
              >用户在线打开盲盒后获得的商品将放入趣袋，用户可在趣袋中查看已获得的商品并进行发货操作。用户发货时需要为每件商品支付运费，具体的运费金额以下单发货时页面中显示的金额为准。通常情况本平台会在用户运费支付成功后的7个工作日内进行发货，如遇节假日则发货时间顺延。
              如遇到如疫情、自然灾害、临时缺货、地区偏远等特殊情况，则发货时间待定，平台将在满足发货条件后尽快为用户安排发货。</i
            ></p
          >
          <p class="intro"
            ><i class="serial-num">3.2</i
            ><i class="text"
              >虚拟商品（如话费充值等）通常是在用户提交充值请求成功后的24小时内充值到账。如遇到充值通道故障、临时缺货等特殊情况，则发货时间待定，平台将在满足发货条件后尽快为用户安排发货。</i
            ></p
          >
          <p class="intro"><i class="serial-num">3.3</i><i class="text">用户在趣袋进行发货操作后不可取消发货。</i></p>
          <p class="intro"
            ><i class="serial-num">3.4</i
            ><i class="text">用户理解并同意预售商品发货时间以用户购买时商品页面展示及客服通知的时间为准。</i></p
          >
          <p class="intro"
            ><i class="serial-num">3.5</i
            ><i class="text"
              >用户需要在商品放入趣袋后的规定时间内完成发货，否则视为交易违约，系统将扣除用户购买该盲盒时实际支付购盒费用的30%作为违约金后自动将该商品回收。具体的规定时间以趣袋页面中说明为准。</i
            ></p
          >
        </div>
        <div class="intro-item">
          <h3 class="title"><i class="serial-num">四.</i><i class="text">售后</i></h3>
          <p class="intro"
            ><i class="serial-num">4.1</i
            ><i class="text">用户理解并同意，鉴于盲盒商品的特殊性，如无质量问题，用户在线开盒后获得的商品不支持七天无理由退换货。</i></p
          >
          <p class="intro"
            ><i class="serial-num">4.2</i
            ><i class="text">用户收到商品后，出现质量问题的，用户需要提供开箱视频并由本平台进行确认，比如出现以下情况：</i></p
          >
          <p class="intro"><i class="serial-num">（1）</i><i class="text">商品错发或者数量不符</i></p>
          <p class="intro"><i class="serial-num">（2）</i><i class="text">商品在运输过程造成严重破损</i></p>
          <p class="intro"><i class="serial-num">（3）</i><i class="text">商品做工存在明显瑕疵</i></p>
          <p class="intro"
            ><i class="serial-num">4.3</i
            ><i class="text">因工艺原因存在微瑕的手办公仔类商品、电镀板件水纹、轻微盒损的商品、商品漆味重等均不属于质量问题。</i></p
          >
        </div>
      </div>
    </popupArg>
  </div>
</template>

<script setup lang="ts">
  import { PayCenter } from '/@/utils/pay';
  import { Toast } from '@nutui/nutui';
  import { useConfigStore } from '/@/store/modules/platform';
  import useCheckOrder from '/@/hooks/useCheckOrder';
  import useRandomMoney from '/@/hooks/useRandomMoney';
  import goodsList from '/@/components/goodsList/index.vue';
  import popupArg from '/@/components/popupArg/index.vue';
  import bagBoxRule from '/@/components/bagBoxRule/index.vue';
  import { getGoods, getGradeGoods } from '/@/api/bagBox';
  import { businessDomain } from '/~/config/constant';
  import { swiperList, shopRule, shopRule2 } from '../bagOpenBox/goodsList';
  const { randomMoney, showMoney } = useRandomMoney();
  const configStore = useConfigStore();
  const info = computed(() => {
    return configStore.info;
  });
  useCheckOrder();
  const swiper = ref(null);
  const inputRef = ref(null);
  const goodsListRef = ref(null);
  const argRef = ref(null);
  const shopArgRef = ref(null);
  const state = reactive({
    page: 0,
    end: Date.now() + 60 * 1000 * 5,
    resetTime: {
      h: '00',
      m: '00',
      s: '00',
      ms: '00',
    },
    list: [] as any[], // 商品数据
    levelList: [] as any[], // 等级数据
    phone: '',
    // showBasic: false,
    payType: '',
    content: '',
    title: '',
  });
  const leftPrice = computed(() => {
    return parseInt(showMoney.value);
  });
  const rightPrice = computed(() => {
    const len = showMoney.value.toString().indexOf('.');
    return showMoney.value.toString().slice(len);
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
  // const noPayPopup = () => {
  //   state.showBasic = true;
  // };

  const ruleClick = (val: number): void => {
    switch (val) {
      case 1:
        window.location.href = info.value.landingPageResponse.userShValue;
        break;
      case 2:
        shopArgRef.value && (shopArgRef.value as any).open();
        break;
      case 3:
        state.title = shopRule.title;
        state.content = shopRule.content;
        argRef.value && (argRef.value as any).open();
        break;
      case 4:
        state.title = shopRule2.title;
        state.content = shopRule2.content;
        argRef.value && (argRef.value as any).open();
        break;
      default:
        break;
    }
  };

  const handlePrev = (): void => {
    swiper.value && (swiper.value as any).prev();
  };
  const handleNext = (): void => {
    swiper.value && (swiper.value as any).next();
  };
  // 弹窗开启
  const openGoodsDetail = () => {
    goodsListRef.value && (goodsListRef.value as any).openGoodsDetail();
  };
  // 支付
  const payMethod = () => {
    if (state.phone === '') {
      Toast.text('请输入手机号码');
      inputRef.value && (inputRef.value as any).focus();
      return;
    }
    if (!/^1[34578][0-9]{9}$/.test(state.phone)) {
      Toast.text('请输入正确的手机号码');
      inputRef.value && (inputRef.value as any).focus();
      return;
    }
    new PayCenter(info.value.applyIdentification).pay({
      phone: state.phone,
      randomMoney: randomMoney.value,
      payType: state.payType,
    });
  };

  const { page, end, resetTime, list, levelList, phone, content, title } = toRefs(state);
</script>

<style lang="scss" scoped>
  $levelGradient1: linear-gradient(to bottom, #ff6754, #fa355e);
  $levelGradient2: linear-gradient(to bottom, #fbbf3a, #fd9620);
  $levelGradient3: linear-gradient(to bottom, #df97ec, #ba5fee);
  $levelGradient4: linear-gradient(to bottom, #57cdff, #4399ff);
  i {
    font-style: normal;
  }
  ._flex {
    display: flex;
  }
  ._flex_dir_col {
    display: flex;
    flex-direction: column;
  }
  ._flex_cc {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  // swiper按钮
  .nut-swiper-btns {
    width: 98%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 12%;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    .btn {
      width: 0.4rem;
      height: 0.7rem;
      background: url('https://nginx-beta.oss-cn-chengdu.aliyuncs.com/h5/bagBox/bg1.png') no-repeat;
      background-size: 100% 100%;
      opacity: 0.3;
    }
    .nut-swiper-btn__right {
      transform: rotateY(180deg);
    }
  }

  // 活动规则悬浮图标
  .check-rules-btn {
    position: absolute;
    right: 0;
    top: 1rem;
    z-index: 11;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 0.48rem;
    height: 1.3rem;
    border-radius: 0.3rem 0 0 0.3rem;
    background: linear-gradient(to right, #999, #ccc);
    font-size: 0.25rem;
    color: #fff;
    writing-mode: vertical-lr;
    zoom: 0.8;
  }

  .wp-landing30 {
    padding-top: 0.2rem;
    .get-box-tips {
      line-height: 0.25rem;
      color: #ccc;
      font-size: 0.25rem;
      text-align: center;
    }
    // 顶部swiper
    .swiper_top {
      position: relative;
      margin-top: 0.45rem;
      height: 5.2rem;
      .nut-swiper {
        height: 100%;
      }
      .nut-swiper-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 100%;
        flex-direction: column;
        position: relative;
        .goods_img {
          width: 40%;
        }
        .goodsTips {
          position: absolute;
          right: 1.5rem;
          bottom: 1.78rem;
          width: 2.17rem;
          height: 1.66rem;
        }

        .log {
          position: absolute;
          left: 1.6rem;
          top: 0rem;
          width: 0.4rem;
          height: 0.4rem;
        }
        .goods_info {
          width: 100%;
          overflow: hidden;
          height: 1.02rem;
          // margin-top: 0.4rem;
          background-color: #b00d24;
          .level {
            width: 1.3rem;
            color: #fff;
            justify-content: center;
            align-items: center;
            span {
              margin-top: 0.05rem;
              font-size: 0.3rem;
            }
          }
          .goodsName {
            width: 55%;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            height: 100%;
            background: linear-gradient(to right, #8a06a4, #b00d24 25%, #b00d24 100%);
            font-size: 0.32rem;
            color: #fff;
            font-weight: bold;
            .name_1 {
              font-size: 0.22rem;
              margin-top: 0.09rem;
            }
          }

          .info_price {
            width: 2rem;
            height: 2rem;
            display: flex;
            align-items: center;
            box-sizing: border-box;
            border-radius: 50%;
            color: #b40e17;
            font-weight: bold;
            background-color: #fae2b0;
            transform: translate(15%, -25%);
            font-size: 0.35rem;
            .goodsPrice {
              width: 1.8rem;
              text-align: center;
              height: 40%;
              margin-top: 0.15rem;
              font-size: 0.4rem;
            }
            .price_text {
              font-size: 0.25rem;
            }
            span {
              margin-left: 0.2rem;
            }
          }
        }
      }
    }
    // 价格时间
    .price-sale {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0.2rem 0.2rem 0;
      padding: 0.2rem 0.2rem 0.2rem 0.77rem;
      color: #fff;
      border-radius: 0.2rem;
      background: linear-gradient(to right, #ff4460, #fa3c38);
      .box-price {
        position: relative;
        display: flex;
        align-items: flex-end;
        .num {
          height: 0.65rem;
          line-height: 0.65rem;
          color: #fff;
          font-size: 0.82rem;
          font-weight: bold;
          .decimal {
            font-size: 0.36rem;
          }
        }
        .title {
          position: absolute;
          left: -0.75rem;
          top: 0rem;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 0.85rem;
          height: 0.3rem;
          margin-left: 0.1rem;
          border-radius: 0.15rem 0.15rem 0.15rem 0;
          background-color: #fff;
          .text {
            line-height: 0.25rem;
            color: #fd3e48;
            font-size: 0.25rem;
            font-weight: bold;
            zoom: 0.92;
          }
        }
      }
      .sale-time {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        animation: shockLR 0.6s linear forwards;
        animation-iteration-count: 3;
        .countdown {
          line-height: 0.28rem;
          color: #fff;
          font-size: 0.28rem;
          align-items: center;
          .part-item {
            display: inline-block;
            width: 0.42rem;
            height: 0.42rem;
            line-height: 0.42rem;
            border-radius: 0.1rem;
            color: #fd5258;
            font-size: 0.3rem;
            font-weight: bold;
            text-align: center;
            background-color: #fff;
          }
          .part-item-symbol {
            display: inline-block;
            width: 0.25rem;
            height: 0.5rem;
            line-height: 0.5rem;
            text-align: center;
          }
          .ml {
            margin-left: 0.1rem;
          }
          .mr {
            margin-right: 0.1rem;
          }
        }
        .overtime-tips {
          margin-top: 0.32rem;
          color: transparent;
          font-size: 0.32rem;
          font-weight: bold;
          text-align: center;
          margin-top: 0.1rem;
          background: linear-gradient(to bottom, #fee902, #fff, #fee902);
          -webkit-background-clip: text;
        }
      }
    }
    // 必中商品模块
    .box-contain-pro {
      margin: 0.2rem 0.2rem 0;
      color: #7e7e7e;
      font-size: 0.2rem;
      .main {
        display: flex;
        align-items: center;
        margin-top: 0.1rem;
        padding-bottom: 0.1rem;
        border-bottom: #e0e0e0 1px solid;
        .pro-list {
          width: 66%;
          justify-content: space-between;
          .pic {
            width: 0.6rem;
            height: 0.6rem;
            border: #c9c9c9 1px solid;
            border-radius: 3px;
            img {
              width: 0.37rem;
              height: 0.45rem;
            }
          }
          .cur {
            border-color: #d01f01;
          }
        }
        .check-more-btn {
          height: 0.7rem;
          margin-left: 0.28rem;
          padding: 0 0.12rem;
          border-radius: 4px;
          background-color: #f3f3f3;
          font-size: 0.1rem;
          font-weight: bold;
          zoom: 0.92;
          color: #333;
        }
      }
    }
    // 商品标题
    .high-pro-name {
      line-height: 0.4rem;
      margin: 0.2rem 0.2rem 0;
      color: #000;
      font-size: 0.3rem;
      font-weight: bold;
      .label {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        height: 0.32rem;
        line-height: 1.28rem;
        padding: 0 0.07rem;
        margin-right: 0.1rem;
        margin-top: 0.06rem;
        text-align: center;
        vertical-align: top;
        background: url(https://nginx-beta.oss-cn-chengdu.aliyuncs.com/h5/bagBox/bg14.png) no-repeat 0 0;
        background-size: 100% 100%;
      }
      .text {
        color: #e1e1e2;
        font-size: 0.17rem;
        font-weight: normal;
        zoom: 0.9;
        font-style: normal;
      }
    }
    // 商品参数
    .high-pro-para {
      width: 100%;
      margin-top: 0.25rem;
      background: url(https://nginx-beta.oss-cn-chengdu.aliyuncs.com/h5/bagBox/bg9.png) no-repeat 0 0;
      background-size: 100% 100%;
      &::after {
        content: '';
        display: block;
        padding-top: 7.867%;
      }
    }
    // 商品tips
    .ensure {
      display: flex;
      align-items: center;
      height: 0.58rem;
      margin: 0.3rem 0.2rem 0;
      padding: 0 0.25rem;
      border-radius: 0.1rem;
      background-color: #e7edf0;
      .logo {
        width: 0.36rem;
        height: 0.36rem;
        border-radius: 3px;
        background: #fff url(https://nginx-beta.oss-cn-chengdu.aliyuncs.com/h5/bagBox/apple-logo.svg) no-repeat 50% 50%;
        background-size: 60% auto;
      }
      .text {
        margin-left: 0.1rem;
        font-size: 0.25rem;
      }
    }
    // 手机号输入模块
    .vip-tel {
      display: flex;
      align-items: center;
      margin: 0.3rem 0.2rem 0;
      padding: 0.2rem;
      border-radius: 0.1rem;
      background-color: #f9f9f9;
      .title {
        flex-shrink: 0;
        font-size: 0.26rem;
        font-weight: bold;
        color: #333;
      }
      .tel {
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        width: 100%;
        height: 0.9rem;
        padding: 0 0.2rem;
        border: #d9d9d9 1px solid;
        border-radius: 0.45rem;
        background-color: #fff;
        .tips {
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
          line-height: 0.25rem;
          padding: 0.05rem 0;
          color: #f13a13;
          font-size: 0.25rem;
          zoom: 0.88;
        }
      }
    }
    // 支付方式
    .choose-pay-mode {
      margin: 0.3rem 0.2rem 0;
      border-radius: 0.1rem;
      background-color: #f9f9f9;
      .item {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        height: 0.9rem;
        padding: 0 0.2rem;
        .icon {
          width: 0.36rem;
          height: 0.36rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .name {
          line-height: 0.28rem;
          margin-left: 0.2rem;
          font-size: 0.28rem;
        }
        .sale-tips {
          box-sizing: border-box;
          height: 0.36rem;
          padding: 0 0.1rem;
          margin-left: 0.36rem;
          border: #ee0000 1px solid;
          .text {
            line-height: 0.25rem;
            color: #e00;
            font-size: 0.25rem;
            zoom: 0.96;
          }
        }
        .radio {
          border: none;
          background: url(https://nginx-beta.oss-cn-chengdu.aliyuncs.com/h5/bagBox/tick1.png) no-repeat 50% 50%,
            linear-gradient(to bottom, #707070, #36373c 68%, #3c3c3d) no-repeat 0 0;
          background-size: 0.22rem 0.16rem, 100% 100%;
          box-sizing: border-box;
          width: 0.36rem;
          height: 0.36rem;
          margin-left: auto;
          border: #d9d9d9 1px solid;
          border-radius: 0.36rem;
        }
      }
    }
    // 协议模块
    .is-agree {
      display: flex;
      margin: 0.4rem 0.2rem 0;
      .checkbox {
        background: url(https://nginx-beta.oss-cn-chengdu.aliyuncs.com/h5/bagBox/tick2.png) no-repeat 50% 50%;
        background-size: 0.15rem 0.13rem;
        position: relative;
        box-sizing: border-box;
        flex-shrink: 0;
        width: 0.25rem;
        height: 0.25rem;
        margin-right: 0.1rem;
        margin-top: 0.05rem;
        border: #ccc 1px solid;
        border-radius: 0.04rem;
        &::before {
          content: '';
          position: absolute;
          left: -0.1rem;
          right: -0.1rem;
          top: -0.1rem;
          bottom: -0.1rem;
          background-color: rgba(0, 0, 0, 0);
        }
      }
      .text {
        line-height: 0.4rem;
        color: #ccc;
        font-size: 0.25rem;
        zoom: 0.88;
        .link {
          color: #ccc;
          text-decoration: underline;
          outline: none;
        }
      }
    }
    // 必中商品滑动栏
    .contain-pro {
      margin: 0.4rem 0.2rem 0;
      .title-more {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .title {
          line-height: 0.25rem;
          color: #ccc;
          font-size: 0.25rem;
          transform: scale(0.88);
          transform-origin: left center;
        }
        .check-more-btn {
          line-height: 0.25rem;
          color: #ccc;
          font-size: 0.25rem;
          text-decoration: underline;
          transform: scale(0.8);
          transform-origin: right center;
        }
      }
      .contain-pro-main {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        padding: 0.2rem 0;
        margin-top: 0.2rem;
        border-radius: 0.2rem;
        background-color: #f1f1f1;
        .swiper-pro {
          width: 100%;
          height: 0.8rem;
          .swiper-slide {
            display: flex;
            justify-content: flex-end;
            width: 0.9rem;
            height: 0.9rem;
            margin-right: 0.1rem;
            .pro {
              position: relative;
              overflow: hidden;
              width: 0.8rem;
              height: 0.8rem;
              border-radius: 0.1rem;
              background-color: #fff;
              .pic {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 0.8rem;
                height: 0.8rem;
                img {
                  max-width: 0.6rem;
                  max-height: 0.6rem;
                  display: block;
                }
              }
              .pro-level {
                position: absolute;
                bottom: 0;
                right: -0.2rem;
                z-index: 2;
                display: flex;
                justify-content: center;
                align-items: center;
                box-sizing: border-box;
                height: 0.22rem;
                padding: 0 0.25rem 0.01rem 0.08rem;
                transform: skewX(-25deg);
                &::before {
                  content: '';
                  line-height: 0.25rem;
                  color: #fff;
                  font-size: 0.25rem;
                  font-weight: bold;
                  zoom: 0.8;
                  transform: skewX(25deg);
                }
              }
              .level1 {
                background: $levelGradient1;
                &::before {
                  content: '精品';
                }
              }
              .level2 {
                background: $levelGradient2;
                &::before {
                  content: '尊贵';
                }
              }
              .level3 {
                background: $levelGradient3;
                &::before {
                  content: '典藏';
                }
              }
              .level4 {
                background: $levelGradient4;
                &::before {
                  content: '欧皇';
                }
              }
            }
          }
        }
        .chance-list {
          position: relative;
          z-index: 2;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          padding-top: 0.2rem;
          .pro-level {
            display: flex;
            align-items: center;
            margin-right: 0.3rem;
            .text {
              line-height: 0.25rem;
              color: #bbb;
              font-size: 0.25rem;
              white-space: nowrap;
              zoom: 0.8;
              i {
                margin-left: 0.06rem;
              }
            }
          }
        }
      }
    }
    // 评论模块
    .user-comment {
      display: block;
      margin: 0.3rem 0.2rem 0;
      border-radius: 0.2rem;
      background-color: #f5f5f5;
      .item {
        margin: 0 0.2rem;
        padding: 0.3rem 0;
        &:not(:last-child) {
          border-bottom: #d9d9d9 1px solid;
        }
        .user {
          display: flex;
          align-items: center;
          .avatar {
            width: 0.8rem;
            height: 0.8rem;
            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
          .info {
            width: calc(100% - 0.8rem - 0.2rem);
            margin-left: 0.2rem;
            .name {
              line-height: 0.3rem;
              font-size: 0.3rem;
              font-weight: bold;
            }
            .time {
              line-height: 0.25rem;
              margin-top: 0.2rem;
              color: #999;
              font-size: 0.25rem;
            }
          }
        }
        .comment {
          margin-top: 0.2rem;
          .content {
            line-height: 0.38rem;
            font-size: 0.28rem;
          }
          .pic-list {
            display: flex;
            margin-top: 0.3rem;
            .pic {
              display: flex;
              justify-content: center;
              align-items: center;
              box-sizing: border-box;
              width: 2.1rem;
              height: 2.1rem;
              border: #d9d9d9 1px solid;
              background-color: #fff;
              &:not(:last-child) {
                margin-right: 0.2rem;
              }
              img {
                max-width: 90%;
                max-height: 90%;
              }
            }
          }
        }
      }
    }
  }

  // 底部悬浮按钮
  .footer {
    height: 1.1rem;
    & > div {
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 2005;
      height: 1.1rem;
      background-color: #1f1e1d;
      position: fixed;
      & > div {
        left: 0;
        top: 0;
        display: flex;
        width: 100%;
        height: 1.1rem;
        position: absolute;
        .total-price {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 50%;
          height: 100%;
          .text {
            color: #fff;
            font-size: 0.28rem;
            .price {
              font-size: 0.5rem;
            }
          }
        }
        .confirm-btn {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 4.07rem;
          height: 100%;
          color: #fff;
          font-size: 0.48rem;
          background: url(https://nginx-beta.oss-cn-chengdu.aliyuncs.com/h5/bagBox/bg4.png) no-repeat 0 0;
          background-size: 100% 100%;
          animation: pubScaleBigSmall 1s linear infinite;
        }
      }
    }
  }
  // 购买说明模块
  .buy-intro {
    overflow: scroll;
    height: 7.5rem;
    margin-top: 0.5rem;
    padding: 0 0.3rem;
    .intro-item {
      position: relative;
      margin-bottom: 0.35rem;
      padding-bottom: 0.3rem;
      .title {
        display: flex;
        line-height: 0.42rem;
        margin-bottom: 0.2rem;
        font-size: 0.32rem;
        font-weight: bold;
        .serial-num {
          width: 0.6rem;
        }
      }
      .intro1 {
        display: flex;
        line-height: 0.38rem;
        margin-bottom: 0.1rem;
        color: #666;
        font-size: 0.28rem;
      }
      .intro {
        display: flex;
        line-height: 0.38rem;
        margin-bottom: 0.15rem;
        color: #666;
        font-size: 0.28rem;
      }
    }
  }

  // 按钮动画
  @keyframes pubScaleBigSmall {
    0%,
    100% {
      transform: scale(1);
    }

    50% {
      transform: scale(1.1);
    }
  }

  // 时间动画
  @keyframes shockLR {
    0% {
      transform: translateX(0%);
    }

    15% {
      transform: translateX(1rem);
    }
    30% {
      transform: translateX(0rem);
    }
    45% {
      transform: translateX(-1rem);
    }
    60% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(0%);
    }
  }
</style>
