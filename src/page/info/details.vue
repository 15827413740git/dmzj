<template>
	<div class="info">
		<Loading v-if="isLoading" />
		<!--详情页头部-->
		<div class="subHeader" @mousemove.prevent @touchmove.prevent>
			<div class="BarTit" id="comicName">{{$route.params.title}}</div>
			<div class="back" @click="goBack()">
				<a class="iconRet"></a>
			</div>

			<a class="iconHome"></a>
		</div>
		<!--小说详情-->
		<div class="Introduct_Sub autoHeight">
			<div class="pic" id="Cover">
				<img :src="detailsData.cover" width="100%" :title="detailsData.name">
			</div>
			<div class="sub_r">
				<p class="txtItme">
					<span class="icon icon01"></span>
					<a class="pd introName">{{detailsData.authors}}</a>
					<!--<a class="pd introName" href="/tags/one.html">ONE</a>-->
				</p>
				<p class="txtItme">
					<span class="icon icon02"></span>
					<a class="pd" v-for="(item,index) in detailsData.types">{{item}}</a>
				</p>
				<p class="txtItme">
					<span class="icon icon02"></span>
					<a class="pd">{{'点击 '+detailsData.hot_hits}}</a>
				</p>
				<p class="txtItme">
					<span class="icon icon02"></span>
					<a class="pd">{{'订阅 '+detailsData.subscribe_num}}</a>
				</p>
				<!--<p class="txtItme">
					<span class="icon icon02"></span>
					<a class="pd" href="/tags/shaonian.html">少年漫画</a>
					<a class="pd" href="/tags/riben.html">日本</a>
					<a class="pd" href="/tags/lianzaizhong.html">连载中</a>
				</p>-->
				<p class="txtItme">
					<span class="icon icon03"></span>
					<span class="date">{{getLocalTime(detailsData.last_update_time) + ' ' +detailsData.status}}</span>
				</p>

				<a class="Btn fl" id="Subscribe" @click="addSubscribe(9949)">订阅漫画</a>
				<a class="Btn right" id="continusRead">开始观看</a>
			</div>
		</div>
		<!--小说简介-->
		<p class="txtDesc autoHeight" @click="isOpen=!isOpen" :style="{height:isOpen?'auto':'50px'}">简介: {{detailsData.introduction}}
			<span class="hidden" v-if="!isOpen">...</span>
		</p>
		<p :class="isOpen?'openBtn openBtnC':'openBtn'" @click="isOpen=!isOpen"></p>

		<ul class="subNav">
			<li>
				<a @click="openApp()"><span class="a1">客户端观看</span></a>
			</li>
			<li>
				<a href="#comm"><span class="a2">评论</span></a>
			</li>
			<li class="last">
				<a href="/related/16669.html">
					<span class="a3">相关作品</span>
				</a>
			</li>
		</ul>
		<!--最新章节-->
		<div class="newest">
			<span>最新章节</span>
			<a class="title">
				{{detailsData.last_update_volume_name+' '+detailsData.last_update_chapter_name}}
			</a>
		</div>

		<!--章节列表-->
		<div class="chapter-list">
			<div class="top">
				<span>全部章节</span>
				<div class="sort">
					<p class="SeqT">排序：</p>
					<a class="Seq asc" :class="sortType=='asc'?'cur':''" @click="sort('asc')"></a>
					<a class="Seq desc" :class="sortType=='desc'?'cur':''" @click="sort('desc')"></a>
				</div>
			</div>
			<div class="line"></div>
			<div class="list">
				<ul class="Drama autoHeight">
					<li v-for="(item,index) in detailsData.volume"  @click="goChapterDetails(index)">
						<a><span>{{item.volume_name}}</span></a>
					</li>
				</ul>
			</div>

		</div>
	</div>
</template>

<script>
	import { novelDetails } from "@/service/api"
	import {mapMutations} from "vuex"
	import Loading from "@/components/loading.vue"
	export default {
		data() {
			return {
				isLoading:true,//loading动画 
				isOpen: false, //是否展开介绍
				detailsData: {},
				sortType: 'asc',
			}
		},
		created() {
            this.getNovelDetails()
		},
		components:{
			Loading
		},
		methods: {
			//获取小说详情介绍与章节列表
			getNovelDetails() {
				novelDetails(`novel/${this.$route.params.id}.json`).then((res) => {
					this.detailsData = res.data;
					this.isLoading = false;
				}).catch(error=>{　　
                       this.getNovelDetails()
				});
			},
			//返回
			goBack() {
				this.$router.push("/novel")
			},
			getLocalTime(nS) {
				return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
			},
			//章节排序
			sort(type) {
				if(this.sortType == type) return
				this.sortType = type
				this.detailsData.volume.reverse()
			},
			//跳转到章节详情
			goChapterDetails(index){
				this.$router.push(`/chapter/${this.$route.params.title}/${this.$route.params.id}/${index}`)
			}

		}
	}
</script>

<style lang="less">
	.info {
		.subHeader {
			position: fixed;
			width: 100%;
			height: 88px;
			top: 0;
			left: 0;
			overflow: hidden;
			background: url(../../images/head_line.gif) no-repeat bottom;
			background-size: 100% 5px;
			background-color: #fff;
			display: flex;
			z-index: 100;
			justify-content: space-between;
			align-items: center;
			.BarTit {
				text-align: center;
				display: block;
				color: #343434;
				height: 100%;
				font-size: 32px;
				line-height: 88px;
				text-align: center;
				width: 56%;
				overflow: hidden;
				left: 22%;
				position: absolute;
			}
			.back {
				width: 88px;
				height: 88px;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				.iconRet {
					width: 18px;
					height: 34px;
					display: block;
					background: url(../../images/bg_icon_ret.png);
					background-size: 100% 100%;
					margin-left: 30px;
				}
			}
			.iconHome {
				width: 36px;
				height: 36px;
				display: block;
				background: url(../../images/toHome.png);
				background-size: 100% 100%;
				margin-right: 30px;
			}
		}
		.Introduct_Sub {
			margin-top: 88px;
			background: url(../../images/int_bg.png);
			background-size: 100% 100%;
			.pic {
				height: 274px;
				width: 204px;
				overflow: hidden;
				float: left;
				margin: 40px 30px;
				border: 2px solid #fff;
				border-radius: 4px;
			}
			img {
				border-radius: 1px;
				width: 204px;
				height: 274px;
			}
			.sub_r {
				min-width: 374px;
				float: left;
				margin-top: 32px;
				height: 288px;
				position: relative;
				.txtItme {
					height: 30px;
					line-height: 30px;
					font-size: 26px;
					color: #fff;
					margin: 10px 0;
					.icon {
						display: block;
						width: 30px;
						height: 30px;
						float: left;
						display: block;
						margin-right: 10px;
					}
					.icon.icon01 {
						background: url(../../images/bg_icon_04.png);
						background-size: 100%;
					}
					.icon.icon02 {
						background: url(../../images/bg_icon_05.png);
						background-size: 100%;
					}
					.icon.icon03 {
						background: url(../../images/bg_icon_06.png);
						background-size: 100%;
					}
					.pd {
						padding-right: 10px;
					}
					.date {
						background: rgba(255, 255, 255, 0.3);
						padding: 0px 30px 4px;
						border-radius: 100px;
						color: #fff;
					}
					a {
						color: #fff;
					}
				}
				.right {
					left: 180px;
				}
				.Btn {
					position: absolute;
					border-radius: 4px;
					bottom: 0;
					width: 150px;
					height: 58px;
					line-height: 58px;
					border: 2px solid #fff;
					text-align: center;
					color: #fff;
					font-size: 26px;
				}
				.Btn.fl {
					left: 0;
				}
			}
		}
		.autoHeight {
			height: auto;
			min-height: 0px;
		}
		.autoHeight:after {
			display: block;
			clear: both;
			content: ".";
			visibility: hidden;
			height: 0;
		}
		.txtDesc {
			position: relative;
			background: #fff;
			padding: 20px 20px 10px;
			line-height: 50px;
			font-size: 28px;
			color: #000;
			opacity: .8;
			overflow: hidden;
			text-overflow: ellipsis;
			.hidden {
				background: #FFFFFF;
				display: block;
				position: absolute;
				top: 60px;
				right: 10px;
			}
		}
		.openBtn {
			background: url(../../images/icon_unfold.png) no-repeat center;
			background-size: 34px 18px;
			border-bottom: 2px solid #dcdcde;
			background-color: #fff;
			width: 100%;
			height: 50px;
		}
		.openBtnC {
			background: url(../../images/icon_coll.png) no-repeat center;
			background-color: #fff;
			background-size: 34px 18px;
		}
		.subNav {
			background: #fff;
			border-bottom: 2px solid #dcdcde;
			height: 86px;
			li {
				text-align: center;
				height: 86px;
				line-height: 86px;
				font-size: 24px;
				border-right: 2px solid #dcdcde;
				width: 33%;
				float: left;
				a {
					width: 100%;
					height: 43px;
					display: block;
				}
				span {
					text-align: center;
					padding: 0 0 0 40px;
					color: #299af4;
				}
				.a1 {
					background: url(../../images/icon_01.png) no-repeat left;
					background-size: 30px 20px;
				}
				.a2 {
					background: url(../../images/icon_02.png) no-repeat left;
					background-size: 22px 28px;
				}
				.a3 {
					background: url(../../images/icon_03.png) no-repeat left;
					background-size: 22px 28px;
				}
			}
		}
		.newest {
			height: 88px;
			background: #FFFFFF;
			margin: 18px 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 10px;
			span {
				font-size: 32px;
			}
			a {
				display: block;
				max-width: 350px;
				padding-right: 26px;
				background: url(../../images/right_arrow.png) no-repeat right;
				background-size: 24px 24px;
				color: #299af4;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
		.chapter-list {
			margin-top: 18px;
			.top {
				height: 88px;
				background: #FFFFFF;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 10px;
				span {
					padding-left: 54px;
					background: url(../../images/icon_h2_10.png) no-repeat left;
					background-size: 46px 46px;
					font-size: 32px;
				}
				.sort {
					display: flex;
					.Seq {
						display: block;
						background-image: url(../../images/btn_Seq.png);
						background-size: 90px auto;
						width: 90px;
						height: 44px;
						float: right;
						margin: 0px 20px 0 0;
					}
					.Seq.desc.cur {
						background-position: left bottom;
					}
					.Seq.asc.cur {
						background-position: left -44px;
					}
					.Seq.desc {
						background-position: left -88px;
						background-size: 90px auto;
						margin-right: 0;
					}
					.Seq.asc {
						background-position: left top;
						background-size: 90px auto;
					}
				}
			}
			.line {
				width: calc(100%-2px);
				height: 2px;
				background: #DCDCDE;
				margin: 0 auto;
			}
			.list {
				.Drama {
					background: #fff;
					margin-bottom: 12px;
					padding: 10px;
					display: flex;
					flex-wrap: wrap;
					li {
						background: url(../../images/chapter.png) no-repeat left;
						background-size: 32px 30px;
						box-sizing: border-box;
						padding-left: 36px;
						width: 50%;
						height: 66px;
						text-align: left;
						line-height: 66px;
						font-size: 30px;
						border-radius: 4px;
						position: relative;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
			}
		}
	}
</style>