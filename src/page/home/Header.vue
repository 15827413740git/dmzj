<template>
	<div class="header">
		<span class="center">轻小说</span>
		<a title="" class="icon serch"></a>
	</div>
</template>

<script>
</script>

<style lang="less">
	.header {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		display: flex;
		align-items: center;
		font-size: 38px;
		justify-content: center;
		color: #6c6c6c;
		height: 88px;
		background: url(../../images/head_line.gif) no-repeat bottom;
		background-size: 100% 5px;
		background-color: #fff;
		z-index: 100;
		.icon.serch {
			position: absolute;
			right: 15px;
			width: 42px;
			height: 42px;
			display: block;
			background-size: 100% 100%;
			background-image: url(../../images/bg_head_03.png);
		}
	}
</style>