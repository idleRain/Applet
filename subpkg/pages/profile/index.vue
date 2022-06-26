<template>
	<view class="profile">
		<button
			class="avatar-wrapper"
			open-type="chooseAvatar"
			@chooseavatar="onChooseAvatar"
		>
			<image
				v-if="userProfile.avatarUrl"
				class="avatar"
				:src="userProfile.avatarUrl"
			></image>
			<image
				v-else
				class="avatar"
				src="https://c-ssl.dtstatic.com/uploads/blog/202107/05/20210705140730_666eb.thumb.1000_0.jpeg"
			></image>
		</button>
		<view class="nickname-wrapper">
			<label for="">昵称:</label>
			<input
				type="nickname"
				:value="userProfile.nickName"
				@blur="onBlurNickName"
			/>
		</view>
		<button type="primary" block @click="saveProfile">确认</button>
	</view>
</template>

<script>
import { mapState } from 'vuex'
export default {
	// data() {
	// 	return {
	// 		userProfile: {
	// 			avatarUrl: '',
	// 			nickName: ''
	// 		}
	// 	}
	// },
	computed: {
		...mapState('user', ['userProfile'])
	},
	methods: {
		onChooseAvatar(ev) {
			this.userProfile.avatarUrl = ev.detail.avatarUrl
		},
		onBlurNickName(ev) {
			this.userProfile.nickName = ev.detail.value
		},
		saveProfile() {
			this.$store.commit('user/saveProfile', this.userProfile)
			uni.navigateBack({})
		}
	}
}
</script>

<style lang="scss" scoped>
.profile {
	padding: 0 40rpx;
}

.avatar-wrapper {
	padding: 0;
	width: 112rpx;
	border-radius: 16rpx;
	margin-top: 80rpx;
	margin-bottom: 120rpx;

	&::after {
		content: '';
		border: none;
	}

	.avatar {
		display: block;
		width: 112rpx;
		height: 112rpx;
	}
}

.nickname-wrapper {
	display: flex;
	align-items: center;
	height: 80rpx;
	border-bottom: 1rpx solid #eee;
	margin-bottom: 40rpx;

	label {
		width: 100rpx;
		color: #333;
		font-size: 34rpx;
	}

	input {
		color: #666;
		font-size: 34rpx;
	}
}
</style>
