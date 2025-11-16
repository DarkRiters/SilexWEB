import { createApp } from 'vue';
import App from './App.vue';

import './styles/main.css';
import {router} from "./router";
import {useLocale} from "./composables/useLocale.ts";
import {useTheme} from "./composables/useTheme.ts";
import {createPinia} from "pinia";

const app = createApp(App);
const pinia = createPinia();

useTheme();
useLocale();

app.use(router);
app.use(pinia);
app.mount('#app');