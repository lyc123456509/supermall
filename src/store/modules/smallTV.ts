import { defineStore } from 'pinia';

interface StoreConfig {
  user: {
    reciver: string;
    phone: string;
    areaCode: string;
    address: string;
  };
  prizeGoods: {
    id: string;
    goodsMsg: string;
    marketPrice: string;
    payPrice: string;
    pictureUrl: string;
    orderId?: string;
  };
  openId: string;
}

const initivalConfig: StoreConfig = {
  user: sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user') as string) : {},
  prizeGoods: sessionStorage.getItem('prizeGoods') ? JSON.parse(sessionStorage.getItem('prizeGoods') as string) : {},
  openId: sessionStorage.getItem('openId') || '',
};
export const useTVStore = defineStore({
  id: 'smallTV-config',
  state: (): StoreConfig => ({
    user: initivalConfig.user,
    prizeGoods: initivalConfig.prizeGoods,
    openId: initivalConfig.openId,
  }),
  getters: {
    getUser(): StoreConfig['user'] {
      return this.user;
    },
    getPrizeGoods(): StoreConfig['prizeGoods'] {
      return this.prizeGoods;
    },
  },
  actions: {
    setUser(user: any) {
      user.areaCode = Array.isArray(user.areaCode) ? user.areaCode.join('-') : user.areaCode;
      this.user = user;
      sessionStorage.setItem('user', JSON.stringify(user));
    },
    setPrizeGoods(prizeGoods: any) {
      this.prizeGoods = prizeGoods;
      sessionStorage.setItem('prizeGoods', JSON.stringify(prizeGoods));
    },
    setOpenId(openId: string) {
      this.openId = openId;
      sessionStorage.setItem('openId', openId);
    },
  },
});
