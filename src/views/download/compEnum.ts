const data = {};
const components = ['jhs', 'kkz', 'zdh', 'jhs', 'jlwy', 'kdds', 'ydzx', 'sqjl', 'kkzTest', 'kkz-200'];

components.map((item) => {
  data[item] = defineAsyncComponent(() => import(`./${item}/index.vue`));
});

export default data;
