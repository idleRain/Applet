<template>
	<view :style="{ height: pageHeight, overflow: 'hidden' }">
		<search @search="disableScroll" />
		<!-- 焦点图 -->
		<swiper class="banner" indicator-dots indicator-color="rgba(255, 255, 255, 0.6)" indicator-active-color="#fff">
			<swiper-item v-for="item in swiperList" :key="item.goods_id">
				<navigator :url="`/subpkg/goods/index/index?id=${item.goods_id}`" :open-type="item.open_type">
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 导航条 -->
		<view class="navs">
			<navigator
				:open-type="item.open_type || 'navigate'"
				:url="item.open_type ? `/pages/category/index` : `/subpkg/pages/list/index?query=${item.name}`"
				v-for="item in categoryList"
				:key="item.image_src"
			>
				<image :src="item.image_src"></image>
			</navigator>
		</view>
		<!-- 楼层 -->
		<view class="floors">
			<view class="floor" v-for="item in floorList" :key="item.floor_title.name">
				<view class="title"><image :src="item.floor_title.image_src"></image></view>
				<view class="items">
					<navigator
						:url="'/subpkg/pages/list/index?query=' + children.name"
						v-for="children in item.product_list"
						:key="children.name"
					>
						<image :src="children.image_src"></image>
					</navigator>
				</view>
			</view>
		</view>
		<!-- 回到顶部 -->
		<view class="goTop icon-top" @click="goTop"></view>
	</view>
</template>

<script>
import search from '@/components/search'

export default {
	data() {
		return {
			pageHeight: 'auto',
			// 列表数据
			swiperList: [],
			// 分类导航数据
			categoryList: [],
			// 楼层数据
			floorList: []
		}
	},

	components: {
		search
	},

	onLoad() {
		this.getSwiperList()
		this.getCategoryList()
		this.getFloorList()
	},

	// 用户加拉刷新时
	async onPullDownRefresh() {
		await this.getSwiperList()
		await this.getCategoryList()
		await this.getFloorList()
		// 停止下拉刷新
		uni.stopPullDownRefresh()
	},

	methods: {
		disableScroll(ev) {
			this.pageHeight = ev.pageHeight + 'px'
		},
		// 获取列表数据
		async getSwiperList() {
			const { data: res } = await uni.$http.get('/api/public/v1/home/swiperdata')
			if (res.meta.status !== 200) return uni.showToast({ title: '加载失败！', icon: 'none' })
			this.swiperList = res.message
		},
		// 获取分类导航数据
		async getCategoryList() {
			// 同步方式获取数据
			const { data: res } = await uni.$http.get('/api/public/v1/home/catitems')
			if (res.meta.status !== 200) return uni.showToast({ title: '加载失败！', icon: 'none' })
			this.categoryList = res.message
		},
		// 获取楼层数据
		async getFloorList() {
			const { data: res } = await uni.$http.get('/api/public/v1/home/floordata')
			if (res.meta.status !== 200) return uni.showToast({ title: '加载失败！', icon: 'none' })
			this.floorList = res.message
		},
		// 返回顶部
		goTop() {
			uni.pageScrollTo({
				scrollTop: 0
			})
		}
	}
}
</script>

<style scoped lang="scss">
.banner {
	width: 100%;
	height: 340rpx;

	image {
		width: 100%;
		height: 340rpx;
	}
}

.navs {
	display: flex;
	justify-content: space-between;
	padding: 30rpx 44rpx;

	image {
		width: 128rpx;
		height: 140rpx;
	}
}

.floor {
	.title {
		width: 750rpx;
		height: 60rpx;
		padding: 20rpx 0 0 8rpx;
		background-color: #f4f4f4;
	}

	.items {
		padding: 20rpx 16rpx;
		overflow: hidden;

		navigator {
			width: 193rpx;
			height: 188rpx;
			margin-left: 10rpx;
			margin-bottom: 10rpx;
			float: left;
		}

		navigator:first-child {
			width: 232rpx;
			height: 386rpx;
			margin-left: 0rpx;
		}

		navigator:nth-child(2),
		navigator:nth-child(5) {
			width: 273rpx;
		}
	}

	&:first-child {
		.items {
			navigator {
				width: 233rpx;
			}
		}
	}
}

.goTop {
	position: fixed;
	bottom: 30rpx;
	/* #ifdef H5 */
	bottom: 65px;
	/* #endif */
	right: 30rpx;

	display: flex;
	justify-content: center;
	align-items: center;
	width: 100rpx;
	height: 100rpx;
	font-size: 48rpx;
	color: #666;
	border-radius: 50%;
	background-color: rgba(255, 255, 255, 0.8);
}
</style>
