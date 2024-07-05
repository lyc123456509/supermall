import useAxiosApi from '/@/utils/useAxiosApi';

export function getPlatformConfig(id: string) {
  return useAxiosApi(`/commontrench/getInfo/${id}`, {
    method: 'GET',
    baseURL: import.meta.env.VITE_SERVER_URL,
    __retryCount: 1,
  });
}
export function createOrder(data: ObjTy, baseURL: string, controller: string) {
  return useAxiosApi(controller, {
    method: 'get',
    params: data,
    baseURL,
  });
}

export function backAdver(data) {
  return useAxiosApi(`/commontrench/trench_statistics`, {
    method: 'post',
    data: data,
    baseURL: import.meta.env.VITE_SERVER_URL,
  });
}

export function addTy(data: ObjTy) {
  return useAxiosApi('/aggregationPay/addTyClick', {
    method: 'get',
    params: data,
  });
}

//  微信授权登录获取openid /app/open/getWxOpenid
export function getWxOpenid(data: ObjTy, baseURL: string, controller: string) {
  return useAxiosApi(controller, {
    method: 'get',
    params: data,
    baseURL,
  });
}

//  微信获取短链
export function getAccessToken(data: ObjTy, baseURL: string, controller: string) {
  return useAxiosApi(controller, {
    method: 'get',
    params: data,
    baseURL,
  });
}

// 获取随机金额
export function getRandomMoney(baseURL: string, controller: string) {
  return useAxiosApi(controller, {
    method: 'get',
    baseURL,
  });
}

// 检查订单状态
export function checkOrder(data: ObjTy, baseURL: string, controller: string) {
  return useAxiosApi(controller, {
    method: 'get',
    params: data,
    baseURL,
  });
}

//  申请退款
//  图片上传obs
export function uploadObs(baseURL: string) {
  return useAxiosApi(``, {
    method: 'put',
    baseURL,
  });
}

//  退款提交 /feedback-order/add
export function feedbackOrder(data: ObjTy) {
  return useAxiosApi(`/feedback-order/add`, {
    method: 'post',
    data,
  });
}
export function qureyAllAd(data: ObjTy) {
  return useAxiosApi(`/banner-detail/getH5BannerDetail`, {
    method: 'get',
    params: data,
  });
}

export function clickAd(data: ObjTy) {
  return useAxiosApi(`/banner-detail/saveBannerClickDetail`, {
    method: 'post',
    data,
  });
}
