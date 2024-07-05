import { getPlatformConfig, getWxOpenid } from '/@/api';
import { defineStore } from 'pinia';
import { getQueryParam, isWx } from '/@/utils';
import { businessDomain, controller } from '/~/config/constant';

const appNameEnum = {
  kkz: '可可赚',
  zdh: '整点花',
  jhs: '巨会省',
  ydzx: '悦动在线',
  jlwy: '精灵物语',
  kdds: '口袋大师',
  sqjl: '神奇精灵',
  jxyz: '鲸喜宇宙',
  jxhh: '鲸喜宇宙',
  cs: '测算',
};

type payMethod = 'ALI_PAY' | 'WECHAT_PAY';
interface StoreConfig {
  info: {
    appName: string;
    logoUrl: string;
    subjectValue: string;
    domainValue: string;
    applyIdentification: string;
    channelIdentification: string;
    channelIdentificationParams: string | null;
    id: string;
    payType: string;
    payTypeWrap: {
      method: payMethod;
      enable: boolean;
    }[];
    aliType: number | null;
    wxType: number | null;
    agreementSelection: boolean;
    phoneData: {
      dictValue?: string;
      cssClass: string;
      remark?: string;
    };
    applyDownUrl: string;
    secondaryPayType: number;
    secondaryPayScaleType: number;
    secondaryTrenchIdPageId: string;
    advertisingUrl: string;
    secondaryPayTrenchId?: string;
    renderPageValueStr: string;
    wxAppId?: string;
    wxPayType?: 'wechat_pay' | 'mini_pay' | 'zhan_zhang_wechat_pay';
    agentId: string;
    landingPageId: string;
    landingPageResponse: {
      subjectValue: string;
      staticPageValue: string;
      userShValue: string;
      rulsUrlValue: string;
      customerUrlValue: string;
      customerPhone: string;
      domainValue: string;
      logoUrl: string;
      applyDownUrl: string;
      applyIdentification: string;
      reviewWindows: 0 | 1;
    };
    FeesInfo?: string; // 是否有电费兑付
    secondaryPhone?: number;
    secondaryPayMoney?: number;
  };
  loading: boolean;
  submitLoading: boolean;
  visitorId: string; //用户设备标识
}

const initivalConfig: StoreConfig = {
  info: {
    appName: '',
    logoUrl: '',
    subjectValue: '{"company":"","address":""}',
    applyIdentification: 'kkz',
    channelIdentification: '',
    channelIdentificationParams: null,
    domainValue: '{"url":"","recordNumber":""}',
    id: '',
    payType: '',
    payTypeWrap: [],
    aliType: 0,
    wxType: 0,
    agreementSelection: true,
    phoneData: {
      cssClass: '100',
      remark: '{"desc":"", "money": 29.9}',
      dictValue: '1',
    },
    secondaryPayType: 0,
    secondaryPayScaleType: 0,
    applyDownUrl: '',
    secondaryTrenchIdPageId: '',
    secondaryPayTrenchId: '',
    advertisingUrl: '',
    renderPageValueStr: '',
    agentId: '',
    landingPageId: '',
    landingPageResponse: {
      subjectValue: '{"company":"","address":""}',
      staticPageValue: 'test',
      userShValue: '',
      rulsUrlValue: '活动规则test11\n换行咯',
      customerUrlValue: 'https://ykf-webchat.7moor.com/wapchat.html?accessId=3e89c540-ed47-11ec-a02e-eb8e52aced8a',
      customerPhone: '',
      domainValue: '{"url":"","recordNumber":""}',
      logoUrl: '',
      applyDownUrl: '',
      applyIdentification: 'kkz',
      reviewWindows: 0,
    },
    FeesInfo: '',
  },
  loading: false,
  submitLoading: false,
  visitorId: '',
};
export const useConfigStore = defineStore({
  id: 'app-config',
  state: (): StoreConfig => ({
    info: initivalConfig['info'],
    loading: initivalConfig['loading'],
    submitLoading: initivalConfig['submitLoading'],
    visitorId: initivalConfig['visitorId'],
  }),
  getters: {
    getConfig(): StoreConfig['info'] {
      return this.info;
    },
    getLoading(): StoreConfig['loading'] {
      return this.loading;
    },
    getSubmitLoading(): StoreConfig['submitLoading'] {
      return this.submitLoading;
    },
    getVisitorId(): StoreConfig['visitorId'] {
      return this.visitorId;
    },
  },
  actions: {
    setConfig(info: any) {
      this.info = info;
    },
    setLoading(state: boolean) {
      this.loading = state;
    },
    setVisitorId(state: string) {
      this.visitorId = state;
    },
    setSubmitLoading(state: boolean) {
      this.submitLoading = state;
    },
    getPlatformConfig(id: string): Promise<StoreConfig['info']> {
      return new Promise((resolve) => {
        this.setLoading(true);
        getPlatformConfig(id).then((res) => {
          const value = res.data.value.data as StoreConfig['info'];

          try {
            const electricityFeesList = ['kkz'];
            const isFees = electricityFeesList.indexOf(value.applyIdentification) >= 0;
            let feesInfo = '';
            let remark = JSON.parse(JSON.stringify(value.phoneData.remark));
            remark = JSON.parse(remark);
            if (remark.electric) {
              feesInfo = remark.electric;
            }
            value.FeesInfo = isFees ? feesInfo : '';
          } catch (e) {}

          value.secondaryPayTrenchId = value.secondaryPayTrenchId;
          value.applyIdentification = value.applyIdentification || value.landingPageResponse.applyIdentification;
          value.subjectValue = value.subjectValue || value.landingPageResponse.subjectValue;
          value.domainValue = value.domainValue || value.landingPageResponse.domainValue;
          value.applyDownUrl = value.applyDownUrl || value.landingPageResponse.applyDownUrl;
          value.agreementSelection = Boolean(value.agreementSelection);
          value.appName = appNameEnum[value.applyIdentification];
          const payTypeWrap: StoreConfig['info']['payTypeWrap'] = [];
          value.payType.split(',').forEach((item) => {
            if (item === 'ALI_PAY') {
              payTypeWrap.push({ method: item, enable: Boolean(value.aliType) });
            } else if (item === 'WECHAT_PAY') {
              payTypeWrap.push({ method: item, enable: Boolean(value.wxType) });
            }
          });
          value.payTypeWrap = payTypeWrap;
          this.setConfig(value);
          this.setLoading(false);

          //  test 代码
          if (value.wxPayType === 'zhan_zhang_wechat_pay') {
            if (!getQueryParam('openid') && isWx()) {
              window.location.href = `https://pay3.senhuo.cn/pay/WechatOpenId.php?redirect_url=${encodeURIComponent(window.location.href)}`;
            }
            if (getQueryParam('openid') && isWx()) {
              sessionStorage.setItem('openId', getQueryParam('openid') as string);
            }
          } else if (value.wxPayType === 'wechat_pay') {
            if (!sessionStorage.getItem('openId')) {
              if (!getQueryParam('code') && isWx() && value.wxAppId) {
                const appid = value.wxAppId;
                const redirect_uri = encodeURIComponent(window.location.href);
                const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_base#wechat_redirect`;
                window.location.href = url;
              }
              if (getQueryParam('code') && isWx() && value.wxAppId) {
                getWxOpenid(
                  { appId: value.wxAppId, code: getQueryParam('code') },
                  businessDomain[value.applyIdentification][import.meta.env.MODE],
                  controller[value.applyIdentification]['getWxOpenid'],
                ).then((openIdRes) => {
                  if (!openIdRes.data.value) {
                    return;
                  }
                  sessionStorage.setItem('openId', openIdRes.data.value);
                });
              }
            }
          }

          resolve(value);
        });
      });
    },
  },
});
