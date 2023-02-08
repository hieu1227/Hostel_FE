
import Layout from '@/layout';
const Profile = {
    path: '/profile',
	name: 'profile',
	meta: {
		
	},
    component: Layout,
	redirect: {
		name: 'ProfileIndex'
	},
	children: [
		{
            path: 'index',
            name: 'ProfileIndex',
            component: () => import(
                '../../pages/Profile/profile.vue'
            )
		}
	]
};

export default Profile;

