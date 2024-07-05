import useAxiosApi from '/@/utils/useAxiosApi';
/**
 * 查询盲盒商品列表
 * @returns UseAxiosReturn
 */
export function getGoods(params: ObjTy, baseURL: string) {
  return useAxiosApi(`/blindBox/getGoods`, {
    method: 'GET',
    params,
    baseURL,
  });
}
/**
 * 查询盲盒商品等级
 * @returns UseAxiosReturn
 */
export function getGradeGoods(params: ObjTy, baseURL: string) {
  return useAxiosApi(`/blindBox/getGradeGoods`, {
    method: 'GET',
    params,
    baseURL,
  });
}
