import Layout from '@/layout';
const customer = {
	path: '/manage-customer',
	name: 'CustomerManagement',
	meta: {
		title: 'ROUTER.CUSTOMER',
		icon: 'fas fa-users',
		roles: ['admin']
	},
	component: Layout,
	redirect: {
		name: 'CustomerManagementList'
	},
	children: [
		{
			path: 'list',
			name: 'CustomerManagementList',
			meta: {
				title: 'ROUTER.CUSTOMER'
			},
			component: () => import('../../pages/Customer/customer.vue')
		}
	]
};

export default customer;
