import Layout from '@/layout';

const AccountManagement = {
	path: '/account-management',
	name: 'AccountManagement',
	meta: {
		title: 'ROUTER.ACCOUNT_MANAGEMENT',
		icon:'fas fa-cog',
		roles:['admin']
	},
	component: Layout,
	redirect: {
		name: 'AccountManagementList'
	},
	children: [
		{
			path: 'list',
			name: 'AccountManagementList',
			meta: {
				title: 'ROUTER.ACCOUNT_MANAGEMENT'
			},
			component: () =>
				import(
					'@/pages/ManageAccount/index'
				)
		}
	]
};

export default AccountManagement;
