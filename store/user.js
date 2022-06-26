export default {
	namespaced: true,
	state() {
		return {
			address: uni.getStorageSync('address') || null,
			userProfile: uni.getStorageSync('userProfile') || {},
			token: uni.getStorageSync('token') || ''
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
			uni.setStorageSync('address', address)
		},

		saveProfile(state, userProfile) {
			// 记录到 vuex 中
			state.userProfile = userProfile
			// 存入本地
			uni.setStorageSync('userProfile', userProfile)
		},
		saveToken(state, token) {
			// 记录 vuex
			state.token = token;
			// 存入本地
			uni.setStorageSync('token', token);
		}
	},
	actions: {
		async getToken() {
			// 获取用户登录凭证
			const [err, {
				code
			}] = await uni.login();

			// 获取用户的信息（非公开）
			const [err1, {
				encryptedData,
				rawData,
				iv,
				signature
			}] = await uni.getUserInfo();

			// 登录换取 Token
			const {
				data: res
			} = await uni.$http.post('/api/public/v1/users/wxlogin', {
				code,
				encryptedData,
				rawData,
				iv,
				signature
			});

			// 存储 token
			if (res.message.token) this.commit('m_user/saveToken', res.message.token);
		}
	}
}
