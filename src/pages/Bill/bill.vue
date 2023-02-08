<template>
	<div id="bill">
		<div class="title">
			<p>Hóa đơn phòng : {{ invoice[0]['room_id']['room_name'] }}</p>
		</div>
		<div class="revenue-management_searching-filter">
			<b-form-input
				class="w-100"
				type="date"
				v-model="sort_date"
				:value="sort_date"
			></b-form-input>
		</div>
		<div class="container">
			<div>
				<div
					class="form-group row"
					v-for="(service, index) in invoice[0].other_service"
					:key="index"
				>
					<label class="col-sm-2 form-control-label">{{ service.name || '' }}</label>
					<div class="col-sm-10">
						<input type="text" class="form-control" v-model="service.price" readonly />
					</div>
				</div>
				<div class="form-group row">
					<label class="col-sm-2 form-control-label">Room Price</label>
					<div class="col-sm-10">
						<input
							type="text"
							class="form-control"
							:value="invoice[0]['room_id']['price']"
							readonly
						/>
					</div>
				</div>
				<div class="form-group row">
					<label class="col-sm-2 form-control-label">Electric Price</label>
					<div class="col-sm-10">
						<input
							type="text"
							class="form-control"
							:value="
								invoice[0].electricity_consumed_per_month *
								invoice[0]['room_id']['hostel_id']['price_electric']
							"
							readonly
						/>
					</div>
				</div>
				<div class="form-group row">
					<label class="col-sm-2 form-control-label">Water Price</label>
					<div class="col-sm-10">
						<input
							type="text"
							class="form-control"
							readonly
							:value="
								invoice[0].water_consumed_per_month *
								invoice[0]['room_id']['hostel_id']['price_water']
							"
						/>
					</div>
				</div>
				<div
					class="form-group row"
					v-for="(service_room, idx) in invoice[0].room_id.service"
					:key="idx + 1"
				>
					<label class="col-sm-2 form-control-label">{{ service_room.name || '' }}</label>
					<div class="col-sm-10">
						<input
							type="text"
							class="form-control"
							:value="service_room.price"
							readonly
						/>
					</div>
				</div>
				<div class="form-group row">
					<label class="col-sm-2 form-control-label">Total Price</label>
					<div class="col-sm-10">
						<label type="text" class="form-control" readonly>{{
							invoice[0].total || ''
						}}</label>
					</div>
				</div>
				<div class="form-group row">
					<label class="col-sm-2 form-control-label">Status</label>
					<div class="col-sm-10">
						<label v-if="invoice[0]['status']" type="text" class="form-control" readonly
							>Đã thanh toán</label
						>
						<label v-else type="text" class="form-control" readonly
							>Chưa thanh toán</label
						>
					</div>
				</div>
				<div>
					<button class="btn btn-primary" @click="handleModal()" v-b-modal.modal-1
						><i class="fas fa-credit-card"></i> Thanh Toán</button
					>
				</div>
			</div>

			<b-modal id="modal-1" v-model="showModal" :title="$t('BANK.TITLE')" centered>
				<div class="col-6 col-sm-12">
					<div>
						<label for="">Bank</label>
						<b-form-select :selected="payment.bankCode" v-model="payment.bankCode">
							<b-form-select-option :value="null">Select Bank</b-form-select-option>
							<b-form-select-option
								v-for="bank in options_bank"
								:key="bank.id"
								:value="bank.shortName"
							>
								{{ bank.vn_name }}
							</b-form-select-option>
						</b-form-select>
					</div>
				</div>
				<template #modal-footer>
					<div>
						<b-button class="btn btn-primary" @click="handlePayment()"> OK </b-button>

						<b-button class="btn btn-danger" @click="showModal = false">
							{{ $t('ROOM.FORM.CLOSE') }}
						</b-button>
					</div>
				</template>
			</b-modal>
		</div>
	</div>
</template>

<script>
	import { Payment, getListBank } from '@/api/modules/payment';
	import { getToken } from '../../const/cookie';
	import { MakeToast } from '@/toast/toastMessage';
	import { getInvoice, getOneInvoice } from '@/api/modules/invoice';
	import { getOneRoom } from '@/api/modules/room';
	export default {
		name: 'bill',
		data() {
			return {
				showModal: false,
				rooms: [],
				selected: null,
				invoice: [],
				month: [
					{
						name: 'Tháng 1'
					}
				],
				payment: {
					bankCode: null
				},
				options_bank: [],
				idx: '',
				sort_date: ''
			};
		},
		computed: {
			user_id() {
				const id = getToken('_id');
				return id;
			},
			lang() {
				return this.$store.getters.language;
			},
			changeDate() {
				return this.sort_date;
			}
		},
		watch: {
			changeDate() {
				this.getBill();
			}
		},
		created() {
			this.getBank();
			this.getBill();
		},
		methods: {
			async getBank() {
				await getListBank()
					.then(res => {
						this.options_bank = res.bank;
					})
					.catch(err => {
						console.log(err);
					});
			},
			async getBill() {
				if (this.sort_date) {
					const sortDate = new Date(this.sort_date);
					let sortMonth = sortDate.getMonth() + 1;
					let sortYear = sortDate.getFullYear();
					const sortFullDateMonth = `${sortMonth}/${sortYear}`;
					await getOneInvoice({ user_id: this.user_id, date: sortFullDateMonth })
						.then(res => {
							if (res.status === 'success') {
								this.invoice = res.data;
							}
						})
						.catch(err => {
							console.log(err);
						});
				} else {
					const currentDate = new Date();
					let crMonth = currentDate.getMonth() + 1;
					let crYear = currentDate.getFullYear();
					const crDateFull = `${crMonth}/${crYear}`;
					await getOneInvoice({ user_id: this.user_id, date: crDateFull })
						.then(res => {
							this.invoice = res.data;
						})
						.catch(err => {
							console.log(err);
						});
				}
			},

			async handleModal() {},
			async handlePayment() {
				let d = new Date();
				let year = d.getFullYear();
				let month = d.getMonth() + 1;
				let date = month + '/' + year;
				const data = {
					bankCode: this.payment.bankCode,
					user_id: this.user_id,
					language: this.lang,
					date_month: date
				};
				console.log(data);
				await Payment(data)
					.then(res => {
						this.url = res.url;
						window.open(this.url);
						// MakeToast({
						// 	variant: 'success',
						// 	title: this.$t('TOAST.SUCCESS'),
						// 	content: this.$t('MANAGER.FORM.SUCCESS')
						// });
						// this.isResetDataModal();
						this.showModal = false;
					})
					.catch(err => {
						console.log(err);
					});
			}
		}
	};
</script>

<style>
	#bill .title {
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
	#bill .container {
		margin: 50px 100px 100px 100px;
	}
	.revenue-management_searching-filter {
		margin: 120px 0px 0px 20px;
		width: 200px;
	}
</style>
