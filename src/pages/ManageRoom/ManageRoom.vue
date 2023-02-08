<template>
	<div id="manageRoom">
		<div class="right-content">
			<div class="title">
				<span>{{ $t('ROOM.TITLE') }}</span>
				<b-button variant="light" @click="handleModal()" v-b-modal.modal-1
					>Create Room</b-button
				>
			</div>
			<div class="rooms-content">
				<div class="zone-header-page">
					<div class="form-group">
						<input
							type="text"
							class="form-control"
							:placeholder="$t('ROOM.SEARCH.PLACEHOLDER')"
							id="product-search"
						/>
					</div>
					<div class="form-group">
						<div class="col">
							<select class="form-control" id="search-option-1">
								<option value="0">{{ $t('ROOM.SELECT_ROOM.TOTAL') }}</option>
								<option value="1">{{ $t('ROOM.SELECT_ROOM.RENTED') }}</option>
								<option value="2">{{ $t('ROOM.SELECT_ROOM.EMPTY') }}</option>
							</select>
						</div>
					</div>
					<div>
						<button><i class="fa fa-search"></i>{{ $t('ROOM.SEARCH.TITLE') }}</button>
					</div>
					<div class="upload">
						<b-button @click="isShowModalPost = !isShowModalPost"
							>Upload Invoice</b-button
						>
					</div>
				</div>
				<div class="container">
					<table class="table table-bordered">
						<thead>
							<tr>
								<th scope="col" class="col-1">{{ $t('ROOM.TABLE.NAME') }}</th>
								<th scope="col" class="col-2">{{ $t('ROOM.TABLE.PRICE') }}</th>
								<th scope="col" class="col-1">{{ $t('ROOM.TABLE.STATUS') }}</th>
								<th scope="col" class="col-4">{{
									$t('ROOM.TABLE.DESCRIPTION')
								}}</th>
								<th scope="col" class="col-1"></th>
							</tr>
						</thead>
						<tbody v-if="role === 'admin'">
							<tr v-for="(item, index) in list" :key="index">
								<td>{{ item.room_name }}</td>
								<td>{{ item.price }}</td>
								<td>
									<div class="btn btn-success" v-if="item.status">Active</div>
									<div class="btn btn-danger" v-else>Trống</div>
								</td>
								<td>{{ item.description }}</td>
								<td class="actions">
									<!-- <router-link :to="'/detail-room/list/'+item._id">231</router-link> -->
									<div class="btn btn-info" @click="handleDetailRoom(item._id)">
										<i class="fas fa-info-circle"></i>
									</div>
									<div class="btn btn-warning" @click="handleModal(item._id)">
										<i class="fa fa-edit"></i>
									</div>
									<div @click="handleDeleteRoom(item._id)" class="btn btn-danger">
										<i class="fa fa-trash"></i>
									</div>
								</td>
							</tr>
						</tbody>
						<tbody v-if="role === 'manager'">
							<tr v-for="(item, index) in roomHostel" :key="index">
								<td>{{ item.room_name }}</td>
								<td>{{ item.price }}</td>
								<td>
									<div class="btn btn-success" v-if="item.status">Active</div>
									<div class="btn btn-danger" v-else>Trống</div>
								</td>
								<td>{{ item.description }}</td>
								<td class="actions">
									<!-- <router-link :to="'/detail-room/list/'+item._id">231</router-link> -->
									<div class="btn btn-info" @click="handleDetailRoom(item._id)">
										<i class="fas fa-info-circle"></i>
									</div>
									<div class="btn btn-warning" @click="handleModal(item._id)">
										<i class="fa fa-edit"></i>
									</div>
									<div @click="handleDeleteRoom(item._id)" class="btn btn-danger">
										<i class="fa fa-trash"></i>
									</div>
								</td>
							</tr>
						</tbody>
					</table>

					<b-modal
						v-model="isShowModalPost"
						id="modal-upload"
						title="Upload Invoice"
						size="lg"
					>
						<div class="row mt-2">
							<div class="col-md-12 col-sm-12 col-lg-12 mt-3">
								<label for="">Choose file</label>

								<b-form-file
									ref="file"
									accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
									id="upload-invoice"
								></b-form-file>
							</div>
						</div>

						<template #modal-footer>
							<div>
								<b-button class="btn btn-danger" @click="showModalCreate(false)">
									{{ $t('USER.FORM.CLOSE') }}
								</b-button>
								<b-button
									type="submit"
									class="btn btn-primary"
									@click="handlePostInvoice()"
								>
									Post
								</b-button>
							</div>
						</template>
					</b-modal>

					<b-modal
						id="modal-1"
						v-model="showModal"
						:title="action === 'CREATE' ? $t('ROOM.FORM.TITLE') : $t('ROOM.FORM.EDIT')"
						centered
					>
						<div class="row mt-2">
							<div class="col-md-12 col-sm-12 col-lg-12">
								<label for="">{{ $t('ROOM.FORM.HOSTEL') }}</label>
								<b-form-input v-model="hostel_name" readonly></b-form-input>
							</div>
							<div class="col-md-12 col-sm-12 col-lg-12">
								<label for="">{{ $t('ROOM.FORM.NAME') }}</label>
								<b-form-input v-model="new_room.room_name"></b-form-input>
							</div>
							<div class="col-md-12 col-sm-12 col-lg-12">
								<label for="">{{ $t('ROOM.FORM.ROOM_PRICE') }}</label>
								<b-form-input v-model="new_room.price"></b-form-input>
							</div>
							<div class="col-md-12 col-sm-12 col-lg-12 mt-2">
								<label for="">{{ $t('ROOM.FORM.ELECTRICITY_PRICE') }}</label>
								<b-form-input v-model="price_electric" disabled></b-form-input>
							</div>
							<div class="col-md-12 col-sm-12 col-lg-12 mt-2">
								<label for="">{{ $t('ROOM.FORM.WATER_PRICE') }}</label>
								<b-form-input v-model="price_water" disabled></b-form-input>
							</div>
							<div class="col-md-12 col-sm-12 col-lg-12">
								<label for="">{{ $t('ROOM.FORM.DESCRIPTION') }}</label>
								<b-form-textarea
									id="textarea-rows"
									rows="4"
									v-model="new_room.description"
								></b-form-textarea>
							</div>
							<div class="col-md-12 col-sm-12 col-lg-12">
								<label>Service</label>
								<div>
									<div class="zone-table-service">
										<b-table-simple
											:bordered="true"
											:outlined="false"
											:fixed="false"
										>
											<b-thead>
												<b-tr>
													<b-th class="zone-min-width">
														<span>Name</span>
													</b-th>

													<b-th>
														<span>Price</span>
													</b-th>

													<b-th class="zone-min-width">
														<span>Actions</span>
													</b-th>
												</b-tr>
											</b-thead>

											<b-tbody>
												<b-tr v-for="item in service" :key="item.id">
													<b-td class="zone-min-width">
														<b-form-input v-model="item.name" />
													</b-td>

													<b-td>
														<b-form-input v-model="item.price" />
													</b-td>

													<b-td class="zone-min-width">
														<b-button
															@click="handleDeleteService(item)"
														>
															Delete
														</b-button>
													</b-td>
												</b-tr>
											</b-tbody>
										</b-table-simple>
									</div>
									<div class="zone-add-quiz">
										<div @click="handleAddService()">+</div>
									</div>
								</div>
							</div>
							<div class="col-md-12 col-sm-12 col-lg-12">
								<label for="">{{ $t('ROOM.FORM.STATUS') }}</label>
								<input
									v-model="new_room.status"
									type="checkbox"
									style="margin: 0px 5px 0px 15px"
								/>{{ $t('ROOM.FORM.EMPTY') }}
							</div>
						</div>
						<template #modal-footer>
							<div>
								<b-button
									class="btn btn-primary"
									v-if="action === 'CREATE'"
									@click="handleCreateRoom()"
								>
									{{ $t('ROOM.FORM.CREATE') }}
								</b-button>

								<b-button
									class="btn btn-primary"
									v-if="action === 'EDIT'"
									@click="handleEditRoom()"
								>
									{{ $t('ROOM.FORM.SAVE') }}
								</b-button>

								<b-button class="btn btn-danger" @click="showModal = false">
									{{ $t('ROOM.FORM.CLOSE') }}
								</b-button>
							</div>
						</template>
					</b-modal>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { MakeToast } from '@/toast/toastMessage';
	import { isEmptyOrWhiteSpace, isValidateExcel } from '../../utils/validate';
	import { getRoomTable, postRoom, deleteRoom, getOneRoom, editRoom } from '@/api/modules/room';
	import { getOneUser } from '@/api/modules/user';
	import { UploadInvoice } from '@/api/modules/invoice';
	import { getOneHostel } from '@/api/modules/hostel';
	import { getToken } from '../../const/cookie';
	export default {
		name: 'ManageRoom',
		data() {
			return {
				isShowModalPost: false,
				new_room: {
					hostel_id: '',
					room_name: '',
					price: '',
					status: false,
					description: ''
				},
				service: [
					{
						name: '',
						price: ''
					}
				],
				isLoading: false,
				showModal: false,
				list: [],
				action: '',
				ids: 0,
				hostel: '',
				hostel_name: '',
				price_electric: '',
				price_water: '',
				roomHostel: []
			};
		},
		created() {
			this.handleGetListRoom();
			this.getHostel();
		},
		computed: {
			id() {
				const id = getToken('_id');
				return id;
			},
			hostelID() {
				const id = getToken('hostel_id');
				return id;
			},
			role() {
				const role = getToken('roles');
				return role;
			}
		},
		methods: {
			async handleDetailRoom(item) {
				this.$router.push(`/detail-room/list/${item}`);
			},
			async getHostel() {
				await getOneUser({ id: this.id })
					.then(res => {
						this.area_name = res.data.dataArea.area_name;
						this.hostel_name = res.data.dataUser.hostel_id.hostel_name;
						this.price_water = res.data.dataUser.hostel_id.price_water;
						this.price_electric = res.data.dataUser.hostel_id.price_electric;
					})
					.catch(err => {
						console.log(err);
					});
			},
			async handleModal(id) {
				this.ids = id;
				if (this.ids) {
					this.action = 'EDIT';
					await getOneRoom({ id: this.ids })
						.then(res => {
							this.new_room.room_name = res.data.room.room_name;
							this.new_room.price = res.data.room.price;
							this.new_room.description = res.data.room.description;
							this.new_room.status = res.data.room.status;
							this.service = res.data.room.service;
						})
						.catch(err => {
							console.log(err);
						});
				} else {
					this.isResetDataModal();
					this.action = 'CREATE';
					console.log('CREATE');
				}
				this.showModal = true;
			},
			async handleGetListRoom() {
				this.isLoading = true;
				console.log(this.hostelID, '4');
				console.log(this.role, '12');
				if (this.role === 'admin') {
					await getRoomTable()
						.then(res => {
							this.list = res.data;
							console.log(this.list, '123312');
							this.isLoading = false;
						})
						.catch(err => {
							console.log(err);
						});
				} else if (this.role === 'manager') {
					await getRoomTable({ hostel: this.hostelID })
						.then(res => {
							this.roomHostel = res.data;
							this.isLoading = false;
						})
						.catch(err => {
							console.log(err);
						});
				}
			},
			async handleCreateRoom() {
				const data = {
					hostel_id: this.hostelID,
					room_name: this.new_room.room_name,
					price: this.new_room.price,
					description: this.new_room.description,
					status: this.new_room.status,
					service: this.service
				};
				console.log(data);
				if (isEmptyOrWhiteSpace(data.price) || isEmptyOrWhiteSpace(data.description)) {
					MakeToast({
						variant: 'warning',
						title: 'Warning',
						content: this.$t('ROOM.FORM.MESSAGE.SPACE')
					});
				} else {
					await postRoom(data)
						.then(res => {
							console.log(res);
							MakeToast({
								variant: 'success',
								title: this.$t('TOAST.SUCCESS'),
								content: this.$t('ROOM.FORM.SUCCESS')
							});
							this.handleGetListRoom();
							this.showModal = false;
							this.isResetDataModal();
						})
						.catch(err => {
							console.log(err);
						});
				}
			},
			async handleEditRoom() {
				this.action = 'EDIT';
				const data = {
					room_name: this.new_room.room_name,
					room_id: this.ids,
					price: this.new_room.price,
					description: this.new_room.description,
					status: this.new_room.status,
					service: this.service
				};
				if (isEmptyOrWhiteSpace(data.price) || isEmptyOrWhiteSpace(data.description)) {
					MakeToast({
						variant: 'warning',
						title: 'Warning',
						content: this.$t('MANAGER.FORM.MESSAGE.SPACE')
					});
				} else {
					console.log(data);
					await editRoom(data)
						.then(res => {
							MakeToast({
								variant: 'success',
								title: this.$t('TOAST.SUCCESS'),
								content: this.$t('ROOM.FORM.EDIT_SUCCESS')
							});
							this.handleGetListRoom();
							this.showModal = false;
							this.isResetDataModal();
						})
						.catch(err => {
							console.log(err);
						});
				}
			},
			handleDeleteRoom(id) {
				this.$bvModal
					.msgBoxConfirm('Do you want to delete this room?', {
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
							deleteRoom({ room_id: id })
								.then(res => {
									MakeToast({
										variant: 'success',
										title: this.$t('TOAST.SUCCESS'),
										content: 'Successfully to delete this room'
									});
									this.handleGetListRoom();
									console.log(res);
								})
								.catch(err => {
									console.log(err);
									{
										MakeToast({
											variant: 'warning',
											title: this.$t('TOAST.WARNING'),
											content: 'You can not delete this room'
										});
									}
								});
						}
					});
			},
			async handlePostInvoice() {
				let files = document.getElementById('upload-invoice').files;
				console.log(files);
				if (isValidateExcel(files[0])) {
					let formData = new FormData();
					formData.append('file', files[0]);
					await UploadInvoice(formData)
						.then(res => {
							MakeToast({
								variant: 'success',
								title: this.$t('TOAST.SUCCESS'),
								content: 'Successfully to upload invoice'
							});
							console.log(res);
						})
						.catch(err => {
							MakeToast({
								variant: 'warning',
								title: this.$t('TOAST.WARNING'),
								content: 'You can not upload invoice'
							});
							console.log(err);
						});
				} else {
					console.log('123');
				}
			},
			showModalCreate(e) {
				this.isShowModalPost = e;
				this.isResetDataModal();
			},
			isResetDataModal() {
				console.log('RESET DATA');
				this.new_room = {
					price: '',
					description: '',
					status: ''
				};
			},
			handleAddService() {
				const SERVICE = {
					name: '',
					price: ''
				};
				this.service.push(SERVICE);
			},
			handleDeleteService(item) {
				this.$bvModal
					.msgBoxConfirm('Do you want to delete this service?', {
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
							for (let i = 0; i < this.service.length; i++) {
								if (item._id === this.service[i]._id) {
									this.service.splice(i, 1);
								}
							}
							MakeToast({
								variant: 'success',
								title: this.$t('TOAST.SUCCESS'),
								content: 'Successfully to delete this service'
							});
							console.log(res);
						}
					})
					.catch(err => {
						console.log(err);
					});
			}
		}
	};
</script>

<style scoped>
	.right-content {
		position: relative;
		top: 100px;
	}
	.right-content .title {
		z-index: 1;
		position: fixed;
		width: 100%;
		top: 50px;
		background: #557b83;
		height: 40px;
		color: white;
		padding-left: 20px;
		display: flex;
		align-items: center;
	}

	.right-content .title button {
		padding: 1px;
		margin-left: auto;
		margin-right: 330px;
	}
	.rooms-content .zone-header-page {
		display: flex;
		margin: 25px;
		height: 40px;
		z-index: 0;
	}
	.rooms-content .zone-header-page .upload {
		margin-left: auto;
	}
	.rooms-content .zone-header-page .upload button {
		width: 150px;
		background-color: orange;
	}
	.rooms-content button {
		background: #1572a1;
		color: white !important;
		border: none;
		border-radius: 5px;
		width: 100px;
		height: 38px;
	}
	.rooms-content table {
		text-align: center;
	}
	.rooms-content table .actions {
		display: flex;
		padding: 0;
		margin-top: 12px;
		border: none;
		justify-content: center;
	}
	.rooms-content table .actions a {
		text-decoration: none;
		color: white;
	}
	.rooms-content .actions > div {
		height: 35px;
		width: 40px;
		margin-left: 5px;
	}
	.zone-add-quiz {
		background-color: orange;
		border-radius: 50%;
		width: 25px;
		cursor: pointer;
		margin: 10px 0px 0px 200px;
	}
	.zone-add-quiz div {
		color: white;
		text-align: center;
		font-weight: 700;
	}
	.zone-table-service {
		width: 100%;
		max-height: 230px;
		overflow-y: scroll;
	}
</style>
