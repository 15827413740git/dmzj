<template>
	<div class="list-item">
		<div class="top">
			<p>
				<a></a>
				<span>{{data.title}}</span>
			</p>
			<a v-if="data.category_id === 58" class="right_arrow"></a>
		</div>
		<div class="conent">
			<ul>
				<li v-for="(item,index) in data.data" @click="detailsView(item)">
					<img :src="item.cover" />
					<p>{{item.title}}</p>
					<!--有些栏目不展示作者名-->
					<p v-if="item.sub_title">{{item.sub_title}}</p>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		props: ["data"],
		methods:{
			//进入详情页面
			detailsView(item){
				this.$router.push(`/details/${item.title}/${item.obj_id}`)
			}
		}
	}
</script>

<style lang="less">
	.list-item {
		margin-top: 20px;
		padding: 15px 16px 30px 16px;
		background: #ffffff;
		/*height: 470px;*/
		.top {
			display: flex;
			justify-content: space-between;
			align-items: center;
			p {
				display: flex;
				font-size: 30px;
				a {
					width: 46px;
					height: 46px;
					display: block;
					background-image: url(../../images/icon_h2_10.png);
					background-size: 100% 100%;
					margin-right: 20px;
				}
			}
			.right_arrow {
				display: block;
				width: 24px;
				height: 24px;
				background: url(../../images/right_arrow.png);
				background-size: 100% 100%;
			}
		}
		.conent {
			ul {
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				li {
					margin-top: 30px;
					width: 226px;
					/*height: 348px;*/
					img {
						width: 100%;
						height: 318px;
						border-radius: 10px;
					}
					p {
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
			}
		}
	}
</style>