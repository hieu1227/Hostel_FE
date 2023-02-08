import * as RequestApi from '../request';

const URL = 'user';

export function postUser(data) {
	return RequestApi.postOne(`${URL}/create`, data);
}

export function getUserTable(data) {
	return RequestApi.getAll(`${URL}/getall`,data);
}

export function editUser(data) {
	return RequestApi.putOne(`${URL}/update`, data);
}
export function getOneUser(id) {
	return RequestApi.getOne(`${URL}/getone`,id);
}

export function deleteUser(id) {
	return RequestApi.deleteOne(`${URL}/delete`,id);
}
