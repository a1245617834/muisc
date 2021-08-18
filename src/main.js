import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import $ from 'jquery'
new Vue.use($);
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

import '/src/assets/css/init.less';

import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

//设置时间格式
//转换单位
Vue.filter('dateFormat',function (originVal) {
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  const m = (dt.getMonth()+ 1 +'').padStart(2,'0')
  const d = (dt.getDay() + '').padStart(2,'0')

  const hh = (dt.getHours() + '').padStart(2,'0')
  const mm = (dt.getMinutes() + '').padStart(2,'0')
  const ss = (dt.getSeconds() + '').padStart(2,'0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

// 格式2021-05-20
Vue.filter('dateFormatToYMD',function (originVal) {
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  const m = (dt.getMonth()+ 1 +'').padStart(2,'0')
  const d = (dt.getDay() + '').padStart(2,'0')


  return `${y}-${m}-${d}`
})

//秒分转换
Vue.filter('timeFormat',function (time) {

  //分钟
  var minute = time / 60;
  var minutes = parseInt(minute);

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  //秒
  var second = time % 60;
  var seconds = Math.round(second);
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return `${minutes}:${seconds}`;
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
