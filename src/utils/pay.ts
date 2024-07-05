import { createOrder, addTy, checkOrder, getAccessToken } from '../api';
import { businessDomain, controller } from '/~/config/constant';
import { Toast } from '@nutui/nutui';
import router from '/@/router';
import { useConfigStore } from '/@/store/modules/platform';
import isNil from 'lodash/isNil';
import { encode } from 'js-base64';
const configStore = useConfigStore();
import { getQueryParam, isWx } from '/@/utils/index';
import Url from 'domurl';
// import axios from 'axios';
declare let WeixinJSBridge: any;
// declare let wx: any;
class PayCenter {
  baseUrl: string;
  applyIdentification: string;
  constructor(applyIdentification: string) {
    this.applyIdentification = applyIdentification;
    this.baseUrl = businessDomain[applyIdentification][import.meta.env.MODE];
  }

  async checkOrder(orderId: string, returnUrl: string, successCB?: () => void) {
    const info = configStore.$state.info;
    const params = {
      orderId: orderId,
      queryType: 'PAYMENT_CENTER',
    };
    const res = await checkOrder(params, this.baseUrl, controller[this.applyIdentification]['checkOrder']);
    // if (successCB) {
    //   successCB();
    //   return;
    // }
    if (res.data.value.content.state) {
      if (successCB) {
        successCB();
      } else {
        const href = new Url(returnUrl);

        if (info.secondaryPayScaleType == 1) {
          // secondaryPayScaleType：是否二次支付，0否1是。
          // secondaryPayType：0。无再次支付，1跳转页面二次支付，2弹窗跳转支付。
          if (info.secondaryPayType == 1) {
            href.query.phone = encode(sessionStorage.phone);
            window.location.href = decodeURIComponent(href);
          }
        } else {
          window.location.href = href;
        }
      }
      sessionStorage.setItem('orderId', '');
      sessionStorage.setItem('returnUrl', '');
      sessionStorage.setItem('phone', '');
      sessionStorage.removeItem('state');
    } else {
      if (info.secondaryPayScaleType == 1) {
        if (info.secondaryPayType == 2) {
          sessionStorage.setItem('state', 'true');
        }
      }
      // sessionStorage.setItem('state', 'true');
    }
  }

  formPay(payUrl: string) {
    const div = document.createElement('form');
    div.setAttribute('method', 'post');
    div.setAttribute('action', payUrl);
    document.body.appendChild(div);
    document.forms[0].setAttribute('target', '_self');
    document.forms[0].submit();
    div.remove();
  }

  getQueryParams() {
    const info = configStore.$state.info;
    const query = router?.currentRoute.value.query;
    let obj = {};
    switch (info.channelIdentification) {
      case 'vivo_center':
        obj = {
          voPageUrl: window.origin,
          requestId: query['requestid'],
          creativeId: query['adid'],
        };
        break;
      default:
        if (info.channelIdentificationParams === null) {
          break;
        } else if (info.channelIdentificationParams.split(',').length > 1) {
          info.channelIdentificationParams.split(',').forEach((item: string) => {
            obj[item] = query[item];
          });
        } else {
          obj['identification'] = query[info.channelIdentificationParams];
        }
    }
    //  渠道ID值是否不合法
    if (info.channelIdentificationParams) {
      const nilFlag = Object.values(obj).some((item) => isNil(item));
      if (nilFlag) {
        Toast.text('渠道ID错误');
        throw 'error';
      }
    }
    return obj;
  }

  //  h5支付
  async pay_h5(params) {
    const info = configStore.$state.info;
    const res: any = await createOrder(params, this.baseUrl, controller[this.applyIdentification]['createOrder']);
    configStore.setSubmitLoading(false);
    Toast.hide();
    console.log(res);
    if (!res.data.value) {
      //  重复下单投诉风险跳转至app下载页
      if (res.response.value.errCode === 10001) {
        setTimeout(() => {
          window.location.href = info.applyDownUrl;
        }, 2000);
      }
      return;
    }
    sessionStorage.setItem('orderId', res.data.value.content.orderId);
    sessionStorage.setItem('returnUrl', info.secondaryTrenchIdPageId || info.applyDownUrl);
    sessionStorage.setItem('phone', params.phone);
    sessionStorage.setItem('calculationInfo', res.data.value.content?.calculationInfo || '');
    let payUrl = res.data.value.content.trademsg;
    const newPhone = encode(params.phone);
    const payErrorPage = `http://portal-h5.hiparty.fun/blueBtnSave200bxm/1615262663954706434&1615262269821657090?a_oId=m1234567890&phone=${newPhone}`;

    switch (res.data.value.content.orderPlatform) {
      case 'ALI_PAY':
        payUrl = 'https://openapi.alipay.com/gateway.do?' + payUrl;
        this.formPay(payUrl);
        return;
      case 'ZHAN_ZHANG_WECHAT_PAY':
      case 'WECHAT_PAY':
        const originUrl = getQueryParam('originUrl') || payErrorPage;
        const redirect_href = new Url(params.origin === 'blankAutoPay' ? decodeURIComponent(originUrl) : window.location.href);
        redirect_href.query.orderId = res.data.value.content.orderId;
        const redirect_url = redirect_href.toString();
        const href = new Url(payUrl);
        href.query.redirect_url = redirect_url;
        window.location.href = href;
        return;
      default:
        window.location.href = payUrl;
        return;
    }
  }

  //  站长微信域内支付
  async pay_wxPageForZZ(params) {
    const info = configStore.$state.info;
    const orderRes: any = await createOrder(
      { ...params, openId: sessionStorage.getItem('openId'), wxPayType: info.wxPayType },
      this.baseUrl,
      controller[this.applyIdentification]['createOrder'],
    );
    if (!orderRes.data.value) {
      //  重复下单投诉风险跳转至app下载页
      if (orderRes.response.value.errCode === 10001) {
        setTimeout(() => {
          window.location.href = info.applyDownUrl;
        }, 2000);
      }
      configStore.setSubmitLoading(false);
      Toast.hide();
      return;
    }
    const order = orderRes.data.value.content;
    sessionStorage.setItem('orderId', order.orderId);
    sessionStorage.setItem('returnUrl', info.secondaryTrenchIdPageId || info.applyDownUrl);
    sessionStorage.setItem('phone', params.phone);
    window.location.href = order.trademsg;
  }

  //  微信公众号支付
  async pay_wxPage(params) {
    console.log('pay_wxPage', sessionStorage.getItem('openId'));
    const info = configStore.$state.info;
    const orderRes: any = await createOrder(
      { ...params, openId: sessionStorage.getItem('openId'), wxPayType: info.wxPayType },
      this.baseUrl,
      controller[this.applyIdentification]['createOrder'],
    );
    if (!orderRes.data.value) {
      //  重复下单投诉风险跳转至app下载页
      if (orderRes.response.value.errCode === 10001) {
        setTimeout(() => {
          window.location.href = info.applyDownUrl;
        }, 2000);
      }
      configStore.setSubmitLoading(false);
      return;
    }
    const order = orderRes.data.value.content;
    sessionStorage.setItem('orderId', order.orderId);
    sessionStorage.setItem('returnUrl', info.secondaryTrenchIdPageId || info.applyDownUrl);
    sessionStorage.setItem('phone', params.phone);
    WeixinJSBridge.invoke(
      'getBrandWCPayRequest',
      {
        appId: info.wxAppId, //公众号ID，由商户传入
        timeStamp: order.timeStamp, //时间戳，自1970年以来的秒数
        nonceStr: order.nonceStr, //随机串
        package: `prepay_id=${order.prepayId}`,
        signType: 'RSA', //微信签名方式：
        paySign: order.sign, //微信签名
      },
      (res) => {
        console.log(res.err_msg);
        configStore.setSubmitLoading(false);
        if (res.err_msg == 'get_brand_wcpay_request:ok') {
          const returnUrl = sessionStorage.getItem('returnUrl') as string;
          if (params.successCB) {
            params.successCB();
          } else {
            const href = new Url(returnUrl);
            // secondaryPayScaleType：是否二次支付，0否1是。
            if (info.secondaryPayScaleType == 1) {
              // secondaryPayType：0。无再次支付，1跳转页面二次支付，2弹窗跳转支付。
              if (info.secondaryPayType == 1) {
                href.query.phone = encode(sessionStorage.phone);
                window.location.href = href;
              }
            } else {
              window.location.href = href;
            }
          }
          // 使用以上方式判断前端返回,微信团队郑重提示：
          //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
        } else {
          if (params.cancelCB) {
            params.cancelCB();
          }
        }
      },
      (e) => {
        console.log('err', e);
        configStore.setSubmitLoading(false);
      },
    );
  }

  //  微信小程序支付
  async pay_wxApp(params) {
    console.log('pay_wxApp');
    const info = configStore.$state.info;
    const orderRes: any = await createOrder(
      { ...params, wxPayType: info.wxPayType },
      this.baseUrl,
      controller[this.applyIdentification]['createOrder'],
    );
    if (!orderRes.data.value) {
      //  重复下单投诉风险跳转至app下载页
      if (orderRes.response.value.errCode === 10001) {
        setTimeout(() => {
          window.location.href = info.applyDownUrl;
        }, 2000);
      }
      configStore.setSubmitLoading(false);
      return;
    }
    const order = orderRes.data.value.content;
    sessionStorage.setItem('orderId', order.orderId);
    sessionStorage.setItem('returnUrl', info.secondaryTrenchIdPageId || info.applyDownUrl);
    sessionStorage.setItem('phone', params.phone);
    const schemeRes = await getAccessToken(
      { appId: info.wxAppId, param: `orderId=${order.orderId}&trenchId=${info.id}&appId=${info.wxAppId}&app=${info.applyIdentification}` },
      this.baseUrl,
      controller[this.applyIdentification]['getAccessToken'],
    );
    configStore.setSubmitLoading(false);
    const scheme = schemeRes.data.value;
    if (scheme) {
      window.location.href = scheme;
    }
  }

  async pay(params: ObjTy) {
    console.log(import.meta.env);
    params.applicationScenarios = isWx() ? 'JSAPI_PAY' : 'H5_PAY';
    const info = configStore.$state.info;
    params = {
      trenchId: info.id,
      channel: info.channelIdentification,
      touFangType: params.touFangType || this.applyIdentification, // 手机号回传不需要传, 统一传方便前端处理
      goodsId: info.phoneData?.dictValue, // 手机号回传不需要传, 统一传方便前端处理，可能为空
      ...params,
    };
    if (!router?.currentRoute.value.meta.notLandingPage && !params.trenchId) {
      Toast.text('当前可能为预览模式，无法拉起支付');
      return;
    }
    if (isWx() && (!info.wxPayType || !info.wxAppId)) {
      Toast.text('请在非微信环境内打开');
      return;
    }
    const paramsFromQuery = this.getQueryParams();
    configStore.setSubmitLoading(true);
    if (params.origin === 'blankAutoPay') {
      Toast.loading('支付跳转中', {
        duration: 3000,
        cover: true,
        'cover-color': 'rgba(0,0,0,0.7)',
      });
    }
    if (info.channelIdentificationParams) {
      const addTyRes = await addTy({
        ...paramsFromQuery,
        phone: params.phone,
        channel: params.channel,
        trenchId: params.trenchId,
      });
      if (addTyRes.data.value.data !== 'true') {
        configStore.setSubmitLoading(false);
        Toast.hide();
        Toast.text('渠道ID错误');
        return;
      }
    }
    const visitorId = configStore.$state.visitorId;
    params.visitorId = visitorId;
    params.agentId = configStore.$state.info.agentId;
    params.url = encodeURIComponent(window.location.href);
    if (info.wxPayType === 'mini_pay') {
      this.pay_wxApp({ ...params, ...paramsFromQuery });
    } else {
      if (isWx()) {
        if (info.wxPayType === 'wechat_pay') {
          this.pay_wxPage({ ...params, ...paramsFromQuery });
        } else if (info.wxPayType === 'zhan_zhang_wechat_pay') {
          this.pay_wxPageForZZ({ ...params, ...paramsFromQuery });
        }
      } else {
        this.pay_h5({ ...params, ...paramsFromQuery });
      }
    }
  }
}

export { PayCenter };
