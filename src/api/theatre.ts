import useAxiosApi from '/@/utils/useAxiosApi';
/**
 * 查询是否购买过K币
 * @returns UseAxiosReturn
 */
export function theaterQuery(params: ObjTy, baseURL: string, controller: string) {
  return useAxiosApi(controller, {
    method: 'GET',
    params,
    baseURL,
  });
}
/**
 * 绑定手机号
 * @returns UseAxiosReturn
 */
export function updatePhone(params: ObjTy, baseURL: string, controller: string) {
  return useAxiosApi(controller, {
    method: 'GET',
    params,
    baseURL,
  });
}

//  一键查询物流单号
export function findLogisticsNum(data: ObjTy, baseURL: string) {
  return useAxiosApi('/small/theater/findLogisticsNum', {
    method: 'POST',
    data,
    baseURL,
  });
}

//  获取小剧场所有商品URL
export function getSmallTheaterGoods(params: ObjTy, baseURL: string) {
  return useAxiosApi('/small/theater/getSmallTheaterGoods', {
    method: 'GET',
    params,
    baseURL,
  });
}

//  查询是否有抽奖机会
export function raffleprobability(params: ObjTy, baseURL: string) {
  return useAxiosApi('/small/theater/raffleprobability', {
    method: 'GET',
    params,
    baseURL,
  });
}

//  发送验证码
export function sendTheaterCode(data: ObjTy, baseURL: string) {
  return useAxiosApi('/small/theater/sendTheaterCode', {
    method: 'POST',
    data,
    baseURL,
  });
}

//  获取活动规则 /small/theater/getContent
export function getContent(params: ObjTy, baseURL: string) {
  return useAxiosApi('/small/theater/getContent', {
    method: 'GET',
    params,
    baseURL,
  });
}

//  9.9订单获取
export function getxjcOrder(params: ObjTy, baseURL: string) {
  return useAxiosApi('/small/theater/getxjcOrder', {
    method: 'GET',
    params,
    baseURL,
  });
}

//  9.9兑换话费 /small/theater/exchangePhoneFavourable
export function exchangePhoneFavourable(params: ObjTy, baseURL: string) {
  return useAxiosApi('/small/theater/exchangePhoneFavourable', {
    method: 'GET',
    params,
    baseURL,
  });
}

//  GET公众号获取待领取抽奖信息 /small/theater/getLuckDrawInfo
export function getLuckDrawInfo(params: ObjTy, baseURL: string) {
  return useAxiosApi('/small/theater/getLuckDrawInfo', {
    method: 'GET',
    params,
    baseURL,
  });
}

//  绑定手机号
export function phoneVerificationQuery(data: ObjTy, baseURL: string) {
  return useAxiosApi('/small/theater/phoneVerificationQuery', {
    method: 'POST',
    data,
    baseURL,
  });
}

//  是否绑定手机查询 /small/theater/bindingSpringFrame
export function bindingSpringFrame(params: ObjTy, baseURL: string) {
  return useAxiosApi('/small/theater/bindingSpringFrame', {
    method: 'GET',
    params,
    baseURL,
  });
}
