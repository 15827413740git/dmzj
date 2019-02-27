<template>
	<div class="cartoon">
		<!--头部-->
		<Header></Header>
		

		<Footer></Footer>
	</div>
</template>

<script>
	import Header from "./Header.vue"
	import Footer from "./Footer.vue"
	export default {
		name: 'app',
		components: {
			Header,
			Footer,
		},
		data() {
			return {}
		},

		created() {},
		methods: {}
	}
</script>

<style lang="less">
	.cartoon {
		padding-top: 88px;
		padding-bottom: 88px;
	}
</style>