export function typeCheck(param: any) {
  return Object.prototype.toString.call(param);
}

/**
 * 批量修改stage
 */
export function mutateState(state: Record<string, any>, payload: Record<string, any>) {
  if (typeCheck(state) === '[object Object]' && typeCheck(payload) === '[object Object]') {
    for (const key in payload) {
      state[key] = payload[key];
    }
  } else {
    console.error('expected plain Object');
  }
}

//  判断是否为微信内置浏览器
export function isWx(): boolean {
  const ua = navigator.userAgent.toLowerCase();
  return ua.indexOf('micromessenger') !== -1;
}

//  根据链接获取参数
export const getQueryParam = (key: string) => {
  const reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)', 'i');
  const r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return decodeURI(r[2]);
  }
  return null;
};

//  获取斜杠后id
export const getId = () => {
  const href = decodeURIComponent(window.location.href);
  const symbol1 = href.lastIndexOf('/') + 1;
  const symbol2 = href.indexOf('&');
  const symbol3 = href.indexOf('?');
  let id = '';
  if (Number(href.slice(symbol1, symbol2))) {
    if (symbol3 !== -1) {
      id = href.slice(symbol1, symbol3);
    } else {
      id = href.slice(symbol1);
    }
  } else {
    id = '';
  }
  return id;
};

//  加载外部js
export const loadJs = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    document.body.appendChild(script);
    script.onload = () => {
      resolve();
    };
    script.onerror = () => {
      reject();
    };
  });
};
