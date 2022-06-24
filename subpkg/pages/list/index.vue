<template>
	<view>
		<!-- 筛选 -->
		<view class="filter">
			<text class="active">综合</text>
			<text>销量</text>
			<text>价格</text>
		</view>
		<!-- 商品列表 -->
		<scroll-view class="goods" scroll-y @scrolltolower="getMore">
			<view class="item" @click="goDetail(item.cat_id)" :key="item.cat_id" v-for="item in goodsList">
				<!-- 商品图片 -->
				<image class="pic" :src="item.goods_small_logo"></image>
				<!-- 商品信息 -->
				<view class="meta">
					<view class="name">{{ item.goods_name }}</view>
					<view class="price">
						<text>￥</text>
						{{ item.goods_price }}
						<text>.00</text>
					</view>
				</view>
			</view>
			<view class="tips" v-if="!goodsList.length">{{ msg }}</view>
			<!-- 加载更多 -->
			<view class="getMore" v-show="showMsg">正在加载...</view>
		</scroll-view>
	</view>
</template>

<script>
import { debounce } from 'lodash'
export default {
	data() {
		return {
			query: '',
			// 商品数据
			goodsList: [],
			// 提示消息
			msg: '',
			showMsg: false,
			nextPage: 1
		}
	},
	// 在生命周期 onLoad 中获取地址中的参数
	onLoad(params) {
		// console.log(params)
		this.query = params.query
		this.getGoodsList(this.query)
	},
	methods: {
		goDetail(id) {
			uni.navigateTo({
				url: '/subpkg/pages/goods/index?id=' + id
			})
		},
		async getGoodsList(query) {
			if (!this.query) return
			this.showMsg = true
			const { data: res } = await uni.$http.get('/api/public/v1/goods/search', {
				query: this.query,
				pagenum: this.nextPage++,
				pagesize: 5
			})
			// this.goodsList = res.message.goods
			// 请求后合并数组
			this.goodsList = this.goodsList.concat(res.message.goods)
			this.showMsg = false

			if (!this.goodsList.length) this.msg = '空空如也~'
		},
		getMore: debounce(function() {
			this.getGoodsList()
		}, 500)
	}
}
</script>

<style scoped lang="scss">
.filter {
	display: flex;
	height: 96rpx;
	line-height: 96rpx;
	border-bottom: 1rpx solid #ddd;

	/* #ifdef H5 */
	position: relative;
	z-index: 99;
	/* #endif */

	text {
		flex: 1;
		text-align: center;
		font-size: 30rpx;
		color: #333;

		&.active {
			color: #ea4451;
		}
	}
}

.goods {
	position: absolute;
	width: 100%;
	top: 97rpx;
	bottom: 0;
}

.item {
	display: flex;
	padding: 30rpx 20rpx 30rpx 0;
	margin-left: 20rpx;
	border-bottom: 1rpx solid #eee;

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
}
</style>
