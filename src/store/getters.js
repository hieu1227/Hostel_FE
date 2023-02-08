const getters = {
	// id: state => state.auth._id,
	// name: state => state.auth.fullname,
	// email: state => state.auth.email,
	// roles: state => state.auth.role_name,
	// token: state => state.auth.token,
	addRoutes: state => state.permission.addRoutes,
	permissionRoutes: state => state.permission.routes,
	language: state => state.app.language
};

export default getters;
