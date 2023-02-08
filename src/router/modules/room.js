import Layout from '@/layout';
const Room = {
	path: '/manage-room',
	name: 'RoomManagement',
	meta: {
		title: 'ROUTER.ROOM_MANAGEMENT',
		icon: 'fas fa-laptop',
		roles: ['admin','manager']
	},
	component: Layout,
	redirect: {
		name: 'RoomManagementList'
	},
	children: [
		{
			path: 'list',
			name: 'RoomManagementList',
			meta: {
				title: 'ROUTER.ROOM_MANAGEMENT'
			},
			component: () => import('../../pages/ManageRoom/ManageRoom.vue')
		}
	]
};

export default Room;
