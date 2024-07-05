// export const IsReport = process.env.REPORT;
export const IsReport = false;

export const wxPageDirectUri = {
  development: 'http://beta-h5.hiparty.fun',
  test: 'http://beta-h5.hiparty.fun',
  production: 'http://portal-h5.hiparty.fun',
};

export const businessDomain = {
  kkz: {
    development: 'https://dev-kk.sccdyzl.com',
    test: 'https://dev-kk.sccdyzl.com',
    production: 'https://beta-kk-payabutment.sccdyzl.com',
  },
  jxhh: {
    development: 'https://dev-kk.sccdyzl.com',
    test: 'https://dev-kk.sccdyzl.com',
    production: 'https://beta-kk-payabutment.sccdyzl.com',
  },
  jhs: {
    development: 'https://dev-kk.sccdyzl.com',
    test: 'https://dev-kk.sccdyzl.com',
    production: 'https://beta-kk-payabutment.sccdyzl.com',
  },
  xjc: {
    development: 'https://dev-kk.sccdyzl.com',
    test: 'https://dev-kk.sccdyzl.com',
    production: 'https://beta-kk-payabutment.sccdyzl.com',
  },
  zdh: {
    development: 'https://beta-zdh.sccdyzl.com',
    test: 'https://beta-zdh.sccdyzl.com',
    production: 'https://zdh.sccdyzl.com',
  },
  ydzx: {
    development: 'https://beta-ydzx.sccdyzl.com',
    test: 'https://beta-ydzx.sccdyzl.com',
    production: 'https://ydzx.sccdyzl.com',
  },
  jlwy: {
    development: 'https://beta-jlwy.sccdyzl.com',
    test: 'https://beta-jlwy.sccdyzl.com',
    production: 'https://jlwy.sccdyzl.com',
  },
  kdds: {
    development: 'https://beta-kdds.sccdyzl.com',
    test: 'https://beta-kdds.sccdyzl.com',
    production: 'https://kdds.sccdyzl.com',
  },
  sqjl: {
    development: 'https://beta-sqjl.sccdyzl.com',
    test: 'https://beta-sqjl.sccdyzl.com',
    production: 'https://sqjl.sccdyzl.com',
  },
  cs: {
    development: 'https://dev-kk.sccdyzl.com',
    test: 'https://dev-kk.sccdyzl.com',
    production: 'https://beta-kk-payabutment.sccdyzl.com',
  },
  jxyz: {
    development: 'https://beta-mh-portal-api.sccdyzl.com',
    test: 'https://beta-mh-portal-api.sccdyzl.com',
    production: 'https://mh-portal-api.sccdyzl.com',
  },
};

export const controller = {
  kkz: {
    getRandomMoney: '/bu/getRandomMoney',
    checkOrder: '/app/pay/queryOrder',
    createOrder: '/app/pay/addPayOrderByWeb',
    getWxOpenid: '/app/open/getWxOpenid', //用于公众号
    getAccessToken: '/app/open/getAccessToken', //用于小程序
    theaterQuery: '/small/theater/query',
    updatePhone: '/small/theater/updatePhone',
  },
  jhs: {
    getRandomMoney: '/bu/getRandomMoney',
    checkOrder: '/app/pay/queryOrder',
    createOrder: '/app/pay/addPayOrderByWeb',
    getWxOpenid: '/app/open/getWxOpenid', //用于公众号
    getAccessToken: '/app/open/getAccessToken', //用于小程序
  },
  zdh: {
    getRandomMoney: '/h5Order/getRandomMoney',
    checkOrder: '/h5Order/queryOrder',
    createOrder: '/h5Order/payOrder',
    getWxOpenid: '/app/open/getWxOpenid', //用于公众号
    getAccessToken: '/app/open/getAccessToken', //用于小程序
  },
  jxyz: {
    giveBoxBindingPhone: '/home/giveBoxBindingPhone', //领取赠送的礼品
    getAuthCode: '/sso/getAuthCode', // 获取验证码
  },
};

const zdhHpApp = ['ydzx', 'jlwy', 'kdds', 'sqjl'];
const kkzApp = ['xjc', 'jxhh', 'jhs', 'cs'];

zdhHpApp.forEach((item) => {
  controller[item] = controller['zdh'];
});

kkzApp.forEach((item) => {
  controller[item] = controller['kkz'];
});
