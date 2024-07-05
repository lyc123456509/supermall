import { useAxios } from '@vueuse/integrations/useAxios';
import axios, { AxiosRequestConfig } from 'axios';
import { Toast } from '@nutui/nutui';

interface INF_REQUESTCONFIG extends AxiosRequestConfig {
  __retryCount?: number;
}
// create an axios instance
const instance = axios.create({
  withCredentials: false,
  timeout: 10000,
});
// request interceptor
instance.interceptors.request.use(
  (config) => {
    config.baseURL = config.baseURL || import.meta.env.VITE_SERVER_URL;
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  },
);

// response interceptor
instance.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    if (response.config.baseURL && response.config.baseURL.indexOf('pay.sccdyzl.com') < 0) {
      return response;
    }
    const res = response.data;
    // if the custom code is not 200, it is judged as an error.
    if (res.code !== 200) {
      Toast.text(res.msg || res.errMsg || res.message);
    }
    return response;
  },
  (error) => {
    if (error.message.indexOf('timeout') > -1) {
      //  超时重试
      const { config } = error;
      let { __retryCount } = config;
      __retryCount as number;
      if (!__retryCount) {
        Toast.text('请检查网络并重试');
        return;
      }
      __retryCount--;
      config.__retryCount = __retryCount;
      return useAxios(config.url, config, instance);
    }
    console.log(error.response, 'err');
    if (error.response?.data?.errMsg) {
      Toast.text(error.response.data.errMsg);
    } else {
      Toast.text(error.message);
    }
    return Promise.resolve(error.response.data);
  },
);

/**
 * reactive useFetchApi
 */

export default function useAxiosApi(url: string, config: INF_REQUESTCONFIG) {
  return useAxios(url, config, instance);
}
