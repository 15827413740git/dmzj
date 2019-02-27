<template>
	<div class="novel">
		
		<!--头部-->
		<Header></Header>
		<!--轮播图-->
		<swiper auto @on-index-change="onIndexChange">
			<swiper-item v-for="(item,index) in swiperData.data" :key="index">
				<img src="../../images/15507224335421.jpg" />
			</swiper-item>
			<div class="title" v-if="swiperData.data">
				<span>{{swiperData.data[swiperIndex].title}}</span>
			</div>
		</swiper>
		<!--喜好 搜索 排行选择-->
		<div class="select">
			<div class="love">
				<div class="box_img">
					<img src="../../images/love.png" />
				</div>
				<p>追小说</p>
			</div>
			<div class="search">
				<div class="box_img">
					<img src="../../images/search.png" />
				</div>

				<p>找小说</p>
			</div>
			<div class="rank">
				<div class="box_img">
					<img src="../../images/rank.png" />
				</div>
				<p>排行榜</p>
			</div>
		</div>

		<div class="list">
			<list-item :data="data" v-for="(data,index) in recommendData" :key="index" ></list-item>
		</div>

		<Footer></Footer>
	</div>
</template>

<script>
	import { recommend } from "@/service/api"
	import Header from "./Header.vue"
	import Footer from "./Footer.vue"
	import ListItem from "./listItem.vue"
	import { Swiper, SwiperItem } from 'vux'
	export default {
		name: 'app',
		components: {
			Header,
			Footer,
			Swiper,
			SwiperItem,
			ListItem,
		},
		data() {
			return {
				swiperIndex: 0,
				recommendData: [],
				swiperData: {},
			}
		},

		created() {
			recommend('novel/recommend.json').then((res) => {
				//去掉轮播图数据，方便轮循
				this.recommendData = res.data.slice(1);
				//swiper大图数据
				this.swiperData = this.recommendData[0];
			})
		},
		methods: {
			//	轮播 index 变化时触发
			onIndexChange(index) {
				this.swiperIndex = index;
			}
		},
	}
</script>

<style lang="less">
	.novel {
		padding-top: 88px;
		padding-bottom: 88px;
		.vux-slider {
			
			.vux-swiper {
				height: 398px !important;
				.vux-swiper-item {
					img {
						width: 100%;
						height: 100%;
					}
				}
				.title {
					z-index: 5;
					background: rgba(0, 144, 255, 0.8);
					width: 100%;
					position: absolute;
					bottom: -3px;
					height: 56px;
					line-height: 56px;
					color: #fff;
					span {
						padding-left: 20px;
					}
				}
			}
			.vux-indicator.vux-indicator-right {
				z-index: 10;
				.vux-icon-dot {
					width: 10px;
					height: 10px;
					border-radius: 100px;
					background: rgba(255, 255, 255, .4);
				}
				.active.vux-icon-dot {
					background: rgb(255, 255, 255);
				}
			}
		}
		.select {
			display: flex;
			justify-content: space-around;
			background-color: #ffffff;
			padding: 25px 0;
			.love,
			.search,
			.rank {
				display: block;
				width: 90px;
				.box_img {
					display: flex;
					justify-content: center;
					align-items: center;
					height: 90px;
					border-radius: 50%;
					img {
						display: block;
						height: 60px;
					}
				}
				p {
					margin-top: 5px;
					text-align: center;
				}
			}
			.love {
				.box_img {
					background-color: #ff8706;
				}
			}
			.search {
				.box_img {
					background-color: #ff5629;
				}
			}
			.rank {
				.box_img {
					background-color: #ff5629;
				}
			}
		}
	}
</style>