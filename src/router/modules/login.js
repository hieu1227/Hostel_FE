const Login = {
	path: '/login',
	name: 'Login',
	hidden: true,
	component: () => import('@/pages/Login/index.vue'),
	meta: {
		title: 'ROUTER.LOGIN',
		icon: ''
	}
};

export default Login;
