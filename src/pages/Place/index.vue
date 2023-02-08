<template>
	<div id="place">
		<div class="title">
			<span>Hostel</span>
			<b-button variant="light" @click="handleModal()" v-b-modal.modal-1
				>Create Hostel</b-button
			>
		</div>
		<div class="container">
			<table class="table table-bordered">
				<thead>
					<tr>
						<th scope="col" class="col-1">ID</th>
						<th scope="col" class="col-1">Area Name</th>
						<th scope="col" class="col-1">Hostel Name</th>
						<th scope="col" class="col-1">Address</th>
						<th scope="col" class="col-1">Created At</th>
						<th scope="col" class="col-1"></th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(hostel, index) in listHostel" :key="index">
						<th scope="row">{{ index + 1 }}</th>
						<td>{{ hostel.area_id.area_name }}</td>
						<td>{{ hostel.hostel_name }}</td>
						<td>{{ hostel.address }}</td>
						<td>{{ hostel.createAt.slice(0, 10) }}</td>
						<td class="actions">
							<div class="btn btn-warning" @click="handleModal(hostel._id)">
								<i class="fa fa-edit"></i>
							</div>
							<div class="btn btn-danger" @click="handleDeleteHostel(hostel._id)">
								<i class="fa fa-trash"></i>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
			<b-modal
				id="modal-1"
				v-model="showModal"
				:title="action === 'CREATE' ? 'Tạo nhà trọ' : 'EDIT Hostel'"
				centered
			>
				<div class="row mt-2">
					<div class="col-md-12 col-sm-12 col-lg-12">
						<label for="">Area</label>
						<b-form-select v-model="new_hostel.area_id">
							<b-form-select-option :value="null">Select Area</b-form-select-option>
							<b-form-select-option
								v-for="(area, index) in options_area"
								:key="index"
								:value="area._id"
							>
								{{ area.area_name }}
							</b-form-select-option>
						</b-form-select>
					</div>
					<div class="col-md-12 col-sm-12 col-lg-12">
						<label for="">Hostel Name</label>
						<b-form-input type="text" v-model="new_hostel.hostel_name"></b-form-input>
					</div>
					<div class="col-md-12 col-sm-12 col-lg-12">
						<label for="">Address</label>
						<b-form-input v-model="new_hostel.address"></b-form-input>
					</div>
					<div class="col-md-12 col-sm-12 col-lg-12">
						<label for="">Water Price</label>
						<b-form-input v-model="new_hostel.price_water" type="number"></b-form-input>
					</div>
					<div class="col-md-12 col-sm-12 col-lg-12">
						<label for="">Electric Price</label>
						<b-form-input
							v-model="new_hostel.price_electric"
							type="number"
						></b-form-input>
					</div>
					<div class="col-md-12 col-sm-12 col-lg-12">
						<label for="">Created At</label>
						<b-form-input type="date" v-model="new_hostel.createAt"></b-form-input>
					</div>
				</div>
				<template #modal-footer>
					<div>
						<b-button
							class="btn btn-primary"
							v-if="action === 'CREATE'"
							@click="handleCreateHostel()"
						>
							Create
						</b-button>

						<b-button
							class="btn btn-primary"
							v-if="action === 'EDIT'"
							@click="handleEditHostel()"
						>
							Save
						</b-button>

						<b-button class="btn btn-danger" @click="showModal = false">
							Close
						</b-button>
					</div>
				</template>
			</b-modal>
		</div>
	</div>
</template>

<script>
	import { MakeToast } from '@/toast/toastMessage';
	import { isEmptyOrWhiteSpace } from '../../utils/validate';
	import { getAreaTable, getOneArea } from '@/api/modules/area';
	import {
		getHostelTable,
		postHostel,
		deleteHostel,
		getOneHostel,
		editHostel
	} from '@/api/modules/hostel';
	export default {
		data() {
			return {
				selected: null,
				listHostel: [],
				area_name: [],
				new_hostel: {
					hostel_name: '',
					address: '',
					area_id: null,
					createAt: '',
					price_water: '',
					price_electric: ''
				},
				options_area: [],
				isLoading: false,
				showModal: false,
				action: '',
				ids: 0
			};
		},
		created() {
			this.handleGetListHostel();
			this.getArea();
		},
		methods: {
			async handleModal(id) {
				this.ids = id;
				if (this.ids) {
					const id = { id: this.ids };
					this.action = 'EDIT';
					await getOneHostel(id)
						.then(res => {
							this.new_hostel.hostel_name = res.data.hostel_name;
							this.new_hostel.address = res.data.address;
							this.new_hostel.createAt = res.data.createAt;
							this.new_hostel.area_id = res.data.area_id._id;
							this.new_hostel.price_water = res.data.price_water;
							this.new_hostel.price_electric = res.data.price_electric;
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
			async getArea() {
				await getAreaTable()
					.then(res => {
						this.options_area = res.data;
					})
					.catch(err => {
						console.log(err);
					});
			},
			async handleGetListHostel() {
				this.isLoading = true;
				await getHostelTable()
					.then(res => {
						this.listHostel = res.data;
						console.log(this.listHostel);
						this.isLoading = false;
					})
					.catch(err => {
						console.log(err);
					});
			},
			async handleCreateHostel() {
				const data = {
					area_id: this.new_hostel.area_id,
					hostel_name: this.new_hostel.hostel_name,
					address: this.new_hostel.address,
					createAt: this.new_hostel.createAt,
					price_water: this.new_hostel.price_water,
					price_electric: this.new_hostel.price_electric
				};
				console.log(data);
				if (
					isEmptyOrWhiteSpace(data.hostel_name) ||
					isEmptyOrWhiteSpace(data.address) ||
					isEmptyOrWhiteSpace(data.createAt) ||
					isEmptyOrWhiteSpace(data.area_id) ||
					isEmptyOrWhiteSpace(data.price_water) ||
					isEmptyOrWhiteSpace(data.price_electric)
				) {
					MakeToast({
						variant: 'warning',
						title: 'Warning',
						content: '123'
					});
				} else {
					await postHostel(data)
						.then(res => {
							MakeToast({
								variant: 'success',
								title: this.$t('TOAST.SUCCESS'),
								content: this.$t('MANAGER.FORM.SUCCESS')
							});
							this.handleGetListHostel();
							this.showModal = false;
							this.isResetDataModal();
						})
						.catch(err => {
							console.log(err);
						});
				}
			},
			async handleEditHostel() {
				this.action = 'EDIT';
				const data = {
					hostel_id: this.ids,
					area_id: this.new_hostel.area_id,
					hostel_name: this.new_hostel.hostel_name,
					address: this.new_hostel.address,
					createAt: this.new_hostel.createAt,
					price_water: this.new_hostel.price_water,
					price_electric: this.new_hostel.price_electric
				};
				if (
					isEmptyOrWhiteSpace(data.hostel_name) ||
					isEmptyOrWhiteSpace(data.address) ||
					isEmptyOrWhiteSpace(data.createAt)
				) {
					MakeToast({
						variant: 'warning',
						title: 'Warning',
						content: this.$t('MANAGER.FORM.MESSAGE.SPACE')
					});
				} else {
					console.log(data);
					await editHostel(data)
						.then(res => {
							MakeToast({
								variant: 'success',
								title: this.$t('TOAST.SUCCESS'),
								content: '123'
							});
							this.handleGetListHostel();
							this.showModal = false;
							this.isResetDataModal();
						})
						.catch(err => {
							console.log(err);
						});
				}
			},
			handleDeleteHostel(id) {
				console.log(id);
				this.$bvModal
					.msgBoxConfirm('Do you want to delete this hostel?', {
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
							deleteHostel({ hostel_id: id })
								.then(res => {
									MakeToast({
										variant: 'success',
										title: this.$t('TOAST.SUCCESS'),
										content: 'Successfully to delete this room'
									});
									this.handleGetListHostel();

									console.log(res);
								})
								.catch(err => {
									MakeToast({
										variant: 'warning',
										title: this.$t('TOAST.WARNING'),
										content: 'You can not delete this room'
									});
									console.log(err);
								});
						}
					});
			},
			isResetDataModal() {
				console.log('RESET DATA');
				this.new_hostel = {
					hostel_name: '',
					address: '',
					area_id: null,
					createAt: '',
					price_water: '',
					price_electric: ''
				};
			}
		}
	};
</script>

<style scoped>
	#place .title {
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
	#place .title button {
		padding: 1px;
		margin-left: auto;
		margin-right: 320px;
	}
	.container {
		margin-top: 140px;
	}
	.container table {
		text-align: center;
	}
	.rooms-content table .actions a {
		text-decoration: none;
		color: white;
	}
	.container .actions > div {
		height: 35px;
		width: 40px;
		margin-left: 5px;
	}
</style>
