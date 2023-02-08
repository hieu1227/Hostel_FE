import Layout from '@/layout';

const Dashboard = {
	path: '/dashboard-renter',
	name: 'DashboardRenter',
	meta: {
		title: 'ROUTER.DASHBOARD',
		icon: 'fas fa-tachometer-alt',
		roles: ['customer']
	},
	component: Layout,
	redirect: {
		name: 'DashboardRenterIndex'
	},
	children: [
		{
			path: 'index',
			name: 'DashboardRenterIndex',
			meta: {
				title: 'ROUTER.DASHBOARD'
			},
			component: () => import('../../pages/Dashboard/DashboardRenter/index.vue')
		}
	]
};

export default Dashboard;
