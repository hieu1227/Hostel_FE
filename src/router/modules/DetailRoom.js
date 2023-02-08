
import Layout from '@/layout';
const RoomDetail = {
	path: '/detail-room',
	name: 'RoomDetail',
  	meta: {
		roles: ['admin','manager']
	},
	component: Layout,
	redirect: {
		name: 'RoomDetailIndex'
	},
	children: [
		{
            path: 'list/:roomid',
            name: 'RoomDetailIndex',
            component: () => import(
                '../../pages/Detail/detailRoom.vue'
            )
		}
	]
};

export default RoomDetail;

