<template>
	<view class="wrapper">
		<!-- 个人资料 -->
		<view class="profile">
			<view class="meta">
				<image
					class="avatar"
					:src="
						userInfo.avatarUrl ||
							'https://static.botue.com/ugo/uploads/monkey.png'
					"
					@click="saveProfile"
				></image>
				<text class="nickname">{{ userInfo.nickName || '微信用户' }}</text>
			</view>
		</view>
		<!-- 统计 -->
		<view class="count">
			<view class="cell">
				8
				<text>收藏的店铺</text>
			</view>
			<view class="cell">
				14
				<text>收藏的商品</text>
			</view>
			<view class="cell">
				18
				<text>关注的商品</text>
			</view>
			<view class="cell">
				84
				<text>我的足迹</text>
			</view>
		</view>
		<!-- 我的订单 -->
		<view class="orders">
			<view class="title">我的订单</view>
			<view class="sorts">
				<text class="icon-bill">待付款</text>
				<text class="icon-car">待收货</text>
				<text class="icon-money">退款/退货</text>
				<text class="icon-list">全部订单</text>
			</view>
		</view>
		<!-- 地址管理 -->
		<view class="address icon-arrow">收货地址</view>
		<!-- 其它 -->
		<view class="extra">
			<view class="item icon-arrow" @click="makePhone">联系客服</view>
			<button class="item icon-arrow" open-type="feedback">意见反馈</button>
		</view>
		<!-- <button type="primary" @click="saveProfile">获取用户信息</button> -->
	</view>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
	computed: {
		...mapState('user', ['userProfile']),
		...mapGetters('user', ['userInfo'])
	},
	methods: {
		makePhone() {
			uni.makePhoneCall({
				phoneNumber: '10086'
			})
		},
		async saveProfile() {
			// 同步方式获取方数据
			const [err, userProfile] = await uni.getUserProfile({
				desc: '用于用户注册'
			})

			// 调用 mutations 存用户信息
			this.$store.commit('user/saveProfile', userProfile)
		}
	}
}
</script>

<style scoped lang="scss">
.wrapper {
  position: absolute;
  top: 0;
  bottom: 0;

  width: 100%;
  background-color: #f4f4f4;
}

.profile {
  height: 375rpx;
  background-color: #ea4451;
  display: flex;
  justify-content: center;
  align-items: center;

  .meta {
    .avatar {
      display: block;
      width: 140rpx;
      height: 140rpx;
      border-radius: 50%;
      border: 2rpx solid #fff;
      overflow: hidden;
    }

    .nickname {
      display: block;
      text-align: center;
      margin-top: 20rpx;
      font-size: 30rpx;
      color: #fff;
    }
  }
}

.count {
  display: flex;
  margin: 0 20rpx;
  height: 100rpx;
  text-align: center;
  border-radius: 4rpx;
  background-color: #fff;

  position: relative;
  top: -27rpx;

  .cell {
    flex: 1;
    padding-top: 16rpx;
    font-size: 27rpx;
    color: #333;
  }

  text {
    display: block;
    font-size: 24rpx;
  }
}

.orders {
  margin: -17rpx 20rpx 0 20rpx;
  padding: 20rpx 0;
  background-color: #fff;
  border-radius: 4rpx;

  .title {
    padding-left: 20rpx;
    font-size: 30rpx;
    color: #333;
    padding-bottom: 20rpx;
    border-bottom: 1rpx solid #eee;
  }

  .sorts {
    padding-top: 30rpx;
    text-align: center;
    display: flex;
  }

  [class*='icon-'] {
    flex: 1;
    font-size: 24rpx;

    &::before {
      display: block;
      font-size: 48rpx;
      margin-bottom: 8rpx;
      color: #ea4451;
    }
  }
}

.address {
  line-height: 1;
  background-color: #fff;
  font-size: 30rpx;
  padding: 25rpx 0 25rpx 20rpx;
  margin: 10rpx 20rpx;
  color: #333;
  border-radius: 4rpx;
}

.extra {
  margin: 0 20rpx;
  background-color: #fff;
  border-radius: 4rpx;

  .item {
    line-height: 1;
    padding: 25rpx 0 25rpx 20rpx;
    border-bottom: 1rpx solid #eee;
    font-size: 30rpx;
    color: #333;
  }

  button {
    text-align: left;
    background-color: #fff;

    &::after {
      border: none;
      border-radius: 0;
    }
  }
}

.icon-arrow {
  position: relative;

  &::before {
    position: absolute;
    top: 50%;
    right: 20rpx;
    transform: translateY(-50%);
  }
}
</style>
.shipment {
	height: 100rpx;
	line-height: 2;
	padding: 30rpx 30rpx 40rpx 30rpx;
	font-size: 27rpx;
	color: #333;
	background-color: #fff;
	background-image: url(http://static.botue.com/ugo/images/cart_border%402x.png);
	background-size: contain;
	background-repeat: no-repeat;
	background-position: bottom;

	.dt {
		width: 140rpx;
		float: left;
		clear: both;
	}

	.dd {
		padding-left: 160rpx;
	}

	.meta {
		padding-right: 50rpx;
	}

	text.phone {
		float: right;
	}
}

.carts {
	background-color: #f4f4f4;
	padding-bottom: 110rpx;
	overflow: hidden;

	.shopname {
		padding: 30rpx;
		margin-top: 20rpx;
		font-size: 30rpx;
		color: #333;
		background-color: #fff;
		border-top: 1rpx solid #eee;
		border-bottom: 1rpx solid #eee;
	}

	.goods {
		display: flex;
		padding: 30rpx 20rpx 30rpx 0;
		margin-left: 105rpx;
		border-bottom: 1rpx solid #eee;
		background-color: #fff;

		position: relative;

		.checkbox {
			width: 101rpx;
			height: 100%;
			background-color: #fff;

			display: flex;
			justify-content: center;
			align-items: center;

			position: absolute;
			left: -100rpx;
			top: 0;
		}

		&:last-child {
			border-bottom: none;
		}

		.pic {
			width: 200rpx;
			height: 200rpx;
			margin-right: 30rpx;
		}

		.meta {
			flex: 1;
			font-size: 27rpx;
			color: #333;
			position: relative;
		}

		.name {
			width: 100%;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}

		.price {
			position: absolute;
			bottom: 0;

			color: #ea4451;
			font-size: 33rpx;

			text {
				font-size: 22rpx;
			}
		}

		.amount {
			position: absolute;
			bottom: 0;
			right: 20rpx;

			height: 48rpx;
			text-align: center;
			border: 1rpx solid #ddd;
			border-radius: 8rpx;

			display: flex;
			align-items: center;

			text {
				display: block;
				width: 60rpx;
				line-height: 48rpx;
				font-size: 36rpx;
				color: #ddd;
				text-align: center;
			}

			input {
				width: 60rpx;
				height: 48rpx;
				min-height: 48rpx;
				font-size: 27rpx;
				border-left: 1rpx solid #ddd;
				border-right: 1rpx solid #ddd;
			}
		}
	}
}

.extra {
	position: fixed;
	bottom: 0;
	/* #ifdef H5 */
	bottom: 50px;
	/* #endif */
	left: 0;
	z-index: 9;

	width: 750rpx;
	height: 96rpx;
	text-align: center;
	line-height: 96rpx;
	font-size: 36rpx;
	border-top: 1rpx solid #eee;
	background-color: #fff;
	color: #333;
	display: flex;

	.checkall {
		width: 140rpx;
		line-height: 1;
		margin-left: 25rpx;
		display: flex;
		align-items: center;

		icon {
			margin-right: 20rpx;
		}
	}

	.total {
		display: flex;
		justify-content: center;
		flex: 1;

		label,
		text {
			color: #ea4451;
			vertical-align: bottom;
			position: relative;
			bottom: -2rpx;
		}

		text {
			position: relative;
			bottom: -3rpx;
			font-size: 24rpx;

			&:first-child {
				margin-left: 10rpx;
			}
		}
	}

	.pay {
		width: 200rpx;
		background-color: #ea4451;
		color: #fff;
	}
}
</style>
