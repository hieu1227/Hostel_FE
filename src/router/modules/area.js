import Layout from '@/layout';
const Area = {
	path: '/manage-area',
	name: 'AreaManagement',
	meta: {
		title: 'ROUTER.AREA',
		icon:"fas fa-map-marked",
		roles:['admin']
	},
	component: Layout,
	redirect: {
		name: 'AreaManagementList'
	},
	children: [
		{
            path: 'list',
            name: 'AreaManagementList',
            meta: {
                title: "ROUTER.AREA"
            },
            component: () => import(
                '../../pages/Area/area.vue'
            )
		}
	]
};

export default Area;