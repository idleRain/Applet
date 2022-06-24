import Vue from 'vue'
import Vuex from 'vuex'
import cart from '@/store/cart'
import user from '@/store/user'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		msg: '我是嫩跌'
	},
	modules: {
		cart,
		user
	}
})

export default store
