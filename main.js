import Vue from 'vue'
import App from './App'
import store from './store'

// 封装的网络请求
import './utils/http'

Vue.config.productionTip = false

App.mpType = 'app'


const app = new Vue({
	...App,
	store
})
app.$mount()
