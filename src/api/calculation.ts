import useAxiosApi from '/@/utils/useAxiosApi';
/**
 * 查询测算历史记录
 * @returns UseAxiosReturn
 */
export function getSearchResult(params: ObjTy, baseURL: string) {
  return useAxiosApi(`/small/theater/getCSHistory`, {
    method: 'GET',
    params,
    baseURL,
  });
}
