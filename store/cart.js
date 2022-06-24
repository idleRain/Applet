export default {
	namespaced: true,
	state: {
		carts: uni.getStorageSync('carts') || []
	},
	mutations: {
		// 添加商品到购物车
		addToCart(state, goods) {
			// console.log('@vuex 接收到了 goods ：', goods);
			const result = state.carts.find(item => item.goods_id === goods.goods_id)
			if (!result) {
				state.carts.push(goods)
			} else {
				result.goods_count += 1
			}
			this.commit('cart/saveStorage')
		},
		// 存入本地
		saveStorage(state) {
			uni.setStorageSync('carts', state.carts)
		},
		toggleState(state, index) {
			state.carts[index].goods_state = !state.carts[index].goods_state
			this.commit('cart/saveStorage')
		},
		toggleAll(state, allChecked) {
			// 遍历设置每个商品的选中状态
			state.carts.forEach(item => item.goods_state = !allChecked);
			// 更新本地存储
			this.commit('cart/saveStorage');
		},
	},
	getters: {
		cartCount(state) {
			return state.carts.reduce((count, item) => {
				// 将购物车中每个商品的购买数量累加
				return count += item.goods_count;
			}, 0)
		},
		allChecked(state) {
			return state.carts.every(item => item.goods_state === true)
		}
	},
}
