export default {
	namespaced: true,
	state() {
		return {
			address: uni.getStorageSync('address') || null,
			userProfile: uni.getStorageSync('userProfile') || {}
		}
	},
	getters: {
		userInfo(state) {
			// 单独提取 userInfo
			return state.userProfile.userInfo
		}
	},
	mutations: {
		saveAddress(state, address) {
			// 更新收货地址
			state.address = address;
			// 并存入本地
			uni.setStorageSync('address', address);
		},

		saveProfile(state, userProfile) {
			// 记录到 vuex 中
			state.userProfile = userProfile;
			// 存入本地
			uni.setStorageSync('userProfile', userProfile)
		}
	}
}
