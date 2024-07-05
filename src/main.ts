import { createApp } from 'vue';
import App from './App.vue';
import { nutUiComponents } from './plugins/nutUI';
import router from '/@/router';
import store from '/@/store';
import './assets/font/iconfont.css';
import './assets/app.css';
import '/@/styles/index.scss';
// import 'amfe-flexible';
import { setDomFontSize } from './utils/dom';
import { inputPhone } from '/@/directive/index';
import VueLuckyCanvas from '@lucky-canvas/vue';
import VueClipboard from 'vue3-clipboard';
import VueConfetti from 'vue-confetti';

setDomFontSize();

const app = createApp(App);

//  烟花动画
app.use(VueConfetti);

//  剪切板
app.use(VueClipboard, {
  autoSetContainer: true,
  appendToBody: true,
});

//  自定义指令
app.directive('input-phone', inputPhone);

// 路由
app.use(router);

// 状态管理
app.use(store);

//  抽奖
app.use(VueLuckyCanvas);

// nutUi按需加载
nutUiComponents.forEach((item) => {
  app.use(item);
});

app.mount('#app');
