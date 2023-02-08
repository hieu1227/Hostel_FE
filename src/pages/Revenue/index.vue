<template>
	<div id="revenue">
		<div class="title">{{ $t('REVENUE.TITLE') }}</div>
		<div class="revenue-management_searching-filter">
			<b-form-select v-model="sort_hostel">
				<b-form-select-option :value="null">{{
					$t('REVENUE.SELECT.ADDRESS')
				}}</b-form-select-option>
				<b-form-select-option
					v-for="(item, index) in allHostel"
					:key="index"
					:value="item._id"
					>{{ item.hostel_name }}</b-form-select-option
				>
			</b-form-select>
			<b-form-input
				class="w-25"
				type="date"
				v-model="sort_date"
				:value="sort_date"
			></b-form-input>
		</div>
		<div class="revenue-header">
			<div class="header-box">
				<h2
					><i class="fas fa-shopping-bag" style="margin-right: 10px"></i
					>{{ $t('REVENUE.BOX.TOTAL') }}</h2
				>
				<h3> {{ list.length }} </h3>
			</div>
			<div class="header-box">
				<h2
					><i class="fas fa-shopping-bag" style="margin-right: 10px"></i
					>{{ $t('REVENUE.BOX.RENTED_ROOM') }}</h2
				>
				<h3> {{ list.filter(room => room.status).length }} </h3>
			</div>
			<div class="header-box">
				<h2
					><i class="fas fa-sync" style="margin-right: 10px"></i
					>{{ $t('REVENUE.BOX.REVENUE') }}</h2
				>
				<h3> {{ revenueHostel.total }} </h3>
			</div>
		</div>
		<!-- <div class="container">
			<table class="table table-bordered">
				<thead>
					<tr>
						<th scope="col" class="col-1">{{ $t('REVENUE.TABLE.AREA') }}</th>
						<th scope="col" class="col-2">{{ $t('REVENUE.TABLE.ADDRESS') }}</th>
						<th scope="col" class="col-1">{{ $t('REVENUE.TABLE.TOTAL_ROOM') }}</th>
						<th scope="col" class="col-1">{{ $t('REVENUE.TABLE.MANAGER') }}</th>
						<th scope="col" class="col-1">{{ $t('REVENUE.TABLE.TOTAL_PRICE') }}</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(hostels, index) in allHostel" :key="index">
						<th scope="row">{{ hostels.area_id.area_name }}</th>
						<td>{{ hostels.hostel_name }}</td>
						<td>{{ roomHostel.length }}</td>
						<td
							v-for="(manager, index) in user.filter(
								manager => manager.role_id.role_name === 'manager'
							)"
							:key="index"
							>{{ manager.user_id.fullname }}</td
						>
						<td>{{ revenueHostel.total }}</td>
					</tr>
				</tbody>
			</table>
		</div> -->
	</div>
</template>

<script>
	import { getRoomTable } from '@/api/modules/room';
	import { getOneHostel, getHostelTable } from '@/api/modules/hostel';
	import { getUserTable } from '@/api/modules/user';
	import { getRevenue, getRevenueHostel } from '@/api/modules/revenue';
	import { getToken } from '../../const/cookie';
	export default {
		name: 'revenue',
		data() {
			return {
				selected: null,
				sort_hostel: null,
				sort_date: null,

				list: [],
				revenueMonth: {},
				user: [],
				hostel: [],
				roomHostel: [],
				revenueHostel: {},
				m_year: '',
				allHostel: []
			};
		},
		created() {
			this.getRoom(), this.getUser();
			// this.getHostel();
			this.getAllHostel();
			this.getRevenueByMonth();
			this.getRevenueByHostel();
		},
		computed: {
			hostel_id() {
				const hostel_id = getToken('hostel_id');
				return hostel_id;
			},
			dateChange() {
				return this.sort_date;
			},
			hosteChange() {
				console.log(this.sort_hostel);
				return this.sort_hostel;
			}
		},

		watch: {
			dateChange() {
				this.getRevenueByHostel();
			},
			hosteChange() {
				this.getRevenueByHostel();
				this.getRoom();
			}
		},

		methods: {
			async getRoom() {
				await getRoomTable({ hostel: this.sort_hostel })
					.then(res => {
						this.list = res.data;
						console.log(this.list, '1');
					})
					.catch(err => {
						console.log(err);
					});
				await getRoomTable({ hostel: this.hostel_id }).then(res => {
					this.roomHostel = res.data;
				});
			},
			async getRevenueByMonth() {
				let d = this.sort_date;

				const dates = new Date(d);
				const dm = new Date();
				let cr_year = dm.getFullYear();
				let cr_month = dm.getMonth() + 1;
				console.log(cr_year, cr_month);
				const cr_date_month = cr_month + '/' + cr_year;
				let year = dates.getFullYear();
				let month = dates.getMonth() + 1;
				let date = month + '/' + year;
				if (d !== null) {
					await getRevenue({ date: date })
						.then(res => {
							this.revenueMonth = res;
						})
						.catch(err => {
							console.log(err);
						});
				} else {
					console.log('vao day roi', cr_date_month);
					await getRevenue({ date: cr_date_month })
						.then(res => {
							this.revenueMonth = res;
						})
						.catch(err => {
							console.log(err);
						});
				}
			},
			async getUser() {
				await getUserTable({ hostel: this.hostel_id }).then(res => {
					this.user = res.data;
					console.log(this.user);
				});
			},
			// getHostel() {
			// 	getOneHostel({ id: this.hostel_id }).then(res => {
			// 		this.hostel = res.data;
			// 	});
			// },
			getAllHostel() {
				getHostelTable()
					.then(res => {
						this.allHostel = res.data;
					})
					.catch(err => {
						console.log(err);
					});
			},

			getRevenueByHostel() {
				const d = new Date(this.sort_date);
				const y = d.getFullYear();
				const m = d.getMonth() + 1;

				const dm = new Date();
				let cr_year = dm.getFullYear();
				let cr_month = dm.getMonth() + 1;
				console.log(cr_year, cr_month);
				const cr_date_month = cr_month + '/' + cr_year;
				const date = `${m}/${y}`;
				let data;
				if (this.sort_date) {
					data = {
						hostel: this.sort_hostel || this.hostel_id,
						date: date
					};
				} else {
					data = {
						hostel: this.sort_hostel || this.hostel_id,
						date: cr_date_month
					};
				}
				getRevenueHostel(data).then(res => {
					console.log('AHHSH');
					this.revenueHostel = res;
				});
			}
		}
	};
</script>

<style scoped>
	#revenue {
		margin-top: 150px;
	}
	#revenue .title {
		position: fixed;
		width: 100%;
		top: 50px;
		background: #557b83;
		height: 40px;
		line-height: 40px;
		color: white;
		padding-left: 20px;
	}
	#revenue .revenue-header {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 10px;
		text-align: center;
		margin: 30px 20px 0px 20px;
	}
	#revenue .header-box {
		min-height: 150px;
		min-width: 200px;
		color: #fff;
		border-radius: 10px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.header-box:nth-child(1) {
		background-color: #00c897;
	}
	.header-box:nth-child(2) {
		background-color: orange;
	}
	.header-box:nth-child(3) {
		background-color: red;
	}
	.revenue-management_searching-filter {
		display: flex;
		margin-left: 50px;
		/* width: 1200px; */
	}
	.revenue-management_searching-filter select {
		margin-right: 20px;
		width: 200px;
	}
	.container .table {
		margin-top: 30px;
		text-align: center;
	}
</style>
