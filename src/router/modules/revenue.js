import Layout from '@/layout';
const Revenue = {
	path: '/revenue',
	name: 'Revenue',
	meta: {
		title: 'ROUTER.REVENUE',
		icon:"fas fa-dollar-sign",
		roles:['admin']
	},
	component: Layout,
	redirect: {
		name: 'RevenueList'
	},
	children: [
		{
            path: 'list',
            name: 'RevenueList',
            meta: {
                title: "ROUTER.REVENUE"
            },
            component: () => import(
                '../../pages/Revenue/index.vue'
            )
		}
	]
};

export default Revenue;