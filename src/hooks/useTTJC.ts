import moment from 'moment';
import { randomChars } from '../utils/common';
import md5 from 'md5';
import axios from 'axios';
import { Toast } from '@nutui/nutui';

function useTTJC(orders: string | string[]) {
  const getJumpParams = (order: string) => {
    return new Promise((resolve) => {
      const key = '65KfoQsMNWZiD7vo4EzMNe';
      // const key = 'GP9h4PRWuP63q6LnUD';
      const nonstr = randomChars(20);
      const ts = moment().unix();
      const order_no = order;
      const money = 990;
      const secret = md5(`${key}${order_no}${nonstr}${ts}${money}`);
      axios({
        // url: 'https://testservice.zhichenghn.cn/api/v1/public/external/douyin/pay',
        url: 'https://service.zhichenghn.cn/api/v1/public/external/douyin/pay',
        method: 'post',
        data: {
          order_no,
          nonstr,
          ts,
          money,
          secret,
        },
      })
        .then((res) => {
          if (res.data.dm_error === 0) {
            resolve({
              order_no,
              nonstr,
            });
          } else {
            Toast.text(res.data.error_msg);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    });
  };

  const redirectWxPre = `https://h5.zhichenghn.cn/#/pages/jump_mp/wx?id=98&cv=RHJC&platform=WECHAT&external_type=1&channel=600035200`;
  if (!orders) {
    window.location.href = redirectWxPre;
    return;
  }
  const promiseList: any[] = [];
  if (Array.isArray(orders)) {
    orders.forEach((item: string) => {
      promiseList.push(getJumpParams(item));
    });
  }
  if (typeof orders === 'string') {
    orders as unknown as string;
    promiseList.push(getJumpParams(orders));
  }
  Promise.all(promiseList)
    .then((res) => {
      let order_no_strs = '';
      let nonstr_strs = '';
      res.forEach((item, index) => {
        order_no_strs += `${item.order_no}${index < res.length - 1 ? ',' : ''}`;
        nonstr_strs += `${item.nonstr}${index < res.length - 1 ? ',' : ''}`;
      });
      console.log(`${redirectWxPre}&order_no=${encodeURIComponent(order_no_strs)}&nonstr=${encodeURIComponent(nonstr_strs)}`);
      window.location.href = `${redirectWxPre}&order_no=${encodeURIComponent(order_no_strs)}&nonstr=${encodeURIComponent(nonstr_strs)}`;
    })
    .finally(() => {
      Toast.hide();
    });
}

export default useTTJC;
