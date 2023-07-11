import { createApp } from 'vue';
import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import globalComponents from '@/components';
import ElementPlus from 'element-plus';
import router from './router';
import store from './store';
import 'element-plus/dist/index.css';

import App from './App.vue';
import '@/assets/style/global.less';
import '@/api/interceptor';

const app = createApp(App);

app.use(ArcoVue, {});
app.use(ArcoVueIcon);
app.use(router);
app.use(store);
app.use(globalComponents);
app.use(ElementPlus);
app.mount('#app');
