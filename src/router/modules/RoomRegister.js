
import Layout from '@/layout';
const RoomRegister = {
	path: '/register-room',
	name: 'RoomRegister',
	meta: {
		title: 'ROUTER.ROOM_REGISTER',
		icon:"fas fa-address-book",
		roles:['admin','manager']
	},
	component: Layout,
	redirect: {
		name: 'RoomRegisterList'
	},
	children: [
		{
            path: 'list',
            name: 'RoomRegisterList',
            meta: {
                title: "ROUTER.ROOM_REGISTER"
            },
            component: () => import(
                '../../pages/RoomRegister/index.vue'
            )
		}
	]
};

export default RoomRegister;
