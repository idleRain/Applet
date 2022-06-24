import Vue from 'vue'
import Vuex from 'vuex'
import cart from '@/store/cart'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		msg: '我是嫩跌'
	},
	modules: {
		cart
	}
})

export default store
