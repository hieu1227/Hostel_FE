<template>
	<div id="area">
		<div class="title">
			<span>{{ $t('AREA.TITLE') }}</span>
			<b-button variant="light" @click="handleModal()" v-b-modal.modal-1>{{
				$t('AREA.CREATE')
			}}</b-button>
		</div>
		<div class="container">
			<table class="table table-bordered">
				<thead>
					<tr>
						<th scope="col" class="col-1">{{ $t('AREA.TABLE.ID') }}</th>
						<th scope="col" class="col-2">{{ $t('AREA.TABLE.AREA_NAME') }}</th>
						<th scope="col" class="col-2">{{ $t('AREA.TABLE.DATE') }}</th>
						<th scope="col" class="col-1"></th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(area, index) in listAreas" :key="index">
						<th scope="row">{{ index + 1 }}</th>
						<td>{{ area.area_name }}</td>
						<td>{{ area.createAt.slice(0,10) }}</td>
						<td class="actions">
							<div class="btn btn-warning" @click="handleModal(area._id)">
								<i class="fa fa-edit"></i>
							</div>
							<div class="btn btn-danger" @click="handleDeleteArea(area._id)">
								<i class="fa fa-trash"></i>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
			<b-modal
				id="modal-1"
				v-model="showModal"
				:title="action === 'CREATE' ? $t('AREA.FORM.TITLE') : $t('AREA.FORM.EDIT')"
				centered
			>
				<div class="row mt-2">
					<div class="col-md-12 col-sm-12 col-lg-12">
						<label for="">{{ $t('AREA.FORM.AREA_NAME') }}</label>
						<b-form-input v-model="new_area.area_name"></b-form-input>
					</div>
					<div class="col-md-12 col-sm-12 col-lg-12">
						<label for="">{{ $t('AREA.FORM.DATE') }}</label>
						<b-form-input type="date" v-model="new_area.createAt"></b-form-input>
					</div>
				</div>
				<template #modal-footer>
					<div>
						<b-button
							class="btn btn-primary"
							v-if="action === 'CREATE'"
							@click="handleCreateArea()"
						>
							{{ $t('AREA.FORM.CREATE') }}
						</b-button>

						<b-button
							class="btn btn-primary"
							v-if="action === 'EDIT'"
							@click="handleEditArea()"
						>
							{{ $t('AREA.FORM.SAVE') }}
						</b-button>

						<b-button class="btn btn-danger" @click="showModal = false">
							{{ $t('AREA.FORM.CLOSE') }}
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
	import { getAreaTable, postArea, deleteArea, editArea, getOneArea } from '@/api/modules/area';
	export default {
		data() {
			return {
				listAreas: [],
				new_area: {
					area_name: '',
					createAt: ''
				},
				isLoading: false,
				showModal: false,
				action: '',
				ids: ''
			};
		},

		created() {
			this.handleGetListArea();
		},
		methods: {
			handleModal(id) {
				this.ids = id;
				if (this.ids) {
					const id = { id: this.ids };
					console.log(id);
					getOneArea(id)
						.then(res => {
							this.new_area.area_name = res.area.area_name;
							this.new_area.createAt = res.area.createAt;
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
			async handleGetListArea() {
				this.isLoading = true;
				await getAreaTable()
					.then(res => {
						this.listAreas = res.data;
						console.log(this.listAreas);
						this.isLoading = false;
					})
					.catch(err => {
						console.log(err);
					});
			},
			async handleCreateArea() {
				const data = {
					area_name: this.new_area.area_name,
					createAt: this.new_area.createAt
				};
				console.log(data);
				if (isEmptyOrWhiteSpace(data.area_name)) {
					MakeToast({
						variant: 'warning',
						title: 'Warning',
						content: '123'
					});
				} else {
					await postArea(data)
						.then(res => {
							MakeToast({
								variant: 'success',
								title: this.$t('TOAST.SUCCESS'),
								content: this.$t('MANAGER.FORM.SUCCESS')
							});
							this.handleGetListArea();
							this.showModal = false;
							this.isResetDataModal();
						})
						.catch(err => {
							console.log(err);
						});
				}
			},
			async handleEditArea() {
				this.action = 'EDIT';
				const data = {
					area_name: this.new_area.area_name,
					createAt: this.new_area.createAt,
					id: this.ids
				};
				if (isEmptyOrWhiteSpace(data.area_name)) {
					MakeToast({
						variant: 'warning',
						title: 'Warning',
						content: this.$t('ROOM.FORM.MESSAGE.SPACE')
					});
				} else {
					console.log(data);
					console.log(this.ids);
					await editArea(data)
						.then(res => {
							MakeToast({
								variant: 'success',
								title: this.$t('TOAST.SUCCESS'),
								content: '123'
							});
							this.handleGetListArea();
							this.showModal = false;
							this.isResetDataModal();
						})
						.catch(err => {
							console.log(err);
						});
				}
			},
			handleDeleteArea(id) {
				this.$bvModal
					.msgBoxConfirm('Do you want to delete this area?', {
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
							deleteArea({ id: id })
								.then(res => {
									MakeToast({
										variant: 'success',
										title: this.$t('TOAST.SUCCESS'),
										content: 'Successfully to delete this area'
									});
									this.handleGetListArea();
									console.log(res);
								})
								.catch(err => {
									console.log(err);
									MakeToast({
										variant: 'warning',
										title: this.$t('TOAST.WARNING'),
										content: 'You can not delete this area'
									});
								});
						}
					});
			},
			isResetDataModal() {
				console.log('RESET DATA');
				this.new_area = {
					area_name: '',
					createAt: ''
				};
			}
		}
	};
</script>

<style scoped>
	#area .title {
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
	#area .title button {
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
