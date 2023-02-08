
import Layout from '@/layout';
const Notification = {
	path: '/notification',
	name: 'Notification',
	meta: {
		title: 'ROUTER.NOTIFICATION',
		icon:"fas fa-bell",
		roles:['admin','manager']
	},
	component: Layout,
	redirect: {
		name: 'NotificationList'
	},
	children: [
		{
            path: 'list',
            name: 'NotificationList',
            meta: {
                title: "ROUTER.NOTIFICATION"
            },
            component: () => import(
                '../../pages/Notification/Notification.vue'
            )
		}
	]
};

export default Notification;
