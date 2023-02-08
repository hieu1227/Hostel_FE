import * as RequestApi from '../request';

const URL = 'hostel';

export function postHostel(data) {
	return RequestApi.postOne(`${URL}/create`, data);
}

export function getHostelTable(data) {
	return RequestApi.getAll(`${URL}/getall`,data);
}

export function editHostel(data) {
	return RequestApi.putOne(`${URL}/update`, data);
}
export function getOneHostel(id) {
	return RequestApi.getOne(`${URL}/getone`,id);
}

export function deleteHostel(id) {
	return RequestApi.deleteOne(`${URL}/delete`,id);
}
