<template>
  <main class="container">
    <div class="topBox _rel">
      <div class="content_show _flex _flex_around _flex_ac _fs1">
        <div class="show_item _rel _text_c">
          <div class="hint_num _ab">X5</div>
          <div class="item_price _fs5 _mt5 _fw">¥10</div>
        </div>
        <div class="show_item _rel _text_c">
          <div class="hint_num _ab">X10</div>
          <div class="item_price _fs5 _mt5 _fw">¥5</div>
        </div>
      </div>
    </div>
    <div class="phone_box _fs3">
      <div class="phone_title _flex _flex_ac"><span class="line"></span>充值号码</div>
      <div class="phone_input_mod">
        <div class="phone_input _flex">
          <img src="/src/assets/theatre/coupon/icon_keke_phone.png" alt="" class="phone_icon" />
          <input
            type="text"
            id="phone"
            placeholder="输入您的手机号"
            class="_fw _fs5"
            pattern="[0-9]*"
            v-model.trim="phoneVal"
            @keydown="inputKeydown"
            maxlength="13"
          />
        </div>
        <div class="new_get">（当前登录号码）</div>
      </div>
      <div class="phone_title _flex _flex_ac recharge_title"><span class="line"></span>充值金额</div>
      <div class="recharge_mod _flex">
        <div
          class="recharge_item _rel _flex _flex_cc _flex_column"
          v-for="(item, index) in priceData"
          :key="index"
          :class="dataIndex == index ? 'recharge_itemActive' : ''"
          @click="() => coupon_itemClick(index) as MouseEvent"
        >
          <img
            class="item_hint _ab"
            alt=""
            src="/src/assets/theatre/coupon/msg.png"
            :style="{ display: dataIndex == index ? 'block' : 'none' }"
          />
          <div class="new_price _fw _fs3"
            ><span class="_fs4">{{ item.decPrice }}</span
            >元</div
          >
          <div class="del_price Active_color2 _text_del _mb1">{{ item.price }}元</div>
          <div class="discount _fs1 _text_c">折扣价</div>
        </div>
      </div>
    </div>
    <div class="purpose_mod _flex _flex_bw _fs3">
      <span class="purpose">本次余额最多可抵用</span>
      <span class="purpose_price" style="color: #dc1d19">{{ deduction }}元</span>
    </div>
    <div class="explain_mod">
      <div class="explain_title _flex _flex_ac _fs3"><span class="line"></span>充值说明</div>
      <div class="explain_content">
        温馨提示：<br />
        【充值时间】本商品 24 小时系统自动充值，无任何时间限制(运营商系统/地区维护除外)；<br />
        【到账时间】 非充值高峰期到账时间为
        72小时内（若运营商系统正常时时，到账时间几乎是即时到账）。如遇到月初月末高峰期会有延迟，详细到账时间请您自行拨打运营商电话或者登陆运营商官方网站查询；<br />
        【充值方式】用户点击页面上 立即购买
        根据提示填写你需要充值的手机号码，成功付款后，系统自动完成充值（充值中/充值成功的订单是无法撤销退款的）。如因错填号码而导致的损失均由买家负责（为保障您的合法利益，请慎重填写充值号码）；<br />
        【归属地区】请保证您要充值的手机号码归属地区与商品名称所标地区一致，否则会造成充值失败，其亡省份请拍相应商品，以免导致无法充值；
      </div>
    </div>
    <div class="goPay_mod _flex _flex_bew">
      <div class="pay_price _fs4"><span class="Symbol _fs1">¥</span>{{ payPrice }}.00</div>
      <div class="goPay_btn _fs3 _flex _flex_cc" @click="payOrderHandle" :loading="submitLoading">立即支付</div>
    </div>
    <div class="rule">
      <div class="sidebar_hint" @click="rulesHandle">活动规则</div>
      <div class="sidebar_hint customer" @click="customsHandle">在线客服</div>
    </div>
    <nut-popup pop-class="popclass" style="border-radius: 8px" v-model:visible="showBasic" :z-index="100" :close-on-click-overlay="false">
      <div class="popup_content _text_c">
        <div class="p_title orange _fw _fs3">恭喜您可免费领取100元话费</div>
        <nut-input
          label=""
          placeholder="请输入绑定登录的手机号"
          max-length="11"
          v-model.trim="bindPhone"
          type="number"
          class="inputClass"
        />
        <div class="input_hint">该号码仅作登录使用,不限制话费充值</div>
        <div class="btn _flex _flex_cc" @click="bindPhoneHandle">确认提交</div>
      </div>
    </nut-popup>
    <nut-popup
      pop-class="popclass"
      style="border-radius: 8px"
      v-model:visible="showBasicTwo"
      :z-index="100"
      :close-on-click-overlay="false"
    >
      <div class="popup_content _text_c">
        <div class="p_title _fw _fs4 _mb3 _mt3">当前未购买K币</div>
        <div class="p_content _fs3 _mb8">购买任意金额K币可直接用于看剧,同时赠送<span class="orange">100元话费券</span></div>
        <div class="btn" @click="goWxHandle">去购买</div>
      </div>
    </nut-popup>
    <nut-popup v-model:visible="show" pop-class="popclass">
      <div class="rule_mod">
        <h3 class="rule-title">活动规则</h3>
        <div>注意事项</div>
        <div class="rule_content">
          <p>
            1、用户务必妥善保管您的账号等个人信息。若用户账户因用户个人主动泄露或因遭受他人攻击、诈骗等行为导致的损失及后果，平台不承担责任，用户应通过司法、行政等救济途径向侵权行为人追偿。除平台存在过错外，用户应对其账户下的所有行为结果(包括但不限于在线签署各类协议提供信息购买商品及服务，发表评论、售后处理决定等)负责</p
          >
          <p
            >2、因话费充值涉及第三方通信运营商，以及网络系统的不稳定性等原因，充值话费到账时间偶尔存在延迟的情形，尽请谅解。如有问题，可联系客服反馈问题，我们将在第一时间回复并处理问题；</p
          >
          <p>3、基于风控要求，如您存在多次办理，或推荐者存在刷单等行为均视为违规操作，平台有权拒绝提供可可赚会员服务。</p>
          <p>4、如有疑问，可向客服咨询。 注：本活动最终解释权归可可赚官方所有</p>
        </div>
        <nut-button type="primary" color="#e15ae8" @click="hide">确定</nut-button>
      </div>
    </nut-popup>
  </main>
</template>

<script lang="ts" setup>
  import { theaterQuery, updatePhone } from '/@/api/theatre';
  import { Toast } from '@nutui/nutui';
  import { PayCenter } from '/@/utils/pay';
  import { useConfigStore } from '/@/store/modules/platform';
  import { businessDomain, controller } from '/~/config/constant';
  const configStore = useConfigStore();
  const router = useRouter();
  const info = computed(() => {
    return configStore.info;
  });

  const submitLoading = computed(() => {
    return configStore.submitLoading;
  });

  const state = reactive({
    phoneVal: '', // 手机号
    dataIndex: 0, // 选择索引
    showBasic: false, // 绑定手机号弹窗
    showBasicTwo: false, // 跳转小程序弹窗
    show: false, // 活动规则弹窗
    bindPhone: '', // 绑定手机号
    openId: '', // 微信用户唯一标识
    // 渲染数组
    priceData: [
      {
        price: 100,
        discount: 5,
        decPrice: 95,
      },
      {
        price: 200,
        discount: 10,
        decPrice: 190,
      },
    ],
  });

  onBeforeMount(async () => {
    const { query } = router.currentRoute.value;
    // state.showBasicTwo = true
    state.openId = query?.openId as string;
    let res = await theaterQuery(
      { openId: state.openId },
      businessDomain[info.value.applyIdentification][import.meta.env.MODE],
      controller[info.value.applyIdentification]['theaterQuery'],
    );
    let { isPayKbi, phone } = res.data.value.content;

    if (!isPayKbi) {
      isPayKHandle();
    } else {
      if (phone == '' || phone == null) state.showBasic = true;
    }
  });

  // hide
  const hide: any = () => {
    state.show = false;
  };

  // 抵扣
  const deduction = computed(() => {
    return state.priceData[state.dataIndex].discount;
  });

  // 实际支付
  const payPrice = computed(() => {
    return state.priceData[state.dataIndex].decPrice;
  });

  // 活动规则
  const rulesHandle: any = () => {
    state.show = true;
  };

  // 客服跳转
  const customsHandle: any = () => {
    window.open('https://ykf-webchat.7moor.com/wapchat.html?accessId=3e89c540-ed47-11ec-a02e-eb8e52aced8a');
  };

  // 手机号输入
  const inputKeydown: any = (e) => {
    if (e.key == 'Backspace') return;
    if (state.phoneVal.length == 3 || state.phoneVal.length == 8) {
      state.phoneVal = state.phoneVal += ' ';
    }
  };

  // 下标索引选择
  const coupon_itemClick: any = (index: number) => {
    state.dataIndex = index;
  };

  // 是否购买K币
  const isPayKHandle: any = () => {
    state.showBasicTwo = true;
  };

  // 绑定手机接口
  const bindPhoneHandle: any = async () => {
    const patt = /^[1][3-9][\d]{9}/;

    if (state.bindPhone.length < 11) {
      Toast.text('请填写正确的手机号');
      return;
    } else if (!patt.test(state.bindPhone)) {
      Toast.text('请填写正确的手机号');
      return;
    }
    let params = {
      openId: state.openId,
      phone: state.bindPhone,
    };
    let res: any = await updatePhone(
      params,
      businessDomain[info.value.applyIdentification][import.meta.env.MODE],
      controller[info.value.applyIdentification]['updatePhone'],
    );

    if (res.data.value.content == '操作成功！') {
      Toast.text('绑定成功!');
      state.showBasic = false;
    }
  };

  // 跳转小程序
  const goWxHandle: any = () => {
    location.href = 'https://wxfx.jxjzwh.cn/wechat.html?tfid=633154799ddf967a1f429793';
  };

  // 支付
  const payOrderHandle: any = () => {
    const ua = navigator.userAgent.toLowerCase();
    const isWeixin = ua.indexOf('micromessenger') != -1;
    if (isWeixin) {
      Toast.text('当前环境为微信内置浏览器，请使用外部浏览器打开');
      return;
    }
    if (state.phoneVal.replaceAll(' ', '').length !== 11) {
      Toast.text('请填写正确的手机号');
      return;
    }

    //  支付
    new PayCenter(info.value.applyIdentification).pay({
      phone: state.phoneVal.replaceAll(' ', ''),
      randomMoney: payPrice.value,
    });
  };

  const { phoneVal, bindPhone, dataIndex, priceData, showBasic, showBasicTwo, show } = toRefs(state);
</script>

<style lang="scss" scoped>
  .container {
    width: 7.5rem;
    /* height: 14.38rem; */
    background: #f2f2f2;
    overflow: hidden;
    position: relative;
    padding-bottom: 1.3rem;
  }

  .topBox {
    width: 100%;
    height: 5rem;
    background: url(/src/assets/theatre/coupon/top_bg.png) no-repeat;
    background-size: 100% 100%;
    overflow: hidden;
  }
  .logo_img {
    width: 0.45rem;
    height: 0.45rem;
    border-radius: 0.1rem;
    margin-right: 0.05rem;
  }
  .logo_name {
    font-size: 0.3rem;
    font-weight: bold;
    font-style: italic;
    color: #ffffff;
  }

  .content_show {
    width: 82%;
    margin: 0 auto;
    height: 50%;
    margin-top: 2.3rem;
    border-radius: 17px;
    -webkit-border-radius: 17px;
    -moz-border-radius: 17px;
    -ms-border-radius: 17px;
    -o-border-radius: 17px;
  }

  .content_show .show_item {
    width: 32%;
    height: 80%;
    background: url(/src/assets/theatre/coupon/top_content_show.png) no-repeat;
    background-size: 100% 100%;
  }

  .show_item .hint_num {
    right: 0;
    width: 0.6rem;
    height: 0.35rem;
    line-height: 0.35rem;
    background: #f24a35;
    box-shadow: 0px 2px 4px 0px rgba(244, 102, 102, 0.5);
    border-radius: 7px;
    text-align: center;
    color: #fff;
  }

  .show_item .item_price {
    color: #f24a35;
  }

  .phone_box {
    width: 93%;
    margin: 0.4rem auto 0.3rem;
    padding: 0 0.28rem 0.28rem;
    background: #ffffff;
    border-radius: 8px;
    color: #333;
    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;
    -ms-border-radius: 8px;
    -o-border-radius: 8px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    overflow: hidden;
  }

  #phone {
    width: 90%;
  }

  .phone_box .phone_title,
  .explain_mod .explain_title {
    height: 0.5rem;
    margin-bottom: 0.35rem;
    margin-top: 0.28rem;
    line-height: 1;
  }

  .phone_box .phone_title .line,
  .explain_mod .explain_title .line {
    display: inline-block;
    width: 0.03rem;
    height: 0.3rem;
    background: #5b5b5b;
    margin-right: 0.15rem;
  }

  .phone_box .phone_input .phone_icon {
    width: 0.5rem;
    height: 0.5rem;
    margin-right: 0.1rem;
  }

  .new_get {
    line-height: 1.6;
    color: #474747;
    border-bottom: 1px solid #e9e9e9;
  }

  .phone_box .recharge_title {
    margin-bottom: 0.3rem;
    margin-top: 0.35rem;
  }

  .recharge_mod {
    height: 1.8rem;
  }

  .recharge_mod .recharge_item {
    width: 35%;
    background: #ffffff;
    border-radius: 8px;
    border: 1px solid #ececec;
    margin-right: 0.3rem;
  }

  .recharge_mod .recharge_itemActive {
    background: #f6f3ef;
  }

  .recharge_mod .recharge_itemActive .new_price {
    color: #a68d64;
  }

  .Active_color {
    color: #a68d64;
  }

  .Active_color2 {
    color: #a68d64;
  }

  .recharge_mod .recharge_item .item_hint {
    width: 0.8rem;
    height: 0.3rem;
    top: -0.08rem;
    left: 0;
  }

  .recharge_mod .recharge_item .discount {
    width: 1.2rem;
    padding: 0.02rem 0;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #fbf5ed;
    background: #a68d64;
    border-radius: 8px;
  }

  .del_price {
    color: #c4c4c4;
  }

  .purpose_mod {
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #c2c2c2;
    background: #ffffff;
    border-radius: 8px;
    width: calc(93% - 0.4rem);
    margin: 0 auto;
    padding: 0.2rem 0.2rem;
  }

  .explain_mod {
    width: calc(93% - 0.4rem);
    margin: 0 auto;
    padding: 0.2rem 0.2rem;
  }

  .explain_mod .explain_content {
    padding: 0 0.1rem;
    color: #4f4f4f;
    line-height: 1.7;
    font-size: 12px;
  }

  .goPay_mod {
    background: #ffffff;
    box-shadow: 0px 2px 17px 0px rgba(0, 0, 0, 0.06);
    border-radius: 26px 26px 0px 0px;
    position: fixed;
    bottom: 0;
    height: 1.3rem;
    width: calc(100% - 0.6rem);
    padding: 0 0.3rem;
  }

  .goPay_mod .pay_price {
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #fc2525;
  }

  .goPay_mod .goPay_btn {
    background: linear-gradient(270deg, #fe4a4a 0%, #fc2424 100%);
    color: #ffffff;
    box-shadow: 0px 0px 12px 0px rgba(195, 44, 44, 0.23);
    border-radius: 21px;
    width: 2rem;
    height: 0.8rem;
  }

  .footerInfo {
    font-size: 0.28rem;
    color: #181717;
    background: #f2f2f2;
    text-align: center;
    line-height: 0.5rem;
    padding-bottom: 1.5rem;
  }

  .footerInfo .recordNumber {
    color: #000;
  }

  .rule_mod {
    display: flex;
    flex-direction: column;
    width: 5.4rem;
    height: 8rem;
    padding: 0.4rem 0.2rem;
    line-height: 1.7;
    overflow-y: hidden;
  }

  .rule-title {
    text-align: center;
  }

  .rule_content {
    overflow-y: auto;
  }

  .rule {
    position: absolute;
    right: 0;
    top: 0.54rem;
    height: 3.26rem;
    font-size: 0.24rem;
    color: #ffffff;
  }

  .sidebar_hint {
    background: linear-gradient(to bottom, rgb(247, 239, 223), rgb(236, 197, 97));
    width: 0.3rem;
    color: #fe5903;
    border: 0.05rem solid #fff;
    border-right: 0;
    box-shadow: 0px 0px 32px 0px rgba(94, 94, 94, 0.26);
    border-radius: 0.35rem 0 0 0.35rem;
    -webkit-border-radius: 0.35rem 0 0 0.35rem;
    -moz-border-radius: 0.35rem 0 0 0.35rem;
    -ms-border-radius: 0.35rem 0 0 0.35rem;
    -o-border-radius: 0.35rem 0 0 0.35rem;
    line-height: 0.35rem;
    padding: 0.2rem 0.1rem;
    text-align: center;
  }

  .download {
    margin-top: 0.3rem;
    background: linear-gradient(to bottom, #cae9f7, #96c3fa);
    line-height: 0.25rem;
  }
  .customer {
    margin-top: 0.3rem;
  }
  .ac_rule {
    margin-top: 0.6rem;
  }

  .ruleImg,
  .download_app {
    width: 100%;
    display: flex;
  }
  .kefu {
    width: 100%;
    margin-top: 0.2rem;
    height: 1.44rem;
  }

  .popup_content {
    width: 6rem;
    height: 4.3rem;
    padding: 0.4rem 0.3rem 0.3rem;
  }

  .orange {
    color: #f85017;
  }

  .inputClass {
    background: #eee;
    width: 100%;
    height: 1rem;
    border-radius: 8px;
    margin-top: 0.43rem;
    // text-indent: 1.8em;
  }

  .input_hint {
    color: rgb(204, 202, 202);
    font-size: 0.28rem;
  }

  .btn {
    background: #0d0d0d;
    color: #fff;
    font-weight: 500;
    height: 0.9rem;
    border-radius: 8px;
    font-size: 0.3rem;
    margin-top: 0.46rem;
  }
</style>
