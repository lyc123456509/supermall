import { Toast } from '@nutui/nutui';
import axios from 'axios';

class WXApp {
  getUrl() {
    return new Promise((resolve) => {
      axios({
        method: 'get',
        url: `/weChat/ma/scheme/generate`,
        baseURL: import.meta.env.MODE === 'development' ? '' : 'http://47.109.55.12',
      }).then((response) => {
        const data = response.data;
        if (data.errcode === 0) {
          return resolve(data.openlink);
        }
        Toast.text(data.errmsg);
        return resolve('');
      });
    });
  }
}

export { WXApp };
