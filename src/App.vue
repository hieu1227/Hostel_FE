<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
	import { getRole, getToken } from './const/cookie';
	export default {
		name: 'App',
		mounted() {
			const ROLES = getRole('roles');
			this.$store
				.dispatch('permission/generateRoutes', { roles: ROLES, permissions: [] })
				.then(routes => {
					for (let route = 0; route < routes.length; route++) {
						this.$router.addRoute(routes[route]);
					}
				})
				.catch(err => {
					console.log(err);
				});
		}
	};
</script>
