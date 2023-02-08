<template>
	<div id="detail">
		<div v-if="isLoading" class="spinner-border text-primary" role="status">
			<span class="sr-only">Loading...</span>
		</div>
		<div class="content mt-3">
			<div class="title">{{ $t('ROOM_DETAIL.TITLE') }}</div>
			<div class="container" v-if="rooms">
				<div class="row">
					<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
						<h3>{{ $t('ROOM_DETAIL.NAME') }} : {{ rooms.room.room_name }}</h3>
						<table class="table table-hover">
							<tbody>
								<tr>
									<td>{{ $t('ROOM_DETAIL.ID') }}</td>
									<td>{{ rooms.room.room_name }}</td>
								</tr>
								<tr>
									<td>{{ $t('ROOM_DETAIL.STATUS') }}</td>
									<td>
										<div class="btn btn-success" v-if="rooms.room.status"
											>Active</div
										>
										<div class="btn btn-danger" v-else>Trống</div>
									</td>
								</tr>
								<tr>
									<td>{{ $t('ROOM_DETAIL.RENTAL_DATE') }}</td>
									<td>{{ rooms.room.createAt.slice(0, 10) || '' }}</td>
								</tr>
								<tr>
									<td>{{ $t('ROOM_DETAIL.SERVICE') }}</td>
									<div v-for="(serviceName, index) in room_service" :key="index">
										<td>{{ serviceName.name }}</td>
									</div>
								</tr>
								<tr>
									<td>{{ $t('ROOM_DETAIL.PRICE') }}</td>
									<td>{{ rooms.room.price }}</td>
								</tr>
								<tr>
									<td>
										<p>{{ $t('ROOM_DETAIL.TOTAL') }}:</p>
									</td>
									<td>{{ total }}</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="infomation_user col-xs-4 col-sm-4 col-md-4 col-lg-4">
						<h3>{{ $t('ROOM_DETAIL.CUSTOMER') }}</h3>
						<div class="row text-center">
							<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
								<p>{{ $t('ROOM_DETAIL.NAME_USER') }}</p>
								<p>{{ $t('ROOM_DETAIL.CARD') }}</p>
								<p>{{ $t('ROOM_DETAIL.DOB') }}</p>
								<p>{{ $t('ROOM_DETAIL.HOMETOWN') }}</p>
								<p>{{ $t('ROOM_DETAIL.PHONE') }}</p>
								<p>{{ $t('ROOM_DETAIL.GENDER') }}</p>
							</div>
							<div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
								<p>{{ rooms.request.user_id.username }}</p>
								<p>{{ rooms.request.user_id.id_card_number }}</p>
								<p>{{ rooms.request.user_id.date_of_birth }}</p>
								<p>{{ rooms.request.user_id.hometown }}</p>
								<p>{{ rooms.request.user_id.telephone }}</p>
								<p>{{ rooms.request.user_id.gender }}</p>
							</div>
						</div>
					</div>
					<a data-toggle="modal" class="btn btn-warning" @click="Open"
						><i class="fa fa-calculator"></i> {{ $t('ROOM_DETAIL.BILL') }}</a
					>
					<button
						class="btn btn-secondary"
						style="margin-left: 20px"
						@click="handleCancelRoom()"
						><i class="fa fa-sign-out"></i> {{ $t('ROOM_DETAIL.CHECKOUT') }}</button
					>
				</div>
				<div>
					<b-modal id="modal-prevent-closing" v-model="showModal" title=" Calculate bill">
						<form>
							<div
								class="form-group row"
								v-for="item in rooms.room.service"
								:key="item.id"
							>
								<label class="col-sm-2 form-control-label">{{ item.name }}</label>
								<div class="col-sm-10">
									<input type="text" class="form-control" v-model="item.price" />
								</div>
							</div>
							<div class="form-group row">
								<label class="col-sm-2 form-control-label">{{
									$t('ROOM_DETAIL.FORM.PRICE')
								}}</label>
								<div class="col-sm-10">
									<input
										type="text"
										class="form-control"
										v-model="rooms.room.price"
										disabled
									/>
								</div>
							</div>
							<div class="form-group row">
								<label class="col-sm-2 form-control-label">{{
									$t('ROOM_DETAIL.FORM.ELECTRIC')
								}}</label>
								<div class="col-sm-5">
									<input
										type="number"
										class="form-control"
										v-model="electric"
										placeholder="Nhập Số Điện"
									/>
								</div>
								<div class="col-sm-5">
									<input
										disabled
										class="form-control"
										v-model="rooms.room.hostel_id.price_electric"
									/>
								</div>
							</div>
							<div class="form-group row">
								<div class="offset-sm-3">
									{{ $t('ROOM_DETAIL.FORM.ELECTRIC_PRICE') }}:
									{{ priceElectric }}</div
								>
							</div>
							<div class="form-group row">
								<label class="col-sm-2 form-control-label">{{
									$t('ROOM_DETAIL.FORM.WATER')
								}}</label>
								<div class="col-sm-5">
									<input
										type="number"
										class="form-control"
										v-model="water"
										placeholder="Nhập Số Nước"
									/>
								</div>
								<div class="col-sm-5">
									<input
										disabled
										class="form-control"
										v-model="rooms.room.hostel_id.price_water"
									/>
								</div>
							</div>
							<div class="form-group row">
								<div class="offset-sm-3"
									>{{ $t('ROOM_DETAIL.FORM.WATER_PRICE') }}:{{ priceWater }}</div
								>
							</div>
							<div class="form-group row">
								<label class="col-sm-2 form-control-label">Other Service</label>
								<div class="col-sm-10">
									<div class="zone-table-service">
										<b-table-simple
											:bordered="true"
											:outlined="false"
											:fixed="false"
										>
											<b-thead>
												<b-tr>
													<b-th>
														<span>Name</span>
													</b-th>

													<b-th>
														<span>Price</span>
													</b-th>

													<b-th>
														<span>Actions</span>
													</b-th>
												</b-tr>
											</b-thead>

											<b-tbody>
												<b-tr
													v-for="other in other_service"
													:key="other.id"
												>
													<b-td>
														<b-form-input v-model="other.name" />
													</b-td>

													<b-td>
														<b-form-input v-model="other.price" />
													</b-td>

													<b-td>
														<b-button
															@click="handleDeleteService(other)"
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
							<div class="form-group row">
								<label class="col form-control-label"
									>{{ $t('ROOM_DETAIL.FORM.TOTAL') }}: {{ totalPrice }}</label
								>
							</div>
						</form>
						<template #modal-footer>
							<div>
								<b-button
									class="btn btn-primary"
									@click="handleSendInvoice()"
									v-model="showModal"
								>
									{{ $t('ROOM.FORM.SEND') }}
								</b-button>

								<b-button class="btn btn-danger" @click="showModal = false">
									{{ $t('ROOM.FORM.CLOSE') }}
								</b-button>
							</div>
						</template>
					</b-modal>
				</div>
				<div class="row">
					<h4>Roommate</h4>
					<div class="table-responsive">
						<table class="table table-hover">
							<thead>
								<tr>
									<th scope="col">Tên</th>
									<th scope="col">CMND</th>
									<th scope="col">DOB</th>
									<th scope="col">Quê Quán</th>
									<th scope="col">SDT</th>
									<th scope="col">Giới Tính</th>
									<th scope="col" @click="isShowModalAdd = !isShowModalAdd"
										><a class="btn btn-primary">
											<i class="fa fa-plus"></i> Add</a
										></th
									>
								</tr>
							</thead>
							<tbody>
								<tr
									v-for="(roommate, index) in rooms.request.room_mate"
									:key="index"
								>
									<th scope="row">{{ roommate.username }}</th>
									<td>{{ roommate.id_card_number || '' }}</td>
									<td>{{ roommate.date_of_birth || '' }}</td>
									<td>{{ roommate.hometown || '' }}</td>
									<td>{{ roommate.telephone || '' }}</td>
									<td>{{ roommate.gender || '' }}</td>
									<td class="actions">
										<div
											type="button"
											class="btn btn-outline-danger"
											style="border: 1px solid red"
											@click="Delete(index)"
										>
											<i class="fa fa-trash"></i> Delete
										</div>
									</td>
								</tr>
							</tbody>
						</table>
						<b-modal
							v-model="isShowModalAdd"
							id="modal-upload"
							title="Add roommate"
							size="lg"
						>
							<div class="form-group row">
								<label class="col-sm-2 form-control-label">User</label>
								<div class="col-sm-10">
									<b-form-select v-model="form.user">
										<b-form-select-option :value="null"
											>Select Customer</b-form-select-option
										>
										<b-form-select-option
											v-for="(user, index) in list.filter(
												user => user.role_id.role_name === 'customer'
											)"
											:key="index"
											:value="user.user_id._id"
										>
											{{ user.user_id.username }}
										</b-form-select-option>
									</b-form-select>
								</div>
							</div>

							<template #modal-footer>
								<div>
									<b-button
										class="btn btn-danger"
										@click="showModalCreate(false)"
									>
										{{ $t('USER.FORM.CLOSE') }}
									</b-button>
									<b-button
										type="submit"
										class="btn btn-primary"
										@click="handleAddRoommate()"
									>
										Add
									</b-button>
								</div>
							</template>
						</b-modal>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { getOneRoom } from '@/api/modules/room';
	import { postRoommate } from '@/api/modules/roommate';
	import { getUserTable, deleteUser } from '@/api/modules/user';
	import { postInvoice } from '@/api/modules/invoice';
	import { getDetail, cancelRoom } from '@/api/modules/roomRegister';
	import { MakeToast } from '@/toast/toastMessage';
	import { calcualateTotalService } from '../../utils/validate';
	import { getToken } from '../../const/cookie';
	export default {
		name: 'RoomDetail',

		data() {
			return {
				room_service: [],
				isShowModalAdd: false,
				id: this.$route.params.roomid,
				detailRoom: [],
				rooms: null,
				isLoading: true,
				showModal: false,
				water: 0,
				electric: 0,
				selected: null,
				other_service: [
					{
						name: '',
						price: 0
					}
				],
				form: {
					user: [],
					room_id: ''
				},
				list: []
			};
		},
		computed: {
			total() {
				return Math.round(this.rooms.room.price);
			},
			priceWater() {
				return Math.round(this.rooms.room.hostel_id.price_water * this.water);
			},
			priceElectric() {
				return Math.round(this.rooms.room.hostel_id.price_electric * this.electric);
			},
			priceService() {
				return calcualateTotalService(this.room_service);
			},
			priceOtherService() {
				return calcualateTotalService(this.other_service);
			},
			totalPrice() {
				return Math.round(
					this.priceWater +
						this.priceElectric +
						this.total +
						this.priceService +
						this.priceOtherService
				);
			},
			hostel_id() {
				const hostel_id = getToken('hostel_id');
				return hostel_id;
			}
		},
		created() {
			this.handleGetRoom();
			this.getUser();
		},
		methods: {
			async handleGetRoom() {
				const id = { id: this.id };
				await getOneRoom(id)
					.then(res => {
						this.rooms = res.data;
						this.room_service = res.data.room.service;
					})
					.catch(err => {
						console.log(err);
					});
			},
			getUser() {
				getUserTable({ hostel: this.hostel_id })
					.then(res => {
						this.list = res.data;
					})
					.catch(err => {
						console.log(err);
					});
			},
			handleSendInvoice(id) {
				console.log(this.rooms.request.user_id._id);
				id = this.id;
				let d = new Date();
				let year = d.getFullYear();
				let month = d.getMonth() + 1;
				let date = month + '/' + year;
				console.log(date);
				const data = {
					room_id: this.id,
					user_id: this.rooms.request.user_id._id,
					date_month: date,
					status: false,
					other_service: this.other_service,
					water_consumed_per_month: this.water,
					electricity_consumed_per_month: this.electric,
					total: this.totalPrice
				};
				postInvoice(data)
					.then(res => {
						MakeToast({
							variant: 'success',
							title: this.$t('TOAST.SUCCESS'),
							content: this.$t('INVOICE.SUCCESS')
						});
						this.showModal = false;
					})
					.catch(err => {
						console.log(err);
					});
			},
			async handleAddRoommate() {
				let dt = this.rooms;
				let tmp = [];
				for (let idx of dt.request.room_mate) {
					tmp.push(idx._id);
				}
				const data = {
					user: [...tmp, this.form.user],
					room_id: this.id
				};
				console.log(data);

				await postRoommate(data)
					.then(res => {
						MakeToast({
							variant: 'success',
							title: this.$t('TOAST.SUCCESS'),
							content: 'Add roommate successfully'
						});
						this.isShowModalAdd = false;
						this.getUser();
					})
					.catch(err => {
						console.log(err);
					});
			},
			handleCancelRoom() {
				console.log(this.id);

				this.$bvModal
					.msgBoxConfirm('Do you want to check out this room?', {
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
							cancelRoom({ room_id: this.id })
								.then(async res => {
									MakeToast({
										variant: 'success',
										title: this.$t('TOAST.SUCCESS'),
										content: 'Successfully to cancel this room'
									});
									console.log(res);
									await this.handleGetRoom();
								})
								.catch(err => {
									console.log(err);
									MakeToast({
										variant: 'warning',
										title: this.$t('TOAST.WARNING'),
										content: 'You can not cancel this room'
									});
								});
						}
					});
			},
			handleAddService() {
				const SERVICE = {
					name: '',
					price: ''
				};
				this.other_service.push(SERVICE);
			},
			handleDeleteService(other) {
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
							for (let i = 0; i < this.other_service.length; i++) {
								if (other._id === this.other_service[i]._id) {
									this.other_service.splice(i, 1);
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
			},
			Delete(id) {
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
							let dt = this.rooms;
							let tmp = [];
							for (let idx of dt.request.room_mate) {
								tmp.push(idx._id);
							}
							tmp.splice(id, 1);
							const data = {
								user: tmp,
								room_id: this.id
							};

							postRoommate(data)
								.then(res => {
									MakeToast({
										variant: 'success',
										title: this.$t('TOAST.SUCCESS'),
										content: this.$t('INVOICE.SUCCESS')
									});
									this.isShowModalAdd = false;
									this.getUser();
								})
								.catch(err => {
									console.log(err);
								});
						}
					});
			},
			Open() {
				this.$bvModal.show('modal-prevent-closing');
			},
			isResetDataModal() {
				this.name = '';
				this.nameState = null;
			},
			showModalCreate(e) {
				this.isShowModalAdd = e;
				this.isResetDataModal();
			}
		}
	};
</script>

<style scoped>
	.content {
		position: relative;
		top: 50px;
	}
	.content .title {
		position: fixed;
		width: 100%;
		top: 50px;
		background: #557b83;
		height: 40px;
		line-height: 40px;
		color: white;
		padding-left: 20px;
		z-index: 1;
	}
	.content .row {
		margin-top: 80px;
	}
	.content .infomation_user {
		background: #334756;
		color: white;
	}
	.content .infomation_user h3 {
		margin-top: 20px;
		color: white;
		text-align: center;
	}
	.table-responsive .modal_add,
	.modals {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		/* background: gray; */
		/* width: 1000px; */
	}
	.modal-content {
		background: #f3e9dd;
		box-shadow: 2px 2px 2px 2px;
	}
	.modal_add form > div {
		margin-top: 10px !important;
		margin: 0;
		padding: 0;
	}
	.fade-enter-active,
	.fade-leave-active {
		transition: transform 0.5s;
	}
	.fade-enter,
	.fade-leave-to {
		transform: translateY(-50%) translateX(100vw);
	}
	.modals form > div {
		margin-top: 10px !important;
		margin: 0;
		padding: 0;
	}
	.zone-add-quiz {
		background-color: orange;
		border-radius: 50%;
		width: 25px;
		cursor: pointer;
		margin: 10px 0px 0px 150px;
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
