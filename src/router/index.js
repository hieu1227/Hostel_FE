import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Login from './modules/login';
import errorRoute from './modules/error';
import Dashboard from './modules/dashboard';
import AccountManagement from './modules/account';
import Room from './modules/room';
import RoomRegister from './modules/RoomRegister';
import Notification from './modules/Notification';
import RoomDetail from './modules/DetailRoom';
import Customer from './modules/customer';
import Revenue from './modules/revenue';
import Area from './modules/area';
import DashboardRenter from './modules/dashboardRenter';
import Bill from './modules/bill';
import Report from './modules/report';
import Place from './modules/place';
import Profile from './modules/profile';

export const constantRoutes = [
	Login,
	{
		path: '/',
		// redirect: { name: 'Dashboard' },
		hidden: true
	}
];

export const asyncRoutes = [
	Dashboard,
	AccountManagement,
	Area,
	Place,
	Room,
	RoomRegister,
	Customer,
	Revenue,
	Notification,
	errorRoute,
	RoomDetail,
	DashboardRenter,
	Bill,
	Report,
	Profile,
	{
		path: '*',
		hidden: true,
		redirect: { name: 'PageNotFound' }
	}
];

const createRouter = () =>
	new VueRouter({
		scrollBehavior: () => ({ y: 0 }),
		routes: constantRoutes
	});

const router = createRouter();

export function resetRouter() {
	const newRouter = createRouter();
	router.matcher = newRouter.matcher;
}

export default router;
