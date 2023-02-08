<template>
	<div id="notification">
		<div id="content-right">
			<div class="title">{{ $t('NOTIFICATION.TITLE') }}</div>
			<div class="zone-header-page">
				<div class="form-group">
					<input
						type="text"
						class="form-control"
						:placeholder="$t('NOTIFICATION.SEARCH.PLACEHOLDER')"
						id="product-search"
					/>
				</div>
				<button><i class="fa fa-search"></i>{{ $t('NOTIFICATION.SEARCH.TITLE') }}</button>
			</div>
			<div class="container">
				<table class="table table-bordered">
					<thead>
						<tr>
							<th scope="col" class="col-1">{{ $t('NOTIFICATION.TABLE.ID') }}</th>
							<th scope="col" class="col-3">{{ $t('NOTIFICATION.TABLE.NAME') }}</th>
							<th scope="col" class="col-2">{{ $t('NOTIFICATION.TABLE.ISSUES') }}</th>
							<th scope="col" class="col-5">{{
								$t('NOTIFICATION.TABLE.CONTENT')
							}}</th>
							<th scope="col" class="col-1">{{ $t('NOTIFICATION.TABLE.STATUS') }}</th>
							<th scope="col" class="col-1"></th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="issues in listIssues" :key="issues._id">
							<th scope="row">{{ issues.room.room_id.room_name }}</th>
							<td>{{ issues.user_id.username }}</td>
							<td>{{ issues.issues_name }}</td>
							<td>{{ issues.issues_content }}</td>
							<td>
								<input type="checkbox" v-model="issues.status" />
							</td>
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
	</div>
</template>

<script>
	import { getIssuesTable } from '@/api/modules/issues';
	export default {
		name: 'notification',
		data() {
			return {
				listIssues: [],
				showModal: false,
				status: false
			};
		},
		created() {
			this.handleGetListIssues();
		},
		methods: {
			async handleGetListIssues() {
				await getIssuesTable()
					.then(res => {
						this.listIssues = res.data;
						console.log(this.listIssues);
					})
					.catch(err => {
						console.log(err);
					});
			}
		}
	};
</script>

<style scoped>
	#content-right {
		position: relative;
		top: 50px;
	}
	#content-right .title {
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
	#content-right .zone-header-page {
		display: flex;
		margin: 60px 0px 50px 30px;
		height: 40px;
		z-index: 0;
	}
	#content-right .form-group {
		width: 300px;
	}
	#content-right button {
		background: #1572a1;
		color: white !important;
		border: none;
		border-radius: 5px;
		width: 100px;
		margin-left: 20px;
		height: 38px;
	}
	.container .actions > div {
		width: 40px;
	}
	.container .actions i {
		margin-right: 5px;
	}
	.container table {
		text-align: center;
	}
</style>
