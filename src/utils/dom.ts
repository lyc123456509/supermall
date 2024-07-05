import debounce from 'lodash/debounce';

// 以1920px 底图为准开发页面
export const setDomFontSize = (): void => {
  const width = document.documentElement.clientWidth || document.body.clientWidth;
  const fontsize = width / 7.5 + 'px';
  (document.getElementsByTagName('html')[0].style as any)['font-size'] = fontsize;
};

const setDomFontSizeDebounce = debounce(setDomFontSize, 400);
window.addEventListener('resize', setDomFontSizeDebounce); // 浏览器加入收缩监听防抖，重新计算rem配置
