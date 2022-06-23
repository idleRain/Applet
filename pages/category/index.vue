<template>
	<view>
		<!-- 搜索 -->
		<search />
		<!-- 分类 -->
		<view class="category">
			<!-- 顶级分类 -->
			<view class="sup">
				<scroll-view scroll-y>
					<text
						:class="{ active: index === activeIndex }"
						v-for="(item, index) in categoryList"
						:key="item.cat_id"
						@click="setActiveIndex(index)"
					>
						{{ item.cat_name }}
					</text>
				</scroll-view>
			</view>
			<!-- 子级分类 -->
			<view class="sub">
				<scroll-view scroll-y>
					<!-- 封面图 -->
					<image src="http://static.botue.com/ugo/uploads/category.png" class="thumb"></image>
					<view class="children" v-for="item in subCategoryList" :key="item.cat_id">
						<view class="title">{{ item.cat_name }}</view>
						<!-- 品牌 -->
						<view class="brands">
							<navigator url="/subpkg/pages/list/index" v-for="children in item.children" :key="children.cat_id">
								<image :src="children.cat_icon"></image>
								<text>{{ children.cat_name }}</text>
							</navigator>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
import search from '@/components/search'

export default {
	components: {
		search
	},
	data() {
		return {
			// 一级分类数据
			categoryList: [],
			// 选中的 id
			activeIndex: 0
		}
	},
	onLoad() {
		this.getCategoryList()
	},
	computed: {
		subCategoryList() {
			if (this.categoryList[this.activeIndex]) return this.categoryList[this.activeIndex].children
			return []
		}
	},
	methods: {
		// 获取分类数据
		async getCategoryList() {
			// 同步方式获取数据
			const { data: res } = await uni.$http.get('/api/public/v1/categories')
			// 校验数据
			if (res.meta.status !== 200) return uni.$showToast()
			// 更新数据，重新渲染
			this.categoryList = res.message
		},
		setActiveIndex(index) {
			this.activeIndex = index
		}
	}
}
</script>

<style scoped lang="scss">
scroll-view {
	height: 100%;
}

.category {
	display: flex;
	width: 100%;
	position: absolute;
	top: 100rpx;
	bottom: 0;

	.sup {
		width: 196rpx;
		background-color: #f4f4f4;

		text {
			display: block;
			height: 100rpx;
			text-align: center;
			line-height: 100rpx;
			font-size: 27rpx;
			color: #333;
			border-bottom: 1rpx solid #eee;

			&:last-child {
				border-bottom: none;
			}

			&.active {
				background-color: #fff;
				color: #ea4451;
				position: relative;

				&::before {
					content: '';
					display: block;
					width: 8rpx;
					height: 60rpx;
					transform: translateY(-50%);
					background-color: #ea4451;

					position: absolute;
					left: 0;
					top: 50%;
				}
			}
		}
	}

	.sub {
		flex: 1;
		padding: 20rpx 18rpx;

		.thumb {
			width: 100%;
			height: 180rpx;
		}

		.children {
			text-align: center;
			color: #333;

			.title {
				display: inline-block;
				margin: 40rpx 0 20rpx;
				font-size: 30rpx;

				&::before {
					content: '/';
					margin-right: 20rpx;
					color: #666;
				}

				&::after {
					content: '/';
					margin-left: 20rpx;
					color: #666;
				}
			}
		}

		.brands {
			display: flex;
			flex-wrap: wrap;

			navigator {
				width: 33%;
				margin-bottom: 20rpx;
			}

			image {
				width: 120rpx;
				height: 120rpx;
			}

			text {
				display: block;
				font-size: 24rpx;
			}
		}
	}
}
</style>
