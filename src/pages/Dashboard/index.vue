<template>
	<div class="dashboard">
		<div class="dashboard-header">
			<div class="header-box">
				<h2><i class="fas fa-home"></i> {{ $t('DASHBOARD.BOX.TOTAL_ROOM') }} </h2>
				<h3 v-if="role === 'admin'"> {{ list.length }} </h3>
				<h3 v-if="role === 'manager'"> {{ roomHostel.length }} </h3>
			</div>
			<div class="header-box">
				<h2><i class="fas fa-bed"></i> {{ $t('DASHBOARD.BOX.RENTED_ROOM') }} </h2>
				<h3 v-if="role === 'admin'"> {{ list.filter(room => room.status).length }} </h3>
				<h3 v-if="role === 'manager'">
					{{ roomHostel.filter(item => item.status).length }}
				</h3>
			</div>
			<div class="header-box">
				<h2> <i class="fas fa-bed-alt"></i>{{ $t('DASHBOARD.BOX.EMPTY_ROOM') }} </h2>
				<h3 v-if="role === 'admin'"> {{ list.filter(room => !room.status).length }} </h3>
				<h3 v-if="role === 'manager'">
					{{ roomHostel.filter(item => !item.status).length }}
				</h3>
			</div>
		</div>
		<div class="dashboard-content">
			<div class="row">
				<div class="col">
					<table class="table border">
						<thead class="text-center">
							<th colspan="2">{{ $t('DASHBOARD.TABLE.EMPTY_ROOM') }}</th>
						</thead>
						<thead>
							<th>{{ $t('DASHBOARD.TABLE.ID') }}</th>
							<th>{{ $t('DASHBOARD.TABLE.PRICE') }}</th>
						</thead>
						<tbody v-if="role === 'admin'">
							<tr v-for="room in list.filter(room => !room.status)" :key="room.id">
								<td>{{ room.room_name }}</td>
								<td>{{ room.price }}</td>
							</tr>
						</tbody>
						<tbody v-if="role === 'manager'">
							<tr
								v-for="item in roomHostel.filter(item => !item.status)"
								:key="item.id"
							>
								<td>{{ item.room_name }}</td>
								<td>{{ item.price }}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { getRoomTable } from '@/api/modules/room';
	import { getToken } from '../../const/cookie';
	export default {
		name: 'Dashboard',
		data() {
			return {
				list: [{ status: true }],
				roomHostel: []
			};
		},
		computed: {
			role() {
				const role = getToken('roles');
				return role;
			},
			hostelID() {
				const id = getToken('hostel_id');
				return id;
			}
		},
		created() {
			this.handleGetListRoom();
		},
		methods: {
			async handleGetListRoom() {
				if (this.role === 'admin') {
					await getRoomTable()
						.then(res => {
							this.list = res.data;
							console.log(this.list);
						})
						.catch(err => {
							console.log(err);
						});
				} else if (this.role === 'manager') {
					await getRoomTable({ hostel: this.hostelID })
						.then(res => {
							this.roomHostel = res.data;
							console.log(this.list);
						})
						.catch(err => {
							console.log(err);
						});
				}
			}
		}
	};
</script>
