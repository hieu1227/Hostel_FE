import router from '@/router';
import getPageTitle from '@/utils/getPageTitle';
import { getTokenAccess } from '../const/cookie';
import { resetRouter } from '../router';

const whiteList = ['/login'];

router.beforeEach(async (to, from, next) => {
	document.title = getPageTitle(to.meta.title);

	const TOKEN = getTokenAccess('access_token');
	if (TOKEN) {
		if (to.path === '/login') {
			next({ path: '/' });
		} else {
			next();
		}
	} else {
		resetRouter();
		if (whiteList.indexOf(to.matched[0] ? to.matched[0].path : '') !== -1) {
			next();
		} else {
			next('/login');
		}
	}
});
