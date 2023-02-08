<template>
	<div class="account">
		<div class="title">{{ $t('USER.TITLE') }}</div>
		<div class="account-content">
			<div class="account-management__searching">
				<div class="account-management__searching-filter">
					<label for="filer">{{ $t('USER.SEARCH_BY.ROLE') }}</label>
					<b-form-select v-model="role" @change="handleFilterRole()">
						<b-form-select-option :value="null">{{
							$t('USER.SELECT_ROLE')
						}}</b-form-select-option>
						<b-form-select-option
							v-for="role in options"
							:key="role.id"
							:value="role._id"
						>
							{{ role.role_name }}
						</b-form-select-option>
					</b-form-select>
				</div>

				<div class="account-management__searching-keyword">
					<label for="keyword">{{ $t('USER.SEARCH_BY.KEYWORD') }}</label>
					<b-input-group>
						<b-form-input
							:placeholder="$t('USER.SEARCH_BY.PLACEHOLDER_KEYWORD')"
							v-model="keySearch"
							@keyup.enter="handleSearch()"
							type="text"
						></b-form-input>
						<b-input-group-append>
							<b-button variant="primary" @click="handleSearch()"
								><i class="fas fa-search"></i
							></b-button>
						</b-input-group-append>
					</b-input-group>
				</div>
			</div>
			<div class="panel-heading">
				<p><i class="fas fa-user"></i>{{ $t('USER.TABLE.NAME') }}</p>
				<b-button variant="light" @click="handleModal()" v-b-modal.modal-xl>{{
					$t('USER.CREATE_USER')
				}}</b-button>
			</div>
			<table class="table table-bordered">
				<thead>
					<tr>
						<th scope="col" class="col-1">{{ $t('USER.TABLE.HEADING.ID') }}</th>
						<th scope="col" class="col-2">{{ $t('USER.TABLE.HEADING.NAME') }}</th>
						<th scope="col" class="col-2">{{ $t('USER.TABLE.HEADING.EMAIL') }}</th>
						<th scope="col" class="col-1">{{ $t('USER.TABLE.HEADING.ROLE') }}</th>
						<th scope="col" class="col-1">{{ $t('USER.TABLE.HEADING.AREA') }}</th>
						<th scope="col" class="col-2">{{ $t('USER.TABLE.HEADING.HOSTEL') }}</th>
						<th scope="col" class="col-1"></th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item, index) in listUser" :key="index">
						<th scope="row">{{ index + 1 }}</th>
						<td>{{ item.user_id.fullname }}</td>
						<td>{{ item.user_id.email }}</td>
						<td>{{ item.role_id.role_name }}</td>
						<td>{{ item.hostels.area_id.area_name }}</td>
						<td>{{ item.hostels.hostel_name }}</td>
						<td>
							<div class="btn btn-warning" @click="handleModal(item.user_id)">
								<i class="fas fa-edit"></i>
							</div>
							<div
								type="button"
								class="btn btn-danger"
								@click="handleDeleteUser(item.user_id)"
							>
								<i class="fa fa-trash"></i>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
			<b-modal
				id="modal-xl"
				size="xl"
				v-model="showModal"
				:title="action === 'CREATE' ? 'Create Account' : 'EDIT Account'"
				centered
			>
				<div class="modal-body">
					<div class="container-fluid">
						<div class="row">
							<div class="col col-sm-6">
								<div class="col-6 col-sm-12">
									<div>
										<label for="">{{ $t('USER.FORM.NAME_ACCOUNT') }}</label>
										<b-form-input
											type="text"
											v-model="new_account.username"
										></b-form-input>
									</div>
									<div>
										<label for="">{{ $t('USER.FORM.NAME_USER') }}</label>
										<b-form-input
											type="text"
											v-model="new_account.fullname"
										></b-form-input>
									</div>
									<div>
										<label for="">{{ $t('USER.FORM.EMAIL') }}</label>
										<b-form-input
											:readonly="action === 'EDIT' ? true : false"
											v-model="new_account.email"
										></b-form-input>
									</div>
									<div>
										<label for="">{{ $t('USER.FORM.PASSWORD') }}</label>
										<b-form-input
											type="password"
											v-model="new_account.password"
										></b-form-input>
									</div>
									<div>
										<label for="">{{ $t('USER.FORM.ROLE') }}</label>
										<b-form-select v-model="new_account.role_id">
											<b-form-select-option :value="null"
												>Select role</b-form-select-option
											>
											<b-form-select-option
												v-for="(role, index) in options"
												:key="index"
												:value="role._id"
											>
												{{ role.role_name }}
											</b-form-select-option>
										</b-form-select>
									</div>
									<div>
										<label for="">{{ $t('USER.FORM.AREA') }}</label>
										<b-form-select
											:selected="new_account.area_id"
											v-model="new_account.area_id"
											@change="getHostel(new_account.area_id)"
										>
											<b-form-select-option :value="null"
												>Select area</b-form-select-option
											>
											<b-form-select-option
												v-for="(area, index) in options_area"
												:key="index"
												:value="area._id"
											>
												{{ area.area_name }}
											</b-form-select-option>
										</b-form-select>
									</div>
									<div>
										<label for="">{{ $t('USER.FORM.HOSTEL') }}</label>
										<b-form-select
											:selected="new_account.hostel_id"
											v-model="new_account.hostel_id"
										>
											<b-form-select-option :value="null"
												>Select hostel</b-form-select-option
											>
											<b-form-select-option
												v-for="(hostel, index) in options_hostel"
												:key="index"
												:value="hostel._id"
											>
												{{ hostel.hostel_name }}
											</b-form-select-option>
										</b-form-select>
									</div>
								</div>
							</div>
							<div class="col col-sm-6">
								<div class="col-6 col-sm-12">
									<div>
										<label for="">{{ $t('USER.FORM.CARD') }}</label>
										<b-form-input
											type="text"
											v-model="new_account.id_card_number"
										></b-form-input>
									</div>
									<div>
										<label for="">{{ $t('USER.FORM.DOB') }}</label>
										<b-form-input
											type="date"
											v-model="new_account.date_of_birth"
										></b-form-input>
									</div>
									<div>
										<label for="">{{ $t('USER.FORM.PHONE') }}</label>
										<b-form-input
											v-model="new_account.telephone"
										></b-form-input>
									</div>
									<div>
										<label for="">{{ $t('USER.FORM.GENDER') }}</label>
										<b-form-select v-model="new_account.gender">
											<b-form-select-option :value="null"
												>Chọn giới tính</b-form-select-option
											>
											<b-form-select-option
												v-model="new_account.gender"
												:value="0"
											>
												Male
											</b-form-select-option>
											<b-form-select-option
												v-model="new_account.gender"
												:value="1"
											>
												Female
											</b-form-select-option>
										</b-form-select>
									</div>
									<div>
										<label for="">{{ $t('USER.FORM.HOMETOWN') }}</label>
										<b-form-input v-model="new_account.hometown"></b-form-input>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<template #modal-footer>
					<div>
						<b-button
							class="btn btn-primary"
							v-if="action === 'CREATE'"
							@click="handleCreateUser()"
						>
							Tạo
						</b-button>

						<b-button
							class="btn btn-primary"
							v-if="action === 'EDIT'"
							@click="handleEditUser()"
						>
							Lưu
						</b-button>

						<b-button class="btn btn-danger" @click="showModal = false">
							Đóng
						</b-button>
					</div>
				</template>
			</b-modal>
		</div>
	</div>
</template>

<script>
	import { isEmptyOrWhiteSpace } from '../../utils/validate';
	import { getUserTable, postUser, deleteUser, getOneUser, editUser } from '@/api/modules/user';
	import { MakeToast } from '@/toast/toastMessage';
	import { getListRole } from '@/api/modules/role';
	import { getHostelTable, getOneHostel } from '@/api/modules/hostel';
	import { getAreaTable } from '@/api/modules/area';
	export default {
		name: 'ManageAccount',
		data() {
			return {
				keySearch: '',
				listUser: [],
				selected: null,
				role: null,
				hostel_name: '',
				new_account: {
					username: '',
					fullname: '',
					email: '',
					password: '',
					role_id: null,
					area_id: null,
					hostel_id: null,
					id_card_number: '',
					date_of_birth: '',
					telephone: '',
					hometown: '',
					gender: ''
				},
				isLoading: false,
				roles: [],
				options: [],
				options_area: [],
				options_hostel: [],
				action: '',
				showModal: false,
				ids: 0
			};
		},
		created() {
			this.handleGetListUser();
			this.getRole();
			this.getArea();
		},
		methods: {
			async handleModal(id) {
				this.ids = id;
				if (this.ids) {
					const id = { id: this.ids._id };
					console.log(id);
					await getOneUser(id)
						.then(res => {
							this.new_account.username = res.data.dataUser.username;
							this.new_account.fullname = res.data.dataUser.fullname;
							this.new_account.email = res.data.dataUser.email;
							this.new_account.role_id = res.data['0'].role_id._id;
							this.new_account.hostel_id = res.data.dataUser.hostel_id._id;
							this.new_account.area_id = res.data.dataUser.hostel_id.area_id;
							(this.new_account.id_card_number = res.data.dataUser.id_card_number),
								(this.new_account.date_of_birth = res.data.dataUser.date_of_birth),
								(this.new_account.telephone = res.data.dataUser.telephone),
								(this.new_account.hometown = res.data.dataUser.hometown),
								(this.new_account.gender = res.data.dataUser.gender);
						})
						.catch(err => {
							console.log(err);
						});
					this.action = 'EDIT';
				} else {
					this.isResetDataModal();
					this.action = 'CREATE';
					console.log('CREATE');
				}
				this.showModal = true;
			},
			async getRole() {
				await getListRole()
					.then(res => {
						this.options = res.data;
					})
					.catch(err => {
						console.log(err);
					});
			},
			async getHostel(id) {
				console.log(this.options_area._id);
				await getHostelTable({ area_id: id })
					.then(res => {
						this.options_hostel = res.data;
					})
					.catch(err => {
						console.log(err);
					});
			},
			async getArea() {
				await getAreaTable()
					.then(res => {
						this.options_area = res.data;
					})
					.catch(err => {
						console.log(err);
					});
			},
			async handleGetListUser() {
				this.isLoading = true;
				await getUserTable({ fullname: this.keySearch, role: this.role })
					.then(res => {
						this.listUser = res.data;
						console.log(this.listUser);
						this.isLoading = false;
					})
					.catch(err => {
						console.log(err);
					});
			},
			handleSearch() {
				this.handleGetListUser();
			},

			handleFilterRole() {
				this.handleGetListUser();
			},
			async handleCreateUser() {
				const data = {
					username: this.new_account.username,
					fullname: this.new_account.fullname,
					email: this.new_account.email,
					password: this.new_account.password,
					role_id: this.new_account.role_id,
					hostel_id: this.new_account.hostel_id,
					area_id: this.new_account.area_id,
					id_card_number: this.new_account.id_card_number,
					date_of_birth: this.new_account.date_of_birth,
					telephone: this.new_account.telephone,
					hometown: this.new_account.hometown,
					gender: this.new_account.gender
				};
				console.log(data);
				if (
					isEmptyOrWhiteSpace(data.username) ||
					isEmptyOrWhiteSpace(data.email) ||
					isEmptyOrWhiteSpace(data.password) ||
					isEmptyOrWhiteSpace(data.fullname) ||
					isEmptyOrWhiteSpace(data.id_card_number) ||
					isEmptyOrWhiteSpace(data.date_of_birth) ||
					isEmptyOrWhiteSpace(data.telephone) ||
					isEmptyOrWhiteSpace(data.hometown) ||
					// isEmptyOrWhiteSpace(data.gender) ||
					this.new_account.role_id === null ||
					this.new_account.area_id === null ||
					this.new_account.hostel_id === null
				) {
					MakeToast({
						variant: 'warning',
						title: 'Warning',
						content: this.$t('USER.FORM.MESSAGE.SPACE')
					});
				} else {
					await postUser(data)
						.then(res => {
							MakeToast({
								variant: 'success',
								title: this.$t('TOAST.SUCCESS'),
								content: this.$t('USER.FORM.SUCCESS')
							});
							this.handleGetListUser();
							this.showModal = false;
							this.isResetDataModal();
						})
						.catch(err => {
							console.log(err);
						});
				}
			},
			async handleEditUser() {
				this.action = 'EDIT';
				const data = {
					user_id: this.ids,
					username: this.new_account.username,
					fullname: this.new_account.fullname,
					email: this.new_account.email,
					password: this.new_account.password,
					role_id: this.new_account.role_id,
					hostel_id: this.new_account.hostel_id,
					id_card_number: this.new_account.id_card_number,
					date_of_birth: this.new_account.date_of_birth,
					area_id: this.new_account.area_id,
					telephone: this.new_account.telephone,
					hometown: this.new_account.hometown,
					gender: this.new_account.gender
				};
				if (
					isEmptyOrWhiteSpace(data.fullname) ||
					isEmptyOrWhiteSpace(data.username) ||
					isEmptyOrWhiteSpace(data.email) ||
					// isEmptyOrWhiteSpace(data.telephone) ||
					// isEmptyOrWhiteSpace(data.id_card_number) ||
					// isEmptyOrWhiteSpace(data.hometown) ||
					// isEmptyOrWhiteSpace(data.gender) ||
					this.new_account.hostel_id === null ||
					this.new_account.role_id === null ||
					this.new_account.area_id === null
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
							this.handleGetListUser();
							this.showModal = false;
							this.isResetDataModal();
						})
						.catch(err => {
							console.log(err);
						});
				}
			},
			handleDeleteUser(id) {
				this.$bvModal
					.msgBoxConfirm('Do you want to delete this user?', {
						title: 'Warning',
						size: 'sm',
						buttonSize: 'sm',
						okVariant: 'danger',
						okTitle: 'OK',
						cancelTitle: 'Cancel',
						footerClass: 'p-2',
						hideHeaderClose: false,
						centered: true
					})
					.then(value => {
						if (value === true) {
							deleteUser({ user_id: id })
								.then(res => {
									MakeToast({
										variant: 'success',
										title: this.$t('TOAST.SUCCESS'),
										content: 'Successfully to delete this user'
									});
									this.handleGetListUser();

									console.log(res);
								})
								.catch(err => {
									console.log(err);
									MakeToast({
										variant: 'warning',
										title: this.$t('TOAST.WARNING'),
										content: 'You can not delete this user'
									});
								});
						}
					});
			},
			isResetDataModal() {
				console.log('RESET DATA');
				this.new_account = {
					username: '',
					fullname: '',
					email: '',
					password: '',
					role_id: null,
					area: null,
					hostel_id: null,
					id_card_number: '',
					date_of_birth: '',
					telephone: '',
					hometown: '',
					gender: ''
				};
			}
		}
	};
</script>

<style scoped>
	.account .title {
		z-index: 1;
		position: fixed;
		width: 100%;
		top: 50px;
		background: #557b83;
		height: 40px;
		line-height: 40px;
		color: white;
		padding-left: 20px;
	}
	.account-management__searching {
		display: flex;
		margin-bottom: 20px;
	}
	.account-management__searching > div {
		width: 25%;
		margin-right: 40px;
		z-index: 0;
	}
	.account .account-content {
		position: relative;
		top: 80px;
		margin: 30px;
	}
	.account-content table {
		text-align: center;
		overflow-y: scroll !important;
		width: 100%;
		max-height: 500px;
	}
	.account-content table div {
		margin: 10px;
	}
	.account-content table div:nth-child(1) {
		margin-right: 5px;
		width: 40px;
	}
	.account-content .panel-heading {
		height: 40px;
		display: flex;
		background: #337ab7;
		color: white;
		align-items: center;
	}
	.account-content .panel-heading button {
		padding: 1px;
		margin-left: auto;
		margin-right: 50px;
	}
	.account-content .panel-heading p,
	.account-content .panel-heading i {
		margin: 0px 10px 0px 10px;
	}
</style>
