import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { createI18n } from 'vue-i18n';
import { createHead } from '@unhead/vue/client';

import enMessages from '@/i18n/en/index.json';
import ruMessages from '@/i18n/ru/index.json';

import App from './App.vue';

const app = createApp(App);
const pinia = createPinia();
const i18n = createI18n({
  legacy: false,
  locale: 'ru',
  messages: {
    en: enMessages,
    ru: ruMessages,
  },
});
const head = createHead();

pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(i18n);
app.use(head);

app.mount('#app');
