import { getUser } from '@/api/modules/auth';
import { removeToken } from '@/utils/auth';
import { resetRouter } from '@/router';
import Cookies from 'js-cookie';
import ConstCookie from '@/const/cookie';

const state = {};

const mutations = {};

const actions = {
	doLogout({}) {
		removeToken();
		resetRouter();
	},
	resetToken({ commit }) {
		return new Promise(resolve => {
			commit('SET_ROLES', []);
			removeToken();
			resolve();
		});
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	actions
};
