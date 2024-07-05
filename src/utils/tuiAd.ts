import axios from 'axios';
import { randomCharsNum } from './common';

const domain = {
  development: '',
  test: 'https://adx.tuia-pre.cn',
  production: 'https://adx.tuia.cn',
};
declare const returnCitySN: any;
export default class TuiAd {
  curl: string;
  nurl: string;
  domain: string;
  pid: string;
  constructor({ pid }) {
    this.curl = '';
    this.nurl = '';
    this.domain = domain[import.meta.env.MODE];
    this.pid = pid;
  }

  getAd(): Promise<any> {
    return new Promise((resolve, reject) => {
      const requestBody = {
        device: {
          ip: returnCitySN['cip'],
          ua: window.navigator.userAgent,
        },
        id: randomCharsNum(30),
        imp: [
          { banner: { h: 280, mimes: ['jpg', 'jpeg', 'png', 'gif'], w: 700 }, bidfloor: 0, id: randomCharsNum(10), pid: this.pid, type: 1 },
        ],
      };
      axios({
        url: `${this.domain}/bid/tuia`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: requestBody,
      })
        .then((res) => {
          console.log(res);
          const seatbid = res.data.seatbid;
          let curl = '';
          let nurl = '';
          let durl = '';
          let adm = '';
          seatbid.forEach((item) => {
            let { bid } = item;
            bid = bid[0] || {};
            adm = bid.adm;
            curl = bid.curl && bid.curl[0];
            nurl = bid.nurl && bid.nurl[0];
            durl = bid.durl;
            this.curl = curl;
            this.nurl = nurl;
          });
          return resolve({
            imgurl: JSON.parse(adm).imgurl,
            curl,
            nurl,
            durl,
          });
        })
        .catch((err) => {
          console.log(err);
          return reject(null);
        });
    });
  }

  exposeReport() {
    axios({
      url: this.nurl,
      method: 'get',
    });
  }

  clickReport() {
    axios({
      url: this.curl,
      method: 'get',
    });
  }
}
