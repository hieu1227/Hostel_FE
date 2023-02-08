import * as RequestApi from '../request';

const URL = 'room';

export function postRoom(data) {
	return RequestApi.postOne(`${URL}/create`, data);
}

export function getRoomTable(data) {
	return RequestApi.getAll(`${URL}/getall`,data);
}

export function editRoom( data) {
	return RequestApi.putOne(`${URL}/update`, data);
}
export function getOneRoom(id) {
	return RequestApi.getOne(`${URL}/getone`,id);
}

export function deleteRoom(id) {
	return RequestApi.deleteOne(`${URL}/delete`,id);
}
