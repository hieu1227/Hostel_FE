import * as RequestApi from '../request';

const URL = 'payment';

export function Payment(data) {
	return RequestApi.postOne(`${URL}/create-url`, data);
}

export function getListBank() {
	return RequestApi.getAll(`${URL}/bank`);
}