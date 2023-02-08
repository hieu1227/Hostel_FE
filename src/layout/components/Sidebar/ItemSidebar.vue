<template>
	<div>
		<li v-for="(item, index) in routes" :key="`router-${index}`">
			<router-link :to="item['path']">
				<i :class="item['meta']['icon']" />
				{{ $t(item['meta']['title']) }}
			</router-link>
		</li>
	</div>
</template>

<script>
	import { MakeToast } from '@/toast/toastMessage';
	export default {
		name: 'Navbar',
		computed: {
			routes() {
				return this.$store.getters.permissionRoutes.filter(item => item.hidden !== true);
			},
			// name() {
			// 	return this.$store.getters.name;
			// },
			isRouteChange() {
				return this.$route.meta.title;
			}
		},
		methods: {
			doLogout() {
				this.$store
					.dispatch('auth/doLogout')
					.then(() => {
						this.$router.push('/login');

						MakeToast({
							variant: 'success',
							title: this.$t('TOAST.SUCCESS'),
							content: this.$t('LOGOUT.LOGOUT_SUCCESS')
						});
					})
					.catch(() => {
						MakeToast({
							variant: 'danger',
							title: this.$t('TOAST.DANGER'),
							content: this.$t('LOGOUT.LOGOUT_ERROR')
						});
					});
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import '@/scss/_variables';
	ul {
		align-items: center;
	}
	li {
		padding: 10px 20px;
		a {
			color: $white !important;
			text-decoration: none;
			i {
				width: 16px;
				margin: 0px 20px 0px 15px;
			}
		}

		a.nav-link {
			&:hover {
				color: $white !important;
				background-color: $astronaut !important;
			}
		}

		.router-link-active {
			color: yellow !important;
		}
	}

	.bg-info {
		background-color: $astronaut !important;
	}
</style>
