<template>
  <div class="container">
    <img :src="gx" class="gx" alt="" />
    <div class="kjcz">
      <div class="kj">
        <p>天天看剧积分*990</p>
        <img :src="btn_qkj" alt="" @click="jumpWxApp" />
      </div>
      <div class="cz">
        <p>价值¥100话费券</p>
        <img :src="btn_qwcz" alt="" @click="goApp" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import gx from '/@/assets/theatreDY/gx.png';
  import btn_qkj from '/@/assets/theatreDY/btn_qkj.png';
  import btn_qwcz from '/@/assets/theatreDY/btn_qwcz.png';
  import { useConfigStore } from '/@/store/modules/platform';
  import axios from 'axios';
  import { randomChars } from '/@/utils/common';
  import moment from 'moment';
  import md5 from 'md5';
  import { Toast } from '@nutui/nutui';

  const configStore = useConfigStore();
  const info = computed(() => {
    return configStore.info;
  });
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
  const goApp = () => {
    window.location.href = info.value.applyDownUrl;
  };
</script>

<style lang="scss" scoped>
  .container {
    width: 100vw;
    min-height: 100vh;
    background-image: url(/@/assets/theatreDY/bg3.png);
    background-repeat: no-repeat;
    background-size: 100% auto;
    background-color: #e92512;
    position: absolute;
    padding-bottom: 1rem;
    box-sizing: border-box;
    .customer {
      position: fixed;
      right: 0;
      top: 1rem;
      height: 0.54rem;
    }
    .gx {
      width: 6.57rem;
      margin: 4.4rem auto 0 auto;
      display: block;
    }
    .kjcz {
      height: 5.67rem;
      display: flex;
      margin-left: 0.3rem;
      font-size: 0.27rem;
      color: #fff;
      text-align: center;
      & > div {
        flex: 1;
        height: 100%;
        background-repeat: no-repeat;
        background-size: contain;
        &:nth-child(1) {
          & > * {
            margin-right: 0.5rem;
          }
        }
        & > p {
          margin-top: 3.31rem;
        }
        & > img {
          height: 1.22rem;
          margin-top: 0.54rem;
        }
      }
      .kj {
        background-image: url(/@/assets/theatreDY/bg_dsj.png);
      }
      .cz {
        background-image: url(/@/assets/theatreDY/bg_hbz.png);
        margin-left: -0.4rem;
      }
    }
    .desc {
      font-size: 0.31rem;
      color: #fff;
      opacity: 0.3;
      margin-top: 1.5rem;
      text-align: center;
    }
  }
</style>
