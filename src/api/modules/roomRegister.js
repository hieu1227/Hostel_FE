import * as RequestApi from '../request';

const URL = 'room/rent';

export function RegisterRoom(data) {
	return RequestApi.postOne(`${URL}/register`, data);
}

export function getAllRequest() {
	return RequestApi.getAll(`${URL}/getall`);
}

export function getDetail(id) {
	return RequestApi.getOne(`${URL}/getone`, id);
}

export function cancelRoom(id) {
	console.log(id);
	return RequestApi.deleteOne(`${URL}/cancel`, id);
}
