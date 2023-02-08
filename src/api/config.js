import { service } from './service';

export default {
	async getRequest(URL, DATA) {
		return await service({
			url: URL,
			method: 'GET',
			params: DATA
		});
	},
	async postRequest(URL, DATA) {
		return await service({
			url: URL,
			method: 'POST',
			data: DATA
		});
	},
	async putRequest(URL, DATA) {
		return await service({
			url: URL,
			method: 'POST',
			data: DATA
		});
	},
	async deleteRequest(URL, DATA) {
		return await service({
			url: URL,
			method: 'POST',
			data: DATA
		});
	}
};
