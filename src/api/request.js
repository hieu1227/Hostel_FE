import request from './config';

export function getOne(url, data) {
	return request.getRequest(url, data);
}

export function getAll(url, data) {
	return request.getRequest(url, data);
}

export function postOne(url, data) {
	return request.postRequest(url, data);
}

export function putOne(url, data) {
	return request.putRequest(url, data);
}

export function deleteOne(url, data) {
	return request.deleteRequest(url, data);
}

export function deleteOneHaveBody(url, data) {
	return request.deleteRequest(url, data);
}

export function deleteAll(url, data) {
	return request.deleteRequest(url, data);
}
