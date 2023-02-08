<template>
	<div id="navbar">
		<nav>
			<span>{{ $t('NAVBAR.AREA') }}</span>
			<input type="text" v-model="area_name" disabled />
		</nav>
		<nav>
			<span>{{ $t('NAVBAR.ADDRESS') }}</span>
			<input disabled type="text" v-model="hostel_name" />
		</nav>
		<b-navbar toggleable="lg" type="dark">
			<b-collapse id="nav-collapse" is-nav>
				<b-navbar-nav class="ml-auto">
					<b-dropdown id="dropdown-profile" block class="m-2">
						<template #button-content>
							<b-icon icon="globe" /><span> Change Language </span>
						</template>
						<b-dropdown-item href="#" @click="setLanguage('en')">
							{{ $t('NAVBAR.ENGLISH') }}
						</b-dropdown-item>
						<b-dropdown-item href="#" @click="setLanguage('vn')">
							{{ $t('NAVBAR.VIETNAMESE') }}
						</b-dropdown-item>
					</b-dropdown>

					<b-dropdown id="dropdown-profile" text="Block Level Dropdown" block class="m-2">
						<template #button-content>
							<b-icon icon="person-circle" font-scale="1.0" class="icon-user" /><span>
								{{ name }}
							</span>
						</template>
						<b-dropdown-item
							class="text"
							:disabled="routePath === '/profile'"
							@click="$router.push('/profile')"
						>
							{{ $t('NAVBAR.PROFILE') }}
						</b-dropdown-item>
						<b-dropdown-item class="text" @click="logout()">{{
							$t('NAVBAR.LOGOUT')
						}}</b-dropdown-item>
					</b-dropdown>
				</b-navbar-nav>
			</b-collapse>
		</b-navbar>
	</div>
</template>

<script>
	import { getOneUser } from '@/api/modules/user';
	import { MakeToast } from '@/toast/toastMessage';
	import { getToken } from '../../const/cookie';
	export default {
		name: 'Navbar',
		components: {},
		data() {
			return {
				title: this.$route.meta.title,
				hostel: [],
				area_name: '',
				hostel_name: ''
			};
		},
		computed: {
			routeChange() {
				return this.$route;
			},
			routePath() {
				return this.$route.path;
			},
			name() {
				const name = getToken('username');
				return name;
			},
			id() {
				const id = getToken('_id');
				return id;
			}
		},
		watch: {
			routeChange() {
				this.title = this.$route.meta.title;
			}
		},
		created() {
			this.getUser();
		},
		methods: {
			async getUser() {
				console.log(this.id, 'asdasdds');
				await getOneUser({ id: this.id })
					.then(res => {
						this.area_name = res.data.dataArea.area_name;
						this.hostel_name = res.data.dataUser.hostel_id.hostel_name;
					})
					.catch(err => {
						console.log(err);
					});
			},
			setLanguage(lang) {
				this.$store
					.dispatch('app/setLanguage', lang)
					.then(() => {
						this.$i18n.locale = lang;
						console.log(lang, 'sda');
						MakeToast({
							variant: 'success',
							title: this.$t('TOAST.SUCCESS'),
							content: this.$t('I18N.CHANGE_LANGUAGE.SUCCESS')
						});
					})
					.catch(() => {
						MakeToast({
							variant: 'danger',
							title: this.$t('TOAST.DANGER'),
							content: this.$t('I18N.CHANGE_LANGUAGE.FAILED')
						});
					});
			},
			logout() {
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

<style scoped>
	#navbar {
		background: #ececec;
		height: 50px;
		position: fixed;
		top: 0;
		width: calc(100% - 250px);
		left: 250px;
		display: flex !important;
		align-items: center;
		justify-content: flex-end;
		z-index: 999;
	}
	#navbar nav:nth-child(1) input {
		margin: 0px 10px 0px 10px;
		width: 120px;
		border-radius: 5px;
		border: none;
	}
	#navbar nav:nth-child(2) input {
		margin: 0px 10px 0px 10px;
		width: 300px;
		border-radius: 5px;
		border: none;
	}
</style>
