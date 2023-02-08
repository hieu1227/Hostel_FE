<template>
	<div id="report">
		<div class="title">
			<p>{{ $t('ISSUES.TITLE') }}</p>
		</div>
		<div class="content">
			<div class="row mt-2">
				<div class="col-md-12 col-sm-12 col-lg-12">
					<label for="">Name</label>
					<b-form-input
						id="input-1"
						readonly
						v-model="name"
						value="user_id"
					></b-form-input>
				</div>
				<div class="col-md-12 col-sm-12 col-lg-12">
					<label for="">{{ $t('ISSUES.NAME') }}</label>
					<b-form-input id="input-1" v-model="form.issues_name" required></b-form-input>
				</div>
				<div class="col-md-12 col-sm-12 col-lg-12">
					<label for="">{{ $t('ISSUES.CONTENT') }}</label>
					<b-form-textarea
						rows="4"
						id="input-2"
						v-model="form.issues_content"
						required
					></b-form-textarea>
				</div>
			</div>
			<b-button variant="primary" @click="handleCreateIssues()">{{
				$t('ISSUES.SUBMIT')
			}}</b-button>
		</div>
	</div>
</template>

<script>
	import { MakeToast } from '@/toast/toastMessage';
	import { postIssues } from '@/api/modules/issues';
	import { getToken } from '../../const/cookie';
	export default {
		data() {
			return {
				form: {
					user_id: '',
					issues_name: '',
					issues_content: ''
				},
				show: true
			};
		},
		computed: {
			name() {
				const name = getToken('username');
				return name;
			},
			id() {
				const id = getToken('_id');
				return id;
			}
		},
		methods: {
			async handleCreateIssues(id) {
				id = this.id;
				const data = {
					user_id: this.id,
					issues_name: this.form.issues_name,
					issues_content: this.form.issues_content
				};
				console.log(data);
				await postIssues(data)
					.then(res => {
						MakeToast({
							variant: 'success',
							title: this.$t('TOAST.SUCCESS'),
							content: this.$t('MANAGER.FORM.SUCCESS')
						});
						this.isResetDataModal();
					})
					.catch(err => {
						console.log(err);
					});
			},

			isResetDataModal() {
				console.log('RESET DATA');
				this.form = {
					issues_name: '',
					issues_content: ''
				};
			},
			// onSubmit(event) {
			//   event.preventDefault()
			//   alert(JSON.stringify(this.form))
			// },
			onReset(event) {
				event.preventDefault();
				// Reset our form values
				this.form.issues_name = '';
				this.form.issues_content = '';
				// Trick to reset/clear native browser form validation state
				this.show = false;
				this.$nextTick(() => {
					this.show = true;
				});
			}
		}
	};
</script>

<style scoped>
	#report .title {
		position: fixed;
		width: 100%;
		top: 50px;
		background: #557b83;
		height: 40px;
		line-height: 40px;
		color: white;
		font-weight: 500;
		padding-left: 20px;
	}
	#report .content {
		margin: 120px 300px 0px 50px;
	}
	#report .content button {
		margin-top: 10px;
	}
</style>
