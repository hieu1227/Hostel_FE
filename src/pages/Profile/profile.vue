<template>
	<div>
		<div class="title">
			<p>Profile</p>
		</div>
		<div class="zone-profile">
			<b-row>
				<b-col>
					<div class="card">
						<div class="card-body zone--edit-info">
							<div>
								<b-form-group
									label-cols="3"
									label-cols-lg="2"
									label-size="md"
									style="font-weight: 600"
									label="Full Name :"
								>
									<b-form-input
										id="input-exp_detail"
										type="text"
										v-model="list.dataUser.fullname"
									/>
								</b-form-group>

								<b-form-group
									label-cols="3"
									label-cols-lg="2"
									label-size="md"
									style="font-weight: 600"
									label="User Name :"
								>
									<b-form-input
										id="input-exp_detail"
										type="text"
										v-model="list.dataUser.username"
									/>
								</b-form-group>

								<b-form-group
									label-cols="3"
									label-cols-lg="2"
									label-size="md"
									style="font-weight: 600"
									label="Email :"
									disabled
								>
									<b-form-input v-model="list.dataUser.email" />
								</b-form-group>

								<b-form-group
									label-cols="3"
									label-cols-lg="2"
									label-size="md"
									style="font-weight: 600"
									label="New password :"
								>
									<b-form-input id="input-toeic_grade" type="password" v-model="InformationUser.password"/>
								</b-form-group>

								<!-- <b-form-group
									label-cols="3"
									label-cols-lg="2"
									label-size="md"
									style="font-weight: 600"
									label="Confirm new password :"
								>
									<b-form-input id="input-toeic_grade" type="password" />
								</b-form-group> -->

								<b-form-group
									label-cols="3"
									label-cols-lg="2"
									label-size="md"
									style="font-weight: 600"
									label="Telephone :"
								>
									<b-form-input
										id="input-toeic_grade"
										type="number"
										v-model="list.dataUser.telephone"
									/>
								</b-form-group>
							</div>

							<div class="zone-button-submit">
								<b-button @click="handleEditInfor()"> Submit </b-button>
							</div>
						</div>
					</div>
				</b-col>
			</b-row>
		</div>
	</div>
</template>

<script>
	import { editUser, getOneUser } from '@/api/modules/user';
	import { getToken } from '../../const/cookie';
	import { MakeToast } from '@/toast/toastMessage';
	import { isEmptyOrWhiteSpace } from '../../utils/validate';
	export default {
		name: 'profile',
		data() {
			return {
				list: [],
				InformationUser:{
					username: '',
					fullname: '',
					email: '',
					password: '',
					telephone: '',
				}
			};
		},
		computed: {
			user_id() {
				const user_id = getToken('_id');
				return user_id;
			}
		},
		created() {
			this.getUser();
		},
		methods: {
			getUser() {
				console.log(this.user_id);
				getOneUser({ id: this.user_id })
					.then(res => {
						this.list = res.data;
						console.log(this.list);
					})
					.catch(err => {
						console.log(err);
					});
			},
			async handleEditInfor(){
				const data = {
					user_id: this.user_id,
					username: this.list.dataUser.username,
					fullname: this.list.dataUser.fullname,
					email: this.list.dataUser.email,
					password: this.InformationUser.password,
					telephone: this.list.dataUser.telephone,
				};
				if (
					isEmptyOrWhiteSpace(data.fullname) ||
					isEmptyOrWhiteSpace(data.username) ||
					isEmptyOrWhiteSpace(data.email) ||
					isEmptyOrWhiteSpace(data.telephone) 
				) {
					MakeToast({
						variant: 'warning',
						title: 'Warning',
						content: this.$t('MANAGER.FORM.MESSAGE.SPACE')
					});
				} else {
					console.log(data);
					await editUser(data)
						.then(res => {
							MakeToast({
								variant: 'success',
								title: this.$t('TOAST.SUCCESS'),
								content: this.$t('USER.FORM.SUCCESS')
							});
							this.showModal = false;
							this.isResetDataModal()
						})
						.catch(err => {
							console.log(err);
						});
				}
			},
			isResetDataModal() {
				console.log('RESET DATA');
				this.InformationUser = {
					password: '',
				};
			},
		}
	};
</script>

<style scoped>
	.title {
		position: fixed;
		width: 100%;
		top: 50px;
		background: #557b83;
		height: 40px;
		line-height: 40px;
		color: white;
		font-weight: 500;
		padding-left: 20px;
		z-index: 1;
	}
	.card {
		margin: 120px 300px 0px 50px;
	}
	.zone-button-submit {
		text-align: center;
	}
</style>
