import Vue from 'vue'
import Router from 'vue-router'
import Novel from '@/page/home/novel'
import Cartoon from '@/page/home/cartoon'
import Details from '@/page/info/details'
import Chapter from '@/page/info/chapter'
Vue.use(Router)


export default new Router({
	routes: [{
			path: '/',
			redirect: '/novel',
		},
		{
			path: '/novel',
			name: 'novel',
			component: Novel,
		},
		{
			path: '/cartoon',
			name: 'cartoon',
			component: Cartoon,
		},
		{
			path: '/details/:title/:id',
			name: 'details',
			component: Details,
		},
		{
			path: '/chapter/:title/:id/:index',
			name: 'chapter',
			component: Chapter,
		}
	]
})