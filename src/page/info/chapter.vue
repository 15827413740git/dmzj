<template>
	<div class="chapter" ref="chapter" @scroll="onscroll">
		<Loading v-if="isLoading" />
		<!--详情页头部-->
		<div class="subHeader" @mousemove.prevent @touchmove.prevent>
			<div class="BarTit" id="comicName">{{$route.params.title}}</div>
			<div class="back" @click="goBack()">
				<a class="iconRet"></a>
			</div>

			<a class="iconHome"></a>
		</div>
		<div class="chapter-title" ref="title" :style="{top:top+'px'}">
			<p>&nbsp;&nbsp;{{title}}&nbsp;&nbsp;</p>
		</div>
		<div :ref="'chapterItem'+index1" class="chapterItem" v-for="(item1,index1) in chapterData">
			<div class="volume_name" :class="index1==0?'hidden':''">
				<p>&nbsp;&nbsp;{{item1.volume_name}}&nbsp;&nbsp;</p>
			</div>
			<ul class="chapters">
				<li v-for="(item2,index2) in item1.chapters">{{item2.chapter_name}}</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import { chapterData } from "@/service/api"
	import Loading from "@/components/loading.vue"
	export default {
		data() {
			return {
				title:'',
				top:0,
				isLoading: true,
				chapterData: [],
				sectionAry: [0], //高度区间数组
			}
		},
		created() {
			this.getChapterDetails()
		},
		components:{
			Loading
		},
		methods: {
			//滚动事件
			onscroll() {
				let tH = this.$refs.title.offsetHeight //标题高度
				let top = event.target.scrollTop; //滚动高度
				let index = this.binarySearch(this.sectionAry, top);
				
				let endHeight = this.sectionAry[index+1];
				if(endHeight-top-tH<=0){
					this.top = endHeight-top-tH;
					this.title = this.chapterData[index].volume_name;
				}else{
					if(top == 0){
						this.title = this.chapterData[0].volume_name;
					}else{
						this.title = this.chapterData[index].volume_name;
					}
					this.top = 0
					
				}
				
				
			},
			//返回
			goBack() {
				this.$router.push(`/details/${this.$route.params.title}/${this.$route.params.id}`)
			},
			//获取章节详情
			getChapterDetails() {
				chapterData(`novel/chapter/${this.$route.params.id}.json`).then((res) => {
					this.chapterData = res.data;
					this.getSectionAry();
					
				}).catch(error => {　　
					this.getChapterDetails()
				});
			},
			//获取区间数组与章节id数组
			getSectionAry() {
				let height = 0;
				setTimeout(() => {
					this.chapterData.forEach((item, index) => {
						height += this.$refs['chapterItem' + index][0].offsetHeight
						this.sectionAry.push(height)
						
					})
					this.title = this.chapterData[0].volume_name
					this.$refs.chapter.scrollTop = this.sectionAry[this.$route.params.index]
					this.isLoading = false;
				}, 16)
			},
			//计算当前处于区间，返回id
			binarySearch(arr, findVal) {
				let index = 0;
				for(var i=0;i<arr.length-1;i++){
					if(findVal>=arr[i]&&findVal<arr[i+1]){
						index = i
						break
					}
				}
				return index
			},
		}
	}
</script>

<style lang="less">
	.chapter {
		position: relative;
		padding-top: 88px;
		width: 100%;
		height: 100vh;
		overflow: scroll;
		-webkit-overflow-scrolling: touch;
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
			z-index: 1000;
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
		}
		.chapter-title {
			position: fixed;
			margin-top: 88px;
			z-index: 100;
			width: 100%;
			top: 0;
			height: 1rem;
			/*padding-left: 16px;*/
			line-height: 1rem;
			font-size: 30px;
			display: flex;
			align-items: center;
			background: #f2f2f2;
		}
		.chapter-title>p {
			width: 100%;
			height: 1rem;
			padding-left: 16px;
			line-height: 1rem;
			font-size: 30px;
			display: flex;
			align-items: center;
			background: #f2f2f2;
		}
		.chapter-title>p:after,
		.chapter-title>p:before {
			content: '';
			margin: 14px 0;
			display: table;
			width: 10px;
			height: 10px;
			border-radius: 50%;
		}
		.chapter-title>p:after,
		.chapter-title>p:before {
			background: #000;
		}
		.chapterItem {
			position: relative;
			background: #FFFFFF;
			overflow: hidden;
			.hidden{
				opacity: 0;
			}
			.volume_name {
				width: 100%;
			}
			.volume_name>p {
				width: 100%;
				height: 1rem;
				padding-left: 16px;
				line-height: 1rem;
				font-size: 30px;
				display: flex;
				align-items: center;
				background: #f2f2f2;
			}
			.volume_name>p:after,
			.volume_name>p:before {
				content: '';
				margin: 14px 0;
				display: table;
				width: 10px;
				height: 10px;
				border-radius: 50%;
			}
			.volume_name>p:after,
			.volume_name>p:before {
				background: #000;
			}
			.chapters>li {
				width: 100%;
				height: 1rem;
				font-size: 26px;
				margin-left: 20px;
				line-height: 1rem;
				border-bottom: 2px dashed #f2f2f2;
				box-sizing: border-box;
			}
			.chapters>li.isMargin:first-child {
				margin-top: 1rem;
			}
			.chapters>li:last-child {
				border-bottom: none
			}
		}
	}
</style>