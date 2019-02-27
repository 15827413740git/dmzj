<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
	import { mapState,mapMutations} from "vuex"
	export default {
		name: 'app',
		computed: {
		},
		created() {
		},
		components: {
		},
		methods:{
		},
		watch:{
		}
	}
</script>

<style lang="less">
	@import '~vux/src/styles/reset.less';
	body {
		background-color: #fbf9fe;
	}
</style>