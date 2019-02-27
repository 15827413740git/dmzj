<template>
	<div class="footer">
		<ul class="nav">
		 <li v-for="(item,index) in footerList" @click="$router.push(item.path)">
		 	<img :src="$route.path===item.path?item.iconSrcOn:item.iconSrcOff" />
		 	<span :class="$route.path===item.path?'active':''">{{item.name}}</span>
		 </li>
		</ul>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				footerList: [{
						path: "/cartoon",
						name: "漫画",
						iconSrcOn: "src/images/cartoon_on.png",
						iconSrcOff: "src/images/cartoon_off.png",
					},
					{
						path: "/news",
						name: "新闻",
						iconSrcOn: "src/images/news_on.png",
						iconSrcOff: "src/images/news_off.png",
					},
					{
						path: "/novel",
						name: "轻小说",
						iconSrcOn: "src/images/novel_on.png",
						iconSrcOff: "src/images/novel_off.png",
					},
					{
						path: "/my",
						name: "我的",
						iconSrcOn: "src/images/my_on.png",
						iconSrcOff: "src/images/my_off.png",
					}
				]
			}
		},
	}
</script>

<style lang="less">
	.footer{
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		height: 96px;
		background: rgba(255,255,255,.9);
		border-top: 1px solid #918f8b;
		.nav{
			display: flex;
			height:100%;
			li{
				flex: 1;
				margin-top: 6px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				color: #918f8b;
				img{
					height: 42px;
				}
			}
			li>span.active{
				color: #0090ff;
				
			}
		}
	}

</style>