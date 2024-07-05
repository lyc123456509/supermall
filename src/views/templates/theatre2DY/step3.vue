<template>
  <div class="container">
    <!-- <img :src="btn_lxkf" class="customer" alt="" /> -->
    <img :src="gx" class="gx" alt="" />
    <div class="kjcz">
      <div class="kj">
        <img :src="tvImg" alt="" class="tv" />
        <p>天天看剧积分*990</p>
        <img :src="btn_qkj" alt="" @click="jumpWxApp" class="btn" />
      </div>
    </div>
    <CompanyInfo style="color: #fff; margin-top: 0.4rem" />
    <sideBar />
  </div>
</template>

<script lang="ts" setup>
  // import btn_lxkf from '/@/assets/theatre2DY/btn_lxkf.png';
  import gx from '/@/assets/theatre2DY/gx.png';
  import btn_qkj from '/@/assets/theatre2DY/btn_qkj.png';
  import tvImg from '/@/assets/theatre2DY/tv.png';
  import axios from 'axios';
  import { randomChars } from '/@/utils/common';
  import moment from 'moment';
  import md5 from 'md5';
  import { Toast } from '@nutui/nutui';

  let disabledJumpWx = ref(false);
  const redirectWxPre = `https://h5.zhichenghn.cn/#/pages/jump_mp/wx?id=98&cv=RHJC&platform=WECHAT&external_type=1&channel=600035200`;
  //  获取天天小剧场跳转链接
  const getUrl = () => {
    return new Promise((resolve) => {
      disabledJumpWx.value = true;
      const key = '65KfoQsMNWZiD7vo4EzMNe';
      const nonstr = randomChars(20);
      const ts = moment().unix();
      const order_no = sessionStorage.getItem('order_no');
      const money = 990;
      const secret = md5(`${key}${order_no}${nonstr}${ts}${money}`);
      axios({
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
            resolve(`${redirectWxPre}&order_no=${order_no}&nonstr=${nonstr}`);
          } else {
            Toast.text(res.data.error_msg);
          }
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          disabledJumpWx.value = false;
        });
    });
  };
  const jumpWxApp = async () => {
    if (disabledJumpWx.value) return;
    const url = await getUrl();
    window.location.href = url as string;
  };
</script>

<style lang="scss" scoped>
  .container {
    width: 100vw;
    min-height: 100vh;
    background-image: url(/@/assets/theatre2DY/bg3.png);
    background-repeat: no-repeat;
    background-size: 100% auto;
    background-color: #e92512;
    padding-bottom: 1rem;
    box-sizing: border-box;
    position: absolute;
    .customer {
      position: fixed;
      right: 0;
      top: 1rem;
      height: 0.54rem;
    }
    .gx {
      width: 6.57rem;
      margin: 3.8rem auto 0 auto;
      display: block;
    }
    .kjcz {
      height: 6.45rem;
      display: flex;
      font-size: 0.27rem;
      color: #fff;
      text-align: center;
      justify-content: center;
      & > div {
        height: 100%;
        background-repeat: no-repeat;
        background-size: contain;
        .tv {
          width: 5.2rem;
        }
        .btn {
          width: 4.3rem;
          margin-top: 0.4rem;
        }
        p {
          font-size: 0.34rem;
          color: #333;
          font-weight: bold;
          margin-top: -0.6rem;
        }
      }
      .kj {
        width: 6.5rem;
        background-image: url(/@/assets/theatre2DY/bg_dsj.png);
        background-size: contain;
      }
    }
  }
</style>
