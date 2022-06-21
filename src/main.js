import Vue from 'vue'
import App from './App.vue'
import router from './router/index';
import ElementUI from 'element-ui'
// import Antd from 'ant-design-vue'
import 'element-ui/lib/theme-chalk/index.css';
import 'ant-design-vue/dist/antd'
import variables from './assets/css/public.less'
import './assets/css/base.css'
import VueQuillEditor from 'vue-quill-editor' //quillEditor文本编辑器


  
export const eventBus = new Vue()


//quillEditor
//    require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor, /* { default global options } */)

import { quillEditor } from 'vue-quill-editor'

//elementui
Vue.use(ElementUI)
// Vue.use(Antd)
Vue.config.productionTip = false
Vue.prototype.GlobalCSS = variables


new Vue({
  render: h => h(App),
  router,
  quillEditor
}).$mount('#app')
