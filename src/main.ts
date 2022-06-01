import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store, key } from './store'
import './assets/index.css'
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';

import Prism from 'prismjs'

VueMarkdownEditor.use(vuepressTheme, {
  Prism,
});

createApp(App)
  .use(router)
  .use(store, key)
  .use(VueMarkdownEditor)
  .mount('#app')