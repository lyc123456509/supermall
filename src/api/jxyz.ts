import useAxiosApi from '/@/utils/useAxiosApi';

export function giveBoxBindingPhone(data: ObjTy, baseURL: string, controller: string) {
  return useAxiosApi(controller, {
    method: 'post',
    data,
    baseURL,
  });
}

export function getAuthCode(params: ObjTy, baseURL: string, controller: string) {
  return useAxiosApi(controller, {
    method: 'GET',
    params,
    baseURL,
  });
}
