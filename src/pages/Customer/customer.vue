<template>
	<div id="customer">
		<div class="title">{{ $t('CUSTOMER.TITLE') }}</div>
		<div class="customer-content">
			<div class="zone-header-page">
				<div class="form-group">
					<input
						type="text"
						class="form-control"
						:placeholder="$t('CUSTOMER.SEARCH.PLACEHOLDER')"
						id="product-search"
					/>
				</div>
				<button><i class="fa fa-search"></i>{{ $t('CUSTOMER.SEARCH.TITLE') }}</button>
			</div>
			<table class="table table-bordered">
				<thead>
					<tr>
						<th scope="col" class="col-1">{{ $t('CUSTOMER.TABLE.ID') }}</th>
						<th scope="col" class="col-2">{{ $t('CUSTOMER.TABLE.NAME') }}</th>
						<th scope="col">{{ $t('CUSTOMER.TABLE.PHONE') }}</th>
						<th scope="col" class="col-3">{{ $t('CUSTOMER.TABLE.ADDRESS') }}</th>
						<th scope="col">{{ $t('CUSTOMER.TABLE.START_AT') }}</th>
						<th scope="col" class="col-1"></th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="customer in list" :key="customer.id">
						<th scope="row">{{ customer.room_id.room_name }}</th>
						<td>{{ customer.user_id.username }}</td>
						<td>{{ customer.user_id.telephone }}</td>
						<td>{{ customer.user_id.hometown }}</td>
						<td>{{ customer.createAt }}</td>
						<td class="actions">
							<div type="button" class="btn btn-danger">
								<i class="fa fa-trash"></i>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
	import { getAllRequest } from '@/api/modules/roomRegister';
	export default {
		name: 'customer',
		data() {
			return {
				list: []
			};
		},
		computed: {},
		created() {
			this.getCustomer();
		},
		methods: {
			async getCustomer() {
				await getAllRequest()
					.then(res => {
						this.list = res.data;
					})
					.catch(err => {});
			}
		}
	};
</script>

<style scoped>
	#customer .title {
		z-index: 1;
		position: fixed;
		width: 100%;
		top: 50px;
		background: #557b83;
		height: 40px;
		line-height: 40px !important;
		color: white;
		padding-left: 20px;
	}
	#customer .customer-content {
		position: relative;
		top: 80px;
		margin: 30px;
	}
	.customer-content .zone-header-page {
		display: flex;
		margin: 60px 0px 50px 30px;
		height: 40px;
		z-index: 0;
	}
	.customer-content input {
		width: 300px;
	}
	.customer-content button {
		background: #1572a1;
		color: white !important;
		border: none;
		border-radius: 5px;
		width: 100px;
		margin-left: 20px;
		height: 38px;
	}
	#customer .customer-content table {
		text-align: center;
	}
</style>
