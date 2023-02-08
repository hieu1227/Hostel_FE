import * as RequestApi from '../request';

const URL = 'areas';

export function postArea(data) {
	return RequestApi.postOne(`${URL}/create`, data);
}

export function getAreaTable() {
	return RequestApi.getAll(URL);
}

export function editArea(data) {
	return RequestApi.putOne(`${URL}/update`, data);
}
export function getOneArea(id) {
	return RequestApi.getOne(`${URL}/getone`,id);
}

export function deleteArea(id) {
	return RequestApi.deleteOne(`${URL}/delete`, id);
}
