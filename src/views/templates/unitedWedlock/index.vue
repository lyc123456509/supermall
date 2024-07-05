<template>
  <div>
    <main class="united_container">
      <!-- <div class="bgc"></div> -->
      <!-- 弹幕 -->
      <danmu />
      <div class="hint_mod">
        <img src="/src/assets/wedlock/wedlock_top_hint.png" alt="" class="top_hint" />
      </div>
      <div class="tips">你们是天生一对还是欢喜冤家?</div>
      <!-- 信息输入 -->
      <div class="info_mod">
        <!-- 日期姓名 -->
        <div class="input_box">
          <!-- 男方 -->
          <div class="male">
            <nut-input v-model="paramsInfo.boyName" placeholder="请输入男方姓名" max-length="10" class="input" />
            <div class="input date_box" @click="typeDate(1)">
              <img src="/src/assets/wedlock/united_icon_date.png" alt="" v-if="showMaleTime === '男方出生日期'" />
              <span>{{ showMaleTime }}</span>
            </div>
            <nut-datepicker
              type="datehour"
              v-model="showMaleTime"
              v-model:visible="maleShow"
              :min-date="minDate"
              :max-date="maxDate"
              :is-show-chinese="true"
              :three-dimensional="false"
              :formatter="formatter"
              @confirm="maleConfirm"
            />
          </div>
          <!-- 女方 -->
          <div class="femaleName">
            <nut-input v-model="paramsInfo.girlName" placeholder="请输入女方姓名" max-length="10" class="input" />
            <div class="input date_box" @click="typeDate(2)">
              <img src="/src/assets/wedlock/united_icon_date.png" alt="" v-if="showFMaleTime === '女方出生日期'" />
              <span>{{ showFMaleTime }}</span>
            </div>
            <nut-datepicker
              type="datehour"
              v-model="showFMaleTime"
              v-model:visible="femaleShow"
              :min-date="minDate"
              :max-date="maxDate"
              :is-show-chinese="true"
              :three-dimensional="false"
              :formatter="formatter"
              @confirm="femaleConfirm"
            />
          </div>
        </div>
        <!-- 手机号输入 -->
        <input v-model="phone" placeholder="输入您的手机号" maxlength="11" class="nowGet" ref="phoneRef" />
      </div>
      <!-- banner图 -->
      <div class="banner">
        <div style="margin-top: 0.32rem">
          <img src="/@/assets/wedlock/united_icon_star.png" alt="" />
          <span>合婚结果100分以上<span class="text">得iPhone14</span></span>
        </div>
        <div style="margin-top: 0.18rem">
          <img src="/@/assets/wedlock/united_icon_star.png" alt="" />
          <span
            >合婚完成得<span class="text">{{ info.phoneData.cssClass || 100 }}元</span>话费券！</span
          >
        </div>
        <div style="margin-top: 0.2rem">
          <CountDown />
        </div>
      </div>
      <!-- 底部展示区 -->
      <div class="footer_show">
        <!-- 背景图 -->
        <img src="/src/assets/wedlock/wedlock_footer_bg1.png" alt="" class="bg1" />
        <div class="footer_tips">(已有&nbsp;<span style="color: #fff">3838495</span>&nbsp;对情侣合婚)</div>
        <!-- 按钮 -->
        <div class="btn" @click="getPayHandle" id="btn"></div>
        <div class="btn btn2" @click="getPayHandle" v-show="btnShow"></div>
        <!-- 支付方式 -->
        <div class="payType wx">
          <div class="_flex">
            <img src="/src/assets/wedlock/united_icon_wx.png" alt="" class="wx" />
            <span>微信安全支付</span>
          </div>
          <img src="/src/assets/wedlock/united_icon_round.png" alt="" class="check" />
        </div>
        <!-- 协议 -->
        <div class="arg">
          <img
            :src="`https://nginx-beta.oss-cn-chengdu.aliyuncs.com/h5/calculation/united_icon_check${checkStatus ? 'ed' : ''}.png`"
            @click="checkHandle"
            class="check"
            alt=""
          />
          <span class="arg_text1">勾选代表同意</span>
          <span class="arg_text2" @click="jumpToArg">《用户协议》</span>
        </div>
        <!-- 人物介绍 -->
        <div class="people_intro">
          <div class="left">
            <div>守湖散人</div>
          </div>
          <div class="right">
            <div class="title _flex">
              <span class="_flex_cc">有易签约老师</span>
              <img src="/src/assets/wedlock/united_icon_p.png" alt="" />
            </div>
            <div class="intro">
              有易国学认证易学专家，易学自媒体作者，擅长易经、八字易学。 精通八字各流派古法，融合各家之长成功为数万用户解决命理困惑。
            </div>
          </div>
        </div>
        <div class="list_title">· 为什么会合婚 ·</div>
      </div>
      <div class="footer_list_intro">
        <!-- 背景图 -->
        <img src="/src/assets/wedlock/wedlock_footer_bg2.png" alt="" class="bg1" />
        <img src="/src/assets/wedlock/wedlock_list_intro1.png" alt="" class="bg bg2" />
        <div class="list_title">· 合婚习俗 ·</div>
        <div class="bg bg3"></div>
        <div class="list_title">· 最专业的合婚鉴定 ·</div>
        <img src="/src/assets/wedlock/wedlock_list_intro3.png" alt="" class="bg bg4" />
        <div class="list_title">· 专业测算 正确选择 ·</div>
        <img src="/src/assets/wedlock/wedlock_list_intro4.png" alt="" class="bg bg5" />
        <div class="list_title">· 测算前后对比 ·</div>
        <img src="/src/assets/wedlock/wedlock_list_intro5.png" alt="" class="bg bg6" />
        <div class="list_title">· 真实用户反馈 ·</div>
        <div class="bg bg7">
          <div class="swiper_box">
            <div class="swiper_wrap" :style="{ top: swiperTop + '%', transition: 'all 0.5s linear' }">
              <div v-for="(showItem, showIndex) in list" :key="showIndex" v-html="showItem"></div>
            </div>
          </div>
        </div>
      </div>
      <!-- 查询历史结果按钮 -->
      <div class="search_result _flex_cc">
        <div @click="searchHandle">查询已测结果</div>
        <img src="/src/assets/wedlock/united_icon_right.png" class="right" alt="" />
      </div>
      <p class="footer_tips">本产品或服务或然性概率，下单即表示知道和同意用户协议</p>
      <companyInfo color="#fff" />
    </main>
  </div>
  <nut-overlay v-model:visible="searchPopup" :close-on-click-overlay="false">
    <div class="search_wrap">
      <div class="search_box">
        <div class="title">输入下单手机号查询测算结果</div>
        <nut-input type="digit" v-model="searchPhone" placeholder="请输入您的手机号" max-length="11" class="nowGet" />
        <div class="tips" v-show="state.errorHint"><span>!</span>请输入下单手机号</div>
        <div class="btn" @click="searchGetBtn">一键查询</div>
      </div>
      <img src="/src/assets/wedlock/united_icon_close.png" alt="" @click="popupClose" />
    </div>
  </nut-overlay>
  <redSideBar
    topLight="2.8"
    :customerStatus="false"
    ruleContent="活<br/>动<br/>规<br/>则"
    :ruleItemStyle="{
      color: '#F4B864',
      border: '0.01rem solid #F4B864',
      borderRadius: '0.2rem 0 0 0.2rem',
      background: '#670406',
      opacity: '0.75',
    }"
  />
  <PayMethod @change="payMethodCB" v-if="false" />
</template>
<script setup lang="ts">
  import router from '/@/router';
  import danmu from '/@/components/danmu/index.vue';
  import CountDown from '/@/components/CountDown/index.vue';
  import redSideBar from '/@/components/redSideBar/index.vue';
  import { PayCenter } from '/@/utils/pay';
  import { getSearchResult } from '/@/api/calculation';
  import { useConfigStore } from '/@/store/modules/platform';
  import useCheckOrder from '/@/hooks/useCheckOrder';
  import { businessDomain } from '/~/config/constant';
  import { Toast } from '@nutui/nutui';
  import { showList } from './index';

  const configStore = useConfigStore();
  const phoneRef = ref(null);
  const minDate = new Date(1960, 0, 1);
  const maxDate = new Date(2030, 10, 1);
  // const props = defineProps({
  //   stepTip: Boolean,
  // });
  const info = computed(() => {
    return configStore.info;
  });
  const timer3 = ref();
  const t = (methods: any) => {
    if (timer3.value) return;
    if (!timer3.value) {
      timer3.value = setTimeout(() => {
        methods();
        timer3.value = null;
      }, 2000);
    }
  };
  const scrollEve = () => {
    const btn = document.getElementById('btn');
    let btnTop = btn?.getBoundingClientRect().top;
    if (btnTop && btnTop <= 0) {
      state.btnShow = true;
    } else {
      state.btnShow = false;
    }
  };
  onMounted(() => {
    // if (btn?.getBoundingClientRect().top + 20 >= document.documentElement.clientHeight) {
    //   state.btnShow = true;
    // }
    window.addEventListener('scroll', () => t(scrollEve));
  });
  const state = reactive({
    paramsInfo: {
      boyName: '',
      boyTime: '',
      girlName: '',
      girlTime: '',
    },
    btnShow: false,
    maleShow: false,
    femaleShow: false,
    phone: '',
    checkStatus: true,
    swiperTop: 0,
    transitionStatus: 0,
    // isAgree: true,
    payType: '',
    list: showList,
    searchPopup: false,
    searchPhone: '',
    showMaleTime: '男方出生日期',
    showFMaleTime: '女方出生日期',
    errorHint: false,
  });

  const timer = ref();
  const timer2 = ref();
  timer.value = setInterval(() => {
    state.swiperTop -= 1;
  }, 250);
  timer2.value = setInterval(() => {
    state.list.push(showList[0], showList[1], showList[3], showList[4]);
  }, 10000);
  onUnmounted(() => {
    window.removeEventListener('scroll', scrollEve);
    clearInterval(Number(timer.value));
    clearInterval(Number(timer2.value));
  });
  const formatter = (type: string, option) => {
    switch (type) {
      case 'year':
        option.text += '年';
        break;
      case 'month':
        option.text += '月';
        break;
      case 'day':
        option.text += '月';
        break;
      case 'hour':
        option.text += '时';
        break;
      default:
        option.text += '';
    }
    return option;
  };
  // 打开日期选择板
  const typeDate = (type: number) => {
    if (type === 1) {
      state.maleShow = true;
    } else {
      state.femaleShow = true;
    }
  };
  // 男方年月日
  const maleConfirm = (values: any) => {
    let nameArr: any[] = [];
    let nameArrValue: any[] = [];
    values?.selectedOptions.forEach((e: any) => {
      nameArr.push(e?.text);
      nameArrValue.push(e?.value);
    });
    state.showMaleTime = nameArr.toString().replaceAll(',', '');
    state.paramsInfo.boyTime = nameArrValue.toString().replaceAll(',', '');
  };
  // 女方年月日
  const femaleConfirm = (values: any) => {
    let nameArr: any[] = [];
    let nameArrValue: any[] = [];
    values?.selectedOptions.forEach((e: any) => {
      nameArr.push(e?.text);
      nameArrValue.push(e?.value);
    });
    state.paramsInfo.girlTime = nameArrValue.join().replaceAll(',', '');
    state.showFMaleTime = nameArr.join().replaceAll(',', '');
  };
  // 隐私协议选择
  const checkHandle = () => {
    state.checkStatus = !state.checkStatus;
  };

  const jumpToArg = () => {
    window.location.href = info.value.landingPageResponse.userShValue;
  };

  const searchHandle = () => {
    state.searchPopup = true;
  };

  const popupClose = () => {
    state.searchPopup = false;
  };

  const searchGetBtn = async (): Promise<void> => {
    if (state.searchPhone.length !== 11) {
      Toast.text('请填写正确的手机号');
      return;
    }
    if (!/^1[34578][0-9]{9}$/.test(state.searchPhone)) {
      Toast.text('请输入正确的手机号码');
      return;
    }
    const searchRes = await getSearchResult({ phone: state.searchPhone }, businessDomain['cs'][import.meta.env.MODE]);
    if (searchRes.response.value?.status === 200) {
      state.errorHint = false;
      sessionStorage.setItem('searchList', JSON.stringify(searchRes.data.value?.content));
      router.push({
        path: '/activity/calculation/searchResult',
      });
    } else {
      state.errorHint = true;
    }
  };

  const successCB = () => {
    router.push({
      path: '/activity/calculation/wedlockResult',
    });
  };
  useCheckOrder(successCB);
  // const isAgreeCB = (agreeState: boolean) => {
  //   state.isAgree = agreeState;
  // };

  const payMethodCB = (value: string) => {
    state.payType = value;
  };

  const getPayHandle = () => {
    if (!state.checkStatus) {
      Toast.text('请认真阅读用户隐私协议并同意');
      phoneRef.value && (phoneRef.value as any).focus();
      return;
    }
    if (state.paramsInfo.boyName === '') {
      Toast.text('请输入男方姓名');
      phoneRef.value && (phoneRef.value as any).focus();
      return;
    }
    if (state.paramsInfo.boyTime === '男方出生日期') {
      Toast.text('请输入男方出生日期');
      phoneRef.value && (phoneRef.value as any).focus();
      return;
    }
    if (state.paramsInfo.girlName === '') {
      Toast.text('请输入女方姓名');
      phoneRef.value && (phoneRef.value as any).focus();
      return;
    }
    if (state.paramsInfo.girlTime === '女方出生日期') {
      Toast.text('请输入女方出生日期');
      phoneRef.value && (phoneRef.value as any).focus();
      return;
    }

    if (state.phone.length !== 11) {
      phoneRef.value && (phoneRef.value as any).focus();
      Toast.text('请填写正确的手机号');
      return;
    }

    if (!/^1[34578][0-9]{9}$/.test(state.phone)) {
      Toast.text('请输入正确的手机号码');
      phoneRef.value && (phoneRef.value as any).focus();
      return;
    }

    //  支付
    new PayCenter(info.value.applyIdentification).pay({
      phone: state.phone,
      randomMoney: 9.9,
      payType: state.payType,
      touFangType: 'cs',
      ...state.paramsInfo,
    });
  };

  const {
    btnShow,
    swiperTop,
    searchPopup,
    searchPhone,
    list,
    phone,
    paramsInfo,
    maleShow,
    femaleShow,
    showMaleTime,
    showFMaleTime,
    checkStatus,
  } = toRefs(state);
</script>

<style lang="scss">
  ._flex {
    display: flex;
  }
  ._flex_cc {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .united_container {
    position: relative;
    background-image: url(/src/assets/wedlock/wedlock_top_bg.png);
    background-size: 100%;
    background-repeat: no-repeat;
    background-color: #c01110;
    height: 73.54rem;
    width: 100vw;
    overflow: hidden;
    padding-top: 0.1rem;
    // .bgc {
    //   position: absolute;
    //   z-index: -1;
    //   width: 100%;
    //   height: 100%;
    //   background: linear-gradient(180deg, #b31b1e 0%, #c01110 100%);
    // }
    // 顶部提示
    .hint_mod {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 6.6rem;
      margin: 0 auto;
      .top_hint {
        width: 100%;
        height: 0.36rem;
      }
    }
    // 文案tips
    .tips {
      width: 4.9rem;
      height: 0.52rem;
      background: url(/src/assets/wedlock/wedlock_tips.png) no-repeat;
      background-size: contain;
      margin: 1.92rem auto 0.34rem;
      font-size: 0.28rem;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #741512;
      line-height: 0.52rem;
      text-align: center;
    }
    // 信息输入
    .info_mod {
      width: 7.5rem;
      height: 4.7rem;
      background: url(/src/assets/wedlock/wedlock_info_bg.png) no-repeat;
      background-size: contain;
      margin: 0 auto;
      // 姓名日期
      .input_box {
        display: flex;
        justify-content: space-between;
        padding: 1.28rem 0.48rem 0;
        .male,
        .femaleName {
          width: 45%;
        }
        .nut-input-border {
          border: 0;
        }
        .input-text {
          color: #f4b864;
        }
        .input {
          width: 3rem;
          height: 0.72rem;
          background: #670406;
          line-height: 0.72rem;
          font-size: 0.28rem;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #f4b864;
          border-radius: 8px;
        }
        .date_box {
          display: flex;
          align-items: center;
          color: #f4b864;
          font-size: 0.3rem;
          img {
            width: 0.3rem;
            height: 0.28rem;
            margin: 0 0.15rem 0 0.2rem;
          }
        }
        input::-webkit-input-placeholder {
          color: #cb9f60;
        }
      }
      // 手机号输入
      .nowGet {
        display: block;
        height: 0.8rem;
        margin: 0 auto;
        margin-top: 0.37rem;
        background: transparent;
        border: 0;
        text-align: center;
        font-size: 0.36rem;
        color: #f4b864;
      }
      input::-webkit-input-placeholder {
        color: #cb9f60;
      }
    }
    // banner图
    .banner {
      width: 100%;
      height: 2.46rem;
      background: url(/@/assets/wedlock/wedlock_banner.png) no-repeat;
      background-size: contain;
      margin-top: 0.02rem;
      display: flex;
      flex-direction: column;
      font-size: 0.36rem;
      font-family: SourceHanSerifCN;
      color: #f1ba2f;
      line-height: 0.52rem;
      img {
        width: 0.1rem;
        height: 0.12rem;
        margin: 0 0.06rem 0 0.16rem;
      }
      .text {
        font-family: SourceHanSerifCN-Bold;
        font-weight: bold;
        color: #fff8a8;
        font-size: 0.4rem;
        margin: 0 0.16rem;
      }
    }
    // 底部展示区
    .footer_show {
      position: relative;
      // 背景图
      .bg1 {
        position: absolute;
        width: 100%;
        height: 6.48rem;
        top: 2.5rem;
        left: 0;
        z-index: 0;
      }
      // 底部tips
      .footer_tips {
        width: 100%;
        height: 0.4rem;
        text-align: center;
        font-size: 0.28rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #f2d281;
        line-height: 0.4rem;
        margin: 0.26rem auto 0.04rem;
      }
      // 按钮
      .btn {
        background: url(/@/assets/wedlock/wedlock_btn.png) no-repeat;
        background-size: contain;
        width: 5.52rem;
        height: 1.84rem;
        margin: 0 auto;
        animation: btn2 1.5s linear infinite;
      }
      .btn2 {
        position: fixed;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        z-index: 9;
        animation: btn 1.5s linear infinite;
      }
      // 支付方式
      .payType {
        width: 5.18rem;
        height: 0.56rem;
        background: #850f11;
        border-radius: 0.28rem;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.32rem;
        font-size: 0.28rem;
        font-weight: 500;
        color: #fff;
        font-family: PingFangSC-Medium, PingFang SC;
        .wx {
          width: 0.32rem;
          height: 0.28rem;
          vertical-align: bottom;
        }
        .check {
          width: 0.32rem;
          height: 0.32rem;
        }
        span {
          margin-left: 0.12rem;
        }
      }
      // 协议
      .arg {
        position: relative;
        z-index: 1;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0.34rem 0 0.18rem;
        font-size: 0.28rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #f2d281;
        img {
          width: 0.48rem;
          height: 0.48rem;
        }
        .arg_text1 {
          margin: 0 0.07rem 0 0.06rem;
        }
        .arg_text2 {
          color: #0a3a69;
        }
      }
      // 大师展示
      .people_intro {
        position: relative;
        z-index: 1;
        width: 7.26rem;
        height: 4.4rem;
        background: url(/@/assets/wedlock/wedlock_people.png) no-repeat;
        background-size: contain;
        margin: 0 auto;
        padding: 1rem 0.3rem 0.3rem;
        box-sizing: border-box;
        display: flex;
        .left {
          width: 32%;
          font-size: 0.32rem;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #f2d281;
          display: flex;
          justify-content: flex-end;
          div {
            background: url(/@/assets/wedlock/wedlock_people_tips.png) no-repeat;
            background-size: contain;
            writing-mode: tb-rl;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 0.64rem;
            height: 2.24rem;
            align-self: flex-end;
            line-height: 1rem;
            letter-spacing: 0.08rem;
          }
        }
        .right {
          flex: 1;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #f2d281;
          margin-left: 0.5rem;
          .title {
            font-size: 0.28rem;
            align-items: center;
            span {
              width: 2.36rem;
              height: 0.46rem;
              background: url(/@/assets/wedlock/wedlock_people_title.png) no-repeat;
              background-size: contain;
            }
            img {
              width: 0.72rem;
              height: 0.385rem;
              margin-left: 0.2rem;
            }
          }
          .intro {
            font-size: 0.33rem;
            line-height: 0.48rem;
            margin-top: 0.15rem;
          }
        }
      }
    }
    // 列表标题
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
    }
    // 底部展示区二
    .footer_list_intro {
      position: relative;
      // 背景图
      .bg {
        position: relative;
        z-index: 1;
        display: block;
        width: 7.2rem;
        margin: 0 auto;
      }
      .bg1 {
        position: absolute;
        width: 100%;
        height: 7.84rem;
        top: 6.8rem;
        left: 0;
        z-index: 0;
      }
      .bg2 {
        height: 8.68rem;
      }
      .bg3 {
        background: url(/src/assets/wedlock/wedlock_list_intro2.png) no-repeat;
        height: 3.44rem;
        background-size: cover;
      }
      // 用户反馈
      .bg7 {
        background: url(/src/assets/wedlock/wedlock_list_intro6.png) no-repeat;
        height: 7.54rem;
        background-size: contain;
        // padding: 1.1rem 0.3rem 0 0.35rem;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        .swiper_box {
          height: 6.24rem;
          overflow: hidden;
          position: relative;
          width: calc(100% - 0.65rem);
          .swiper_wrap {
            width: 100%;
            // height: 100rem;
            position: absolute;
            top: 0;
            overflow: hidden;
          }
        }
        .item {
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #3e3e3e;
          width: 6rem;
          margin: 0.7rem auto 0;
          span {
            font-size: 0.36rem;
          }
          div {
            background: rgba(0, 0, 0, 0.03);
            border-radius: 16px;
            font-size: 0.28rem;
            line-height: 0.4rem;
            box-sizing: border-box;
            padding: 0.2rem 0.2rem;
            text-indent: 0.5rem;
          }
        }
        .line_b {
          width: 6rem;
          height: 0px;
          opacity: 0.06;
          border: 0.02rem solid #000000;
          margin: 0.4rem auto 0rem;
        }
      }
    }
    // 查询历史结果按钮
    .search_result {
      width: 4.18rem;
      height: 0.78rem;
      background: rgba(127, 6, 8, 0.53);
      border-radius: 0.2rem;
      font-size: 0.32rem;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #dfa263;
      margin: 0.26rem auto 0.42rem;
      .right {
        width: 0.18rem;
        height: 0.3rem;
      }
    }
    .footer_tips {
      text-align: center;
      height: 0.34rem;
      font-size: 0.24rem;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
      line-height: 0.34rem;
      margin: 0 auto 0.26rem;
    }
  }
  .search_wrap {
    width: 100%;
    height: 100vh;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    .search_box {
      width: 6.64rem;
      height: 5.24rem;
      background: url(/@/assets/wedlock/wedlock_popup_bg.png) no-repeat;
      background-size: contain;
      .title {
        width: 5.2rem;
        height: 1.2rem;
        font-size: 0.4rem;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #edc35c;
        line-height: 1.2rem;
        margin: 0 auto;
      }
      .nowGet {
        width: 4.88rem;
        height: 0.72rem;
        background: #670406;
        border-radius: 0.08rem;
        border: 0;
        margin-top: 0.58rem;
        .input-text {
          color: #f4b864;
        }
      }
      input::-webkit-input-placeholder {
        color: #f4b864;
      }
      .tips {
        width: 2.92rem;
        height: 0.5rem;
        font-size: 0.24rem;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #fdd3d4;
        margin: 0 auto;
        display: flex;
        margin-top: 0.12rem;
        span {
          display: inline-block;
          width: 0.26rem;
          height: 0.26rem;
          color: #8b2914;
          margin-right: 0.2rem;
          background: #e9b3b3;
          border-radius: 50%;
          text-align: center;
        }
      }
      .btn {
        width: 5.52rem;
        height: 1.84rem;
        background: url(/@/assets/wedlock/wedlock_popup_btn.png) no-repeat;
        background-size: contain;
        display: flex;
        justify-content: center;
        font-size: 0.36rem;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #7f0608;
        margin: 0 auto;
        margin-top: 0.18rem;
        line-height: 1.6rem;
      }
    }
    img {
      width: 0.72rem;
      height: 0.72rem;
      margin-top: 0.68rem;
    }
  }
  @keyframes img_swi {
    0% {
      transform: translateX(0);
    }

    100% {
      transform: translateX(-66.7%);
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
  @keyframes btn2 {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
  }
</style>
